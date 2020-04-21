<template>
<div id="login">
    <div class="no-back">
    <div class="land-top">
        <span class="top-img">
            <router-link to="/login" class="fd">
            <img src="../../lib/img/ios/fanhuileft@3x.png" alt="">  
            </router-link></span> 完善信息
    </div> 
     <div class="content" style="width:100%;padding-left:.25rem;padding-right:.25rem;">
         
            <div class="tel">
                <div class="tel-left">姓名<span>*</span></div>
                 <div class="con" style="width:61%;margin-left:30%;">
                    <input type="text" v-model="name" placeholder="请输入姓名">
                 </div>
                <div class="right-img">
                    <img src="../../lib/img/ios/fanhuiyou@3x.png" alt="">
                </div> 
            </div>
            <div class="tel">
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
            <div class="tel" >
                <div class="tel-left">身份证号<span>*</span></div>
                <div class="con" style="width:61%;margin-left:30%;">
                    <input type="text"  id="idCode" v-model="card" maxlength="18" placeholder="请输入证件号码"> 
                </div>
                <div class="right-img">
                    <img src="../../lib/img/ios/fanhuiyou@3x.png" alt="">
                </div>
            </div>
            <div class="tel" style="border:none;">
                <div class="tel-left">用户地址<span>*</span></div>
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
                    <input type="text"  v-model="detailcity" placeholder="请输入详细地址" onkeyup="value=value.replace(/[^a-za-z0-9u4e00-u9fa5]/g,'')"  > 
                </div> 
            </div>
     </div>
</div> 

<div class="look"> 
    <div class="xieyi"><span><input type="checkbox" v-bind:checked="isChecked" v-on:click="handleDisabled"/></span><router-link to="">已阅读并同意《用户协议》</router-link></div>
    <div class="inp">
        <div class="etc" v-if="etcShow" @click="nextclick()">提交信息</div>
        <div class="etc noshow" v-else>请先同意用户协议</div>
         <!-- <router-link to="/loginb" style="color:#fff;"> -->
            <!-- <div class="etc" v-if="etcShow" @click="nextclick()">下一步(2/3)</div> -->
            <!-- <div class="etc etcs" v-else id="accept">请同意用户协议</div> -->
         <!-- </router-link> -->
        <!-- <div class="etc" v-else style="background:#eee;color:#C5171F;">数据已提交<img src="../../lib/img/ios/shenheloginright@3x.png" alt=""> </div> -->
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
            name:'',
            code:this.$route.params.code,
            phone:this.$route.params.phone,
            card:'',
            codes:this.$route.params.codes,
            param: '0',
            city:'',
            addInp :false,
            mask:false,
            province:'',
            citys:'',
            areas:'',
            pass:this.$route.params.pass,  
            willShow:true,
            etcShow:false,
            isChecked:false,
            detailcity:''
        }

    },
    components: { VDistpicker }, 
    created(){
        // this.checkname();
        // this.postimg();
    },
    mounted(){
      
    },
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
        },
        // 判断用户协议是否选择
         
        // 地址选择
         selected(data){
            this.mask =false;
            this.addInp = false;
            this.city = data.province.value + ' ' + data.city.value +' ' + data.area.value;
            this.province= data.province.value;
            this.citys=data.city.value;
            this.areas=data.area.value; 
        }, 
        fn:function(){
            if(this.willShow==true){
                this.willShow=false;
            }else{
                this.willShow=true
            }
        },
        nextclick(){
            var name=this.name;var phone=this.phone; var card=this.card;var codes=this.codes;
            var param=this.param; var city=this.city; var pass=this.pass; var code=this.code;
            var province=this.province;var citys=this.citys;var areas=this.areas;var isChecked=this.isChecked;
            if(name==''||phone=='' || codes=='' || pass=='' || code ==''||card==''||city==''||param==''||province==''||citys==''||areas==''){
                Toast('请完善信息');
            }else if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.card)){
                Toast("请输入正确的身份证号");
            }else{
                this.$router.push({name:'loginb',params:{name,phone,card,codes,param,city,pass,code,province,citys,areas}});  
            }
             
        }
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
 .tel{
      border-bottom:1px solid #e5e5e5; 
 }
 #login .look .inp{
     margin-top: .3rem;
 }
 .xieyi{width: 60%;margin: auto;height: .5rem;position: relative;}
 .xieyi span{position: absolute;top: .02rem;}
 .xieyi input[type=checkbox]{width: 15px;height: 15px;margin-top:.1;}
.xieyi a{line-height: .5rem;margin-left: .2rem;position: absolute;top: -0.05rem;left:.3rem;font-size: .32rem;}
.noshow{background: #e5e5e5 !important;color: #989898;}
</style>
