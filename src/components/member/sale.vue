<template>
 <div id="already">
     <div class="top">
        <div class="til-left"><router-link to="/member"> <img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></router-link></div>
        <div class="til-con">我的订单</div> 
    </div> 
    <div class="nav">
        <ul class="navs">
            <router-link to="/whole"><li style="width:18%;">全部</li></router-link>
            <router-link to="/stay"><li>待付款 </li></router-link>
            <router-link to="/staya"><li>待收货</li></router-link>
            <router-link to="/already"><li>已确认</li></router-link>
            <router-link to="/sale"><li class="ole" style="width:22%;">售后/退货<div class="hr"></div></li></router-link>
        </ul>
    </div> 
     <div class="lists-a" v-for="(item,index) in productList" :key="index">
        <div class="time">
            <div class="time-left">{{item.time}}</div>
            <div class="time-right"><img src="../../lib/img/ios/del@3x.png" alt=""></div>
        </div>
        <div class="commodity">
            <div class="comm-img">
                <img :src="'http://app.hzhlsy.net/'+item.img" alt="">
            </div>
            <div class="comm-til">{{item.title}}</div>
            <div class="cou-pri">
                <div class="cp-count"><span>{{item.dils}}</span> 
                    <small class="sml">X{{item.count}}</small>
                    <small class="price-count"><small>￥</small>{{item.pric}}</small>
                </div>
                
            </div>
        </div>
        <div class="but"> 
            <div class="clas">退货</div>
        </div>
    </div>
 </div>  
</template>
<script>
export default {
    data(){
        return{
             productList:[
                {
                    "time":"已退货",
                    "img":require("../../lib/img/ios/xiangqingimg@2x.png"),
                    "title":"绿威胶囊 72粒/盒*5盒 保护胃粘膜 中盒",
                    "dils":"5盒*72粒",
                    "count":"1",
                    "pric":"1280"
                },
                {
                    "time":"已退货",
                    "img":require("../../lib/img/ios/xiangqingimg@2x.png"),
                    "title":"绿威胶囊 72粒/盒*5盒 保护胃粘膜 中盒",
                    "dils":"5盒*72粒",
                    "count":"1",
                    "pric":"1280"
                }, 
            ]
        }
    },
    methods:{
        reutrns:function(){
            javascript:history.back(-1);
        }
    } 
}
</script>
<style scoped> 
#already{
    background:#FAFAFA;
    width: 100%;
    height: 100%;
    position:absolute;
}
.top{
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    padding-left: .24rem;
    padding-right: .24rem;
    background: #ffffff;
}
.top div{
    float: left;
}
.top .til-left{
    width:5%;
}
.top .til-left img{
    width: .18rem;
    height: .33rem;
}
.top .til-con{
    width:2rem;
    text-align: center;
    font-size: .42rem;
    color: #313131;
    font-weight: bold;
    margin-left: 2.15rem;
}
.nav{ 
    height: 1.04rem;
    background: #ffffff;
}
.nav .navs {
    padding-left: .24rem;
    padding-right: .24rem;
}
.nav .navs li{
    width: 20%;
    height: 1rem;
    line-height: 1rem; 
    float: left;
    color: #545454;
    font-size: .32rem;
    font-family:"SourceHanSerifSC";
}
.nav .navs .ole{
    color: #313131;
}
.nav .navs li .hr{
    width: .57rem;
    height: .04rem;
    background: #C20D12; 
}
/* 待收货 */
.lists-a{ 
    /* margin-left: .24rem;
    margin-right: .24rem;   */
    height: 4.55rem; 
    margin-top: .2rem;  
    padding: 0;
    padding-top: .5rem;
    background: #ffffff;
}
.lists-a .time{
    width: 100%;
    height: .4rem; 
    padding-left: .24rem;
    padding-right: .24rem;
}
.lists-a .time .time-left{
    width: 50%;
    float: left;
    color: #C20D12;
    font-size: .32rem;
}
.lists-a .time .time-right{
    width: 50%;
    float: right;
}
.lists-a .time .time-right img{
    width: .38rem;
    height: .38rem;
    float: right;
}
.lists-a .commodity{
    height: 1.9rem;
    /* width: 100%; */
    background: #FBFBFB;
    margin-top: .38rem;
    padding-top: .18rem;
    padding-right: .24rem;
    padding-left: .24rem;
}
.lists-a .commodity .comm-img{
    width: 1.61rem;
    height: 1.61rem;
    border: 1px solid #F3F3F3; 
    float: left;
    text-align: center;
}
.lists-a .commodity .comm-img img{
    width: 1.3rem;
    height: .83rem;
    margin-top: .4rem;
    /* margin-left: .28rem; */
}
.lists-a .commodity .comm-til{
    line-height: .4rem;
    font-size: .32rem;
    color: #313131;
    margin-top: .05rem;
   margin-left: 1.86rem;
   margin-left: 1.81rem;
   font-family:"SourceHanSerifSC-Medium";
} 
.lists-a .commodity .cou-pri .cp-count{
    /* width: 50%; */
    height: .55rem; 
    margin-top: .15rem;
}
.lists-a .commodity .cou-pri .cp-count span{
    display: block;
    height: .53rem;
    width: 1.74rem;
    float: left;
    margin-left: .2rem;
    border: 1px solid #939393;
    text-align: center;
    font-size: .32rem;
    color: #939393;
    line-height: .53rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
}
.lists-a .commodity .cou-pri .cp-count .sml{
    font-size: .28rem;
    color: #C20D12;
    margin-left: .2rem;
    line-height: .55rem;
    font-family:"SourceHanSerifSC-Light";
}
.lists-a .commodity .cou-pri .cp-count .price-count small{
    font-weight: normal;
}
.lists-a .commodity .cou-pri .cp-count .price-count{
    float: right;
    color: #C20D12;
    font-size: .32rem;
    font-family: "SourceHanSerifSC-Medium";
    font-weight: bold;
    margin-top: .1rem;
}
.lists-a .but{
    margin-top: .35rem;
    width: 100%;
    position: relative;
    height: .6rem;
}
.lists-a .but div{
  float: left; 
}
.lists-a .continue-a{
    height: .6rem;
    width: 1.6rem;
    text-align: center;
    line-height: .6rem;
    font-size: .24rem;
    color: #313131;
    margin-right: .24rem;
    border: 1px solid #545454;
    position: absolute;
    right:1.85rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
}
.lists-a .cancel-a{
     height: .6rem;
    width: 1.6rem;
    text-align: center;
    line-height: .6rem;
    font-size: .24rem;
    /* color: #ffffff; */
    border: 1px solid #545454;
    margin-right: .24rem;
    position: absolute;
    right:0; 
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
}
.lists-a .clas{
    height: .6rem;
    width: 1.6rem;
    text-align: center;
    line-height: .6rem;
    font-size: .24rem;
    color: #313131;
    margin-right: .24rem;
    /* border: 1px solid #545454; */
    position: absolute;
    right:0rem;
    color: #ffffff;
    background: #C20D12;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
}
</style>

