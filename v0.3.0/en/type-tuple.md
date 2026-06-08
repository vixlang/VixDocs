# Tuple Types

## Syntax

```vix
let pair = (1, "hello")
print(pair.0)  // 1
print(pair.1)  // "hello"
```

## Function Return Values

```vix
fn get_pair(): (i32, string)
{
    return (42, "answer")
}

fn main(): i32
{
    let p = get_pair()
    print(p.0)  // 42
    print(p.1)  // "answer"
    return 0
}
```

## In Structs

```vix
type HashMap:[V] = struct
{
    buckets: [ [ (string, V) ] ]
    size: i32
}
```
