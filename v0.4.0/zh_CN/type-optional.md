# 可选类型 `?T`

`?T` 是 `Option:[T]` 的语法糖，表示一个可能为空的返回值。

## 基本用法

```vix
fn find_in_list(list: [string], target: string): ?string
{
    for (item in list)
    {
        if (item == target) { return Some(item) }
    }
    return None
}

fn main(): i32
{
    let result = find_in_list(["a", "b", "c"], "b")
    match result
    {
        Some(v) -> print("found: ", v)
        None    -> print("not found")
    }
    /* Output: found: b */
    return 0
}
```

## 可选引用 `?ref T`

表示可能为空的引用：

```vix
fn maybe_ref(flag: i32, value: ref i32): ?ref i32
{
    if (flag == 0) { return None }
    return Some(value)
}

fn main(): i32
{
    let x = 42
    let r = maybe_ref(1, ref x)
    match r
    {
        Some(ptr) -> print(@ptr)
        None      -> print("no ref")
    }
    /* Output: 42 */
    return 0
}
```

## 内部实现

`?T` 通过 ADT 的 `Some`/`None` 构造器实现，以指针语义承载。
