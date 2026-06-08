# 模块系统

## 导入模块

```vix
import "std/io.vix"
import "std/arr.vix"
import "std/mem.vix"
```

## 公开导出

使用 `pub` 关键字标记导出的函数：

```vix
// mymodule.vix
pub fn public_func(x: i32): i32
{
    return x * 2
}

fn private_helper()
{
    // 此函数不会被导出
}
```

## 外部块

```vix
extern "C"
{
    fn printf(format: ptr, ...): i32
}
```

## 导入机制

- `inline_imports()` 递归解析 `import` 语句
- 所有 `pub` 标记的函数被内联到当前 AST
- 通过已访问文件追踪处理循环导入

## 示例

```vix
import "std/io.vix"

fn main(): i32
{
    puts("Hello from imported std!")
    return 0
}
```

## 标准库路径

标准库位于 `src/std/` 目录，使用相对路径导入：

```vix
import "std/io.vix"    // I/O 函数
import "std/arr.vix"   // 数组工具
import "std/mem.vix"   // 内存操作
import "std/String.vix" // 字符串工具
import "std/os.vix"    // 操作系统
import "std/rand.vix"  // 随机数
import "std/hash.vix"  // HashMap
import "std/net.vix"   // 网络
import "std/type.vix"  // 类型工具
```
