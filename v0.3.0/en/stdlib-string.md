# String Module (std/String.vix)

## API

```vix
pub fn new_string(src: ptr, len: usize): Result[ptr, ptr]
```

Create a new heap-allocated string copy.

| Param | Description |
|-------|-------------|
| `src` | Source string pointer |
| `len` | Length to copy |

Returns: `Ok(ptr)` on success, `Err(msg)` on failure.

## Example

```vix
import "std/String.vix"

fn main(): i32
{
    let s = new_string("Hello, Vix!", 11)
    match s
    {
        Ok(ptr) ->
        {
            print(ptr)
            free(ptr)
        }
        Err(err) ->
        {
            print(err)
        }
    }
    return 0
}
```

## Dependencies

Depends on `std/mem.vix` (`copy` function) and extern `malloc`/`free`/`strlen`.
