# Syntax Reference

## Program Structure

```vix
import "std/io.vix"           // imports
extern "C" { ... }            // extern declarations
let global = 42                // globals
type Point = struct { ... }   // type definitions
fn main(): i32 { ... }        // function definitions
```

## Comments

```vix
// Line comment
/* Block comment */
```

## Keywords

`fn` `let` `mut` `ref` `if` `elif` `else` `while` `for` `in` `return` `match` `struct` `type` `import` `pub` `extern` `break` `continue` `true` `false` `nil` `and` `or`

## Type Keywords

`i8` `i32` `i64` `f32` `f64` `bool` `string` `void` `ptr` `usize`

## Operator Precedence

| Precedence | Operators | Description |
|------------|-----------|-------------|
| 1 | `()` `[]` `.` `@` | Group/Index/Member/Deref |
| 2 | `!` `~` `-`(unary) `ref` | NOT/Negate/Address |
| 3 | `**` | Power |
| 4 | `*` `/` `%` | Multiply/Divide/Mod |
| 5 | `+` `-` | Add/Subtract, String concat |
| 6 | `<<` `>>` | Shift |
| 7 | `<` `<=` `>` `>=` | Comparison |
| 8 | `==` `!=` | Equality |
| 9 | `&` | Bitwise AND |
| 10 | `^` | Bitwise XOR |
| 11 | `\|` | Bitwise OR |
| 12 | `and` | Logical AND |
| 13 | `or` | Logical OR |
| 14 | `=` `+=` `-=` `*=` `/=` `%=` | Assignment |

## Literals

```vix
42                      // i32 integer
0x2A                    // hexadecimal
0b101010                // binary
0o52                    // octal
3.14                    // f64 float
"hello"                 // string
'x'                     // character
true false              // boolean
nil                     // null pointer
()                      // unit type
```

## Variable Declarations

```vix
let x = 10               // immutable, inferred
let y: i32 = 10          // explicit type
let mut z = 20           // mutable
let static mut id = 0    // static (inside functions)
```

## References

```vix
ref value                // immutable shared reference
mut ref value            // mutable exclusive reference
@ptr                     // dereference
```

## Control Flow

```vix
if (cond) { ... } elif (cond) { ... } else { ... }
while (cond) { ... }
for (i in 0 .. 10) { ... }
match value { 1 -> { ... } _ -> { ... } }
```

## Functions

```vix
fn add(a: i32, b: i32): i32 { return a + b }
fn greet(name: string) { print(name) }
pub fn pub_func(x: i32): i32 { x * 2 }
```

## ADT

```vix
type Option:[T] = Some(T) | None
type Result:[T, E] = Ok(T) | Err(E)
type Color = Red | Green | Blue
```
