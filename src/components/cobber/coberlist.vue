<template>
    <div id="cober">
        <div class="top" style="z-index:4;position:fixed;top:0;border-bottom:1px solid #eee;width:100%;">
        <div class="top-left" @click="reutrns" ><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></div>
        <div class="top-right">我的合伙人</div>
        </div>
        <div class="being">
            <ul>
                <li v-for="(item,index) in list" :key="index" @click="userinfo(item.city,item.groupId)"><small><span>{{item.city}}</span><span class="count">{{item.count}}人</span></small><samp><img src="../../lib/img/ios/fanhuiyou@2x.png" alt=""></samp></li> 
            </ul>
        </div>
    </div>
</template>
<script>
import {Rem} from "../../lib/js/rem.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf'  
export default {
    data(){
      return{
          token:localStorage.getItem('token'),
          list:[],
      }
    }, 
    created(){
        this.getpartner();
    },
    methods:{
        reutrns:function(){
            javascript:history.back(-1);
        },
        getpartner(){
             var url="freeter-api/user/myPartnerCity?token="+this.token;
             this.$http.post(url).then(res=>{
                 if(res.body.code==0){ 
                     this.list=res.body.myPartnerCity;
                                             
                 }
             })
        },
        userinfo(city,id){
            localStorage.setItem('city',city);
            localStorage.setItem('zuid',id); 
            this.$router.push({name:"borinfo"});
        },
    }   
}
</script>
<style scoped> 
 @import '../../lib/css/conberlist.css';
</style>

