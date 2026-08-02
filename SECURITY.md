# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.x.x   | :x:                |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our project seriously. If you discover a security vulnerability, we appreciate your help in disclosing it to us responsibly.

Please report security issues directly by emailing: **[krigjo25@gmail.com](mailto:krigjo25@gmail.com)**.

### What to Expect
- **Response Time:** You can expect an initial acknowledgment within 48 hours.
- **Updates:** We will keep you updated on progress as we investigate and develop a fix.
- **Resolution:** Once confirmed and resolved, security fixes will be released in the latest supported version line.

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
