import { defineConfig } from 'vitepress'
import { createHighlighter } from 'shiki'
import vixGrammar from './theme/vix/extension/syntaxes/vix.json'

const vixLang = {
  ...vixGrammar,
  id: 'vix',
  name: 'vix'
}

const commonLangs = ['bash', 'sh', 'javascript', 'typescript', 'json', 'markdown', 'html', 'css', 'yaml', 'toml', 'python', 'rust', 'go', 'java', 'cpp', 'c', 'sql', 'xml', 'dockerfile', 'ini', 'lua', 'powershell', 'shellscript']

const highlighter = await createHighlighter({
  themes: ['vitesse-light', 'vitesse-dark'],
  langs: [vixLang, ...commonLangs]
})

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    highlight: (code: string, lang: string) => {
      const normalizedLang = lang?.toLowerCase() || 'text'
      try {
        return highlighter.codeToHtml(code, {
          lang: normalizedLang,
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
          }
        })
      } catch {
        return highlighter.codeToHtml(code, {
          lang: 'text',
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
          }
        })
      }
    }
  },
  title: "Vix 语言文档",
  description: "Vix 语言文档",
  base: '/VixDocs/',
  lang: 'zh-CN',
  lastUpdated: true,
  ignoreDeadLinks: true,
  srcExclude: ['Vix-lang/**', 'XpmCode/**'],
  vite: {
    server: {
      allowedHosts: ['p.ceroxe.top']
    },
    build: {
      chunkSizeWarningLimit: 1000
    }
  },
  themeConfig: {
    logo: '/assets/vixlogo.png',
    outline: {
      label: '在本页面'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    externalLinkIcon: true,
    editLink: {
      pattern: 'https://github.com/vixlang/VixDocs/edit/main/:path',
      text: '在 Github 上编辑此页'
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
   nav: [
        { text: '首页', link: '/' },
        { text: 'v0.2.0', items: [
          { text: 'Vix 语言 (中文)', link: '/v0.2.0/zh_CN/what-is-vix' },
          { text: 'Vix Language (English)', link: '/v0.2.0/en/what-is-vix' },
          { text: '更新日志', link: '/v0.2.0/zh_CN/release-notes' },
          { text: 'Release Notes', link: '/v0.2.0/en/release-notes' },
          { text: '鸣谢', link: '/v0.2.0/zh_CN/acknowledgements' },
          { text: 'Acknowledgements', link: '/v0.2.0/en/acknowledgements' },
        ]},
        { text: 'v0.1.0', items: [
          { text: 'Vix 语言 (中文)', link: '/v0.1.0/zh_CN/what-is-vix' },
          { text: 'Vix Language (English)', link: '/v0.1.0/en/what-is-vix' },
          { text: '鸣谢', link: '/v0.1.0/zh_CN/acknowledgements' },
          { text: 'Acknowledgements', link: '/v0.1.0/en/acknowledgements' },
        ]},
        { text: 'xpm', link: '/xpm/' },
        { text: 'xpm (中文)', link: '/xpm/zh_CN/' },
        { text: 'xpm (En)', link: '/xpm/en/' },
      ],

      sidebar: {
        '/': [
          {
            text: 'v0.2.0 — Vix 语言文档',
            collapsed: true,
            items: [
              { text: '什么是 Vix 语言', link: '/v0.2.0/zh_CN/what-is-vix' },
              { text: '快速入门', link: '/v0.2.0/zh_CN/getting-started' },
              { text: '语法参考', link: '/v0.2.0/zh_CN/syntax' },
              { text: '类型系统', link: '/v0.2.0/zh_CN/types' },
              { text: '函数', link: '/v0.2.0/zh_CN/functions' },
              { text: '控制流', link: '/v0.2.0/zh_CN/control-flow' },
              { text: '结构体', link: '/v0.2.0/zh_CN/structs' },
              { text: '指针', link: '/v0.2.0/zh_CN/pointers' },
              { text: '模块系统', link: '/v0.2.0/zh_CN/modules' },
              { text: '标准库', link: '/v0.2.0/zh_CN/stdlib' },
              { text: '编译器架构', link: '/v0.2.0/zh_CN/compiler' },
              { text: '更新日志', link: '/v0.2.0/zh_CN/release-notes' },
            ]
          },
          {
            text: 'v0.2.0 — Vix Language Documentation',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/v0.2.0/en/what-is-vix' },
              { text: 'Getting Started', link: '/v0.2.0/en/getting-started' },
              { text: 'Syntax Reference', link: '/v0.2.0/en/syntax' },
              { text: 'Type System', link: '/v0.2.0/en/types' },
              { text: 'Functions', link: '/v0.2.0/en/functions' },
              { text: 'Control Flow', link: '/v0.2.0/en/control-flow' },
              { text: 'Structs', link: '/v0.2.0/en/structs' },
              { text: 'Pointers', link: '/v0.2.0/en/pointers' },
              { text: 'Modules', link: '/v0.2.0/en/modules' },
              { text: 'Standard Library', link: '/v0.2.0/en/stdlib' },
              { text: 'Compiler Internals', link: '/v0.2.0/en/compiler' },
              { text: 'Release Notes', link: '/v0.2.0/en/release-notes' },
            ]
          },
          {
            text: 'v0.1.0 — Vix 语言文档',
            collapsed: true,
            items: [
              { text: '什么是 Vix 语言', link: '/v0.1.0/zh_CN/what-is-vix' },
              { text: '快速入门', link: '/v0.1.0/zh_CN/getting-started' },
              { text: '语法参考', link: '/v0.1.0/zh_CN/syntax' },
              { text: '类型系统', link: '/v0.1.0/zh_CN/types' },
              { text: '函数', link: '/v0.1.0/zh_CN/functions' },
              { text: '控制流', link: '/v0.1.0/zh_CN/control-flow' },
              { text: '结构体', link: '/v0.1.0/zh_CN/structs' },
              { text: '指针', link: '/v0.1.0/zh_CN/pointers' },
              { text: '模块系统', link: '/v0.1.0/zh_CN/modules' },
              { text: '标准库', link: '/v0.1.0/zh_CN/stdlib' },
            ]
          },
          {
            text: 'v0.1.0 — Vix Language Documentation',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/v0.1.0/en/what-is-vix' },
              { text: 'Getting Started', link: '/v0.1.0/en/getting-started' },
              { text: 'Syntax Reference', link: '/v0.1.0/en/syntax' },
              { text: 'Type System', link: '/v0.1.0/en/types' },
              { text: 'Functions', link: '/v0.1.0/en/functions' },
              { text: 'Control Flow', link: '/v0.1.0/en/control-flow' },
              { text: 'Structs', link: '/v0.1.0/en/structs' },
              { text: 'Pointers', link: '/v0.1.0/en/pointers' },
              { text: 'Modules', link: '/v0.1.0/en/modules' },
              { text: 'Standard Library', link: '/v0.1.0/en/stdlib' },
            ]
          },
         {
           text: 'xpm 包管理器',
           collapsed: true,
           items: [
              { text: 'xpm 主页', link: '/xpm/zh_CN/' },
              { text: '什么是 xpm？', link: '/xpm/zh_CN/what-is-xpm' },
              { text: '快速入门', link: '/xpm/zh_CN/getting-started' },
              { text: '命令参考', link: '/xpm/zh_CN/commands' },
           ]
         },
         {
           text: 'xpm Package Manager',
           collapsed: true,
           items: [
             { text: 'xpm Main Page', link: '/xpm/en/' },
             { text: 'What is xpm?', link: '/xpm/en/what-is-xpm' },
             { text: 'Getting Started', link: '/xpm/en/getting-started' },
             { text: 'Commands Reference', link: '/xpm/en/commands' },
           ]
         },
       ],

        '/v0.2.0/zh_CN/': [
          {
            text: 'Vix 语言文档 v0.2.0',
            collapsed: true,
            items: [
              { text: '什么是 Vix 语言', link: '/v0.2.0/zh_CN/what-is-vix' },
              { text: '快速入门', link: '/v0.2.0/zh_CN/getting-started' },
              { text: '语法参考', link: '/v0.2.0/zh_CN/syntax' },
              { text: '类型系统', link: '/v0.2.0/zh_CN/types' },
              { text: '函数', link: '/v0.2.0/zh_CN/functions' },
              { text: '控制流', link: '/v0.2.0/zh_CN/control-flow' },
              { text: '结构体', link: '/v0.2.0/zh_CN/structs' },
              { text: '指针', link: '/v0.2.0/zh_CN/pointers' },
              { text: '模块系统', link: '/v0.2.0/zh_CN/modules' },
              { text: '标准库', link: '/v0.2.0/zh_CN/stdlib' },
            ]
          },
          {
            text: '参考',
            collapsed: false,
            items: [
              { text: '编译器架构', link: '/v0.2.0/zh_CN/compiler' },
              { text: '更新日志', link: '/v0.2.0/zh_CN/release-notes' },
              { text: '鸣谢', link: '/v0.2.0/zh_CN/acknowledgements' },
            ]
          },
        ],
        '/v0.2.0/en/': [
          {
            text: 'Vix Language Documentation v0.2.0',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/v0.2.0/en/what-is-vix' },
              { text: 'Getting Started', link: '/v0.2.0/en/getting-started' },
              { text: 'Syntax Reference', link: '/v0.2.0/en/syntax' },
              { text: 'Type System', link: '/v0.2.0/en/types' },
              { text: 'Functions', link: '/v0.2.0/en/functions' },
              { text: 'Control Flow', link: '/v0.2.0/en/control-flow' },
              { text: 'Structs', link: '/v0.2.0/en/structs' },
              { text: 'Pointers', link: '/v0.2.0/en/pointers' },
              { text: 'Modules', link: '/v0.2.0/en/modules' },
              { text: 'Standard Library', link: '/v0.2.0/en/stdlib' },
            ]
          },
          {
            text: 'Reference',
            collapsed: false,
            items: [
              { text: 'Compiler Internals', link: '/v0.2.0/en/compiler' },
              { text: 'Release Notes', link: '/v0.2.0/en/release-notes' },
              { text: 'Acknowledgements', link: '/v0.2.0/en/acknowledgements' },
            ]
          },
        ],
        '/v0.1.0/zh_CN/': [
          {
            text: 'Vix 语言文档 v0.1.0',
            collapsed: true,
            items: [
              { text: '什么是 Vix 语言', link: '/v0.1.0/zh_CN/what-is-vix' },
              { text: '快速入门', link: '/v0.1.0/zh_CN/getting-started' },
              { text: '语法参考', link: '/v0.1.0/zh_CN/syntax' },
              { text: '类型系统', link: '/v0.1.0/zh_CN/types' },
              { text: '函数', link: '/v0.1.0/zh_CN/functions' },
              { text: '控制流', link: '/v0.1.0/zh_CN/control-flow' },
              { text: '结构体', link: '/v0.1.0/zh_CN/structs' },
              { text: '指针', link: '/v0.1.0/zh_CN/pointers' },
              { text: '模块系统', link: '/v0.1.0/zh_CN/modules' },
              { text: '标准库', link: '/v0.1.0/zh_CN/stdlib' },
            ]
          },
          {
            text: '其他',
            collapsed: false,
            items: [
              { text: '鸣谢', link: '/v0.1.0/zh_CN/acknowledgements' },
            ]
          },
        ],
        '/v0.1.0/en/': [
          {
            text: 'Vix Language Documentation v0.1.0',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/v0.1.0/en/what-is-vix' },
              { text: 'Getting Started', link: '/v0.1.0/en/getting-started' },
              { text: 'Syntax Reference', link: '/v0.1.0/en/syntax' },
              { text: 'Type System', link: '/v0.1.0/en/types' },
              { text: 'Functions', link: '/v0.1.0/en/functions' },
              { text: 'Control Flow', link: '/v0.1.0/en/control-flow' },
              { text: 'Structs', link: '/v0.1.0/en/structs' },
              { text: 'Pointers', link: '/v0.1.0/en/pointers' },
              { text: 'Modules', link: '/v0.1.0/en/modules' },
              { text: 'Standard Library', link: '/v0.1.0/en/stdlib' },
            ]
          },
          {
            text: 'Others',
            collapsed: false,
            items: [
              { text: 'Acknowledgements', link: '/v0.1.0/en/acknowledgements' },
            ]
          },
        ],
       '/xpm/': [
         {
           text: 'xpm 包管理器',
           collapsed: true,
           items: [
             { text: 'xpm 主页', link: '/xpm/zh-CN/' },
             { text: '什么是 xpm？', link: '/xpm/zh_CN/what-is-xpm' },
             { text: '快速入门', link: '/xpm/zh_CN/getting-started' },
             { text: '命令参考', link: '/xpm/zh_CN/commands' },
           ]
         },
         {
           text: 'xpm Package Manager',
           collapsed: true,
           items: [
             { text: 'xpm Main Page', link: '/xpm/en/' },
             { text: 'What is xpm?', link: '/xpm/en/what-is-xpm' },
             { text: 'Getting Started', link: '/xpm/en/getting-started' },
             { text: 'Commands Reference', link: '/xpm/en/commands' },
           ]
         },
       ],
       '/xpm/en/': [
         {
           text: 'xpm Package Manager',
           collapsed: true,
           items: [
             { text: 'What is xpm?', link: '/xpm/en/what-is-xpm' },
             { text: 'Getting Started', link: '/xpm/en/getting-started' },
             { text: 'Commands Reference', link: '/xpm/en/commands' },
           ]
         },
       ],
       '/xpm/zh_CN/': [
         {
           text: 'xpm 包管理器',
           collapsed: true,
           items: [
             { text: '什么是 xpm？', link: '/xpm/zh_CN/what-is-xpm' },
             { text: '快速入门', link: '/xpm/zh_CN/getting-started' },
             { text: '命令参考', link: '/xpm/zh_CN/commands' },
           ]
         },
       ],
     },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vixlang' }
    ]
  }
  ,
  head: [
    ['script', {}, `
      var func = () => {setTimeout(() => {
        try{
          var links = document.querySelectorAll('a');
          for(var i=0;i<links.length;i++){
            var el = links[i];
            if(el.href && el.href.includes('/back')){
              el.href = location.origin + el.href.substring(window.location.origin.length + ('/' + window.location.pathname.split('/').slice(1)[0]).length + 5);
              el.target = '_self';
            }
          }
        }catch(e){};
        setTimeout(func, 100);
      }, 1000);}
      
      document.addEventListener('DOMContentLoaded', func)
      setTimeout(func, 1000)
      `],
  ],
})