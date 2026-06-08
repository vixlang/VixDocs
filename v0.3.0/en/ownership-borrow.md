# Borrow Rules

## Rules Summary

1. **Multiple immutable borrows** (`ref`) are allowed per statement
2. **Mutable borrow** (`mut ref`) must be **exclusive**
3. Mutable and immutable borrows cannot overlap
4. Cannot move a value while it is borrowed
5. Temporary borrows release at end of statement

## Multiple Immutable Borrows (OK)

```vix
fn add_refs(a: ref i32, b: ref i32): i32
{
    return @a + @b
}

fn main(): i32
{
    let x = 10
    let y = 20
    print(add_refs(ref x, ref y))  // borrow x and y simultaneously
    return 0
}
```

## Duplicate Mutable Borrow (Error)

```vix
fn main(): i32
{
    let mut value = 10
    let r1 = mut ref value
    let r2 = mut ref value  // ERROR: cannot mutably borrow more than once
    return 0
}
```

## Borrow + Move (Error)

```vix
fn main(): i32
{
    let xs = [1, 2, 3]
    let r = ref xs
    let ys = xs            // ERROR: cannot move borrowed value
    return 0
}
```

## Assign While Borrowed (Error)

```vix
fn main(): i32
{
    let mut value = 10
    let r = ref value
    value = 20             // ERROR: cannot assign to borrowed value
    return 0
}
```
