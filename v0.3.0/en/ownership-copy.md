# Copy Type Inference

Vix uses a **heuristic Copy model** to automatically infer which types are Copy, without user annotations.

## Copy Types

| Type | Notes |
|------|-------|
| `i8` `i32` `i64` | Integer types |
| `f32` `f64` | Float types |
| `bool` | Boolean |
| `ref T` / `ptr` | References and pointers |
| `fn(T): U` | Function values |
| `string` | Lightweight reference-like values |
| `struct { ... }` | Struct values |
| `[T * N]` (size <= 16) | Small fixed arrays |

## Non-Copy Types

| Type | Notes |
|------|-------|
| `[T]` | Dynamic arrays |
| Generic applications | Default non-Copy |

## Examples

```vix
// i32 is Copy, both usable after assignment
let x = 10
let y = x
print(x)  // OK

// [i32] is non-Copy, ownership transfers
let xs = [1, 2, 3]
let ys = xs
print(xs[0])  // ERROR: use of moved value
```

## Uppercase Constructors

Uppercase enum-like constructors/constants are treated as Copy:

```vix
type Option:[T] = Some(T) | None
// None is Copy
```
