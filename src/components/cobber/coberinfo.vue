<template>
<div id="berinfo">
    <div class="top">
        <div class="top-left" @click="reutrns"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></div>
        <div class="top-right">{{city}}</div>
    </div> 
        <div class="leaguer" v-for="(item,index) in list" :key="index">
            <div class="l-top" v-if="item.parentId==0"></div>
            <div class="l-til" v-if="item.parentId==0">
                <div class="til-left"><div class="kuai" style="width:.12rem;height:.22rem;background:#16C54C;float:left;margin-top:.25rem;margin-right:.05rem;"></div>推荐人信息</div>
                <!-- <div class="til-right"><div class="kuai" style="width:.12rem;height:.22rem;background:#16C54C;float:left;margin-top:.25rem;margin-right:.05rem;"></div>推荐人</div> -->
            </div>
            <div class="l-con" v-if="item.parentId==0">
                <div class="con-left">
                    <div class="con-lefts">
                        <span><img v-bind:src="'http://app.hzhlsy.net/'+parid.userImg" :onerror="logo"/></span>
                        <div class="name">{{parid.userName}}</div>
                    </div>
                    <div class="con-rights">
                        <div class="tle"><img src="../../lib/img/ios/dh@3x.png" alt="">{{parid.userPhone}}</div>
                        <div class="wxwx" style="margin-top:.3rem;"><img src="../../lib/img/ios/wx@3x.png" alt="">{{parid.userWX}}</div>
                    </div>
                </div> 
                <!-- <div class="l-bottoms" @click="userId(parid.userId)" v-if="item.parentId==0">
                    <img src="../../lib/img/ios/jifen@3x.png" alt="">
                    <div >转积分</div>
                </div> -->
            </div> 
            <div class="l-top" v-if="item.parentId!=0"></div>
            <div class="l-til" v-if="item.parentId!=0">
                <div class="til-left"><div class="kuai" style="width:.12rem;height:.22rem;background:#16C54C;float:left;margin-top:.25rem;margin-right:.05rem;"></div> 成员信息</div>
                <div class="til-right"><div class="kuai" style="width:.12rem;height:.22rem;background:#16C54C;float:left;margin-top:.25rem;margin-right:.05rem;"></div>推荐人</div>
            </div>
            <div class="l-con" v-if="item.parentId!=0">
                <div class="con-left" >
                    <div class="con-lefts" >
                        <span><img :src="'http://app.hzhlsy.net/'+item.userImg" :onerror="logo"/></span><div class="name">{{item.userName}}</div>
                    </div>
                    <div class="con-rights"><div class="tle"><img src="../../lib/img/ios/dh@3x.png" alt="">{{item.userPhone}}</div>
                    <div class="wxtel"><img src="../../lib/img/ios/wx@3x.png" alt=" ">{{item.userWX}}</div></div>
                </div>
                <div class="con-right" v-if="item.parentId!=0">
                <span> <img :src="'http://app.hzhlsy.net/'+item.parentImg"  :onerror="logo"/></span>
                    <div class="tuijianren">{{item.parentName}}</div>
                </div>
            </div>
            <!-- <div class="l-bottom" @click="userId(item.userId)" v-if="item.parentId!=0">
                <img src="../../lib/img/ios/jifen@3x.png" alt=" ">
                <div>转积分</div>
            </div> -->
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
          city:localStorage.getItem('city'),
          id:localStorage.getItem('zuid'),
          list:[],
          parid:[], 
          logo: 'this.src="' + require('../../lib/img/ios/user20190727140338.png') + '"'  
      }
    }, 
    created(){
        this.getlist();
    },
    methods:{
        // 转积分
        userId(usersid){ 
             this.$router.push({name:'divide',params:{usersid}});
         },
        reutrns:function(){
            javascript:history.back(-1);
            localStorage.removeItem('city');
            localStorage.removeItem('zuid');
        },
        getlist(){
            var city=this.city;
            var id=parseInt(this.id);
            var url=`freeter-api/user/myCityInfo?city=${city}&groupId=${id}`;
            this.$http.post(url).then(res=>{  
                if(res.body.code==0){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    this.list=res.body.list;  
                    this.list.forEach(con=>{ 
                        if(con.parentId==0){
                           this.parid=con;  
                           return Object(this.parid); 
                        } 
                     })
                }
            })
        }
    }   
}
</script>
<style scoped>
@import '../../lib/css/corberinfo.css';     
.tuijianren{
    overflow:hidden;  
    text-overflow:ellipsis; 
    display:-webkit-box;  
    -webkit-box-orient:vertical; 
    -webkit-line-clamp:1;                                                                
    margin:auto;
    font-size: .3rem;
    color: #313131;
    margin-top: .2rem;
    font-family:' PingFangSC-Regular, sans-serif';
} 
.leaguer{
    height:2.78rem; 
    background: #fff;
    box-shadow: 0 .1rem .2rem #E8E8E8;
    margin-bottom: .2rem;
} 
.leaguer .l-til{
    height: .7rem;
} 
.leaguer .l-til .til-left{
    width: 60%; 
    height: .7rem;
    line-height: .7rem;
    font-size: .24rem;
    font-weight: bold;
    padding-left: .13rem;
    float: left;
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-til .til-right{
    width:40%;
    height: .7rem;
    line-height: .7rem;
    font-size: .24rem;
    float: right; 
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-con{
    height: 2.07rem; 
    padding-left: .2rem;
    border-bottom: 1px solid #E0E0E0;
}
.leaguer .l-con .con-left{ 
    width: 59%; 
}
.leaguer .l-con .con-left .con-lefts{ 
     width:1.2rem;
     height: 1.2rem; 
    text-align: center;
    font-size: .32rem;
    font-weight: bold;  
    color: #313131;
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-con .con-left .con-lefts span{
    display: block;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background: #eee;
}
.leaguer .l-con .con-left .con-lefts img{
    width: 100%;
    border-radius: 50%;
    height: 100%;
}  
.leaguer .l-con .con-left .con-lefts .name{
    width: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:1; 
    -webkit-box-orient: vertical;
    word-wrap:break-word;
    margin-top: .1rem;
    font-size: .3rem;
    font-family:' PingFangSC-Regular, sans-serif';
}
.leaguer .l-con .con-left .con-rights{
    width:70%;
    height: 100%; 
    float: right;
    margin-top: -.95rem;
    padding-left: .2rem;
}    
.leaguer .l-con .con-left .con-rights .tle{
    font-size: .32rem;
    color: #545454;
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-con .con-left .con-rights .tle img{
    width: .32rem;
    height: .32rem;
    margin-right: .2rem;
}  
.leaguer .l-con .con-left .con-rights .wxwx{
    font-size: .32rem;
    color: #545454;
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-con .con-left .con-rights .wxwx img{
    width: .45rem;
    height: .35rem;
    margin-right: .08rem;
}  
.leaguer .l-con .con-right{
    width: 42%; 
    height: 80%;
    float: right;
    margin-top: -1.2rem;
    text-align: center;
    font-size: .32rem;
    font-weight: bold;
    color: #313131;
    border-left: 1px solid #E0E0E0;
    font-family:"SourceHanSerifSC-Light";      
}
.leaguer .l-con .con-right span{
    display: block;
    width: .9rem;
    height: .9rem;
    margin: auto;
    border-radius: 50%;
    background: #eee;
}
.leaguer .l-con .con-right img{
    width: .9rem;
    height: .9rem;
    border-radius: 50%;
}
.leaguer .l-bottoms{
    text-align: center;
    /* padding-top: .2rem; */
    font-size: .28rem;
    margin-top: 1.1rem; 
    color: #545454;
    font-family:"SourceHanSerifSC-Light";
    background-image: url(../../lib/img/ios/tuoyuan@2x.png);
    background-repeat: no-repeat;
    background-size: .58rem .27rem;
    background-position: 3.369rem 0rem;
}                 
.leaguer .l-bottoms img{
    width: .48rem;
    height: .49rem;
    margin-top: .1rem;
}  
.leaguer .inline{
    width:3.2rem;height:3.06rem;margin:auto;
}
.leaguer .inline img{
    width:100%;height:100%;
}
.leaguer .nosearch{
    text-align:center;margin-top:.5rem;font-size:.32rem;color:#939393;font-family:"SourceHanSerifSC-Light";
}
/* .tuijianren{
    overflow:hidden;  
    text-overflow:ellipsis; 
    display:-webkit-box;  
    -webkit-box-orient:vertical; 
    -webkit-line-clamp:1;  
    width: 1.17rem;
    margin:auto;
    font-size: .3rem;
    color: #313131;
    margin-top: .2rem;
    font-family:' PingFangSC-Regular, sans-serif';
} */
</style>
