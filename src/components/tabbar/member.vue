<template>
    <div id="mber">
      <div class="top" style="width:100%;height:3.17rem;background:#FFFFFF;">
          <div class="tops top-left"> 
              <div class="name-img" >
                   <router-link to="/personal">
                    <div class="m imgs"> 
                        <img :src="'http://app.hzhlsy.net/'+info.picImg" :onerror="logo"> 
                    </div>
                    </router-link>
                  <div class="m name-member">
                      <div class="member-name">{{info.userName}}</div>
                      <div class="ifmember">
                       
                      <div class="if-right">{{userinfo}}</div>
                      <div class="if-left">
                          <div class="z"></div>
                      </div>
                  </div>
                  </div>
                   
              </div>
              <div class="back-color"></div>
          </div>
          <div class="tops top-rights">
              <router-link to="/newtake">
              <div class="dizhi-img">
                  <img src="../../lib/img/ios/weizhidingwei@3x.png" alt="">
              </div>
              <div class="dizhi-title">收货地址</div>
              </router-link>
          </div>
      </div>
      <div class="me">
            <div class="me-con">
                <div class="mes mes-a" style="color:#313131;">
                    <router-link to="/integral" style="color:#313131;">
                    <span><img src="../../lib/img/ios/jifen@3x.png" alt=""><div>我的积分</div></span>
                    </router-link>
                </div>
                <div class="mes mes-b">
                    <router-link to="/borlist" style="color:#313131;">
                    <img src="../../lib/img/ios/jingxiaoshang@3x.png" alt="">
                    <div>我的合伙人</div></router-link>
                </div>
                <div class="mes mes-c">
                    <router-link to="/ber" style="color:#313131;">
                    <img src="../../lib/img/ios/xing@3x.png" alt="">
                    <div>我的收藏</div>
                    </router-link>
                </div>
            </div>
      </div>
      <div class="order">
          <router-link to="/whole">
          <div class="whole">
              全部订单<span style="float:right;"><img src="../../lib/img/ios/fanhuiyou@3x.png" style="width:.14rem;height:.26rem;" alt=""></span>
          </div>
          </router-link>
          <div class="total" style=" ">
              <router-link to="/stay">
              <div class="tol" style="">
                  <span style="width:100%;"><img src="../../lib/img/ios/fukuan@3x.png" alt=""></span>
                  <div class="tol-a">待付款</div>    
              </div>
              </router-link>
              <router-link to="/staya">
              <div class="tol" style="">
                  <span>
                      <img src="../../lib/img/ios/fahuo@3x.png" alt="">
                  </span>
                  <div class="tol-a">待发货</div>
              </div>
              </router-link>
               <router-link to="/already">
              <div class="tol" style="">
                  <span>
                      <img src="../../lib/img/ios/queren@3x.png" alt="">
                  </span>
                  <div class="tol-b">已确认</div>
              </div>    
              </router-link>
               <!-- <router-link to="/sale"> -->
              <div class="tol" style="">
                  <span>
                      <img src="../../lib/img/ios/shouhou@3x.png" alt="">
                  </span>
                  <div class="tol-d">售后/退货</div>
              </div>
              <!-- </router-link> -->
          </div>
      </div>
      <div style="height:0.18rem;background:#F5F5F5;"></div>
      <div class="gather">
          <ul><router-link to="/preferential"><li class="bor" style="">我的优惠券<span style="float:right;"><img src="../../lib/img/ios/fanhuiyou@3x.png" style="width:.14rem;height:.26rem;" alt=""></span></li></router-link>
              <router-link to="/life"><li class="bor" style="">生活馆<span style="float:right;"><img src="../../lib/img/ios/fanhuiyou@3x.png" style="width:.14rem;height:.26rem;" alt=""></span></li></router-link>
              <router-link to="/codelist"><li class="bor" style="">我的邀请码<span style="float:right;"><img src="../../lib/img/ios/fanhuiyou@3x.png" style="width:.14rem;height:.26rem;" alt=""></span></li></router-link>
              <!-- <li class="bor">帮助<span style="float:right;"><img src="../../lib/img/ios/fanhuiyou@3x.png" style="width:.14rem;height:.26rem;" alt=""></span></li>
              <li class="bor">意见反馈<span style="float:right;"><img src="../../lib/img/ios/fanhuiyou@3x.png" style="width:.14rem;height:.26rem;" alt=""></span></li> -->
              <router-link to="/setup"><li class="bor">设置<span style="float:right;"><img src="../../lib/img/ios/fanhuiyou@3x.png" style="width:.14rem;height:.26rem;" alt=""></span></li></router-link>
              <router-link to="/agreement"><li class="bor">用户协议<span style="float:right;"><img src="../../lib/img/ios/fanhuiyou@3x.png" style="width:.14rem;height:.26rem;" alt=""></span></li></router-link>
          </ul>
      </div>
      <div id="bottom">
        <ul>
            <router-link to="/home">
            <li class="li-a"><img src="../../lib/img/ios/shouyea@3x.png" alt=""><div class="bot-n">首页</div></li>
            </router-link>
            <router-link to="/desc">
            <li class="li-b"><img src="../../lib/img/ios/faxiana@3x.png" alt=""><div class="bot-n">活动</div></li>
            </router-link>
            <router-link to="/cartdemo">
            <li class="li-c"><img src="../../lib/img/ios/gouwuchea@3x.png" alt=""><div class="bot-n">购物车</div></li>
            </router-link>
            <router-link to="/member">
            <li class="li-d"><img src="../../lib/img/ios/huiyuanb@3x.png" alt=""><div class="bot-n"  style="color:#313131;">会员中心</div></li>
            </router-link>
        </ul>
    </div>
 </div> 
</template>
<script>
import {Toast} from "mint-ui";
import {Rem} from "../../lib/js/rem.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf' 
export default{ 
    data(){
        return{
            unameval:"",
            upwdval:"",
            info:[],
            effective:localStorage.getItem('effective'),
            token:localStorage.getItem('token'),
            userinfo:'',
            logo: 'this.src="' + require('../../lib/img/ios/user20190727140338.png') + '"'  
        }
    }, 
    created(){
        this.getInfo();
        this.iftoken();
    },
    methods:{ 
      getInfo(){  
          var url="freeter-api/user/userinfo?token="+this.token;
          this.$http.post(url).then(result=>{ 
              if(result.body.code==0){
                 this.info=result.body.userinfo;
                 var user=result.body.userinfo.userType; 
                 if(user==1){
                     this.userinfo="会员"; 
                 }else if(user==0){
                      this.userinfo="普通"; 
                 } 
              }else if(result.body.code==500){
                 Toast(res.body.msg);
                 this.$router.push('/land');
              } 
          }) 
          localStorage.removeItem('notorder');
          localStorage.removeItem('isActive');
      },
      iftoken(){
        var url="freeter-api/user/userinfo?token="+this.token;
        this.$http.post(url).then(res=>{
            if(res.body.code==500){
                 Toast(res.body.msg);
                 localStorage.removeItem('token');
                 this.$router.push('/land');
            }
        })
      },  
    }
} 

</script>
<style scoped>
#mber{
    margin-bottom: 1.3rem;
}
#mber .top{
    padding-right: 0;
}
#mber .top .tops{
    width: 50%;
    height: 3.17rem;
    float: left;
}
#mber .top .top-left{ 
    height: 3.17rem; 
    position: relative;
}
#mber .top .top-left .name-img{
    width: 100%;
    height: 1.3rem; 
    position: absolute;
    bottom: 1.1rem;     
}
#mber .top .top-left .name-img .m{
    float: left;
}
#mber .top .top-left .name-img .imgs{
    width: 35%;
    height: 1.3rem; 
    border-radius: 50%;
    background:#F0F0F0;
    z-index: 8; 
    position: absolute;
    left: .25rem; 
}
#mber .top .top-left .name-img .imgs img{
    width:1.3rem;
    height:1.3rem;
    border-radius: 50%;
    margin-top: 0;
}
#mber .top .top-left .name-img .name-member{
    width: 58%;
    height: 1.3rem;
    float: right;
    padding-left: .23rem; 
}
#mber .top .top-left .name-img .name-member .member-name{
    color: #CA2425;
    font-size: .38rem;
    /* margin-top: .15rem; */
    padding-left: .2rem;
    font-family: PingFangSC-Semibold, sans-serif;
}
#mber .top .top-left .name-img .ifmember{
    height: .58rem; 
    position: absolute;
    bottom: 0;
    padding-top: .09rem;    
}
#mber .top .top-left .name-img .ifmember .if-left{
    width: .58rem;
    height: .58rem;
    background: #FFBF4F;
    border-radius: 50%;
    padding-top: .08rem;
    float: left;
    margin-top: -.5rem;
}
#mber .top .top-left .name-img .ifmember .if-left .z{
    width: .42rem;
    height: .42rem;
    margin:auto;
    background: #F8AB46;
    border-radius: 50%;
    margin-left: .08rem;
}
#mber .top .top-left .name-img .ifmember .if-right{
    width: 1.49rem;
    height: .4rem;
    line-height: .4rem;
    background: #636363;
    font-size: .24rem;
    color: #ffffff;
    text-align: center;
    margin-left: .3rem;
    padding-left: .32rem; 
    padding-left: .2rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family:"SourceHanSerifSC-Light";
}
#mber .top .top-left .back-color{
    width: .67rem;
    height: .67rem;
    background: #F18662;
    border-radius: 50%;
    position: absolute;
    left: .05rem;
    box-shadow: 3px 0px 5px 5px #F18662 ;
    bottom: .7rem;
    z-index: 3;
}
#mber .top .top-rights{
    height: 3.17rem; 
    background-image: url(../../lib/img/ios/dizhibeijing@2x.png);
    background-size: 2.25rem 2.25rem;
    background-repeat: no-repeat;
    background-position:1.9rem .3rem;
    position: relative; 
}
#mber .top .top-rights .dizhi-img{
    width: .43rem;
    height: .61rem; 
    position: absolute;
    top: .92rem;
    right: .56rem;
}
#mber .top .top-rights .dizhi-img img{
    width: 100%;
    height: 100%;
}
#mber .top .top-rights .dizhi-title{
   color: #ffffff;
   font-size: .24rem;
   font-family:"SourceHanSerifSC-Light";
   position: absolute;
   bottom: .9rem;
   right: .25rem;
}
 
#mber .me{
    height: 2.4rem;
    background:#F5F5F5;
    padding-top: .2rem;
    padding-left: .24rem;
    padding-right: .24rem;
}
#mber .me .me-con{
    height: 2rem;  
    /* padding: .2rem;     */
}
#mber .me .me-con .mes{
    width: 2.18rem;
    height: 2rem;
    background: #ffffff;
    float: left;
    text-align: center;
    padding-top:.5rem;
} 
#mber .me .me-con .mes img{
    width: .55rem;
    height: 0.55rem;
}
#mber .me .me-con .mes div{
    font-size: .24rem;
    font-family:"Source Han Sans CN";
}
#mber .me .me-con .mes-a,.mes-b{
    margin-right: 0.24rem;
}
#mber .order{
    height: 3rem;   
    padding-left: .2rem;
    padding-right: .2rem;
    background: #ffffff;
}
#mber .order .whole{
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: .32rem;
    padding-left: .15rem;
    color: #313131;
    font-family:"Source Han Sans CN";
    border-bottom: 1px solid #E5E5E5;
}
#mber .order .total .tol{
    width: 25%;
    float: left;
    height: 1.9rem;
    text-align:center;
}
#mber .order .total .tol span{
    width: .5rem;
    height: .4rem;
    margin:auto;
}
#mber .order .total .tol span img{
    width: .5rem;
    margin-top: .58rem;
    /* height: .4rem;  */
}
#mber .order .total .tol div{
    color: #313131;
    font-size: .28rem;
    font-family:"Source Han Sans CN";
}
#mber .order .total .tol .tol-a{
    margin-top: .1rem;
}
#mber .order .total .tol .tol-b{
    /* margin-top: .07rem; */
}
#mber .order .total .tol .tol-d{
    margin-top: .03rem;
}
#mber .gather{
    padding-left: .2rem;
    padding-right: .2rem;
    background: #ffffff;    
}
#mber .gather ul li{
    height: 1.1rem;
    /* padding-top: .45rem; */
    line-height: 1.1rem; 
}
#mber .gather ul .bor{
    font-size: .32rem;
    color: #313131;
    border-bottom: 1px solid #E5E5E5;
}
li:first-child{border-bottom:none;}
</style>
