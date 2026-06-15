# 🔗 LinkedIn Automation Service (MVP)

This service automates sharing your blog posts directly to LinkedIn whenever you submit a new post. It only shares the post **ingress** and a link back to your **homepage**, encouraging readers to read the full content.

---

## 📐 Architecture Overview

We have implemented two options to provide maximum flexibility:

1. **Option A: GitHub Actions / Git CI/CD Workflow (Recommended for Static sites)**
   * **Workflow**: A Python script runs in your deployment pipeline when a new post markdown file is committed.
   * **Benefit**: No server runtime or hosting costs needed.

2. **Option B: FastAPI Endpoint**
   * **Workflow**: A REST `<abbr title="Application Programming Interface">API</abbr>` endpoint exposes a `POST` method at `/api/v1/linkedin/share`.
   * **Benefit**: Allows real-time triggering directly from TinaCMS client configurations or admin panels.

---

## 🛠️ Configuration & Credentials

To authenticate with the LinkedIn API, you need:

1. **LinkedIn Access Token**: A valid bearer token with the `w_member_social` permission.
2. **Author URN**: Your member identifier (e.g., `urn:li:person:123456`).

### 1. Step-by-Step API Access Setup
1. Go to the [LinkedIn Developer Portal](https://developer.linkedin.com).
2. Create an application and associate it with a company page (or use your personal profile).
3. Request the **Share on LinkedIn** product to obtain access to the `w_member_social` permission.
4. Generate an access token using the **Developer Token Generator** tool (for immediate personal use) or implement standard `<abbr title="Open Authorization 2.0">OAuth 2.0</abbr>`.

### 2. Environment Variables
Add the credentials to your backend `.env` file or repository secrets:

```env
LINKEDIN_ACCESS_TOKEN=your_oauth_token_here
LINKEDIN_AUTHOR_URN=urn:li:person:your_profile_id_here
HOMEPAGE_URL=https://krigjo25.no
```

---

## 🚀 Usage Guide

### Using Option A: GitHub Actions Pipeline
To automate via GitHub Actions, add a file like `.github/workflows/linkedin-share.yml` in your repository:

```yaml
name: Share New Posts to LinkedIn

on:
  push:
    paths:
      - 'frontend/content/posts/**/*.md'
    branches:
      - main

jobs:
  share:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2 # Fetch history to check changed files

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.13'

      - name: Get Changed Post File
        id: files
        run: |
          # Detect newly added/modified markdown files
          CHANGED_FILE=$(git diff --name-only HEAD~1 HEAD | grep "frontend/content/posts/" | grep "\.md" | head -n 1)
          echo "file=$CHANGED_FILE" >> $GITHUB_OUTPUT

      - name: Run LinkedIn Publisher
        if: steps.files.outputs.file != ''
        env:
          LINKEDIN_ACCESS_TOKEN: ${{ secrets.LINKEDIN_ACCESS_TOKEN }}
          LINKEDIN_AUTHOR_URN: ${{ secrets.LINKEDIN_AUTHOR_URN }}
          HOMEPAGE_URL: https://krigjo25.no
        run: |
          python backend/lib/services/linkedin/publish_from_git.py "${{ steps.files.outputs.file }}"
```

### Using Option B: FastAPI Backend Route
To trigger sharing directly, send a request to the FastAPI application:

* **Endpoint**: `POST /api/v1/linkedin/share`
* **Content-Type**: `application/json`
* **Request JSON Body**:
  ```json
  {
    "title": "My New Article",
    "ingress": "This is a quick summary of what the new article is about...",
    "homepage_url": "https://krigjo25.no"
  }
  ```

---

## 🎨 Diagram Reference
A corresponding diagram illustrating this system's architecture has been saved to [linkedin_automation.drawio](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/linkedin/docs/linkedin_automation.drawio) and can be opened directly inside Draw.io.
