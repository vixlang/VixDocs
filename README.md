# Vix 编程语言文档站点

这是 [Vix 编程语言](https://github.com/Daweidie/vix) 的官方文档站点，基于 [VitePress](https://vitepress.dev/) 构建。  
你可以在这里阅读语言教程、语法参考、标准库文档以及参与贡献的相关指南。

## 本地开发

### 环境要求

- Node.js 18 或更高版本
- pnpm（推荐）或 npm / yarn

### 克隆与安装

```bash
git clone https://github.com/Daweidie/vix-docs.git
cd vix-docs
pnpm install
```

### 启动开发服务器

```bash
pnpm run docs:dev
```

打开 http://localhost:5173 即可预览文档。

### 构建生产版本

```bash
pnpm run docs:build
```

构建产物位于 `docs/.vitepress/dist`，可以部署到任意静态托管服务（GitHub Pages、Vercel、Netlify 等）。

## 目录结构

```
.
├── docs/                      # 文档源文件
│   ├── .vitepress/            # VitePress 配置与主题
│   │   ├── config.mts         # 站点配置（导航栏、侧边栏等）
│   │   └── theme/             # 自定义样式或组件
│   ├── index.md               # 文档首页
│   ├── getting-started.md     # 快速入门
│   ├── ...                    # 其余 Markdown 页面
│   └── public/                # 静态资源（图片、favicon 等）
├── package.json
├── README.md                  # 本文件
└── LICENSE-CODE               # 站点源代码许可证
    LICENSE-DOCS               # 文档内容许可证
```

## 参与文档贡献

我们欢迎所有人改进文档！你可以：

- 修正拼写或语法错误
- 补充示例代码
- 翻译未完成的内容
- 完善 API 参考

请先阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)（位于文档站点内），然后提交 Pull Request。

## 许可证

本仓库采用**双许可证**模式，以区分站点代码与文档内容：

- **文档内容**（`docs/` 目录下的所有 `.md` 文件、图片及资源）  
  遵循 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 许可证。  
  你可以自由分享、改编本内容，但必须署名并使用相同许可证发布。

- **站点源代码**（`.vitepress/` 目录下的配置文件、组件、脚本等）  
  遵循 [MIT](https://opensource.org/licenses/MIT) 许可证。  
  你可以自由使用、修改、分发，仅需保留版权声明。

> 📌 Vix 编译器本身采用 [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) 许可证，与文档站点的许可证相互独立。

## 相关问题

如对文档内容有疑问，请[提交 Issue](https://github.com/Daweidie/vix/issues)。  
若发现文档站点的构建或样式问题，请在本文档仓库（`vix-docs`）中反馈。

---

**感谢所有为 Vix 文档贡献时间和精力的开发者！**  
🌟 如果这对你有帮助，欢迎给 Vix 主仓库点个 Star。
