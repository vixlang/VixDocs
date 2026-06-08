# Array Types

## Dynamic Arrays `[T]`

```vix
let list: [i32] = [1, 2, 3]
list.push(4)            // append element
print(list.length)      // read length
print(list[0])          // index access
list[0] = 10            // mutate element (needs mut)
```

## Fixed Arrays `[T * N]`

```vix
let arr: [i32 * 5] = [1, 2, 3, 4, 5]
print(arr.length)       // 5
print(arr[0])           // 1
arr[1] = 10             // mutate (needs mut)
```

## Multi-dimensional Arrays

```vix
let matrix: [[i32 * 3] * 3] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[0][1])     // 2
```

## Empty Arrays

```vix
let arr: [i32] = []         // empty dynamic array
let fixed: [i32 * 0] = []   // empty fixed array
```

## Operations

| Operation | Syntax | Description |
|-----------|--------|-------------|
| Index | `arr[i]` | Access/mutate element |
| Length | `arr.length` | Get element count |
| Push | `arr.push(x)` | Append to dynamic array (needs mut) |
