# What is Vix

Vix is a **lightweight, statically typed** compiled programming language. It combines C-like performance, Rust-inspired memory safety, and modern syntax expressiveness.

## Design Goals

- **Performance first**: LLVM-based AOT compilation, native machine code
- **Memory safety**: v0.3.0 introduces a lightweight Owner system with compile-time ownership checking
- **Simple syntax**: No semicolons, minimal keywords (`let`, `fn`, `match`, etc.)
- **Self-hosting**: Bootstrapping compiler (vixc0) written in Vix

## Core Features

- Static typing with Hindley-Milner type inference
- LLVM backend (x86_64, AArch64, ARM, RISC-V, WebAssembly)
- Algebraic data types: Option, Result, custom enums
- Generics with type parameterization
- Ownership system: borrow checking, move semantics, copy inference
- Tuples, strings, dynamic arrays
- No garbage collection
- `extern "C"` FFI
- Cross-platform: Windows / Linux / macOS

## Example

```vix
fn fib(n: i32): i64
{
    let mut a = 0
    let mut b = 1
    for (i in 1 .. n)
    {
        let c = a + b
        a = b
        b = c
    }
    return b
}

fn main(): i32
{
    print(fib(40))
    return 0
}
```

## Version History

| Version | Date | Milestone |
|---------|------|-----------|
| v0.3.0 | 2026-06-07 | Ownership system, ref/mut ref |
| v0.2.0 - v0.2.10 | 2026-05 | Type hardening, ADT fixes, syntax enhancements |
| v0.1.0 - v0.1.2 | 2026-05 | Initial design, power operator, string matching |

## Bootstrapping (vixc0)

Vix is bootstrapping itself. `vixc0` is a Vix compiler frontend written in Vix, supporting `--lex`, `--parser`, `--ast` debug modes and QBE text output.

## Ecosystem

| Project | Description | Status |
|---------|-------------|--------|
| vixc compiler | Core compiler (LLVM backend) | Active |
| vixc0 | Vix self-hosted compiler | Prototype |
| xpm | Vix package manager | Community |
| VS Code extension | Syntax highlighting and analysis | Released |
