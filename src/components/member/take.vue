<template>
    <div id="take">
        <!-- 收货地址 -->
        <div class="top" style="z-index:4;position:fixed;top:0;width:100%;">
            <div class="til-left" @click="reutrns"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></div>
            <div class="til-con">收货地址</div>
            <!-- <div class="til-right"><img src="../../lib/img/ios/gengduoimg@2x.png" alt=""></div> -->
        </div>
        <div class="cont" style="margin-top:1rem;">
            <div class="mo">
                <div class="mos mo-left"><span>默认</span></div>
                <div class="mos mo-order">
                    <div class="order-top">{{defaultadres.province}}{{defaultadres.city}}{{defaultadres.area}}{{defaultadres.detailedAddress}}</div>
                    <div class="orde-tel">Carl <span>{{defaultadres.personTel}}</span></div>
                </div>
                <div class="mos mo-right"> 
                    <span @click="detail(defaultadres.id)">编辑</span><small><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></small> 
                </div>
            </div>
        </div>
        <div class="cont" v-for="(list,index) in address" :key="index">
            <div class="mo"> 
                <div class="mos mo-order" style="width:85%;" @click="postdetail(list.id)">
                    <div class="order-top">{{list.province}}{{list.city}}{{list.area}}{{list.detailedAddress}} </div>
                    <div class="orde-tel">Carl <span>{{list.personTel}}</span></div>
                </div>
                <div class="mos mo-right"> 
                    <span @click="detail(list.id)">编辑</span><small><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></small> 
                </div>
            </div>
        </div>
        <!-- <router-link to="/new"> -->
        <div class="new" @click="details(0)">新建收货地址</div>
        <!-- </router-link> -->
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            token:localStorage.getItem('token'), 
            address:[],
            defaultadres:[],
        }
    }, 
    created(){ 
        this.getaddress(); 
        this.getaddressa();
    },
    methods:{
        reutrns:function(){
           this.$router.push('/order');
        }, 
        // 默认地址
         getaddressa(){
            var token=this.token;
            var url=`freeter-api/address/api/defaultAddress?token=${token}`;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    this.defaultadres=res.body.defaultAddress;  
                }
            })
        },
        // 地址
        getaddress(){
            var token=this.token;
            var url=`freeter-api/address/api/getAddressesByUserId?token=${token}`;
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.address=res.body.data; 
                    this.address.forEach(adel=>{ 
                        if(adel.isDefault == 'false'){
                            this.adel = adel.isDefault; 
                            return Object(this.adel);
                        } 
                        this.defaultadres=adel;
                    }); 
                }
            })
        },
        // 删除地址
        // 传id编辑地址
        detail(id){ 
            this.$router.push({name:"new",params:{id}});
        },
        details(id){ 
            this.$router.push({name:"new",params:{id}});
        },
        postdetail(id){ 
            console.log('dizhi'+id);
            localStorage.setItem('notdesid',id);
            this.$router.push({name:"order"});   
        }
    }     
}
</script>
<style scoped>
#take{
    width: 100%; 
    background: #FAFAFA;
    position: absolute;
    margin-bottom:1rem;
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
.til-con{
    width: 85%;
    font-size: .42rem;
    color: #313131;
    font-family: "SourceHanSerifSC-Bold";
    font-weight: bold;
}
.top .til-right{
    width: 10%;
}
.top .til-right img{
    width: .4rem;
    height: .1rem; 
}
.cont{
    height: 1.93rem;
    padding-left: .24rem;
    padding-right: .24rem;
    background: #ffffff;
    margin-top: .2rem;
} 
.cont .mo .mos{
    float: left;
    margin-top: .4rem;
}
.cont .mo .mo-left{
    width: 15%;  
}
.cont .mo .mo-left span{
    height: .36rem;
    width: .72rem;
    display: block;
    background: #C20D12;
    font-size: .24rem;
    color: #ffffff;
    text-align: center;
    line-height: .36rem;
}
.cont .mo .mo-order{
    width: 70%; 
}
.cont .mo .mo-order .order-top{
    height: .44rem;
    line-height: .44rem;
    font-size: .33rem;
    color: #313131;
    font-weight: bold;
    font-family:"PingFangSC-Semibold,sans-serif";
    white-space: nowrap;  
    text-overflow:ellipsis; 
    overflow:hidden;
}
.cont .mo .mo-order .orde-tel{
    font-size: .28rem;
    color: #313131;
    margin-top: .25rem;
    font-family:"SourceHanSerifSC-Light";
}
.cont .mo .mo-order .orde-tel span{
    color: #939393;
}
.cont .mo .mo-right{
    width: 15%;
    line-height: 1.53rem;   
}
.cont .mo .mo-right span{
    font-size:.28rem;
    color: #313131;
    margin-right: .1rem;
    float: left;
    display: block;
    margin-top: -.05rem;
}
.cont .mo .mo-right small{
  display: block;
    line-height: 1.6rem;
}
.cont .mo .mo-right small img{
    width: .17rem;
    height: .31rem;  
}
.new{
    width: 100%;
    height: 1rem;
    background: #C20D12;
    text-align: center;
    line-height: 1rem;
    color: #ffffff;
    font-size: .42rem;
    font-family:"SourceHanSerifSC-Light";
    position: fixed;
    bottom: 0;
}
</style>
