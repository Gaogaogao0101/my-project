<template>
   <div id="code">
        <div class="top" style="z-index:4;position:fixed;top:0; width:100%;">
            <router-link to="/member"><div class="top-left"><img src="../../lib/img/ios/fanhui@3x.png" alt=""></div> </router-link>
            <div class="top-right">我的邀请码</div>
        </div>
        <div class="con">
          <img class="image" :src="invitation" v-if="code == 0"/>
          <div v-else>没有邀请码请登录</div>
        </div>

   </div>
</template>
<script>
export default {
    data(){
        return{
           token:localStorage.getItem('token'),
        //    list:0
        invitation:'',
        code:''
        }
    },
    created(){
        this.getcode();
    },
    methods:{
        getcode(){
            var token=this.token;
            var url=`freeter-api/user/getInvitation?token=${token}`;
            this.$http.post(url).then(res=>{
                // if(res.body.code==0){
                //     this.list=res.body.userCode;
                // }
                // this.data.invitation = res.
                console.log(res)
                this.code = res.body.code
                if(res.body.code == 500) {
                     this.invitation = res.body.msg
                    console.log(this.invitation)
                }
                if(res.body.code == 0) {
                      this.invitation = res.body.userCode
                }

            })
        }
    }
}
</script>
<style scoped>
#code{
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;

}
#code .top{
    height: 1rem;
    line-height: 1rem;
    background: #fff;
    padding-left: .24rem;
}
#code .top div{
    float: left;
}
#code .top .top-left{
    width: .2rem;
}
#code .top .top-left img{
    width: 100%;
    width: .2rem;
    height: .35rem;
   margin-top: .3rem;
    position: fixed;
   left: .24rem;
}
#code .top .top-right{
    width: 96%;
    text-align: center;
    font-size: .42rem;
    font-weight: bold;
    color: #313131;
    font-family:"Source Han Sans CN";
}
ul,li{
    padding: 0;
    margin: 0;
}
.con{
    width: 6rem;
    height: 3rem;
   /* background: palegoldenrod; */
    margin: auto;
    margin-top:4rem;
    font-size: .39rem;
    font-family: 'SourceHanSerifSC-Medium';
    text-align: center;
    line-height: 2rem;
    color: #313131;
    align:center
}
.image{


}
</style>
