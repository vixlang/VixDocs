# 指针

## 取引用 `ref`

```vix
let x = 10
let ptr = ref x  // 获取 x 的引用
```

## 解引用 `@`

```vix
let value = @ptr    // 读取引用的值
@ptr = 20           // 修改引用的值（ptr 需为 mut）
```

## 可变引用 `mut ref`

```vix
let mut value = 10
let ptr = mut ref value  // 可变独占引用
@ptr = 20
print(value)  // 20
```

## 指针运算

```vix
let arr = [1, 2, 3, 4, 5]
let p = ref arr[0]
let second = @(p + 1)  // arr[1] = 2
```

## 空指针

```vix
let p: ref i32 = nil
if (p == nil) { print("null pointer") }
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
    swap(ref a, ref b)
    print(a)  // 20
    print(b)  // 10
    return 0
}
```

## 与旧语法的区别

| v0.3.0 | v0.2.x |
|--------|--------|
| `ref x` | `&x` |
| `mut ref x` | `&mut x` |
| `ref i32` | `&i32` |
| `@ptr` | `@ptr` |
