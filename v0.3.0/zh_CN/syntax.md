# 语法参考

## 程序结构

```vix
import "std/io.vix"       // 导入
extern "C" { ... }        // 外部声明
let global = 42            // 全局变量
type Point = struct { ... } // 类型定义
fn main(): i32 { ... }    // 函数定义
```

## 注释

```vix
// 行注释
/* 块注释 */
```

## 关键字

`fn` `let` `mut` `ref` `if` `elif` `else` `while` `for` `in` `return` `match` `struct` `type` `import` `pub` `extern` `break` `continue` `true` `false` `nil` `and` `or`

## 类型关键字

`i8` `i32` `i64` `f32` `f64` `bool` `string` `void` `ptr` `usize`

## 运算符（优先级从高到低）

| 优先级 | 运算符 | 说明 |
|--------|--------|------|
| 1 | `()` `[]` `.` `@` | 分组/索引/成员/解引用 |
| 2 | `!` `~` `-`（一元）`ref` | 逻辑非/按位非/负号/取引用 |
| 3 | `**` | 幂运算 |
| 4 | `*` `/` `%` | 乘除取模 |
| 5 | `+` `-` | 加减、字符串拼接 |
| 6 | `<<` `>>` | 移位 |
| 7 | `<` `<=` `>` `>=` | 比较 |
| 8 | `==` `!=` | 相等 |
| 9 | `&` | 按位与 |
| 10 | `^` | 按位异或 |
| 11 | `\|` | 按位或 |
| 12 | `and` | 逻辑与 |
| 13 | `or` | 逻辑或 |
| 14 | `=` `+=` `-=` `*=` `/=` `%=` | 赋值 |

## 字面量

```vix
42                      // i32 整数
0x2A                    // 十六进制
0b101010                // 二进制
0o52                    // 八进制
3.14                    // f64 浮点
"hello"                 // 字符串
'x'                     // 字符
true false              // 布尔
nil                     // 空指针
()                      // 单元类型（空值）
```

## 变量声明

```vix
let x = 10               // 不可变，类型推断
let y: i32 = 10          // 显式类型
let mut z = 20           // 可变变量
let static mut id = 0    // 静态变量（函数内）
```

## 引用

```vix
ref value                // 不可变共享引用
mut ref value            // 可变独占引用
@ptr                     // 解引用
```

## 控制流

```vix
if (条件) { ... } elif (条件) { ... } else { ... }
while (条件) { ... }
for (i in 0 .. 10) { ... }
match value { 1 -> { ... } _ -> { ... } }
```

## 函数

```vix
fn add(a: i32, b: i32): i32 { return a + b }
fn greet(name: string) { print(name) }  // 无返回值
pub fn pub_func(x: i32): i32 { x * 2 }  // 公开函数
```

## ADT

```vix
type Option:[T] = Some(T) | None
type Result:[T, E] = Ok(T) | Err(E)
type Color = Red | Green | Blue
```
