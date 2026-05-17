# 什么是 xpm？

xpm（Vix 包管理器）是 Vix 编程语言的官方包管理工具。它帮助你管理依赖、共享代码以及发布自己的 Vix 包。

## 概述

xpm 简化了以下流程：
- **依赖管理**：轻松添加、更新和移除包
- **项目初始化**：快速建立具有正确结构的 Vix 项目
- **包发布**：与 Vix 社区共享你的库
- **版本控制**：管理不同版本的依赖

## 核心特性

### 1. 简单配置

xpm 使用 `xpm.json` 文件管理项目依赖：

```json
{
  "name": "my-vix-project",
  "version": "1.0.0",
  "dependencies": {
    "std-extra": "^1.2.0",
    "math-lib": "^0.5.0"
  }
}
```

### 2. 自动依赖解析

xpm 自动解析并下载依赖：

```bash
xpm install
```

### 3. 本地缓存

包会被缓存在本地以避免重复下载：

```
~/.xpm/
├── cache/
│   ├── std-extra@1.2.0/
│   └── math-lib@0.5.0/
└── config.toml
```

## 安装

### 从源码安装

```bash
git clone https://github.com/vix-lang/xpm.git
cd xpm
make
sudo make install
```

### 验证安装

```bash
xpm --version
```

## 基本工作流

```bash
# 创建新项目
xpm init my-project

# 进入项目目录
cd my-project

# 添加依赖
xpm add std-extra

# 安装所有依赖
xpm install

# 构建你的项目
vixc main.vix -o my-app
```

## 下一步

- [快速入门](getting-started.md) - 学习如何使用 xpm
- [命令参考](commands.md) - 完整命令文档
