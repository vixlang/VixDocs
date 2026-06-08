# Move Semantics

## Non-Copy Values

Non-Copy types **transfer ownership** on assignment. The original variable becomes invalid:

```vix
fn main(): i32
{
    let xs = [1, 2, 3]  // dynamic array, non-Copy
    let ys = xs          // ownership moves from xs to ys
    return xs[0]         // ERROR: use of moved value 'xs'
}
```

## Last-use Move

Moving on the last use is legal:

```vix
fn take(xs: [i32]): i32
{
    return xs[0]
}

fn main(): i32
{
    let xs = [1, 2, 3]
    let ys = xs          // xs is moved
    return take(ys)      // ys is moved to function
}
```

## Function Argument Moves

```vix
fn consume(arr: [i32])
{
    print(arr[0])
}
```

## No Move While Borrowed

```vix
fn main(): i32
{
    let xs = [1, 2, 3]
    let r = ref xs       // borrow xs
    let ys = xs          // ERROR: cannot move borrowed value
    return 0
}
```
