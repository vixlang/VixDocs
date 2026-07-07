# 编译器架构

vixc 是 AOT 编译器，前端用 C 实现，后端用 C++ 实现。

## 编译流水线

```
源码 → Flex 词法分析 → Bison 语法分析 → AST
  → 导入内联 → 语义分析 → 类型检查 → 所有权检查
  → LLVM IR 生成 → LLC 目标文件 → LLD 链接 → 可执行文件
```

## 源码组织

```
src/
├── main.c              /* 入口、CLI、流水线编排 */
├── ast/ast.c           /* AST 节点创建、操作、导入内联 */
├── parser/
│   ├── lexer.l         /* Flex 词法分析器 */
│   └── parser.y        /* Bison 语法分析器 */
├── semantic/
│   └── semantic.c      /* 符号表、作用域分析 */
├── Typeck/
│   ├── Typeck.cpp      /* Hindley-Milner 类型检查 */
│   ├── TypeckInfer.cpp /* C 桥接 */
│   └── LayOut.cpp      /* 类型大小/对齐计算 */
├── Ownership/
│   └── Ownership.cpp   /* 所有权与借用检查 */
├── compiler/
│   ├── CodeGen.cpp     /* LLVM IR 生成 */
│   ├── Passes.cpp      /* LLVM 优化 */
│   ├── Llc/            /* LLVM IR → 目标文件 */
│   └── Linker/         /* LLD 链接 */
├── utils/error.c       /* 错误报告 */
└── std/                /* 标准库 */
```

## 构建

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release --parallel
```
