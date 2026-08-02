# Security Policy

## Reporting a Vulnerability

We take the security of our project seriously. If you discover a security vulnerability, we appreciate your help in disclosing it to us responsibly.

Please report security issues directly by emailing: **[krigjo25@gmail.com](mailto:krigjo25@gmail.com)**.

### What to Include in Your Report

To help us investigate and address the issue efficiently, please include:
- A brief description of the vulnerability.
- Clear steps to reproduce the issue (proof of concept, code snippets, or screenshots).
- Any potential impact associated with the vulnerability.

---

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
