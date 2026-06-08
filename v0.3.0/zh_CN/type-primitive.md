# 基本类型

## 类型表

| 类型 | 描述 | 大小 | 范围 |
|------|------|------|------|
| `i8` | 8位有符号整数 | 1 byte | -128 ~ 127 |
| `i32` | 32位有符号整数 | 4 bytes | -2^31 ~ 2^31-1 |
| `i64` | 64位有符号整数 | 8 bytes | -2^63 ~ 2^63-1 |
| `f32` | 32位浮点数 | 4 bytes | ±3.4e-38 ~ ±3.4e38 |
| `f64` | 64位浮点数 | 8 bytes | ±1.7e-308 ~ ±1.7e308 |
| `bool` | 布尔类型 | 1 byte | true / false |
| `string` | 字符串 | 指针大小 | UTF-8 |
| `void` | 空类型 | 0 | - |
| `ptr` | 通用指针 | 8 bytes | 64位地址 |
| `usize` | 无符号大小类型 | 8 bytes | 0 ~ 2^64-1 |

## 示例

```vix
let small: i8 = 127
let count: i32 = 1000000
let big: i64 = 9223372036854775807
let temp: f32 = 36.5
let pi: f64 = 3.14159
let flag: bool = true
let greeting: string = "hello"
let generic: ptr = nil
let len: usize = 42
```

## 字符串操作

```vix
let s = "Hello"
print(s.length)          // 5
let full = s + " World"  // "Hello World"
```

## 转义字符

| 序列 | 描述 |
|------|------|
| `\n` | 换行 |
| `\t` | 制表符 |
| `\\` | 反斜杠 |
| `\"` | 双引号 |
| `\0` | 空字符 |
