#   Third-Party Dependencies
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Boolean, BigInteger

#   Internal Dependencies
from lib.settings.database_config import BASE

class AnswersModel(BASE):
    __tablename__: str = "answers"

    id = Column(Integer, primary_key = True, index = True, nullable = False, autoincrement = True)
    response = Column(String, nullable = False)

class CategoriesModel(BASE):
    __tablename__: str = "categories"

    id = Column(Integer, primary_key = True, index = True, nullable = False, autoincrement = True)
    category = Column(String, unique = True, index = True, nullable = False)

class Bot_responseModel(BASE):
    __tablename__: str = "bot_responses"

    id = Column(Integer, primary_key = True, index = True, nullable = False, autoincrement = True)
    
    category_id = Column(Integer, ForeignKey('categories.id', onupdate="CASCADE", ondelete="CASCADE"), nullable = False)
    response_id = Column(Integer, ForeignKey('answers.id', onupdate="CASCADE", ondelete="CASCADE"), nullable = False)
    priority = Column(Integer, nullable = False, default= 5)
    timestamp = Column(DateTime(timezone = True), nullable = False)

    category = relationship("CategoriesModel", back_populates = "responses")
    response = relationship("AnswersModel", back_populates = "bot_response")
