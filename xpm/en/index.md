<!-- ![xpm logo](/assets/xpm-logo.png) -->

# xpm - Vix Package Manager

[![Vix](https://img.shields.io/badge/Vix-Programming%20Language-blue)]()
[![License](https://img.shields.io/badge/License-Apache%202.0-blue)]()

xpm (Vix Package Manager) is the official package manager for the Vix programming language. It manages packages based on Git repositories and provides concise syntax for downloading, managing, and publishing Vix packages.

[中文版](README-zh.md) | [Quick Start](#quick-start) | [Command Reference](#xpm-command-reference) | [Contributing](#contributing)

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

### Install xpm

```bash
git clone https://github.com/vix-lang/xpm.git
cd xpm
python main.py install
```

### Verify Installation

```bash
xpm --version
```

### Your First Package

Download and install a package:

```bash
xpm add vnet                        # Download github.com/vixlang/vlib-vnet
xpm add example.vnet                # Download github.com/example/vnet repo  
xpm add example.vnet@master         # Download master branch
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
xpm add vnet                        # Download github.com/vixlang/vlib-vnet
xpm add example.vnet                # Download github.com/example/vnet repo  
xpm add example.vnet@master         # Download github.com/example/vnet repo master branch      
xpm add gitee.com:example.vnet      # Download gitee.com/example/vnet repo  
xpm add gitee:example.vnet@master   # .com can be omitted  
```

> I also left myself some syntax sugar (because I prefer Gitee),  
> `@example.xpm`  # Equivalent to `gitee:example.xpm`

---

## xpm Command Reference

### xpm add - Add Package

`xpm add` command downloads and installs Vix packages from Git repositories.

#### Format

```bash
xpm add <git-host>:<user>.<repo>@<branch>
```

#### Examples

```bash
xpm add example.vnet                # Download github.com/example/vnet repo
xpm add example.vnet@master         # Download github.com/example/vnet repo master branch
xpm add gitee.com:example.vnet      # Download gitee.com/example/vnet repo
xpm add gitee:example.vnet@master   # .com can be omitted
xpm add @example.vnet               # @ prefix defaults to gitee.com
```

### xpm del - Delete Package

`xpm del` command removes installed Vix packages.

#### Format

```bash
xpm del <git-host>:<user>.<repo>
```

#### Examples

```bash
xpm del example.vnet                # Delete github.com/example/vnet repo
xpm del gitee.com:example.vnet      # Delete gitee.com/example/vnet repo
xpm del gitee:example.vnet          # .com can be omitted
xpm del @example.vnet               # @ prefix defaults to gitee.com
```

### xpm list - List Installed Packages

`xpm list` command lists all installed Vix packages.

#### Format

```bash
xpm list [-t|--tree]
```

#### Parameters

- `-t, --tree`: Display package list in tree structure

#### Examples

```bash
xpm list              # List all installed packages
xpm list -t           # Display in tree structure
```

### xpm prune - Clean Invalid Packages and Empty Directories

`xpm prune` command removes packages without `vindex.toml` and empty directories.

#### Format

```bash
xpm prune [--empty-only | --invalid-only]
```

#### Options

- `--empty-only`: Only delete empty directories
- `--invalid-only`: Only delete packages without `vindex.toml`

#### Examples

```bash
xpm prune                      # Delete invalid packages and empty directories
xpm prune --empty-only         # Only delete empty directories
xpm prune --invalid-only       # Only delete invalid packages
```

---

## .vix Directory Structure Example

```bash
.vix
└── libs
    ├── gitee.com
    │   ├── example
    │   │   ├── xpm
    │   │   └── xpm2
    │   └── example2
    │       └── xpm3
    └── github.com
        ├── example
        │   └── xpm
        ├── example2
        │   └── xpm2
        └── example3
            └── xpm3
```

## Contributing

We welcome all forms of contributions! Including but not limited to: feature suggestions, documentation, bug reports, code submissions, and improving the package ecosystem.

## License

This project is open-sourced under the Apache License 2.0.

## Contact

- Email: [popolk1871@outlook.com](mailto:popolk1871@outlook.com)
- GitHub Issues: Submit directly in this repository

**If you're interested in xpm, feel free to star, fork, open an issue, or try it out right away!**
