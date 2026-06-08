# 数组类型

## 动态数组 `[T]`

```vix
let list: [i32] = [1, 2, 3]
list.push(4)         // 添加元素
print(list.length)   // 读取长度
print(list[0])       // 索引访问
list[0] = 10         // 修改元素（需 mut）
```

## 定长数组 `[T * N]`

```vix
let arr: [i32 * 5] = [1, 2, 3, 4, 5]
print(arr.length)   // 5
print(arr[0])       // 1
arr[1] = 10         // 修改（需 mut）
```

## 多维数组

```vix
let matrix: [[i32 * 3] * 3] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[0][1])  // 2
```

## 空数组

```vix
let arr: [i32] = []      // 空动态数组，可后续 push
let fixed: [i32 * 0] = [] // 空定长数组
```

## 方法

| 操作 | 语法 | 说明 |
|------|------|------|
| 索引 | `arr[i]` | 访问/修改元素 |
| 长度 | `arr.length` | 获取元素数量 |
| 添加 | `arr.push(x)` | 动态数组追加元素（需 mut） |
