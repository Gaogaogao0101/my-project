<template>
   <div id="land">
       <div class="land-top"><router-link to="/home"><span class="top-img"><img src="../../lib/img/ios/landicon@3x.png" alt=""></span></router-link>  登录</div>
       <div class="logo"><img src="../../lib/img/ios/index-logo-hlsyapp@3x.png" alt=""></div>
       <!-- <div class="account"></div> -->
       <div class="login_form">
        <div class="qxs"><input type="text"  class="qxs-ic_user qxs-icon"  placeholder="请输入账号" v-model="username"></div> 
        <div class="qxs qxseyes" v-if="esy"><input type="password"  class="qxs-ic_password qxs-icon"  placeholder="请输入密码" v-model="password"><img src="../../lib/img/ios/hideeyes@2x.png" @click="eays" alt=""></div>
        <div class="qxs qxseyes" v-else><input type="text"  class="qxs-ic_password qxs-icon"  placeholder="请输入密码" v-model="password" ><img src="../../lib/img/ios/hideeyes@2x.png" @click="eaysa" alt=""></div>       
      <div id="passwd"><router-link to="/forget">忘记密码</router-link></div>
      <button class="login_btn" @click="login"  type="primary">登录 <div class="jt"></div></button> 
    </div>
     
    <div class="go-login">没有账号？<router-link to="/login"> <span class="logins">去注册</span></router-link></div> 
   </div>    
</template>
<script>
import {Rem} from "../../lib/js/rem.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf'
import {Toast} from 'mint-ui'
import { mapMutations } from 'vuex';
// import '../../lib/js/cookie.js'
export default {
     data() {   
      return { 
        username: '',
        password: '', 
        userid:'',
        esy:true, 
      }
    }, 
    created () { 
        // this.$store.commit('changeLogin','100');
        // this.login();
    },
    computed: { 
      
    },
    methods: {
      // 眼睛
      eays(){
        this.esy=false;
      },
      eaysa(){
        this.esy=true;
      },
      // 返回
      reutrns:function(){
            javascript:history.back(-1);
        },
      // ...mapMutations(['changeLogin']), 
     login(){
       var name=this.username;
       var pwd=this.password;
       var url=`freeter-api/login/sign?phone=${name}&password=${pwd}`;
       this.$http.post(url).then(result=>{ 
         if(result.body.code==0){
           this.userid=result.body.userId;
           var effective=result.body.expire; 
           window.localStorage["token"]=result.body.token;
          //  window.localStorage["userid"]=result.body.userid;
          //  console.log(window.localStorage["token"]);
           localStorage.setItem('userid',result.body.userId);
           localStorage.setItem('effective',new Date().getTime());
            Toast("登录成功"); 
            this.$router.push("/home"); 
          }else if(result.body.code==500){
           Toast(result.body.msg);
         }else{
           Toast("账号或密码错误");
         }
       })
     }, 
    }, 
}
</script>

<style scoped>
#land{
  width: 100%;
  height: 100%;
  position: absolute;
  background: #ffffff;
}
#land .land-top{
    height: 1.15rem; 
    text-align: center;
    line-height: 1.15rem;
    font-size: .42rem;
    font-family: "SourceHanSerifSC-Bold";
    font-weight: bold;
}
#land .land-top .top-img{
    float: left;
    padding-left:.25rem; 
}
#land .land-top .top-img img{
    width: .3rem;
    height: .18rem;
}
#land .logo{
    height: 1.85rem; 
    text-align: center;
    padding-top: .6rem;
}
#land .logo img{
    width: 1.85rem;
    height: 1.25rem; 
}
#land .account{
    height: 1.83rem;
    background: skyblue;
    margin-top: .2rem;
}
.login_form {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
}
.qxs-ic_user {
  background: url("../../lib/img/ios/zhanghaoicon@2x.png") no-repeat;
  background-size: .38rem .42rem;
  background-position: 3%;
}
.qxs-ic_password {
  background: url("../../lib/img/ios/passwordicon@2x.png") no-repeat;
  background-size: .34rem .36rem;
  background-position: 3%;
  margin-bottom:.2rem;
}
.login_logo {
  height: 100%;
}
.login_btn {
  width:6.05rem;
  height: .9rem;
  background: #C5171F;
  display: block;
  margin-top:1.7rem;
  text-align: center; 
  color: #ffffff;
  font-family:"PingFangSC-Regular, sans-serif";
  font-size:.38rem;
  border-top-left-radius:.5rem;
  border-top-right-radius: .5rem;
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
  position: relative; 
}
.login_btn .jt{
  width:.16rem;
  height:.16rem;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
  position: absolute;
  top:.4rem;
  right: 2.3rem; 
}
.qxs{
    height: 1.83rem;
    border-bottom: 1px solid #E5E5E5;
} 
.qxs .qxs-icon{
  margin-top: 1.05rem;
  border: none;
  padding-left:1.15rem;
  color: #939393;
  font-size: .32rem;  
  font-family:"PingFangSC-Regular, sans-serif";
}
.qxseyes{
  position: relative;

}
.qxseyes img{
  width: .38rem;
  height: .15rem;
  position: absolute;
  bottom:.3rem;
  right: 0;
}
#passwd{
  margin-top: .5rem;
  float: right;
  color: #C5171F;
  font-size: .32rem;
  font-family: "SourceHanSerifSC-Light";
}
#passwd a{
  color: #C5171F;
  font-family: "SourceHanSerifSC-Light";
}
#land .go-login{ 
  margin-top: 1rem;
  margin-bottom: .7rem;
  width: 100%;
  font-size: .32rem;
  color: #939393;
  text-align: center;
  font-family:"PingFangSC-Regular, sans-serif";
}
#land .go-login .logins{
  color: #C5171F;
  border-bottom:1px solid #C5171F;
}
</style>

