# 所有权系统

Vix 的编译期所有权和借用检查，提供无 GC 的内存安全保证。

## 编译流水线

```
解析 → 语义分析 → 类型检查 → 所有权检查 → 代码生成
```

## 核心概念

| 概念 | 说明 |
|------|------|
| 所有权 | 每个值有唯一所有者 |
| 移动 | 非 Copy 类型赋值时转移所有权，原变量失效 |
| 借用 | `ref` 创建不可变借用，`mut ref` 创建可变借用 |
| 复制 | 小型/简单类型自动推断为 Copy |

## Copy 类型

以下类型自动推断为 Copy，赋值后原变量仍可用：

| Copy 类型 | 非 Copy 类型 |
|-----------|-------------|
| `i8` `i32` `i64` | `[T]`（动态数组） |
| `f32` `f64` | |
| `bool` | |
| `ref T` `ptr` | |
| `fn(T): U` | |
| `string` | |
| `struct { ... }` | |
| `[T * N]`（size ≤ 16） | |

```vix
let x = 10                    /* i32 是 Copy */
let y = x
print(x)                      /* ✓ 原变量仍可用 */

let xs = [1, 2, 3]            /* [T] 非 Copy */
let ys = xs
print(xs[0])                  /* ❌ 错误: use of moved value */
```

## 移动语义

非 Copy 类型赋值时所有权转移。

```vix
fn consume(arr: [i32])
{
    print(arr[0])
}

fn main(): i32
{
    let data = [1, 2, 3]
    consume(data)
    consume(data)             /* ❌ 错误: data 已被移动 */
    return 0
}
```

移动发生在最后一次使用是合法的：

```vix
fn take(xs: [i32]): i32 { xs[0] }

fn main(): i32
{
    let xs = [1, 2, 3]
    let ys = xs               /* xs 被移走 */
    return take(ys)           /* ys 被移动给函数 */
}
```

## 不可变引用 `ref`

`ref` 创建不可变共享借用。同一语句允许多个不可变借用。

```vix
fn read(x: ref i32): i32 { @x }

fn add_refs(a: ref i32, b: ref i32): i32 { @a + @b }

fn main(): i32
{
    let x = 10
    let y = 20
    print(add_refs(ref x, ref y))  /* ✓ 同时借用 x 和 y */
    /* Output: 30 */
    return 0
}
```

## 可变引用 `mut ref`

`mut ref` 创建可变独占借用。同一作用域内不可有其他借用。

```vix
fn inc(mut p: ref i32)
{
    @p = @p + 1
}

fn main(): i32
{
    let mut value = 10
    inc(mut ref value)
    print(value)                  /* Output: 11 */
    return 0
}
```

```vix
let mut val = 10
let r1 = mut ref val
let r2 = mut ref val             /* ❌ 错误: 不能多次可变借用 */
```

## 借用规则

1. 同一语句中对一个值可以有**多个不可变借用**
2. 可变借用必须是**独占**的
3. 可变借用不能与不可变借用重叠
4. 借用期间不能移动被借用的值
5. 临时借用在语句结束时自动释放

```vix
let xs = [1, 2, 3]
let r = ref xs
let ys = xs                /* ❌ 错误: 不能移动被借用的值 */
```

```vix
let mut value = 10
let r = ref value
value = 20                 /* ❌ 错误: 不能赋值给被借用的值 */
```

## 可选引用 `?ref T`

```vix
fn maybe_ref(flag: i32, value: ref i32): ?ref i32
{
    if (flag == 0) { return None }
    return Some(value)
}

fn main(): i32
{
    let x = 42
    let r = maybe_ref(1, ref x)
    match r
    {
        Some(ptr) -> print(@ptr)
        None      -> print("no ref")
    }
    /* Output: 42 */
    return 0
}
```

## 边界情况

- **Copy 推断是启发式**：无显式 `Copy` trait，由编译器根据类型特征决定。
- **语句级临时借用**：`ref value` 的借用在当前语句结束时释放。
- **大写构造器视为 Copy**：`None` 等大写开头的枚举构造器可多次使用。
- **`struct` 全部视为 Copy**：即使包含动态数组字段 `[TODO: 确认此规则准确性]`

## 交叉引用

- [引用语法详解](ownership-ref)
- [移动语义详解](ownership-move)
- [借用规则详解](ownership-borrow)
- [Copy 类型推断](ownership-copy)
- [可选引用](ownership-optional-ref)
