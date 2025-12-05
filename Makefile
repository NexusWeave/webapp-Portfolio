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
	@echo "--- Test and Report Generation Finished ---"

clean: # Clean up cache files
	@echo "--- Cleans up Cache files ---"
	
	#	Cleans up __pycache__ directories
	rm -rf fastAPI/__pycache__
	rm -rf fastAPI/../__pycache__/
	rm -rf fastAPI/tests/__pycache__
	rm -rf fastAPI/lib/utils/__pycache__
	rm -rf fastAPI/lib/models/__pycache__
	rm -rf fastAPI/lib/services/__pycache__
	rm -rf fastAPI/lib/settings/__pycache__

	#	Cleans up .coverage files
	rm -rf fastAPI/.benchmarks
	#	Cleans up .pytest_cache directories
	rm -rf fastAPI/.pytest_cache/
	rm -rf fastAPI/tests/.pytest_cache/

	rm -rf .pytest_cache/

	@echo "--- Clean up Finished ---"
