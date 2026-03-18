.PHONY: test coverage html-report clean

test-flow: test-setup coverage, pytest
test-setup: 	#	Setup the test environment
	@echo "--- Setting up the environment ---"
	@echo "--- Finished Setting up the environment ---"

coverage: # Running tests with coverage and generating HTML report # Not working propperly
	@echo "--- Collecting coverage ---"
	#	Run tests with coverage and generate HTML report
	coverage run -m pytest
	coverage html

	# 	Move the generated HTML report to the reports directory
	mkdir -p tests/reports
	mv htmlcov/* reports/

	clear
	@echo "--- Test and Report Generation Finished ---"

test-pystest:
	@echo "--- Run Pytests ---"
	pytest --html=tests/reports/pytest_report.html --self-contained-html
	clear
	@echo "--- Test and Report Generation Finished ---"