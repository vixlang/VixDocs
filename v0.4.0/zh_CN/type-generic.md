# 泛型

泛型通过 `:[T]` 语法引入类型参数，编译期单体化实现。

## 泛型函数

```vix
fn identity:[T](x: T): T { x }

fn pair:[T, U](a: T, b: U): (T, U) { (a, b) }

fn main(): i32
{
    let a = identity:[i32](42)
    let b = identity:[string]("hello")
    let p = pair:[i32, string](1, "one")
    print(a)                    /* Output: 42 */
    print(b)                    /* Output: hello */
    print(p.0)                  /* Output: 1 */
    return 0
}
```

## 泛型结构体

```vix
type Box:[T] = struct { value: T }
type Pair:[T, U] = struct { first: T, second: U }

let int_box = Box:[i32]{ value: 42 }
let pair = Pair:[i32, string]{ first: 1, second: "one" }
```

## 泛型 ADT

```vix
type Option:[T] = Some(T) | None
type Result:[T, E] = Ok(T) | Err(E)
```

## 泛型 + 函数作为一等值

```vix
fn map:[T, U](list: [T], f: fn(T): U): [U]
{
    let out = []
    for (item in list) { out.push(f(item)) }
    return out
}

fn main(): i32
{
    let nums = [1, 2, 3]
    let doubled = map:[i32, i32](nums, fn(x: i32): i32 { x * 2 })
    print(doubled[0])          /* Output: 2 */
    return 0
}
```

## 编译期单体化

每种类型参数组合生成独立的 LLVM 函数/结构体代码，零运行时开销。

## 边界情况

- **类型参数个数**：最多支持泛型参数数量 `[TODO: 确认上限]`
- **类型推断**：调用泛型函数时必须显式指定类型参数 `identity:[i32](42)`。`[TODO: 确认是否支持部分推断]`
