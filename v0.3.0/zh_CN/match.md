# match 表达式

## 基本语法

```vix
match value
{
    1 -> { print("one") }
    2 -> { print("two") }
    _ -> { print("other") }
}
```

## 单行分支（v0.3.0）

```vix
match value
{
    1 -> print("one")
    2 -> print("two")
    _ -> print("other")
}
```

## 字符串匹配

```vix
let s = "hello"
match s
{
    "hello" -> print("greeting")
    "world" -> print("earth")
    _ -> print("unknown")
}
```

字符串比较使用 `strcmp()`，而非指针比较。

## ADT 构造器匹配

```vix
match option
{
    Some(v) -> print(v)
    None -> print("none")
}

match result
{
    Ok(v) -> print(v)
    Err(e) -> print(e)
}
```

## 函数调用作为条件（v0.3.0）

```vix
fn choose(flag: i32): ?string
{
    if (flag == 0) { return None }
    return Some("hello")
}

fn main(): i32
{
    match choose(1)
    {
        Some(v) -> print(v)
        None -> print("none")
    }
    return 0
}
```

## 通配符 `_`

```vix
match x
{
    0 -> print("zero")
    _ -> print("non-zero")
}
```
