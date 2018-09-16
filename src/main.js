// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//懒加载
import VueLazyLoad from 'vue-lazyload'
//无限滚动
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll);
// var infiniteScroll =  require('vue-infinite-scroll');
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//懒加载
Vue.use(VueLazyLoad,{
  loading:"./static/loading-svg/loading-bars.svg"
});




