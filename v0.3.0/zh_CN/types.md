# 类型系统

Vix 采用静态类型系统，结合 Hindley-Milner 类型推断与合一算法。

## 类型分类

| 类别 | 类型 |
|------|------|
| 基本类型 | `i8` `i32` `i64` `f32` `f64` `bool` `string` `void` `ptr` `usize` |
| 复合类型 | `[T]`（动态数组） `[T * N]`（定长数组） `(T1, T2)`（元组） |
| 用户定义 | `struct { ... }` / `type NAME = struct { ... }` |
| ADT | `type NAME = Ctor1(T) \| Ctor2` |
| 泛型 | `type NAME:[T] = struct { ... }` |
| 可选 | `?T` / `?ref T` |
| 函数 | `fn(T): U`（函数类型作为一等值） |
| 引用 | `ref T` / `mut ref T` |

## 类型推断

```vix
let a = 42        // i32
let b = 3.14      // f64
let c = "hello"   // string
let d = true      // bool
```

## 数值类型提升

数值类型（i8、i32、i64、f32、f64）之间自动提升：

```vix
let a: i32 = 10
let b: i64 = a    // i32 自动提升为 i64
let c: f64 = a    // 整数转浮点
```

## 类型兼容性

```vix
fn process(n: i64) { }
let x: i32 = 42
process(x)        // i32 可传递给 i64 参数
```

## 详细文档

- [基本类型](type-primitive)
- [数组类型](type-array)
- [结构体类型](type-struct)
- [ADT 类型](type-adt)
- [元组类型](type-tuple)
- [泛型](type-generic)
- [可选类型](type-optional)
