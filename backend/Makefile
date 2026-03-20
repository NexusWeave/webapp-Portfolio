.PHONY: test coverage html-report clean

ci-pipeline: clean
test-reports: # Running tests with coverage and generating HTML report # Not working propperly
	$(MAKE) -C tests test-flow

clean: # Clean up cache files
	@echo "--- Cleans up Cache files ---"
	
	#	Cleans up __pycache__, pytest cache directories, benchmarks, and logs
	@find . -depth -type d \( -name "__pycache__" -o -name ".pytest_cache" -o -name ".benchmarks" -o -name ".logs" -o -name ".coverage" -o -name ".test_database.db" \) | sed 's|^\./||' | while read -r line; do \
		grep -qxF "$$line/" ../.gitignore || echo "$$line/" >> .gitignore; \
		rm -rf "$$line"; \
	done
	@echo "Fullført: Mapper slettet og lagt til i .gitignore."

	clear
	@echo "--- Clean up Finished ---"

