import sys
import os

# Add the backend directory to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

try:
    from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanguageAssosiationModel, CollaboratorModel, RepoCollaboratorAssociationModel
    print("Import successful")
    print(f"RepoCollaboratorAssociationModel: {RepoCollaboratorAssociationModel}")
except Exception as e:
    print(f"Import failed: {e}")
    import traceback
    traceback.print_exc()
