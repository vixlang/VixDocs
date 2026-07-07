# 函数

## 定义与调用

```vix
fn add(a: i32, b: i32): i32
{
    return a + b
}

fn main(): i32
{
    print(add(3, 5))             /* Output: 8 */
    return 0
}
```

## 隐式返回

函数体最后一行表达式可省略 `return`。

```vix
fn double(x: i32): i32 { x * 2 }

fn max(a: i32, b: i32): i32
{
    if (a > b) { return a }
    b
}

fn main(): i32
{
    print(double(21))            /* Output: 42 */
    print(max(3, 9))             /* Output: 9 */
    return 0
}
```

## 无返回值

省略返回类型等同 `void`，也可显式返回 `()`。

```vix
fn greet(name: string)
{
    print("Hello, ", name, "!")
}

fn do_nothing(): () {}
```

## 可变参数

`mut` 允许在函数体内重新绑定参数。

```vix
fn inc(mut x: i32): i32
{
    x = x + 1
    return x
}

fn main(): i32
{
    print(inc(5))                /* Output: 6 */
    return 0
}
```

## 引用参数

`ref T` 和 `mut ref T` 实现按引用传递。

```vix
fn increment(mut p: ref i32)
{
    @p = @p + 1
}

fn swap(mut a: ref i32, mut b: ref i32)
{
    let temp = @a
    @a = @b
    @b = temp
}

fn main(): i32
{
    let mut x = 10
    let mut y = 20
    swap(mut ref x, mut ref y)
    print("x=", x, " y=", y)     /* Output: x=20 y=10 */
    return 0
}
```

## 公开函数

`pub` 标记的函数可被 `import`。

```vix
/* math.vix */
pub fn square(x: i32): i32 { x * x }

/* main.vix */
import "math.vix"

fn main(): i32
{
    print(square(5))             /* Output: 25 */
    return 0
}
```

## 函数类型与一等值

函数类型为 `fn(T): U`，可赋值给变量、作为参数传递、作为返回值。

```vix
type Transformer = fn(i32): i32

fn apply_twice(f: Transformer, x: i32): i32
{
    return f(f(x))
}

fn main(): i32
{
    let inc = fn(n: i32): i32 { n + 1 }
    let dec = fn(n: i32): i32 { n - 1 }

    print(apply_twice(inc, 10))  /* Output: 12 */
    print(apply_twice(dec, 10))  /* Output: 8  */
    return 0
}
```

## 递归

```vix
fn factorial(n: i32): i32
{
    if (n <= 1) { return 1 }
    return n * factorial(n - 1)
}

fn main(): i32
{
    print(factorial(5))          /* Output: 120 */
    return 0
}
```

## 入口函数

可执行程序必须定义返回 `i32` 的 `main`。

```vix
fn main(): i32
{
    return 0
}

fn main(argc: i32, argv: ptr): i32
{
    return 0
}
```

## 泛型函数

```vix
fn identity:[T](x: T): T { x }

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
    print(doubled[0])            /* Output: 2 */
    print(doubled[1])            /* Output: 4 */
    print(doubled[2])            /* Output: 6 */
    return 0
}
```

## 边界情况

- **不支持重载**：同作用域内不可定义同名函数。
- **空参数简写**：`fn foo: i32 {}` 等价于 `fn foo(): i32 {}`。
- **匿名函数捕获**：`[TODO: 确认匿名函数是否捕获外部变量]`
- **递归深度**：无编译期限制，栈溢出由运行平台决定。

## 交叉引用

- [泛型函数详细说明](function-generic)
- [外部函数 FFI](function-extern)
- [所有权系统对参数传递的影响](ownership-move)
