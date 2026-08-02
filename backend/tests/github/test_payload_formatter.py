import datetime
import pytest

from lib.services.github.payload_formatter import GithubPayloadFormatter

def test_prepear_collaborators():
    raw_collabs = [
        {"collab_id": 123, "name": "Alice", "html_url": "https://github.com/alice"},
        {"collab_id": 123, "name": "Alice Duplicate", "html_url": "https://github.com/alice2"},
        {"collab_id": 456, "name": "Bob", "html_url": "https://github.com/bob"}
    ]
    result = GithubPayloadFormatter.prepear_collaborators(raw_collabs)
    
    assert len(result) == 2
    assert result[0] == {"name": "Alice", "github_id": "123", "profile_url": "https://github.com/alice"}
    assert result[1] == {"name": "Bob", "github_id": "456", "profile_url": "https://github.com/bob"}

def test_prepear_urls():
    raw_urls = [
        {"name": "github", "href": "https://github.com/repo"},
        {"name": "webapp", "href": "https://demo.com"},
        {"name": "youtube_url", "href": "https://youtube.com/video"}
    ]
    result = GithubPayloadFormatter.prepear_urls(raw_urls)
    
    assert result["repo_url"] == "https://github.com/repo"
    assert result["demo_url"] == "https://demo.com"
    assert result["youtube_url"] == "https://youtube.com/video"

def test_format_payload():
    payload = {
        "repo_id": 999,
        "collaborators": [{"collab_id": 1, "name": "User", "html_url": "url"}],
        "anchor": [{"name": "github", "href": "git_url"}],
        "lang": [{"language": "Python", "bytes": 100}],
        "created_at": "2023-01-01T12:00:00Z",
        "updated_at": "2023-01-02T12:00:00Z",
    }
    
    formatted = GithubPayloadFormatter.format_payload(payload)
    
    # Assert dates were parsed
    assert isinstance(formatted["created_at"], datetime.datetime)
    assert formatted["created_at"].year == 2023
    assert formatted["updated_at"].day == 2
    
    # Assert urls merged
    assert formatted["repo_url"] == "git_url"
    
    # Assert collaborator data
    assert len(formatted["collaborators_data"]) == 1
    assert formatted["collaborators_data"][0]["github_id"] == "1"
    
    # Assert language data
    assert len(formatted["lang_assosiations"]) == 1
    assert formatted["lang_assosiations"][0].language.language == "python"
    assert formatted["lang_assosiations"][0].code_bytes == 100
    
    # Assert anchor removed
    assert "anchor" not in formatted
