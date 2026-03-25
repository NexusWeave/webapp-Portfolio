.PHONY: test coverage html-report clean

ci-pipeline: clean
test-reports: # Running tests with coverage and generating HTML report # Not working propperly
	$(MAKE) -C tests test-flow

clean: # Clean up cache files
	@echo "--- Cleans up Cache files ---"
	
	#	Cleans up __pycache__, pytest cache directories, benchmarks, and logs
	@for dir in "__pycache__" ".pytest_cache" ".benchmarks" ".logs"; do \
		grep -qxF "$$dir/" ../.gitignore || echo "$$dir/" >> ../.gitignore; \
	done

	@find .. -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
	@find .. -name ".pytest_cache" -type d -exec rm -rf {} + 2>/dev/null || true
	@find ../.logs -type f -exec rm -f {} + 2>/dev/null || true

	clear
	@echo "--- Clean up Finished ---"

