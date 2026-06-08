# Type Utilities Module (std/type.vix)

## API

```vix
pub fn isalpha(c): i32       // Check if alphabetic (a-z, A-Z, _)
pub fn isdigit(c): i32       // Check if digit (0-9)
pub fn isidentchar(c): i32   // Check if identifier char (alpha or digit)
```

## Example

```vix
import "std/type.vix"

fn main(): i32
{
    print(isalpha('a'))   // 1
    print(isalpha('1'))   // 0
    print(isdigit('5'))   // 1
    print(isidentchar('_')) // 1
    return 0
}
```
