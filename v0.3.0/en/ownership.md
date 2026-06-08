# Ownership System

Vix v0.3.0 introduces a lightweight Owner system: compile-time ownership and borrow checking for Rust-style memory safety with a simpler model.

## Design Goals

- Memory safety without garbage collection
- Use-after-move detection
- Dangling reference detection
- Zero runtime overhead
- No explicit lifetime annotations

## Compilation Phase

Ownership checking runs after type checking:

```
Parse → Semantic Analysis → Type Check → Ownership Check → CodeGen
```

## Core Concepts

| Concept | Description |
|---------|-------------|
| Ownership | Each value has a unique owner |
| Move | Non-Copy types transfer ownership on assignment |
| Borrow | `ref` creates immutable reference, `mut ref` creates mutable |
| Copy | Small/simple types are automatically inferred as Copy |

## vs Rust

| Aspect | Vix | Rust |
|--------|-----|------|
| Lifetimes | Statement-scoped | `'a` generic lifetimes |
| Copy inference | Heuristic automatic | Explicit trait |
| Borrow check | Statement-level temps | NLL |
| Drop | Not supported | Supported |
| Pin/Unpin | Not supported | Supported |

## Subtopics

- [Reference Syntax](ownership-ref)
- [Move Semantics](ownership-move)
- [Borrow Rules](ownership-borrow)
- [Copy Type Inference](ownership-copy)
- [Optional References](ownership-optional-ref)
