<template>
<div id="order">
    <div class="top" >
        <router-link to="/whole" style="position:fixed;left:0;"><div class="top-left"><img src="../../lib/img/ios/baifanhui@3x.png" @click="back" alt=""></div></router-link>
        <div class="top-right">等待付款<span></span></div>
    </div>
   <div class="back-color"></div>
   <div class="address">
       <div class="landing">
           <div class="lnd mrs"><span class="mr">地址</span> </div>
           <div class="lnd adr"> <span class="adres">{{info.province}}{{info.city}}{{info.area}}{{info.detailedAddress}} </span><div class="tel">Carl <span>{{info.personTel}}</span></div></div>
            <!-- <div class="lnd land-right" ><span>编辑</span><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></div>  -->
       </div> 
   </div>
   <div class="order-d">订单详情<span> <small>/</small> DETAIL</span></div>
   <div class="dels"> 
       <div class="order-list" v-for="(item,index) in list" :key="index">
            <div class="tu"><div class="tu-img"><img :src="'http://app.hzhlsy.net/'+item.picImg" @click="delimg(item.goodId)" alt=""></div></div>
            <div class="y-name">{{item.goodName}}</div>
       </div>
       <div class="lists" style="height:4.41rem;width:100%;margin-top:.2rem;padding-left:.25rem;padding-right:.25rem;">
            <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">购买数量</div>
                <div class="count" style=" width:60%;text-align:right; line-height:1.47rem;font-size:.24rem;color:#939393;" >{{sums}}件</div>
                <div class="r-count" style=" width:9%;"><img src="../../lib/img/ios/fanhuiright@3x.png" alt="" style="width:.18rem;height:.33rem;float:right;margin-top:.52rem;"></div>
            </div>
             <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">配送费</div>
                <div class="count" style=" width:55%;text-align:right; line-height:1.47rem;font-size:.24rem;color:#313131;font-size:.28rem;">快递 </div>
                <div class="r-count" style=" width:14%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.28rem;" v-if="info.freight==0">包邮</div>
                <div class="r-count" style=" width:14%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.28rem;" v-else> ￥{{info.freight}}</div>
            </div>
             <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;">
                <div class="l-count" style=" width:15%; line-height:1.47rem;font-size:.32rem;color:#313131;">备注</div>
                <input class="count" v-model="info.note" style=" width:75%;border:none;text-align:right; line-height:1.35rem;font-size:.24rem;color:#939393;float:left;"/>  
                <div class="r-count" style=" width:9%;"><img src="../../lib/img/ios/fanhuiright@3x.png" alt="" style="width:.18rem;height:.33rem;float:right;margin-top:.52rem;"></div>
            </div>
       </div>
       <div class="bottom">
           <div class="bottom-con">
               <div class="bottom-con-left">合计:￥<span>{{info.totalMoney}}</span> </div>
               <div class="bottom-con-right" @click="choie" :disabled="isDisable">支付</div>
           </div>
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
           token:localStorage.getItem('token'), 
           address:[], 
           orderaddress:[], 
            // addressid:this.$route.params.id,
            orderno:this.$route.params.orderno,  
            rodername:this.$route.params.ordername,
            note:[], 
            addressid:'',
            // dingorder:0,
            freight:'',
            list:[],
            info:[],
            count:0,
            sums:localStorage.getItem('countsums'),
            money:sessionStorage.getItem('notmoney'),
            orderpay:'', 
            pass:false,
            isDisable:true,//表单重复提交
            name:[],
            order:[],  
        }
    },
     mounted(){  
        let Base64 = require('js-base64').Base64;  
    },
    created(){  
        this.getList(); 
    }, 
    methods:{   
        setMaskShow(){
            // this.pass=true; 
            this.dingorder=localStorage.getItem('notorder');  
            // this.getaddorder(); 
            let tol=this.money;
            let orderNo=this.dingorder;
            let ordername=this.name;  
            this.$router.push({name:'choice',params:{tol,orderNo,ordername}});  
        },  
        // 返回上一级
        back(){
            this.$router.push('/whole');
            sessionStorage.removeItem('notlist');
            sessionStorage.removeItem('notinfo');
            sessionStorage.removeItem('notmoney');
            localStorage.removeItem('countsums');
        },
         
        // 订单信息
        getList(){
            var token=this.token;
            // var orderno=this.orderno; 
            var orderno=localStorage.getItem('notorder');
            var url=`freeter-api/orderGood/orderPayment?token=${token}&orderNo=${orderno}`;
            this.$http.post(url).then(res=>{  
                if(res.body.code==0){
                    this.list=res.body.orderGood;  
                    this.info=res.body.orderInfo; 
                    this.money=this.info.totalMoney;
                    this.name=res.body.orderInfo.orderName; 
                    this.order=this.info.orderNo; 
                    sessionStorage.setItem('order',this.order);
                    sessionStorage.setItem('name',this.name);
                    sessionStorage.setItem('tol',this.money);
                    sessionStorage.setItem('notlist',this.list);
                    sessionStorage.setItem('notinfo',this.info);
                    sessionStorage.setItem('notmoney',this.money);
                    this.list.forEach(count=>{ 
                      this.sums +=parseInt(count.amount);//计算数量总和 
                      localStorage.setItem('countsums', this.sums); 
                    }) 
                }else if(res.body.code==500){
                    Toast(res.body.msg);
                    this.$router.push('/stay');
                    
                }
            })
        }, 
        choie(){   
            let tol=this.tol;
            let orderNo=this.as;
            let ordername=this.name; 
            this.$router.push({name:'choice',params:{tol,orderNo,ordername}}); 
            // if(this.maskShow==false){
            //     this.maskShow=true; 
            //     this.pay();
            // }else{
            //     this.maskShow=false; 
            // } 
        }, 
        //   },
        delimg(goodId){ 
            localStorage.setItem('gid',goodId);
            this.$router.push({name:"cartdetail"});
        }, 
         getpayment(){
            this.$router.push({path:'/payment'});
        },
        setpayment(){
            this.$router.push({path:'/payments'});
        },     
    }   
}
</script>
<style scoped>
 @import '../../lib/css/not.css';
 
/* 弹出框 */
.father{
    width: 100%;
    height: 100%;
}
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.3;
}
button{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.child{
    position: fixed;
    bottom: 0; 
    height:70%;
    width: 100%;
    border: 1px solid #ccc; 
    background: #fff;
    padding-left: .24rem;
    padding-right: .24rem;
    color: #313131;
    font-size: .4rem;
}
.t_orter{
    text-align: center;
    line-height: 1rem;
    font-weight: bold;
    border-bottom: 1px solid #e1e1e1;
}
.t_orter span{
    font-size: .6rem;
    float: right;
    font-family:'SourceHanSerifSC-Light';
}
.numbers{ 
    margin-top: .2rem;
    line-height: 1rem;
    border-bottom: 1px solid #e1e1e1;
}
.tols{
    text-align: center;
    margin-top: .8rem;
}
.tols span{
    font-size: .6rem;
}

.zfb{
    width: 100%;
    height: .88rem;  
    background: #C5161C;
    font-size: .38rem;
    line-height: .88rem; 
    margin-top:2rem; 
    color: #fff;
    border-bottom-right-radius: .2rem;
    border-bottom-left-radius: .2rem;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
}
.zfb img{
    width: .88rem;
    height: 100%;
    float: left; 
}
.zfb span{
    width: 100%;
    display: block;
    text-align: center;
}
.wx{
    width: 100%;
    height: .88rem;  
    background: #C5161C;
    font-size: .38rem;
    line-height: .88rem;
    text-align: center; 
    margin-top: .5rem;
    color: #fff;
    border-bottom-right-radius: .2rem;
    border-bottom-left-radius: .2rem;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
}
</style>
