# Optional Types `?T`

## Syntax

`?T` represents a value that may be absent:

```vix
fn find(name: string): ?i32
{
    if (name == "key") { return Some(42) }
    return None
}
```

## Using match

```vix
match find("key")
{
    Some(v) -> print("found:", v)
    None -> print("not found")
}
```

## Optional References `?ref T`

v0.3.0 supports optional references:

```vix
fn maybe_ref(flag: i32, value: ref i32): ?ref i32
{
    if (flag == 0) { return None }
    return Some(value)
}
```

## Implementation

`?T` is implemented using ADT `Some`/`None` constructors with pointer semantics.
