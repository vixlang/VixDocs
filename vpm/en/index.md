<!-- ![VPM logo](/assets/vpm-logo.png) -->

# VPM - Vix Package Manager

[![Vix](https://img.shields.io/badge/Vix-Programming%20Language-blue)]()
[![License](https://img.shields.io/badge/License-Apache%202.0-blue)]()

VPM (Vix Package Manager) is the official package manager for the Vix programming language. It manages packages based on Git repositories and provides concise syntax for downloading, managing, and publishing Vix packages.

[中文版](README-zh.md) | [Quick Start](#quick-start) | [Command Reference](#vpm-command-reference) | [Contributing](#contributing)

## Features Overview

- Git-based package management (supports GitHub / Gitee)
- Concise package reference syntax (supports `@` for specifying branches)
- Automatic dependency resolution and local caching
- Tree-view for installed packages

## Official Package Repository

> Address: https://github.com/vixlang

### Convention

Official repository standard library project names start with `vlib-`.

## Quick Start

### Install VPM

```bash
git clone https://github.com/vix-lang/vpm.git
cd vpm
python main.py install
```

### Verify Installation

```bash
vpm --version
```

### Your First Package

Download and install a package:

```bash
vpm add vnet                        # Download github.com/vixlang/vlib-vnet
vpm add example.vnet                # Download github.com/example/vnet repo  
vpm add example.vnet@master         # Download master branch
```

### Use the Package

```vix
import "lib/vnet/server.vix"

fn main() -> i32 {
    let server = vnet.createServer(8080)
    print("Server running on port 8080")
    return 0
}
```

## Package Index Format

```bash
vpm add vnet                        # Download github.com/vixlang/vlib-vnet
vpm add example.vnet                # Download github.com/example/vnet repo  
vpm add example.vnet@master         # Download github.com/example/vnet repo master branch      
vpm add gitee.com:example.vnet      # Download gitee.com/example/vnet repo  
vpm add gitee:example.vnet@master   # .com can be omitted  
```

> I also left myself some syntax sugar (because I prefer Gitee),  
> `@example.vpm`  # Equivalent to `gitee:example.vpm`

---

## VPM Command Reference

### vpm add - Add Package

`vpm add` command downloads and installs Vix packages from Git repositories.

#### Format

```bash
vpm add <git-host>:<user>.<repo>@<branch>
```

#### Examples

```bash
vpm add example.vnet                # Download github.com/example/vnet repo
vpm add example.vnet@master         # Download github.com/example/vnet repo master branch
vpm add gitee.com:example.vnet      # Download gitee.com/example/vnet repo
vpm add gitee:example.vnet@master   # .com can be omitted
vpm add @example.vnet               # @ prefix defaults to gitee.com
```

### vpm del - Delete Package

`vpm del` command removes installed Vix packages.

#### Format

```bash
vpm del <git-host>:<user>.<repo>
```

#### Examples

```bash
vpm del example.vnet                # Delete github.com/example/vnet repo
vpm del gitee.com:example.vnet      # Delete gitee.com/example/vnet repo
vpm del gitee:example.vnet          # .com can be omitted
vpm del @example.vnet               # @ prefix defaults to gitee.com
```

### vpm list - List Installed Packages

`vpm list` command lists all installed Vix packages.

#### Format

```bash
vpm list [-t|--tree]
```

#### Parameters

- `-t, --tree`: Display package list in tree structure

#### Examples

```bash
vpm list              # List all installed packages
vpm list -t           # Display in tree structure
```

### vpm prune - Clean Invalid Packages and Empty Directories

`vpm prune` command removes packages without `vindex.toml` and empty directories.

#### Format

```bash
vpm prune [--empty-only | --invalid-only]
```

#### Options

- `--empty-only`: Only delete empty directories
- `--invalid-only`: Only delete packages without `vindex.toml`

#### Examples

```bash
vpm prune                      # Delete invalid packages and empty directories
vpm prune --empty-only         # Only delete empty directories
vpm prune --invalid-only       # Only delete invalid packages
```

---

## .vix Directory Structure Example

```bash
.vix
└── libs
    ├── gitee.com
    │   ├── example
    │   │   ├── vpm
    │   │   └── vpm2
    │   └── example2
    │       └── vpm3
    └── github.com
        ├── example
        │   └── vpm
        ├── example2
        │   └── vpm2
        └── example3
            └── vpm3
```

## Contributing

We welcome all forms of contributions! Including but not limited to: feature suggestions, documentation, bug reports, code submissions, and improving the package ecosystem.

## License

This project is open-sourced under the Apache License 2.0.

## Contact

- Email: [popolk1871@outlook.com](mailto:popolk1871@outlook.com)
- GitHub Issues: Submit directly in this repository

**If you're interested in VPM, feel free to star, fork, open an issue, or try it out right away!**
