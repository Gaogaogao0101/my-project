<template>
<div class="yindao" style="height:100%;">
 <span style="display:block;width:100%;height:100%;background:red;position:fixed;top:0;"> 
        <mt-swipe :show-indicators="false" :auto="0" :continuous='false'>  
            <mt-swipe-item  class="banner"  >
                <img src="../../lib/img/ios/daoyin_03.png" style="width:100%;height:100%;" alt="">
            </mt-swipe-item> 
            <mt-swipe-item  class="banner"  >
                <img src="../../lib/img/ios/daoyina_05.png" style="width:100%;height:100%;" alt="">
            </mt-swipe-item> 
            <mt-swipe-item  class="banner"  >
                <img src="../../lib/img/ios/daoyins_03.png" @click="qidong" style="width:100%;height:100%;" alt="">
            </mt-swipe-item> 
        </mt-swipe>  
 </span>
</div>
  <!-- <div class="swiper-container"> -->
    <!-- <div class="swiper-wrapper">
      <div class="swiper-slide swiper-slidea" > 
        <img src="../../lib/img/ios/daoyin_03.png" style="width:100%;height:100%;" alt=""> -->
        <!-- <div id="guide-a" style=" background:#7B0003; " ref="qwcontent" > -->
               <!-- <div class="top">
                    <div class="a-left">
                        <div class="top-dian">
                            <img src="../../lib/img/ios/guide_threepoints.png" alt="">
                        </div>
                        <div class="bot-left">
                            <img src="../../lib/img/ios/guide_count.png" alt="">
                        </div>
                    </div>
                    <div class="a-right">
                        <div class="con-logo">
                            <img src="../../lib/img/ios/guide_logo@2x.png" alt="">
                        </div>
                    </div>
               </div>
               <div class="con">
                  <div class="con-img">
                        <img src="../../lib/img/ios/guide_zhuweniz@2x.png" alt="">
                  </div> 
               </div>
               <div class="bot">
                   <img src="../../lib/img/ios/guide_tua@2x.png" alt="">
               </div>
           </div>
            <span id="testbtn" style="display:none"></span>
        </div>
          <div class="p-dian">  
          <div class="pagenumber">  -->
                <!-- <div style="background:#fff;"></div>
                <div></div>
                <div></div>  -->
                <!-- <ul>
                  <li style=" background: #fff;"></li>
                  <li></li>
                  <li></li>
                </ul> -->
          <!-- </div> -->
      <!-- </div> 
      <div class="swiper-slide"> 
        <img src="../../lib/img/ios/daoyina_05.png" style="width:100%;height:100%;" alt=""> -->
        <!-- <div id="guide-b" style="background: #047A02;height:100%;" ref="qwcontent" >
               <div class="top-logo">
                   <img src="../../lib/img/ios/guide_logo@2x.png" alt="">
               </div>
               <div class="con-lefa">
                   <img src="../../lib/img/ios/guide_leaf.png" alt="">
               </div>
               <div class="con-written">
                   <img src="../../lib/img/ios/guide_wenzi@2x.png" alt="">
               </div>
               <div class="right-can">
                   <img src="../../lib/img/ios/guide_silkworm.png" alt="">
               </div>
           </div>
            <div class="p-dian">  
          <div class="pagenumber">  -->
                <!-- <div style="background:#fff;"></div>
                <div></div>
                <div></div>  -->
                <!-- <ul>
                  <li></li>
                  <li style=" background: #fff;"></li>
                  <li></li>
                </ul>
          </div>
      </div>  -->
      <!-- </div>
      <div class="swiper-slide" style="background: #00487B;height:100%;" >  
        <img src="../../lib/img/ios/daoyins_03.png" style="width:100%;height:100%;" @click="qidong" alt=""> -->
         <!-- <div id="guide-c" ref="qwcontent"  >
                <div class="top-logo">
                    <img src="../../lib/img/ios/guide_logo@2x.png" alt="">
                </div>
                <div class="top-logos">
                    <img src="../../lib/img/ios/guide_wen@2x.png" alt="">
                </div>
                <div class="con-map">
                    <img src="../../lib/img/ios/guide_map.png" alt="">
                </div>
                <div class="buts" @click="qidong">启动</div>
            </div> -->
         <!-- <div class="qidongbtn" >启动</div>  -->
          <!-- <div class="p-dian">  
          <div class="pagenumber">  -->
                <!-- <div style="background:#fff;"></div>
                <div></div>
                <div></div>  -->
                <!-- <ul>
                  <li></li>
                  <li></li>
                  <li style=" background: #fff;"></li>
                </ul>
          </div> -->
      <!-- </div>  -->
        <!-- </div> 
        
    </div> -->
    <!-- Add Pagination -->
    <!-- <div class="swiper-pagination"></div> -->
  <!-- </div> -->
</template>
<script>  
import { Swipe, SwipeItem } from 'mint-ui'; 
// import Swiper from '../../../node_modules/swiper/dist/js/swiper'
export default { 
  data() {
    return { 
    }
  }, 
  mounted(){ 
    // var mySwiper = new Swiper ('.swiper-container', {
    //       loop: false, 
    // })   
  },
  methods:{ 
    qidong(){ 
       this.$router.push('/home');
    },

  },  
}  
</script>
<style scoped>
.qidongbtn{
  width:2.75rem;
  height:.5rem;
  line-height: .2rem;
  border: none; 
  background: #FFFFFF;
  position: fixed;
  bottom: 2.75rem;
  border-top-left-radius: .5rem;
  border-bottom-left-radius: .5rem;
  color: #313131;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slidea{
  background:#7B0003; 
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  /* background: #fff; */ 
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
/*  
@media screen and (min-width: 320px) {
    .swiper-container {
        width: 100%;
        height:480px; 
         overflow: hidden ;
        }
}
@media screen and (min-width: 360px) and (max-width: 360px) {
    .swiper-container {
        width: 100%;
        height:640px; 
         overflow: hidden ;
    }
}
@media screen and (min-width: 320px) and (max-width: 400px){
    .swiper-container {
        width: 100%;
        height:568px;
        overflow: hidden ;
        }
}
@media screen and (min-width: 359px) and (max-width: 374px){
    .swiper-container {
        width: 100%;
        height:640px; 
        overflow: hidden ;
        }
}
@media screen and (min-width:375px) and (height:667px) {
    .swiper-container {
        width: 100%;
        height:667px;  
        overflow: hidden ;
        }
}
 @media only screen and (min-height: 812px){
     .swiper-container {
        width: 100%;
        height:812px; 
        overflow: hidden ;
        }
 }
 @media screen and (min-width:737px) and (max-width:813px){
     .swiper-container{
         width: 100%;
         height: 812px;
     }
 }
@media screen and (min-width:400px) and (max-width: 412px) {
    .swiper-container {
        width: 100%;
        height:731px; 
        overflow: hidden ;
        }
}
@media screen and (min-width: 413px) and (max-width: 459px) {
    .swiper-container {
        width: 100%;
        height:736px; 
        overflow: hidden ;
        }
}
@media screen and (min-width:500px) and (max-width:600px){
    .swiper-container {
        width: 100%;
        height:960px; 
        overflow: hidden ;
        }
} 
@media screen and (min-width:384px) and (max-width:385px){
    .swiper-container {
        width: 100%;
        height:640px; 
        overflow: hidden ;
        }
}
    @media screen and (max-width:361px){
    .swiper-container {
        width: 100%;
        height:640px; 
        overflow: hidden ;
    } 
}
@media only screen and (min-width:241px) and (max-width:360px){
    .swiper-container {
        width: 100%;
        height:567px !important;
        overflow: hidden ; 
    } 
}
@media screen and (min-width: 460px){
        .swiper-container {
        width: 100%;
        height:667px; 
        overflow: hidden ;
        }
} 
@media screen and (min-width: 375px) and (min-height: 812px){
        .swiper-container {
        width: 100%;
        height:812px; 
         overflow: hidden ;
        }
        .qidongbtn{
        width:2.75rem;
        height:.8rem;
        border: none; 
        background: #FFFFFF;
        position: fixed;
        bottom: 3.3rem;
        border-top-left-radius: .5rem;
        border-bottom-left-radius: .5rem;
        color: #313131;
        }
}  */

/*  */
/* @media only screen and (min-device-width: 393px) and (max-device-height: 818px) and (-webkit-device-pixel-ratio: 2.75) {
    .swiper-container {
        width: 393px;
        height:818px; 
         overflow: hidden ;
        }

} */
    /* 一 */
  html,body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    overflow: hidden;
    font-family: Arial;
    /* background: #000;     */
}
.container{ 
    width: 100%;
    height: 100%;
}
.viewport{
width: 300%;
height: 100%;
display: -webkit-box;
overflow: hidden;
/*pointer-events: none; 去掉这句话*/
transform: translate3d(0,0,0);
backface-visibility: hidden;
position: relative;
}
.p-dian{
    position: absolute;
    bottom:12%;
    left: 33%;
    width: 2.55rem; 
    height:.65rem;
    background: rgba(15,15,15,.1);
    border-top-right-radius: .1rem;
    border-top-left-radius: .1rem;
    border-bottom-left-radius: .1rem;
    border-bottom-right-radius: .1rem;
}
.pageview{
    -webkit-box-flex: 1;
    width: 0; 
}
.pagenumber{
    display: -webkit-box;
    margin: auto; 
    height:.25rem;
    width:1.5rem;
    margin-top: .23rem;
    /* background: rgba(250,26,26,.2); */
    
} 
.pagenumber ul li{
  width: .22rem;
  height:.22rem; 
  float: left;
  margin-left: .2rem;
  border-radius: 50%;
  border: 1px solid #fff;
}
.pagenumber div{
    -webkit-box-flex: 1;
    width:.22rem;
    height: .22rem;
    border-radius: 50%;
    /* margin-left: .1rem; */
    margin-right: .45rem; 
}
.pagenumber .now{
    width: .22rem;
    height: .22rem;
    border-radius: 50%;
}
.pagenumber .now:after {
    border-radius: 50%;
    background: rgba(255,255,255,1) !important;
}
.pagenumber div:after{
    content: "";
    width:.22rem;
    height:.22rem; 
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    margin-right: 1.5rem;
    position: absolute; 
    /* margin-top: -3px;
    margin-left: -3px; */
}
h3{
    text-align: center;
    font-family: Microsoft YaHei,Arial;
    color: #fff;
    font-size: 1.5em;
    font-weight: normal;
    padding: 1em 0;
    margin: 0;
}
button{
    width: 40%;
    margin: auto;
    height: 3em;
    background: #fff6de;
    line-height: 3rem;
    color: #000;
    padding: 0;
    border: none;
    display: block;
}
/* @media screen and (max-width: 360px) {
    html,body{font-size: 15px}
}
@media screen and (min-width: 360px) and (max-width: 400px) {
    html,body{font-size: 16px}
}
@media screen and (min-width: 400px) and (max-width: 460px) {
    html,body{font-size: 18px}
}
@media screen and (min-width: 460px){
    html,body{font-size: 24px}
}   */
#guide-a{
    width: 100%; 
    
}
#guide-a .top{
    width: 100%;
    height: 1.5rem;
     position: fixed;
    top: .45rem;
}
#guide-a .top .a-left{
    width: 50%;
    height: 100%; 
    float: left;
}
#guide-a .top .a-left .top-dian{
    margin-left: .37rem;
}
#guide-a .top .a-left .top-dian img{
    width: .38rem;
    height: .1rem; 
    float: left; 
}
#guide-a .top .a-left .bot-left{
    margin-top: .4rem;
    margin-left: .31rem;
}
#guide-a .top .a-left .bot-left img{
    width: .45rem;
    height: .8;
    float: left; 
}
#guide-a .top .a-right{
    width: 50%;
    height: 100%; 
    float: right;
}
#guide-a .top .a-right .con-logo{
    margin-top: .13rem;
    margin-right: .28rem;
    float: right;
}
#guide-a .top .a-right .con-logo img{
    width: 2.68rem;
    height: 1.35rem;
}
#guide-a .con{
  width: 100%;
  height: 5rem;
  position: absolute;
  top: 20%;
}
#guide-a .con-img{
    width: 5.7rem; 
    /* height: 4.1rem;  */
    margin: auto; 
    /* margin-top:1.6rem; */
}
#guide-a .con img{
    width: 100%;
}
#guide-a .bot{
    width: 100%; 
    position: absolute;
    bottom: .4rem;
}
#guide-a .bot img{
    width: 100%;
    /* height: 5.44rem; */
}
#guide-b{
    width: 100%; 
    height: 100%;
    position: relative;
}
#guide-b .top-logo{
    width: 100%;
    height: 1.6rem;
    margin-top: .41rem;
}
#guide-b .top-logo img{
    width: 2.72rem;
    height: 1.33rem;
    float: right;
    margin-right: .47rem;
}
#guide-b .con-lefa{ 
    margin-top:30%;
    padding-right: .42rem;
    background-image: url(../../lib/img/ios/guide_leaf.png);
    
}
#guide-b .con-lefa img{
    float: left;
    width: 100%;
}
#guide-b .con-written{
    position: absolute;
    top:15%;
    left: 1.3rem;
}
#guide-b .con-written img{
    width: 2.1rem; 
}
#guide-b .right-can{
    width: 2.1rem;
    height: 1.82rem;
    float: right;
    margin-top: -1rem;
    margin-right: .6rem;
}
#guide-b .right-can img{
    width: 100%;
}
/* #guide-c  */
#guide-c .top-logo{
    width: 100%;
    height: 1.33rem; 
    position: absolute;
    top: .45rem;
}
#guide-c .top-logo img{
    width: 2.72rem;
    height: 1.33rem;
    float: right;
    margin-right: .47rem;
}
#guide-c .top-logos{
    width: 100%;
    height: .9rem;
    position: absolute;
    top:2.2rem;
}
#guide-c .top-logos img{
    width: 3.04rem;
    float: right;
    margin-right: .55rem;
}
#guide-c .con-map{
    width: 100%;
}
#guide-c .con-map img{
    width: 100%;
}
#guide-c .buts{
    width: 3.02rem;
    height:.8rem;
    background: #fff;
    margin: auto;  
    color: #939393;
    text-align: center;
    line-height: .82rem;
    font-family: "SourceHanSerifSC-Light";
    font-size: .32rem;
    color: #313131;
    border-top-right-radius: .5rem;
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    position: absolute;
    bottom: 20%;
    left: 2.3rem;
}
</style>  


