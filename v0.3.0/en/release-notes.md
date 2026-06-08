# Release Notes

## v0.3.0 (2026-06-07)

### New Features

#### Lightweight Owner System
- Compile-time ownership and borrow checking
- Ownership transfer for non-Copy values
- Exclusive mutable references and shared immutable references
- Use-after-move detection
- Dangling local reference detection
- Copy type inference (heuristic)
- Statement-scoped temporary borrows

#### New Reference Syntax: `ref` and `mut ref`
- `ref value` creates immutable shared borrow
- `mut ref value` creates mutable exclusive borrow
- Multiple immutable borrows allowed per statement
- Mutable borrow must be exclusive
- Temporary borrows released at end of statement

#### Type System Enhancements
- `usize` is now a recognized type keyword
- Unit type `()`
- Prefix logical NOT operator `!`
- Leading `|` in enum definitions

#### Match Enhancements
- Call expression scrutinees: `match choose(1) { ... }`
- Single-line match arms: `Some(v) -> print(v)`

#### Other
- Compound assignment on general lvalues
- Multi-object file linking: `vixc a.o b.o -o prog`
- String concatenation null-pointer safety
- Global dynamic array `push` writeback fix

### Internal Changes

- New `src/Ownership/Ownership.cpp`
- New `include/ownership.h`
- Pipeline: Type Check → Ownership Check → CodeGen
- Old `&` syntax replaced by `ref`/`mut ref`

### Compatibility

Not included: lifetime annotations, full NLL, Pin/Unpin, Drop, self-referential structs.

## v0.2.0 - v0.2.10 Summary

| Version | Date | Highlights |
|---------|------|------------|
| v0.2.10 | 2026-06-06 | Multi-object linking, leading `\|` in enums |
| v0.2.9 | 2026-05-31 | Array parameter warnings, for-loop numeric promotion |
| v0.2.8 | 2026-05-31 | Match call expressions, vixc0 prototype |
| v0.2.6 | 2026-05-30 | Reference param fixes, variable shadowing, empty arrays |
| v0.2.5 | 2026-05-30 | `!` operator, `()` unit type, syntax deprecation warnings |
| v0.2.1 | 2026-05-15 | `str` removed, `usize` added |
| v0.2.0 | 2026-05-15 | Removed `global`/`const`, immutable by default, explicit `main` |
