# 指针

## 取引用 `ref`

```vix
let x = 10
let ptr = ref x              /* 获取 x 的不可变引用 */
```

## 解引用 `@`

```vix
print(@ptr)                  /* Output: 10 */
```

## 可变引用 `mut ref`

```vix
let mut value = 10
let ptr = mut ref value
@ptr = 20
print(value)                 /* Output: 20 */
```

## 函数引用参数

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
    swap(mut ref a, mut ref b)
    print(a)                 /* Output: 20 */
    print(b)                 /* Output: 10 */
    return 0
}
```

## 指针运算

```vix
let arr = [1, 2, 3, 4, 5]
let p = ref arr[0]
print(@(p + 1))              /* Output: 2 */
```

## 空指针

```vix
let p: ref i32 = nil
if (p == nil) { print("null") }
```

## 边界情况

- **`nil` 解引用**：未定义行为，编译器不保证捕获。
- **`ptr` vs `ref T`**：`ptr` 是通用指针无类型信息，`ref T` 携带类型。
