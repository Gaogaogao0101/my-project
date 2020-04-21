<template>
    <div id="app">
      <div class="top-sear" style="z-index:4;position:fixed;background:#fff;top:0;">
         <div class="ts-left"><router-link to="/home"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></router-link> </div>
         <div class="ts-right"><router-link to="/search"><input type="text" placeholder="输入你想要查找的商品"><img src="../../lib/img/ios/search.png" alt=""></router-link></div>
      </div>
       <div class="par-type">
          <nav class="type" >
              <ul class="con" ref="conr" id="cons"> 
                  <li class="as" id="asid" ref="listli" v-for="(title,index) in tabTitle" v-bind:class="{active:index==isActive}" :key="title.categoryId" @click="getDetails(title.categoryId,index)">{{title.name}}<p></p></li> <!--@click="getDetails(title.categoryId)"-->
              </ul>
          </nav>
          <div class="tab-content" style="margin-top:.5rem;"> 
             <div class="card" >  
                <div class="tab-card"> 
                    <div id="Hlist"> 
                        <div class="list" style="">
                            <div class="goods-item" v-for="item in tabNav" @click="goodDetail(item.goodId)" :key="item.goodId" > 
                                  <div class="left"><img :src="'http://app.hzhlsy.net/'+item.picImg" alt=""></div>
                                  <div class="con-con"> 
                                      <div class="con-con-til">{{item.goodName}}</div>
                                      <div class="sl">{{item.pageDescription}}</div>
                                      <p class="pri"><small>￥<span>{{item.minPrice}}</span></small></p> 
                                  </div> 
                            </div> 
                            <div class="list bacngroung"  v-if="tabNav.length == 0">
                                <div class="none-img" style="width:100%;">
                                    <img src="../../lib/img/ios/nosearch@3x.png" alt="">
                                </div>
                                <p class="none-name" style="letter-spacing:3px;">暂无数据</p>
                            </div>
                            </div> 
                        </div> 
                    </div>    
                </div>  
            </div>
          </div>
       </div> 
    <!-- </div> -->
</template>  
<script> 
import {Toast} from 'mint-ui';
import BScroll from 'better-scroll'
export default {
    inject:['reload'],
    data(){
        return{
             tabTitle: [], 
             tabId:[], 
             goodId:'', 
             willShow:true,
             tabNav:[], 
             isActive:localStorage.getItem('syindex'), 
             getlistid:'',
             classid:this.$route.params.listid, 
        }
    },
    components:{ 
    }, 
    created(){  
         // 分类
        this.getGoodinfo();  
        // this.GetNav();
        // this.GetList();
        this.detailclassID(); 
    },
    mounted(){ 
    },
    methods:{   
       
        // 根据类id获取数据
        detailclassID(){ 
            // var classid=this.classid;
            var classid=localStorage.getItem('listids'); 
            if(classid==undefined||classid==''){  
            }else{
            var url="freeter-api/good/goodClassifyGood?categoryId="+classid;   
            this.$http.post(url).then(result=>{  
                    if(result.body.code==0){
                        this.tabNav=result.body.data.listGood;    
                    } 
                })
            }
        },
        // li添加状态高亮  
        clickcss(){ 
          if(this.willShow==true){
              this.willShow=false;
          }  
        }, 
        // 分类
        getGoodinfo:function(){
            var url="freeter-api/category/goodClassify";
            this.$http.post(url).then(result=>{  
                if(result.body.code==0){
                   this.tabTitle=result.body.listGoodClassify;    
                //    console.log(this.tabTitle);
                 for(let i=0;i<=this.tabTitle.length;i++){
                   this.tabId=this.tabTitle[i];   
                  }
                }else{
                    Toast("数据加载失败");
                }
            })  
        }, 
         // 全部
        //   GetNav:function(){
        //       let categoryId=parseInt(0);
        //     var url=`freeter-api/good/goodClassifyGood?categoryId=${categoryId}`;
        //       this.$http.post(url).then(result=>{  
        //         if(result.body.code==0){
        //           this.tabNav=result.body.data.listGood;
        //           // console.log(this.tabNav);
        //           }else{
        //               Toast("数据加载失败");
        //           }
        //       })     
        //   },  
          // 分类商品id
          GetList(goodid){  
              var url="freeter-api/good/goodClassifyGood?categoryId="+goodid;   
              this.$http.post(url).then(result=>{   
                      if(result.body.code==0){
                          this.tabNav=result.body.data.listGood;  
                      } 
                  }) 
          }, 
          // 商品详情
            goodDetail(goodId){ 
                var isActive=this.isActive; 
                localStorage.setItem('gid',goodId);
                var listid=this.getlistid; 
                this.$router.push({name:"cartdetail",params:{isActive,listid}});
            },       
             refresh(){
                
                this.getDetail();
                 this.reload();
             },
           // 导航传递id赋值给goodId
           getDetail(id){
            // this.goodId=id; 
             var url="freeter-api/good/goodClassifyGood?categoryId="+id;   
              this.$http.post(url).then(result=>{   
                      if(result.body.code==0){
                          this.tabNav=result.body.data.listGood;  
                      } 
                  })  
        },
        // 导航传递id赋值给goodId
        getDetails(a,index){  
            this.isActive=index;
            localStorage.setItem('syindex',index);
            localStorage.setItem('listids',a);
            this.getlistid=a;
            var classid=this.classid; 
            // this.goodId=a;  
              var url="freeter-api/good/goodClassifyGood?categoryId="+this.getlistid;   
              this.$http.post(url).then(result=>{ 
                      if(result.body.code==0){
                          this.tabNav=result.body.data.listGood;   
                      } 
                  })  
            this.clickcss();
        }, 
    },  
}
</script>
<style scoped>  
/* 点击对应的标题添加对应的背景颜色 */ 
#cons li:hover{
  color: #313131;
}
.active{
  color: #313131;
  /* border-bottom:2px solid red; */
}
li:hover{
  color: #313131;
}  
#cons li:hover p{ 
  height:.02rem;
  width:50%;
  margin: auto; 
  border-bottom:2px solid #C5171C;
  margin-top:.25rem; 
}
#cons li:hover li:first-child{
  color: none; 
}
#app .top-sear{
    width: 100%;
    height: 1rem; 
    padding-top: .3rem;
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
    position: fixed;
    left: .24rem;
}
#app .top-sear .ts-right input{
    width: 4.66rem;
    height: .72rem;
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
.par-type {
      /* height: 50px; */
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      overflow: hidden;
      margin-top:1rem;
} 
.type {
    height:.78rem; 
    /* overflow-x: scroll; */
    /* overflow-y: hidden; */
    white-space:nowrap; 
    border-bottom:1px solid #F1F1F1;
    margin-right: .3rem;
    margin-left:.3rem;
}
.con {
    /* width: 6.9rem; */
    /* heighht: .85rem;
    display: flex;
    align-items: center; */
    margin-top: .2rem;
    height: .85rem;
    padding-left: .24rem;
    /* overflow-x: scroll; */
}
.con .active{ 
   color: #313131;   
}  
.con .active p{ 
  height:.02rem;
  width:50%;
  margin: auto; 
  border-bottom:2px solid #C5171C;
  margin-top:.25rem; 
}
.con>li {
    /* width: 1.4rem; */
    text-align: center;
    font-size: 16px;
    /* width:15%; */
    color: #939393;
    list-style: none;
    height:.65rem;
    display: inline-block;
    padding-bottom: .2rem;
    margin-right: .5rem;
} 
.par-type ::-webkit-scrollbar {
    display: none;
}
/* 点击对应的标题添加对应的背景颜色 */ 
/* 商品模块样式 */
 
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
 