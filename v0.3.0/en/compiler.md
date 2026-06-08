# Compiler Architecture

vixc is an AOT compiler that translates Vix sources to native executables. The frontend is written in C, backend in C++.

## Compilation Pipeline

```
Source → Flex Lexer → Bison Parser → AST
  → Import Inlining → Semantic Analysis → Type Check → Ownership Check
  → LLVM IR Gen → LLC Object → LLD Link → Executable
```

## Source Organization

```
src/
├── main.c              # Entry point, CLI, pipeline orchestration
├── ast/ast.c           # AST node creation, manipulation, import inlining
├── parser/
│   ├── lexer.l         # Flex lexer
│   └── parser.y        # Bison parser
├── semantic/
│   └── semantic.c      # Symbol table, scope analysis
├── Typeck/
│   ├── Typeck.cpp      # Hindley-Milner type checker
│   ├── TypeckInfer.cpp # C bridge
│   └── LayOut.cpp      # Type size/alignment
├── Ownership/
│   └── Ownership.cpp   # Ownership & borrow checker
├── compiler/
│   ├── CodeGen.cpp     # LLVM IR generation
│   ├── Passes.cpp      # LLVM optimization
│   ├── Llc/            # LLVM IR → object
│   └── Linker/         # LLD linking
├── utils/error.c       # Error reporting
└── std/                # Standard library
```

## Headers

| File | Purpose |
|------|---------|
| `include/ast.h` | AST node types, TypeInfo |
| `include/codegen.h` | `llvm_emit_from_ast()` |
| `include/compiler.h` | Error reporting API |
| `include/env.h` | TypeEnv class |
| `include/ownership.h` | `ownership_check_program()` |
| `include/semantic.h` | Symbol table API |
| `include/type.h` | Type system (C++ representation) |
| `include/typeck.h` | `typecheck_program()` |
| `include/unify.h` | Unifier engine |

## Build

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release --parallel
```
