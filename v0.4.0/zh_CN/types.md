# 类型系统

Vix 基于 Hindley-Milner 类型推断与合一算法的静态类型系统。所有类型编译期确定，零运行时开销。

## 1. 类型分类

### 基本类型

| 类型 | 大小 | 范围 |
|------|------|------|
| `i8` | 1 byte | -128 ~ 127 |
| `i32` | 4 bytes | -2^31 ~ 2^31-1 |
| `i64` | 8 bytes | -2^63 ~ 2^63-1 |
| `f32` | 4 bytes | IEEE 754 单精度 |
| `f64` | 8 bytes | IEEE 754 双精度 |
| `bool` | 1 byte | `true` `false` |
| `string` | 指针大小 | UTF-8 不可变字符串 |
| `void` | 0 | 无值类型 |
| `ptr` | 8 bytes | 不透明通用指针 |
| `usize` | 8 bytes | 平台字长无符号整数 |

### 复合类型

| 类型 | 说明 |
|------|------|
| `[T]` | 动态数组（运行时可变长度） |
| `[T * N]` | 定长数组（编译期固定长度） |
| `(T1, T2, ...)` | 元组 |
| `ref T` | 不可变引用 |
| `mut ref T` | 可变引用 |
| `?T` | 可选类型（等价 `Option:[T]`） |
| `?ref T` | 可选引用 |
| `fn(T): U` | 函数类型（一等值） |

### 用户定义

| 语法 | 说明 |
|------|------|
| `type T = struct { ... }` | 结构体 |
| `type T = A \| B \| C` | ADT 枚举 |
| `type T:[P] = ...` | 泛型类型 |

## 2. 类型推断

从初始化表达式推断类型，无需显式标注。

```vix
let a = 42                /* → i32 */
let b = 3.14              /* → f64 */
let c = "hello"           /* → string */
let d = true              /* → bool */
```

当无法从上下文推断时，必须显式标注类型。

```vix
let x: i32
let y: [i32] = []

let z                     /* ❌ 错误: 无法推断类型 */
```

## 3. 数值类型提升

提升链：`i8` → `i32` → `i64` → `f32` → `f64`。高优先级向低优先级（窄化）需显式转换。

```vix
let a: i32 = 10
let b: i64 = a            /* ✓ i32 → i64 自动提升 */
let c: f64 = a            /* ✓ i32 → f64 自动提升 */

fn process(n: i64) {}
let x: i32 = 42
process(x)                /* ✓ 参数传递时自动提升 */

let d: i64 = 100
let e: i32 = d            /* ❌ 错误: i64 不能窄化为 i32 */
```

## 4. 类型别名

```vix
type Age = i32
type Name = string

let age: Age = 25
let name: Name = "Alice"
```

## 5. 类型兼容性

数值类型间通过提升链兼容。`string` 是 Copy 类型。`void` 与 `()` 不同：`void` 无值，`()` 有唯一值 `()`。

```vix
fn no_return() {}                      /* 默认 void */
fn unit_return(): () { return () }     /* 返回 () */

let v: void                            /* [TODO: 确认 void 类型变量是否合法] */
let u: () = ()                         /* ✓ */
```

## 6. 边界情况

- **泛型单体化**：每种类型参数组合生成独立代码，无运行时泛型开销。
- **`string` 的 Copy 语义**：`string` 在赋值时复制（轻量引用式值），原变量仍可用。
- **`void` vs `()`** ：`void` 函数不可返回值，`()` 函数必须返回 `()`。两者不互相兼容。
- **`ptr` 非泛型**：不同于 `ref T`，`ptr` 无类型信息，主要服务于 FFI。

## 7. 详细文档

- [基本类型](type-primitive) — `i8` / `i32` / `i64` / `f32` / `f64` / `bool` / `string` / `void` / `ptr` / `usize`
- [数组类型](type-array) — `[T]` 与 `[T * N]`
- [结构体类型](type-struct) — 结构体定义与使用
- [ADT 类型](type-adt) — 代数数据类型与模式匹配
- [元组类型](type-tuple) — 异构值集合
- [泛型](type-generic) — 类型参数化
- [可选类型](type-optional) — `?T` 和 `?ref T`
