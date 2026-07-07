# 数组类型

## 动态数组 `[T]`

```vix
let mut list: [i32] = [10, 20, 30]
list.push(40)
print(list.length)             /* Output: 4 */
print(list[2])                 /* Output: 30 */

list[0] = 100
print(list[0])                 /* Output: 100 */
```

## 定长数组 `[T * N]`

```vix
let fixed: [i32 * 3] = [1, 2, 3]
print(fixed.length)            /* Output: 3 */
```

## 多维数组

```vix
let matrix: [[i32 * 3] * 3] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[1][2])            /* Output: 6 */
```

## 空数组

```vix
let empty: [i32] = []
let mut growing: [string] = []
growing.push("first")
```

空数组必须有类型标注，编译器无法从 `[]` 推断元素类型。

## 非 Copy 语义

动态数组 `[T]` 是非 Copy 类型：

```vix
let xs = [1, 2, 3]
let ys = xs
print(xs[0])                   /* ❌ 错误: use of moved value */
```

小型定长数组（≤16 字节）视为 Copy：

```vix
let small: [i32 * 2] = [1, 2]
let copy = small
print(small[0])                /* ✓ 原数组仍可用 */
```

## 边界情况

- **索引越界**：`[TODO: 确认是编译期检查还是运行时 panic]`
- **空数组 + 类型推断**：`[]` 必须标注类型。
- **多维数组与 Copy**：`[TODO: 确认多维定长数组的 Copy 判定规则]`
