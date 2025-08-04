#  App congiguration settings

# Importing required modules
import os

class DefaulthConfig(object):
    DOMAIN = None
    DEBUG = False
    TESTING = False
    ENV = 'production'
    SESSION_TYPE = None
    VITE_AUTO_INSERT = True
    SESSION_PERMANENT = False
    STATIC_FOLDER = "VueClient/src/assets"
    DATABASE_URL = os.getenv('DATABASE_URL')

class DevelopmentConfig(DefaulthConfig):
    DEBUG = True
    ENV = 'development'
    SESSION_TYPE ='filesystem'

class TestConfig(DefaulthConfig):
    DEBUG = True
    ENV = 'test'
    TESTING = True
    SESSION_TYPE ='filesystem'

class ProdConfig(DefaulthConfig):
    ENV = 'production'
    STATIC_FOLDER = 'dist'
    SESSION_TYPE ='filesystem'
    DOMAIN = os.getenv('Domain_Authorization')
    