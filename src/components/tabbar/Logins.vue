<template>
<div id="login">
    <div class="no-back">
    <div class="land-top">
        <span class="top-img">
            <router-link to="/land" class="fd">
            <img src="../../lib/img/ios/fanhuileft@3x.png" alt="">
            <span>返回登录</span> 
            </router-link></span> 注册
    </div> 
     <div class="content" style="width:100%;padding-left:.25rem;padding-right:.25rem;">
         <div class="tel name-bor">
            <div class="tel-left">姓名<span>*</span></div>
                <div class="con" style="width:61%;margin-left:30%;">
                <input type="text" v-model="name" placeholder="请输入姓名">
                </div>
            <div class="right-img">
                <img src="../../lib/img/ios/fanhuiyou@3x.png" alt="">
            </div> 
        </div>
        <div class="tel sex-bor">
            <div class="tel-left">性别</div>
            <div class="con" style="width:61%;margin-left:30%;">
                <div class="boy">
                    <input type="radio" name="radios" value="1" v-model="param"><label>男</label>
                </div> 
                <div class="girl">
                    <input type="radio" name="radios" value="0" v-model="param"><label>女</label>
                </div>
            </div>
            <div class="right-img">
                <img src="../../lib/img/ios/fanhuiyou@3x.png" alt="">
            </div>
        </div>  
         
         <div class="tel" style="width:100%;height:1.3rem; ">
             <div class="tel-left" style="float:left;">手机号码<span>*</span></div>
            <div class="con" style="width:61%;margin-left:30%;">
                <input type="text" v-model="phone" placeholder="请输入手机号码" oninput="if(value.length>11)value=value.slice(0,11)">
            </div>
            <div class="right-img">
                <img src="../../lib/img/ios/fanhuiyou@3x.png" alt="">
            </div>
         </div>
         <div class="tel yz" style="margin-top:.01rem;">
            <div class="tel-left">获取验证码<span>*</span></div>
            <div class="con" style="width:61%;margin-left:30%;color:#939393;">
                <input type="text" v-model="codes" style="width:60%; height:100%;color:#939393;" placeholder="输入验证码"  oninput = "value=value.replace(/[^\d]/g,'')">
                <span  @click="getcode" style="width:35%;font-size:.24rem;height:.8rem;margin-top:.25rem;line-height:.8rem; text-align:center; border:1px solid #e1e1e1; float:right;">点击获取</span>
            </div>
            <!-- <input type="text" placeholder="发送验证码"> -->
            <div class="right-img">
                <img src="../../lib/img/ios/fanhuiyou@3x.png" alt="">
            </div>
         </div> 
         <div class="tel psword" style="">
            <div class="tel-left">密码<span>*</span></div>
                <div class="con" style="width:61%;margin-left:30%;">
                <input type="password" maxlength="12" minlength="6" onkeyup="value=value.replace(/[^a-za-z0-9u4e00-u9fa5]/g,'')" v-model="pass" placeholder="输入6~12位数字字母组合密码">
                </div>
            <div class="right-img">
                <img src="../../lib/img/ios/fanhuiyou@3x.png" alt="">
            </div> 
        </div> 
        <!--<div class="tel" style="border-bottom:1px solid #e5e5e5;">
            <div class="tel-left">邀请码<span>*</span></div>
                <div class="con" style="width:61%;margin-left:30%;">
                <input type="text" v-model="code" maxlength="13" placeholder="请输入邀请码"  oninput="if(value.length>14)value=value.slice(0,13)">
                </div>
            <div class="right-img">
                <img src="../../lib/img/ios/fanhuiyou@3x.png" alt="">
            </div> 
        </div>-->
         
         
        <!-- <div class="tel" >
            <div class="tel-left">身份证号<span>*</span></div>
            <div class="con" style="width:61%;margin-left:30%;">
                <input type="text"  id="idCode" v-model="card" maxlength="18" placeholder="请输入证件号码"> 
            </div>
            <div class="right-img">
                <img src="../../lib/img/ios/fanhuiyou@3x.png" alt="">
            </div>
        </div> --> 
        <div class="tel select-address" >
            <div class="tel-left">选择地址<span>*</span></div>
            <div class="con" style="width:55%;margin-left:30%;">
                <input type="text"  v-model="city" placeholder="请选择省市" onkeyup="value=value.replace(/[^a-za-z0-9u4e00-u9fa5]/g,'')"  > 
            </div>
            <div class="right-img" style="width:15%;">
                <div @click="toAddress" style="color:#c5171f;font-size:.28rem;float:right;">请选择</div>
            </div>
        </div>
        <div class="tel" style="border:none;">
            <div class="tel-left">详细地址<span>*</span></div>
            <div class="con" style="width:70%;margin-left:30%;">
                <input type="text"  v-model="detailcity" placeholder="请输入详细地址"  > 
            </div> 
        </div>
     </div>
     <div class="look"> 
        <div class="xieyi"><span><input type="checkbox" v-bind:checked="isChecked" v-on:click="handleDisabled"/></span><router-link to="/agreement">已阅读并同意《用户协议》</router-link></div>
        <div class="inp">
            <div class="etc" v-if="etcShow" @click="postclick()">提交信息</div>
            <div class="etc noshow" v-else>请选择用户协议</div> 
            <!-- <router-link to="/logina" style="color:#fff;"> --> 
            <!-- </router-link> -->
            <!-- <div class="etc" v-else style="background:#eee;color:#C5171F;">数据已提交<img src="../../lib/img/ios/shenheloginright@3x.png" alt=""> </div> -->
        </div>
    </div> 
</div>
 <div style="" class="mask" v-show="mask"> 
    <v-distpicker type="mobile" @selected='selected' v-show="addInp" static-placeholder></v-distpicker>
 </div>  
</div>  
</template>
<script>
import {Rem} from "../../lib/js/rem.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf' 
import VDistpicker from 'v-distpicker'
import {Toast} from 'mint-ui'
function filterInput(val) {
// 这里过滤的是除了英文字母和数字的其他字符
    return val.replace(/[^A-z0-9]/, '')
};
function filtercard(val) {
    // return val.replace(/[^A-z0-9]/, '')
}
export default { 
    name: 'whatever',
    data(){
        return{ 
            phone:'', 
            codes:'',  
            pass:'', 
            code:'',  
            etcShow:false,
            isChecked:false,
            detailcity:'',
            param: '0',
            city:'', 
            name:'',
            province:'',
            citys:'',
            areas:'',
            addInp :false,
            mask:false,
        }

    },  
    components: { VDistpicker }, 
    methods:{
        ifs(){
            var code=this.codes;
            if(code === null){
                Toast("验证码不能为空");
            }
        }, 
        toAddress(){
            this.mask = true;
            this.addInp = true; 
            console.log('1111111');
        },
        getcode(){
           var phone=this.phone;
           if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.phone)){
               Toast('请输入正确的电话号码')
           }else{
            var url=`freeter-api/login/sendCode?phone=${phone}`;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    Toast("获取成功");
                }else if(res.body.code==500){
                    Toast("获取失败")
                }
            })
           }
            
        },  
        //通过methods来定义需要的方法
        handleDisabled:function(){
            this.isChecked = !this.isChecked;
            if(this.isChecked==true){
                this.isDisabled =  true;
                this.etcShow=true;
            }
            else{
                this.isDisabled =  false;
                this.etcShow=false;
            }
             console.log(this.isChecked)
        },
        // 下一步
        // next(){
        //     var phone=this.phone;
        //     var codes=this.codes;
        //     var pass=this.pass;
        //     var code=this.code;
        //     if(phone=='' || codes=='' || pass=='' || code == ''){
        //         Toast("请完善信息")
        //     }else{
        //         this.$router.push({name:'logina',params:{phone,codes,pass,code}}); 
        //     } 
        // }, 
         // 地址选择
        selected(data){
            this.mask =false;
            this.addInp = false;
            this.city = data.province.value + ' ' + data.city.value +' ' + data.area.value;
            this.province= data.province.value;
            this.citys=data.city.value;
            this.areas=data.area.value; 
        }, 
        postclick(){ 
            var phone=this.phone; var name=this.name; 
            var code=this.codes; var sex=this.param;
            var province=this.province; var citys=this.citys;
            var areas=this.areas; var pass=this.pass; 
            var codepwd=this.code; var detailcity=this.detailcity;
            var url=`freeter-api/register?phone=${phone}&phoneCode=${code}&address=${detailcity}&sex=${sex}&userName=${name}&province=${province}&city=${citys}&county=${areas}&password=${pass}`;
            if(detailcity=='' ||province==''||citys==''||areas==''){
                Toast('地址不能为空');
            }else if(phone==''){
                Toast('请输入手机号');
            }else if(name==''){
                Toast("请输入用户名"); 
            }else if(sex==''){
                Toast("请选择性别");
            }else if(code==''){ 
                Toast("验证码不能为空");
            }else if(pass == ""){
                Toast("密码不能为空");   
            }else{
                this.$http.post(url).then(res=>{
                    console.log(url);
                    if(res.body.code==0){
                        Toast('信息已提交');
                        this.$router.push("/land"); 
                    }else if(res.body.code==500){
                        Toast(res.body.msg);
                    }
                })
            }
        },
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
 @import '../../lib/css/login.css';
 .name-bor,.sex-bor,.psword,.select-address{
       border-bottom:1px solid #e5e5e5; 
 } 
 .look{
     margin-top: .3rem;
 }
#login .look .inp{
     margin-top: .3rem;
 } 
 .xieyi{width: 60%;margin: auto;height: .5rem;position: relative;}
 .xieyi span{position: absolute;top: .02rem;}
 .xieyi input[type=checkbox]{width: 15px;height: 15px;margin-top:.1; }
.xieyi a{line-height: .5rem;margin-left: .2rem;position: absolute;top: -0.05rem;left:.3rem;font-size: .32rem;color:#C5171F;}
.noshow{background: #e5e5e5 !important;color: #989898;}  
 
</style>
