<template>
  <div id="news">
    <div class="top" style="z-index:4;position:fixed;top:0; width:100%;">
        <router-link to="/home"><div class="top-left"><img src="../../lib/img/ios/fanhui@3x.png" alt=""></div> </router-link>
        <div class="top-right">消息</div>
    </div> 
    <div class="new-con">
        <ul>
            <li class="news-li" v-for="(item,index) in list" :key="index">
                <div class="news-til"><small>{{item.title}}</small><span>{{item.createTime.substring(0,16)}}</span></div>
                <div class="news-con" >{{item.content}}</div>
            </li>
        </ul>    
    </div>
  </div>  
</template>
<script>
export default {
    data(){
        return{
            list:[],
        }
    }, 
    created(){
        this.getnewlist();
    }, 
    methods:{
        getnewlist(){
            var url=`freeter-api/myhome/getNotification`;
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.list=res.body.list;  
                }
            })
        }
    },
}
</script>
<style scoped>
#news{
    width: 100%;
    height: 100%;
    background: #fff;
}
#news .top{
    height: 1rem; 
    line-height: 1rem;
    background: #fff;
    padding-left: .24rem;
}
#news .top div{
    float: left;
}
#news .top .top-left{
    width: .2rem;
}
#news .top .top-left img{
    width: 100%;
    width: .2rem;
    height: .35rem;
   margin-top: .3rem;
    position: fixed;
   left: .24rem;
}
#news .top .top-right{
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
.new-con{
    margin-top:1rem;
    padding-left: .24rem;
    padding-right: .24rem;
}
.news-li{
    width: 100%;
    height: 1.4rem; 
    border-bottom: 1px solid #eee;
}
.news-li .news-til{
    font-size: .38rem;
    height: .7rem;
    color: #313131;
    line-height: .7rem; 
    font-family: "SourceHanSerifSC-Medium";
}
.news-li .news-til small{
    overflow: hidden; 
    text-overflow: ellipsis; 
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    float: left;
    font-size:100%;
    width:65%;
    display:block;
}
.news-li .news-til span{
    float: right;
    font-size: .28rem;
    color: #939393;
}
.news-li .news-con{
    font-size: .28rem;
    height: .6rem;
    color: #939393;
    line-height: .6rem;
    overflow: hidden; 
    text-overflow: ellipsis; 
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    font-family: "SourceHanSerifSC-Medium";
}
</style>
