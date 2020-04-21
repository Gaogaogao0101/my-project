<template>
  <div class="wu">
        <div class="top">
            <div class="til-left"><router-link to="/staya"> <img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></router-link></div>
            <div class="til-con">查看物流</div> 
        </div> 
      <div class="tops"> 
          <div class="tops-right">
              <div class="tops-com">物流公司：{{name}}</div>
              <div class="tops-num">物流单号：{{codes}}</div>
              <!-- <div class="tops-tel">物流电话： </div> -->
          </div>
      </div>
      <div style="width:100%;height:.2rem;background:#eaeaea;"></div>
      
      <div class="wl">
          <div class="wl-left">物流状态</div> 
          <div class="wl-con">
          <div>
             <div class="inlie" v-if="logisticsList.length==0">
                <!-- <div class="inline" style=""><img src="../../lib/img/ios/nosearch@2x.png" alt="" style=""></div> -->
                <div class="nosearch" style="">暂无物流信息</div>
            </div>
          <div class="track-rcol">
            <div class="track-list">
              <ul>
              <div v-for="(item,index) in logisticsList" :key="index">
                <li class="first" v-if="index===0">
                  <div></div>
                  <i class="node-icon"></i>
                  <span class="txt">{{item.AcceptStation}}</span>
                  <span class="time">{{item.AcceptTime}}</span>
                </li>
                <li v-if="index > 0 && index !== logisticsList.length-1">
                  <i class="node-icon"></i>
                  <span class="txt">{{item.AcceptStation}}</span>
                  <span class="time">{{item.AcceptTime}}</span>
                </li>
                <li v-if="index === logisticsList.length-1" class="finall">
                  <i class="div-spilander"></i>
                  <i class="node-icon"></i>
                  <span class="txt">{{item.AcceptStation}}</span>
                  <span class="time">{{item.AcceptTime}}</span>
                </li>
              </div>
              </ul>
            </div>
          </div>
          </div> 
          </div>  
      </div>
  </div>  
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
         token:localStorage.getItem('token'), 
         com:this.$route.params.com,
         num:this.$route.params.num,   
         list:[],
         logisticsList:[],
         name:"暂无",
         codes:"暂无",  
        }
    }, 
    created(){
        this.getlist(); 
    },
    methods:{
        getlist(){
            var token=this.token;
            var com=this.com;
            var num=this.num; 
            var url=`freeter-api/wuliu/getOne?shipperCode=${com}&logisticCode=${num}`;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    this.list=res.body.result; 
                    this.logisticsList=res.body.result.Traces;
                    this.name=res.body.result.ShipperCode;
                    this.codes=res.body.result.LogisticCode; 
                }else{
                    Toast("没有查询到当前物流信息");
                }
            })
        }, 
    }
}
</script>
<style scoped>
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
.tops{
    width: 100%;
    height: 2rem; 
    background: #ffffff;
    border-top: 1px solid #E2E2E2;
}
.tops .tops-left{
    width: 30%;
    height: 2rem;
    float: left; 
}
.tops .tops-right{
    width:100%;
    height: 2rem; 
    float: right;
    padding-left: .24rem;
}
.tops .tops-right div{
    font-size: .32rem;
    color: #939393;
}
.tops .tops-right .tops-com{
    width: 100%;  
    margin-top: .3rem;
}
.tops .tops-right .tops-num{
    width: 100%; 
}
.wl{ 
    width:100%;
    background:#ffffff;
    border-bottom: 1px solid #E2E2E2;
}
.wl .wl-left{
    width: 100%;
    height: 1rem;
    font-size: .32rem;
    color: #313131;
    padding: .24rem; 
     border-bottom: 1px solid #E2E2E2;
}
.wl .wl-con{
    width: 100%; 
    margin-top: .5rem;
}
ul li{
    list-style:none;
    font-size: 1rem;
    background: #ffffff;
  }
  ul {
    padding-left: .5rem;
    position: absolute;
    background: #ffffff;
    padding-right: .5rem;
  }
  .track-rcol{}
  .track-list{
      position: relative;
  }
  .track-list li{
    position:relative;
    padding:0px 0 .5rem .25rem;
    /* line-height:1rem; */
    border-left:1px solid #d9d9d9;
    color: #999;
  }
  .track-list li.first{
    color:red;
    padding-top:0;
    width: 100%;
    text-align: left;
    border-left:1px solid #d9d9d9;
  }
  .track-list li .node-icon{
    position: absolute;
    left: -.15rem;
    border-radius: 0.25rem;
    width: 0.3rem;
    height: 0.3rem;
    top:0;
    background-color: #999999;
  }
  .track-list li.first .node-icon{
    background-position:0-.72rem;
    background-color: red;
    width: .3rem;
    z-index: 2;
    height:.3rem;
    position: absolute;
    left: -.15rem;
    top:0;
    border-radius: 0.5rem;
  }
  .track-list li .time{
    margin-right:.2rem;
    position:relative;
    top:.04rem;
    display:inline-block;
    vertical-align:middle;
    background-color: white;
    color: #999;
    width: 100%;
    text-align: left;
    font-size: .24rem;
  }
  .track-list li .txt{
    position:relative;
    display:inline-block;
    vertical-align:top;
    color: #999;
    font-size: .24rem;
    line-height: .5rem;
  }
  .track-list li.first .time{
    text-align: left;
    width: 94%;
    color:red;
    font-size: .24rem;
  }
  .track-list li.first .txt{
    color: red;
    text-align: left;
    width: 94%;
  }
  .track-list li.finall{
    position:relative;
    /* padding:0.5rem 0 .5rem .25rem; */
    line-height:.18rem;
    border-color: white;
    border-left:1px solid #ffffff;

    color: #999;
  }
  .track-list li.finall .div-spilander{
    width:.01rem;
    position: absolute;
    position: absolute;
    left: -.15rem;
    height: 0.5rem;
    background-color: #d9d9d9;
  } 
  /* 物流 */
   .inlie {
     height: 5rem;
     line-height: 5rem;
   }
  .inlie .inline{
    width:3.2rem;height:3.06rem;margin:auto;margin-top:1.7rem;
}
.inlie .inline img{
    width:100%;height:100%;
}
.inlie .nosearch{
    text-align:center;margin-top:.5rem;font-size:.32rem;color:#939393;font-family:"SourceHanSerifSC-Light";
}
</style>
