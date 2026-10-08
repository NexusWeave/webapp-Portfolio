# uv Cheatsheet

This document provides an overview of common commands and best practices for using `uv` (by Astral) to manage Python dependencies, virtual environments, and project workflows in this repository.

`uv` serves as a high-performance replacement for `pip`, `pip-tools` (`pip-compile` & `pip-sync`), `virtualenv`, and `poetry`.

---

## Table of Contents
- [What is uv?](#what-is-uv)
- [Quick Migration Map (pip / pip-compile vs uv)](#quick-migration-map)
- [Upgrading uv](#upgrading-uv)
- [Package Installation & Management (pip Equivalent)](#package-installation--management)
- [Listing & Inspecting Packages](#listing--inspecting-packages)
- [Locking & Compiling Dependencies (pip-compile Equivalent)](#locking--compiling-dependencies)
- [Synchronizing the Virtual Environment (pip-sync Equivalent)](#synchronizing-the-virtual-environment)
- [Development Dependencies Workflow](#development-dependencies-workflow)
- [Common Flags & Options Reference](#common-flags--options-reference)
- [Project Integration (backend/)](#project-integration)

---

## What is uv?

`uv` is an extremely fast Python package and project resolver written in Rust. It consolidates multiple traditional Python tooling responsibilities:
- **Replaces `pip`**: Fast installs, uninstalls, and dependency resolution.
- **Replaces `pip-compile`**: Generates universal, deterministic cross-platform lockfiles (`uv.lock` or `requirements.txt`).
- **Replaces `pip-sync`**: Syncs `.venv` exactly to lockfiles, automatically removing extraneous packages.
- **Replaces `virtualenv`**: Fast `.venv` creation and automated Python toolchain management.

---

## Quick Migration Map

| Task | Traditional Tool (`pip` / `pip-tools`) | Modern `uv` (Project mode) | `uv pip` (Drop-in mode) |
| :--- | :--- | :--- | :--- |
| **Install package** | `pip install fastapi` | `uv add fastapi` | `uv pip install fastapi` |
| **Uninstall package** | `pip uninstall fastapi` | `uv remove fastapi` | `uv pip uninstall fastapi` |
| **Install dev package** | `pip install -r dev-requirements.txt` | `uv add --dev pytest` | `uv pip install pytest` |
| **Compile dependencies** | `pip-compile requirements.in` | `uv lock` | `uv pip compile reqs.in -o reqs.txt` |
| **Upgrade all packages** | `pip-compile --upgrade` | `uv lock --upgrade` | `uv pip compile --upgrade reqs.in` |
| **Upgrade single package**| `pip-compile -P fastapi` | `uv lock --upgrade-package fastapi` | `uv pip compile -P fastapi reqs.in` |
| **Sync venv (prune extras)**| `pip-sync requirements.txt` | `uv sync` | `uv pip sync requirements.txt` |
| **List packages** | `pip list` | `uv tree` | `uv pip list` |
| **Inspect dependencies** | `pip check` | `uv tree` / `uv lock --check` | `uv pip check` |

---

## Upgrading uv

Like `pip`, keep `uv` updated to benefit from the latest resolver enhancements and security fixes:

```bash
# Self-update (when installed via standalone installer)
uv self update

# When installed in a virtual environment via pip
python -m pip install --upgrade uv
```

---

## Package Installation & Management

### 1. Adding & Installing Packages
Adds dependencies directly to `pyproject.toml` and updates `uv.lock`:

```bash
# Latest compatible version
uv add fastapi

# Exact version pinning
uv add "fastapi==0.115.0"

# Version constraints
uv add "fastapi>=0.110.0"
```

### 2. Removing Packages
Removes the package from both `pyproject.toml` and `uv.lock`, and uninstalls it:

```bash
uv remove fastapi
```

### 3. Editable Installs (Local Package Development)
```bash
uv add --editable .
# or with uv pip:
uv pip install -e .
```

---

## Listing & Inspecting Packages

### 1. Dependency Tree
Visualizes installed packages with their parent/child dependency relationships:
```bash
uv tree
```

### 2. Flat List (`pip list` equivalent)
```bash
uv pip list
```

### 3. Check for Broken Dependencies (`pip check` equivalent)
```bash
uv pip check
```

---

## Locking & Compiling Dependencies

In `uv`, dependency resolution is split between modern `pyproject.toml` project mode and traditional `requirements.txt` compilation mode:

### 1. Modern Mode (`pyproject.toml` + `uv.lock`)
Generates or updates `uv.lock` without touching `.venv`:
```bash
# Lock without upgrading unchanged packages
uv lock

# Upgrade all dependencies to latest compatible versions
uv lock --upgrade

# Upgrade a single package only
uv lock --upgrade-package fastapi
```

### 2. Legacy Mode (`pip-compile` compatible)
If compiling flat `requirements.txt` files from `requirements.in`:
```bash
# Compile requirements.in -> requirements.txt
uv pip compile requirements.in -o requirements.txt

# Full upgrade of all packages
uv pip compile --upgrade requirements.in -o requirements.txt

# Upgrade specific package only
uv pip compile --upgrade-package fastapi requirements.in -o requirements.txt

# Generate security hashes
uv pip compile --generate-hashes requirements.in -o requirements.txt
```

---

## Synchronizing the Virtual Environment

Equivalent to `pip-sync`, ensuring `.venv` matches the exact locked state (installing missing packages and pruning unlisted ones):

### 1. Sync All Dependencies (Production + Dev)
```bash
uv sync
```

### 2. Sync Production Only
```bash
uv sync --no-dev
```

### 3. Sync from `requirements.txt` (`pip-sync` drop-in)
```bash
uv pip sync requirements.txt
uv pip sync requirements.txt dev-requirements.txt
```

---

## Development Dependencies Workflow

Instead of maintaining disjointed `requirements.in` and `dev-requirements.in` files, `uv` uses standardized PEP 735 dependency groups inside `pyproject.toml`:

### 1. Adding Dev Dependencies
```bash
uv add --dev pytest pytest-asyncio ruff mypy
```

### 2. Removing Dev Dependencies
```bash
uv remove --dev pytest
```

### 3. Running Dev Tools Without Activating `.venv`
```bash
uv run pytest
uv run ruff check .
uv run mypy .
```

---

## Common Flags & Options Reference

| Flag | Context | Description | Example |
| :--- | :--- | :--- | :--- |
| `--dev` | `uv add` / `uv remove` | Target the development dependency group | `uv add --dev ruff` |
| `--no-dev` | `uv sync` | Exclude development packages from installation | `uv sync --no-dev` |
| `-U`, `--upgrade` | `uv lock` / `uv pip compile` | Upgrade all packages to latest permitted versions | `uv lock --upgrade` |
| `-P`, `--upgrade-package` | `uv lock` / `uv pip compile` | Upgrade only specified package(s) | `uv lock --upgrade-package pydantic` |
| `--python <ver>` | `uv venv` / `uv run` | Specify Python version to target | `uv venv --python 3.13` |
| `--frozen` | `uv sync` / `uv run` | Run strictly against `uv.lock` without updating it | `uv run --frozen pytest` |
| `--generate-hashes` | `uv pip compile` | Include SHA-256 hashes for each artifact | `uv pip compile --generate-hashes` |

---

## Project Integration

In this project, configuration is centralized under `backend/`:
- **Specification**: [`backend/pyproject.toml`](file:///mnt/data/Repository/webapps/webapp-Portfolio/backend/pyproject.toml)
- **Lockfile**: [`backend/uv.lock`](file:///mnt/data/Repository/webapps/webapp-Portfolio/backend/uv.lock)

### Typical Daily Commands

```bash
cd backend

# 1. Update your environment after pulling from git
uv sync

# 2. Run the backend tests
uv run pytest

# 3. Run linting & type checks
uv run ruff check .
uv run mypy .

# 4. Start the development server
uv run uvicorn lib.main:app --reload
```
