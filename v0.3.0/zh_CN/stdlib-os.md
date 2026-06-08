# 操作系统模块 (std/os.vix)

## API

```vix
pub fn system(cmd: ptr): i32    // 执行 shell 命令
pub fn exit(status: i32): void  // 退出进程
pub fn opendir(path: ptr): ptr  // 打开目录
pub fn readdir(dir: ptr): ptr   // 读取目录项
pub fn closedir(dir: ptr): i32  // 关闭目录
```

## 示例

```vix
import "std/os.vix"

fn main(): i32
{
    system("ls -la")
    return 0
}
```

## extern 声明

```vix
extern "C"
{
    fn system(cmd: ptr): i32
    fn exit(status: i32): void
    fn opendir(path: ptr): ptr
    fn readdir(dir: ptr): ptr
    fn closedir(dir: ptr): i32
}
```

## 注意

`system` 和 `exit` 函数名在 extern 声明和 pub 函数中同名，编译器能够正确解析。
