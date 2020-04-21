<template>
    <div id="pref">
        <div class="top" style="z-index:4;position:fixed;top:0; width:100%;">
            <router-link to="/member"><div class="top-left"><img src="../../lib/img/ios/fanhui@3x.png" alt=""></div></router-link>
            <div class="top-right">我的优惠券</div>
        </div>
        <div class="coupons">
            <div class="count"><span style="width:18%;">共{{count}}张</span><small style="width:82%;"><img src="../../lib/img/ios/coupons-bor@3x.png" alt=""></small></div>
            <ul>
                <li v-for="index in count">
                    <div class="cou-left"><small>￥</small><span>{{reduction.money}}</span></div>
                    <div class="cou-right"> <p>抵扣券</p> <div class="mj">满{{reduction.fullMoney}}减{{reduction.money}}</div> <div class="use" @click="del">去使用</div> </div>
                </li>
                
            </ul>
        </div> 
    </div>
</template>
<script>
export default {
    data(){
        return{
           reduction:[],
           token:localStorage.getItem('token'),
           count:''
        }
    },
    created(){
        this.getcoupon();
        this.shu(); 
    },
    methods:{
        del(){
            this.$router.push('/homesa');
        },
        getcoupon(){
            var url='freeter-api/coupon/select';
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.reduction=res.body.couponEntity;  
                }
            })

        },
        shu(){
           var url='freeter-api/coupon/couponNumber?token='+this.token;
           this.$http.post(url).then(res=>{
               if(res.body.code==0){
                   this.count=res.body.couponNumber;
               }
           })
        },
        
    },
}
</script>
<style scoped>
@import '../../lib/css/top.css';
@import '../../lib/css/coupon.css';
#pref{
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
}
 
</style>