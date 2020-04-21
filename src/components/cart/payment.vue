<template>
  <div id="pay">
    <div class="top">
        <div class="til-left" @click="reutrns"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></div>
        <div class="til-con">支付成功</div> 
    </div>  
    <div class="pay-con">
        <div class="pay-con-img">
            <img src="../../lib/img/ios/zfcg_03.png" alt="">
        </div>
        <div class="paid">支付成功</div>
        <!-- <div class="pay-til">订单详情<small>/</small><span>DETAIL</span></div> -->
    </div> 
    <div class="bot-ret">
        <router-link to="/home">
        <div class="return">返回首页</div>
        </router-link>
    </div>
  </div>    
</template>
<script>
 

export default {
     data(){return{}},
    methods:{
        reutrns:function(){
            javascript:history.back(-1);
        }
    }  
}
</script>
<style scoped>
 
@import '../../lib/css/payment.css';
</style>
