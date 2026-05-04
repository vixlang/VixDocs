![VPM logo](/assets/vpm-logo.png)

# VPM - Vix 包管理器

[![Vix](https://img.shields.io/badge/Vix-编程语言-blue)]()
[![License](https://img.shields.io/badge/许可证-Apache%202.0-blue)]()

VPM（Vix Package Manager）是 Vix 编程语言的官方包管理工具，依托 Git 仓库进行包管理，提供简洁的语法来下载、管理和发布 Vix 包。

[English](README-en.md) | [快速开始](#快速开始) | [命令介绍](#vpm命令介绍) | [参与贡献](#参与贡献)

## 特性概览

- 基于 Git 的包管理（支持 GitHub / Gitee）
- 简洁的包引用语法（支持 `@` 指定分支）
- 自动依赖解析与本地缓存
- 支持树形结构查看已安装包

## 官方包下载仓库

> 地址：https://github.com/vixlang

### 规范

官方仓库的标准库项目名以 `vlib-` 开头。

## 快速开始

### 安装 VPM

```bash
git clone https://github.com/vix-lang/vpm.git
cd vpm
python main.py install
```

### 验证安装

```bash
vpm --version
```

### 第一个包

下载并安装一个包：

```bash
vpm add vnet                        # 下载 github.com/vixlang/vlib-vnet
vpm add fexcode.vnet                # 下载 github.com/fexcode/vnet 仓库  
vpm add fexcode.vnet@master         # 下载 master 分支
```

### 使用包

```vix
import "lib/vnet/server.vix"

fn main() -> i32 {
    let server = vnet.createServer(8080)
    print("Server running on port 8080")
    return 0
}
```

## 包索引格式

```bash
vpm add vnet                        # 下载 github.com/vixlang/vlib-vnet
vpm add fexcode.vnet                # 下载 github.com/fexcode/vnet 仓库  
vpm add fexcode.vnet@master         # 下载 github.com/fexcode/vnet 仓库 master 分支      
vpm add gitee.com:fexcode.vnet      # 下载 gitee.com/fexcode/vnet 仓库  
vpm add gitee:fexcode.vnet@master   # .com 可以省略  
```

> 我还给自己留了个语法糖（因为我比较喜欢 Gitee 嘛），  
> `@fexcode.vpm`  # 等价于 `gitee:fexcode.vpm`

---

## VPM命令介绍

### vpm add - 添加包

`vpm add` 命令用于从 Git 仓库下载并安装 Vix 包。

#### 格式

```bash
vpm add <git主仓库地址>:<用户名>.<git仓库项目名>@<分支名>
```

#### 示例

```bash
vpm add fexcode.vnet                # 下载 github.com/fexcode/vnet 仓库
vpm add fexcode.vnet@master         # 下载 github.com/fexcode/vnet 仓库 master 分支
vpm add gitee.com:fexcode.vnet      # 下载 gitee.com/fexcode/vnet 仓库
vpm add gitee:fexcode.vnet@master   # .com 可以省略
vpm add @fexcode.vnet               # @符号开头默认为 gitee.com
```

### vpm del - 删除包

`vpm del` 命令用于删除已安装的 Vix 包。

#### 格式

```bash
vpm del <git主仓库地址>:<用户名>.<git仓库项目名>
```

#### 示例

```bash
vpm del fexcode.vnet                # 删除 github.com/fexcode/vnet 仓库
vpm del gitee.com:fexcode.vnet      # 删除 gitee.com/fexcode/vnet 仓库
vpm del gitee:fexcode.vnet          # .com 可以省略
vpm del @fexcode.vnet               # @符号开头默认为 gitee.com
```

### vpm list - 列出已安装的包

`vpm list` 命令用于列出所有已安装的 Vix 包。

#### 格式

```bash
vpm list [-t|--tree]
```

#### 参数

- `-t, --tree`: 以树形结构显示包列表

#### 示例

```bash
vpm list              # 列出所有已安装的包
vpm list -t           # 以树形结构显示包列表
```

### vpm prune - 清理无效包和空目录

`vpm prune` 命令用于删除没有 `vindex.toml` 的包和空目录。

#### 格式

```bash
vpm prune [--empty-only | --invalid-only]
```

#### 选项

- `--empty-only`: 只删除空目录
- `--invalid-only`: 只删除没有 `vindex.toml` 的包

#### 示例

```bash
vpm prune                      # 删除无效包和空目录
vpm prune --empty-only         # 只删除空目录
vpm prune --invalid-only       # 只删除无效包
```

---

## .vix 目录结构示例

```bash
.vix
└── libs
    ├── gitee.com
    │   ├── fexcode
    │   │   ├── vpm
    │   │   └── vpm2
    │   └── fexcode2
    │       └── vpm3
    └── github.com
        ├── fexcode
        │   └── vpm
        ├── fexcode2
        │   └── vpm2
        └── fexcode3
            └── vpm3
```

## 参与贡献

我们欢迎各种形式的贡献！包括但不限于：提出功能建议、撰写文档、报告 bug、提交代码、完善包生态等。

## 许可证

本项目基于 Apache License 2.0 开源。

## 联系方式

- 邮箱：[popolk1871@outlook.com](mailto:popolk1871@outlook.com)
- GitHub Issues：直接在本仓库提交

**如果你对 VPM 感兴趣，欢迎 star、fork、提 issue，或者直接上手试试！**
