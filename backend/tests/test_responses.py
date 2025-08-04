#   Importing repositories
import pytest, os

from ...flask.lib.apis.heavy_api import HeavyAPI
from unittest.mock import patch
from ...flask.lib.apis.github_api import GithubAPI

class TestResponsesAPI:

    def test_fetchRepos(self)-> None:
        """
            #   Testing  fetch_repos
            #   Github api : https://api.github.com/user/repos
            #   This function testing the API call to fetch photos
        """

        #   Initializing Requests module
        api = GithubAPI()

        #   Actual response from the Api Call
        response = api.ApiCall(endpoint = f"{api.API_URL}user/repos", head = api.head)

        array = [i['name'] for i in response]
        mock_response = []
        for i in response:

            #   Initializing the expected response
            mock_response.append(
                {
                    "id": i['id'], "node_id": i['node_id'], "name": i['name'], "full_name": i['full_name'],
                    "owner": 
                    { 
                        "login": i['owner']['login'], "id": i['owner']['id'], 
                        "node_id": i['owner']['node_id'], "avatar_url": i['owner']['avatar_url'], 
                        "gravatar_id": i['owner']['gravatar_id'], "url": i['owner']['url'],
                        "html_url": i['owner']['html_url'], "followers_url": i['owner']['followers_url'],
                        "following_url": i['owner']['following_url'], "gists_url": i['owner']['gists_url'], 
                        "starred_url": i['owner']['starred_url'], "subscriptions_url": i['owner']['subscriptions_url'], 
                        "organizations_url": i['owner']['organizations_url'], "repos_url": i['owner']['repos_url'], 
                        "events_url": i['owner']['events_url'], "received_events_url": i['owner']['received_events_url'], 
                        "type": i['owner']['type'], "site_admin": i['owner']['site_admin'],
                        'user_view_type': "public",
                    },     
                    "private": i['private'], "html_url": i['html_url'], 
                    "description": i['description'], "fork": i['fork'], 
                    "url": i['url'], "archive_url": i['archive_url'],
                    "assignees_url": i['assignees_url'], "blobs_url": i['blobs_url'],
                    "branches_url": i['branches_url'], "collaborators_url": i['collaborators_url'], 
                    "comments_url": i['comments_url'],  "commits_url": i['commits_url'],
                    "compare_url": i['compare_url'], "contents_url": i['contents_url'], 
                    "contributors_url": i['contributors_url'], "deployments_url": i['deployments_url'],
                    "downloads_url": i['downloads_url'], "events_url": i['events_url'],
                    "forks_url": i['forks_url'], "git_commits_url": i['git_commits_url'],
                    "git_refs_url": i['git_refs_url'], "git_tags_url": i['git_tags_url'], 
                    "git_url": i['git_url'], 'has_discussions': i['has_discussions'],
                    "issue_comment_url": i['issue_comment_url'], "issue_events_url": i['issue_events_url'],
                    "issues_url": i['issues_url'], "keys_url": i['keys_url'],
                    "labels_url": i['labels_url'],"languages_url": i['languages_url'],
                    "merges_url": i['merges_url'], "milestones_url": i['milestones_url'],
                    "notifications_url": i['notifications_url'], "pulls_url": i['pulls_url'],
                    "releases_url": i['releases_url'], "ssh_url": i['ssh_url'],
                    "stargazers_url": i['stargazers_url'], "statuses_url": i['statuses_url'],
                    "subscribers_url": i['subscribers_url'], "subscription_url": i['subscription_url'],
                    "tags_url": i['tags_url'], "teams_url": i['teams_url'],
                    "trees_url": i['trees_url'], "clone_url": i['clone_url'],
                    "mirror_url": i['mirror_url'], "hooks_url": i['hooks_url'],
                    "svn_url": i['svn_url'], "homepage": i['homepage'],
                    "license": i['license'], "language": i['language'], 
                    "forks_count": i['forks_count'], "forks": i['forks'],
                    "stargazers_count": i['stargazers_count'], "watchers_count": i['watchers_count'],
                    "watchers": i['watchers'], "size": i['size'],
                    "default_branch": i['default_branch'], "open_issues_count": i['open_issues_count'],
                    "open_issues": i['open_issues'], "is_template": i['is_template'],
                    "topics": [ i for i in i['topics']], "has_issues": i['has_issues'],
                    "has_projects": i['has_projects'], "has_wiki": i['has_wiki'],
                    "has_pages": i['has_pages'], "has_downloads": i['has_downloads'],
                    "archived": i['archived'], "disabled": i['disabled'],
                    "visibility": i['visibility'], "pushed_at": i['pushed_at'],
                    "created_at": i['created_at'], "updated_at": i['updated_at'],
                    'web_commit_signoff_required': i['web_commit_signoff_required'], 
                    'allow_forking':i['allow_forking'], 

                    "permissions": 
                    {
                        "pull": i['permissions']['pull'], "push": i['permissions']['push'],
                        "admin": i['permissions']['admin'], 'maintain':i['permissions']['maintain'],
                        'triage':i['permissions']['triage']}
                    }
            )

        #   Testing the fetch_repos response
        assert response == mock_response, "Response does not match the expected response"
        return

    def test_fetchWorkout(self)-> None:
       
        """
        
            #    Testing  fetch_workout
            #    Heavy api : https://api.heavy.com/docs/
            #   This function testing the API call to fetch photos
        """

        #   Initializing Requests module
        HAPI = HeavyAPI()

        #   Actual response from the Api Call
        
        response = HAPI.FetchWorkouts(os.getenv("Workouts"))
        pages = HAPI.FetchN(os.getenv("Workouts"))
        print(response)
def test_fetchPhotos()-> None:
    """
        #   Testing  fetch_photos
        #   Google Photos api : https://api.google.com/docs/
        #   This function testing the API call to fetch photos
    """
    pass