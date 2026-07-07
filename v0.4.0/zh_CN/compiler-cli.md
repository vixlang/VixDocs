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
| `-S [file]` | 生成汇编（默认: `<input>.s`） |
| `-obj [file]` | 生成目标文件（默认: `<input>.o`） |
| `-ll [file]` | 生成 LLVM IR（默认: `<input>.ll`） |
| `-llvm` | LLVM IR 打印到 stdout |
| `-ast` | AST 打印到 stdout |
| `--debug` | 启用调试输出 |
| `--check` | 仅语法和类型检查 |
| `--time` | 显示各阶段耗时 |
| `-opt=lN` | 优化级别（N = 0..3） |
| `--target=<triple>` | 目标三元组 |
| `-v, --version` | 版本信息 |
| `-h, --help` | 帮助信息 |

## 编译属性

```vix
#[no_std]   /* 不使用标准库 */
#[no_main]  /* 不需要 main 函数 */
```

## 示例

```bash
/* 编译为可执行文件 */
vixc hello.vix -o hello

/* 仅检查语法和类型 */
vixc hello.vix --check

/* 查看 AST */
vixc hello.vix -ast

/* 查看 LLVM IR */
vixc hello.vix -llvm

/* 优化级别 3 */
vixc hello.vix -opt=l3 -o hello

/* 交叉编译到 ARM64 */
vixc hello.vix --target=aarch64-linux-gnu -o hello

/* 交叉编译到 WebAssembly */
vixc hello.vix --target=wasm32-unknown-unknown -o hello.wasm

/* 多目标文件链接 */
vixc a.o b.o c.o -o program
```
