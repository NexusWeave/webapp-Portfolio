# Flask API
The project is equipped with technologies such as
-   Flask serves as API for the project.

#### [Visual representation](./model/system-architecture.md) of the Web Architecture

#### [Visual representation](./model/endpoints.md) of the Endpoints

#### [Visual representation](./model/apis.md) of the API Classes

#### [Visual representation](./model/utils.md) of the Utils Classes

#### Database
[Visual representation](./model/database.md) of the Database Classes
As a consequence of the project not requires a server to handle database functionallity, SQLite was choosen to keep the records.

## Testing Framework And Datasets

####    Test Execution
[Visual representation](./model/testmodel.md) of the test cases
To run the tests, use the following commands from the project's root directory

```sh
pytest -v

#   This command will output a report of the tests.
pytest --html=reports.html
```

#####    API Testing
[Visual representation](./model/apis.md) of the apis classes
[Visual representation](./model/testmodel.md) of the test
API tests are conducted using:

- The [GITHUB REST API](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28)
- The [Heavy REST API](https://api.hevyapp.com/docs/)
- Tests are based on the 

**Connection test (`test_connection`)**
This test validates the connection to the specified APIs.
Given the structure of the Github REST API, successful
connection tests involve comparing identical expected and
actual outputs. The actual response dictionary is therefore
used to define the expected JSON, ensuring that no sensitive
user data is unitetentionally included in the test.

**Repository Availability Test (`mock_request`)**
The test ensures the availability of repositories.
It achives this by mocking the relevant URL from
the GitHub REST API: [Get A Repos](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository)

#####    Databases
[Visual representation](./model/database.md) of the database
Database tests are designed according to the principles
outlined in this unit testing documentation: [test/sqlite.html](https://python-basics-tutorial.readthedocs.io/en/24.1.0/test/sqlite.html)

* **Insertion Test (`test_insertion`)**: This test verifies the correct insertion of data into the database.
* **Update Test (`test_update`)**: This test validates the accurate updating of data within the database.

A test report is generated to provide a clear visualization of the test results.
