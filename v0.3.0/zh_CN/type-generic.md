# 泛型

## 语法

泛型参数使用 `:[T]` 语法。

## 泛型函数

```vix
fn identity:[T](x: T): T
{
    return x
}

fn main(): i32
{
    let a = identity:[i32](42)
    let b = identity:[string]("hello")
    return 0
}
```

## 泛型结构体

```vix
type Box:[T] = struct { value: T }
type Pair:[T, U] = struct { first: T, second: U }
type HashMap:[V] = struct { buckets: [ [ (string, V) ] ], size: i32 }
```

## 泛型 ADT

```vix
type Option:[T] = Some(T) | None
type Result:[T, E] = Ok(T) | Err(E)
```

## 类型约束

数值类型和布尔类型之间自动兼容：

```vix
fn add:[T](a: T, b: T): T
{
    return a + b
}
```

## 编译期单体化

泛型在编译期通过单体化实现——每个唯一的类型实例化生成自己的 LLVM 函数/结构体。
