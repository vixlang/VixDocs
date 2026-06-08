# 借用规则

## 规则摘要

1. 同一语句中对一个值可以有**多个不可变借用**（`ref`）
2. **可变借用**（`mut ref`）必须是**独占**的
3. 可变借用不能与不可变借用重叠
4. 借用期间不能移动被借用的值
5. 临时借用在语句结束时自动释放

## 多个不可变借用（通过）

```vix
fn add_refs(a: ref i32, b: ref i32): i32
{
    return @a + @b
}

fn main(): i32
{
    let x = 10
    let y = 20
    print(add_refs(ref x, ref y))  // 同时借用 x 和 y
    return 0
}
```

## 重复可变借用（错误）

```vix
fn main(): i32
{
    let mut value = 10
    let r1 = mut ref value
    let r2 = mut ref value  // 错误：不能多次可变借用
    return 0
}
```

## 借用被移动的值（错误）

```vix
fn main(): i32
{
    let xs = [1, 2, 3]
    let r = ref xs
    let ys = xs            // 错误：不能移动被借用的值
    return 0
}
```

## 赋值期间的借用检查

```vix
fn main(): i32
{
    let mut value = 10
    let r = ref value
    value = 20             // 错误：不能赋值给被借用的值
    return 0
}
```
