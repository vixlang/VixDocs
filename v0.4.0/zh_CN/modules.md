# 模块系统

## 导入模块

```vix
import "std/io.vix"
import "std/arr.vix"
import "./mylib.vix"
```

## 公开导出

`pub` 标记的函数可被导入：

```vix
/* mylib.vix */
pub fn public_func(x: i32): i32 { x * 2 }

fn private_helper() { }           /* 外部不可见 */
```

## 导入机制

- 编译器递归解析所有 `import` 语句
- 所有 `pub` 符号被内联到当前 AST
- 通过已访问文件追踪处理循环导入

## 外部块

```vix
extern "C"
{
    fn printf(format: ptr, ...): i32
    fn malloc(size: usize): ptr
    fn free(ptr: ptr): void
}
```

`extern "C"` 块中的声明被注册到外层作用域。

## 标准库路径

标准库位于 `src/std/`：

```vix
import "std/io.vix"
import "std/arr.vix"
import "std/mem.vix"
import "std/String.vix"
import "std/os.vix"
import "std/rand.vix"
import "std/hash.vix"
import "std/net.vix"
import "std/type.vix"
```

## 边界情况

- **循环导入**：由已访问文件追踪处理。
- **路径不存在**：编译期报告文件未找到错误。
