<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members_Core = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/228652034?v=4',
    name: 'Daweidie',
    title: '编译器核心实现，语言设计，文档编写',
    links: [
      { icon: 'github', link: 'https://github.com/Daweidie' },
    ]
  },
]

const members_Contributor = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/177229499?v=4',
    name: 'zty1203py',
    title: 'EBNF 编写',
    links: [
      { icon: 'github', link: 'https://github.com/zty1203py' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/136948328?v=4',
    name: 'fexcode',
    title: 'xpm 开发与编写，网站搭建',
    links: [
      { icon: 'github', link: 'https://github.com/fexcode' },
    ]
  },
  {
    avatar: 'https://images-sxxyrry.pages.dev/sxxyrryAvatar.png',
    name: '星燃_X-starRelight',
    title: '文档编写，文档网站搭建',
    links: [
      { icon: 'github', link: 'https://github.com/X-starRelight' },
    ]
  },
]
</script>

# 鸣谢

Vix 0.1.0 是许多人共同努力的结果。在此，我们向所有帮助过项目的人表示最诚挚的感谢。

## 项目团队

### 核心开发

<VPTeamMembers size="small" :members="members_Core" />

### 贡献者

<VPTeamMembers size="small" :members="members_Contributor" />

## 社区贡献者

感谢以下开发者对项目的贡献：

- 感谢所有提交 Issue 和 Pull Request 的开发者
- 感谢提供宝贵建议和反馈的用户
- 感谢帮助完善文档的贡献者

## 核心依赖项目

Vix 的开发离不开以下优秀的开源项目：

### 编译器后端

- **[LLVM](https://llvm.org/)** - 编译器后端
  - 提供了强大的优化能力和多架构支持
  - 许可证: Apache 2.0

### 标准库

- **[libc](https://en.wikipedia.org/wiki/C_standard_library)** - C 标准库
  - 提供了 C 语言运行时支持
  - Vix 编译器 (vixc) 依赖 libc 进行底层操作

### 构建工具

- **[Make](https://www.gnu.org/software/make/)** - 构建工具
  - 通过 Makefile 管理 vixc 的编译流程
  - 许可证: GPL v3

- **[CMake](https://cmake.org/)** - 跨平台构建系统
  - 提供了跨平台的构建配置
  - 用于 vixc 的项目构建和依赖管理
  - 许可证: BSD 3-Clause

### 文档工具

- **[VitePress](https://vitepress.dev/)** - 文档框架
  - 提供了简洁高效的静态网站生成能力
  - 许可证: MIT

- **[Vue.js](https://vuejs.org/)** - UI 框架
  - 提供了现代化的前端交互体验
  - 许可证: MIT

- **[Vite](https://vitejs.dev/)** - 构建工具
  - 提供了极速的开发体验
  - 许可证: MIT

- **[Shiki](https://shiki.style/)** - 代码高亮
  - 提供了精美的代码语法高亮
  - 许可证: MIT

- **[TypeScript](https://www.typescriptlang.org/)** - 类型系统
  - 提供了强大的类型支持
  - 许可证: Apache 2.0

## 特别感谢

- 感谢所有使用 Vix 的用户和开发者，您的反馈和建议是我们持续改进的动力
- 感谢开源社区提供的宝贵资源和支持
- 感谢 LLVM 社区提供的优秀编译器基础设施
- 感谢所有为 Vix 项目提供帮助的人和组织

## 资源支持

- **[GitHub](https://github.com/)** - 代码托管和协作平台
- **[VitePress](https://vitepress.dev/)** - 文档站点构建工具

---

## 如何贡献

如果您想为 Vix 做出贡献，我们欢迎以下形式的帮助：

- **代码贡献**：提交 Pull Request 修复 bug 或添加新功能
- **文档改进**：完善文档，纠正错误，或翻译文档
- **问题反馈**：提交 Issue 报告 bug 或提出功能建议
- **测试验证**：在不同平台和场景下测试 Vix 的功能
- **推广分享**：向他人介绍和推荐 Vix

[查看 GitHub 仓库](https://github.com/vixlang) | [提交 Issue](https://github.com/vixlang/VixDocs/issues) | [发起 Pull Request](https://github.com/vixlang/VixDocs/pulls)

---

**再次感谢所有为 Vix 项目提供帮助的人和组织！**

Vix 0.1.0 的成功发布离不开每一位贡献者的努力和付出！
