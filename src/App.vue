<template>
<div> 
  <div class="continer">
    <!-- keeplive缓存 -->
     <keep-alive>
        <router-view v-if="isRouterAlive && $route.meta.keepAlive" include="/desc"></router-view>
    </keep-alive>
     <router-view v-if="isRouterAlive && !$route.meta.keepAlive"></router-view> 
  </div>
</div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  provide(){
     return{
       reload:this.reload
     }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  created(){
    // this.startUp();
  },
  methods:{ 
      reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    },
     
  },
   beforeRouteLeave(to, from, next) {
     console.log(to.name);
      this.loading = true
      if (to.path === '/hindlist') {
        from.meta.keepAlive = true
      } else {
        from.meta.keepAlive = false
      // this.$destroy()
      } 
      next();
   },
 watch:{
      $route(to, from) { 
          // console.log(to.path );  
            function plusReady(){
                // 隐藏滚动条
                plus.webview.currentWebview().setStyle({scrollIndicator:'none'});
                // Android处理返回键
                plus.key.addEventListener('backbutton',function(){
                    if(location.hash!="#/home"){
                        localStorage.setItem('backFlag',"isHip")
                        // window.history.go(-1);
                        // console.log('1');
                    }else{
                        plus.runtime.quit(); 
                    } 
                },false);
            };
            if(window.plus){
                plusReady();
            }else{
                document.addEventListener('plusready',plusReady,false); 
            };
            if(to.meta.keepAlive&& to.meta.keepAliveChange){
              this.excludeRouterNmae.push(to.name)
              this.$nextTick(()=>{
                this.excludeRouterNmae.pop()
              })
            };
          
      },  
  } 
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ffffff;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
