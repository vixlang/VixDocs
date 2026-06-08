# Pointers

## Address-of `ref`

```vix
let x = 10
let ptr = ref x  // take reference to x
```

## Dereference `@`

```vix
let value = @ptr    // read referenced value
@ptr = 20           // write through reference (ptr must be mut)
```

## Mutable References `mut ref`

```vix
let mut value = 10
let ptr = mut ref value  // exclusive mutable reference
@ptr = 20
print(value)  // 20
```

## Pointer Arithmetic

```vix
let arr = [1, 2, 3, 4, 5]
let p = ref arr[0]
let second = @(p + 1)  // arr[1] = 2
```

## Null Pointers

```vix
let p: ref i32 = nil
if (p == nil) { print("null pointer") }
```

## Reference Parameters

```vix
fn swap(mut a: ref i32, mut b: ref i32)
{
    let temp = @a
    @a = @b
    @b = temp
}

fn main(): i32
{
    let a = 10
    let b = 20
    swap(ref a, ref b)
    print(a)  // 20
    print(b)  // 10
    return 0
}
```

## v0.3.0 vs v0.2.x Syntax

| v0.3.0 | v0.2.x |
|--------|--------|
| `ref x` | `&x` |
| `mut ref x` | `&mut x` |
| `ref i32` | `&i32` |
| `@ptr` | `@ptr` |
