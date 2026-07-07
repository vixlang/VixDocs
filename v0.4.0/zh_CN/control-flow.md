# 控制流

## if / elif / else

条件必须用 `()` 括起且为 `bool` 类型。花括号 `{}` 必需。

```vix
let x = 10
if (x > 10)
{
    print("large")
} elif (x > 5)
{
    print("medium")
} else
{
    print("small")
}
/* Output: medium */

if (x > 0) { print("positive") }  /* ✓ */

if x > 0 { }           /* ❌ 错误: 缺少括号 */
if (x) { }             /* ❌ 错误: i32 不可作为条件 */
if (x > 0) print("")   /* ❌ 错误: 缺少花括号 */
```

## while 循环

```vix
let mut i = 0
while (i < 5)
{
    print(i)              /* Output: 0 1 2 3 4 */
    i = i + 1
}
```

`break` 退出，`continue` 跳到下一次迭代。

```vix
let mut i = 0
while (i < 20)
{
    i = i + 1
    if (i % 7 == 0) { continue }
    if (i > 15) { break }
    print(i)              /* Output: 1 2 3 4 5 6 8 9 10 11 12 13 15 */
}
```

## for 范围循环

`..` 生成左闭右开区间 `[start, end)`。循环变量不可变，步长固定为 1。

```vix
for (i in 0 .. 5)
{
    print(i)              /* Output: 0 1 2 3 4 */
}

for (i in 0 .. 5)
{
    i = i + 1             /* ❌ 错误: 循环变量不可变 */
}
```

```vix
let mut sum = 0
for (n in 1 .. 101)
{
    sum = sum + n
}
print(sum)                /* Output: 5050 */
```

#### 边界情况

- **空范围**：`for (i in 0 .. 0) {}` 不执行循环体。
- **反向范围**：`for (i in 10 .. 0) {}` 不执行，需用 `while` 递减。
- **范围端点**：表达式在进入循环前各求值一次。
- **嵌套 break**：只跳出最近一层。

## match 模式匹配

```vix
let num = 2
match num
{
    1 -> print("one")
    2 -> print("two")
    _ -> print("other")
}
/* Output: two */
```

### ADT 构造器解构

```vix
type Option:[T] = Some(T) | None

fn main(): i32
{
    let opt = Some(42)
    match opt
    {
        Some(v) -> print("got: ", v)
        None    -> print("nothing")
    }
    /* Output: got: 42 */
    return 0
}
```

### 字符串匹配

使用 `strcmp` 内容比较：

```vix
fn class_ify(code: string): string
{
    match code
    {
        "200" -> { return "OK" }
        "404" -> { return "Not Found" }
        _     -> { return "Unknown" }
    }
}
```

### 函数调用作为目标

```vix
match compute() { Ok(v) -> print(v)  Err(e) -> print(e) }
```

### 单行分支

```vix
match x { 1 -> print("one")  2 -> print("two")  _ -> print("other") }
```

#### 边界情况

- **重叠模式**：书写顺序第一胜出。
- **函数调用副作用**：`match compute()` 只调用一次。
- **穷尽性**：`[TODO: 确认编译器是否要求覆盖所有可能模式]`

## 完整示例

```vix
fn fizzbuzz(n: i32)
{
    for (i in 1 .. n)
    {
        if (i % 15 == 0) { print("FizzBuzz") }
        elif (i % 3 == 0) { print("Fizz") }
        elif (i % 5 == 0) { print("Buzz") }
        else { print(i) }
    }
}

fn main(): i32
{
    fizzbuzz(16)
    /* Output: 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz */
    return 0
}
```

## 交叉引用

- [match 模式匹配详解](match)
- [for 循环与数组遍历](type-array)
- [控制流与所有权检查的交互](ownership)
