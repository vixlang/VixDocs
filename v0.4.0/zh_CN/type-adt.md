# ADT 类型

代数数据类型（Algebraic Data Type）是 Vix 中表示多种可能形式之一的类型机制，包括枚举和带负载的构造器。

## 简单枚举

```vix
type Color = Red | Green | Blue

fn describe(c: Color): string
{
    match c
    {
        Red   -> { return "Red" }
        Green -> { return "Green" }
        Blue  -> { return "Blue" }
    }
}
```

## 带负载的构造器

```vix
type Option:[T] = Some(T) | None
type Result:[T, E] = Ok(T) | Err(E)
```

## `?T` 可选类型语法糖

`?T` 等价于 `Option:[T]`：

```vix
fn find(name: string): ?i32
{
    if (name == "key") { return Some(42) }
    return None
}

fn main(): i32
{
    match find("key")
    {
        Some(v) -> print("found: ", v)
        None    -> print("not found")
    }
    /* Output: found: 42 */
    return 0
}
```

## Result 示例

```vix
fn divide(a: i32, b: i32): Result:[i32, string]
{
    if (b == 0) { return Err("division by zero") }
    return Ok(a / b)
}

fn main(): i32
{
    match divide(10, 2)
    {
        Ok(v)  -> print("result: ", v)
        Err(e) -> print("error: ", e)
    }
    /* Output: result: 5 */
    return 0
}
```

## 前导 `|` 风格

```vix
type Status =
    | Pending
    | Running
    | Completed
    | Failed
```

## 构造器类型标注

当上下文无法推断类型时，需显式标注：

```vix
let ok = Ok(42) : Result[i32, string]
let none = None : ?string
```

## 边界情况

- **构造器名冲突**：不同 ADT 不可使用相同构造器名。
- **单构造器 ADT**：`type Wrapper = Tag(i32)` 只有一个构造器。
- **泛型 ADT 单体化**：`Option:[i32]` 与 `Option:[string]` 编译为不同具体类型。
- **穷尽性**：`[TODO: 确认 match 是否强制覆盖所有构造器]`
