<template>
  <div id="portrait">
      <div class="top">
         <div class="til-left"><router-link to="/member"> <img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></router-link></div>
         <div class="til-con">更换头像</div> 
      </div> 
      <div class="look">
        <div class="bor" @click="onPickFile"> 
            <input type="file"  ref="fileInput" accept="image/*"  @change="getFile" style="display: none" >           
            <img :src="imageUrl" :v-model="imageUrl" :onerror="logo"/>  
        </div>
        <div class="inp">
            <div class="etc" @click="getlogin" v-if="willShow">提交审核 <img src="../../lib/img/ios/shenheloginright@3x.png" alt=""> </div>
            <div class="etc" v-else style="background:#eee;color:#C5171F;">数据已提交<img src="../../lib/img/ios/shenheloginright@3x.png" alt=""> </div>
        </div>
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            willShow:true,
            imageUrl: "",  //img绑定的src地址
            postUrl: "" ,   //需要上传到的地址
            image:"",
            imgs:'',
            Url:'',
            event:[],
            willShow:true, 
            token:localStorage.getItem('token'),
            logo: 'this.src="' + require('../../lib/img/ios/user20190727140338.png') + '"',
        }
    }, 
    created(){
        this.getList();
    },
    methods:{
        // 获取当前头像
         getList(){
          var url="freeter-api/user/userinfo?token="+this.token;
           this.$http.post(url).then(res=>{  
              if(res.body.code==0){
                 this.imageUrl=res.body.userinfo.picImg;  
              }
           })
       },
        getlogin(){
          let $event=this.event;
           this.onUpload($event);
        },
         fn:function(){
            if(this.willShow==true){
                this.willShow=false;
            }else{
                this.willShow=true
            }
        },
            //第二步:再来写个方法, button代替input选择图片
            onPickFile () {
                 this.$refs.fileInput.click()
            },
             //第三步: 文件选择后, 后在页面上显示出来    转base64位的操作
            getFile ($event) {
                console.log("====================");
                console.log($event);
                console.log("--------------------");
                this.event=$event;
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
            } ,
            //第四步: 上传文件
            onUpload ($event) {
                  if($event==''){
                      Toast("请选择头像");
                  }else{
                    $event.preventDefault();
                    let fd = new FormData();              //内置方法new FormData()  
                    fd.append('file',this.image);          //把image添加进去 
                    var url="freeter-api/user/updateHeadPohto?token="+this.token;                                  //(       第二次有效打印           )
                    this.$http.post(url,fd).then( res => {                 //第一个参:this.postUrl就是上面保存好的要上传的地址
                        console.log("++++++++++++++");
                        console.log(url);
                        console.log("++++++++++++++");
                        if(res.body.code==0){
                            Toast("上传成功");
                            this.$router.push('/personal');
                        } 
                 })
                //   this.getlogin(); 
            }  
            }
    }
}
</script>
<style scoped>
#portrait{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
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
#portrait .look .bor{
    width: 2.48rem;
    height: 3.3rem;
    margin:2rem auto;
    text-align: center;
    border: 1px dashed #8F8F8F;
    background-image: url(../../lib/img/ios/camera@2x.png);
    background-repeat: no-repeat;
    background-size: .45rem .39rem;
    background-position: 1rem 1.85rem;
    background-color:rgba(111,198,250,.1);
    position: relative;
}
#portrait .look .bor p{
    font-size: .32rem;
    font-family: "SourceHanSerifSC-Light";
    margin-top:.95rem;
}
#portrait .look .bor img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
#portrait .look .inp{ 
    width: 100%;
    height: .9rem;
    background:#FAFAFA; 
    color: #ffffff; 
    padding-bottom: 2.1rem;
    padding-top: 1rem;
}
#portrait .look .inp .etc{
    width: 6rem;
    margin: auto;
    background: #C5171F;
    height: .9rem;
    text-align: center;
    font-size: .38rem;
    line-height: .9rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    font-family: "SourceHanSerifSC-Light";
}
#portrait .look .inp .etc img{
    width: .12rem;
    height: .21rem;
    margin-left: .1rem;
}
#portrait .look .inp input{
    width: 6.03rem;
    margin: auto;
    background: #C5171F; 
    color: #ffffff;
    font-size: .38rem;
    text-align: center;  
    font-family: "SourceHanSerifSC-Light";
}
#portrait .look .inp input::-webkit-input-placeholder {  
    color:white;  
}
</style>
