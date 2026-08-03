# Security Policy

## Supported Versions

The latest versions of both application components are currently supported with security updates.

| Component | Version | Supported          |
| --------- | ------- | ------------------ |
| Frontend  | v2.0.x  | :white_check_mark: |
| Backend   | v1.1.x  | :white_check_mark: |
| Older versions | All | :x:            |

## Reporting a Vulnerability

We take the security of our project seriously. If you discover a security vulnerability, we appreciate your help in disclosing it to us responsibly.

Please report security issues directly by emailing: **[krigjo25@outlook.com](mailto:krigjo25@outlook.com)**.

### What to Expect
- **Response Time:** You can expect an initial acknowledgment within 48 hours.
- **Updates:** We will keep you updated on progress as we investigate and develop a fix.
- **Resolution:** Once confirmed and resolved, security fixes will be released in the latest supported version line.


## Bot & Automated Scanner Policy

To maintain system availability, performance, and respectful crawling across our services:

- **Public Site Access:** Automated crawlers and bots are permitted to fetch content from all public pages (`Allow: /`).
- **Restricted Paths:** Automated crawling, scanning, or indexing of `/admin/`, `/api/`, and `/.git/` directories is strictly prohibited via `robots.txt`.
- **Crawl-Delay Requirement:** All automated crawlers must respect the `Crawl-delay: 30` setting defined in `robots.txt` to prevent unnecessary server load.

---

## Preferred Languages

We accept security communications in:
- English
- Norwegian (Norsk)
