<template>
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
</template>

<script>
 export default {
  props:['goodid'],
  data() {
   return {  
   goodId:'', 
    lvweis:[], 
    lvweisa:[]
   }
  },
  components:{
  }, 
  created(){ 
      this.GetList();
      this.GetLists();
  },
  methods: {
      GetLists:function(){  
         let shu=parseInt(0);
        var url=`freeter-api/good/goodClassifyGood?categoryId=${shu}`;   
         this.$http.post(url).then(result=>{  
                if(result.body.code==0){
                    this.lvweis=result.body.data.listGood;   
                } 
            }) 
    }, 
     // 分类商品id
    GetList(goodid){  
        let goodids= goodid ; 
        var url="freeter-api/good/goodClassifyGood?categoryId="+goodids;   
         this.$http.post(url).then(result=>{  
                if(result.body.code==0){
                    this.lvweis=result.body.data.listGood;   
                } 
            }) 
    },  
    // 商品详情
      getDetail(goodId){ 
          this.$router.push({name:"cartdetail",params:{goodId}});
      }, 
   },
    watch: {     
        // 监测父组件传递的id值
            goodid: 'GetList' 
    }  
}
</script>
<style scoped> 
* { 
    padding: 0; 
    margin: 0; 
}  
.cards { 
    float: left; 
    background: #ffffff; 
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
    width:70%;
    margin: auto;
} 
#lw .list .list-as{
    height:2.25rem;
    width: 100%;
    margin:0;padding:0;font-size: 0;
    background: #FBFBFB;
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
    box-shadow: 0rem 0.05rem 0.2rem #F1F1F1;
   
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
</style>