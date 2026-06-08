# Random Module (std/rand.vix)

## API

```vix
pub fn rand(mini: i32, max: i32): i32
```

Returns a pseudo-random integer in `[mini, max]`.

## Example

```vix
import "std/rand.vix"

fn main(): i32
{
    let n = rand(1, 100)
    print(n)
    return 0
}
```

## Notes

- Uses a linear congruential generator (LCG)
- Result type is determined by the lvalue type
- Not suitable for cryptographic use
