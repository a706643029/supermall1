import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

//只需要写到文件夹
import toast from "components/common/toast"

Vue.config.productionTip = false;

//将vue实例赋值给$bus：事件管理
//添加事件总线对象
Vue.prototype.$bus = new Vue();

//注册toast
Vue.use(toast);

//解决移动端300ms延迟
  FastClick.attach(document.body);
//懒加载的插件
Vue.use(VueLazyload,{
  //懒加载占位符：图片还没加载出来的时候先显示这个自定义的图片
  //使用require引入
  //observer监听
  // loading: require()
  // loading: require('./assets/img/common/placeholder.png')
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
