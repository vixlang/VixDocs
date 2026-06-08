# 快速入门

## 系统要求

- LLVM 18-20、Flex 2.6+、Bison 3.0+、CMake 3.20+、C11/C++17 编译器

## 安装依赖

```bash
# Ubuntu/Debian
sudo apt install cmake flex bison llvm-dev lld

# macOS (Homebrew)
brew install cmake flex bison llvm lld

# 或使用仓库脚本
bash src/install.sh
```

## 构建编译器

```bash
git clone https://github.com/vixlang/Vix-lang.git
cd Vix-lang
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release --parallel
```

## Hello World

```vix
fn main(): i32
{
    print("Hello, Vix!")
    return 0
}
```

```bash
vixc hello.vix
./hello
```

## 基础语法

```vix
// 变量
let x = 10                // 不可变
let mut y = 20            // 可变
let name: string = "Vix"  // 显式类型

// 函数
fn add(a: i32, b: i32): i32
{
    return a + b
}

// 引用 (v0.3.0)
fn read(x: ref i32): i32
{
    return @x
}

fn main(): i32
{
    print(read(ref value))
    return 0
}
```

## 编译器选项速查

```bash
vixc source.vix              # 编译为可执行文件
vixc source.vix --check      # 仅检查语法和类型
vixc source.vix -ll          # 输出 LLVM IR
vixc source.vix -ast         # 打印 AST
vixc source.vix -obj         # 目标文件
vixc a.o b.o -o prog         # 链接目标文件
vixc -v                      # 版本信息
```

## 下一步

- [语法参考](syntax)
- [类型系统](types)
- [所有权系统](ownership)
- [标准库](stdlib)
