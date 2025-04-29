import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'; //语言
import 'dayjs/locale/zh-cn'; //时区设置
import { ElCollapseTransition } from 'element-plus'; //过渡动画
import 'element-plus/theme-chalk/base.css'; //过渡动画

// element-plus/icons-vue
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: 'default', zIndex: 3000, locale: zhCn })
  .component(ElCollapseTransition.name, ElCollapseTransition)
  .mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  createApp(App).component(key, component);
}
