# ADT 类型（代数数据类型）

## 定义

```vix
type Color = Red | Green | Blue
type Option:[T] = Some(T) | None
type Result:[T, E] = Ok(T) | Err(E)
```

v0.3.0 支持可选的**前导 `|`**，使枚举风格更统一：

```vix
type Color =
    | Red
    | Green
    | Blue
```

## 使用 Option

```vix
fn first_or_none(list: [string]): ?string
{
    if (list.length > 0) { return Some(list[0]) }
    return None
}

fn main(): i32
{
    let a = first_or_none(["hello", "world"])
    match a
    {
        Some(v) -> print(v)
        None -> print("empty")
    }
    return 0
}
```

## 使用 Result

```vix
type Result:[T, E] = Ok(T) | Err(E)

fn divide(a: i32, b: i32): Result:[i32, string]
{
    if (b == 0) { return Err("divide by zero") }
    return Ok(a / b)
}

fn main(): i32
{
    match divide(10, 2)
    {
        Ok(v) -> print(v)
        Err(e) -> print(e)
    }
    return 0
}
```

## match 模式匹配

```vix
match value {
    Some(v) -> print(v)
    None -> print("none")
}

match result {
    Ok(v) -> print(v)
    Err(e) -> print(e)
}
```

## 构造器类型标注

```vix
let ok = Ok(42) : Result[i32, string]
let none = None : ?string
```
