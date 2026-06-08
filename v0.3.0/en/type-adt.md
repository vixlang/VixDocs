# ADT Types (Algebraic Data Types)

## Definition

```vix
type Color = Red | Green | Blue
type Option:[T] = Some(T) | None
type Result:[T, E] = Ok(T) | Err(E)
```

Leading `|` is supported in v0.3.0:

```vix
type Color =
    | Red
    | Green
    | Blue
```

## Using Option

```vix
fn first_or_none(list: [string]): ?string
{
    if (list.length > 0) { return Some(list[0]) }
    return None
}

fn main(): i32
{
    let a = first_or_none(["hello", "world"])
    match a
    {
        Some(v) -> print(v)
        None -> print("empty")
    }
    return 0
}
```

## Using Result

```vix
type Result:[T, E] = Ok(T) | Err(E)

fn divide(a: i32, b: i32): Result:[i32, string]
{
    if (b == 0) { return Err("divide by zero") }
    return Ok(a / b)
}
```

## Match with ADT Constructors

```vix
match value {
    Some(v) -> print(v)
    None -> print("none")
}

match result {
    Ok(v) -> print(v)
    Err(e) -> print(e)
}
```

## Type Annotation for Constructors

```vix
let ok = Ok(42) : Result[i32, string]
let none = None : ?string
```
