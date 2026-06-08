# Generics

## Syntax

Generic parameters use `:[T]` syntax.

## Generic Functions

```vix
fn identity:[T](x: T): T
{
    return x
}

fn main(): i32
{
    let a = identity:[i32](42)
    let b = identity:[string]("hello")
    return 0
}
```

## Generic Structs

```vix
type Box:[T] = struct { value: T }
type Pair:[T, U] = struct { first: T, second: U }
type HashMap:[V] = struct { buckets: [ [ (string, V) ] ], size: i32 }
```

## Generic ADTs

```vix
type Option:[T] = Some(T) | None
type Result:[T, E] = Ok(T) | Err(E)
```

## Type Application

```vix
fn main(): i32
{
    let map = new_hashmap:[i32](10)
    put:[i32](&map, "key", 42)
    return 0
}
```

## Monomorphization

Generics are implemented via monomorphization at compile time — each unique type instantiation generates its own LLVM function/struct.
