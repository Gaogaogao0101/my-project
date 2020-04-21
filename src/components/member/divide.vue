<template>
<div id="divide">
    <div class="til">
        <div class="til-left" @click="reutrns"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></div>
        <div class="til-con">我的积分</div>
        <div class="til-right" :disabled="isDisable" @click="pay">确认转出 </div>
    </div>
    <div class="staff">转给</div>
    <div class="mem-img"><img :src="'http://app.hzhlsy.net/'+listimg"  :onerror="logo"/></div>
    <div class="mem-name">{{list.userName}}</div>
    <div class="mem-count"><input type="text" v-model="userjf" placeholder="请输入积分数目" oninput = "value=value.replace(/[^\d]/g,'')"></div>
    <div class="counts">剩余积分：{{jifen}}</div>
</div>    
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    inject:['reload'],
    data(){
        return{
            userid:this.$route.params.usersid,
            token:localStorage.getItem('token'),
            list:[],
            listimg:'',
            jifen:0,
            userjf:'',
            isDisable: true,//表单重复提交
            logo: 'this.src="' + require('../../lib/img/ios/user20190727140338.png') + '"',
        }
    }, 
    created(){
        this.getusers();
        this.getjifen();
        this.wind();
        this.iphone();
    },
    methods:{
        // 状态栏
        plusReady() {
				// 设置系统状态栏背景为红色
				var type = plus.os.name;
				if(type == "iOS") {
					plus.navigator.setStatusBarBackground("#C5161D");
				} else {
					plus.navigator.setStatusBarBackground("#C5161D");
                }
        },
        wind(){
			if(window.plus) {
				this.plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
            }  
        },
        // 返回
        reutrns:function(){
            javascript:history.back(-1);
        },
        // 转积分
        getuserjf(){ 
            this.isDisable = true;  //开始可以点击
            var integral=parseInt(this.userjf);
            var usid=parseInt(this.userid);
            var token=this.token;
            var url=`freeter-api/integral/modulationUserJiFen?token=${token}&receiveUserId=${usid}&integral=${integral}`;
            this.$http.post(url).then(res=>{ 
                this.isDisable = false;//执行请求后就不能点击了
                if(res.body.code==0){
                    Toast("积分已转出");
                    this.reload();
                }else if(res.body.code==500){
                    Toast(res.body.msg);
                    this.reload();
                }
            })
        },
        pay(){
            if(this.isDisable){
                this.getuserjf();
                this.isDisable=false;
            }else{
               Toast("数据重复提交");
               this.maskShow=false;
                return;
            }
        },  

        // 我的总积分
        getjifen(){
            var url=`freeter-api/integral/getUserJiFen?token=`+this.token;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    this.jifen=res.body.JiFen; 
                }
            })
        },
        getusers(){
            var usid=parseInt(this.userid);
            var url=`freeter-api/user/sendJiFen?userId=${usid}`;
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.list=res.body.map;
                    this.listimg=res.body.map.userImg; 
                }
            }) 
        },
        // 手机软键盘弹出
        iphone(){
            console.log("aaaaaaaaaa");
            var height= document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
            window.onload = function(){ //在页面整体加载完毕时
                document.getElementById('app').style.height= height + 'px'//把获取到的高度赋值给根div
            } 
        },
    }   
}
</script>
<style scoped>
#divide{
    width: 100%;
    height: 100%;
    position: fixed;
    background: #F3F3F3;
}
.til{
    width: 100%;
    height: .88rem; 
    line-height: .88rem;
    padding-left: .24rem;
    padding-right: .24rem;
    text-align: center;
    position: relative;
}
.til div{
    float: left;
}
.til .til-left{
    width:5%;
}
.til .til-left img{
    width: .2rem;
    height: .32rem;
}
.til .til-con{
    width:80%;
    font-size: .42rem;
    font-family: "SourceHanSerifSC-Bold";
    font-weight: bold;  
}
.til .til-right{
    float: right;
    position: absolute;
    right: .24rem;
    font-family: "SourceHanSerifSC-Light";
    color: #C5161D;
    font-size: .32rem;
}
.staff{
    text-align: center;
    font-size: .42rem;
    font-weight:500;
    margin-top: .6rem;
    color: #C5161D;
    font-family: "SourceHanSerifSC-Light";
}
.mem-img{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%; 
    margin: auto;
    margin-top: .4rem;
    background: #e3e3e3;
}
.mem-img img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.mem-name{
    margin-top: .2rem;
    text-align: center;
    font-size: .32rem;
    color: #313131;
    font-weight:bold;
    font-family:"PingFangSC-Semibold, sans-serif";
}
.mem-count{
    width: 5.9rem;
    height: .83rem;
    margin: auto;
    margin-top: .45rem;
}
.mem-count input{
    width: 5.9rem;
    height: .83rem; 
    border: none;
}
.mem-count input::placeholder{
    font-size: .32rem;
    color: #939393;
    font-family: "SourceHanSerifSC-Light";
}
.counts{
    height:.8rem;
    text-align: center;  
    /* position:fixed;
    left: 2.6rem;
    bottom: 1.55rem; */
    margin-top: 5rem;
    font-size: .32rem;
    color: #C5161D;
    font-family: "SourceHanSerifSC-Light";
}
</style>


