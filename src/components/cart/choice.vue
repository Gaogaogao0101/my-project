<template>
    <div id="choice">
        <div class="top">
            <div class="top-left" @click="returns" style="z-index:4; width:4%;"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></div>
            <div class="top-right">选择支付</div>
        </div>
        <div class="choice-con">
            <div class="pri">￥<span>{{tol}}</span></div>
        </div>
        <div class="zhifu">
            <ul>
                <li @click="zhifbao" style="border-bottom:1px solid #eee;"><span><img src="../../lib/img/ios/zhifubaozhifu@3x.png" alt=""><small>支付宝支付</small></span><img class="con-img" v-if="zfb" src="../../lib/img/ios/carticon@3x.png" alt=""></li>
                <li @click="weixin" ><span><img src="../../lib/img/ios/weixinzhifu@3x.png" alt=""><small>微信支付</small></span><img class="con-img" src="../../lib/img/ios/carticon@3x.png" v-if="wx" alt=""></li>
            </ul>
        </div>
        <div class="determine" @click="determine">前往支付</div>
        <!-- <button @click="shua">shua</button> -->
    </div>
</template>
<script>
export default {
    inject:['reload'],
    data(){
        return{
            zfb:true,
            wx:false,
            // tol:this.$route.params.tol,
            // orderNo:this.$router.params.orderNo,
            // ordername:this.$router.params.ordername,
            tol:0,
            name:0,
            as:[],
            // reload: this.reload(),
        }
    },
    created(){
        this.orders();
    },
    mounted(){
        sessionStorage.removeItem('selectyh');
    },
    methods:{
        returns(){
            javascript:history.back(-1);
        },

        weixin(){
            this.wx=true;
            this.zfb=false;
        },
        zhifbao(){
            this.zfb=true;
            this.wx=false;
        },
        orders(){
           this.tol=sessionStorage.getItem('tol');
           this.name=sessionStorage.getItem('name');
           this.as=sessionStorage.getItem('order');
           localStorage.removeItem('countsums');
            // console.log(this.tol,this.name,this.as);

        },

        determine(){
            if(this.zfb==true){
                this.getzhifu();
            }else if(this.wx==true){
                this.wxpay();
            }
        },
        getzhifu(){
            // var money=this.tol;
            var name=this.name;
            var ordo=this.as;
            var url=`freeter-api/order/api/alipay/createOrder?orderNo=${ordo}&orderName=${name}`;
            // var url="freeter-api/order/api/alipay/createOrder";
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.resulturl=res.body.result;
                }
            })
           this. goAlipay();
        },
          goAlipay () {
                this.maskShow=false;
                var name=this.name;
                var ordo=this.as;
                let url=`freeter-api/order/api/alipay/createOrder?orderNo=${ordo}&orderName=${name}`;
               this.$http.post(url).then(res => {
                      if(res.status === 200){
                        const div = document.createElement('div')
                        div.innerHTML = res.body //此处form就是后台返回接收到的数据
                        document.body.appendChild(div)
                        document.forms[0].submit()
                       }
                 })
             this.$router.push({name:"home"});
        //    setInterval(() => {
        //
        //     },3000);
          },
         wxpay(){
              this.$router.push({name:"home"});
            // setInterval(() => {
            //     this.$router.push({name:"home"});
            // },3000);
              var ordo=this.as;
              var url=`freeter-api/order/api/WXPay/createOrder?orderNo=${ordo}`;
              this.$http.post(url).then(res=>{
                console.log(res)
                  if(res.body.code==0){
                    let statement = res.body.orderPay
                    statement = Base64.decode(statement);
                    // console.log(statement)
                    this.wxAppPay(statement);
                    return
                    this.$router.push({path:'/payment'});
                   this.orderpay = Base64.decode(res.body.orderPay);
                   let appids=JSON.parse(this.orderpay);
                   let wx=this.$wx;
                    wx.chooseWXPay({
                        appId:appids.appid,
                        timestamp: appids.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: appids.noncestr, // 支付签名随机串，不长于 32
                        package: appids.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign:  appids.sign, // 支付签名
                        partnerid:appids.partnerid,
                        prepayid:appids.prepayid,
                        success: res => {
 console.log(res,"sjhdsjaghdujsagdsyahju")
                            //跳转到支付成功页面有这个页面
                            // $this.$router.push({
                            //     path: "/success_page",
                            //     name:"success_page"
                            // })
                                Toast("支付成功");

                        },
                        cancel: res => {//提示引用的是mint-UI里toast
                            Toast('已取消支付');
                        },
                        fail: res => {
                            Toast('支付失败，请重试');
                        }
                    })

                  }
              })
              this.maskShow=false;
          },

          wxAppPay(statement){
              // arter(statement)
              if(plus){
                plus.payment.getChannels(function(cs) {
                    let channels = cs;
                    for(var i in channels) {
                        // console.log(`=====>channel:${channels[i].id}`);
                        if(channels[i].id == "wxpay") {
                            let channel = channels[i];
                            plus.payment.request(channel, statement, function(){
                                // alert("支付操作成功！");
                                this.getpayment();
	                        }, function(e){
                                // console.log(`=====>error:${JSON.stringify(e)}`)
                                // alert(JSON.stringify(e))
                                alert("支付失败");
                                this.setpayment();
                            } );
                        }
                    }
                }, function(e) {
                    // alert("获取支付通道失败：" + e.message);
                    this.setpayment();
                });

              }
          },
          setpayment(){
              this.$router.push({path:'/payments'});
          },
          getpayment(){
              this.$router.push({path:'/payment'});
          },
    },
    watch :{
        　'$route': function (to, from) {
            //执行数据更新查询
        // 　　this.changePage();
        　　}
        }
}
</script>
<style scoped>
#choice{
    width: 100%;
    height: 100%;
    position: fixed;
    background: #fff;
}
.top{
    width: 100%;
    height: 1.2rem;
    padding-left: .2rem;
    line-height: 1rem;
}
.top div{
    float: left;
}
.top .top-left{
    width: .2rem;
    position: absolute;
    left: .24rem;
}
.top .top-left img{
    width: 100%;
    width: .2rem;
    height: .35rem;
    margin-top: .3rem;
}
.top .top-right{
    margin-left: .5rem;
    font-size: .38rem;
    font-weight: bold;
    color: #313131;
    font-family:"Source Han Sans CN";
}
.pri{
    width: 100%;
    text-align: center;
    margin: auto;
    font-family:' PingFangSC-Regular, sans-serif';
    margin-top:1.5rem;
    margin-bottom: 1rem;
}
.pri span{
    font-size: .6rem;
    font-family:' PingFangSC-Regular, sans-serif';
}
.zhifu ul{
    width: 90%;
    margin: auto;
    height:2.4rem;
    box-shadow: #eee 0px 0px .1rem .1rem;
}
.zhifu ul li{
    width: 100%;
    height: 1.2rem;
    padding-left: .5rem;
    padding-top: .35rem;
}
.zhifu ul li span{
    display: inline-block;
    width: 80%;
    height: 100%;
}
.zhifu ul li span small{
    width: 2rem;
    display: block;
    height:.5rem;
    line-height:.5rem;
    float: left;
    margin-left: .2rem;
}
.zhifu ul li span img{
    width: .5rem;
    float: left;
}
.zhifu ul li .con-img{
    float:right;
    width: .5rem;
    margin-right: .5rem;
}
.con-img{
    float: right;
}
.determine{
    width: 80%;
    height: .8rem;
    background: #C5171C;
    position: fixed;
    bottom: 1rem;
    left: 10%;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    line-height: .8rem;
    font-size: .32rem;
    font-family:'PingFangSC-Regular, sans-serif';
}
</style>
