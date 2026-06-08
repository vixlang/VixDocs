# Functions

## Definition

```vix
fn add(a: i32, b: i32): i32
{
    return a + b
}
```

## Void Functions

Omit the return type or use `()`:

```vix
fn greet(name: string)
{
    print("Hello, " + name + "!")
}

fn do_nothing(): () { }
```

## Mutable Parameters

```vix
fn inc(mut x: ref i32)
{
    @x = @x + 1
}
```

## Public Functions

```vix
pub fn public_func(x: i32): i32
{
    return x * 2
}
```

## Functions as First-class Values

```vix
fn map:[T, U](list: [T], f: fn(T): U): [U]
{
    let out = []
    for (item in list) { out.push(f(item)) }
    return out
}

fn main(): i32
{
    let nums = [1, 2, 3]
    let doubled = map:[i32, i32](nums, fn(x: i32): i32 { x * 2 })
    return 0
}
```

## Function Types

```vix
type Handler = fn(i32): i32
```

## Recursion

```vix
fn fact(n: i32): i32
{
    if (n <= 1) { return 1 }
    return n * fact(n - 1)
}
```

## Entry Point

```vix
fn main(): i32
{
    return 0
}

// With arguments
fn main(argc: i32, argv: ptr): i32
{
    for (i in 0 .. argc) { print(argv[i]) }
    return 0
}
```
