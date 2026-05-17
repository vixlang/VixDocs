# xpm Commands Reference

Complete reference for all xpm (Vix Package Manager) commands.

## Command Overview

| Command | Description |
|---------|-------------|
| `xpm init [name]` | Initialize a new Vix project |
| `xpm add <package>[@version]` | Add a package dependency |
| `xpm remove <package>` | Remove a package dependency |
| `xpm install` | Install all dependencies |
| `xpm update [package]` | Update packages |
| `xpm search <query>` | Search for packages |
| `xpm publish` | Publish your package |
| `xpm list` | List installed packages |
| `xpm info <package>` | Show package information |
| `xpm config` | Configure xpm settings |

## Detailed Command Reference

### xpm init

Initialize a new Vix project:

```bash
xpm init [project-name]
```

**Options:**
- `--template <name>` - Use a specific project template
- `--author <name>` - Set author name
- `--license <type>` - Set license type (MIT, Apache2.0, GPL3.0)

**Example:**
```bash
xpm init my-app --template cli --author "John Doe" --license MIT
```

### xpm add

Add a package to your project:

```bash
xpm add <package-name>[@version]
```

**Options:**
- `--dev` - Add as development dependency
- `--exact` - Pin to exact version

**Examples:**
```bash
xpm add std-extra
xpm add math-lib@1.0.0
xpm add test-lib --dev
```

### xpm remove

Remove a package from your project:

```bash
xpm remove <package-name>
```

**Example:**
```bash
xpm remove std-extra
```

### xpm install

Install all dependencies listed in `xpm.json`:

```bash
xpm install
```

**Options:**
- `--production` - Skip development dependencies
- `--force` - Force reinstall all packages

### xpm update

Update packages to latest versions:

```bash
xpm update [package-name]
```

**Options:**
- `--major` - Allow major version updates
- `--minor` - Allow minor version updates (default)
- `--patch` - Only update patch versions

**Examples:**
```bash
xpm update              # Update all
xpm update std-extra    # Update specific package
xpm update --major     # Allow breaking changes
```

### xpm search

Search the package registry:

```bash
xpm search <query>
```

**Options:**
- `--limit <n>` - Limit number of results
- `--verbose` - Show detailed information

**Example:**
```bash
xpm search math --limit 10
```

### xpm publish

Publish your package to the registry:

```bash
xpm publish
```

**Options:**
- `--dry-run` - Test without publishing
- `--tag <tag>` - Publish with a tag

**Prerequisites:**
- You must have an account on the Vix package registry
- You must be logged in (`xpm login`)

### xpm list

List all installed packages:

```bash
xpm list
```

**Output:**
```
Installed packages:
- std-extra@1.2.0
- math-lib@0.5.0
- test-utils@2.0.1
```

**Options:**
- `--outdated` - Show only outdated packages
- `--json` - Output in JSON format

### xpm info

Show detailed information about a package:

```bash
xpm info <package-name>
```

**Output:**
```
Package: std-extra
Version: 1.2.0
Description: Extended standard library for Vix
Author: Vix Community
License: MIT
Homepage: https://github.com/vix-lang/std-extra
Dependencies: 
  - math-lib@^0.5.0
```

### xpm config

Configure xpm settings:

```bash
xpm config <key> [value]
```

**Available Keys:**
- `registry` - Package registry URL
- `cache-dir` - Cache directory path
- `auto-install` - Automatically install dependencies (true/false)

**Examples:**
```bash
xpm config registry https://packages.vix-lang.org
xpm config cache-dir ~/.xpm/cache
xpm config auto-install true
```

## Configuration File

xpm uses `~/.xpm/config.toml` for global settings:

```toml
registry = "https://packages.vix-lang.org"
cache_dir = "~/.xpm/cache"
auto_install = true

[publish]
username = "your-username"
token = "your-api-token"
```

## Next Steps

- [What is xpm?](what-is-xpm.md) - Overview
- [Getting Started](getting-started.md) - Quick start guide
