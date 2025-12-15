.PHONY: test coverage html-report clean

test-reports: # Running tests with coverage and generating HTML report # Not working propperly
	@echo "--- Running all Pytest tests and collecting coverage ---"
	#	Run tests with coverage and generate HTML report
	coverage run -m pytest
	coverage html

	# 	Move the generated HTML report to the reports directory
	mkdir -p tests/reports
	mv htmlcov/* tests/reports/
	
	pytest --html=tests/reports/pytest_report.html --self-contained-html
	clear
	@echo "--- Test and Report Generation Finished ---"

clean: # Clean up cache files
	@echo "--- Cleans up Cache files ---"
	
	#	Cleans up __pycache__, pytest cache directories
	find . -depth -type d \( -name "__pycache__" -o -name ".pytest_cache" -o -name ".benchmarks", -o -name ".logs" \) -exec rm -rf {} \;

	#	Cleans up .coverage files
	rm -rf fastAPI/.benchmarks

	#	Cleans up test database files
	rm -rf fastAPI/.test_database.db
	clear
	@echo "--- Clean up Finished ---"
