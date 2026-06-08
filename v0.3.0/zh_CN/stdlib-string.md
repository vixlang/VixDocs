# 字符串模块 (std/String.vix)

## API

```vix
pub fn new_string(src: ptr, len: usize): Result[ptr, ptr]
```

创建一个新的堆分配字符串副本。

| 参数 | 说明 |
|------|------|
| `src` | 源字符串指针 |
| `len` | 复制长度 |

返回值：`Ok(ptr)` 成功，`Err(msg)` 失败。

## 示例

```vix
import "std/String.vix"

fn main(): i32
{
    let s = new_string("Hello, Vix!", 11)
    match s
    {
        Ok(ptr) ->
        {
            print(ptr)
            free(ptr)
        }
        Err(err) ->
        {
            print(err)
        }
    }
    return 0
}
```

## 依赖

此模块依赖 `std/mem.vix` 中的 `copy` 函数以及 `malloc`、`free`、`strlen` 的 extern 声明。
