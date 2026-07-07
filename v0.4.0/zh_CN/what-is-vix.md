# 什么是 Vix 语言

Vix 是一种轻量级、静态类型的编译型语言。它在保持简洁语法的同时，提供接近原生语言的执行效率。

## 设计目标

- **性能优先**：基于 LLVM 的 AOT 编译，生成原生机器码
- **内存安全**：编译期所有权系统，无 GC
- **语法简洁**：关键字少，学习曲线平缓
- **自举**：用 Vix 编写 Vix 编译器（vixc0）

## 核心特性

- 静态类型 + 编译期类型检查
- LLVM 后端（x86_64、AArch64、ARM、RISC-V、WebAssembly）
- 代数数据类型（ADT）：`Option`、`Result`、自定义枚举
- 泛型：类型参数化的函数和结构体
- 所有权系统：借用检查、移动语义、Copy 类型推断
- 元组、字符串、动态数组
- 无 GC
- `extern "C"` FFI
- 跨平台：Windows / Linux / macOS

## 快速示例

### Hello World

```vix
fn main(): i32
{
    print("Hello, Vix!")
    return 0
}
/* Output: Hello, Vix! */
```

### 斐波那契

```vix
fn fib(n: i32): i64
{
    let mut a = 0
    let mut b = 1
    for (i in 1 .. n)
    {
        let c = a + b
        a = b
        b = c
    }
    return b
}

fn main(): i32
{
    print(fib(40))
    /* Output: 102334155 */
    return 0
}
```

### 泛型与 ADT

```vix
type Option:[T] = Some(T) | None

fn first_or_none(list: [string]): ?string
{
    if (list.length > 0) { return Some(list[0]) }
    return None
}

fn main(): i32
{
    let result = first_or_none(["hello", "world"])
    match result
    {
        Some(v) -> print(v)
        None    -> print("empty")
    }
    /* Output: hello */
    return 0
}
```

## 项目生态

| 项目 | 描述 | 状态 |
|------|------|------|
| **Vix 编译器** | 核心编译器（LLVM 后端） | 开发中 |
| **xpm** | Vix 包管理器 | 社区贡献中 |
| **标准库** | 常用数据结构和函数 | 社区贡献中 |
| **VS Code 扩展** | 语法高亮与代码分析 | 已发布 |

## 下一步

- [快速入门](getting-started) — 安装编译器并运行第一个程序
- [语法参考](syntax) — 完整语法规范（含 EBNF）
- [类型系统](types) — 基本类型、ADT、泛型等
- [所有权系统](ownership) — 编译期内存安全管理
