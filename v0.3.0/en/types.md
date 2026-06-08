# Type System

Vix has a static type system with Hindley-Milner type inference and unification.

## Type Categories

| Category | Types |
|----------|-------|
| Primitive | `i8` `i32` `i64` `f32` `f64` `bool` `string` `void` `ptr` `usize` |
| Compound | `[T]` (dynamic) `[T * N]` (fixed) `(T1, T2)` (tuple) |
| User-defined | `struct { ... }` / `type NAME = struct { ... }` |
| ADT | `type NAME = Ctor1(T) \| Ctor2` |
| Generic | `type NAME:[T] = struct { ... }` |
| Optional | `?T` / `?ref T` |
| Function | `fn(T): U` |
| Reference | `ref T` / `mut ref T` |

## Type Inference

```vix
let a = 42        // i32
let b = 3.14      // f64
let c = "hello"   // string
let d = true      // bool
```

## Numeric Promotion

```vix
let a: i32 = 10
let b: i64 = a    // i32 promotes to i64
let c: f64 = a    // integer to float
```

## Subtopics

- [Primitive Types](type-primitive)
- [Array Types](type-array)
- [Struct Types](type-struct)
- [ADT Types](type-adt)
- [Tuple Types](type-tuple)
- [Generics](type-generic)
- [Optional Types](type-optional)
