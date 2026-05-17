# xpm 命令参考

xpm（Vix 包管理器）所有命令的完整参考。

## 命令概览

| 命令 | 描述 |
|---------|-------------|
| `xpm init [name]` | 初始化新的 Vix 项目 |
| `xpm add <package>[@version]` | 添加包依赖 |
| `xpm remove <package>` | 移除包依赖 |
| `xpm install` | 安装所有依赖 |
| `xpm update [package]` | 更新包 |
| `xpm search <query>` | 搜索包 |
| `xpm publish` | 发布你的包 |
| `xpm list` | 列出已安装的包 |
| `xpm info <package>` | 显示包信息 |
| `xpm config` | 配置 xpm 设置 |

## 详细命令参考

### xpm init

初始化新的 Vix 项目：

```bash
xpm init [project-name]
```

**选项：**
- `--template <name>` - 使用特定项目模板
- `--author <name>` - 设置作者名
- `--license <type>` - 设置许可证类型（MIT, Apache2.0, GPL3.0）

**示例：**
```bash
xpm init my-app --template cli --author "John Doe" --license MIT
```

### xpm add

向你的项目添加包：

```bash
xpm add <package-name>[@version]
```

**选项：**
- `--dev` - 作为开发依赖添加
- `--exact` - 固定到精确版本

**示例：**
```bash
xpm add std-extra
xpm add math-lib@1.0.0
xpm add test-lib --dev
```

### xpm remove

从项目中移除包：

```bash
xpm remove <package-name>
```

**示例：**
```bash
xpm remove std-extra
```

### xpm install

安装 `xpm.json` 中列出的所有依赖：

```bash
xpm install
```

**选项：**
- `--production` - 跳过开发依赖
- `--force` - 强制重新安装所有包

### xpm update

更新包到最新版本：

```bash
xpm update [package-name]
```

**选项：**
- `--major` - 允许主版本更新
- `--minor` - 允许次版本更新（默认）
- `--patch` - 仅更新补丁版本

**示例：**
```bash
xpm update              # 更新所有
xpm update std-extra    # 更新指定包
xpm update --major     # 允许破坏性更改
```

### xpm search

搜索包注册表：

```bash
xpm search <query>
```

**选项：**
- `--limit <n>` - 限制结果数量
- `--verbose` - 显示详细信息

**示例：**
```bash
xpm search math --limit 10
```

### xpm publish

发布你的包到注册表：

```bash
xpm publish
```

**选项：**
- `--dry-run` - 测试而不发布
- `--tag <tag>` - 使用标签发布

**前置条件：**
- 你必须在 Vix 包注册表上有账户
- 你必须已登录（`xpm login`）

### xpm list

列出所有已安装的包：

```bash
xpm list
```

**输出：**
```
已安装的包：
- std-extra@1.2.0
- math-lib@0.5.0
- test-utils@2.0.1
```

**选项：**
- `--outdated` - 仅显示过时的包
- `--json` - 以 JSON 格式输出

### xpm info

显示包的详细信息：

```bash
xpm info <package-name>
```

**输出：**
```
包名：std-extra
版本：1.2.0
描述：Vix 扩展标准库
作者：Vix 社区
许可证：MIT
主页：https://github.com/vix-lang/std-extra
依赖： 
  - math-lib@^0.5.0
```

### xpm config

配置 xpm 设置：

```bash
xpm config <key> [value]
```

**可用键：**
- `registry` - 包注册表 URL
- `cache-dir` - 缓存目录路径
- `auto-install` - 自动安装依赖（true/false）

**示例：**
```bash
xpm config registry https://packages.vix-lang.org
xpm config cache-dir ~/.xpm/cache
xpm config auto-install true
```

## 配置文件

xpm 使用 `~/.xpm/config.toml` 作为全局设置：

```toml
registry = "https://packages.vix-lang.org"
cache_dir = "~/.xpm/cache"
auto_install = true

[publish]
username = "your-username"
token = "your-api-token"
```

## 下一步

- [什么是 xpm？](what-is-xpm.md) - 概述
- [快速入门](getting-started.md) - 快速开始指南
