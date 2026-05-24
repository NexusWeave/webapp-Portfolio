# Standard Library
import datetime
from typing import Dict, Any, List, Set

# Internal Libraries
from lib.models.database_models.GithubModel import LanguageModel, LanguageAssosiationModel

class GithubPayloadFormatter:
    """ Handles formatting and preparing raw GitHub payload data for database operations. """

    @staticmethod
    def format_payload(repository: Dict[str, Any]) -> Dict[str, Any]:
        """ Formats the raw repository payload into a structure suitable for the database. """
        # Extract collaborators data first
        COLLABORATORS_DATA: List[Dict[str, Any]] = GithubPayloadFormatter.prepear_collaborators(repository.get('collaborators', []))

        # Prepare helper objects without modifying the original 'repository' dict prematurely
        urls = GithubPayloadFormatter.prepear_urls(repository.get('anchor', []))
        lang_data = GithubPayloadFormatter.prepear_language_assosiations(repository.get('lang', []), COLLABORATORS_DATA)

        date_parser = lambda d: datetime.datetime.fromisoformat(d.replace('Z', '+00:00')) if isinstance(d, str) else d

        # Create the final dictionary by merging all parts
        dictionary: Dict[str, Any] = {
            **repository, 
            **urls, 
            **lang_data
        }

        # Clean up the dictionary for DB operations
        dictionary.pop('anchor', None)

        if 'updated_at' in dictionary: dictionary['updated_at'] = date_parser(dictionary['updated_at'])
        if 'created_at' in dictionary: dictionary['created_at'] = date_parser(dictionary['created_at'])

        return dictionary

    @staticmethod
    def prepear_collaborators(collaborators: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """ Prepares collaborator data for the association model, ensuring deduplication. """
        registered_ids: Set[str] = set()
        COLLAB_DATA: List[Dict[str, Any]] = []

        for collab in collaborators:
            gid: str = str(collab.get('collab_id', ''))
            if gid and gid not in registered_ids:
                COLLAB_DATA.append({
                    "name": collab['name'],
                    "github_id": gid,
                    "profile_url": collab.get('html_url')
                })
                registered_ids.add(gid)
        return COLLAB_DATA

    @staticmethod
    def prepear_urls(urls: List[Dict[str, Any]]) -> Dict[str, str | None]:
        """ Extracts specific URLs from the anchor list. """
        repo_url, video_url, preview_url = None, None, None
        for url in urls:
            match url['name']:
                case 'github': repo_url = url['href']
                case 'webapp': preview_url = url['href']
                case 'youtube_url': video_url = url['href']
        return {'youtube_url': video_url, 'demo_url': preview_url, 'repo_url': repo_url}

    @staticmethod
    def prepear_language_assosiations(languages: List[Dict[str, Any]], COLLABORATORS_DATA: List[Dict[str, Any]]) -> Dict[str, Any]:
        """ Prepares language associations and bundles other metadata. """
        NOW = datetime.datetime.now(datetime.timezone.utc)
        LANGUAGE_ASSOCIATION: List[LanguageAssosiationModel] = []
        for i in languages:
            LANG_NAME = str(i['language']).lower()
            LANGUAGE: LanguageModel = LanguageModel(language = LANG_NAME)
            LANGUAGE_ASSOCIATION.append(LanguageAssosiationModel(language = LANGUAGE, code_bytes = i['bytes']))
        return {'lang_assosiations': LANGUAGE_ASSOCIATION, 'collaborators_data': COLLABORATORS_DATA, 'last_check': NOW}
