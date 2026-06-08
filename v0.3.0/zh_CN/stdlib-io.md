# I/O 模块 (std/io.vix)

## API

```vix
pub fn puts(s: ptr): i32             // 打印字符串并换行
pub fn panic(msg: ptr)               // 打印错误信息并进入死循环

// extern "C" 声明：
fn printf(format: ptr, ...): i32     // 格式化输出
fn fprintf(file: ptr, format: ptr, ...): i32  // 格式化写入文件
fn fopen(filename: ptr, mode: ptr): ptr       // 打开文件
fn fclose(file: ptr): i32            // 关闭文件
fn fread(buf: ptr, size: i64, count: i64, file: ptr): i64  // 读文件
fn fwrite(buf: ptr, size: i64, count: i64, file: ptr): i64 // 写文件
```

## 示例

```vix
import "std/io.vix"

fn main(): i32
{
    puts("Hello, World!")
    panic("something went wrong")
    return 0
}
```

## 文件操作

```vix
import "std/io.vix"

fn main(): i32
{
    let file = fopen("test.txt", "w")
    if (file == nil)
    {
        puts("Failed to open file")
        return 1
    }
    let data = "Hello, Vix!"
    fwrite(data, 1, data.length, file)
    fclose(file)
    return 0
}
```
