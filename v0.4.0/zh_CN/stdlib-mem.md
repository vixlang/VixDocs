# 内存操作模块

`std/mem.vix` 提供底层内存操作函数。

## 主要函数

| 函数 | 说明 |
|------|------|
| `set(dst: ptr, val: i32, n: usize)` | 填充 n 字节为 val |
| `copy(dst: ptr, src: ptr, n: usize)` | 复制 n 字节 |
| `move(dst: ptr, src: ptr, n: usize)` | 移动 n 字节 |
| `compare(a: ptr, b: ptr, n: usize): i32` | 比较 n 字节 |
| `zero(ptr: ptr, n: usize)` | 清零 n 字节 |

## 示例

```vix
import "std/mem.vix"
import "std/io.vix"

extern "C"
{
    fn malloc(size: usize): ptr
    fn free(ptr: ptr): void
}

fn main(): i32
{
    let buf = malloc(64)
    zero(buf, 64)
    free(buf)
    return 0
}
```
