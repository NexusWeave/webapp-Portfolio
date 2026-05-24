# Standard Library
from typing import Dict, List

# Internal Libraries
from lib.utils.logger_config import DatabaseWatcher
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanguageAssosiationModel

# Third Party Libraries
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

LOG = DatabaseWatcher(name="Language-Sync-Manager")
LOG.file_handler()

class LanguageSyncManager:
    """ Manages synchronization of languages and their associations with repositories. """
    
    def __init__(self, session: AsyncSession):
        self.session = session

    async def sync_languages(self, repo: RepositoryModel, new_langs_payload: List[LanguageAssosiationModel]) -> None:
        """ Synchronizes language associations for a repository. """
        new_langs = {assoc.language.language: assoc.code_bytes for assoc in new_langs_payload}
        exist_assoc_groups: Dict[str, List[LanguageAssosiationModel]] = {}
        
        for assoc in repo.lang_assosiations:
            lang_name = assoc.language.language
            exist_assoc_groups.setdefault(lang_name, []).append(assoc)

        for lang_name, code_bytes in new_langs.items():
            if lang_name in exist_assoc_groups:
                primary_assoc = exist_assoc_groups[lang_name][0]
                if primary_assoc.code_bytes != code_bytes:
                    primary_assoc.code_bytes = code_bytes
                    self.session.add(primary_assoc)
                # Cleanup duplicates
                for duplicate in exist_assoc_groups[lang_name][1:]:
                    await self.session.delete(duplicate)
                    repo.lang_assosiations.remove(duplicate)
            else:
                lang_obj = await self.new_language_record(lang_name)
                self.new_association_record(repo, lang_obj, code_bytes)

        for lang_name, assocs in exist_assoc_groups.items():
            if lang_name not in new_langs:
                for assoc in assocs:
                    await self.session.delete(assoc)
                    repo.lang_assosiations.remove(assoc)

    async def new_language_record(self, LANG_NAME: str) -> LanguageModel:
        """ Fetches or creates a language record. """
        LANG_NAME = LANG_NAME.lower()
        lang_obj = await self.session.scalar(select(LanguageModel).where(LanguageModel.language == LANG_NAME))

        if not lang_obj:
            lang_obj = LanguageModel(language = LANG_NAME)
            self.session.add(lang_obj)
            LOG.debug(f"Initializing new language record: {LANG_NAME}")
        return lang_obj

    def new_association_record(self, repo: RepositoryModel, lang: LanguageModel, code_bytes: int) -> None:
        """ Creates a new language association record. """
        association_obj = LanguageAssosiationModel(repository = repo, language = lang, code_bytes = code_bytes)
        self.session.add(association_obj)
