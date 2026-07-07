# 元组类型

元组是固定长度的异构值集合，元素通过 `.0` `.1` `.2` 等整数索引访问。

## 基本语法

```vix
let pair = (42, "hello")
print(pair.0)                   /* Output: 42 */
print(pair.1)                   /* Output: hello */
```

## 作为函数返回值

```vix
fn get_pair(): (i32, string)
{
    return (42, "answer")
}

fn main(): i32
{
    let p = get_pair()
    print(p.0)                  /* Output: 42 */
    print(p.1)                  /* Output: answer */
    return 0
}
```

## 多元素元组

```vix
let triple = (1, "two", 3.0)
print(triple.0)                 /* Output: 1 */
print(triple.1)                 /* Output: two */
print(triple.2)                 /* Output: 3 */
```

## 解构赋值

`[TODO: 确认是否支持 let (a, b) = expr 形式的解构]`

## 在复合类型中使用

```vix
type HashMap:[V] = struct
{
    buckets: [ [ (string, V) ] ],
    size: i32
}
```

## 边界情况

- **单元类型 vs 一元元组**：`()` 是单元类型，非元组。`(42)` 被视为带括号的 `42` 表达式而非一元元组。
- **嵌套元组**：`.0` `.1` 索引只访问最外层。
