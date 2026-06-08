# Compiler CLI Reference

## Usage

```
vixc [options] <input.vix>
vixc file1.o file2.o ... -o <output>
```

## Options

| Flag | Description |
|------|-------------|
| `-o <file>` | Write output to `<file>` |
| `-S [file]` | Emit assembly (default: `<input>.s`) |
| `-obj [file]` | Emit object file (default: `<input>.o`) |
| `-ll [file]` | Emit LLVM IR (default: `<input>.ll`) |
| `-llvm` | Print LLVM IR to stdout |
| `-ast` | Print AST to stdout |
| `--debug` | Enable debug output |
| `--check` | Syntax & type check only |
| `--time` | Show phase timing breakdown |
| `-opt=lN` | Set optimization level (N = 0..3) |
| `--target=<triple>` | Set codegen/link target triple |
| `-v, --version` | Display compiler version |
| `-h, --help` | Display help message |

## Attributes

```vix
#[no_std]   // Don't link standard library
#[no_main]  // Don't require a main function
```

## Examples

```bash
# Compile to executable
vixc hello.vix -o hello

# Type check only
vixc hello.vix --check

# View AST
vixc hello.vix -ast

# View LLVM IR
vixc hello.vix -llvm

# Optimization level 3
vixc hello.vix -opt=l3 -o hello

# Cross-compile to ARM64
vixc hello.vix --target=aarch64-linux-gnu -o hello

# Cross-compile to WebAssembly
vixc hello.vix --target=wasm32-unknown-unknown -o hello.wasm

# Multi-object file linking
vixc a.o b.o c.o -o program
```

## Linker C API

```c
typedef struct {
    const char* target_triple;
    int bare_mode;
    const char* linker_script;
    int static_link;
    const char* entry_point;
    const char* libc_dir;
} VixLinkOptions;

int vix_link(const char* obj_file, const char* output_file,
             const VixLinkOptions* options, const char** error_msg);

int vix_link_multi(const char** obj_files, int obj_count,
                   const char* output_file,
                   const VixLinkOptions* options, const char** error_msg);
```
