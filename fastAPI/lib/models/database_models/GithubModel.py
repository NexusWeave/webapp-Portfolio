#   Third-Party Libraries
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

#   Local Libraries
from lib.services.base_services.database_config import BASE

class RepositoryModel(BASE):

    __tablename__: str = "repositories"

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    repo_id = Column(String, unique=True, index=True, nullable=False)

    label = Column(String,  index=True, nullable=False)
    description = Column(String, nullable=True)
    owner = Column(String, nullable=False)

    #   Unique URLs
    demo_url = Column(String, unique=True, index=True, nullable=True)
    repo_url = Column(String, unique=True, index=True, nullable=False)
    youtube_url = Column(String, unique=True, index=True, nullable=True)

    #   Timestamps
    updated_at = Column(String, nullable=True)
    last_update = Column(String, nullable=True)
    created_at = Column(String, nullable=False)

    #   Relationships
    collaborators = relationship("CollaboratorModel", back_populates="repository", cascade="all, delete-orphan")
    assosiations = relationship("LanugageRepositoryAssosiationModel", back_populates="repository", cascade="all, delete-orphan")


class LanugageRepositoryAssosiationModel(BASE):

    __tablename__: str = "language_repository_association"

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    lang_id = Column(Integer, ForeignKey('languages.id'), nullable=False)
    repo_id = Column(Integer, ForeignKey('repositories.repo_id'), nullable=False)
    code_bytes = Column(Integer, nullable=False)

    #   Relationships
    language = relationship("LanguageModel", back_populates="assosiations")
    repository = relationship("RepositoryModel", back_populates="assosiations")
    
class LanguageModel(BASE):

    __tablename__: str = "languages"

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    language = Column(String, unique=True, index=True, nullable=False)

    #   Relationships
    assosiations = relationship("LanugageRepositoryAssosiationModel", back_populates="language")

class CollaboratorModel(BASE):

    __tablename__: str = "collaborators"

    name = Column(String, unique=True, index=True, nullable=False)
    collab_id = Column(String, unique=True, index=True, nullable=False)
    repo_id = Column(Integer, ForeignKey('repositories.id'), nullable=False)
    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)

    #   Foreign Keys
    repository = relationship("RepositoryModel", back_populates="collaborators")
