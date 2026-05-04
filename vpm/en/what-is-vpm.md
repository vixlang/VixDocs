# What is VPM?

VPM (Vix Package Manager) is the official package manager for the Vix programming language. It helps you manage dependencies, share code, and publish your own Vix packages.

## Overview

VPM simplifies the process of:
- **Dependency Management**: Add, update, and remove packages easily
- **Project Initialization**: Quickly set up a new Vix project with proper structure
- **Package Publishing**: Share your libraries with the Vix community
- **Version Control**: Manage different versions of dependencies

## Core Features

### 1. Simple Configuration

VPM uses a `vpm.json` file to manage project dependencies:

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

VPM automatically resolves and downloads dependencies:

```bash
vpm install
```

### 3. Local Cache

Packages are cached locally to avoid re-downloading:

```
~/.vpm/
├── cache/
│   ├── std-extra@1.2.0/
│   └── math-lib@0.5.0/
└── config.toml
```

## Installation

### From Source

```bash
git clone https://github.com/vix-lang/vpm.git
cd vpm
make
sudo make install
```

### Verify Installation

```bash
vpm --version
```

## Basic Workflow

```bash
# Create a new project
vpm init my-project

# Navigate to project
cd my-project

# Add a dependency
vpm add std-extra

# Install all dependencies
vpm install

# Build your project
vixc main.vix -o my-app
```

## Next Steps

- [Getting Started](getting-started.md) - Learn how to use VPM
- [Commands Reference](commands.md) - Complete command documentation
