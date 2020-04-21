<template>
 <div id="already">
     <div class="top">
        <div class="til-left"><router-link to="/member"> <img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></router-link></div>
        <div class="til-con">个人信息</div> 
    </div> 
    <div class="user_img">
        <div class="imgs"><img :src="'http://app.hzhlsy.net/'+list.picImg" :onerror="logo"></div>
        <router-link to="/portrait"><div class="information">更换头像</div></router-link>
    </div> 
     <div class="being">
        <ul>
            <li><small class="small-left"><span>姓名</span> <input style="text" v-model="list.userName" class="span-right" /></small><samp><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></samp></li>
            <li><small class="small-left"><span>性别</span> <input style="text" v-model="sex" class="span-right" /> </small><samp><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></samp></li>
            <!-- <li><small class="small-left"><span>身份证号</span> <input style="text" v-model="list.idCard" class="span-right"/> </small><samp><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></samp></li> -->
            <li><small class="small-left" style="position:relative;"><span>所属地区</span><input  class="span-right" style="width:60%;position:absolute;left:20%;top:-.1rem;height:.65rem;font-size:.3rem;"  type="text" v-model="city" /><div @click="toAddress" style="color:#939393;font-size:.28rem;float:right;">请选择</div><!-- <input style="text" v-model="city" class="span-right"/>--> </small><!--<samp><img src="../../lib/img/ios/fanhuiyou@2x.png" alt=""></samp>--></li>
        </ul>
    </div>
    <div class="submission" @click="modify"> 提交审核  </div>
    <div style="" class="mask" v-show="mask"> 
        <v-distpicker type="mobile" @selected='selected' v-show="addInp" static-placeholder></v-distpicker>
    </div>
 </div>  
</template>
<script>
function filterInput(val) {
// 这里过滤的是除了英文字母和数字的其他字符
     return;
};
import {Toast} from 'mint-ui'
import VDistpicker from 'v-distpicker' 
export default {
    inject:['reload'],
    data(){
        return{
          list:[],
          city:'',
          token:localStorage.getItem('token'),
          mask:false,
          addInp :false,
          sex:'',
          logo: 'this.src="' + require('../../lib/img/ios/user20190727140338.png') + '"'
        }
    },
    components: { VDistpicker }, 
    created(){
        this.getList();
    },
    methods:{
        // 选择地址 
        toAddress(){
            this.mask = true;
            this.addInp = true; 
        },
        selected(data){
            this.mask =false;
            this.addInp = false;
            // this.city = data.province.value + ' ' + data.city.value +' ' + data.area.value;
            // this.province= data.province.value;
            this.city=data.city.value;
            // this.areas=data.area.value; 
        },
        // 返回上一页
        reutrns:function(){
           this.$router.push('/member');
        },
        // 获取个人信息
       getList(){
          var url="freeter-api/user/userinfo?token="+this.token;
           this.$http.post(url).then(res=>{
               console.log(url);
              if(res.body.code==0){
                  this.list=res.body.userinfo;
                  this.city=res.body.userinfo.city;
                  if(this.list.sex==0){
                      this.sex='男'
                      return;
                  }else if(this.list.sex==1){
                      this.sex='女';
                      return;
                  }
              }
           })
       },
      modify(){
        var token=this.token;
        var name=this.list.userName;
        var card=this.list.idCard;
        var city=this.city;
        if(name==''){
            Toast('用户名不能为空');
        }else if(city==''){
            Toast('地区不能为空');
        }else{
            var url=`freeter-api/user/updateUserInfo?token=${token}&userName=${name}&city=${city}`;
            this.$http.post(url).then(res=>{ 
                console.log(url);
                if(res.body.code==0){
                    Toast('信息修改成功');
                }else if(res.body.code==500){
                    Toast('信息修改失败');
                };  
            });
        }
      },
    }, 
}
</script>
<style scoped>
#already{
    background:#FAFAFA;
    width: 100%;
    height: 100%;
    position: absolute;
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
}
.top .til-con{
    width: 95%;
    text-align: center;
    font-size: .42rem;
    color: #313131;
    font-weight: bold;
} 
.user_img{
    width: 100%;
    height: 3.15rem; 
    background: #ffffff;
    padding-top: .5rem;
}
.user_img .imgs{
    width: 1.68rem;
    height: 1.68rem;
    background: #eee;
    margin: auto; 
    border-radius: 50%;
}
.user_img .imgs img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.user_img .information{
    width: 1.35rem;
    color: #c5171f;
    font-size: .32rem;
    margin: auto;
    margin-top: .15rem;
}
.being{
    margin-top: .2rem;
}
.being ul li{
    height: 1.3rem;
    border-bottom: 1px solid #E5E5E5;
    padding-top: .6rem;
    padding-right: .2rem;
    padding-left: .2rem;
    font-size: .32rem;
    color: #313131;
    background: #ffffff;
    font-family: "SourceHanSerifSC-Light";
}
.being ul li .small-left{
    width: 95%;
    display: block;
    float: left;
}
.being ul li span{ 
    font-size: .32rem;
    display: inline-block;
    font-family:"Source Han Sans CN";
}
.being ul li .span-right{
    float: right;
    width: 60%;
    text-align: right;
    color: #939393;
    font-size: .28rem;
    border: none;
    margin: 0;
    padding: 0;

}
.being ul li samp{
    width: .15rem;
    height: .27rem; 
    float: right; 
}
.being ul li samp img{
     width:100%;  
}
.submission{
    width: 80%;
    margin: auto;
    background: #c5171f;
    color: #ffffff;
    font-size: .38rem;
    height:.88rem;
    margin-top: 2rem;
    line-height: .88rem;
    text-align: center;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family: 'SourceHanSerifSC-Light';
}
/* 地址插件 */
.mask{
    width:100%;
    height:100%;
    position:absolute;
    bottom: 0;
    background: #ffffff;
    z-index: 100%;
    background-color: rgba(255,255,255,0);
    opacity:1;
}
.distpicker-address-wrapper{
    height:100%;
    overflow: auto;
    background: #ffffff;
    color: #313131;
}
</style>

