# HashMap Module (std/hash.vix)

## Type

```vix
type HashMap:[V] = struct
{
    buckets: [ [ (string, V) ] ]
    size: i32
}
```

## API

```vix
pub fn new_hashmap:[V](capacity: i32): HashMap:[V]
pub fn len:[V](map: HashMap:[V]): i32
pub fn capacity:[V](map: HashMap:[V]): i32
pub fn put:[V](mut map: ref HashMap:[V], key: string, value: V)
pub fn get:[V](map: ref HashMap:[V], key: string): ?V
pub fn contains:[V](map: ref HashMap:[V], key: string): bool
```

## Example

```vix
import "std/hash.vix"

fn main(): i32
{
    let mut map = new_hashmap:[i32](10)
    put:[i32](mut ref map, "one", 1)
    put:[i32](mut ref map, "two", 2)

    print(contains:[i32](ref map, "one"))   // true
    print(contains:[i32](ref map, "four"))  // false

    let val = get:[i32](ref map, "two")
    match val
    {
        Some(v) -> print(v)  // 2
        None -> {}
    }
    return 0
}
```

## Hash Algorithm

Uses DJB2 hash:

```vix
fn hash_str(s: string): i32
{
    let mut hash = 5381
    for (i in 0 .. s.length)
    {
        hash = (hash * 33) + s[i]
    }
    if (hash < 0) { hash = -hash }
    return hash
}
```
