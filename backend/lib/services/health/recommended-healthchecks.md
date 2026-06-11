# Backend Health Checks

This document outlines the current state of health monitoring and identifies gaps that need to be addressed for production readiness.

## Unsupported/Missing Health Checks

- **GitHub API Service (`check_github_service`)**: 
    - *Status*: Currently a placeholder returning "NOT OK".
    - *Required*: Implement a `HEAD` request to `api.github.com` to verify connectivity and token validity.
- **Heavy Workout API**:
    - *Status*: No health check implemented.
    - *Required*: Monitor connectivity to the external Heavy API endpoint to ensure the workout data remains available.
- **AI Specialist Scanner**:
    - *Status*: Only checks the first link.
    - *Required*: Iterate through all `SPECIALIST_LINKS` to ensure the full list of sources is accessible.
- **System Resource Monitoring**:
    - *Status*: Missing.
    - *Required*: Monitor CPU and Memory usage thresholds to prevent OOM (Out of Memory) kills in containerized environments.
- **Environment Validation**:
    - *Status*: Missing.
    - *Required*: Check that all critical secrets (`GITHUB_TOKEN`, `DATABASE_URL`, etc.) are present and not expired.
