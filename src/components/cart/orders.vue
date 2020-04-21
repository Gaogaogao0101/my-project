<template>
<div id="order">
    <div class="top">
        <div class="top-left" @click="bake(goodId)" style="z-index:4 width:4%;"><img src="../../lib/img/ios/baifanhui@3x.png" alt=""></div> 
        <div class="top-right">确认订单</div>
    </div>
   <div class="back-color"></div>
   <div class="address">
       <div class="landing" v-if="dizhi==1">
           <div class="lnd mrs"><span class="mr">默认</span> </div>
           <div class="lnd adr" @click="pushdeladd()"> <span class="adres">{{orderaddress.province}}{{orderaddress.city}}{{orderaddress.area}}{{orderaddress.detailedAddress}} </span><div class="tel">Carl <span> {{orderaddress.personTel}}</span></div></div>
            <div class="lnd land-right" @click="pushdeladd()"><span>编辑</span><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></div> 
       </div>
        <div class="landing" v-else>
           <div class="lnd mrs"><span class="mr">默认</span> </div>
           <div class="lnd adr" @click="pushdeladd()"> <span class="adres">{{orderaddress.province}}{{orderaddress.city}}{{orderaddress.area}}{{orderaddress.detailedAddress}} </span><div class="tel">Carl <span>{{orderaddress.personTel}}</span></div></div>
            <div class="lnd land-right" @click="pushdeladd()"><span>编辑</span><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></div> 
       </div>
   </div> 
   <div class="order-d">订单详情<span> <small>/</small> DETAIL</span></div>
   <div class="dels"> 
       <div class="order-list">
            <div class="tu"><div class="tu-img"><img :src="'http://app.hzhlsy.net/'+cartordimg" @click="delimg(list.goodId)" alt=""></div></div>
            <div class="y-name">{{comtitle}}</div>
            <div class="y-price">￥<span>{{comprice}}</span></div>
       </div>
       <div class="lists" style="height:6rem;width:100%;margin-top:.2rem;padding-left:.25rem;padding-right:.25rem;">
            <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;position:relative;">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">购买数量</div>
                 <div class="num">
                    <span class="countjian" @click="add()"><img src="../../lib/img/ios/jian@3x.png" alt="" style="position:absolute;top:.25rem;"></span>
                    <span >{{counts}}</span> 
                    <span  @click="subtract()"><img src="../../lib/img/ios/jia@3x.png" alt=""></span>
                 </div>
                <!-- <div class="count" style=" width:60%;text-align:right; line-height:1.47rem;font-size:.24rem;color:#939393;" >{{accountCart.goodCount}}件</div>
                <div class="r-count" style=" width:9%;"><img src="../../lib/img/ios/fanhuiright@3x.png" alt="" style="width:.18rem;height:.33rem;float:right;margin-top:.52rem;"></div> -->
            </div>
             
            <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;" v-if="ifCoupon==0">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">优惠券</div>
                <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;">您当前的优惠劵为0</div> 
            </div>
            <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;" v-if="ifCoupon==2">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">优惠券</div>
                <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;">还差{{balance}}可使用优惠劵</div> 
            </div>
            <!-- <router-link to="/coupon"> -->
             <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;" @click="turn" v-if="ifCoupon==1">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">优惠券</div>
                <!-- <div class="count" style=" width:50%;text-align:right; line-height:1.47rem;font-size:.24rem;color:#313131;font-size:.28rem;"> </div> -->
                <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;"  v-if="isCouppon!=1">{{accountCart.couponNumber}}张优惠券可用</div>
                <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;"  v-else>-￥{{reduction.money}}</div>
            </div> 
             <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">配送费</div>
                <div class="count" style=" width:55%;text-align:right; line-height:1.47rem;font-size:.24rem;color:#313131;font-size:.3rem;">快递 </div>
                <div class="r-count" style=" width:14%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;" v-if="freight==0">包邮</div> 
                <div class="r-count" style=" width:14%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;" v-else> ￥{{freight}}</div>
                
            </div>
            <!-- </router-link> -->
             <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;">
                <div class="l-count" style=" width:15%; line-height:1.47rem;font-size:.32rem;color:#313131;">备注</div>
                <input class="count" v-model="note" style=" width:75%;border:none;text-align:right; line-height:1.35rem;font-size:.28rem;color:#939393;float:left;" placeholder="备注偏好、个性化需求"/>  
                <div class="r-count" style=" width:9%;"><img src="../../lib/img/ios/fanhuiright@3x.png" alt="" style="width:.18rem;height:.33rem;float:right;margin-top:.52rem;"></div>
            </div>
             
       </div>
       <div class="bottom">
           <div class="bottom-con"> 
               <div class="bottom-con-left">合计:￥<span>{{prisum}}</span> </div> 
               <div class="bottom-con-right" @click="qianwang" :disabled="isDisable">结算</div>
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
            orderaddress:[], 
            addressorder:[], 
            // 购物车id数组 
            cartid:this.$route.params.id, 
            accountCart:[],
            sum:0,
            count:"",
            addressid:this.$route.params.id, 
            priceas:0, 
            total:0,
            goodId:[],
            goodSpecPriceId:[], 
            pri:'',
            note:[],
            specid:this.$route.params.specId,   
            goodids:this.$route.params.goodid, 
            comprice:'', 
            maskShow: false,
            orderno:[],
            tol:'',
            as:[],
            name:'',
            resulturl:'',
            alipayWap:[],
            freight:'',
            prisum:0,
            isDisable: true,//表单重复提交
            cartordimg:'',
            comtitle:'',
            dizhi:sessionStorage.getItem('selectaddres'),
            counts:sessionStorage.getItem('s'), 
            Totalprice:0,
            isCouppon:'', 
            icp:sessionStorage.getItem('selectyh'),
            reduction:'',
            // 城市
            city:'', 
            regins:[],
            isBaoYou:'',
            isBaoyous:'',
            ifCoupon:'', 
            isadres:localStorage.getItem('notdesid'),
            isad:'', 
            adid:'',
            balance:''
        }
    },
    created(){ 
         this.getregion();
        this.sumstr();    
        this.getcou(); 
        this.getlist();
        this.getaddressid();
    },
    mounted(){   
        let Base64 = require('js-base64').Base64;   
         if(this.icp==null){
            this.isCouppon=''
        }else{
            this.isCouppon=this.icp;
        };
        if(this.isadres==null ||this.isadres==undefined){
            this.isad=0 
        }else{
            this.isad=this.isadres;
        };  
        // console.log('地址切换'+this.adid); 
    },
    methods:{  
         // 判断是否满三百
        turn(){  
            var s=this.counts; 
            this.$router.push({name:'coupon',params:{s}});  
        }, 
        // 折扣卷
        //  判断包邮 
         getregion(){
            var city=this.city;
            var url='freeter-api/coupon/despatchMoney';
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.regins=res.body.provinces;   
                    this.isArr(); 
                }else if(res.body.code==500){
                    Toast(res.body.msg)
                }
            })  
        },
        isArr(){
            var arr=this.regins; 
            var a=this.city; 
            var ss=this.isInArray(arr,a);
            if(ss==true){
                this.isBaoYou=1 
            }else if(ss=false){
                this.isBaoYou='' 
            }
             this.getCart();  
        },
        isInArray(arr,value){
            if(arr.indexOf&&typeof(arr.indexOf)=='function'){
                var index = arr.indexOf(value);
                if(index >= 0){
                    return true;
                }
            }
            return false; 
        },
        getcou(){
            var url='freeter-api/coupon/select';
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.reduction=res.body.couponEntity; 
                }else if(res.body.code==500){
                    Toast(res.body.msg);
                }
            }) 
        },
        // 数量
        add(counts){  
            
            if(this.counts<=1){
                Toast('数量已是最低值');  
            }else{
                this.counts--;  
                this.getlist(); 
            } 
        }, 
        subtract(counts){   
            if (this.counts>=1){ 
                this.counts ++;   
                this.getlist(); 
            }else{
            
            }
        }, 
        // 返回
        bake(goodId){ 
            this.$router.push({name:"cartdetail",params:{goodId}});
             //this.$router.go(-1);//返回上一层 
             localStorage.removeItem('sums');
             localStorage.removeItem('sum');
             localStorage.removeItem('fri'); 
             localStorage.removeItem('notdesid');
        }, 
        // 获取对应地址
        getaddressid(){ 
            var token=this.token;
            var id=localStorage.getItem('notdesid'); 
            // var id=parseInt(this.addressid);
            var url=`freeter-api/address/api/info?token=${token}&id=${id}`;
            this.$http.post(url).then(res=>{  
                if(res.body.code==0){ 
                    this.addressorder=res.body.address;   
                }else if(res.body.code==500){
                    Toast(res.body.msg)
                } 
            })
        },  
        // 购物车
        getCart(){  
            var token=this.token;
            var specid=localStorage.getItem('specid');
            var isid=this.isad;
            var number=this.counts; 
            var isCoupon=this.isCouppon; 
            var url=`freeter-api/good/accountGood?token=${token}&goodSpecId=${specid}&addressId=${isid}&number=${number}&isDiscount=${isCoupon}`;
            this.$http.post(url).then(res=>{    
                console.log(url);
                if(res.body.code==0){  
                    this.orderaddress=res.body.cartModel.address;
                    console.log(this.orderaddress);
                    this.adid=res.body.cartModel.address.id; 
                    this.prisum=res.body.cartModel.totalAmount;
                    this.accountCart=res.body.cartModel; 
                    this.cartordimg=res.body.cartModel.goodImg; 
                    this.comtitle=res.body.cartModel.goodTitle; 
                    this.comprice=res.body.cartModel.goodUnitPrice;
                    this.goodId=res.body.cartModel.goodId;
                    this.freight=res.body.cartModel.pageKeyword;
                    this.isBaoyous=res.body.cartModel.isMail;
                    this.ifCoupon=res.body.cartModel.isCoupon;
                    this.balance=res.body.cartModel.balance;
                }else if(res.body.code==500){
                    Toast(res.body.msg)
                }
            })
            
        },   
         // 购物车
        getlist(){  
            var token=this.token;
            var specid=localStorage.getItem('specid');
            var isid=this.isad;
            var isCoupon=this.isCouppon;
            var number=this.counts;  
            var url=`freeter-api/good/accountGood?token=${token}&goodSpecId=${specid}&number=${number}&addressId=${isid}&isDiscount=${isCoupon}`;
            if(isid==null){
                Toast("请选择收货地址");
            }else{ 
            this.$http.post(url).then(res=>{   
                if(res.body.code==0){
                    this.orderaddress=res.body.cartModel.address; 
                    this.adid=res.body.cartModel.address.id; 
                    this.prisum=res.body.cartModel.totalAmount;
                    this.accountCart=res.body.cartModel; 
                    this.cartordimg=res.body.cartModel.goodImg; 
                    this.comtitle=res.body.cartModel.goodTitle; 
                    this.comprice=res.body.cartModel.goodUnitPrice;
                    this.goodId=res.body.cartModel.goodId;
                    this.freight=res.body.cartModel.pageKeyword; 
                    this.isBaoyous=res.body.cartModel.isMail;
                    this.ifCoupon=res.body.cartModel.isCoupon;
                    this.balance=res.body.cartModel.balance;
                }else if(res.body.code==500){
                    Toast(res.body.msg)
                }
            })
            }
        },   
        sumstr(){  
            this.accountCart=JSON.parse(sessionStorage.getItem('product'));   
            this.fri=localStorage.getItem('fri'); 
            this.pri=Number(this.aa)+Number(this.fri);   
        }, 
        // 储存购物车传的信息
        pushdeladd(){  
            this.$router.push('/takes');
            this.getaddressid(); 
        },
        // 结算
        getaddorder(){
            if(this.isCouppon==null){
                this.isCouppon=0
            }
             this.maskShow=true;
             this.isDisable = true;  //开始可以点击 
             var token=this.token;
             var goodId=parseInt(this.goodId);
             var goodSpecPriceId=localStorage.getItem('specid');
             var addressId=this.isad;
             var note=this.note;  
             var type=parseInt(0);
             var number=this.counts; 
             var isCouppon=this.isCouppon;  
            var url=`freeter-api/order/addOrder?token=${token}&goodId=${goodId}&goodSpecPriceId=${goodSpecPriceId}&addressId=${addressId}&type=${type}&note=${note}&isCoupon=${isCouppon}&number=${number}`;
            this.$http.post(url).then(res=>{  
                this.isDisable = false;//执行请求后就不能点击了 
                if(res.body.code==0){ 
                    // this.isDisable = false;//执行请求后就不能点击了
                    this.orderno=res.body.orderNo;
                    this.tol=res.body.orderNo.totalMoney; 
                    this.as=res.body.orderNo.orderNo; 
                    this.name=res.body.orderNo.orderName;  
                    sessionStorage.setItem('tol',this.tol);
                    sessionStorage.setItem('name',this.name);
                    sessionStorage.setItem('order',this.as);
                    this.setMaskShow(); 
                }else if(res.body.code==500){
                    Toast(res.body.msg)
                }
            }) 
            // this.reload(); 
        },
        qianwang(){  
            if(this.isad==undefined){   
                Toast('用户地址不能为空');
            }else if(this.isad==0){
                this.isad=this.adid;
                this.getaddorder();
                console.log('3322');   
            }else{
                this.getaddorder();   
                console.log('1122');
            }
            // console.log('结算地址'+this.isad);
        },
        setMaskShow(){   
            let tol=this.tol;
            let orderNo=this.as;
            let ordername=this.name; 
            this.$router.push({name:'choice',params:{tol,orderNo,ordername}});  
        }, 
        pay(){
            if(this.isDisable){
                this.maskShow=true;
                this.qianwang();
                this.isDisable=false;
            }else{
               Toast("数据重复提交");
               this.maskShow=false;
                return;
            }
        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
   
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
    }, 
    beforeDestroy() {
        clearInterval(this.timer);        
        this.timer = null;
    }   
}
</script>
<style scoped>
/*   */
@import '../../lib/css/order.css';
.t_orter span{
    font-size: .6rem;
    float: right;
    font-family:'SourceHanSerifSC-Light';
    
}
.num{
  position: absolute; 
  right: .24rem;
  top:.5rem;
}
.num span{
  display: inline-block;
  width: .5rem;
  height: .5rem;
  float: left;
  text-align: center;
  line-height: .5rem; 
  font-size:.32rem;
  position: relative;
} 
.num span img{
    width: .25rem;
}
</style>
