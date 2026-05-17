# Getting Started with xpm

This guide will help you get started with xpm (Vix Package Manager) quickly.

## Prerequisites

- Vix compiler installed (`vixc`)
- Internet connection (for downloading packages)
- Basic knowledge of Vix programming

## Creating a New Project

### Initialize a Project

```bash
xpm init my-project
```

This creates a new directory with the following structure:

```
my-project/
├── xpm.json          # Project configuration
├── src/
│   └── main.vix    # Entry point
├── lib/             # Dependencies directory
└── README.md
```

### Project Configuration

The `xpm.json` file contains your project metadata:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My Vix project",
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {}
}
```

## Managing Dependencies

### Adding a Package

```bash
xpm add std-extra
```

This updates `xpm.json`:

```json
{
  "dependencies": {
    "std-extra": "^1.2.0"
  }
}
```

### Adding a Specific Version

```bash
xpm add std-extra@1.0.0
```

### Removing a Package

```bash
xpm remove std-extra
```

### Installing Dependencies

Install all dependencies listed in `xpm.json`:

```bash
xpm install
```

## Using Packages in Your Code

After installing a package, import it in your Vix code:

```vix
import "lib/std-extra/string_utils.vix"

fn main() -> i32 {
    let result = reverse("Hello")
    print(result)  // "olleH"
    return 0
}
```

## Updating Packages

### Update All Packages

```bash
xpm update
```

### Update a Specific Package

```bash
xpm update std-extra
```

## Searching for Packages

```bash
xpm search math
```

Output:
```
Found 3 packages:
- math-lib (v1.0.0) - Basic math utilities
- math-extra (v0.5.0) - Extended math functions
- linear-algebra (v2.1.0) - Linear algebra library
```

## Publishing Your Own Package

### 1. Prepare Your Package

Create a `xpm.json` for your package:

```json
{
  "name": "my-awesome-lib",
  "version": "1.0.0",
  "description": "My awesome Vix library",
  "author": "Your Name",
  "license": "MIT",
  "main": "src/lib.vix",
  "keywords": ["utility", "helpers"]
}
```

### 2. Publish

```bash
xpm publish
```

## Next Steps

- [Commands Reference](commands.md) - Complete xpm command documentation
- [What is xpm?](what-is-xpm.md) - Overview and features
