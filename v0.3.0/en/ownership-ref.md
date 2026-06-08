# Reference Syntax

## Immutable Reference `ref`

```vix
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

## Mutable Reference `mut ref`

```vix
fn inc(mut p: ref i32)
{
    @p = @p + 1
}

fn main(): i32
{
    let mut value = 10
    inc(mut ref value)
    print(value)  // 11
    return 0
}
```

## Rules

| Syntax | Semantics | Notes |
|--------|-----------|-------|
| `ref value` | Immutable shared borrow | Multiple allowed per statement |
| `mut ref value` | Mutable exclusive borrow | No overlapping allowed |

## Temporary Borrow Scope

Borrows are released at end of statement:

```vix
let r = ref value  // released after this statement
```

## Parameter Passing

```vix
fn swap(mut a: ref i32, mut b: ref i32)
{
    let temp = @a
    @a = @b
    @b = temp
}
```
