#   Databases
import sqlite3, logging

from dotenv import load_dotenv
from typing import Tuple

#   Custom libraries
from lib.core.database import DBConfig

#   errorHandler
from lib.utils.exception_handler import OperationalError

#  Loading the environment variables
load_dotenv()

class SQL(DBConfig):

        def __init__(self, database: str): 
            super().__init__(database)
            self.database = database

            #   Establishing a connection to the database
            try:
                
                self.conn = sqlite3.connect(self.db)

                #   Ensure that the connection is established
                if not self.conn: raise OperationalError(100)

            except Exception as e: 
                logging.error(f"An error occured while trying to connect to the database: {e}")
                raise OperationalError(100)

            #   Initializing the cursor
            self.cur = self.conn.cursor()
            self.cur.row_factory = self.dict_factory
            logging.info(f"Connection to {self.db} established")
        
        def dict_factory(self, cursor, row):

            """
                #   Adopted from the sqlite3 documentation
                #   Converts the row from a tuple into a dictionary
            """
            columns = [column[0] for column in cursor.description]
            return {key: value for key, value in zip(columns, row)}

        def TableConfigurations(self, table:str, statement:str, columns:dict): 

            #   Initializing the tables
            tables = [i['name'] for i in self.select_records('sqlite_master', 'SELECT')]

            #   Ensure that table does not exists and statements is a known keyword
            if statement.upper() not in self.statements:
                logging.error(f"Unknown statement: {statement}")
                raise OperationalError(404)

            if table in tables and statement == 'CREATE':
                logging.error(f"Table {table} already exists")
                raise OperationalError(200)

            #   Initialize the query
            query = self.configure_table(table, statement, columns)
            logging.info(f"Executing query: {query}")


            #   Query execution
            self.cur.execute(query)
            self.conn.commit()
            
            #   Sweep memory
            del tables, table, columns
            del statement

            return
        
        #   Inserting values into a table
        def initialize_records(self, table:str, data:list):

            try:

                #   Initializing tables
                tables = [i['name'] for i in self.cur.execute('SELECT name FROM sqlite_master').fetchall()]


                #   Ensure that table exists
                if table not in tables:
                    logging.error(f"{table} Not found in {tables}")
                    raise OperationalError(404)
                
                if not isinstance(data, list): 
                    raise SyntaxError('accepts only lists as argument')

            except (sqlite3.Error, OperationalError) as e:
                logging.error(f"An error occured while attempting to insert data into the table: {e}")
            
            #   Initialize query
            query = self.configure_columns(table, 'INSERT', data)

            #   Execute query
            self.cur.executemany(query[0], query[1])
            self.conn.commit()
        
        def select_records(self, table:str, statement:str, columns:Tuple[str] = ("*",)):
            return self.cur.execute(self.configure_columns(table, statement, columns)).fetchall()
