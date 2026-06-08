# 引用语法

## 不可变引用 `ref`

```vix
fn read(x: ref i32): i32
{
    return @x
}

fn main(): i32
{
    let value = 10
    print(read(ref value))
    return 0
}
```

## 可变引用 `mut ref`

```vix
fn inc(mut p: ref i32)
{
    @p = @p + 1
}

fn main(): i32
{
    let mut value = 10
    inc(mut ref value)
    print(value)  // 11
    return 0
}
```

## 规则

| 语法 | 语义 | 说明 |
|------|------|------|
| `ref value` | 不可变共享借用 | 同一语句中允许多个 |
| `mut ref value` | 可变独占借用 | 同一语句中不允许重叠 |

## 临时借用作用域

借用在同一语句结束时自动释放：

```vix
let r = ref value  // 借用：语句结束后释放
```

## 函数参数

```vix
fn swap(mut a: ref i32, mut b: ref i32)
{
    let temp = @a
    @a = @b
    @b = temp
}
```
