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
  vite: {
    server: {
      allowedHosts: ['p.ceroxe.top']
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
       { text: 'Vix 语言', link: '/zh_CN/what-is-vix' },
       { text: 'Vix Lang', link: '/en/what-is-vix' },
     ],

     sidebar: [
       {
         text: '概览',
         collapsed: false,
         items: [
           { text: '概览', link: '/zh/overview' },
           { text: '公告列表', link: '/zh/list' },
         ]
       },
       {
         text: '公告',
         collapsed: true,
         items: [
           { text: '对 TTHSD Next ABI 变动的解释', link: '/zh/ABI-Changing-Explan' },
         ]
       },
       {
         text: 'Vix 语言文档 (中文)',
         collapsed: false,
         items: [
           { text: '什么是 Vix 语言', link: '/zh_CN/what-is-vix' },
           { text: '快速入门', link: '/zh_CN/getting-started' },
           { text: '语法参考', link: '/zh_CN/syntax' },
           { text: '类型系统', link: '/zh_CN/types' },
           { text: '函数', link: '/zh_CN/functions' },
           { text: '控制流', link: '/zh_CN/control-flow' },
           { text: '结构体', link: '/zh_CN/structs' },
           { text: '指针', link: '/zh_CN/pointers' },
           { text: '模块系统', link: '/zh_CN/modules' },
           { text: '标准库', link: '/zh_CN/stdlib' },
         ]
       },
       {
         text: 'Vix Language Docs (English)',
         collapsed: false,
         items: [
           { text: 'What is Vix Language', link: '/en/what-is-vix' },
           { text: 'Getting Started', link: '/en/getting-started' },
           { text: 'Syntax Reference', link: '/en/syntax' },
           { text: 'Type System', link: '/en/types' },
           { text: 'Functions', link: '/en/functions' },
           { text: 'Control Flow', link: '/en/control-flow' },
           { text: 'Structs', link: '/en/structs' },
           { text: 'Pointers', link: '/en/pointers' },
           { text: 'Modules', link: '/en/modules' },
           { text: 'Standard Library', link: '/en/stdlib' },
         ]
       },
     ],

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