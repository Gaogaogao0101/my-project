import Vue from 'vue'
import App from './App.vue'
import router from './router'
//1.1:加载模块 VueResource(发送ajax请求)
import VueResource from 'vue-resource'
//1.2:将VueResource 注册vue
Vue.use(VueResource);
// 注入mui返回键
// import Mui from "vue-awesome-mui"
// Vue.use(Mui)
// 注册无缝切换
import Silder from 'vue-concise-slider'
Vue.use(Silder) 
// console.log(Vue.prototype);
import wxs from 'weixin-jsapi';
// console.log(wxs);
import 'babel-polyfill'
// vue-directive-touch滑动插件
import touch from 'vue-directive-touch';
Vue.use(touch);
 

Vue.prototype.$wx=wxs;   
// console.log(Vue.prototype.$wx); 
//1.2.1:设置请求根路径(服务器地址) ajax
Vue.http.options.root = "http://app.hzhlsy.net:8080/";
//1.2.2 创建全局过滤器
Vue.filter("datetimeFilter",function(val){
  var date=new Date(val);
  var y=date.getFullYear();
  var m=date.getMonth() +1;
  m<10&&(m="0"+m);
  var d=date.getDate();
  d<10&&(d="0"+d);
  var h=date.getHours();
  h>12&&(h-=12);
  h<10&&(h="0"+h);
  var M=date.getMinutes()
  M<10&&(M="0"+M);
  return `${y}-${m}-${d} ${h}:${M}`;
});
// 电话号码只显示前三位过滤器
Vue.filter('toTel', function (value) {
  let start = value.slice(0, 3);
  return `${start}xxxxxxxx`
})
// 用户输入过滤器
Vue.prototype.filterInput=function(val) {
  // 这里过滤的是除了英文字母和数字的其他字符
      return val.replace(/[^A-z0-9]/, '')
}
// 完整引入所有组件 
import MintUI from "mint-ui"
Vue.use(MintUI);
// 引入地址插件
import VDistpicker from 'v-distpicker'
Vue.use(VDistpicker);
import axios from 'axios'
// Vue.use(axios);
Vue.prototype.axios=axios
import Resource from 'vue-resource'
Vue.use(Resource);
import VueConciseSlider from 'vue-concise-slider'
Vue.use(VueConciseSlider);  



 
// Vue.prototype.swiper = Swiper


//1.6:引入mui css
import "./lib/mui/css/mui.css" 
import "./lib/mui/css/icons-extra.css"

import Mui from 'vue-awesome-mui';
Vue.use(Mui);
//1.7:引入mint-ui 组件所需样式文件
//默认查找文件路径
//node_modules/mint-ui/lib/style.css
import "mint-ui/lib/style.css"
// 引入bottom页低样式
import "./lib/css/bottom.css"
import "./lib/css/swiper.min.css"
import "./lib/js/swipe.js"
// 引入jQuery
import "./lib/js/jquery-1.11.3"
// 引入字体
import "./lib/css/xiaoWeiFont.otf"
import "./lib/css/pf.ttf"
import "./lib/css/SourceHanSansCN-Regular.ttf"
import './lib/js/iftooken.js'
//2:是否是生产模式 false
// 引入axios 
Vue.config.productionTip = false
// 2.1将vuex添加到项目中
   // 1：导入vuex
    import Vuex from "vuex";
    // 2：将vuex注册vue
    Vue.use(Vuex);
     
// router-link :to跳转到另一个页面时显示页面的顶端
router.beforeEach((to, from, next) => {    
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
}) 
// 图片上传
Vue.prototype.postForm = (urls, datas) => {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      withCredentials: true // 表示跨域请求时是否需要使用凭证
    })
    instance.post(urls, datas).then(response => {
      if (parseInt(response.data.code) === 0) {
        resolve(response)
      } else if (parseInt(response.data.code) === 8001) {
        getToken()
      } else {
        reject(response)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
 


// 
 

 

// 
import store from './lib/js/cookie.js';
import Axios from 'axios';
Vue.use(Axios); 
 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
