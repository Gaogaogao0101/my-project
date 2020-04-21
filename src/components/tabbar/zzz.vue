<template>
 <div id="apps" class="box"> 
     <div style="width:71%;margin:auto;">
   <ul class="tabs clearfix" id="mySelect"> 
    <li v-for="(tab,index) in tabsName" :key="index" v-bind:class="{active:index==isActive}" :v-if="index<3"> 
     <a href="#" rel="external nofollow" class="tab-link" @click="GetList(tab.categoryId,index)">
         <span style="display: block; width: .23rem; height: .23rem; margin-left: .07rem; margin-top: .19rem; border-radius: 50%; float: left;margin-right:.01rem;">
         <small style="display: block;  width: .13rem; height: .13rem; margin: auto; margin-top: .05rem; border-radius: 50%; "> </small></span>{{tab.name}}
         </a> 
    </li> 
   </ul> 
   </div>
   <div class="cardsa"> 
       <div id="apps" class="box">  
        <div class="cards"> 
            <!-- 绿威 -->
                <div class="tab-card">
                    <div id="lw">
                        <div class="list" style="">   
                            <div class="list-as">
                                <div class="lpt list-product-a" v-for="(item,index) in lvweis" :key="index" :v-if="index<3" @click="getDetail(item.goodId)">
                                    <span><img :src="'http://app.hzhlsy.net/'+item.picImg" alt=""></span>
                                        <p>{{item.goodName}}</p>
                                </div> 
                            </div>  
                        </div> 
                    </div>
                </div>  
        </div> 
        </div> 
       <!-- <homecont-box :goodid="goodId"></homecont-box>  -->
   </div>
  </div> 
</template>

<script>  
 export default {
  inject:['reload'],
  name: "swiper",
  data() {
   return {
        tabsName:[], 
        goodId:0, 
        isActive:0,
        lvweis:[], 
    }
  },
  components:{ 
  }, 
  created(){
      this.getGoodinfo(); 
      this.GetLists();
  },
  methods: { 
       // 商品详情
      getDetail(goodId){ 
        //   this.$router.push({name:"cartdetail",params:{goodId}});
        localStorage.setItem('gid',goodId);
        this.$router.push({name:"cartdetail"});
        this.reload();
      }, 
    // 导航
     getGoodinfo:function(){
        var url="freeter-api/good/goodClassify";
        this.$http.post(url).then(result=>{ 
            if(result.body.code==0){
                this.tabsName=result.body.listGoodClassify;  
                this.goodId=result.body.listGoodClassify[0].categoryId; 
            }else{
                Toast("数据加载失败");
            }
        })
        
    },  
    // 获取所有数据
    GetLists:function(){  
         let shu=parseInt(0);
        var url=`freeter-api/good/goodClassifyGood?categoryId=${shu}`;   
         this.$http.post(url).then(result=>{  
                if(result.body.code==0){
                    this.lvweis=result.body.data.listGood;
                    // console.log(this.lvweis);   
                } 
            }) 
    }, 
    // 根据id查数据 
     GetList(goodid,index){
        this.isActive=index; 
        console.log(this.isActive);  
        var url="freeter-api/good/goodClassifyGood?categoryId="+goodid; 
         this.$http.post(url).then(result=>{   
                if(result.body.code==0){
                    this.lvweis=result.body.data.listGood;  
                    // console.log(this.lvweis);
                } 
            })  
    },  
     // 导航传递id赋值给goodId
    getDetails(a){   
        let agoodId= a; 
        this.goodId=parseInt(agoodId);
        // console.log(typeof(this.goodId)); 
    }    
   }  
}
</script>
<style scoped>
.active{ 
    color: #fff !important;
    background: #C5161D;  
    font-weight: bold;
    font-family:"SourceHanSerifSC-Light";
}
.active span{
    display: block;
}
.active span{
    background: #D58C70; 
}
.active span small{
    background: #D4FF96;
}
/* 数据 */
.cards { 
    float: left;  
    width: 100%;
    height: 2.25rem;
}  
.clearfix:after { 
    content: ""; 
    display: block; 
    height: 0; 
    clear: both; 
    background: #C5161D;
    display: block;
} 
.clearfix { 
    zoom: 1; 
    width:100%;
    margin: auto;
} 
#lw .list .list-as{
    height:2.25rem;
    width: 100%;
    margin:0;padding:0;font-size: 0; 
    padding-left: .45rem;
    overflow: hidden;
}
#lw .list .list-as .lpt{
    width: 2.03rem;
    height: 2.03rem;
    float: left; 
    margin-right: .27rem;
    margin-top: .1rem;
    background: #ffffff;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
    /* box-shadow:0px 0px 10px #F4F4F4; */
    box-shadow: 0rem 0.05rem 0.2rem .02rem #F1F1F1;
   
}
#lw .list .list-as .lpt span{
    display: block;
    width:1.32rem;
    height:.86rem;
    margin-left: .35rem;
    margin-top: .44rem;
}
#lw .list .list-as .lpt span img{
    width:1.32rem;
    height:.86rem; 
}
#lw .list .list-as .lpt p{
    color: #313131;
    margin: auto;
    font-size: .24rem; 
    margin-top: .17rem;
    text-align: center;
      white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "SourceHanSerifSC-Medium";
}  
  /* 导航页面 */
ul li.active a{ 
    color: #fff !important;
    background: #C5161D;  
    font-weight: bold;
    font-family:"SourceHanSerifSC-Light";
}
ul li.active span{
    display: block;
}
ul li.active span{
    background: #D58C70; 
}
ul li.active span small{
    background: #D4FF96;
}
* { 
    padding: 0; 
    margin: 0; 
} 
.box { 
    width:100%;  
    margin: 0 auto;  
    background: #ffffff; 
} 
.tabs li { 
    float: left; 
    margin-right:.08rem; 
    list-style: none; 
    /* width:1.15rem; */
    margin-top: .2rem;
    font-size: .32rem;
    font-family:"SourceHanSerifSC-Light";
} 
.tabs .tab-link { 
    display: block; 
    width:100%; 
    height: .61rem; 
    text-align: center; 
    line-height: .61rem;  
    color: #939393;  
    text-decoration: none; 
    padding-right: .1rem;
} 
ul li a:focus{ 
    height:.61rem; 
    /* border-bottom: 2px solid #E35885;  */
    background: #C5161D;
    color: #ffffff !important;
    font-weight: bold;
    transition: .3s;  
} 
ul li a:focus span{
    background: #D58C70; 
}
ul li a:focus span small{
    background: #D4FF96;
}
.clearfix:after span{
    display: block;
}
.cards { 
    float: left;  
    width: 100%;
    height: 2.25rem;
}  
.clearfix:after { 
    content: ""; 
    display: block; 
    height: 0; 
    clear: both; 
    background: #C5161D;
    display: block;
} 
.clearfix { 
    zoom: 1;  
    margin: auto;
    height: 1rem;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space:nowrap; 
}  
</style>