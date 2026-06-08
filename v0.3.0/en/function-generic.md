# Generic Functions

## Definition

```vix
fn identity:[T](x: T): T
{
    return x
}
```

## Usage

```vix
fn main(): i32
{
    let a = identity:[i32](42)
    let b = identity:[string]("hello")
    let c = identity:[f64](3.14)
    return 0
}
```

## Multiple Type Parameters

```vix
fn pair:[T, U](a: T, b: U): (T, U)
{
    return (a, b)
}
```

## Generics with Numeric Promotion

```vix
fn add:[T](a: T, b: T): T
{
    return a + b
}

fn main(): i32
{
    print(add:[i32](1, 2))      // 3
    print(add:[f64](1.5, 2.5))  // 4.0
    return 0
}
```
