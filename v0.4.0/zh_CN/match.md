# match 表达式

`match` 对值进行模式匹配，支持字面量、构造器解构、变量绑定和通配符。

## 基本语法

```vix
match value
{
    1 -> print("one")
    2 -> print("two")
    _ -> print("other")
}
```

## ADT 构造器解构

```vix
type Option:[T] = Some(T) | None

match option
{
    Some(v) -> print(v)
    None    -> print("none")
}

type Result:[T, E] = Ok(T) | Err(E)

match result
{
    Ok(v)  -> print("ok: ", v)
    Err(e) -> print("err: ", e)
}
```

## 字符串匹配

使用 `strcmp` 内容比较：

```vix
let code = "404"
match code
{
    "200" -> print("OK")
    "404" -> print("Not Found")
    _     -> print("Unknown")
}
/* Output: Not Found */
```

## 函数调用作为条件

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
        None    -> print("none")
    }
    /* Output: hello */
    return 0
}
```

## 单行分支

```vix
match x { 1 -> print("one")  2 -> print("two")  _ -> print("other") }
```

## 边界情况

- **重叠模式**：按书写顺序第一胜出。
- **函数副作用**：匹配目标表达式只求值一次。
- **穷尽性**：`[TODO: 确认是否强制覆盖所有可能值]`
