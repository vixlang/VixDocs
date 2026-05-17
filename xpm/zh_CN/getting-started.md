# xpm 快速入门

本指南帮助你快速上手 xpm（Vix 包管理器）。

## 前置条件

- 已安装 Vix 编译器（`vixc`）
- 互联网连接（用于下载包）
- 基本的 Vix 编程知识

## 创建新项目

### 初始化项目

```bash
xpm init my-project
```

这会创建一个具有如下结构的新目录：

```
my-project/
├── xpm.json          # 项目配置文件
├── src/
│   └── main.vix    # 入口文件
├── lib/             # 依赖目录
└── README.md
```

### 项目配置

`xpm.json` 文件包含你的项目元数据：

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My Vix project",
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {}
}
```

## 管理依赖

### 添加包

```bash
xpm add std-extra
```

这会更新 `xpm.json`：

```json
{
  "dependencies": {
    "std-extra": "^1.2.0"
  }
}
```

### 添加指定版本

```bash
xpm add std-extra@1.0.0
```

### 移除包

```bash
xpm remove std-extra
```

### 安装依赖

安装 `xpm.json` 中列出的所有依赖：

```bash
xpm install
```

## 在代码中使用包

安装包后，在你的 Vix 代码中导入它：

```vix
import "lib/std-extra/string_utils.vix"

fn main() -> i32 {
    let result = reverse("Hello")
    print(result)  // "olleH"
    return 0
}
```

## 更新包

### 更新所有包

```bash
xpm update
```

### 更新指定包

```bash
xpm update std-extra
```

## 搜索包

```bash
xpm search math
```

输出：
```
找到 3 个包：
- math-lib (v1.0.0) - 基础数学工具
- math-extra (v0.5.0) - 扩展数学函数
- linear-algebra (v2.1.0) - 线性代数库
```

## 发布自己的包

### 1. 准备你的包

为你的包创建 `xpm.json`：

```json
{
  "name": "my-awesome-lib",
  "version": "1.0.0",
  "description": "My awesome Vix library",
  "author": "Your Name",
  "license": "MIT",
  "main": "src/lib.vix",
  "keywords": ["utility", "helpers"]
}
```

### 2. 发布

```bash
xpm publish
```

## 下一步

- [命令参考](commands.md) - 完整 xpm 命令文档
- [什么是 xpm？](what-is-xpm.md) - 概述和特性
