<template>
 <div id="staya">
     <div class="top" style="z-index:4;position:fixed;top:0; width:100%;">
        <router-link to="/member"><div class="til-left"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""> </div></router-link>
        <div class="til-con">我的订单</div> 
    </div> 
    <div class="nav">
        <ul class="navs">
            <router-link to="/whole"><li style="width:18%;">全部</li></router-link>
            <router-link to="/stay"><li>待付款 </li></router-link>
            <router-link to="/staya"><li class="ole">待收货<div class="hr"></div></li></router-link>
            <router-link to="/already"><li>已确认</li></router-link>
            <!-- <router-link to="/sale">--><li style="width:22%;">售后/退货</li> <!-- </router-link> -->
        </ul>
    </div>  
    <div class="inlie" v-if="ls.length==0"> 
        <div class="nosearch" style="color:#939393;line-height:5rem;text-align:center;">暂无数据</div>
    </div> 
     <div class="lists-a" v-for="(item,index) in ls" :key="index">
        <div class="time">
            <div class="time-left">待收货</div>
            <div class="time-right"> </div>
        </div>
        <div class="commodity">
            <div class="comm-img" @click="cartdel(item.goodId)">
                <img :src="'http://app.hzhlsy.net/'+item.picImg" alt="">
            </div>
            <div class="comm-til">{{item.goodName}}</div>
            <div class="cou-pri">
                <div class="cp-count"><span>{{item.specName}}</span> 
                    <small class="sml">X{{item.amount}}</small>
                    <!-- <small class="price-count"><small>￥</small>{{item.totalMoney}}</small> -->
                </div>
                <div class="right-pic" style="width:1.5rem;height:70%;float:right;margin-top:.5rem;text-align:right;">
                    <small class="price-count"><small>￥</small>{{item.totalMoney}}</small>
                </div>
            </div>
        </div>
        <div class="but">
            <div class="cancel-a" @click="confirm(item.id)">确认收货</div>
            <div class="continue-a" @click="expres(item.expressCompanyNo,item.expressNumber,item.id)"> 查看物流</div>
            <div class="clas">退货  </div>
        </div>
    </div> 
 </div>  
</template>
<script>
import {Toast} from "mint-ui"
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
        this.getList(); 
    },
    methods:{
        reutrns:function(){
            javascript:history.back(-1);
        },
         getList(){
            var token=this.token;
            let type=parseInt(2);
            var url=`freeter-api/orderGood/userOrder?token=${token}&type=${type}`;
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.list=res.body.userOrderList; 
                     this.ls=this.list.reverse();
                }else{
                    Toast(res.body.msg);
                }
            })
            localStorage.removeItem('gid');
            localStorage.removeItem('notorder');
        }, 
        // 确认收货
        confirm(id){ 
            var token=this.token;
            let type=parseInt(0);
            var url=`freeter-api/orderGood/updateOrder?token=${token}&id=${id}&type=${type}`;
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.reload();
                }else{
                    Toast(res.body.msg);
                }
            })  
        },
        // 物流信息
        expres(com,num,id){ 
           this.$router.push({name:"wuliu",params:{com,num}});
        },
         // 查看商品详情
        cartdel(goodId){
            localStorage.setItem('gid',goodId);
            this.$router.push({name:"cartdetail"});
        },
    },   
}
</script>
<style scoped>
#staya{
     background:#FAFAFA;
    width: 100%;
    height: 100%;
    position: absolute;
}
.top{
    height: .9rem;
    line-height: .9rem; 
    padding-left: .24rem;
    padding-right: .24rem;
    background: #ffffff;
}
.top div{
    float: left;
}
.top .til-left{
    width:5%;
    height: 100%;
}
.top .til-left img{
    width: .18rem;
    height: .33rem;
    position: fixed;
    top: .3rem;
    left: .24rem;
}
.top .til-con{ 
    font-size: .42rem;
    color: #313131;
    font-weight: bold;
    margin-left: 2.15rem;
    width:2rem;
}
.nav{ 
    height: 1.04rem;
    background: #ffffff;
    margin-top: .8rem;
}
.nav .navs {
    padding-left: .24rem;
    padding-right: .24rem;
}
.nav .navs li{
    width: 20%;
    height:.8rem;
    line-height:.8rem; 
    float: left;
    color: #939393;
    font-size: .32rem;
    font-family:"SourceHanSerifSC";
}
.nav .navs .ole{
    color: #313131;
}
.nav .navs li .hr{
    width: .57rem;
    height: .06rem;
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
    background: #FBFBFB;
    margin-top: .38rem;
    padding-top: .18rem;
    padding-right: .24rem;
    padding-left: .24rem;
     position: relative;
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
    height: .55rem; 
    margin-top: .15rem;
    position: absolute;
    left: 25%;
    bottom: .24rem;
}
.lists-a .commodity .cou-pri .cp-count span{
    display: block;
    height: .53rem;
    /* width: 1.74rem; */
    padding-left: .15rem;
    padding-right: .15rem;
    float: left;
    margin-left: .2rem;
    border: 1px solid #d5d5d5;
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
.lists-a .commodity .cou-pri .right-pic .price-count{ 
    color: #C20D12;
    font-family: "SourceHanSerifSC-Bold";
    font-size: .32rem;
    font-weight: bold; 
    margin-top: .1rem;
}
.lists-a .commodity .cou-pri .right-pic .price-count small{
    font-size: .24rem;
}
.lists-a .but{
    margin-top: .35rem;
    width: 100%;
    position: relative;
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
    border: 1px solid #d5d5d5;
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
    margin-right: .24rem;
    color: #ffffff;
    position: absolute;
    right:0;
    background: #C20D12;
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
    border: 1px solid #d5d5d5;
    position: absolute;
    right:3.7rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
}
</style>

