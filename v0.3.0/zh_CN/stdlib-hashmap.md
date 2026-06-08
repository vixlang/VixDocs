# HashMap 模块 (std/hash.vix)

## 类型

```vix
type HashMap:[V] = struct
{
    buckets: [ [ (string, V) ] ]
    size: i32
}
```

## API

```vix
pub fn new_hashmap:[V](capacity: i32): HashMap:[V]     // 创建新 HashMap
pub fn len:[V](map: HashMap:[V]): i32                   // 获取元素数量
pub fn capacity:[V](map: HashMap:[V]): i32               // 获取容量
pub fn put:[V](mut map: ref HashMap:[V], key: string, value: V) // 插入键值对
pub fn get:[V](map: ref HashMap:[V], key: string): ?V           // 获取值
pub fn contains:[V](map: ref HashMap:[V], key: string): bool     // 检查键是否存在
```

## 示例

```vix
import "std/hash.vix"

fn main(): i32
{
    let mut map = new_hashmap:[i32](10)
    put:[i32](mut ref map, "one", 1)
    put:[i32](mut ref map, "two", 2)
    put:[i32](mut ref map, "three", 3)

    print(contains:[i32](ref map, "one"))   // true
    print(contains:[i32](ref map, "four"))  // false

    let val = get:[i32](ref map, "two")
    match val
    {
        Some(v) -> print(v)  // 2
        None -> {}
    }
    return 0
}
```

## 哈希算法

使用 DJB2 哈希算法：

```vix
fn hash_str(s: string): i32
{
    let mut hash = 5381
    for (i in 0 .. s.length)
    {
        hash = (hash * 33) + s[i]
    }
    if (hash < 0) { hash = -hash }
    return hash
}
```
