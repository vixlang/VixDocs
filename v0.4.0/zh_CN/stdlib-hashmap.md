# HashMap 模块

`std/hash.vix` 提供泛型哈希表实现。

## 类型与函数

| 名称 | 说明 |
|------|------|
| `HashMap:[V]` | 泛型哈希表类型 |
| `new_hashmap:[V](): HashMap:[V]` | 创建哈希表 |
| `put:[V](map: ref HashMap:[V], key: string, val: V)` | 插入键值对 |
| `get:[V](map: ref HashMap:[V], key: string): ?V` | 获取键对应值 |
| `contains:[V](map: ref HashMap:[V], key: string): bool` | 检查键是否存在 |
| `len:[V](map: ref HashMap:[V]): i32` | 元素个数 |
| `capacity:[V](map: ref HashMap:[V]): i32` | 容量 |

## 示例

```vix
import "std/hash.vix"
import "std/io.vix"

fn main(): i32
{
    let map = new_hashmap:[i32]()
    put(ref map, "one", 1)
    put(ref map, "two", 2)

    if (contains(ref map, "one"))
    {
        let val = get(ref map, "one")
        match val
        {
            Some(v) -> print(v)     /* Output: 1 */
            None    -> print("?")
        }
    }

    print(len(ref map))             /* Output: 2 */
    return 0
}
```
