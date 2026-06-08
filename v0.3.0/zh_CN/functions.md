# 函数

## 定义

```vix
fn add(a: i32, b: i32): i32
{
    return a + b
}
```

## 无返回值函数

省略返回类型或使用 `void`：

```vix
fn greet(name: string)
{
    print("Hello, " + name + "!")
}

fn do_nothing(): () { }  // 单元类型
```

## 可变参数

```vix
fn inc(mut x: ref i32)
{
    @x = @x + 1
}
```

## 公开函数（可被导入）

```vix
pub fn public_func(x: i32): i32
{
    return x * 2
}
```

## 函数作为一等值

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
    return 0
}
```

## 函数类型

函数类型用 `fn(T): U` 表示：

```vix
type Handler = fn(i32): i32
```

## 递归

```vix
fn fact(n: i32): i32
{
    if (n <= 1) { return 1 }
    return n * fact(n - 1)
}
```

## 入口函数

所有可执行程序必须定义 `main`：

```vix
fn main(): i32
{
    return 0
}

// 带命令行参数
fn main(argc: i32, argv: ptr): i32
{
    for (i in 0 .. argc) { print(argv[i]) }
    return 0
}
```
