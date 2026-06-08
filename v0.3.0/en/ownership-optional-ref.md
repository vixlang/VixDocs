# Optional References `?ref T`

## Syntax

```vix
fn maybe_ref(flag: i32, value: ref i32): ?ref i32
{
    if (flag == 0) { return None }
    return Some(value)
}
```

## Usage

```vix
fn main(): i32
{
    let x = 42
    let r = maybe_ref(1, ref x)

    match r
    {
        Some(ptr) -> print(@ptr)
        None -> print("no reference")
    }
    return 0
}
```

## Notes

- `?ref T` models "maybe a reference" without explicit lifetime annotations
- Pattern matched via `Some`/`None` constructors
- Internally represented using ADT and pointer types
