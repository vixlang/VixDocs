# 控制流

## if / elif / else

```vix
if (x > 10)
{
    print("大于 10")
} elif (x > 5)
{
    print("大于 5")
} else
{
    print("5 或更小")
}
```

## while 循环

```vix
let mut i = 0
while (i < 10)
{
    print(i)
    i += 1
}
```

## for 循环

使用 `in` 关键字和 `..` 范围运算符：

```vix
for (i in 0 .. 10)
{
    print(i)  // 0, 1, ..., 9
}
```

## break 和 continue

```vix
// break - 跳出循环
for (i in 0 .. 100)
{
    if (i >= 10) { break }
    print(i)
}

// continue - 跳过当前迭代
for (i in 0 .. 10)
{
    if (i % 2 == 0) { continue }
    print(i)  // 只打印奇数
}
```

## 嵌套循环

```vix
for (x in 1 .. 3)
{
    for (y in 1 .. 3)
    {
        print(x, y)
    }
}
```
