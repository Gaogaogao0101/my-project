<template>
<div id="ber">
    <div class="top"  style="z-index:4;position:fixed;top:0;border-bottom:1px solid #eee;width:100%;">
        <div class="top-left" @click="reutrns" ><img src="../../lib/img/ios/fanhui@3x.png" alt=""></div>
        <div class="top-right">我的收藏</div>
    </div>
    <div class="con" v-for="(list,index) in ls" :key="index">
        <div class="cons">
            <div class="c-left"><img :src="'http://app.hzhlsy.net/'+list.picImg" alt=""></div>
            <div class="c-cen">
                <span  @click="getDetail(list.essayId)">{{list.essayName}}</span> 
                <div class="head">{{list.units}}<samp style="margin-left:.1rem;">{{list.createTime.substring(0,10)}}</samp></div> 
            </div>
            <div class="c-right"><img src="../../lib/img/ios/shoucanga@3x.png" @click="deleassay(list.collectId)" alt=""></div>
        </div>
    </div> 
</div>    
</template>
<script>
import {Rem} from "../../lib/js/rem.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf'
import {Toast} from 'mint-ui'
export default {
   inject:['reload'],
   data(){
       return{
         list:[],
         ls:[],
         token:localStorage.getItem('token'),
       }
    }, 
    created(){
        this.geteassay(); 
    },
    methods:{
        reutrns:function(){
            javascript:history.back(-1);
        },
        // 获取收藏列表
        geteassay(){ 
            // var token=this.token;
            var url="freeter-api/mycollectessay/getCollectEssay?token="+this.token;
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.list=res.body.myCollectEssay; 
                     this.ls=this.list.reverse();
                }
            })
            //  this.reload();
        },
        // 删除收藏
        deleassay(collectId){
            var token=this.token;
            var collectId=parseInt(collectId);
            var url=`freeter-api/mycollectessay/deleteCollectEssay?token=${token}&collectId=${collectId}`;
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    Toast("取消收藏成功");
                    this.reload();
                }
            }) 
             
        },
       // 新闻详情
        getDetail(essayId){ 
          this.$router.push({name:"hindlist",params:{essayId}});
        },  
    },

}
</script>
<style scoped>
#ber{
    padding-top: .8rem;
} 
#ber .top{
    height: 1rem; 
    line-height: 1rem;
    background: #fff;
    padding-left: .24rem;
}
#ber .top div{
    float: left;
}
#ber .top .top-left{
    width: .2rem;
}
#ber .top .top-left img{
    width: 100%;
    width: .2rem;
    height: .35rem;
   margin-top: .3rem;
   position: fixed;
   left: .24rem;
}
#ber .top .top-right{
    width: 96%; 
    text-align: center;
    font-size: .42rem;
    font-weight: bold;
    color: #313131;
    font-family:"Source Han Sans CN";
}
#ber .con{
    height: 2.9rem;
    padding-top: .6rem; 
    border-bottom: 1px solid #F4F4F4;
    background: #fff;
    padding-left: .28rem;
    padding-right: .28rem; 
}
#ber .con .cons{
    height: 1.5rem;  
    position: relative;
}
#ber .con .cons .c-left{
    width: 1.5rem;
    height: 1.5rem; 
    float: left;
    margin-right: .2rem;
     
}
#ber .con .cons .c-left img{
    width: 100%;
    height: 100%;
}
#ber .con .cons .c-cen span{
    width:68%;
    font-size: .38rem;
    line-height: .45rem;
    height: .88rem;
    color: #313131; 
    font-family:"SourceHanSerifSC-Medium";
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical; 
}
#ber .con .cons .c-cen .head{
    font-size: .28rem;
    color: #939393;
    margin-top:.3rem;
    font-family:"SourceHanSerifSC-Light";    
} 
#ber .con .cons .c-right{
    width:.39rem;
    height: .36rem;
    position: absolute;
    top:.63rem;
    right: .3rem;
}
#ber .con .cons .c-right img{
    width: 100%;
    height: 100%;
}
</style>







