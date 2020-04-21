<template>
    <div id="desc"  > 
    <!--   <div class="navs" style="z-index:1004;position:fixed;top:0;background:#fff;"> 
                <router-link to="/desc" class="nav-left a-nav" href="javascript:void(0)">
                    <img src="../../lib/img/ios/huodong@3x.png" alt=""> 
                    活动
                    <div class="hr"></div>
                </router-link>
                <router-link to="/findlist" class="nav-right a-nav" href="javascript:void(0)">
                    <img src="../../lib/img/ios/book@3x.png" alt=""> 学术   
                </router-link> 
            </div> -->
             <div class="content" >
                 <firsts-box ></firsts-box>
             </div>
        <div id="bottom">
            <ul>
                <router-link to="/home">
                <li class="li-a"><img src="../../lib/img/ios/shouyea@3x.png" alt=""><div class="bot-n">首页</div></li>
                </router-link>
                <router-link to="/desc">
                <li class="li-b"><img src="../../lib/img/ios/faxianb@3x.png" alt=""><div class="bot-n" style="color:#313131;">活动</div></li>
                </router-link> 
                <li class="li-c" @click="cartlogins"><img src="../../lib/img/ios/gouwuchea@3x.png" alt=""><div class="bot-n">购物车</div></li>  
                <li class="li-d" @click="logins"><img src="../../lib/img/ios/huiyuana@3x.png" alt=""><div class="bot-n">会员中心</div></li>
            </ul>
        </div>
    </div>
</template>
<script> 
import firsts from "../find/first.vue"
import {Toast} from "mint-ui"
export default { 
    data(){
        return{   
            currentView: 'child1', // 默认选中第一项 
            titleClass:[],
            userid:localStorage.getItem('userid'),
        } 
    }, 
     components:{ //生命子组件 
            "firsts-box":firsts
    }, 
    created(){
        // this.getTitle();
    },
    methods: {
        tabChange(tabItem) {
         this.currentView = tabItem;
        },
        getTitle:function(){
            var url=`freeter-api/myessay/getFindClassify?findId=`+parseInt(0);
            this.$http.post(url).then(result=>{ 
                if(result.body.code==0){
                    this.titleClass=result.body.myFindList; 
                }else{
                    Toast("数据获取失败");
                }
            })
        },
         // 判断是否登录跳转会员中心
        logins(){
            var userid=this.userid;
            if(userid==undefined){
                    this.$router.push({path:'/land'});
            }else{
                this.$router.push({path:'/member'})
            }
        },
        // 购物车登录判断的
        cartlogins(){
            var userid=this.userid;
            if(userid==undefined){
                    this.$router.push({path:'/land'});
            }else{
                this.$router.push({path:'/cartdemo'})
            }
        } 
     }, 
    beforeRouteLeave (to, from, next) {
        // console.log(to.path+'123456');
        this.loading = true
        if (to.path === '/hindlist') {
            from.meta.keepAlive = true
        } else {
            from.meta.keepAlive = false
        // this.$destroy()
        } 
        next();
    },
    watch: { 
        $route(to, from) { 
        }
    },
  }
</script>
<style scoped>
#desc{
    width: 100%;
    height: 100%;
    background: #fff; 
}
/* .navs{
    width: 100%;
    height: 1rem; 
    background: #fff;
}
.navs .a-nav{
    display: block;
    float: left;
    text-align: center;
}
.navs .a-nav .hr{
    margin: auto;
    width: 1.05rem;
    border-bottom: .07rem solid #C5161D;
}
.navs .nav-left{
    width: 50%;
    height: 1rem;
    font-size: .28rem;
    line-height: 1rem;
    color: #313131;  
    background: #fff;
    font-family: "SourceHanSerifSC-Light"; 
}
.navs .nav-left img{
    width: .38rem;
    height: .36rem;
    margin-right: .1rem;
}
.nav-right{
    width: 50%;
    height: 1rem;
    font-size: .32rem;
    line-height: 1rem;
    color: #939393; 
    font-family: "SourceHanSerifSC-Light";
}
.nav-right img{
    width: .36rem;
    height: .38rem;
} */
/* 活动内容 */
.content{
    /* border-top: 1px solid #E3E3E3; */
}
a:link{text-decoration:none; }  /* 指正常的未被访问过的链接*/ 
a:visited{text-decoration:none; }/*指已经访问过的链接*/ 
a:hover{text-decoration:none;}/*指鼠标在链接*/ 
a:active{text-decoration:none;}/* 指正在点的链接*/ 
/*头部点击事件class*/ 
.connect{
    position:relative;
}
.connect>ul{ 
    background:#fff;
    position:absolute;
    top:0.4rem;
    left:0;
    padding: 0; 
}
.connect .active{
    z-index:1;  
}
.active a{ 
    font-size: 0.36rem; 
} 
/* 导航title样式 */
#main .lj{
    padding: 0;
}
.school_title a{
    font-size:0.32rem;
    color: #939393;
    font-family:"SourceHanSerifSC-Light";
    float: right; 
} 
.title1 ul .active a{
    color: #FF5584;
    font-size: 0.36rem;
    font-weight: bold;
    /* float:right; */
}
.title_class a{
    font-size:0.32rem;
    color: #939393;
    font-family:"SourceHanSerifSC-Light";  
}
.title1 ul{
    height: 0.6rem; 
}
.title1{
    border-bottom: 1px solid #E0E0E0;
}
.news-top {
    padding: 0;
}
.news-top span{
    padding: 0;
}
.news-top span p{
    padding: 0; 
    margin-bottom: 0;
}
.news-top span .name{
    font-size: 0.32rem;
    color: #313131;
    margin-top: 0.1rem;
}
.news-top span .con{
    font-size: 0.28rem;
    color: #545454;
    width:4rem;
    word-break:break-all;
}
.news-top .news-top-main{
    width: 0.8rem;
    height: 0.8rem; 
    padding: 0;
    border-radius: 50%;
    margin-right: 0.15rem;
}
.news-top .news-top-main img{
    width: 100%;
    border-radius: 50%;
}
.news-top .appraise{ 
    margin-top: 0.08rem;
}
.news-top .appraise span{
    width:0.3rem;
    height: 0.3rem; 
    float: left;
        
}
.news-top .appraise span img{
    width: 100%;
    float: left;
}
.news-con{
    margin-top: 0.3rem;
}
.news-con .news-con-img .news-con-imgs{
    background: #313131;
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
}
.news-con .news-con-img .news-con-imgs img{
    width: 100%;
}
.news-con .time{
    color: #939393;
    font-size: 0.24rem;
    margin-top: 0.3rem;
}
.cards{
    margin-bottom: 1.5rem !important;
}
</style>
