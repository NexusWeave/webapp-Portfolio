# Standard Library
import datetime
from typing import Any

# Internal Libraries
from lib.models.database_models.GithubModel import LanguageAssosiationModel, LanguageModel


class GithubPayloadFormatter:
    __VERSION__ = "v1.0.0"
    """ Handles formatting and preparing raw GitHub payload data for database operations. """

    @staticmethod
    def format_payload(repository: dict[str, Any]) -> dict[str, Any]:
        """Formats the raw repository payload into a structure suitable for the database."""
        # Extract collaborators data first
        COLLABORATORS_DATA: list[dict[str, Any]] = GithubPayloadFormatter.prepear_collaborators(
            repository.get("collaborators", [])
        )

        # Prepare helper objects without modifying the original 'repository' dict prematurely
        urls = GithubPayloadFormatter.prepear_urls(repository.get("anchor", []))
        lang_data = GithubPayloadFormatter.prepear_language_assosiations(
            repository.get("lang", []), COLLABORATORS_DATA
        )

        def date_parser(d):
            return (
                    datetime.datetime.fromisoformat(d.replace("Z", "+00:00")) if isinstance(d, str) else d
                )

        # Create the final dictionary by merging all parts
        dictionary: dict[str, Any] = {**repository, **urls, **lang_data}

        # Clean up the dictionary for DB operations
        dictionary.pop("anchor", None)

        if "updated_at" in dictionary:
            dictionary["updated_at"] = date_parser(dictionary["updated_at"])
        if "created_at" in dictionary:
            dictionary["created_at"] = date_parser(dictionary["created_at"])

        return dictionary

    @staticmethod
    def prepear_collaborators(collaborators: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Prepares collaborator data for the association model, ensuring deduplication."""
        registered_ids: set[str] = set()
        COLLAB_DATA: list[dict[str, Any]] = []

        for collab in collaborators:
            gid: str = str(collab.get("collab_id", ""))
            if gid and gid not in registered_ids:
                COLLAB_DATA.append(
                    {
                        "name": collab["name"],
                        "github_id": gid,
                        "profile_url": collab.get("html_url"),
                    }
                )
                registered_ids.add(gid)
        return COLLAB_DATA

    @staticmethod
    def prepear_urls(urls: list[dict[str, Any]]) -> dict[str, str | None]:
        """Extracts specific URLs from the anchor list."""
        repo_url, video_url, preview_url = None, None, None
        for url in urls:
            match url["name"]:
                case "github":
                    repo_url = url["href"]
                case "webapp":
                    preview_url = url["href"]
                case "youtube_url":
                    video_url = url["href"]
        return {"youtube_url": video_url, "demo_url": preview_url, "repo_url": repo_url}

    @staticmethod
    def prepear_language_assosiations(
        languages: list[dict[str, Any]], COLLABORATORS_DATA: list[dict[str, Any]]
    ) -> dict[str, Any]:
        """Prepares language associations and bundles other metadata."""
        NOW = datetime.datetime.now(datetime.UTC)
        LANGUAGE_ASSOCIATION: list[LanguageAssosiationModel] = []
        for i in languages:
            LANG_NAME = str(i["language"]).lower()
            LANGUAGE: LanguageModel = LanguageModel(language=LANG_NAME)
            LANGUAGE_ASSOCIATION.append(
                LanguageAssosiationModel(language=LANGUAGE, code_bytes=i["bytes"])
            )
        return {
            "lang_assosiations": LANGUAGE_ASSOCIATION,
            "collaborators_data": COLLABORATORS_DATA,
            "last_check": NOW,
        }
