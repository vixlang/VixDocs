# I/O 模块

`std/io.vix` 提供基本输入输出功能。

## 主要函数

| 函数 | 说明 |
|------|------|
| `puts(s: string)` | 输出字符串并换行 |
| `panic(s: string)` | 输出错误并终止程序 |
| `printf(fmt: ptr, ...): i32` | 格式化输出 |
| `fopen(path: string, mode: string): ptr` | 打开文件 |
| `fclose(f: ptr): void` | 关闭文件 |
| `fread(buf: ptr, size: usize, count: usize, f: ptr): usize` | 读取文件 |
| `fwrite(buf: ptr, size: usize, count: usize, f: ptr): usize` | 写入文件 |
| `fprintf(f: ptr, fmt: ptr, ...): i32` | 格式化写入文件 |

## 示例

```vix
import "std/io.vix"

fn main(): i32
{
    puts("Hello, Vix!")
    /* Output: Hello, Vix! */
    return 0
}
```

```vix
import "std/io.vix"

fn main(): i32
{
    let file = fopen("test.txt", "w")
    fprintf(file, "Hello, File!\n")
    fclose(file)
    return 0
}
```
