// https://vitepress.dev/guide/custom-theme
import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { translate2 } from './tools.ts'
import vixlogo from './vixlogo.png';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  setup() {
    onMounted(() => {
      window.vixlogo = vixlogo;
      function tranText2CN(){
        try {
          const spans1 = document.querySelectorAll('span.text');
          for (const span1 of spans1) {
            // span1.textContent = await translate2(span1.textContent, 'zh');
            if (span1.textContent === 'Search') {
              span1.textContent = '搜索';
            }
          }
        } catch(e) {
          console.error(e);
        }
        setTimeout( () => {
          tranText2CN();
        }, 1000)
      };

      tranText2CN();
    });
  },
  enhanceApp({ app, router, siteData }) {
    // Theme switching is now handled by VitePress default theme
  }
} satisfies Theme
