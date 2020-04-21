<template>
<div id="new">
   <div class="top">
        <div class="til-left" @click="reutrns"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></div>
        <div class="til-con">收货地址</div>
        <div class="til-right" @click="postlist">完成</div>
    </div>  
    <div class="content">
        <div class="na">
            <div class="nas name-left">姓名</div>
            <input type="text" v-model="username" placeholder="点击输入" >
            <div class="nas name-img"><img src="../../lib/img/ios/fanhuiright@3x.png" alt=""></div>
        </div>
        <div class="na">
            <div class="nas name-left">手机号</div>
            <input type="text" v-model="newPhone" placeholder="点击输入"  oninput="if(value.length>11)value=value.slice(0,11)">
            <div class="nas name-img"><img src="../../lib/img/ios/fanhuiright@3x.png" alt=""></div>
        </div>
        <div class="na"> 
            <div class="nas name-lefts">收货地址 </div>
            <div class="nas name-imgs"><input style="width:4.2rem;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" type="text" v-model="city" /><div @click="toAddress" style="color:#939393;font-size:.32rem;">请选择</div><!-- <img src="../../lib/img/ios/fanhuiright@2x.png" alt="">--></div>
        </div>
        <div class="na"> 
            <div class="nas name-leftad">具体地址</div>
            <input type="text" v-model="address" class="adress" placeholder="点击输入">
            <div class="nas name-img"><img src="../../lib/img/ios/fanhuiright@3x.png" alt=""></div>
        </div>
        <div class="na" style="border-bottom:none;"> 
            <div class="nas name-left-more">设为默认地址</div>
            <div class="nas name-img-more"><mt-switch class="open" v-model="more" @change="turn"></mt-switch></div>
        </div>
        <!-- <div class="details"></div> -->
        <div class="na" style="border-bottom:none;"> 
           <div class="details" @click="updeil">删除地址</div>
        </div>
    </div> 
    <div style="" class="mask" v-show="mask"> 
        <v-distpicker type="mobile" @selected='selected' v-show="addInp" static-placeholder></v-distpicker>
    </div>
</div>    
</template>
<script>
import VDistpicker from 'v-distpicker' 
import {Toast} from 'mint-ui'
export default {
    inject:['reload'],
    data(){
        return{
            city:[],
            addInp :false,
            mask:false,
            newPhone: "",
            token:localStorage.getItem('token'),
            province:[],
            citys:[],
            areas:[],
            username:'',
            address:'',
            more:false,
            addressid:this.$route.params.id, 
            adel:[], 
        }
    },
    components: { VDistpicker }, 
    created(){   
        this.getdeladdress();
        this. getadelid();
        this.information();
    },
    methods:{
        reutrns:function(){
            javascript:history.back(-1);
        },
        // 获取地址
        toAddress(){
            this.mask = true;
            this.addInp = true;
             
        },
        selected(data){
            this.mask =false;
            this.addInp = false;
            this.city = data.province.value + ' ' + data.city.value +' ' + data.area.value;
            this.province= data.province.value;
            this.citys=data.city.value;
            this.areas=data.area.value; 
        },  
        postlist(){
            var id=this.addressid; 
            if(id==0){ 
              this.addto(); 
              return; 
            }else{
              this.addcalss(); 
              return; 
            }
        },
        //  用户添加地址接口
        addto(){  
             var token=this.token;
                var name=this.username;//姓名
                var Tel=this.newPhone;//手机号 
                var province=this.province;//省
                var citys=this.citys;//市
                var areas=this.areas; //区县
                var address=this.address;//详细地址
                var more=this.more;//是否为默认
                const self = this;
                var url=`freeter-api/address/api/save?token=${token}&personName=${name}&personTel=${Tel}&province=${province}&city=${citys}&area=${areas}&detailedAddress=${address}&isDefault=${more}`;
            if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(self.newPhone)) { 
                Toast("请输入正确的电话号码"); 
            }else if(!this.username==null){
                Toast("用户名不能为空"); 
             }else if(name==''){
                Toast("用户名不能为空"); 
            }else if(Tel==''){
                Toast('手机号码不能为空');
            }else if(province==''||citys==''||areas==""||address==""){
                Toast('请输入完整的地址'); 
            }else{  
                this.$http.post(url).then(res=>{   
                    if(res.body.code==0){  
                        Toast(res.body.msg);
                        // this.$router.push({path:'/takes'})
                    }else if(res.body.code==500){ Toast(res.body.msg); }
                })
            }
        },
        // 修改地址
        addcalss(){
            var token=this.token;
                var name=this.username;//姓名
                var Tel=this.newPhone;//手机号 
                var province=this.province;//省
                var citys=this.citys;//市
                var areas=this.areas; //区县
                var address=this.address;//详细地址
                var more=this.more;//是否为默认
                var id=this.addressid;
                const self = this;
                var url=`freeter-api/address/api/update?token=${token}&id=${id}&personName=${name}&personTel=${Tel}&province=${province}&city=${citys}&area=${areas}&detailedAddress=${address}&isDefault=${more}`;
            if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(self.newPhone)) { 
                Toast("请输入正确的电话号码"); 
            }else if(!this.username==null){
                Toast("用户名不能为空"); 
             }else if(name==''){
                Toast("用户名不能为空"); 
            }else if(Tel==''){
                Toast('手机号码不能为空');
            }else if(province==''||citys==''||areas==""||address==""){
                Toast('请输入完整的地址'); 
            }else{  
                this.$http.post(url).then(res=>{   
                    if(res.body.code==0){  
                        Toast(res.body.msg);
                        this.$router.push({path:'/takes'})
                    }else if(res.body.code==500){ Toast(res.body.msg); }
                })
            }
        },
        // 获取地址id
        getadelid(){
            var id=parseInt(this.addressid);
            var token=this.token;
            var url=`freeter-api/address/api/info?token=${token}&id=${id}`;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    this.adel=res.body.address; 
                    this.username=res.body.address.personName;
                    this.newPhone=res.body.address.personTel;
                    this.province=res.body.address.province; 
                    this.citys=res.body.address.city;
                    this.areas=res.body.address.area; 
                    this.address=res.body.address.detailedAddress;
                    this.city.push(this.province,this.citys,this.areas);
                }
            })
        },
        // 信息转换
        information(){ 
            var a=this.province;
            var b=this.citys;
            var c=this.areas; 
        },
        turn: function(){ 
            var a=this.value;
            if (a==0) {
                a = 0;
                this.value=a; 
            }
            else {
                a = 1; 
                this.value=a;
            }

        },
        updeil(){
            var token=this.token;
            var ids=parseInt(this.addressid);
            var url=`freeter-api/address/api/delete?token=${token}&ids=${ids}`;
            this.$http.post(url).then(res=>{ 
                Toast(res.body.msg);
                this.reload();
            })
            this.$router.push('/take');
        },
        getdeladdress(){
            var token=this.token;
            var id=this.addressid;
            // var url=`freeter-api/address/api/info`
        },
    }  
}
</script>
<style scoped>
#new{
    position: absolute;
    height: 100%;
    height: 100%;
    background: #ffffff;
}
.top{
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    padding-left: .24rem;
    padding-right: .24rem;
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
.til-con{
    width: 80%;
    font-size: .42rem;
    font-weight: bold;
    font-family:"SourceHanSerifSC-Light";
}
.top .til-right{
    width: 15%;
    color: #313131;
    font-size: .32rem;
    font-family:"SourceHanSerifSC-Light";

} 
#new  .content{
    margin-top: .1rem;
    padding-left: .24rem;
    padding-right: .24rem;
}
#new  .content .na{
    width: 100%;
    height: 1.4rem;
    line-height: 1.4rem;
    color: #414141;
    font-size: .32rem;
    border-bottom: 1px solid #EDEDED;
    font-family:"SourceHanSerifSC-Light";
}
#new .content .na{ 
    float: left;
}
#new .content .na .name-left{
    width:15%;
    float: left;
    font-size: .32rem;
    color: #414141;
    font-family:"SourceHanSerifSC-Light";
}
#new .content .na .name-img{
    width:5%;
    line-height: 1.5rem;
    float: right;
    text-align: right;
}
#new .content .na input{
    width: 80%;
    border: none; 
    padding: 0;
    height:.7rem;
    text-align: right;
    font-size: .28rem;
    color: #939393;
}
/* 选择地址 */
#new .content .na .name-lefts{
    width:20%;
    float: left;
    font-size: .32rem;
    color: #414141;
    font-family:"SourceHanSerifSC-Light";
}
#new .content .na .name-imgs{
    width:80%;
    line-height: 1.5rem;
    float: right;
    text-align: right;
} 
#new .content .na .name-imgs input{
    line-height: 1.6rem; 
    display: block;
    float: left;
    text-align: right;
    width: 90%;
    font-size: .28rem;
    color: #939393;
    margin-bottom: 0;
    margin-top: .3rem;
    font-family:"SourceHanSerifSC-Light";
}
/* 具体地址 */
#new .content .na .name-leftad{
    width:20%;
    float: left;
    font-size: .32rem;
    color: #414141;
    font-family:"SourceHanSerifSC-Light";
}
#new .content .na .adress{
    width: 75%;
    word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
/* 默认地址 */
#new .content .na .name-left-more{
    width:50%;
    float: left;
    font-size: .32rem;
    color: #414141;
    font-family:"SourceHanSerifSC-Light";
}
#new .content .na .name-imgs-more{
    width:50%;
    line-height: 1.5rem;
    float: right;
    text-align: right;
} 
.open{
    float:right; 
    margin-top: .3rem;
}
#new .content .na .name-img img{
    width: .2rem;
    height: .37rem; 
}
#new .content .na .name-imgs img{
    width: .2rem;
    height: .37rem; 
}
.details{
    width: 70%;
    height: 1rem;
    background:#C5161C;
    color: #ffffff;
    margin: auto;
    text-align: center;
    line-height: 1rem;
    font-size: .4rem;
    margin-top: 2rem;
    border-top-left-radius: .5rem;
    border-top-right-radius:.5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
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
