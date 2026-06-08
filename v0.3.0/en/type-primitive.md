# Primitive Types

## Type Table

| Type | Description | Size | Range |
|------|-------------|------|-------|
| `i8` | 8-bit signed integer | 1 byte | -128 ~ 127 |
| `i32` | 32-bit signed integer | 4 bytes | -2^31 ~ 2^31-1 |
| `i64` | 64-bit signed integer | 8 bytes | -2^63 ~ 2^63-1 |
| `f32` | 32-bit float | 4 bytes | ±3.4e-38 ~ ±3.4e38 |
| `f64` | 64-bit float | 8 bytes | ±1.7e-308 ~ ±1.7e308 |
| `bool` | Boolean | 1 byte | true / false |
| `string` | String | pointer size | UTF-8 |
| `void` | Void type | 0 | - |
| `ptr` | Generic pointer | 8 bytes | 64-bit address |
| `usize` | Unsigned size type | 8 bytes | 0 ~ 2^64-1 |

## Examples

```vix
let small: i8 = 127
let count: i32 = 1000000
let big: i64 = 9223372036854775807
let temp: f32 = 36.5
let pi: f64 = 3.14159
let flag: bool = true
let greeting: string = "hello"
let generic: ptr = nil
let len: usize = 42
```

## String Operations

```vix
let s = "Hello"
print(s.length)          // 5
let full = s + " World"  // "Hello World"
```

## Escape Sequences

| Sequence | Description |
|----------|-------------|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double quote |
| `\0` | Null character |
