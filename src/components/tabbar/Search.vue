<template>
    <div id="app">
      <div class="top-sear">
         <div class="ts-left"><router-link to="/home"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></router-link> </div>
         <div class="ts-right"><input type="text" placeholder="输入你想要查找的商品" v-model="search" v-on:change="checkPrice($event)"><img src="../../lib/img/ios/search.png" alt="" @click="searck"></div>
      </div>
      <div class="groom"> 
            <div class="groom-con">
                <div id="Hlist"> 
                    <div class="list" style="">
                        <div class="goods-item" v-if="showhide" v-for="item in list" @click="goodDetail(item.goodId)" :key="item.goodId" > 
                                <div class="left"><img :src="'http://app.hzhlsy.net/'+item.picImg" alt=""></div>
                                <div class="con-con"> 
                                    <div class="con-con-til">{{item.goodName}}</div>
                                    <div class="sl">{{item.pageDescription}}</div>
                                    <p class="pri"><small>￥<span>{{item.minPrice}}</span></small></p> 
                                </div> 
                        </div>   
                        <div class="list bacngroung" v-if="list.length == 0">
                            <div class="none-img" style="width:100%;">
                                <img src="../../lib/img/ios/nosearch@3x.png" alt="">
                            </div>
                            <p class="none-name">请输入正确的商品名称</p>
                        </div> 
                    </div> 
                </div> 
                <div class="list bacngroung" v-if="notlist">
                    <div class="none-img" style="width:100%;">
                        <img src="../../lib/img/ios/nosearch@3x.png" alt="">
                    </div>
                    <p class="none-name" style="letter-spacing:3px;">暂无数据</p>
                </div>  
            </div> 
        </div> 
    </div>
</template>  
<script> 
import {Toast} from 'mint-ui' 
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
    data(){
        return{
            search:'', 
            list:[],  
            showhide:false,
            notlist:true,
            // searchData:'',
        }
    }, 
    created(){  
        this.goodList(); 
    },
    methods:{    
      checkPrice:function (val) { 
        this.goodList();
        this.showhide=true;
        this.notlist=false;
        // this.search=val.target.value; 
      }, 
      goodList:function(){ 
        var url=`freeter-api/good/getGoodSearch?goodName=`+this.search;
        this.$http.post(url).then(res=>{ 
          if(res.body.code==0){
            this.list=res.body.listGood.slice(0,15); 
            // this.list=res.body.data.goodSpecPrice;  
          }
        })
      }, 
      searck(){
        this.goodList();
      },
      // 商品详情
      getDetail(goodId){ 
          this.$router.push({name:"cartdetail",params:{goodId}});
      },  
    }, 
    computed: {
      
    }
      
}
</script>
<style scoped>  
#app{
  background: none;
}
#app .top-sear{
    width: 100%;
    height: 1rem; 
    margin-top: .3rem;
}
#app .top-sear .ts-left{
    text-align: left;
    padding-left: .24rem;
    padding-top: .16rem;
    float: left;
}
#app .top-sear .ts-left img{
    width: .17rem;
    height: .31rem;
}
#app .top-sear .ts-right input{
    width: 4.66rem;
    height: .72rem;
    font-size: .28rem;
    color: #313131;
    border: 1px solid #E8E8E8;
}
#app .top-sear .ts-right input::placeholder{
    font-size: .24rem;
    color: #939393;
    font-family:"SourceHanSerifSC-Light";
}
#app .top-sear .ts-right img{
    width: .3rem;
    height: .29rem;
    margin-left: -.6rem;
}

#Hlist .list{
    width: 94%;
    margin: auto;
}
#Hlist .list .goods-item{
    border: none;
    box-shadow:none;
}
#Hlist .list .goods-item .left{
    height: 3.4rem;
    padding: 0;
    text-align: center;
    background: #F7F7F7;
    border-top-left-radius: .15rem;
    border-bottom-right-radius: .15rem;
    border-top-right-radius: .15rem;
    border-bottom-left-radius: .15rem;
}  
#Hlist .list .goods-item .left img{
    width:2.25rem; 
    height: 1.5rem;
    margin-top: 1rem;
}
.con-con div{
    text-align: center;
}
.con-con .con-con-til{
    font-size: .32rem;
    color: #313131;
    margin-top: .25rem;
    text-align: left;
      white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family:"SourceHanSerifSC-Light";
}  
.con-con .sl{
    font-size: .28rem; 
    color: #939393;
    /* height: .5rem; */
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family:"SourceHanSerifSC-Light";
}
.con-con .pri{ 
    margin-top: .1rem;
    color: #C5171C;
    text-align:left;
    letter-spacing: -1px;
}
 .con-con .pri small{
    color: #C5171C;
    font-size: .28rem;
}
.con-con .pri small span{
    font-size: .42rem;
    color: #C5171C;
    font-family: "SourceHanSerifSC-Medium";
    float: none;
}
.list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
} 
.list .goods-item{
    border: 1px solid #ccc;
    width: 49%;
    box-shadow: 0 0 8px #ccc;   /*阴影*/
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;/*方向  列*/
    min-height: 193px;
}
.list .goods-item>img{
    width: 100%;
}
.list .goods-item .title{
    font-size: 14px;
}
.list .goods-item .info{
    background-color:#eee;

}
/* 价格样式 */
.list .goods-item .info .price .now{
    /* color: red; */
    font-weight: bold;
    font-size: 16px;
}
.list .goods-item .info .price .old{
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
}
/* 促销模块 */
.list .goods-item .info .sell{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}  
.none-img img{
    width:3rem;
    margin-top: 2rem;
}
.none-name{
    margin: auto;
}
</style>
  