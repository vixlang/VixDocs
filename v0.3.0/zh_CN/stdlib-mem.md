# 内存模块 (std/mem.vix)

## API

```vix
pub fn set(ptr: ptr, value: i32, num: usize): ptr     // memset
pub fn copy(dest: ptr, src: ptr, num: usize): ptr       // memcpy
pub fn move(dest: ptr, src: ptr, num: usize): ptr       // memmove
pub fn compare(ptr1: ptr, ptr2: ptr, num: usize): i32   // memcmp
pub fn zero(ptr: ptr, num: usize): ptr                   // memset(ptr, 0, num)
```

## 示例

```vix
import "std/mem.vix"

fn main(): i32
{
    let buf: [u8 * 100] = []
    zero(buf, 100)
    let result = compare(buf, buf, 100)
    print(result)  // 0
    return 0
}
```

## extern 声明

```vix
extern "C"
{
    fn memset(ptr: ptr, value: i32, num: usize): ptr
    fn memcpy(dest: ptr, src: ptr, num: usize): ptr
    fn memmove(dest: ptr, src: ptr, num: usize): ptr
    fn memcmp(ptr1: ptr, ptr2: ptr, num: usize): i32
}
```
