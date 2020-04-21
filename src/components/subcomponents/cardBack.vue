<template>
<div class="cardBack">
    <div class="card-img" style="width:3.8rem;height:2.5rem; margin:.35rem auto;">
     <div class="bor" @click="onPickFilea"> 
        <input type="file"  ref="fileInputa" accept="imagea/*"  @change="getFilea" style="display: none" >           
        <img :src="imageUrla" :onerror="logo" :v-model="imageUrla"/> 
    </div>
</div>

</div> 
</template>
<script>
export default {
    data(){
        return{ 
            imagea:"",
            imageUrl: "",  //img绑定的src地址
            imageUrla: "",  //img绑定的src地址
            postUrl: "" ,   //需要上传到的地址
            idcardimg:'',  //身份证正面照
            logo: 'this.src="' + require('../../lib/img/ios/card-zheng@3x.png') + '"',
        }
    },
    methods:{
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