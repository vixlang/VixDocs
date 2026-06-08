# Array Module (std/arr.vix)

## API

```vix
pub fn sort(nums: [i32], size: i32)
```

Bubble sort for `[i32]` arrays.

## Example

```vix
import "std/arr.vix"

fn main(): i32
{
    let arr = [5, 2, 8, 1, 9, 10]
    sort(arr, 6)
    for (i in 0 .. arr.length)
    {
        print(arr[i])
    }
    return 0
}
```
