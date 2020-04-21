<template>
    <div id="whole">
         <div class="top" style="z-index:4;position:fixed;top:0;width:100%;"> 
            <router-link to="/member"><div class="til-left"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""> </div></router-link>
            <div class="til-con">我的订单</div> 
        </div> 
        <div class="nav">
            <ul class="navs">
                <router-link to="/whole"><li class="ole" style="width:18%;">全部 <div class="hr"></div></li></router-link>
                 <router-link to="/stay"><li>待付款</li></router-link>
                <router-link to="/staya"><li>待收货</li></router-link>
                <router-link to="/already"><li>已确认</li></router-link>
                <!-- <router-link to="/sale">--><li style="width:22%;">售后/退货</li><!--</router-link> -->
            </ul>
        </div>
            <div class="inlie" v-if="ls.length==0"> 
                <div class="nosearch" style="color:#939393;line-height:5rem;text-align:center;">暂无数据</div>
            </div>
         <div class="lists-c" v-for="(item,index) in ls" :key="index" >
            <div class="time"  v-if="item.orderStatus==0">
                <div class="time-left" >待付款</div> 
                <!-- <div class="time-right"><img src="../../lib/img/ios/del@2x.png" alt=""></div> -->
            </div>
            <div class="time" v-if="item.orderStatus==3 || item.orderStatus==2">
                <div class="time-left">待收货</div> 
            </div>
            <div class="time" v-if="item.orderStatus==8">
                <div class="time-left">已确认</div>
                <div class="time-right" @click="detailist(item.id)"><img src="../../lib/img/ios/del@3x.png" alt=""></div>
            </div>
            <div class="commodity">
                <div class="comm-img" @click="delimg(item.goodId)">
                    <img :src="'http://app.hzhlsy.net/'+item.picImg" alt="">
                </div>
                <div class="comm-til">{{item.goodName}}</div>
                <div class="cou-pri">
                    <div class="cp-count"><span>{{item.specName}}</span> 
                        <small class="sml">X{{item.amount}}</small>
                        <small class="price-count" v-if="item.expressNumber==0"><small>￥</small>{{item.totalMoney}}</small>
                        <!-- <small class="price-count" v-else><small>￥</small>{{item.totalMoney}}</small> -->
                    </div> 
                </div>
            </div>
            <div class="but"  v-if="item.orderStatus==0">
                <div class="cancel-c" @click="delorder(item.orderNo)">取消订单</div>
                <div class="continue-c" @click="continueto(item.orderNo,item.orderName)"> 继续付款</div> 
            </div>
            <div class="buts" v-if="item.orderStatus==3 || item.orderStatus==2">
                <div class="cancel-a" @click="ordertype(item.id)">确认收货</div>
                <div class="continue-a" @click="wuliu(item.expressCompanyNo,item.expressNumber,item.id)"> 查看物流</div>
                <div class="clas">退货</div>
            </div>
             <div class="butwd" v-if="item.orderStatus==8">
                <div class="cancel-b" @click="creaorder(item.goodId)">再次购买</div> 
            </div>
        </div> 
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    inject:['reload'],
    data(){
        return{
            token:localStorage.getItem('token'),  
            ls:[],
        }
    }, 
    created(){
        this.getlist();
        // this.ordertype();                
    },
    methods:{
        delimg(goodId){
            localStorage.setItem('gid',goodId);
            this.$router.push({name:"cartdetail"});
        },  
        // 返回上一页
        returns:function(){
            javascript:history.back(-1);
        },
        // 获取全部数据
        getlist(){
            var token=this.token;
            let shu=parseInt(0);
            var url=`freeter-api/orderGood/userOrder?token=${token}&type=${shu}`;
            this.$http.post(url).then(res=>{  
                console.log(url);
                if(res.body.code==0){
                    this.list=res.body.userOrderList;   
                     this.ls=this.list.reverse(); 
                }
            })
            localStorage.removeItem('gid');
            localStorage.removeItem('notorder');
        },
        //确认收货
        ordertype(id){ 
            var token=this.token;
            var shu=parseInt(0);
            var url=`freeter-api/orderGood/updateOrder?token=${token}&id=${id}&type=${shu}`;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                   Toast("确认收货");  
                }else{
                    Toast(res.body.msg);
                }
            })   
        },
        // 删除
        detailist(id){
            var token=this.token; 
            var url=`freeter-api/orderGood/delete?token=${token}&id=${parseInt(id)}`;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    Toast("订单已删除"); 
                    this.reload(); 
                }
            }) 
        },
        // 取消订单
        delorder(ord){
            var token=this.token;
            var url=`freeter-api/orderGood/cancellationOrder?token=${token}&orderNo=${ord}`;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    Toast("订单已取消");
                     this.reload();
                }
            })
            // this.reload(); 
        },
        // 查看物流
        wuliu(com,num,id){
            this.$router.push({name:"wuliu",params:{com,num}}); 
        },
        // 再次购买
        creaorder(goodId){
            this.$router.push({name:"cartdetail",params:{goodId}}); 
        },
        // 继续付款
        continueto(orderno,ordername){ 
            localStorage.setItem('notorder',orderno);
            this.$router.push({name:"not",params:{orderno,ordername}});
            console.log(this.token,orderno); 
        }
    }
}
</script>
<style scoped>
.mint-header-title{
    font-size: .42rem;
  font-weight: bold !important;
}
#whole{
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
    margin-left: 2.15rem;
    font-size: .42rem;
    color: #313131;
    font-weight: bold;
    width:2rem;
}
.nav{
    /* margin-bottom: .2rem; */
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
    line-height: .8rem;
    /* text-align: center; */
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
/* 待付款 */
.lists-c{  
    height: 4.55rem; 
    margin-top: .2rem;  
    padding: 0;
    padding-top: .5rem;
    background: #ffffff;
}
.lists-c .time{
    width: 100%;
    height: .4rem; 
    padding-left: .24rem;
    padding-right: .24rem;
}
.lists-c .time .time-left{
    width: 50%;
    float: left;
    color: #C20D12;
    font-size: .32rem;
}
.lists-c .time .time-right{
    width: 50%;
    float: right;
}
.lists-c .time .time-right img{
    width: .38rem;
    height: .38rem;
    float: right;
}
.lists-c .commodity{
    height: 1.9rem;
    /* width: 100%; */
    background: #FBFBFB;
    margin-top: .38rem;
    padding-top: .18rem;
    padding-right: .24rem;
    padding-left: .24rem;
}
.lists-c .commodity .comm-img{
    width: 1.61rem;
    height: 1.61rem;
    border: 1px solid #F3F3F3; 
    float: left;
    text-align: center;
}
.lists-c .commodity .comm-img img{
    width: 1.3rem;
    height: .83rem;
    margin-top: .4rem;
    /* margin-left: .28rem; */
}
.lists-c .commodity .comm-til{ 
    line-height: .4rem;
    font-size: .32rem;
    color: #313131;
    margin-top: .05rem;
    margin-left: 1.86rem;
    margin-left: 1.81rem;
    padding-top: .1rem;
     text-align: left; 
    overflow : hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical; 
    color:rgba(51,51,51,1); 
    vertical-align: middle; 
    font-family:"SourceHanSerifSC-Medium";
} 
.lists-c .commodity .cou-pri .cp-count{
    /* width: 50%; */
    height: .55rem; 
    margin-top: .15rem;
}
.lists-c .commodity .cou-pri .cp-count span{
    display: block;
    height: .53rem;
    /* width: 2.14rem; */
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
.lists-c .commodity .cou-pri .cp-count .sml{
    font-size: .28rem;
    color: #C20D12;
    margin-left: .2rem;
    line-height: .55rem;
    font-family:"SourceHanSerifSC-Light";
}
.lists-c .commodity .cou-pri .cp-count .price-count small{
    font-weight: normal;
}
.lists-c .commodity .cou-pri .cp-count .price-count{
    float: right;
    color: #C20D12;
    font-size: .32rem;
    font-family: "SourceHanSerifSC-Medium";
    font-weight: bold;
}
.but{
    margin-top: .35rem;
    position: relative;
    width: 100%;
}
.but div{
  float: left; 
}
.lists-c .continue-c{
    height: .6rem;
    width: 1.6rem;
    text-align: center;
    line-height: .6rem;
    font-size: .24rem;
    margin-right: .24rem;     
    position: absolute;
    right:1.85rem;
    background: #C20D12;
    color: #ffffff;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
}
.lists-c .cancel-c{
     height: .6rem;
    width: 1.6rem;
    text-align: center;
    line-height: .6rem;
    font-size: .24rem; 
    margin-right: .24rem;
    position: absolute;
    right:0;
    color: #313131;
    border: 1px solid #d5d5d5;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
} 
 
 .buts{
    margin-top: .35rem;
    position: relative;
    width: 100%;
}
 .buts div{
  float: left; 
}
 .continue-a{
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
.cancel-a{
     height: .6rem;
    width: 1.6rem;
    text-align: center;
    line-height: .6rem;
    font-size: .24rem;
    color: #ffffff;
    margin-right: .24rem;
    position: absolute;
    right:0;
    background: #C20D12;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
}
.clas{
    height: .6rem;
    width: 1.6rem;
    text-align: center;
    line-height: .6rem;
    font-size: .24rem;
    margin-right: .24rem;
    color: #313131;
    border: 1px solid #d5d5d5;
    position: absolute;
    right:3.7rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
} 
 
 .butwd{
    margin-top: .35rem;
    position: relative;
    width: 100%;
}
 .butwd div{
  float: left; 
}
 
 .cancel-b{
     height: .6rem;
    width: 1.6rem;
    text-align: center;
    line-height: .6rem;
    font-size: .24rem;
    color: #ffffff;
    margin-right: .24rem;
    position: absolute;
    right: 0;
    background: #C20D12;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
}






</style>


