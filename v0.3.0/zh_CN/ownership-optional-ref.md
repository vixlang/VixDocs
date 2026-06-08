# 可选引用 `?ref T`

## 语法

```vix
fn maybe_ref(flag: i32, value: ref i32): ?ref i32
{
    if (flag == 0) { return None }
    return Some(value)
}
```

## 使用

```vix
fn main(): i32
{
    let x = 42
    let r = maybe_ref(1, ref x)

    match r
    {
        Some(ptr) -> print(@ptr)
        None -> print("no reference")
    }
    return 0
}
```

## 说明

- `?ref T` 提供"可能为空的引用"的建模方式
- 无需显式生命周期标注
- 通过 `Some`/`None` 构造器进行模式匹配
- 内部通过 ADT 和指针承载
