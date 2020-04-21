<template>
<div class="cardBack">
    <div class="card-img" style="width:3.8rem;height:2.5rem;margin:.35rem auto;">
        <div class="bor" @click="onPickFiles"> 
            <input type="file"  ref="fileInputs" accept="images/*"  @change="getFiles" style="display: none" >           
            <img :src="imageUrls" :onerror="cards" :v-model="imageUrls"/> 
        </div>
    </div>
</div>

</div> 
</template>
<script>
export default {
    data(){
        return{  
            images:"", 
            imageUrls: "",  //img绑定的src地址
            idback: "" ,   //需要上传到的地址 
            postUrl: "" , 
            cards:  'this.src="' + require('../../lib/img/ios/card-fan@3x.png') + '"',
        }
    },
    methods:{
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