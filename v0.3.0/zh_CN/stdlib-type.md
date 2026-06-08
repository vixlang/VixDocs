# 类型工具模块 (std/type.vix)

## API

```vix
pub fn isalpha(c): i32      // 检查是否为字母（a-z, A-Z, _）
pub fn isdigit(c): i32      // 检查是否为数字（0-9）
pub fn isidentchar(c): i32  // 检查是否为标识符字符（字母或数字）
```

## 示例

```vix
import "std/type.vix"

fn main(): i32
{
    print(isalpha('a'))   // 1
    print(isalpha('1'))   // 0
    print(isdigit('5'))   // 1
    print(isidentchar('_')) // 1
    return 0
}
```
