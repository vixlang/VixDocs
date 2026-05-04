# VPM Commands Reference

Complete reference for all VPM (Vix Package Manager) commands.

## Command Overview

| Command | Description |
|---------|-------------|
| `vpm init [name]` | Initialize a new Vix project |
| `vpm add <package>[@version]` | Add a package dependency |
| `vpm remove <package>` | Remove a package dependency |
| `vpm install` | Install all dependencies |
| `vpm update [package]` | Update packages |
| `vpm search <query>` | Search for packages |
| `vpm publish` | Publish your package |
| `vpm list` | List installed packages |
| `vpm info <package>` | Show package information |
| `vpm config` | Configure VPM settings |

## Detailed Command Reference

### vpm init

Initialize a new Vix project:

```bash
vpm init [project-name]
```

**Options:**
- `--template <name>` - Use a specific project template
- `--author <name>` - Set author name
- `--license <type>` - Set license type (MIT, Apache2.0, GPL3.0)

**Example:**
```bash
vpm init my-app --template cli --author "John Doe" --license MIT
```

### vpm add

Add a package to your project:

```bash
vpm add <package-name>[@version]
```

**Options:**
- `--dev` - Add as development dependency
- `--exact` - Pin to exact version

**Examples:**
```bash
vpm add std-extra
vpm add math-lib@1.0.0
vpm add test-lib --dev
```

### vpm remove

Remove a package from your project:

```bash
vpm remove <package-name>
```

**Example:**
```bash
vpm remove std-extra
```

### vpm install

Install all dependencies listed in `vpm.json`:

```bash
vpm install
```

**Options:**
- `--production` - Skip development dependencies
- `--force` - Force reinstall all packages

### vpm update

Update packages to latest versions:

```bash
vpm update [package-name]
```

**Options:**
- `--major` - Allow major version updates
- `--minor` - Allow minor version updates (default)
- `--patch` - Only update patch versions

**Examples:**
```bash
vpm update              # Update all
vpm update std-extra    # Update specific package
vpm update --major     # Allow breaking changes
```

### vpm search

Search the package registry:

```bash
vpm search <query>
```

**Options:**
- `--limit <n>` - Limit number of results
- `--verbose` - Show detailed information

**Example:**
```bash
vpm search math --limit 10
```

### vpm publish

Publish your package to the registry:

```bash
vpm publish
```

**Options:**
- `--dry-run` - Test without publishing
- `--tag <tag>` - Publish with a tag

**Prerequisites:**
- You must have an account on the Vix package registry
- You must be logged in (`vpm login`)

### vpm list

List all installed packages:

```bash
vpm list
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

### vpm info

Show detailed information about a package:

```bash
vpm info <package-name>
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

### vpm config

Configure VPM settings:

```bash
vpm config <key> [value]
```

**Available Keys:**
- `registry` - Package registry URL
- `cache-dir` - Cache directory path
- `auto-install` - Automatically install dependencies (true/false)

**Examples:**
```bash
vpm config registry https://packages.vix-lang.org
vpm config cache-dir ~/.vpm/cache
vpm config auto-install true
```

## Configuration File

VPM uses `~/.vpm/config.toml` for global settings:

```toml
registry = "https://packages.vix-lang.org"
cache_dir = "~/.vpm/cache"
auto_install = true

[publish]
username = "your-username"
token = "your-api-token"
```

## Next Steps

- [What is VPM?](what-is-vpm.md) - Overview
- [Getting Started](getting-started.md) - Quick start guide
