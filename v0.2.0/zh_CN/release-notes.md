# Vix v0.2.0 发布说明

**破坏性变更** — 这是一个重大的语言重新设计版本。

## 语法变更

### 1. 移除了 `global` 和 `const` 关键字

模块级别的 `let` 声明现在自动具有**持久存储期**（类似全局变量）。无需特殊关键字。

**之前 (v0.1.x)：**
```vix
global counter: i32 = 100
const MAX_SIZE = 1024
let const N = 10
```

**之后 (v0.2.0)：**
```vix
let counter: i32 = 100
let MAX_SIZE = 1024
```

- 在**模块级别**使用 `let` 声明的变量自动成为全局且持久的。
- 在**函数级别**使用 `let` 声明的变量是栈局部变量（与之前相同）。
- 在任何作用域中使用 `let mut` 声明可变变量。

### 2. 移除了自动生成的 `main()` 函数

编译器不再自动生成 `main()` 函数。你**必须**显式定义 `fn main()`。

**之前 (v0.1.x)：**
```vix
print("hello")
```

**之后 (v0.2.0)：**
```vix
fn main(): i32
{
    print("hello")
    return 0
}
```

如果没有定义 `fn main()` 且未设置 `#[no_main]`，编译器将报错。

### 3. 变量默认不可变

所有 `let` 声明现在**默认不可变**。使用 `let mut` 声明可变变量。

```vix
let x = 10        // 不可变
let mut y = 20    // 可变
y = 30            // 允许
```

### 4. 函数级静态变量

对于需要在函数内部具有静态存储期的罕见情况，使用 `let static mut`：

```vix
fn get_id(): i32
{
    let static mut id = 0
    id += 1
    return id
}
```

## Bug 修复

### Windows 链接器

- 修复了当捆绑的 `libc/` 目录不完整时，MinGW 链接器无法找到 `-lmoldname`、`-lpthread`、`-ladvapi32`、`-lshell32`、`-luser32` 的问题。
- 新增了自动探测 Windows SDK 和 MSVC 库路径的功能。
- 现在只有在系统上实际找到库时才链接它们，防止因缺失可选库而导致的链接器错误。

## 迁移指南

1. 将所有 `global` 声明替换为 `let`。
2. 将所有 `const` 和 `let const` 声明替换为 `let`。
3. 将所有 `pub global` 声明替换为 `let`（未来版本中将为 `let` 添加 `pub` 支持）。
4. 为之前依赖顶层代码执行的文件添加 `fn main(): i32 { ... return 0 }`。
5. 为任何需要重新赋值的变量添加 `mut`。

## 测试结果

- 732/732 pytest 测试通过
- 220/220 编译测试通过
- 209/209 运行测试通过
