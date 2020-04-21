<template>
    <div id="cou">
         <div class="top" style="z-index:4;position:fixed;top:0; width:100%;" @click="returns">
            <div class="top-left"><img src="../../lib/img/ios/fanhui@3x.png" alt=""></div> 
            <div class="top-right">选择优惠券</div>
        </div>
        <div class="coupons"> 
            <ul>
                <li v-for="(n,index) in count" :key="index">
                    <div class="cou-left"><small>￥</small><span>{{reduction.money}}</span></div>
                    <div class="cou-right" @click="selectcoupon(index)">
                        <p>抵扣券</p> <div class="mj">满{{reduction.fullMoney}}减{{reduction.money}}</div> 
                        <div class="uses"><img src="../../lib/img/ios/select-coupons@3x.png" alt=""></div> 
                    </div>
                </li>
                
            </ul>
        </div> 
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
           reduction:[],
           token:localStorage.getItem('token'),
           count:'',
           s:this.$route.params.s,
        }
    },
    created(){
        this.getcoupon();
        this.shu();
    },
    methods:{
        returns(){
            history.back();
            sessionStorage.removeItem('selectyh');
            sessionStorage.setItem('s',this.s);
        },
        selectcoupon(n){
            history.back(); 
            sessionStorage.setItem('selectyh',1); 
            localStorage.setItem('selectyh',1);
            sessionStorage.setItem('s',this.s);
        },
        getcoupon(){
            var url='freeter-api/coupon/select';
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.reduction=res.body.couponEntity; 
                    console.log(this.reduction)
                }else if(res.body.code==500){
                    Toast(res.body.msg)
                }
            })

        },
        shu(){
           var url='freeter-api/coupon/couponNumber?token='+this.token;
           this.$http.post(url).then(res=>{
               if(res.body.code==0){
                   this.count=res.body.couponNumber;
               }else if(res.body.code==500){
                    Toast(res.body.msg)
                }
           })
        },
    }
}
</script>
<style scoped>
@import '../../lib/css/top.css';
@import '../../lib/css/coupon.css';
#cou{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #ffffff;
}
.uses{
    position: absolute;
    top: 30px;
    right: 22px;
}
.uses img{
    width: 20px;
    height: 20px;
}
</style> 