# Copy 类型推断

Vix 使用**启发式 Copy 模型**自动推断哪些类型是 Copy，无需用户标注。

## Copy 类型

| 类型 | 说明 |
|------|------|
| `i8` `i32` `i64` | 整数类型 |
| `f32` `f64` | 浮点数类型 |
| `bool` | 布尔值 |
| `ref T` / `ptr` | 引用和指针 |
| `fn(T): U` | 函数值 |
| `string` | 字符串（轻量引用式值） |
| `struct { ... }` | 结构体 |
| `[T * N]`（size <= 16） | 小型定长数组 |

## 非 Copy 类型

| 类型 | 说明 |
|------|------|
| `[T]` | 动态数组 |
| 泛型应用类型 | 默认视为非 Copy |

## 示例

```vix
// x 是 i32（Copy 类型），赋值后仍可用
let x = 10
let y = x
print(x)  // OK

// xs 是 [i32]（非 Copy），赋值后所有权转移
let xs = [1, 2, 3]
let ys = xs
print(xs[0])  // 错误：use of moved value
```

## 大写构造器

首字母大写的枚举式构造器/常量被视为 Copy：

```vix
type Option:[T] = Some(T) | None
// None 是 Copy 类型
```
