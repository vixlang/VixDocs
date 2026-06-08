# Match Expressions

## Basic Syntax

```vix
match value
{
    1 -> { print("one") }
    2 -> { print("two") }
    _ -> { print("other") }
}
```

## Single-line Arms (v0.3.0)

```vix
match value
{
    1 -> print("one")
    2 -> print("two")
    _ -> print("other")
}
```

## String Matching

```vix
let s = "hello"
match s
{
    "hello" -> print("greeting")
    "world" -> print("earth")
    _ -> print("unknown")
}
```

String comparison uses `strcmp()` not pointer equality.

## ADT Constructor Matching

```vix
match option
{
    Some(v) -> print(v)
    None -> print("none")
}

match result
{
    Ok(v) -> print(v)
    Err(e) -> print(e)
}
```

## Call Expression Scrutinees (v0.3.0)

```vix
fn choose(flag: i32): ?string
{
    if (flag == 0) { return None }
    return Some("hello")
}

fn main(): i32
{
    match choose(1)
    {
        Some(v) -> print(v)
        None -> print("none")
    }
    return 0
}
```

## Wildcard `_`

```vix
match x
{
    0 -> print("zero")
    _ -> print("non-zero")
}
```
