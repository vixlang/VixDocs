# 语法参考

Vix 语法的形式化规范，以 EBNF 定义语法产生式，以编号规则描述使用约束，以正/反示例说明正确与错误用法。

> **语言版本**：v0.4.0
> **术语约定**：*表达式* 指代产生值的语法单元，*语句* 指代表执行动作的语法单元，*声明* 指代引入名称绑定的语法单元。

---

## 1. 源文件结构

### 1.1 概述

Vix 源文件是 UTF-8 文本，由一组顶级声明组成。每个源文件经词法分析、语法分析、语义分析、类型检查、所有权检查和代码生成后输出目标文件。多文件程序通过 `import` 内联机制合并。可执行程序要求恰好一个源文件包含 `fn main(): i32` 入口。

### 1.2 语法定义

```ebnf
SourceFile      ::= { TopLevelDecl } [EOF]

TopLevelDecl    ::= ImportStatement
                  | ExternBlock
                  | AttributeDecl
                  | VariableDecl
                  | TypeDecl
                  | FunctionDecl

ImportStatement ::= "import" StringLiteral

ExternBlock     ::= "extern" StringLiteral "{"
                        { "fn" Identifier
                            "(" [ ParamList ["," "..."] ] ")"
                            [":" TypeAnnotation ] ";" }
                    "}"

AttributeDecl   ::= "#[" Identifier "]"

VariableDecl    ::= "let" ["mut"] Identifier [":" TypeAnnotation] ["=" Expression]

TypeDecl        ::= "type" Identifier
                    [ ":" "[" TypeParam {"," TypeParam} "]" ]
                    "=" TypeDefinition

FunctionDecl    ::= ["pub"] "fn" Identifier
                    [ ":" "[" TypeParam {"," TypeParam} "]" ]
                    "(" [ ParamList ] ")"
                    [":" ReturnAnnotation ]
                    Block

ReturnAnnotation ::= TypeAnnotation | "(" ")"

ParamList       ::= Param {"," Param}
Param           ::= ["mut"] Identifier ":" TypeAnnotation
                  | "mut" Identifier ":" "ref" TypeAnnotation
```

### 1.3 使用规则

**规则 1** — 可执行程序必须定义返回 `i32` 的 `main` 函数，支持零参数或 `(argc: i32, argv: ptr)` 两种形式。

```vix
fn main(): i32
{
    return 0
}

fn main(argc: i32, argv: ptr): i32
{
    return 0
}

fn main(): void              /* ❌ 错误: main 必须返回 i32 */
{
}
```

**规则 2** — 顶级声明无顺序依赖，前向引用合法。

```vix
fn main(): i32
{
    return compute(7)
}

fn compute(x: i32): i32
{
    return x * x
}
```

**规则 3** — `#[no_std]` 禁止链接标准库；`#[no_main]` 不要求入口函数。属性置于文件顶部。

```vix
#[no_std]
#[no_main]

fn custom_entry(): void
{
}
```

**规则 4** — 同一作用域内不允许重复声明同名的顶级函数或类型。变量遮蔽允许，顶级重复定义报编译期错误。

```vix
fn foo(): i32 { 1 }
fn foo(): i32 { 2 }           /* ❌ 错误: 重复定义 "foo" */
```

### 1.4 边界情况

- **空源文件**：不含任何声明的文件不生成目标代码，不报错。
- **多个 main**：链接时多个目标文件含 `main` 则报重复符号错误。
- **属性叠加**：`#[no_std]` 与 `#[no_main]` 可同时使用，重复同一属性无额外效果。

---

## 2. 词法结构

### 2.1 概述

词法分析器将 UTF-8 源文本切分为词法单元。空白符（空格、制表符、换行符）仅作为分隔符，不承载语义。Vix 不依赖换行作为语句终止符。

### 2.2 注释

```ebnf
Comment       ::= "/*" { 任意字符 } "*/"
```

Vix 使用 `/*` `*/` 作为注释定界符，可跨行。

```vix
let radius = 5.0

/*
 * 计算圆的面积
 */
fn circle_area(r: f64): f64
{
    return 3.14159 * r ** 2
}
```

### 2.3 标识符

```ebnf
Identifier  ::= IdentifierStart { IdentifierContinue }
IdentifierStart ::= 字母 | "_"
IdentifierContinue ::= 字母 | 数字 | "_"
```

**规则**：标识符由字母或下划线开头，后可跟字母、数字、下划线，区分大小写。

```vix
let counter = 1
let file_size = 1024

let 2nd_value = 0           /* ❌ 错误: 不能以数字开头 */
let my-var = 0              /* ❌ 错误: 连字符不是标识符字符 */
```

### 2.4 关键字

**声明关键字**: `fn` `let` `type` `struct` `import` `pub` `extern`

**存储修饰符**: `mut` `ref` `static`

**控制流关键字**: `if` `elif` `else` `while` `for` `in` `return` `match` `break` `continue`

**字面量关键字**: `true` `false` `nil`

**运算符关键字**: `and` `or`

**类型关键字**（亦保留）: `i8` `i32` `i64` `f32` `f64` `bool` `string` `void` `ptr` `usize`

### 2.5 运算符与分隔符

| 类别 | 符号 |
|------|------|
| 算术 | `+` `-` `*` `/` `%` `**` |
| 按位 | `~` `&` `\|` `^` `<<` `>>` |
| 比较 | `<` `<=` `>` `>=` `==` `!=` |
| 逻辑 | `!` `and` `or` |
| 引用 | `ref` `mut ref` `@` |
| 赋值 | `=` `+=` `-=` `*=` `/=` `%=` |
| 范围 | `..` |
| 分组/访问 | `(` `)` `{` `}` `[` `]` `.` `->` |
| 其他 | `:` `,` `;` `...` |

---

## 3. 字面量

### 3.1 概述

字面量是源代码中直接写出常量值的表达式。Vix 支持整数、浮点数、字符串、布尔值、空指针 (`nil`) 和单元值 (`()`) 六类字面量。

### 3.2 整数字面量

```ebnf
IntegerLiteral ::= DecimalLiteral | HexLiteral | BinaryLiteral | OctalLiteral
DecimalLiteral ::= 数字 { 数字 }
HexLiteral     ::= "0x" 十六进制数字 { 十六进制数字 }
                |  "0X" 十六进制数字 { 十六进制数字 }
BinaryLiteral  ::= "0b" 二进制数字 { 二进制数字 }
                |  "0B" 二进制数字 { 二进制数字 }
OctalLiteral   ::= "0o" 八进制数字 { 八进制数字 }
                |  "0O" 八进制数字 { 八进制数字 }
```

**规则 1** — 十进制数字序列默认为 `i32`。前缀 `0x`/`0X` 为十六进制，`0b`/`0B` 为二进制，`0o`/`0O` 为八进制。

```vix
let dec = 42
let hex = 0x2A
let bin = 0b00101010
let oct = 0o52

print(dec == hex)     /* Output: true */
print(dec == bin)     /* Output: true */
print(dec == oct)     /* Output: true */
```

**规则 2** — 类型标注可改变字面量的存储宽度。值必须在目标类型范围内，否则编译期报错。

```vix
let a: i8  = 42             /* ✓ 在 [-128, 127] 范围内 */
let b: i64 = 42
let c: i8  = 128            /* ❌ 错误: 超出 i8 范围 */
```

**规则 3** — 前导零没有八进制语义。`012` 表示十进制 `12`。

```vix
let x = 012                 /* 十进制 12 */
let y = 0o12                /* 八进制 12 = 十进制 10 */
print(x == y)               /* Output: false */
```

#### 边界情况

- **最小值边界**：`-128` 作为 `i8` 合法，`-129` 不合法。
- **前缀后无数字**：`0x`、`0b`、`0o` 后必须至少一位数字。
- **超大十进制**：超出 `i64` 范围的十进制字面量编译期报错。

### 3.3 浮点字面量

```ebnf
FloatLiteral ::= 数字 { 数字 } "." 数字 { 数字 }
```

**规则 1** — 浮点字面量必须同时包含整数部分和小数部分，默认为 `f64`。

```vix
let pi = 3.14159
let one = 1.0

let bad1 = .5               /* ❌ 错误: 缺少整数部分 */
let bad2 = 1.               /* ❌ 错误: 缺少小数部分 */
```

**规则 2** — `f32` 需显式标注类型。

```vix
let d: f64 = 3.141592653589793
let f: f32 = 3.14159
```

### 3.4 字符串字面量

```ebnf
StringLiteral ::= '"' { 字符 } '"'
EscapeSequence ::= "\" ("n" | "t" | "\\" | '"' | "0")
```

```vix
let name = "Vix"
let path = "C:\\Users\\vix"
let poem = "第一行\n第二行"
```

**规则 1** — 字符串通过 `+` 拼接，`.length` 获取长度。

```vix
let greeting = "Hello"
let message = greeting + ", World!"
print(message)                    /* Output: Hello, World! */
print(message.length)             /* Output: 13 */
```

**规则 2** — `string` 是 Copy 类型，赋值后原变量仍可用。

```vix
let a = "hello"
let b = a
print(a)                    /* Output: hello */
print(b)                    /* Output: hello */
```

**规则 3** — 转义序列：`\n`（换行）、`\t`（制表符）、`\\`（反斜杠）、`\"`（双引号）、`\0`（空字符）。

```vix
let s = "Line1\nLine2"
print(s)
/* Output: */
/* Line1 */
/* Line2 */
```

### 3.5 布尔与空字面量

```vix
let yes  = true
let no   = false
let nada = nil
let unit = ()
```

---

## 4. 运算符与表达式

### 4.1 优先级表

| 优先级 | 运算符 | 结合性 | 语义 |
|:---:|--------|:---:|------|
| 1 | `()` `[]` `.` `@` | 左 | 分组/下标/成员/解引用 |
| 2 | `!` `~` `-`(一元) `ref` `mut ref` | 右 | 逻辑非/按位非/负号/取引用 |
| 3 | `**` | 右 | 幂 |
| 4 | `*` `/` `%` | 左 | 乘/除/取模 |
| 5 | `+` `-` | 左 | 加(含字符串拼接)/减 |
| 6 | `<<` `>>` | 左 | 移位 |
| 7 | `<` `<=` `>` `>=` | 左 | 比较 |
| 8 | `==` `!=` | 左 | 相等/不等 |
| 9 | `&` | 左 | 按位与 |
| 10 | `^` | 左 | 按位异或 |
| 11 | `\|` | 左 | 按位或 |
| 12 | `and` | 左 | 逻辑与（短路） |
| 13 | `or` | 左 | 逻辑或（短路） |
| 14 | `=` `+=` `-=` `*=` `/=` `%=` | 右 | 赋值/复合赋值 |

### 4.2 算术运算符

**规则 1** — `+` `-` `*` `/` `%` 适用于所有数值类型。整数除法向零截断。

```vix
let a =  10 / 3              /* 3 */
let b = -10 / 3              /* -3 */
let c =  10 % 3              /* 1 */
let d = -10 % 3              /* -1 */
```

**规则 2** — `+` 对 `string` 类型执行拼接，要求两侧均为 `string`。

```vix
let s = "count: " + "42"    /* ✓ */
let n = 42
let bad = "count: " + n     /* ❌ 错误: string 不能与 i32 拼接 */
```

**规则 3** — `**` 幂运算要求指数为非负整数，右结合。

```vix
let p = 2 ** 10              /* 1024 */
let q = 2 ** 3 ** 2          /* 2 ** (3 ** 2) = 512 */
let r = -2 ** 2              /* -(2 ** 2) = -4 */

let e1 = 4 ** 0.5            /* ❌ 错误: 指数必须为整数 */
let e2 = 2 ** -1             /* ❌ 错误: 负指数不支持 */
```

**规则 4** — 浮点运算遵循 IEEE 754。`f32` 与 `f64` 之间不做隐式转换。

#### 边界情况

- **除零**：整数除零运行时未定义行为；浮点除零产生 `inf`/`nan`。
- **幂溢出**：`2 ** 100` 在 `i32` 中行为未定义。

### 4.3 比较运算符

```vix
let x: i32 = 10
let y: i64 = 10
print(x == y)               /* Output: true（i32 提升为 i64 后比较） */

let s1 = "hello"
let s2 = "hello"
print(s1 == s2)             /* Output: true（strcmp 内容比较） */
```

### 4.4 逻辑运算符

**规则 1** — `and` 和 `or` 具有短路求值语义。

```vix
fn side_effect(): bool
{
    print("called!")
    return true
}

fn main(): i32
{
    let r = false and side_effect()    /* 不输出，side_effect 未调用 */
    let s = true or side_effect()      /* 不输出，side_effect 未调用 */
    return 0
}
```

**规则 2** — `!` 逻辑非作用于 `bool` 值，不对整数做真值判断。

```vix
let x = true
let y = !x                  /* false */

let bad = !42               /* ❌ 错误: ! 不能用于 i32 */
```

### 4.5 位运算符

```vix
let a: i32 = 0b1100          /* 12 */
let b: i32 = 0b1010          /* 10 */
print(a & b)                 /* Output: 8 */
print(a | b)                 /* Output: 14 */
print(a ^ b)                 /* Output: 6 */
print(~a)                    /* Output: 按位取反 */
print(a << 1)                /* Output: 24 */
print(a >> 2)                /* Output: 3 */
```

### 4.6 赋值与复合赋值

**规则 1** — 赋值左侧必须是可变左值：`mut` 变量、解引用、可变字段或索引。

```vix
let mut x = 10
x += 5                      /* x = 15 */

let y = 10
y += 5                      /* ❌ 错误: y 不是 mut */
```

**规则 2** — 支持 `=` `+=` `-=` `*=` `/=` `%=`。

```vix
let mut arr = [1, 2, 3]
arr[1] = 10
arr[0] += 5
```

### 4.7 完整示例

```vix
fn main(): i32
{
    let a = 15
    let b = 4

    print("a + b  = ", a + b)     /* Output: a + b  = 19 */
    print("a - b  = ", a - b)     /* Output: a - b  = 11 */
    print("a * b  = ", a * b)     /* Output: a * b  = 60 */
    print("a / b  = ", a / b)     /* Output: a / b  = 3 */
    print("a % b  = ", a % b)     /* Output: a % b  = 3 */
    print("a ** b = ", a ** b)    /* Output: a ** b = 50625 */
    print("a << 2 = ", a << 2)    /* Output: a << 2 = 60 */

    let x = true
    let y = false
    print("x and y = ", x and y)  /* Output: x and y = false */
    print("x or y  = ", x or y)   /* Output: x or y  = true */
    print("!x      = ", !x)       /* Output: !x      = false */

    return 0
}
```

---

## 5. 变量声明与作用域

### 5.1 概述

`let` 声明将值绑定到标识符。绑定默认不可变，`mut` 声明可变绑定。类型标注可省略，由编译器推断。作用域由 `{}` 界定，内层可遮蔽外层同名变量。

### 5.2 语法定义

```ebnf
VariableDecl ::= "let" ["mut"] Identifier [":" TypeAnnotation] ["=" Expression]
               | "let" "static" "mut" Identifier [":" TypeAnnotation] "=" Expression
```

### 5.3 使用规则

**规则 1** — 不可变绑定不可重新赋值。

```vix
let name = "Vix"
name = "New"                /* ❌ 错误: 不可变变量不可重新赋值 */
```

**规则 2** — `mut` 声明的变量可重新赋值，但类型必须兼容。

```vix
let mut counter: i32 = 0
counter = 1

let mut x = 10
x = 20
x = "hello"                 /* ❌ 错误: 类型不兼容 */
```

**规则 3** — 声明必须有初始化表达式或显式类型标注，至少其一。

```vix
let a = 42
let b: i32
let c                       /* ❌ 错误: 无法推断类型 */
```

**规则 4** — 内层作用域可遮蔽外层变量。

```vix
let x = 10
{
    let x = "inner"
    print(x)                   /* Output: inner */
}
print(x)                       /* Output: 10 */
```

**规则 5** — 同一作用域内不可声明同名变量。

```vix
let count = 0
let count = 1                 /* ❌ 错误: 重复定义 "count" */
```

**规则 6** — `static mut` 仅允许在函数内，存储期为静态。

```vix
fn increment_counter(): i32
{
    let static mut n = 0
    n = n + 1
    return n
}

fn main(): i32
{
    print(increment_counter())   /* Output: 1 */
    print(increment_counter())   /* Output: 2 */
    print(increment_counter())   /* Output: 3 */
    return 0
}
```

### 5.4 边界情况

- **未初始化 mut 变量**：`let mut x: i32` 后使用前必须赋值。`[TODO: 确认编译器是否检查未初始化]`
- **遮蔽与所有权**：非 Copy 类型被遮蔽时，原变量所有权的行为 `[TODO: 确认语义]`

### 5.5 完整示例

```vix
fn main(): i32
{
    let name = "Vix"
    let mut year: i32 = 2024

    print(name)           /* Output: Vix */
    print(year)           /* Output: 2024 */

    year = 2026
    print(year)           /* Output: 2026 */

    {
        let name = "Lang"
        print(name)       /* Output: Lang */
    }

    print(name)           /* Output: Vix */
    return 0
}
```

---

## 6. 函数

### 6.1 概述

函数是 Vix 的基本抽象单元，支持递归、一等值传递、按引用传递参数、泛型参数以及 `pub` 导出。

### 6.2 语法定义

```ebnf
FunctionDecl    ::= ["pub"] "fn" Identifier
                    [ ":" "[" TypeParam {"," TypeParam} "]" ]
                    "(" [ ParamList ] ")"
                    [":" ReturnAnnotation ]
                    Block

ParamList       ::= Param {"," Param}
Param           ::= ["mut"] Identifier ":" TypeAnnotation
                  | "mut" Identifier ":" "ref" TypeAnnotation

ReturnAnnotation ::= TypeAnnotation | "(" ")"

Block           ::= "{" { Statement } [ Expression ] "}"
```

### 6.3 使用规则

**规则 1** — 返回类型可省略，默认 `void`。也可显式写 `: ()` 表示返回单元类型。

```vix
fn greet(name: string)
{
    print("Hello, ", name, "!")
}

fn do_nothing(): () {}
```

**规则 2** — 函数体最后一条表达式（无分号）作为隐式返回值。

```vix
fn square(x: i32): i32 { x * x }

fn max(a: i32, b: i32): i32
{
    if (a > b) { return a }
    b
}

fn main(): i32
{
    print(square(9))          /* Output: 81 */
    print(max(3, 7))          /* Output: 7 */
    return 0
}
```

**规则 3** — `pub` 标记公开导出，可通过 `import` 访问。

```vix
/* util.vix */
pub fn add(x: i32, y: i32): i32 { x + y }

/* main.vix */
import "util.vix"

fn main(): i32
{
    print(add(3, 4))          /* Output: 7 */
    return 0
}
```

**规则 4** — 函数是一等值，类型为 `fn(T): U`。

```vix
type Transformer = fn(i32): i32

fn apply_twice(f: Transformer, x: i32): i32
{
    return f(f(x))
}

fn main(): i32
{
    let inc = fn(n: i32): i32 { n + 1 }
    print(apply_twice(inc, 10))   /* Output: 12 */
    return 0
}
```

**规则 5** — 引用参数通过 `ref T` / `mut ref T` 允许函数读写调用方变量。

```vix
fn write_through(mut p: ref i32)
{
    @p = @p * 10
}

fn main(): i32
{
    let mut x = 5
    write_through(mut ref x)
    print(x)                      /* Output: 50 */
    return 0
}
```

### 6.4 边界情况

- **空参数列表简写**：`fn foo: i32 {}` 等价于 `fn foo(): i32 {}`。
- **不支持重载**：同作用域内不可定义同名函数。
- **递归深度**：无编译期限制，栈溢出由平台决定。

### 6.5 完整示例

```vix
fn factorial(n: i32): i32
{
    if (n <= 1) { return 1 }
    return n * factorial(n - 1)
}

pub fn apply:[T, U](x: T, f: fn(T): U): U
{
    return f(x)
}

fn main(): i32
{
    print("5! = ", factorial(5))       /* Output: 5! = 120 */

    let double = fn(x: i32): i32 { x * 2 }
    let result = apply:[i32, i32](21, double)
    print("21 * 2 = ", result)         /* Output: 21 * 2 = 42 */

    return 0
}
```

---

## 7. 控制流

### 7.1 if-elif-else

```ebnf
IfStatement ::= "if" "(" Expression ")" Block
                { "elif" "(" Expression ")" Block }
                [ "else" Block ]
```

**规则 1** — 条件必须用 `()` 括起，必须为 `bool` 类型。

```vix
let x = 10
if (x > 0) { print("positive") }

if x > 0 { }                /* ❌ 错误: 缺少括号 */
if (x) { }                  /* ❌ 错误: i32 不可作为条件 */
if (1) { }                  /* ❌ 错误: 同上 */
```

**规则 2** — 各分支的花括号 `{}` 必需，即使只有一条语句。

```vix
if (x > 0) { print("OK") }

if (x > 0) print("OK")      /* ❌ 错误: 缺少花括号 */
```

### 7.2 while 循环

```ebnf
WhileStatement ::= "while" "(" Expression ")" Block
```

```vix
let mut count = 5
while (count > 0)
{
    print(count)              /* Output: 5 4 3 2 1 */
    count = count - 1
}
```

`break` 退出循环，`continue` 跳到下一次迭代。

```vix
let mut i = 0
while (i < 20)
{
    i = i + 1
    if (i % 7 == 0) { continue }
    if (i > 15) { break }
    print(i)                  /* Output: 1 2 3 4 5 6 8 9 10 11 12 13 15 */
}
```

### 7.3 for 范围循环

```ebnf
ForStatement ::= "for" "(" Identifier "in" Expression ".." Expression ")" Block
```

**规则 1** — `..` 生成左闭右开区间 `[start, end)`。循环变量不可变。

```vix
for (i in 0 .. 5)
{
    print(i)                  /* Output: 0 1 2 3 4 */
}

for (i in 0 .. 5)
{
    i = i + 1                 /* ❌ 错误: 循环变量不可变 */
}
```

**规则 2** — 范围表达式在循环开始前各求值一次，步长固定为 `1`。

```vix
let mut sum = 0
for (n in 1 .. 101)
{
    sum = sum + n
}
print(sum)                    /* Output: 5050 */
```

#### 边界情况

- **空范围**：`for (i in 0 .. 0) {}` 不执行循环体。
- **反向范围**：`for (i in 10 .. 0) {}` 同样不执行，需用 `while` 实现递减。

### 7.4 match 模式匹配

```ebnf
MatchStatement ::= "match" Expression "{"
                       { MatchArm "->" ( Block | Statement | Expression ) }
                   "}"

MatchArm       ::= Literal
                 | Identifier [ "(" Identifier ")" ]
                 | "_"
```

**规则 1** — 按书写顺序匹配，第一个成功的分支被执行。

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

**规则 2** — ADT 构造器自动解构负载。

```vix
type Result:[T, E] = Ok(T) | Err(E)

fn safe_divide(a: i32, b: i32): Result:[i32, string]
{
    if (b == 0) { return Err("division by zero") }
    return Ok(a / b)
}

fn main(): i32
{
    match safe_divide(10, 3)
    {
        Ok(v)  -> print("result: ", v)
        Err(e) -> print("error: ", e)
    }
    /* Output: result: 3 */
    return 0
}
```

**规则 3** — 字符串匹配使用 `strcmp` 内容比较。

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

**规则 4** — `match` 支持函数调用作为目标。

```vix
match compute()
{
    Ok(v)  -> print(v)
    Err(e) -> print(e)
}
```

#### 边界情况

- **重叠模式**：按书写顺序第一个胜出。
- **函数调用副作用**：`match compute()` 中 `compute()` 只被调用一次。
- **穷尽性检查**：`[TODO: 确认编译器是否要求所有可能值被覆盖]`

### 7.5 完整示例

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

---

## 8. 结构体

### 8.1 语法定义

```ebnf
StructDef      ::= "struct" "{" { Identifier ":" TypeAnnotation "," } "}"
TypeDef        ::= "type" Identifier [":" "[" TypeParams "]"] "=" StructDef
StructLiteral  ::= Identifier "{" { Identifier ":" Expression "," } "}"
```

### 8.2 使用规则

**规则 1** — 通过 `type Name = struct { }` 定义，`Name { field: value }` 实例化。

```vix
type Person = struct
{
    name: string,
    age: i32,
    height: f64
}

let alice = Person
{
    name: "Alice",
    age: 30,
    height: 165.0
}

print(alice.name)                 /* Output: Alice */
```

**规则 2** — `.` 运算符访问字段。`mut` 变量可修改字段。

```vix
let mut bob = Person { name: "Bob", age: 25, height: 180.0 }
bob.age = 26

let alice = Person { name: "Alice", age: 30, height: 165.0 }
alice.age = 31                    /* ❌ 错误: 不可变结构体 */
```

**规则 3** — 结构体在 Vix 中视为 Copy 类型，赋值时复制所有字段。

```vix
let a = Person { name: "X", age: 1, height: 100.0 }
let b = a
print(b.name)                     /* Output: X（独立副本） */
```

**规则 4** — 泛型结构体通过 `:[T]` 引入类型参数。

```vix
type Box:[T] = struct { value: T }

let int_box = Box:[i32]{ value: 42 }
let str_box = Box:[string]{ value: "contents" }
```

---

## 9. ADT（代数数据类型）

### 9.1 语法定义

```ebnf
EnumDef ::= Constructor {"|" Constructor}
           | ["|"] Constructor { "|" Constructor }

Constructor ::= Identifier [ "(" Type ")" ]
```

### 9.2 使用规则

**规则 1** — 简单枚举不含负载。

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

**规则 2** — 带负载的构造器包含数据类型参数。

```vix
type Option:[T] = Some(T) | None
type Result:[T, E] = Ok(T) | Err(E)
```

**规则 3** — 可选类型 `?T` 是 `Option:[T]` 的语法糖。

```vix
fn find_in_list(list: [string], target: string): ?string
{
    for (item in list)
    {
        if (item == target) { return Some(item) }
    }
    return None
}
```

**规则 4** — v0.3.0 起支持前导 `|`。

```vix
type Status =
    | Pending
    | Running
    | Completed
    | Failed
```

#### 边界情况

- **构造器名冲突**：不同 ADT 不可使用相同构造器名。
- **泛型 ADT 单体化**：`Option:[i32]` 与 `Option:[string]` 编译为独立类型。

---

## 10. 数组类型

### 10.1 语法定义

```ebnf
ArrayType     ::= "[" Type "]"
                | "[" Type "*" IntegerLiteral "]"
ArrayLiteral  ::= "[" [ Expression { "," Expression } ] "]"
```

### 10.2 使用规则

**规则 1** — 动态数组 `[T]` 通过字面量初始化，支持 `.push()` 和 `.length`。

```vix
let mut list: [i32] = [10, 20]
list.push(30)
print(list.length)       /* Output: 3 */
print(list[2])           /* Output: 30 */
```

**规则 2** — 定长数组 `[T * N]` 编译期固定长度。

```vix
let fixed: [i32 * 3] = [100, 200, 300]
print(fixed.length)      /* Output: 3 */
```

**规则 3** — `[T]` 是非 Copy 类型，赋值转移所有权。

```vix
let xs = [1, 2, 3]
let ys = xs
print(xs[0])             /* ❌ 错误: use of moved value */
```

**规则 4** — 多维数组通过嵌套实现。

```vix
let matrix: [[i32 * 3] * 2] = [[1, 2, 3], [4, 5, 6]]
print(matrix[0][1])      /* Output: 2 */
```

---

## 11. 元组

元组是固定长度的异构值集合，元素通过 `.0` `.1` 等访问。

```vix
let pair = (42, "answer")
print(pair.0)              /* Output: 42 */
print(pair.1)              /* Output: answer */

fn divide_and_remainder(a: i32, b: i32): (i32, i32)
{
    return (a / b, a % b)
}

fn main(): i32
{
    let result = divide_and_remainder(17, 5)
    print("q: ", result.0)  /* Output: q: 3 */
    print("r: ", result.1)  /* Output: r: 2 */
    return 0
}
```

---

## 12. 泛型

泛型通过编译期单体化实现。函数和类型定义通过 `:[T]` 引入类型参数。

```vix
fn identity:[T](x: T): T { x }

type Pair:[T, U] = struct { first: T, second: U }

fn main(): i32
{
    let a = identity:[i32](99)
    let b = identity:[string]("hello")
    let p = Pair:[i32, string]{ first: 1, second: "one" }
    print(a)              /* Output: 99 */
    print(b)              /* Output: hello */
    return 0
}
```

---

## 13. 指针与引用

`ref` / `mut ref` 创建借用，`@` 解引用，`ptr` 为不透明指针。

```vix
let x = 10
let r = ref x
print(@r)                /* Output: 10 */

let mut y = 20
let mr = mut ref y
@mr = 30
print(y)                 /* Output: 30 */
```

[详见第 7 章 所有权系统]

---

## 14. 模块系统

```vix
import "std/io.vix"
import "./mylib.vix"
/* mylib.vix: */
pub fn exported(): i32 { 42 }
```

`import` 将目标文件的所有 `pub` 符号合并到当前作用域，在编译早期内联完成，无运行时开销。

---

## 15. 外部函数 (FFI)

```vix
extern "C"
{
    fn printf(format: ptr, ...): i32
    fn malloc(size: usize): ptr
    fn free(ptr: ptr): void
}
```

---

## 16. 语法速查表

```vix
/* ── 变量 ── */
let x = 10
let mut y = 20
let z: i64 = 30

/* ── 函数 ── */
fn add(a: i32, b: i32): i32 { a + b }
pub fn exported(x: i32): i32 { x * 2 }

/* ── 控制流 ── */
if (cond) { } elif (cond) { } else { }
while (cond) { }
for (i in 0 .. 10) { }
match value { 1 -> stmt  _ -> stmt }

/* ── 类型 ── */
type Point = struct { x: f64, y: f64 }
type Color = Red | Green | Blue
type Option:[T] = Some(T) | None

/* ── 引用 ── */
ref value
mut ref value
@ptr

/* ── 模块 / FFI ── */
import "std/io.vix"
extern "C" { fn printf(fmt: ptr, ...): i32 }
```

---

> **文档状态**
> - `[TODO]` 标记项表示依赖编译器实现确认或尚未最终决定的特性。
> - 交叉引用占位章节将在后续补全。
> - 代码示例基于 v0.4.0 编译器版本。
