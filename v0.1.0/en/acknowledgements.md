<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members_Core = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/228652034?v=4',
    name: 'Daweidie',
    title: 'Compiler core implementation, language design, documentation writing',
    links: [
      { icon: 'github', link: 'https://github.com/Daweidie' },
    ]
  },
]

const members_Contributor = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/177229499?v=4',
    name: 'zty1203py',
    title: 'EBNF writing',
    links: [
      { icon: 'github', link: 'https://github.com/zty1203py' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/136948328?v=4',
    name: 'fexcode',
    title: 'VPM development and writing, website setup',
    links: [
      { icon: 'github', link: 'https://github.com/fexcode' },
    ]
  },
  {
    avatar: 'https://images-sxxyrry.pages.dev/sxxyrryAvatar.png',
    name: 'XR/sxxyrry/みらいの落英',
    title: 'Documentation writing, documentation website setup',
    links: [
      { icon: 'github', link: 'https://github.com/sxxyrry' },
    ]
  },
]
</script>

# Acknowledgements

Vix 0.1.0 is the result of the collective efforts of many people. We would like to express our sincere gratitude to everyone who has helped the project.

## Project Team

### Core Development

<VPTeamMembers size="small" :members="members_Core" />

### Contributors

<VPTeamMembers size="small" :members="members_Contributor" />

## Community Contributors

Thanks to the following developers for their contributions:

- Thanks to all developers who submitted Issues and Pull Requests
- Thanks to users who provided valuable suggestions and feedback
- Thanks to contributors who helped improve the documentation

## Core Dependencies

Vix development relies on the following excellent open source projects:

### Compiler Backend

- **[LLVM](https://llvm.org/)** - Compiler backend
  - Provides powerful optimization capabilities and multi-architecture support
  - License: Apache 2.0

### Standard Library

- **[libc](https://en.wikipedia.org/wiki/C_standard_library)** - C Standard Library
  - Provides C language runtime support
  - Vix compiler (vixc) relies on libc for low-level operations

### Build Tools

- **[Make](https://www.gnu.org/software/make/)** - Build tool
  - Manages vixc compilation process through Makefile
  - License: GPL v3

- **[CMake](https://cmake.org/)** - Cross-platform build system
  - Provides cross-platform build configuration
  - Used for vixc project building and dependency management
  - License: BSD 3-Clause

### Documentation Tools

- **[VitePress](https://vitepress.dev/)** - Documentation framework
  - Provides clean and efficient static site generation
  - License: MIT

- **[Vue.js](https://vuejs.org/)** - UI framework
  - Provides modern frontend interaction experience
  - License: MIT

- **[Vite](https://vitejs.dev/)** - Build tool
  - Provides extremely fast development experience
  - License: MIT

- **[Shiki](https://shiki.style/)** - Code highlighting
  - Provides beautiful code syntax highlighting
  - License: MIT

- **[TypeScript](https://www.typescriptlang.org/)** - Type system
  - Provides powerful type support
  - License: Apache 2.0

## Special Thanks

- Thanks to all users and developers who use Vix, your feedback and suggestions are the driving force for our continuous improvement
- Thanks to the open source community for providing valuable resources and support
- Thanks to the LLVM community for providing excellent compiler infrastructure
- Thanks to all individuals and organizations who have contributed to the Vix project

## Resource Support

- **[GitHub](https://github.com/)** - Code hosting and collaboration platform
- **[VitePress](https://vitepress.dev/)** - Documentation site building tool

---

## How to Contribute

If you'd like to contribute to Vix, we welcome the following forms of help:

- **Code Contribution**: Submit Pull Requests to fix bugs or add new features
- **Documentation Improvement**: Improve documentation, correct errors, or translate documentation
- **Issue Reporting**: Submit Issues to report bugs or suggest features
- **Testing**: Test Vix functionality on different platforms and scenarios
- **Promotion**: Introduce and recommend Vix to others

[View GitHub Repository](https://github.com/vixlang) | [Submit Issue](https://github.com/vixlang/VixDocs/issues) | [Create Pull Request](https://github.com/vixlang/VixDocs/pulls)

---

**Thank you again to all individuals and organizations who have contributed to the Vix project!**

The successful release of Vix 0.1.0 would not have been possible without the efforts and contributions of every contributor!
