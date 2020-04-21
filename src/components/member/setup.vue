<template>
    <div id="set">
         <div class="top">
            <div class="til-left"><router-link to="/member"> <img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></router-link></div>
            <div class="til-con">设置</div>
        </div>
        <div class="pwd">
           <router-link to="/reset">
                <div class="pwds">
                    修改密码
                </div>
           </router-link>
           <div class="phone">客服电话：0571-87229967</div>
        </div>

        <div class="btn" @click="loginout()">退出登录</div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
           token:localStorage.getItem('token'),
        }
    },
    created(){
        // this.loginout();
    },
    methods:{
        loginout(){
            localStorage.removeItem('goodSpecPriceId');
            localStorage.removeItem('notdesid');
            localStorage.removeItem('userid');
            localStorage.removeItem('effective');
            localStorage.removeItem('prisum');
            var token=this.token;
            var url="freeter-api/login/logout?token="+this.token;
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    localStorage.removeItem('token;');
                    this.$router.push({path:'/home'});
                }
            })
            localStorage.removeItem('token');
            //  this.$router.push({path:'/home'});
        }
    },
}
</script>
<style scoped>
  .phone{
        width: 100%;
        height: 100%;
        line-height: 1rem;
        color: #313131;
        font-size: .32rem;
        border-bottom: 1px solid #e0e0e0;
  }
#set{
    background-color: rgb(255,255,255);
    height: 100%;
    position: fixed;
    width: 100%;
}
.top{
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    padding-left: .24rem;
    padding-right: .24rem;
    background: #ffffff;
}
.top div{
    float: left;
}
.top .til-left{
    width:5%;
}
.top .til-left img{
    width: .18rem;
    height: .33rem;
     position: fixed;
     top:.3rem;
   left: .24rem;
}
.top .til-con{
    width: 95%;
    text-align: center;
    font-size: .42rem;
    color: #313131;
    font-weight: bold;
}
.pwd{
    width: 100%;
    height: 1rem;
    padding-left: .3rem;
    padding-right: .3rem;
}
.pwd .pwds{
    width: 100%;
    height: 100%;
    line-height: 1rem;
    color: #313131;
    font-size: .32rem;
    border-bottom: 1px solid #e0e0e0;
}
.btn{
    width: 6rem;
    height: 1rem;
    background: #c20d12;
    margin: auto;
    margin-top:8rem;
    font-size: .42rem;
    color: #ffffff;
    text-align: center;
    line-height: 1rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
}
</style>
