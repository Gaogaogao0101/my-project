<template>
 <div id="forget">
    <div class="no-back">
        <div class="land-top">
            <span class="top-img"> 
                <img src="../../lib/img/ios/fanhuizuo@3x.png" @click="back" style="" alt="">
                <span>修改密码</span>  
            </span>
            <div class="complete" @click="getpassword">确定</div>
        </div>  
        <div class="land-con" style="margin-top:3rem;" v-if="jiupwd">
            <div class="con-left">
                <span><img src="../../lib/img/ios/passwordicon@3x.png" alt=""></span>
            </div>
            <div class="con-cons cons" >
                <input type="password" placeholder="请输入旧密码" minlength="6" maxlength="12" onkeyup="value=value.replace(/[^a-za-z0-9u4e00-u9fa5]/g,'')" v-model.lazy="passwordModel">
            </div> 
            <div class=" conr" @click="ifpwd">
                <span><img src="../../lib/img/ios/hideeyes@3x.png" alt=""></span>
            </div> 
        </div>
         <div class="land-con" style="margin-top:3rem;" v-else>
            <div class="con-left">
                <span><img src="../../lib/img/ios/passwordicon@3x.png" alt=""></span>
            </div>
            <div class="con-cons cons" >
                <input type="text" placeholder="请输入旧密码" minlength="6" maxlength="12" onkeyup="value=value.replace(/[^a-za-z0-9u4e00-u9fa5]/g,'')" v-model.lazy="passwordModel">
            </div> 
            <div class=" conr" @click="ifpwd">
                <span><img src="../../lib/img/ios/hideeyes@3x.png" alt=""></span>
            </div> 
        </div>
        <div class="tips"> {{passwordValidate.errorText}}</div>
        <div class="land-con" v-if="pwds">
            <div class="con-left">
                <span><img src="../../lib/img/ios/passwordicon@3x.png" alt=""></span>
            </div>
            <div class="con-cons cons">
                <input type="password" placeholder="请输入新密码" onkeyup="value=value.replace(/[^a-za-z0-9u4e00-u9fa5]/g,'')" minlength="6" maxlength="12" v-model.lazy="passwordcheckModel">
            </div>
            <div class=" conr" @click="ifpwds">
                <span><img src="../../lib/img/ios/hideeyes@3x.png" alt=""></span>
            </div> 
        </div>
        <div class="land-con" v-else>
            <div class="con-left">
                <span><img src="../../lib/img/ios/passwordicon@3x.png" alt=""></span>
            </div>
            <div class="con-cons cons">
                <input type="text" placeholder="请输入新密码" onkeyup="value=value.replace(/[^a-za-z0-9u4e00-u9fa5]/g,'')" minlength="6" maxlength="12" v-model.lazy="passwordcheckModel">
            </div>
            <div class=" conr" @click="ifpwds">
                <span><img src="../../lib/img/ios/hideeyes@3x.png" alt=""></span>
            </div> 
        </div>
        <div class="tips"  v-if="passwordCheckValidate">{{passwordCheckValidate.errorText}}</div>
        <router-link to="/land"><div class="bot">登录 <img src="../../lib/img/ios/shenheloginright@3x.png" alt=""></div></router-link>
    </div>
     
 </div>   
</template>
<script>

function filterInput(val) {
// 这里过滤的是除了英文字母和数字的其他字符
    return val.replace(/^[a-zA-Z0-9]{4,23}$/, '')
};
export default {
    data(){
        return{
            passwordModel:'',
            passwordcheckModel:'',
            token:localStorage.getItem('token'),
            jiupwd:true,
            pwds:true,
        }
    }, 
    created(){
        // this.passwordValidate();
        // this.passwordCheckValidate();
    },
    methods:{ 
         back(){
             this.$router.push('/member')
         },
        //显示和隐藏密码
        ifpwd(){
            if(this.jiupwd==true){
                this.jiupwd=false
            }else if(this.jiupwd==false){
                this.jiupwd=true
            }
        },
        ifpwds(){
            if(this.pwds==true){
                this.pwds=false
            }else if(this.pwds==false){
                this.pwds=true
            }
        },

         getpassword(){
             var token=this.token;
             var password=this.passwordModel;
             var newpsd=this.passwordcheckModel;
             var url=`freeter-api/user/updatePass?token=${token}&password=${password}&newPassword=${newpsd}`;
             this.$http.post(url).then(res=>{ 
                 if(res.body.code==0){

                 }
             })

         } 
    },
    computed:{
        passwordValidate: function() {
            var errorText;
            if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordModel)) {
                // errorText = '密码少于6位'
            } else {
                errorText = ''
            }
            if(!this.passwordFlag) {
                errorText = ''
                this.passwordFlag = true
            }
            return {
                errorText
            }
        },
            passwordCheckValidate: function() {
            var errorText;
            if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordcheckModel)) {
                // errorText = '密码少于6位'
            }else if(this.passwordcheckModel === this.passwordModel ){
                errorText = '两次密码一致请重新输入'
            }
            else {
                errorText = ''
            }
            
            if(!this.passwordFlag) {
                errorText = ''
                this.passwordFlag = true
            }
            return {
                errorText
            }
        }
    },
      
}
</script>
<style scoped>
#forget{
    width: 100%;
    height: 100%;
    position: fixed;
    background: #ffffff;
}
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
    margin:auto; 
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
.tips{
    width: 5.5rem;
    height: .8rem;
    margin: auto;
}
</style>

