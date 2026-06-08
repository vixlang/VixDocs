# Getting Started

## Prerequisites

- LLVM 18-20, Flex 2.6+, Bison 3.0+, CMake 3.20+, C11/C++17 compiler

## Install Dependencies

```bash
# Ubuntu/Debian
sudo apt install cmake flex bison llvm-dev lld

# macOS (Homebrew)
brew install cmake flex bison llvm lld

# Or use the installer
bash src/install.sh
```

## Build

```bash
git clone https://github.com/vixlang/Vix-lang.git
cd Vix-lang
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release --parallel
```

## Hello World

```vix
fn main(): i32
{
    print("Hello, Vix!")
    return 0
}
```

```bash
vixc hello.vix
./hello
```

## Quick Syntax

```vix
// Variables
let x = 10                       // immutable
let mut y = 20                   // mutable
let name: string = "Vix"         // explicit type

// Functions
fn add(a: i32, b: i32): i32
{
    return a + b
}

// References (v0.3.0)
fn read(x: ref i32): i32
{
    return @x
}

fn main(): i32
{
    let value = 10
    print(read(ref value))
    return 0
}
```

## CLI Quick Reference

```bash
vixc source.vix              # Compile to executable
vixc source.vix --check      # Syntax & type check only
vixc source.vix -ll          # Output LLVM IR
vixc source.vix -ast         # Print AST
vixc source.vix -obj         # Object file
vixc a.o b.o -o prog         # Link object files
vixc -v                      # Version info
```

## Next Steps

- [Syntax Reference](syntax)
- [Type System](types)
- [Ownership System](ownership)
- [Standard Library](stdlib)
