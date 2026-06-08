# 元组类型

## 语法

```vix
let pair = (1, "hello")
print(pair.0)  // 1
print(pair.1)  // "hello"
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
    print(p.0)  // 42
    print(p.1)  // "answer"
    return 0
}
```

## 在结构体中使用

```vix
type HashMap:[V] = struct
{
    buckets: [ [ (string, V) ] ]
    size: i32
}
```
