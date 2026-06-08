# 移动语义

## 非 Copy 值的移动

非 Copy 类型的值在赋值时**转移所有权**，原变量变为不可用：

```vix
fn main(): i32
{
    let xs = [1, 2, 3]  // 动态数组，非 Copy
    let ys = xs          // 所有权从 xs 转移到 ys
    return xs[0]         // 错误：use of moved value 'xs'
}
```

## 最后一次使用移动

如果移动发生在最后一次使用，则是合法的：

```vix
fn take(xs: [i32]): i32
{
    return xs[0]
}

fn main(): i32
{
    let xs = [1, 2, 3]
    let ys = xs          // xs 被移动
    return take(ys)      // ys 被移动到函数中
}
```

## 函数参数移动

```vix
fn consume(arr: [i32])
{
    print(arr[0])
}
```

## 借用期间不允许移动

```vix
fn main(): i32
{
    let xs = [1, 2, 3]
    let r = ref xs       // 借用 xs
    let ys = xs          // 错误：不能移动被借用的值
    return 0
}
```
