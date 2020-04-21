<template>
<div id="login">
    <div class="no-back" style="margin-bottom:.5rem;">
    <div class="land-top">
        <span class="top-img">
            <router-link to="/logina" class="fd">
            <img src="../../lib/img/ios/fanhuileft@3x.png" alt=""> 
            </router-link></span> 上传证件
             
    </div>  
    <router-link to="/land"><small style="float:right;margin-right:.24rem;z-index:2;position:absolute;top:.35rem;right:.24rem;font-size:14px;">去登录</small></router-link>
</div> 
<div class="title">上传证件二选一<span>*</span></div>
<div class="card">
    <img src="../../lib/img/ios/card-bor@3x.png" alt="">
    <span>身份证</span>          
</div>
<div class="card-img" style="width:3.8rem;height:2.5rem; margin:.35rem auto;">
    <!-- <card-back></card-back> -->
     <div class="bor" @click="onPickFilea"> 
        <input type="file"  ref="fileInputa" accept="image/*"  @change="getFilea" style="display: none" >           
        <img :src="imageUrla" :onerror="logo" :v-model="imageUrla"/> 
    </div>
</div>
<div class="card-img" style="width:3.8rem;height:2.5rem;margin:.35rem auto;">
    <!-- <id-card></id-card> -->
     <div class="bor" @click="onPickFiles"> 
        <input type="file"  ref="fileInputs" accept="image/*"  @change="getFiles" style="display: none" >           
        <img :src="imageUrls" :onerror="cards" :v-model="imageUrls"/> 
    </div>
</div>
<div class="look">
    <div class="card" style="margin-top:.8rem;">
        <img src="../../lib/img/ios/yinye-img@3x.png" alt="">
        <span>营业执照</span>
    </div>
    <div class="bor" @click="onPickFile" style="margin-top:.5rem;"> 
        <input type="file"  ref="fileInput" accept="image/*"  @change="getFile" style="display: none">           
        <img :src="imageUrl" :onerror="camerc" :v-model="imageUrl"/> 
    </div>
    <div class="inp">
        <div class="etc" @click="getlogin" v-if="willShow">提交审核(3/3)</div>
        <div class="etc" v-else style="background:#D9D9D9;color:#fff;">数据已提交 </div>
    </div>
</div> 
</div>  
</template>
<script>
import {Rem} from "../../lib/js/rem.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf' 
import {Toast} from 'mint-ui'
import cardBack from '../subcomponents/cardBack.vue'
import Idcard from '../subcomponents/cardImg.vue'
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
            name:this.$route.params.name,
            phone:this.$route.params.phone,
            card:this.$route.params.card,
            codes:this.$route.params.codes,
            param:this.$route.params.param,
            city:this.$route.params.city,   
            pass:this.$route.params.pass,
            province:this.$route.params.province,
            citys:this.$route.params.citys,
            areas:this.$route.params.areas,
            imageUrl: "",  //img绑定的src地址
            imageUrla: "",  //img绑定的src地址
            imageUrls: "",  //img绑定的src地址
            postUrl: "" ,   //需要上传到的地址
            image:"",
            imagea:"",
            images:"", 
            businessImgUrl:'', //营业执照
            idcardimg:'',  //身份证正面照
            idback:'',  //身份证反面照
            codepwd:this.$route.params.code,
            willShow:true,
            logo: 'this.src="' + require('../../lib/img/ios/card-zheng@3x.png') + '"',
            cards:  'this.src="' + require('../../lib/img/ios/card-fan@3x.png') + '"',
            camerc:  'this.src="' + require('../../lib/img/ios/camerc_03.png') + '"',
        }

    }, 
    created(){
        // this.checkname();
        // this.postimg();
    },
    components:{
        'card-back':cardBack,
        'id-card':Idcard
    },
    mounted(){
     var client_h = document.documentElement.clientHeight;
        $(window).on("resize",function(){
            if (/iphone|ipad/i.test(navigator.userAgent.toLowerCase())) {
                    //ios这块什么都不用做
            } else {
            //安卓触发window.resize
            var body_h =  document.documentElement.clientHeight;
            if(client_h > body_h){
                $('.donwload-btn_fix').css('position','static')
                console.log("ad小了");
            }else{
                $('.donwload-btn_fix').css('position','fixed')
                console.log("ad正常")
            }
            }

        }) 
    },
    methods:{ 
        ifs(){
            var code=this.codes;
            if(code === null){
                Toast("验证码不能为空");
            }
        }, 
        fn:function(){
            if(this.willShow==true){
                this.willShow=false;
            }else{
                this.willShow=true
            }
        },
        timelist(){
            
        },
        getlogin(){
            if (this.phone=='') { 
                Toast("电话号码不能为空"); 
                }else if( this.name==''){
                    Toast("请输入用户名"); 
                }else if(this.param==''){
                    Toast("请选择性别");
                }else if(this.codes==''){
                    this.ifs();
                    Toast("验证码不能为空");
                }else if(this.pass == ""){
                    Toast("密码不能为空");   
                }else if(this.codepwd == ""){
                    Toast("邀请码不能为空");
                }else if(this.city==''){
                    Toast("地址不能为空");
                }else if(this.card==''){
                    Toast("身份证号不能为空");
                }else{ 
                    var phone=this.phone;
                    var name=this.name;
                    var card=this.card;
                    var code=this.codes;
                    var sex=this.param;
                    var province=this.province;
                    var citys=this.citys;
                    var areas=this.areas;
                    var pass=this.pass;
                    var imgurl=this.businessImgUrl;
                    var codepwd=this.codepwd;
                    var idcardimg=this.idcardimg;
                    var idback=this.idback; 
                    var url=`freeter-api/register?phone=${phone}&phoneCode=${code}&code=${codepwd}&idCard=${card}&sex=${sex}&userName=${name}&province=${province}&city=${citys}&county=${areas}&password=${pass}&businessImgUrl=${imgurl}&idcardFrontImgUrl=${idcardimg}&idcardBackImgUrl=${idback}`;
                    this.$http.post(url).then(res=>{  
                        if(res.body.code==0){
                            Toast("注册成功");
                        }else if(res.body.code==500){
                            Toast(res.body.msg);
                            this.$router.push('/login');
                        }else{
                            Toast("注册失败");
                        }
                    })
                 }
                 this.fn();
         },
        //  营业执照上传
         //第二步:再来写个方法, button代替input选择图片
            onPickFile () {
                 this.$refs.fileInput.click()
            },
            //第三步: 文件选择后, 后在页面上显示出来    转base64位的操作
            getFile ($event) { 
                const files = $event.target.files
                let filename = files[0].name          //只有一个文件
                if ( filename.lastIndexOf('.') <= 0 ) {
                    return alert("Please add a valid image!")        //判断图片是否有效
                }
                const fileReader = new FileReader()                //内置方法new FileReader()   读取文件
                    fileReader.addEventListener('load',() => {
                    this.imageUrl = fileReader.result
                })
                    fileReader.readAsDataURL(files[0])
                    this.image = files[0]
                    //已显示选择图片
                    // 提交照片
                    this.onUpload($event);
            } ,
            //第四步: 上传文件
            onUpload ($event) { 
                if(this.imageUrl!=''){
                    Toast("请上传图片");
                }else{ 
                    $event.preventDefault();    
                    let fd = new FormData();              //内置方法new FormData()  
                    fd.append('file',this.image);          //把image添加进去 
                    var url="freeter-api/addBusinessImg";                                  //(       第二次有效打印           )
                    this.$http.post(url,fd).then( res => {                 //第一个参:this.postUrl就是上面保存好的要上传的地址
                        if(res.body.code==0){
                            this.businessImgUrl=res.body.businessImgUrl;  
                             
                        } 
                 }) 
            } 
        },
         // 身份证正面上传
        //第二步:再来写个方法, button代替input选择图片
            onPickFilea () {
                 this.$refs.fileInputa.click()
            },
            //第三步: 文件选择后, 后在页面上显示出来    转base64位的操作
            getFilea ($event) { 
                const files = $event.target.files
                let filename = files[0].name          //只有一个文件
                if ( filename.lastIndexOf('.') <= 0 ) {
                    return alert("Please add a valid image!")        //判断图片是否有效
                }
                const fileReader = new FileReader()                //内置方法new FileReader()   读取文件
                    fileReader.addEventListener('load',() => {
                    this.imageUrla = fileReader.result
                })
                    fileReader.readAsDataURL(files[0])
                    this.imagea = files[0]
                    //已显示选择图片
                    // 提交照片
                    this.onUploada($event); 
            } ,
            //第四步: 上传文件
            onUploada ($event) { 
                if(this.imageUrla!=''){
                    Toast("请上传图片");
                }else{ 
                    $event.preventDefault();
                    let fd = new FormData();              //内置方法new FormData()  
                    fd.append('file',this.imagea);          //把image添加进去 
                    var url="freeter-api/addIdcardFrontImg";                                  //(       第二次有效打印           )
                    this.$http.post(url,fd).then( res => {                 //第一个参:this.postUrl就是上面保存好的要上传的地址
                        if(res.body.code==0){
                            this.idcardimg=res.body.idcardFrontImgUrl;  
                        } 
                 }) 
                }
            },
        // 身份证反面上传
        //第二步:再来写个方法, button代替input选择图片
            onPickFiles() {
                 this.$refs.fileInputs.click()
            },
            //第三步: 文件选择后, 后在页面上显示出来    转base64位的操作
            getFiles ($event) { 
                const files = $event.target.files
                let filename = files[0].name          //只有一个文件
                if ( filename.lastIndexOf('.') <= 0 ) {
                    return alert("Please add a valid image!")        //判断图片是否有效
                }
                const fileReader = new FileReader()                //内置方法new FileReader()   读取文件
                    fileReader.addEventListener('load',() => {
                    this.imageUrls = fileReader.result
                })
                    fileReader.readAsDataURL(files[0])
                    this.images = files[0]
                    //已显示选择图片
                    // 提交照片
                    this.onUploads($event); 
            } ,
            //第四步: 上传文件
            onUploads ($event) { 
                if(this.imageUrls!=''){
                    Toast("请上传图片");
                }else{ 
                    $event.preventDefault();
                    let fd = new FormData();              //内置方法new FormData()  
                    fd.append('file',this.images);          //把image添加进去 
                    var url="freeter-api/addIdcardBackImg";                                  //(       第二次有效打印           )
                    this.$http.post(url,fd).then( res => {                 //第一个参:this.postUrl就是上面保存好的要上传的地址
                        if(res.body.code==0){
                            this.idback=res.body.idcardBackImgUrl;  
                        } 
                 }) 
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
 .title{
     font-size: 16px;
     font-weight: bold;
     font-family: ' PingFangSC-Regular, sans-serif';
     padding-left: .24rem;
     margin-bottom: .4rem;
 }
 .title span{
     color: #C5171F;
 }
 .bor img{
     width: 3.8rem;
     height: 2.5rem;
 }
 .card{
     position: relative;
 }
 .card img{
     width: 70%;
     margin-left: 15%;
 }
 .card span{
    font-size: 16px;
    color: #313131;
    font-family: 'SourceHanSerifSC-Light';
    position: absolute;
    left: 42%;
    top: 25%;
      
 } 
 #login .look .bor{
     margin-bottom: 3rem;
 }
 #login .look .inp{
     height: 1.9rem;bottom: 0;
 }
</style>
