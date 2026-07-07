# 泛型函数

## 定义

```vix
fn identity:[T](x: T): T { x }

fn pair:[T, U](a: T, b: U): (T, U) { (a, b) }
```

## 调用

调用泛型函数时必须显式指定类型参数：

```vix
fn main(): i32
{
    let a = identity:[i32](42)
    let b = identity:[string]("hello")
    let c = identity:[f64](3.14)
    let p = pair:[i32, string](1, "one")
    print(a)                 /* Output: 42 */
    print(b)                 /* Output: hello */
    print(c)                 /* Output: 3.14 */
    return 0
}
```

## 泛型 + 数值运算

```vix
fn add:[T](a: T, b: T): T { a + b }

fn main(): i32
{
    print(add:[i32](1, 2))       /* Output: 3 */
    print(add:[f64](1.5, 2.5))   /* Output: 4 */
    return 0
}
```

## 泛型 + 一元函数

```vix
fn map:[T, U](list: [T], f: fn(T): U): [U]
{
    let out = []
    for (item in list) { out.push(f(item)) }
    return out
}

fn main(): i32
{
    let nums = [1, 2, 3, 4]
    let squares = map:[i32, i32](nums, fn(x: i32): i32 { x * x })
    print(squares[0])          /* Output: 1 */
    print(squares[3])          /* Output: 16 */
    return 0
}
```

## 编译期单体化

每个唯一的类型实例化生成独立的 LLVM 函数/结构体代码，零运行时开销。

## 边界情况

- **类型参数推断**：`[TODO: 确认是否支持从实参推断类型参数，如 identity(42) 省略 `:[i32]`]`
- **类型参数个数上限**：`[TODO: 确认最多支持的泛型参数数量]`
- **泛型约束**：`[TODO: 确认是否有 where 子句或 trait 约束机制]`
