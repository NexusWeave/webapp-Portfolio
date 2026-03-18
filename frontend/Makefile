.PHONY: test coverage html-report clean

ci-pipeline: clean
test-reports: # Running tests with coverage and generating HTML report # Not working propperly
	$(MAKE) -C tests test-flow

clean: # Clean up cache files
	@echo "--- Cleans up Cache files ---"
	
	#	Cleans up __pycache__, pytest cache directories
	find . -depth -type d \( -name ".data" -o -name "" -o -name "node_modules/.cache", -o -name "package-lock.json", -o -name ".nuxt" \) -exec rm -rf {} \;

	#	Cleans up .coverage files
	rm -rf fastAPI/.benchmarks

	#	Cleans up test database files
	rm -rf fastAPI/.test_database.db
	clear
	@echo "--- Clean up Finished ---"

