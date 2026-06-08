# 可选类型 `?T`

## 语法

`?T` 表示一个可能为空的值：

```vix
fn find(name: string): ?i32
{
    if (name == "key") { return Some(42) }
    return None
}
```

## 使用 match

```vix
match find("key")
{
    Some(v) -> print("found:", v)
    None -> print("not found")
}
```

## 可选引用 `?ref T`

v0.3.0 支持可选引用：

```vix
fn maybe_ref(flag: i32, value: ref i32): ?ref i32
{
    if (flag == 0) { return None }
    return Some(value)
}
```

## 内部实现

`?T` 在当前实现中以指针语义承载，通过 ADT 的 `Some`/`None` 构造器实现。
