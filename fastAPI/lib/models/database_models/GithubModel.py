#   Standard Library

#   Third-Party Libraries
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

#   Local Libraries
from lib.services.base_services.database_config import BASE

class RepositoryModel(BASE):

    __tablename__: str = "repositories"

    date = Column(String, nullable=False)
    owner = Column(String, nullable=False)
    bytes = Column(Integer, nullable=False)
    description = Column(String, nullable=True)
    # FIKS: Fjernet 'collaborators = Column(String, nullable=True)' som konflikter med relasjonen
    label = Column(String,  index=True, nullable=False)
    demo_url = Column(String, unique=True, index=True, nullable=True)
    repo_id = Column(String, unique=True, index=True, nullable=False)
    repo_url = Column(String, unique=True, index=True, nullable=False)
    youtube_url = Column(String, unique=True, index=True, nullable=True)
    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)

    #   Relationships
    # FIKS (fra forrige runde): Korrekt assosiasjon for Language/Repo
    assosiations = relationship("LanugageRepositoryAssosiationModel", back_populates="repository", cascade="all, delete-orphan")
    # FIKS: Ny relasjon for CollaboratorModel
    collaborators = relationship("CollaboratorModel", back_populates="repository", cascade="all, delete-orphan")


class LanugageRepositoryAssosiationModel(BASE):
    __tablename__: str = "language_repository_association"

    # FIKS (fra forrige runde): Legger til Foreign Keys
    lang_id = Column(Integer, ForeignKey('languages.id'), nullable=False)
    repo_id = Column(Integer, ForeignKey('repositories.id'), nullable=False)
    
    code_bytes = Column(Integer, nullable=False)
    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)

    #   Relationships
    # FIKS (fra forrige runde): Korrekt back_populates
    language = relationship("LanguageModel", back_populates="assosiations")
    repository = relationship("RepositoryModel", back_populates="assosiations")
    
class LanguageModel(BASE):

    __tablename__: str = "languages"

    language = Column(String, unique=True, index=True, nullable=False)
    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)

    #   Relationships
    # FIKS (fra forrige runde): Korrekt back_populates
    assosiations = relationship("LanugageRepositoryAssosiationModel", back_populates="language")

class CollaboratorModel(BASE):

    __tablename__: str = "collaborators"

    # FIKS: NY Foreign Key som lenker til RepositoryModel
    repo_id = Column(Integer, ForeignKey('repositories.id'), nullable=False)

    name = Column(String, unique=True, index=True, nullable=False)
    collab_id = Column(String, unique=True, index=True, nullable=False)
    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)

    #   Foreign Keys
    # FIKS: Relasjonen peker nå mot den nye repo_id kolonnen
    repository = relationship("RepositoryModel", back_populates="collaborators")