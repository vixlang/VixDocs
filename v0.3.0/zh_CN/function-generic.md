# 泛型函数

## 定义

```vix
fn identity:[T](x: T): T
{
    return x
}
```

## 调用

```vix
fn main(): i32
{
    let a = identity:[i32](42)
    let b = identity:[string]("hello")
    let c = identity:[f64](3.14)
    return 0
}
```

## 多类型参数

```vix
fn pair:[T, U](a: T, b: U): (T, U)
{
    return (a, b)
}
```

## 泛型 + 数值提升

```vix
fn add:[T](a: T, b: T): T
{
    return a + b
}

fn main(): i32
{
    print(add:[i32](1, 2))      // 3
    print(add:[f64](1.5, 2.5))  // 4.0
    return 0
}
```
