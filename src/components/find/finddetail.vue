<template>
    <div id="find">
         <div class="top" style="background:#fff; z-index:4;position:fixed;top:0;width:100%;"> 
            <div class="til-left" @click="reutrns"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></div>
            <div class="til-con"></div>
            <div class="til-right" @click="collects(essayId)"> <!--<label  for="foot-check" class="input-labels" @click="collects(essayId)"></label>-->
                 <!-- <img src="../../lib/img/ios/shoucanga@3x.png" alt=""> -->
                 <img style="position:absolute;right:.95rem;top:.18rem;width:.41rem;height:.4rem;" src="../../lib/img/ios/scscsc@3x.png" @click="bian(item,$event)">
            </div>
        </div>
        <div class="tle">{{ContentDel.essayName}}</div>
        <div class="tles">{{ContentDel.units}}</div>
        <div class="time">{{ContentDel.createTime}}</div>
        <div class="conten" v-html="ContentDel.remarks"> 
            {{ContentDel.remarks}}              
        </div>
    </div>
</template>
<script>
import {Rem} from "../../lib/js/rem.js"
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf'
import {Toast} from 'mint-ui' 
export default {
    inject:['reload'],
    data(){
        return{
            ContentDel:[],
            // 接收id对象 
            essayId:this.$route.params.essayId,    
            token:localStorage.getItem('token'),
            isActive:this.$route.params.a, 
        }
    }, 
    created(){
        this.getContentDel(); 
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
        reutrns:function(){
            javascript:history.back(-1);
        },
        getContentDel:function(){
            var url="freeter-api/myessay/getEssay?essayId="+parseInt(this.essayId);
            this.$http.post(url).then(result=>{ 
                if(result.body.code==0){
                    this.ContentDel=result.body.getEssay;
                    this.essid=result.body.getEssay.essayId;
                    // this.ContentDel='http://app.hzhlsy.net:8081/freeter-admin/'+result.body.getEssay.scr;  
                }else{
                    Toast("数据加载失败")
                }
            }) 
        },
        // 收藏
        collects(essayId) {      
            //根据downIcon判断此时的状态是true还是false  
            //对downIcon对状态进行取反                        
            // this.downicon = !this.downicon;  
            // var that=this; 
            var id=parseInt(this.essayId);
            var token=this.token;    
            if(token==undefined){
                Toast("请登录");
                this.reload(); 
            }else{ 
             var url=`freeter-api/mycollectessay/addCollectEssay?essayId=${id}&token=${token}`;
              this.$http.post(url).then(res=>{   
                      if(res.body.code==0){
                          Toast("收藏成功");
                      }
                })
                // this.clickcolor();
                }
        },
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
    }
}
</script>
<style scope> 
 
 @import '../../lib/css/finddetail.css';
 .til-right img[src = ""],img:not([src]){
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