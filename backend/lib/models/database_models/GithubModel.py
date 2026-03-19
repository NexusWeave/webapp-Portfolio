#   Third-Party Dependencies
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Boolean, BigInteger

#   Internal Dependencies
from lib.settings.database_config import BASE


class RepositoryModel(BASE):

    __tablename__: str = "repositories"

    id = Column(Integer, primary_key = True, index = True, nullable = False, autoincrement = True)
    repo_id = Column(BigInteger, unique = True, index = True, nullable = False)

    label = Column(String,  index = True, nullable = False)
    description = Column(String, nullable = True)
    owner = Column(String, nullable = False)
    is_private = Column(Boolean, default = 0, nullable = False)

    demo_url = Column(String, unique = True, index = True, nullable = True)
    repo_url = Column(String, unique = True, index = True, nullable = False)
    youtube_url = Column(String, unique = True, index = True, nullable = True)

    updated_at = Column(DateTime(timezone = True), nullable = True)
    last_check = Column(DateTime(timezone = True), nullable = True)
    created_at = Column(DateTime(timezone = True), nullable = False)

    is_secret = Column(Boolean, default = 0, nullable = False)
    is_backend = Column(Boolean, default = 0, nullable = False)
    is_frontend = Column(Boolean, default = 0, nullable = False)
    is_fullstack = Column(Boolean, default = 0, nullable = False)
    is_collaborator = Column(Boolean, default = 0, nullable = False)

    lang_assosiations = relationship("LanguageAssosiationModel", back_populates = "repository", cascade = "all, delete-orphan")

class LanguageAssosiationModel(BASE):

    __tablename__: str = "language_repository_association"

    id = Column(Integer, primary_key = True, index = True, nullable = False, autoincrement = True)
    lang_id = Column(Integer, ForeignKey('languages.id'), nullable = False)
    repo_id = Column(Integer, ForeignKey('repositories.repo_id'), nullable = False)
    code_bytes = Column(Integer, nullable = False)

    language = relationship("LanguageModel", back_populates = "assosiations")
    repository = relationship("RepositoryModel", back_populates = "lang_assosiations")
    
class LanguageModel(BASE):

    __tablename__: str = "languages"

    id = Column(Integer, primary_key = True, index = True, nullable = False, autoincrement = True)
    language = Column(String, unique = True, index = True, nullable = False)

    assosiations = relationship("LanguageAssosiationModel", back_populates="language", cascade="all, delete-orphan")
