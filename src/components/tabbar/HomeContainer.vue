<template>
    <div id="app" v-touch:right='plusReady'>
        <div class="logo">
            <span class="scan" ><img class="scans" @click="scann" src="../../lib/img/saoma.png" style="width:0.5rem;height:0.5rem;position: absolute;top: .35rem;left: .3rem;"></span>
           <span class="logo-left"><router-link to="/logodetail"><img src="../../lib/img/ios/index-logo-hlsyapp@3x.png" alt=""></router-link></span>
           <span class="logo-right" @click="iflogo"> <img src="../../lib/img/ios/lingdang@3x.png" alt=""> </span>
        </div>


        <!-- 图片轮播图部分     -->
         <mt-swipe :auto="4000">
             <mt-swipe-item  class="banner" v-for="(item,index) in list" :key="index">
                 <img :src="'http://app.hzhlsy.net/'+item.homeImgs" alt="">
             </mt-swipe-item>
         </mt-swipe>
         <!-- 搜索 -->
       <div class="hs" style=" ">
           <router-link to="/search">
           <div class="search" style="" >
               <input type="text" placeholder="输入你想要查找的商品">
               <img src="../../lib/img/ios/search.png" alt="">
            </div>
            </router-link>
        </div>
        <div class="index-list">
            <ul>
                <li v-for="(listimg,index) in classify" :key="index"><img :src="'http://app.hzhlsy.net/'+listimg.picImg"  @click="inx(index,listimg.categoryId)" alt="" > </li>
            </ul>
        </div>
         <div id="bottom">
            <ul>
                <router-link to="/home">
                <li class="li-a"><img src="../../lib/img/ios/shouyeb@3x.png" alt=""><div class="bot-n" style="color:#313131;">首页</div></li>
                </router-link>
                <router-link to="/desc">
                <li class="li-b"><img src="../../lib/img/ios/faxiana@3x.png" alt=""><div class="bot-n">活动</div></li>
                </router-link>
                <li class="li-c" @click="cartlogins"><img src="../../lib/img/ios/gouwuchea@3x.png" alt=""><div class="bot-n">购物车</div></li>
                <li class="li-d" @click="memberlogins"><img src="../../lib/img/ios/huiyuana@3x.png" alt=""><div class="bot-n">会员中心</div></li>
            </ul>
        </div>
        <div id="guider">

        </div>
    </div>
</template>
<script>
import {Indicator,Toast} from "mint-ui"
import {Rem} from "../../lib/js/rem.js"
import lvwei from './zzz.vue'
 // let scan = null
 export default {
        inject:['reload'],
        data(){
          return{
            list:[],
            token:localStorage.getItem('token'),
            classify:[],
         }
        },
        created() {
            this.bannerlist();
            this.Classlist();
        },
        methods:{
            // 退出
            plusReady(){
                // 隐藏滚动条
                plus.webview.currentWebview().setStyle({scrollIndicator:'none'});
                // Android处理返回键
                plus.key.addEventListener(function(){
                    if(location.hash!="#/home"){
                        localStorage.setItem('backFlag',"isHip")
                        // window.history.go(-1);
                        // console.log('1');
                    }else{
                        plus.runtime.quit();
                    }
                },false);
            },
             iftoken(){
                var url="freeter-api/user/userinfo?token="+this.token;
                this.$http.post(url).then(res=>{
                    if(res.body.code==500){
                        Toast(res.body.msg);
                        localStorage.removeItem('token');
                        this.$router.push('/land');
                    }
                })
            },
            // 轮播图
            bannerlist(){
                var url="freeter-api/myhome/getmyhome";
                this.$http.post(url).then(result=>{
                    if(result.body.code==0){
                        this.list=result.body.myHome;
                    }
                })
                localStorage.removeItem('isActive');
            },
            // 商品分类数据
            Classlist(){
                var url="freeter-api/category/goodClassify";
                this.$http.post(url).then(result=>{
                    if(result.body.code==0){
                      this.classify=result.body.listGoodClassify;

                    }else{
                        Toast("数据加载失败");
                    }
                })
            },

             // 消息查看判断是否登录
            iflogo(){
                var token=this.token;
                if(token==undefined){
                    Toast("请先登录");
                    this.$router.push('/land');
                 }else{
                  this.$router.push('/newslist');
                 }
                 this.iftoken();
            },
            // 判断是否登录跳转会员中心
            memberlogins(){
                var userid=this.token;
                if(userid==undefined){
                     this.$router.push({path:'/land'});
                }else{
                    this.$router.push({path:'/member'})
                }
            },
            // 购物车登录判断的
            cartlogins(){
                var userid=this.token;
                if(userid==undefined){
                     this.$router.push({path:'/land'});
                }else{
                    this.$router.push({path:'/cartdemo'})
                }
            } ,
            // 下标
            inx(a,categoryId){
                var listid=categoryId;
                localStorage.setItem('listids',listid);
                localStorage.setItem('syindex',a);
               this.$router.push({name:'homesa',params:{a,listid}});
            } ,
            scann(){
              this.$router.push({path:'/scan'})
            }
                 // 扫码
                 // 先创建扫描控件才能
      // startRecognize () {
      //   let that = this
      //   if (!window.plus) return
      //   scan = new plus.barcode.Barcode('bcid')
      //   scan.onmarked = onmarked

      //   function onmarked (type, result, file) {
      //     switch (type) {
      //       case plus.barcode.QR:
      //         type = 'QR'
      //         break
      //       case plus.barcode.EAN13:
      //         type = 'EAN13'
      //         break
      //       case plus.barcode.EAN8:
      //         type = 'EAN8'
      //         break
      //       default:
      //         type = '其它' + type
      //         break
      //     }
      //     result = result.replace(/\n/g, '')
      //     that.codeUrl = result
      //     alert(result)
      //     that.closeScan()
      //   }
      //    // 开始扫描
      //   function startScan () {
      //   if (!window.plus) return
      //   scan.start()
      // }
      // },
        },
    }

</script>
<style scope>
ul,li{
    padding: 0;
    margin: 0;
}
.index-list ul li{
    height: 2.3rem;
}
.index-list ul li img{
    width: 100%;
    height: 100%;
}
a{
    text-decoration:none;
}
body{
    background: none !important;
}
#app{
    width: 100%;
    height: 100%;
    background: #FAFAFA;
}
#app .logo{
    height: 1.3rem;
}
#app .logo .logo-left{
    position: relative;
}
#app .logo .logo-left img{
    margin-top:.2rem;
    height: .9rem;
    width: 1.3rem;
}
#app .logo .logo-right{
    float: right;
}
#app .logo .logo-right img{
    width: .5rem;
    position: absolute;
    top: .35rem;
    right: .3rem;
}
#app .mint-swipe{
    height: 3.58rem !important;
}
#app .mint-swipe .mint-swipe-items-wrap .banner{
    width: 7.5rem;
}
#app .mint-swipe .mint-swipe-items-wrap .banner img{
    height: 100%;
}
.mint-swipe-indicator{
    width: .18rem !important;
    height: .18rem !important;
    opacity:1 !important;
    background:none !important;
    border: 1px solid #ffffff;
}
.is-active{
    border: none !important;
    background: #C4171D !important;
}
.mint-swipe-indicators{
    bottom: .5rem !important;
}
#app .hs{
    height:.33rem;
    background:#FAFAFA;
    position: relative;
}
#app .hs .search{
    width:4.65rem;
    height:.7rem;
    border:1px solid #E3E3E3;
    position:absolute;
    top:-.5rem;
    left:20%;
    border-top-left-radius:.1rem;
    border-top-right-radius: .1rem;
    border-bottom-left-radius: .1rem;
    border-bottom-right-radius: .1rem;
}
#app .hs .search input{
    width: 100%;
    height: 100%;
    border-top-left-radius:.1rem;
    border-top-right-radius: .1rem;
    border-bottom-left-radius: .1rem;
    border-bottom-right-radius: .1rem;
    border: none;
    font-size: .24rem;
    font-family: "SourceHanSerifSC-Light";
    position: relative;
}
#app .hs .search img{
    width: .31rem;
    height: .31rem;
    position: absolute;
    top: .19rem;
    right: .28rem;
}
#app .mint-swipe{
    height: 200px;
}
.banner>img{
    width: 100%;
    height: 200px;
}
#app .mui-table-view{
    margin-top: 50px;
}

#app .mui-table-view.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:0;
}
#app .mui-table-view.mui-grid-view.mui-grid-9 img{
    width: 60px;
    height:60px;
}
#app .banner{
    width: 100%;
    margin-top: 0;
    padding-top: 0;
}
#app .banner img{
    width: 100%;
}
.list .goods-item .left img{
   width: 100%;
}
.banner img{
    width: 100%;
}
.index-list{
    margin-bottom: 1.3rem;
}
</style>
