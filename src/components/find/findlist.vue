<template>
<div id="findlist">
     <div class="navs" style="z-index:4;position:fixed;top:0;border-bottom:1px solid #eee;">
        <router-link to="/desc" class="nav-left a-nav" href="javascript:void(0)">
            <img src="../../lib/img/ios/huihq@3x.png" alt=""> 
            活动
        </router-link>
        <router-link to="/findlist" class="nav-right a-nav" href="javascript:void(0)">
            <img src="../../lib/img/ios/shu2@3x.png" alt=""> 学术
            <div class="hr"></div>   
        </router-link> 
    </div>
    <div class="banner" style=""><img :src="'http://app.hzhlsy.net/'+listas.picImg" alt=""> </div>
    <div class="list">
        <div class="til">{{listas.essayName}}</div>
        <div class="logo">
            <div class="logo-left">
                {{listas.units}}<span>{{listas.createTime.substring(0,10)}}</span>
            </div> 
        </div>
        <ul class="lists">
            <li style="height:2.45rem;border-top:1px solid #F0F0F0;width:100%;" v-for="(item,index) in ls" :key="index" > 
                <div class="lt" style="width:90%;"  @click="getDetail(item.essayId)">
                <div class="li-left" ><img :src="'http://app.hzhlsy.net/'+item.picImg" alt=""></div>
                <div class="li-right" >
                    <div style="" class="li-right-title">{{item.essayName}}</div>
                    <div class="logos">
                       {{item.units}} <span>{{item.createTime.substring(0,10)}}</span>
                    </div>
                </div>
                 </div>
                <div class="right-img" @click="collect(item.essayId)"> 
                        <!-- <label  for="foot-check" class="input-labels"></label> -->
                        <!-- <img src="../../lib/img/ios/shoucanga@3x.png" alt=""> -->
                        <img style="position:absolute;left:-.01rem;top:-.01rem;width:.42rem;height:.42rem;" src="../../lib/img/ios/scscsc@3x.png" @click="bian(item,$event)" >
                </div> 
                 
            </li> 
        </ul>
    </div>
     <div id="bottom">
        <ul>
            <router-link to="/home">
            <li class="li-a"><img src="../../lib/img/ios/shouyea@3x.png" alt=""><div class="bot-n">首页</div></li>
            </router-link>
            <router-link to="/desc">
            <li class="li-b"><img src="../../lib/img/ios/faxianb@3x.png" alt=""><div class="bot-n" style="color:#313131;">发现</div></li>
            </router-link>
            <router-link to="/cartdemo">
            <li class="li-c"><img src="../../lib/img/ios/gouwuchea@3x.png" alt=""><div class="bot-n">购物车</div></li>
            </router-link>
            <router-link to="/member">
            <li class="li-d"><img src="../../lib/img/ios/huiyuana@3x.png" alt=""><div class="bot-n">会员中心</div></li>
            </router-link>
        </ul>
    </div> 
</div>    
</template>
<script>
import {Rem} from "../../lib/js/rem.js"
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf' 
import {Toast} from 'mint-ui'
 
export default {
    data(){
        return{
            lists:[],
            listas:[],
            ls:[],
            downicon: true,
            token:localStorage.getItem('token'),
            selected_all:false, 
        }
    }, 
    created(){
        this.GetList();
    },
    methods:{
        //  切换图片
         bian(db,e){ 
            var img=$(e.srcElement).attr("src");
            console.log(img);
             if(img!="../../lib/img/ios/scscsc@3x.png"){   //如果还是没有点击的效果。点击以后先评论数加1再改变图片
                    // db.zancount++; //db.xxxx就是这个点击的  
               $(e.srcElement).attr("src",require('../../lib/img/ios/shoucanga@3x.png'));   
            }    
        },
        // 获取数据
        GetList:function(){
            var url="freeter-api/myessay/getFindXueshuEssay";
            this.$http.post(url).then(result=>{ 
                if(result.body.code==0){
                    this.lists=result.body.myEssayList;
                    this.listas=result.body.myEssayList.pop(0);
                     this.ls=this.lists.reverse(); 
                }
            })
        },
        // 新闻详情
        getDetail(essayId){ 
          this.$router.push({name:"hindlist",params:{essayId}});
        },
        //收藏
        collect(essayId) {  
            if(this.token==undefined){
                Toast("请先登录");
                this.$router.push({path:'/land'});
            }else{   
            var that=this;   
            var token=this.token;    
            var essayId=parseInt(essayId);
             var url=`freeter-api/mycollectessay/addCollectEssay?essayId=${essayId}&token=${token}`;
              that.$http.post(url).then(res=>{  
                      if(res.body.code==0){
                          Toast("收藏成功");
                      }
                })
            } 
        },
        
    },
}
</script>
<style scoped>
 
 @import '../../lib/css/findlist.css';
 .right-img img[src = ""],img:not([src]){
    opacity: 0;
    border:none;
    visibility: hidden;
    display:inline-block;
    margin: -5px;
    width: .39rem;
    height: .93rem;
}
img[src=""],img:not([src]){
    opacity: 0;
    border:none;
    visibility: hidden;
    max-width: none;
} 
</style>
