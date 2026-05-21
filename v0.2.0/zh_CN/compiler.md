# vixc 编译器内部原理

本文档介绍了 Vix 编程语言的 **vixc** 编译器的架构、编译流水线和源代码组织。

## 架构概览

vixc 是一个原生预编译（AOT）编译器，将 Vix 源文件（`.vix`）翻译为平台可执行文件。它使用 C 语言实现前端、C++ 实现后端，使用 Flex/Bison 进行词法/语法分析，并通过 LLVM 生成原生代码。

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Flex 词法器  │───>│ Bison 语法器 │───>│    AST       │───>│  导入内联    │
│  (lexer.l)   │    │ (parser.y)   │    │  (ast.c)     │    │  (ast.c)     │
└──────────────┘    └──────────────┘    └──────────────┘    └──────┬───────┘
                                                                    │
┌──────────────┐    ┌──────────────┐    ┌──────────────┐           │
│  LLD 链接器  │<───│  LLC/目标文件 │<───│  LLVM IR     │<──────────┘
│ (Linker.cpp) │    │  (Llc.cpp)   │    │(CodeGen.cpp) │    ┌──────────────┐
└──────────────┘    └──────────────┘    └──────────────┘    │   语义分析   │
                                                             │(semantic.c)  │
                                                             └──────┬───────┘
                                                                    │
                                                             ┌──────┴───────┐
                                                             │   类型检查   │
                                                             │(Typeck.cpp)  │
                                                             └──────────────┘
```

## 编译流水线

### 1. 词法分析 (`src/parser/lexer.l`)

基于 Flex 的词法器将 Vix 源码分词为词法单元（Token）：
- **关键字：** `fn`、`let`、`mut`、`if`、`elif`、`else`、`while`、`for`、`in`、`return`、`match`、`struct`、`type`、`import`、`extern`、`pub`、`break`、`continue`、`true`、`false`、`nil`、`and`、`or`
- **类型：** `i8`、`i32`、`i64`、`f32`、`f64`、`bool`、`string`、`str`、`void`、`ptr`
- **字面量：** 整数（十进制、十六进制 `0x`、八进制 `0o`、二进制 `0b`）、浮点数、字符串、字符、布尔值
- **运算符：** 算术（`+`、`-`、`*`、`/`、`%`、`**`）、比较（`==`、`!=`、`<`、`>`、`<=`、`>=`）、逻辑（`and`、`or`）、指针（`&`、`@`）、复合赋值（`+=`、`-=`、`*=`、`/=`）
- **注释：** 行注释（`//`）和块注释（`/* */`）

### 2. 语法分析 (`src/parser/parser.y`)

Bison 语法根据词法单元流构建 AST。主要产生式：
- **程序：** 顶层声明序列（导入、全局变量、结构体、类型、函数、外部声明）
- **函数：** `fn name:[generics](params) -> RetType { body }`
- **结构体：** `struct Name:[generics] { field: Type, ... }`
- **ADT：** `type Name:[generics] = Ctor1 | Ctor2(Type) | ...`
- **语句：** 变量声明、赋值、if/elif/else、while、for-in-range、return、match
- **表达式：** 从逻辑或到一元/后缀的完整运算符优先级链

### 3. 导入内联 (`src/ast/ast.c`)

`inline_imports()` 函数递归地：
1. 解析 `import "path"` 语句
2. 解析被导入的 `.vix` 文件
3. 将所有标记为 `pub` 的函数内联到当前 AST 中
4. 通过已访问文件追踪处理循环导入

### 4. 语义分析 (`src/semantic/semantic.c`)

执行基于作用域的验证：
- **符号表：** 带父链的链式作用域链表，用于词法作用域
- **未定义标识符：** 报告使用了未声明的变量/函数
- **未使用变量：** 警告声明但未使用的变量
- **重复定义检测：** 捕获同一作用域中的重复变量声明
- **自递归结构体：** 防止无限大小结构体定义（例如 `struct Node { next: Node }`）

### 5. 类型检查 (`src/Typeck/Typeck.cpp`)

实现带有合一（Unification）算法的 Hindley-Milner 类型推断：
- **类型表示：** 带标签的联合体（`TypeKind`），包含所有 Vix 类型的变体
- **合一：** `Unifier` 类执行带 occurs check 的类型合一
- **泛型实例化：** 为泛型参数创建新类型变量，并在调用点特化
- **ADT/Result/Option：** 内置支持代数数据类型
- **Match 穷尽性：** 验证 match 表达式中覆盖了所有构造器
- **布局计算**（`LayOut.cpp`）：计算所有类型的 `sizeof` 和 `alignof`

### 6. LLVM 代码生成 (`src/compiler/CodeGen.cpp`)

将类型化 AST 翻译为 LLVM IR：
- **函数：** 创建 LLVM 函数签名，管理基本块
- **结构体：** 计算字段偏移，为字段访问生成 GEP 指令
- **数组/列表：** 固定大小数组作为 LLVM 数组，动态列表作为带 `.length` 元数据的指针
- **指针：** 通过 LLVM `alloca`/`load`/`store` 实现取地址（`&`）和解引用（`@`）
- **Match：** 生成 LLVM `switch` 或级联 `if/else` 块
- **ADT 构造器：** 带构造器判别式的标记联合表示
- **泛型：** 单体化——每个唯一的类型实例化生成自己的 LLVM 函数/结构体
- **字符串字面量：** 全局常量字符串指针
- **内置函数：** `print`、`toint`、`tofloat` 以内联方式生成

### 7. 优化 (`src/compiler/Passes.cpp`)

可配置级别的 LLVM 优化通道：
- `-opt=l0`：无优化（默认）
- `-opt=l1`：`-O1` 级别优化
- `-opt=l2`：`-O2` 级别优化
- `-opt=l3`：`-O3` 级别优化（含 LTO）

### 8. 目标文件生成 (`src/compiler/Llc/Llc.cpp`)

将 LLVM IR 编译为目标代码或汇编：
- 支持 x86_64、AArch64、ARM、RISC-V、WebAssembly 目标
- `-S` 标志生成汇编，`-obj` 生成目标文件

### 9. 链接 (`src/compiler/Linker/Linker.cpp`)

使用 LLD 进行链接：
- **Linux：** ELF 格式
- **macOS：** MachO 格式
- **Windows：** COFF/MinGW 格式
- **WebAssembly：** Wasm 格式
- 捆绑 C 运行时启动文件（`crt1.o`、`crti.o`、`crtn.o`）并链接 `-lc`、`-lm`、`-lpthread`

## 源代码组织

```
src/
├── main.c                    # 入口点，CLI 参数解析，流水线编排
├── ast/
│   ├── ast.c                 # AST 节点创建、操作、打印、导入内联
│   └── typeinfer.c           # 遗留的 C 语言类型推断
├── parser/
│   ├── lexer.l               # Flex 词法器定义
│   └── parser.y              # Bison 语法定义
├── semantic/
│   └── semantic.c            # 符号表、作用域分析、未定义/未使用检查
├── Typeck/
│   ├── Typeck.cpp            # 带合一的 Hindley-Milner 类型检查器
│   ├── TypeckInfer.cpp       # C 语言桥接到 C++ 类型检查器
│   └── LayOut.cpp            # 类型大小/对齐计算
├── compiler/
│   ├── CodeGen.cpp           # 从 AST 生成 LLVM IR
│   ├── Passes.cpp            # LLVM 优化通道配置
│   ├── Llc/
│   │   ├── Llc.h
│   │   └── Llc.cpp           # LLVM IR → 目标文件/汇编编译
│   └── Linker/
│       ├── Linker.h
│       └── Linker.cpp        # 基于 LLD 的链接
├── utils/
│   └── error.c               # 带源码上下文和 ANSI 着色的错误报告
└── std/                      # 标准库（用 Vix 编写）
    ├── io.vix                # I/O：puts、fopen、fclose、fread、fwrite、panic
    ├── arr.vix               # 数组操作：sort
    ├── strings.vix           # 字符串操作：strcmp
    ├── mem.vix               # 内存：malloc、free、memcpy、memset、memcmp
    ├── os.vix                # 操作系统：system、exit、opendir、readdir、closedir
    ├── rand.vix              # 随机数生成
    └── net.vix               # 网络：socket、listen、accept、send、close
```

### 头文件 (`include/`)

| 头文件 | 用途 |
|--------|------|
| `ast.h` | AST 节点类型（40+ 变体）、TypeInfo、创建/克隆函数 |
| `codegen.h` | `llvm_emit_from_ast()`、目标三元组配置 |
| `compiler.h` | 错误报告 API、源码位置追踪 |
| `compat.h` | 跨平台兼容（Win32/POSIX） |
| `env.h` | `TypeEnv` 类：作用域化的值/结构体/ADT/构造器环境 |
| `parser.h` | `yylex()`、`yyparse()` 声明 |
| `semantic.h` | `SymbolTable`、`Symbol`、语义分析函数 |
| `type.h` | `Type` 结构体，带标记联合，工厂方法 |
| `typeck.h` | `typecheck_program()` 公共 API |
| `typeckinternal.h` | 内部类型检查 API |
| `typeinfer.h` | 遗留的 C 语言类型推断上下文 |
| `unify.h` | `Unifier` 类：Hindley-Milner 合一引擎 |

## 构建系统

### 前置依赖

- CMake 3.20+
- C11 编译器（GCC 或 Clang）
- C++17 编译器
- Flex 2.6+
- Bison 3.0+
- LLVM 18-20（含开发头文件）
- LLD 18-20

### 构建

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release --parallel
```

### 安装依赖

```bash
# Ubuntu/Debian
sudo apt install cmake flex bison llvm-dev lld

# Arch Linux
sudo pacman -S cmake flex bison llvm lld

# macOS (Homebrew)
brew install cmake flex bison llvm lld
```

或使用提供的安装脚本：`bash src/install.sh`

## 编译器 CLI

```
用法: vixc [选项] <input.vix>

选项:
  -o <file>              将输出写入 <file>
  -S [file]              生成汇编（默认：<input>.s）
  -obj [file]            生成目标文件（默认：<input>.o）
  -ll [file]             生成 LLVM IR（默认：<input>.ll）
  -llvm                  将 LLVM IR 打印到 stdout
  -ast                   将 AST 打印到 stdout
  -opt=lN                设置优化级别（N = 0..3）
  --target=<triple>      设置代码生成/链接目标三元组
  --debug                启用调试输出
  -v, --version          显示编译器版本
  -h, --help             显示帮助信息
```

## 测试

测试套件使用 pytest，包含：

```bash
# 运行所有测试
.venv/bin/python -m pytest tests/ -v

# 运行特定类别
.venv/bin/python -m pytest tests/ -m unit        # 单元测试
.venv/bin/python -m pytest tests/ -m integration  # 集成测试
.venv/bin/python -m pytest tests/ -m feature      # 功能测试
.venv/bin/python -m pytest tests/ -m fuzz         # 模糊测试
.venv/bin/python -m pytest tests/ -m stress       # 压力测试
.venv/bin/python -m pytest tests/ -m cli          # CLI 测试
.venv/bin/python -m pytest tests/ -m error        # 错误处理测试

# 运行遗留测试运行器
python test/run.py

# 运行 C 单元测试（先构建）
gcc -I include test/unit_tests.c -o build/unit_tests -I build/parser
./build/unit_tests

# 运行模糊测试（独立运行）
python test/fuzz/fuzz.py
```

### 测试结构

```
tests/
├── conftest.py         # pytest 夹具和配置
├── helpers.py          # 共享测试工具
├── test_regression.py  # 212 个回归测试（编译 + 运行 + 验证输出）
├── test_features.py    # 功能特定测试（算术、控制流、结构体等）
├── test_errors.py      # 错误处理和诊断测试
├── test_cli.py         # 命令行接口测试
├── test_stress.py      # 压力测试（深层嵌套、大型程序、循环）
├── test_fuzz.py        # 模糊测试（随机/畸形程序）
├── test_unit.py        # 单元测试（源码结构、头文件、标准库）
└── test_examples.py    # 示例程序编译测试
```

## 交叉编译

vixc 通过 `--target` 标志支持交叉编译：

```bash
# 为 ARM64 Linux 编译
vixc input.vix --target=aarch64-linux-gnu -o output

# 为 Windows 编译
vixc input.vix --target=x86_64-w64-mingw32 -o output.exe

# 为 WebAssembly 编译
vixc input.vix --target=wasm32-unknown-unknown -o output.wasm
```

## 错误报告

vixc 提供丰富的错误诊断，包括：
- 错误类别（语法、词法、类型、未定义、重复定义、语义）
- 源码位置（文件、行、列）
- 带插入符指向错误位置的源码上下文
- 修复错误的有用建议
- 终端设备上的 ANSI 彩色输出

## 测试

### 运行测试

```bash
# 激活 Python 虚拟环境
source .venv/bin/activate

# 运行所有测试
python -m pytest tests/test_features.py tests/test_fuzz.py tests/test_stress.py -v

# 运行特定测试套件
python -m pytest tests/test_features.py -v    # 500+ 功能测试
python -m pytest tests/test_fuzz.py -v        # 500+ 模糊测试
python -m pytest tests/test_stress.py -v      # 100+ 压力测试

# 运行现有回归测试
python -m pytest tests/regre.py -v

# 运行完整测试运行器
python tests/run.py
```

### 测试组织

| 文件 | 类别 | 描述 |
|------|----------|-------------|
| `test_features.py` | `@pytest.mark.feature` | 500+ 功能测试，覆盖所有语言特性 |
| `test_fuzz.py` | `@pytest.mark.fuzz` | 500+ 模糊测试，生成随机合法程序 |
| `test_stress.py` | `@pytest.mark.stress` | 100+ 压力测试，针对边界情况和大型程序 |
| `feat.py` | `@pytest.mark.feature` | 额外功能测试 |
| `fuzz.py` | `@pytest.mark.fuzz` | 额外模糊测试 |
| `stress.py` | `@pytest.mark.stress` | 额外压力测试 |
| `errors.py` | `@pytest.mark.error` | 错误处理和诊断测试 |
| `examp.py` | `@pytest.mark.integration` | 示例文件编译测试 |
| `regre.py` | regression | 220+ 回归测试，针对已知正确输出 |

## 更新日志

### v0.1.2 (2026-05-15)

#### 新功能
- **幂运算符（`**`）：** 完整实现了整数和浮点数幂运算。整数幂使用高效的基于循环的算法；浮点数幂委托给 libc 的 `pow()`。常量表达式在编译时折叠。
- **字符串模式匹配：** `match` 表达式现在使用 `strcmp()` 正确比较字符串，而不是指针相等性。类似 `match s { "hello" -> ... }` 的模式按预期工作。
- **类型注解强制：** `let x: T = value` 现在正确验证初始化器的类型是否与声明的类型匹配。数值类型（i8、i32、i64、f32、f64）允许提升。非数值类型不匹配产生清晰的错误消息。
- **ADT 构造器类型推断：** 带负载的用户定义 ADT 构造器现在可以正确进行类型检查。`check_call` 函数在回退到常规函数查找之前，通过 `env.lookup_ctor()` 解析已注册的构造器。

#### Bug 修复
- 修复了 CodeGen.cpp 中 `visitBinOp()` 缺少 `OP_POW` 的问题——幂表达式现在生成正确的 LLVM IR
- 修复了 `evaluateConstExpr()` 中缺少 `OP_POW` 的问题——常量幂表达式现在可以被折叠
- 修复了 `visitBinOp()` 中的字符串比较——字符串相等性比较（`==`、`!=`、`<`、`>`、`<=`、`>=`）现在使用 `strcmp()` 而非指针比较
- 修复了 Typeck.cpp 中 `check_assign()` 通过空 `catch (...) {}` 静默吞噬类型不匹配错误的问题
- 改进了 `check_call()` 中的 ADT 构造器解析，使用专用的 `env.lookup_ctor()` 路径

#### 测试套件
- 新增 500+ 功能测试（`tests/test_features.py`），覆盖算术、变量、控制流、函数、字符串、match、类型、结构体、数组、指针、ADT、泛型
- 新增 500+ 模糊测试（`tests/test_fuzz.py`），生成随机合法程序以验证无崩溃
- 新增 100+ 压力测试（`tests/test_stress.py`），针对深层嵌套、大型程序、循环压力、表达式复杂度

#### 示例
- 新增 `examples/match_strings.vix` — 字符串模式匹配演示
- 新增 `examples/power.vix` — 幂运算符演示
- 新增 `examples/adt_pattern.vix` — 使用 Option/Result 的 ADT 模式匹配

#### 文档
- 更新了 `Docs/COMPILER.md`，包含测试部分和更新日志
- 更新了 `Docs/syntax.ebnf`，在表达式语法中包含幂运算符
