<template>
<div id="order">
    <div class="top">
        <div class="top-left" @click="returns(goodId)" style="z-index:4; width:4%;"><img src="../../lib/img/ios/baifanhui@3x.png" alt=""></div>
        <div class="top-right">确认订单</div>
    </div>
   <div class="back-color"></div>
   <div class="address">
      <div class="landing" v-if="dizhi">
           <div class="lnd mrs"><span class="mr">默认</span> </div>
           <div class="lnd adr" @click="pushdeladd()" v-if="orderaddress==''"> <span class="adres">请选择地址</span><div class="tel">Carl <span>暂无数据</span></div></div>
           <div class="lnd adr" @click="pushdeladd()" v-else> <span class="adres">{{orderaddress.province}}{{orderaddress.city}}{{orderaddress.area}}{{orderaddress.detailedAddress}} </span><div class="tel">Carl <span>{{orderaddress.personTel}}</span></div></div>
            <div class="lnd land-right" @click="pushdeladd()"><span>编辑</span><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></div>
       </div>
        <div class="landing" v-else>
           <div class="lnd mrs"><span class="mr">默认</span> </div>
           <div class="lnd adr" @click="pushdeladd()" v-if="orderaddress==''"> <span class="adres">请选择地址</span><div class="tel">Carl <span>暂无数据OK</span></div></div>
           <div class="lnd adr" @click="pushdeladd()" v-else> <span class="adres">{{orderaddress.province}}{{orderaddress.city}}{{orderaddress.area}}{{orderaddress.detailedAddress}} </span><div class="tel">Carl <span>{{orderaddress.personTel}}</span></div></div>
            <div class="lnd land-right" @click="pushdeladd()"><span>编辑</span><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></div>
       </div>
   </div>
   <div class="order-d" id="dddor">订单详情<span> <small>/</small> DETAIL</span></div>
   <div class="dels">
       <div class="order-list" v-for="(list,index) in accountCart" :key="index">
            <div class="tu"><div class="tu-img"><img :src="'http://app.hzhlsy.net/'+list.goodImg" @click="delimg(list.goodId)" alt=""></div></div>
            <div class="y-name">{{list.goodTitle}}</div>
            <div class="y-price">￥<span>{{list.goodUnitPrice}}</span></div>
       </div>
       <div class="lists" style="height:6rem;width:100%;margin-top:.2rem;padding-left:.25rem;padding-right:.25rem;">
            <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">购买数量</div>
                <div class="count" style=" width:60%;text-align:right; line-height:1.47rem;font-size:.3rem;color:#939393;" >{{sums}}件</div>
                <!-- <div class="count" style=" width:60%;text-align:right; line-height:1.47rem;font-size:.24rem;color:#939393;" >{{sums}}件</div> -->
                <div class="r-count" style=" width:9%;"><img src="../../lib/img/ios/fanhuiright@3x.png" alt="" style="width:.18rem;height:.33rem;float:right;margin-top:.52rem;"></div>
            </div>

            <!-- <router-link to="/coupon"> -->
            <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;" v-if="isCoupon==0">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">优惠券</div>
                <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;"  v-if="isCoupon==0">您的优惠劵数量为0</div>
            </div>
            <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;" v-if="isCoupon==2">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">优惠券</div>
                <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;"  v-if="isCoupon==2">还差{{balance}}可使用优惠</div>
            </div>
            <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;" @click="turn" v-if="isCoupon==1&&icp==1">
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">优惠券</div>
                <!-- <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;"  v-if="isCouppon!=1">{{ycount}}张优惠券可用</div> -->
                <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;" v-if="icp==1">-￥{{reduction.money}}</div>
            </div>
             <div class="lis" style="height:1.47rem;width:100%;border-bottom:1px solid #E8E8E8;" @click="turn" v-else>
                <div class="l-count" style=" width:30%; line-height:1.47rem;font-size:.32rem;color:#313131;">优惠券</div>
                <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;"  v-if="isCouppon!=1">{{ycount}}张优惠券可用</div>
                <!-- <div class="r-count" style=" width:69%; line-height:1.47rem;text-align:right;color:#C5161C;font-size:.3rem;letter-spacing:1px;" v-else-if="icp==1">-￥{{reduction.money}}</div> -->
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
               <div class="bottom-con-left" >合计:￥<span>{{prisum}}</span> </div>
               <div class="bottom-con-right" @click="qianwang" :disabled="isDisable">结算</div>
           </div>
       </div>
      </div>
    </div>
    <!--  alipayWap: 后台接口返回的form 片段-->
</template>
<script>
import Axios from "../../lib/js/sum.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf'
import {Pingf} from '../../lib/js/pingfang.ttf'
import {Toast} from 'mint-ui'

export default {
    inject:['reload'],
    data(){
        return{
            //
           token:localStorage.getItem('token'),
           address:[],
           orderaddress:[],
            // 购物车id数组
            cartid:localStorage.getItem('caid'),
            accountCart:[],
            sums:'',
            count:0,
            addressid:this.$route.params.id,
            priceas:0,
            as:[],
            total:0,
            goodId:[],
            couponNumber:0,
            // goodSpecPriceId:this.$route.params.goodSpecId,
            totalMoney:0,
            note:[],
            price:0,
            orderno:[],
            tol:'',
            as:0,
            name:'',
            resulturl:'',
            alipayWap:[],
            freight:0,
            prisum:0,
            isDisable:true,//表单重复提交
            pass:false,
            dizhi:true,
            ycount:this.$route.params.count,
            isCouppon:'',
            isBaoYou:'',
            reduction:'',
            regins:[],
            procity:'',
            isCoupon:'',
            cartlistid:this.$route.params.id,
            addresslist:[],
            icp:sessionStorage.getItem('selectyh'),
            cartisd:'',
            balance:'',
            selectyh:localStorage.getItem('selectyh'),
            defaultId:''
        }
    },

    created(){
      this.getId()
        this.sumstr();
        this.getcou();
        // this.getaddress();
        // this.getaddressid();
        this.shu();
        this.getregion();
        this.getCartlist();
    },
     mounted(){
         console.log(this.isBaoYou+'判断');
         console.log(this.cartlistid+'购物车id');
        let Base64 = require('js-base64').Base64;
            if(this.icp==null){
                this.isCouppon=''
            }else{
                this.isCouppon=this.icp;
            }
         console.log(localStorage.getItem('goodSpecPriceId')+"数据");
    },
    methods:{
      //获取地址栏id
      getId(){
          var token=this.token;
          var url=`freeter-api/address/api/defaultAddress?token=${token}`;
          this.$http.post(url).then(res=>{
            console.log(res,"jjjjjjj")
              if(res.body.code==0){
                if(res.body.defaultAddress.id !=''&& res.body.defaultAddress.id !=null && res.body.defaultAddress.id != undefined){
                  this.defaultId=res.body.defaultAddress.id;
                  this.getaddressid()
                }else{
                  Toast('用户地址不能为空');
                }

              }
          })
      },
        qianwang(){

            if(this.cartisd==undefined||this.cartisd==''||this.cartisd==null){
                Toast('用户地址不能为空');
            }else{
                this.getaddorder();
            }

        },
        // 判断是否满三百
        turn(){
            this.$router.push({name:'coupon'});
        },
        // 折扣卷详情接口
        getcou(){
            var url='freeter-api/coupon/select';
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.reduction=res.body.couponEntity;
                }else if(res.body.code==500){Toast(res.body.msg);}
            })
        },
        // 优惠券数量
        shu(){
           var url='freeter-api/coupon/couponNumber?token='+this.token;
           this.$http.post(url).then(res=>{
               if(res.body.code==0){
                   this.ycount=res.body.couponNumber;
               }else if(res.body.code==500){Toast(res.body.msg);}
           })
        },
           setMaskShow(){
                let tol=this.tol;
                let orderNo=this.as;
                let ordername=this.name;
                this.$router.push({name:'choice',params:{tol,orderNo,ordername}});
            },

            // 返回
            returns(){
                this.$router.push('/cartdemo');
                localStorage.removeItem('sums');
                localStorage.removeItem('sum');
                localStorage.removeItem('fri');
                localStorage.removeItem('priceas');
                localStorage.removeItem('caid');
            },
             // 获取对应地址
            getaddressid(){
                var token=this.token;
                var defaultId = this.defaultId;
                var id=localStorage.getItem('notdesid');
                console.log(1,"nnnnnnnnnnnnnnnnnnnnnnnnn")
                console.log(id,'5555555555555555555555555555555')
                if(defaultId == '' && defaultId != id && id != null &&id !=''){
                  var url=`freeter-api/address/api/info?token=${token}&id=${id}`;
                }else{
                  var url=`freeter-api/address/api/info?token=${token}&id=${defaultId}`;
                }
                this.$http.post(url).then(res=>{
                  console.log(url,"000000000000000000000")
                  console.log(res,"kkkkkkkkkkkkkkkkkkkkkkkkkkk")
                    if(res.body.code==0){
                         this.orderaddress=res.body.address;
                         this.addressid=res.body.address.id;
                         this.city=res.body.address.province;
                         this.dizhi=false;
                         var c=this.city
                         this.regins.forEach(v => {
                            if(v == c) {
                                return this.isBaoYou = 1
                            }else if(v != c){
                                return
                            }
                        });
                       this.getCart();
                    }else if(res.body.code==500){Toast(res.body.msg );}
                })
            },
        //    判断地址
           getregion(){
            var city=this.city;
            var url='freeter-api/coupon/despatchMoney';
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.regins=res.body.provinces;
                }else if(res.body.code==500){Toast(res.body.msg );}
            })
        },
         // 购物车数据
            getCartlist(){
                var token=this.token;
                var cartid=this.cartlistid;
                var isCouppon=this.isCouppon;
                if(cartid==undefined){
                   var cartid=localStorage.getItem('caid');
                   console.log(cartid+'购物车id');
                   var url=`freeter-api/cart/accountCart?token=${token}&cartIds=${cartid}&isDiscount=${isCouppon}&addressId=${0}`;
                   this.cartiddel(url);
                }else{
                // var addressid=localStorage.getItem('notdesid');
                var url=`freeter-api/cart/accountCart?token=${token}&cartIds=${cartid}&isDiscount=${isCouppon}&addressId=${0}`;
                 this.cartiddel(url);
                }
            },
            cartiddel(url){
                this.$http.post(url).then(res=>{
                    // console.log(res,"ffffffffffffffffff");
                    if(res.body.code==0){
                        this.orderaddress=res.body.accountCart.address;
                         console.log(this.orderaddress+'购物车默认地址');
                        this.cartisd=res.body.accountCart.address.id;
                        this.accountCart=res.body.accountCart.cartModelList;
                        this.prisum=res.body.accountCart.totalAmount;
                        this.couponNumber=res.body.accountCart.couponNumber;
                        this.freight=res.body.accountCart.pageKeyword;
                        this.isCoupon=res.body.accountCart.isCoupon;
                        this.balance=res.body.accountCart.balance;
                        localStorage.setItem('prisum',this.prisum);
                        sessionStorage.setItem('product',JSON.stringify(this.accountCart));
                        this.sums=res.body.accountCart.goodCount;
                        // this.accountCart.forEach(count=>{
                        //     this.sums +=  count.goodCount ;//计算数量总和
                        //     sessionStorage.setItem('sumsorder',this.sums);
                        //     //  location.reload();
                        //     this.goodId=count.goodId;
                        // });
                    }
                    // else if(res.body.code==500){Toast(res.body.msg+'4444444444');}
                })
            },
            // 购物车
            getCart(){
              console.log("nononoo")
                var token=this.token;
                var cartid=localStorage.getItem('caid');
                var isCouppon=this.isCouppon;
                var addressid=localStorage.getItem('notdesid');
                var defaultId = this.defaultId;
                if(defaultId != addressid && addressid != ''&& addressid !=undefined && addressid != null){
                 var url=`freeter-api/cart/accountCart?token=${token}&cartIds=${cartid}&isDiscount=${isCouppon}&addressId=${addressid}`;
                }else{
                  var url=`freeter-api/cart/accountCart?token=${token}&cartIds=${cartid}&isDiscount=${isCouppon}&addressId=${defaultId}`;
                }

                this.$http.post(url).then(res=>{
                    console.log(url);
                    console.log(res,"1111111111111111222222222")
                    if(res.body.code==0){
                        this.orderaddress=res.body.accountCart.address;
                        console.log(this.orderaddress+'购物车默认地址');
                        this.accountCart=res.body.accountCart.cartModelList;
                        this.prisum=res.body.accountCart.totalAmount;
                        this.couponNumber=res.body.accountCart.couponNumber;
                        this.freight=res.body.accountCart.pageKeyword;
                        this.isCoupon=res.body.accountCart.isCoupon;
                        this.sums=res.body.accountCart.goodCount;
                        this.balance=res.body.accountCart.balance;
                        localStorage.setItem('prisum',this.prisum);
                        sessionStorage.setItem('product',JSON.stringify(this.accountCart));
                        // this.accountCart.forEach(count=>{
                        //     this.sums +=  count.goodCount ;//计算数量总和
                        //     sessionStorage.setItem('sums',this.sums);
                        //     //  location.reload();
                        //     this.goodId=count.goodId;
                        // });
                    }else if(res.body.code==500){Toast(res.body.msg+'3333333333' );}
                })
            },
            sumstr(){
                this.accountCart=JSON.parse(sessionStorage.getItem('product'));
                this.prisum=localStorage.getItem('prisum');
            },
            // 储存购物车传的信息
            pushdeladd(){
                this.dizhi=false;
                this.priceas=localStorage.setItem('priceas',JSON.stringify(this.priceas));
                this.$router.push('/take');
            },

        // 结算
        getaddorder(){
            var token=this.token;
            var goodId=this.goodId;
            var goodSpecPriceId=localStorage.getItem('goodSpecPriceId');
            // var addressId=this.cartisd;
            var type=localStorage.getItem('caid');
            var note=this.note;
            var isCoupon=this.isCouppon;
            var defaultId = this.defaultId;
            console.log(defaultId,"iiiiiiiiiii")
            var addressId=localStorage.getItem('notdesid');
            if(defaultId != addressId && addressId != ''&& addressId != undefined && addressId !=null){
              var url=`freeter-api/order/addOrder?token=${token}&goodId=${goodId}&goodSpecPriceId=${goodSpecPriceId}&addressId=${addressId}&type=${type}&note=${note}&isCoupon=${isCoupon}&number=0`;
            }else{
              var url=`freeter-api/order/addOrder?token=${token}&goodId=${goodId}&goodSpecPriceId=${goodSpecPriceId}&addressId=${defaultId}&type=${type}&note=${note}&isCoupon=${isCoupon}&number=0`;
            }
            if(token==''||addressId==''||defaultId==''){
                Toast('请稍后再试');
            }else{
                this.$http.post(url).then(res=>{
                  // console.log(url,"hhhhhhhhh")
                  console.log(res)
                    if(res.body.code==0){
                        this.orderno=res.body.orderNo;
                        this.tol=res.body.orderNo.totalMoney;
                        this.as=res.body.orderNo.orderNo;
                        this.name=res.body.orderNo.orderName;
                        sessionStorage.setItem('tol',this.tol);
                        sessionStorage.setItem('name',this.name);
                        sessionStorage.setItem('order',this.as);
                        this.setMaskShow();
                    }else if(res.body.code==500){
                        Toast(res.body.msg );

                    }
                })
            }
            // this.$router.push('/payment');
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
}
</script>
<style scoped>
 @import '../../lib/css/order.css';
 .t_orter span{
    font-size: .6rem;
    float: right;
    font-family:'SourceHanSerifSC-Light';
}
</style>
