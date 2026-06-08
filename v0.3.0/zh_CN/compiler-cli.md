# 编译器 CLI 参考

## 用法

```
vixc [options] <input.vix>
vixc file1.o file2.o ... -o <output>
```

## 选项

| 选项 | 说明 |
|------|------|
| `-o <file>` | 指定输出文件 |
| `-S [file]` | 生成汇编（默认：`<input>.s`） |
| `-obj [file]` | 生成目标文件（默认：`<input>.o`） |
| `-ll [file]` | 生成 LLVM IR（默认：`<input>.ll`） |
| `-llvm` | 将 LLVM IR 打印到 stdout |
| `-ast` | 将 AST 打印到 stdout |
| `--debug` | 启用调试输出 |
| `--check` | 仅进行语法和类型检查 |
| `--time` | 显示各阶段耗时 |
| `-opt=lN` | 设置优化级别（N = 0..3） |
| `--target=<triple>` | 设置目标三元组 |
| `-v, --version` | 显示版本信息 |
| `-h, --help` | 显示帮助信息 |

## 编译属性

在源文件中使用属性控制编译行为：

```vix
#[no_std]   // 不使用标准库
#[no_main]  // 不需要 main 函数
```

## 示例

```bash
# 编译为可执行文件
vixc hello.vix -o hello

# 仅检查语法和类型
vixc hello.vix --check

# 仅检查所有权
vixc hello.vix --check && echo "所有权检查通过"

# 查看 AST
vixc hello.vix -ast

# 查看 LLVM IR
vixc hello.vix -llvm

# 优化级别 3
vixc hello.vix -opt=l3 -o hello

# 交叉编译到 ARM64
vixc hello.vix --target=aarch64-linux-gnu -o hello

# 交叉编译到 WebAssembly
vixc hello.vix --target=wasm32-unknown-unknown -o hello.wasm

# 多目标文件链接
vixc a.o b.o c.o -o program
```

## 链接 API

编译器提供 C API 用于链接：

```c
typedef struct {
    const char* target_triple;
    int bare_mode;
    const char* linker_script;
    int static_link;
    const char* entry_point;
    const char* libc_dir;
} VixLinkOptions;

int vix_link(const char* obj_file, const char* output_file,
             const VixLinkOptions* options, const char** error_msg);

int vix_link_multi(const char** obj_files, int obj_count,
                   const char* output_file,
                   const VixLinkOptions* options, const char** error_msg);
```
