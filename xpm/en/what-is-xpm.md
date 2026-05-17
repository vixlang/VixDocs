# What is xpm?

xpm (Vix Package Manager) is the official package manager for the Vix programming language. It helps you manage dependencies, share code, and publish your own Vix packages.

## Overview

xpm simplifies the process of:
- **Dependency Management**: Add, update, and remove packages easily
- **Project Initialization**: Quickly set up a new Vix project with proper structure
- **Package Publishing**: Share your libraries with the Vix community
- **Version Control**: Manage different versions of dependencies

## Core Features

### 1. Simple Configuration

xpm uses a `xpm.json` file to manage project dependencies:

```json
{
  "name": "my-vix-project",
  "version": "1.0.0",
  "dependencies": {
    "std-extra": "^1.2.0",
    "math-lib": "^0.5.0"
  }
}
```

### 2. Automatic Dependency Resolution

xpm automatically resolves and downloads dependencies:

```bash
xpm install
```

### 3. Local Cache

Packages are cached locally to avoid re-downloading:

```
~/.xpm/
├── cache/
│   ├── std-extra@1.2.0/
│   └── math-lib@0.5.0/
└── config.toml
```

## Installation

### From Source

```bash
git clone https://github.com/vix-lang/xpm.git
cd xpm
make
sudo make install
```

### Verify Installation

```bash
xpm --version
```

## Basic Workflow

```bash
# Create a new project
xpm init my-project

# Navigate to project
cd my-project

# Add a dependency
xpm add std-extra

# Install all dependencies
xpm install

# Build your project
vixc main.vix -o my-app
```

## Next Steps

- [Getting Started](getting-started.md) - Learn how to use xpm
- [Commands Reference](commands.md) - Complete command documentation
