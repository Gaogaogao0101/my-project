<template>
 <div id="forget">
    <div class="no-back">
        <div class="land-top">
            <span class="top-img" @click="rback"> 
                <img src="../../lib/img/ios/fanhuizuo@3x.png" style="" alt="">
                <span>忘记密码</span>  
            </span>
            <router-link to="/land"><div class="complete" >去登陆</div></router-link>
        </div> 
        <div class="land-con">
            <div class="con-left">
                <span><img src="../../lib/img/ios/zhanghaoicon@3x.png" alt=""></span>
            </div>
            <div class="con-cons">
                <input type="text" placeholder="请输入手机号" v-model="phone">
            </div>
            <div class="con-right" @click="getcode">发送验证码</div>
        </div>
        <div class="code">
            <input type="text" placeholder="请输入验证码" v-model="code">
        </div>
        <div class="land-con">
            <div class="con-left">
                <span><img src="../../lib/img/ios/passwordicon@3x.png" alt=""></span>
            </div>
            <div class="con-cons cons">
                <input type="text" placeholder="请输入6~12位密码" minlength="6" maxlength="12" onkeyup="value=value.replace(/[^a-za-z0-9u4e00-u9fa5]/g,'')" v-model="pwd">
            </div>
            <div class=" conr">
                <span><img src="../../lib/img/ios/hideeyes@3x.png" alt=""></span>
            </div>
        </div>
        <div class="land-con">
            <div class="con-left">
                <span><img src="../../lib/img/ios/passwordicon@3x.png" alt=""></span>
            </div>
            <div class="con-cons cons">
                <input type="text" placeholder="再次输入" minlength="6" maxlength="12" onkeyup="value=value.replace(/[^a-za-z0-9u4e00-u9fa5]/g,'')" v-model="newpwd">
            </div>
            <div class=" conr">
                <span><img src="../../lib/img/ios/hideeyes@3x.png" alt=""></span>
            </div>
        </div>
         <div class="bot" @click="getpwd">提交 <img src="../../lib/img/ios/shenheloginright@3x.png" alt=""></div> 
    </div>
     
 </div>   
</template>
<script> 
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            phone:'',
            code:'',
            pwd:'',
            newpwd:'',
        }
    }, 
    methods:{
        rback(){
           javascript:history.back(-1);
        },
        getcode(){
            if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.phone)) { 
                Toast("请输入正确的电话号码"); 
           }else{ 
                var phone=this.phone;
                var url=`freeter-api/user/sendCodeResetPass?phone=${phone}`; 
                this.$http.post(url).then(res=>{
                    Toast(res.body.msg);
                })
            }
        },
        getpwd(){ 
            if(this.pwd == null){
                Toast("密码不能为空");
            }else if(this.pwd.length<6){
                Toast("密码少于6位");
            }else if(this.newpwd == null){
                Toast("确认密码不能为空")
            }else if(this.newpwd.length<6){
                Toast("确认密码不能少于6位");
            }else if(this.newpwd.value!==this.pwd.value){
                Toast("两次密码输入不一致");
            }else{
                var pwd=this.pwd;
                var newpwd=this.newpwd;
                var phone=this.phone;
                var code=this.code;
                var url=`freeter-api/user/resetPass?phone=${phone}&password=${pwd}&confirmPassword=${newpwd}&code=${code}`;
                this.$http.post(url).then(res=>{
                    if(res.body.code==0){
                        Toast("修改成功");
                    }
                })
            }
        }
    },
     computed:{
        // passwordValidate: function() {
        //     var errorText;
        //     if(!/^[0-9A-Za-z]{6,15}$/.test(this.pwd)) {
        //         // errorText = '密码少于6位'
        //     } else {
        //         errorText = ''
        //     }
        //     if(!this.pwd) {
        //         errorText = ''
        //         this.pwd = true
        //     }
        //     return {
        //         errorText
        //     }
        // },
        //     passwordCheckValidate: function() {
        //     var errorText;
        //     if(!/^[0-9A-Za-z]{6,15}$/.test(this.newpwd)) {
        //         // errorText = '密码少于6位'
        //     }else if(this.newpwd !== this.newpwd ){
        //         Toast('两次密码不一致');
        //     }
        //     else {
        //         errorText = ''
        //     }
            
        //     if(!this.passwordFlag) {
        //         errorText = ''
        //         this.passwordFlag = true
        //     }
        //     return {
        //         errorText
        //     }
        // }
    },
     watch:{
        pass(val){
            this.$nextTick(()=>{
                this.pass=filterInput(val);
            })
        },
     }
}
</script>
<style scoped>
#forget .no-back{
    background: #ffffff;
    margin-top: .2rem;
    margin: 0;
    margin-bottom:.8rem;
} 
#forget .land-top{
    height: 1.15rem; 
    text-align: center;
    line-height: 1.15rem;
    font-size: .42rem;
    color: #313131;
    font-family: "SourceHanSerifSC-Bold";
    font-weight: bold;
    position: relative;
}
#forget .land-top .top-img{
    float: left;
    padding-left:.25rem; 
} 
#forget .land-top .top-img .fd span{
    width: 1.5rem;
    font-size: .28rem;
    display: block;
    color: #939393;
    font-family: "SourceHanSerifSC-Light";
    font-weight: normal;
    margin-top: -.2rem;
    position: absolute;
    top:.2rem;
    left: .1rem;
}
.land-top .top-img img{ 
    margin-right: .2rem;
    margin-top: .4rem;
     width: .19rem;
     height: .35rem;
}
.land-con{
    width:5.5rem;
    height: .8rem; 
    margin:.5rem auto; 
    border-bottom: 1px solid #e5e5e5;
}
.land-con div{
    float: left;
}
.land-con .con-left{
    width: 10%;
    height: 100%; 
    padding-top: .18rem;
}
.land-con .con-left span{
    display: block;
    width: .38rem;
    height: .43rem;
    margin: auto; 
}
.land-con .con-left span img{
    width: .38rem;
    height: .43rem;
}
.land-con .con-cons{
    width: 60%;
    height: 100%; 
}
.land-con .conr{
    width: 10%;
}
.land-con .conr span{
    width: .4rem;
    height: .16rem;
    margin-top: .1rem;
    display: block;
}
.land-con .conr img{ 
    width: 100%;
    height:100%;
}
.land-con .cons{
    width: 80%;
}
.land-con .con-right{
    font-size: .32rem;
    color: #c5171f;
    line-height: .8rem;
    width: 30%;
    font-family: "SourceHanSerifSC-Light";
}
.land-con .con-cons input{
    height: .75rem;
    border: none;
    font-size: .32rem;
    padding: 0;
    padding-left: .4rem;
    font-family: "SourceHanSerifSC-Light";
} 
.code{
    height: .8rem;
    width: 5.5rem;
    margin: auto;
    font-size: .42rem;
    border-bottom: 1px solid #e5e5e5;
    font-family: "SourceHanSerifSC-Light";
}
.code input{
    border:none;
    height: .75rem;
    font-size: .32rem;
    padding: 0;
    font-family: "SourceHanSerifSC-Light";
}
.bot{
    width: 5rem;
    height: .8rem;
    color: #ffffff;
    background: #c5171f;
    margin:3rem auto;
    text-align: center;
    line-height: .8rem;
    font-size: .38rem;
    font-family: "SourceHanSerifSC-Light";
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
}
.bot img{
    width: .12rem;
    height: .22rem;
}
.complete{
    font-weight: normal;
    text-align: right;
    margin-right: .34rem;
    font-size: .36rem;
    color: #313131;
    font-family: "SourceHanSerifSC-Light";
}
</style>

