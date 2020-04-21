<template>
    <div id="cartdel">
        <div class="top" style="height:0;">
            <div class="tops" style="z-index:4;position:fixed;background:#F7F7F7; width:100%;">
                <div class="til-left" @click="back()"><!--<router-link to="/homesa">--> <img src="../../lib/img/ios/fanhuizuo@3x.png" style="height:.3rem;margin-left:.24rem;width:.18rem;margin-top.2rem;" alt=""><!--</router-link>--></div>
               
            </div> 
            <!-- <div class="banner-img" style="width:100%;height:100%;position:absolute;left:0;top:0;"> -->
                <!-- <img :src="'http://app.hzhlsy.net/freeter-admin/'+details.picImg" alt="">  --> 
            <!-- </div>   --> 
        </div>
        <mt-swipe :auto="8000" style="height:3.55rem;" :show-indicators="false">  
            <mt-swipe-item  class="banner" v-for="(item,index) in detailsImg" :key="index">
                <img :src="'http://app.hzhlsy.net/'+item.picImg" alt="" style="width:3.25rem;height:2.3rem;position:absolute;top:.9rem;left:30%;">
                <div class="shu" style="position:absolute;bottom:0.24rem;right:0.24rem;color:#939393;">{{index+1}}/{{detailsImg.length}}</div> 
            </mt-swipe-item>  
        </mt-swipe> 
        <div class="cdel">
             <div class="prc" v-if="willShow">￥<span>{{moprice}}</span> </div>
             <div class="prc" v-else>￥<span>{{price}}</span> </div>
             <div class="til">{{details.goodName}}</div>
             <div class="kd">快递：{{freight}}元</div>  
             <div class="ge">
                <span style="width:100%;height:.5rem;display:block;">产品规格</span> 
                 <div class="h"></div>
                 <div class="cp">
                     <div v-for="(item,index) in detailsa" :key="index" :class="{active:current==index}" @click="addClass(index,item.id,item.price)">{{item.specName}}</div> 
                 </div>
             </div>  
             <div class="ms">产品描述 <span>{{details.introduce}}</span></div> 
        </div>
        <div class="hs"></div>
        <div class="sdel">
            <span class="sdel-til"><span class="sdel-blo sdel-blo-tl">商品详情</span><small class="sdel-blo">/</small><span class="sdel-blo">DETAIL</span></span> 
            <div class="shopimg">
                <div class="bag-img"></div>
                <div class="shop-imgs">
                    <div v-html="delist" class="con-del-img">
                      <!-- <img :src="'http://app.hzhlsy.net:8081/freeter-admin/'+details.picImg" alt=""> -->
                      {{delist}}
                    </div>
                </div>
            </div>
        </div>
        <div class="shoping">
            <div class="hr"></div>
            <div class="shop-con">
                <div class="lr shop-con-left">
                        
                <div class="ls fx"><img src="../../lib/img/ios/fx@3x.png" alt="" @click="share"><div>分享</div></div>
                  <mt-popup
                          v-model="popupVisible"
                          position="bottom"
                          class="pop">
                          <div class="con">
                              <div class="left" @click="wx_friend"><img src="../../lib/img/wx_logo.png" class="pic_left"><div class="left_text">微信好友</div></div>
                              <div class="right" @click="wx_pyq"><img src="../../lib/img/wx_pyq.png" class="pic_right"><div class='right_text'>朋友圈</div></div>
                          </div>
                          <div class="cancel" @click="cancel">取消</div>
                  </mt-popup>
                   
                    <div class="ls gwc"><img src="../../lib/img/ios/cart@3x.png" @click="Iflogin" alt=""><div>加入购物车</div></div> 
                </div>
                <div class="lr" style="width:10%;height:.9rem;"></div>
                <div class="lr shop-con-right" @click="purchase(goodId)">立即购买</div>
            </div>
        </div>
    </div> 
</template>
<script>
import {Rem} from "../../lib/js/rem.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf'
import {Toast} from 'mint-ui'
import {Popup} from 'mint-ui'
import '../../lib/css/img.css'
export default {
    inject:['reload'],

    data(){return{
        //商品图片 名称 价格 对象 
        details:{},
        // 商品规格
        detailsa:{},
        // 商品详情图片
        detailsImg:{},
        // 商品规格对象 
        // 默认价格
        moprice:'',
        goodId:localStorage.getItem('gid'), 
        // 用户的id 
        token:localStorage.getItem('token'),
        current:0,
        goodSpecId:'',
        specId:"",
        productImg:[],
        price:"",
        willShow:true,
        delist:'',
        freight:'',
        mospecid:'', 
        morid:'',
        isActive:this.$route.params.isActive,
        listid:this.$route.params.listid,
        popupVisible: false,
        shareObj:[]
    }}, 
    created(){ 
        this.getGoodinfo(); 
        this.getlist();
        this.getKuai();
    },
    mounted(){
        
    },
    methods:{
        back(){ 
            var a=this.isActive;
            var listid=this.listid;
            console.log(a)
            console.log(listid+'detail')
            this.$router.push({name:"homesa",params:{a,listid}});
        }, 
        plus(){
           var counts=this.counts;
           
        },
        reduce(){},
        addClass (index,id,price) {
            console.log(id);
          this.current = index;  
            this.specId=id; 
            localStorage.setItem('specid',id); 
          this.price=price;
          this.fn(); 
        },
         fn:function(){
          if(this.willShow==true){
            this.willShow=false;
          } 
        },
        reutrns:function(){
            javascript:history.back(-1);
        },
        // 数据 加载
        getGoodinfo(){ 
            var gid=localStorage.getItem('gid'); 
            var url="freeter-api/good/getGoodDetail?goodId="+gid;
            this.$http.post(url).then(result=>{  
                if(result.body.code==0){
                    this.details=result.body.data.good;
                    this.productImg=result.body.data.good.picImg;
                    this.detailsa=result.body.data.goodSpecPrice; 
                    this.moprice=this.detailsa[0].price;
                    this.mospecid=this.detailsa[0].id;
                    console.log(this.mospecid);
                    this.detailsImg=result.body.data.image; 
                }else{
                    Toast("数据加载失败")
                }
            })
            // localStorage.removeItem('specid');
        }, 
        // 快递费
        getKuai(){
          
            sessionStorage.removeItem('tol');
            sessionStorage.removeItem('order');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('selectyh');
         },
        // 获取商品详情
        getlist(){
            var goodid=this.goodId;
            var url="freeter-api/goodDetail/getGoodDetail?goodId="+goodid;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    this.delist=res.body.goodDetail;  
                }else if(res.body.code==0){
                    Toast(res.body.msg);
                }
            })
            
        },
        // 加入购物车
        Iflogin(){
                var userid=this.token; 
                var id=localStorage.getItem('specid');
                if(userid==undefined){
                    this.$router.push({path:'/land'});
                }else if(id==""){
                    Toast("请选择添加商品规格");
                }else{
                    this.Addto();
                }
        }, 
        // 添加购物车 
        Addto(){ 
            var token=this.token;
            var id=localStorage.getItem('specid');
            if(token==undefined){
                Toast("请先登录");
            }else if(id==undefined){
                this.morid=this.mospecid;
            } else if(id!=undefined){
                this.morid=localStorage.getItem('specid');
            } 
            this.mospecids();
        },
        mospecids(){ 
            var url=`freeter-api/cart/add?token=${this.token}&goodSpecId=${this.morid}`;
            this.$http.post(url).then(res=>{  
                if(res.body.code==0){
                    Toast("添加购物车成功");
                        localStorage.removeItem('gid');
                        localStorage.removeItem('specid');
                }else{
                    Toast("添加购物车失败");
                        localStorage.removeItem('gid');
                }
            })
        },
        //直接购买
        purchase(goodid){ 
            this.iftoken(); 
             var token=this.token;
             var specId=this.specId;
             var counts=this.counts; 
             if(token==undefined){
                 Toast("请先登录"); 
                 this.$router.push({name:'land'});
             }else{
                this.shopping(goodid);
                console.log(1);
             }
           sessionStorage.setItem('s',1)  
        },
        shopping(goodid){
            var specId=this.specId;
            var counts=this.counts;
            if(this.specId==""){
                // Toast("请选择购买商品规格");
                this.specId=this.mospecid; 
                var specId=this.specId;
                localStorage.setItem('specid',specId);
                this.$router.push({name:'sorders',params:{specId,goodid}}); 
                console.log(specId+'2222');
            }else{
                console.log(3);
                localStorage.setItem("specid",specId);
                sessionStorage.setItem('selectaddres',1);
                this.$router.push({name:'sorders',params:{specId,goodid}}); 
                console.log(3333);
            } 
        },
        iftoken(){
        var url="freeter-api/user/userinfo?token="+this.token;
        this.$http.post(url).then(res=>{
            if(res.body.code==500){
                //  Toast(res.body.msg);
                 localStorage.removeItem('token');
                 this.$router.push('/land');
            }
        })
      },  


    //   点击分享
      share () {
            this.popupVisible = true
      },
    //   点击取消
      cancel() {
          this.popupVisible = false
      },
    //   分享到好友
    wx_friend() {
         let t = this  //因为用的vue框架，这里需要用到this ，如果没有用可注释
　　    plus.share.getServices(function(e) {
    　　t.shareData = e　　　　　　　　//这个回调函数的参数 e 就包含了 所有对象的数组

　　　　//在这个数组里 找到属于微信的对象 循环匹配查找
    　　for(var i in e){　　　　　　　　
        　　if('weixin' == e[i].id){
            　　t.sharewx = e[i]　　//保存到变量里 （之后即可使用该对象发起分享）
        　　}
    　　}
　　})
　　var images = this.detailsImg
    var imagee = ''
    for(var i = 0;i<images.length;i++){
        imagee = images[i].picImg
    }
　　let msg = {
　　　　title: this.details.goodName,
　　　　content: this.details.introduce,
　　　　thumbs: ['http://app.hzhlsy.net/'+imagee],
　　　　href: 'http://app.hzhlsy.net/',
　　　　extra:{scene:"WXSceneSession"} // 'WXSceneSession'分享给好友，'WXSceneTimeline'分享到朋友圈
　　}

　　//msg对象的属性和参数 官方文档里有说明
　　//这里就用到了上面获取到的 微信对象 使用send发起分享
if(t.sharewx != undefined){
　t.sharewx.send(msg, function() {
　　　　console.log('分享成功')
　　},function(error) {
　　　　console.log('分享失败')
　　})
}
　
    },
    // 分享到朋友圈
    wx_pyq() {
let t = this  //因为用的vue框架，这里需要用到this ，如果没有用可注释
　　plus.share.getServices(function(e) {
    　　t.shareData = e　　　　　　　　//这个回调函数的参数 e 就包含了 所有对象的数组

　　　　//在这个数组里 找到属于微信的对象 循环匹配查找
    　　for(var i in e){　　　　　　　　
        　　if('weixin' == e[i].id){
            　　t.sharewx = e[i]　　//保存到变量里 （之后即可使用该对象发起分享）
        　　}
    　　}
　　})
    
    var images = this.detailsImg
    var imagee = ''
    for(var i = 0;i<images.length;i++){
        imagee = images[i].picImg
    }
//     alert('http://app.hzhlsy.net/'+imagee)
// 　　alert(this.details.introduce)
　　let msg = {
　　　　title: this.details.goodName,
　　　　content: this.details.introduce,
　　　　thumbs: ['http://app.hzhlsy.net/'+imagee],
　　　　href: 'http://app.hzhlsy.net/',
　　　　extra:{scene:"WXSceneTimeline"} // 'WXSceneSession'分享给好友，'WXSceneTimeline'分享到朋友圈
　　}

　　//msg对象的属性和参数 官方文档里有说明
　　//这里就用到了上面获取到的 微信对象 使用send发起分享
　　if(t.sharewx != undefined){
　t.sharewx.send(msg, function() {
　　　　console.log('分享成功')
　　},function(error) {
　　　　console.log('分享失败')
　　})
}
    }
    }     
}
</script>
<style scoped>
 @import '../../lib/css/details.css';
 .top div{
    float:none !important;
 }
 .is-active{
     background:#f7f7f7 !important;
     background: none;
 }
  .shopimg .con-del-img{
      width: 100%;
  }
 .shopimg .con-del-img img{
     width: 100% !important;
 }  
</style>
