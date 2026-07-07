# 基本类型

Vix 的 10 种基本类型详解。

| 类型 | 大小 | 范围 |
|------|------|------|
| `i8` | 1 byte | -128 ~ 127 |
| `i32` | 4 bytes | -2^31 ~ 2^31-1 |
| `i64` | 8 bytes | -2^63 ~ 2^63-1 |
| `f32` | 4 bytes | IEEE 754 单精度 |
| `f64` | 8 bytes | IEEE 754 双精度 |
| `bool` | 1 byte | `true` `false` |
| `string` | 指针大小 | UTF-8 不可变 |
| `void` | 0 | 无值 |
| `ptr` | 8 bytes | 64 位地址空间 |
| `usize` | 8 bytes | 0 ~ 2^64-1 |

## 整数类型

默认整数类型为 `i32`。

```vix
let a = 42                /* i32 */
let b: i8 = 127
let c: i64 = 10000000000
```

四种进制字面量：

```vix
let decimal = 42
let hex     = 0x2A
let binary  = 0b101010
let octal   = 0o52

print(decimal == hex)     /* Output: true */
print(decimal == binary)  /* Output: true */
print(decimal == octal)   /* Output: true */
```

整数溢出在编译期（字面量超出范围）或运行时均为未定义行为。

```vix
let x: i8 = 128           /* ❌ 错误: 超出 i8 范围 [-128, 127] */
```

## 浮点类型

默认浮点类型为 `f64`，`f32` 需显式标注。

```vix
let pi = 3.14159          /* f64 */
let half: f32 = 0.5       /* f32 */
```

浮点运算遵循 IEEE 754。注意精度误差：

```vix
print(0.1 + 0.2 == 0.3)   /* Output: false（IEEE 754 精度） */
```

## 布尔类型

`bool` 只有 `true` 和 `false`。控制流条件必须为 `bool`。

```vix
let flag = true
if (flag) { print("yes") }

if (1) {}                 /* ❌ 错误: i32 不可作为条件 */
```

## 字符串

`string` 为 UTF-8 不可变字符串。支持 `+` 拼接和 `.length`。

```vix
let greeting = "Hello"
print(greeting.length)    /* Output: 5 */

let msg = greeting + " Vix"
print(msg)                /* Output: Hello Vix */
```

转义序列：

| 序列 | 含义 |
|------|------|
| `\n` | 换行 |
| `\t` | 制表符 |
| `\\` | 反斜杠 |
| `\"` | 双引号 |
| `\0` | 空字符 |

```vix
let s = "Line1\nLine2"
print(s)
/* Output: */
/* Line1 */
/* Line2 */
```

## void 与 `()`

`void` 是无值的空类型；`()` 是单元类型，唯一值为 `()`。

```vix
fn no_return() {}                    /* 默认 void */
fn unit_return(): () { return () }   /* 显式 () */

fn bad(): void { return 0 }          /* ❌ 错误: void 函数不能返回值 */
```

## ptr 与 usize

`ptr` 是不透明指针，用于 FFI；`usize` 是平台大小类型。

```vix
extern "C"
{
    fn malloc(size: usize): ptr
    fn strlen(s: ptr): usize
}

let p: ptr = nil
let size: usize = 16
```

## 边界情况

- **空字符串** `""` 合法，`.length` 为 `0`。
- **浮点比较**：`==` 和 `!=` 可用，但 IEEE 754 精度误差可能产生意外结果。
- **前导零**：`012` 是十进制 12，不是八进制（八进制用 `0o12`）。
- **`ptr` 类型擦除**：`ptr` 无类型信息，解引用前需通过 FFI 或所有权系统处理。
- **`usize` 运算**：`[TODO: 确认 usize 与其他整数类型的隐式转换规则]`
