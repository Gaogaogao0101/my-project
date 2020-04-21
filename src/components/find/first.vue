 <template>
    <div id="first">
      <div class="par-type">
          <nav class="type">
              <ul class="con">
                  <li style=" background:#C5161D;height:.65rem; color:#fff;line-height:.65rem; border-top-left-radius: .3rem; 
    border-bottom-left-radius: .3rem;  border-top-right-radius: .3rem; border-bottom-right-radius: .3rem;" v-if="willShow" @click="gets"  class="active"> 全部 <p></p></li>
                   <li v-else @click="refresh">全部 <p></p></li>  
                  <li v-for="(title,index) in titleClass" v-bind:class="{active:index==isActive}" :key="title.findId" @click="getDetails(title.findId,index)">{{title.name}}<p></p></li> <!--@click="getDetails(title.categoryId)"-->
              </ul>
          </nav> 
       </div> 
        <div id="backyuan">
            <div class="background-large"></div>
            <div class="background-small"></div>
        </div>
        <div class="cards">  
               <div class="card-carousel-wrapper">
                <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList">
                  <img src="../../lib/img/ios/lt@3x.png" alt="">
                </div>
                <div class="card-carousel">
                <div class="card-carousel--overflow-container">
                    <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
                    <div class="card-carousel--card" v-for="(item,index) in items">
                        <img :src="'http://app.hzhlsy.net/'+item.picImg" @click="delarticle(item.essayId)">
                        <div class="card-carousel--card--footer">
                        <span class="quan-title">{{item.essayName}}</span>
                        <span class="quan-til">{{item.pageDescription}}</span>
                        <span class="btn" @click="delarticle(item.essayId)">查看详情</span>
                        <!-- <span class="order">{{item.province}}{{item.city}}{{item.county}}{{item.address}}</span>
                        <span class="time">{{item.createTime.substring(0,10)}}</span> -->
                        <span class="count"><span>{{index+1}}</span>/<small> {{items.length}}</small></span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"><img src="../../lib/img/ios/gt@3x.png" alt=""></div>
            </div>   
        </div>
    </div> 
</template>
<script type="text/ecmascript-6"> 
import {Toast} from 'mint-ui'
export default {
  name: "swiper",
  inject:['reload'],
  data() {
   return { 
    titleClass:[],
    goodId:'',
    willShow:true, 
    list:[],
    isActive:-1,
    currentOffset: 0,
    windowSize:1,
    paginationFactor:217,
    items: []
   }
  },
  components:{
    //   "firsta-box":firsta
  }, 
  created(){
     this.getTitle();
     this.gets();
  },
  computed: {
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: { 
      //根据id查询内容详情 
       delarticle(essayId){  
         var a=this.isActive;
         this.$router.push({name:"hindlist",params:{essayId,a}});
        },  
      moveCarousel(direction) {
        
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor; 
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
      console.log();
    },
    getlist(){ 
            let findId=parseInt(0);
            var urls=`freeter-api/myessay/getListEssay?findId=${findId}`;
            this.$http.post(urls).then(result=>{ 
            if(result.body.code==0){
                this.items=result.body.listEssay;    
            } 
        }) 
    },
    //   点击隐藏
     clickcss(){ 
          if(this.willShow==true){
              this.willShow=false;
             
          }  
        },
        addClass(index){					
            this.current=index;
        },
    // 导航分类
     getTitle:function(){
         var findId=parseInt(1);
        var url="freeter-api/myessay/getFindClassify?findId="+findId;
        this.$http.post(url).then(result=>{  
          console.log(url+'导航')
            if(result.body.code==0){
                this.titleClass=result.body.myFindList; 
            }else if(result.body.code==500){
                Toast(result.body.msg);
            }
        })
    }, 
    // dianjinav
    refresh(){
      this.reload();
      this.gets();
    },
     // 全部数据
        gets(){
            let findId=parseInt(0);
            var urls=`freeter-api/myessay/getListEssay?findId=${findId}`;
            this.$http.post(urls).then(result=>{ 
            if(result.body.code==0){
                this.items=result.body.listEssay;    
               } 
            }) 
              this.isActive=-2
              console.log(this.isActive);
        },
    // 全部id传给子组件
    getDetail(id){ 
        var id=parseInt(id);
        var url="freeter-api/myessay/getFindClassifyEssay?findId="+id;
        this.$http.post(url).then(result=>{  
          console.log(url);
            if(result.body.code==0){
                this.items=result.body.myEssayList;  
            } 
        });
    }, 
    // 导航传递id到子组件
    getDetails(findId,index){  
      this.isActive=index;
      
      this.willShow=false;
        var url="freeter-api/myessay/getFindClassifyEssay?findId="+parseInt(findId);
        this.$http.post(url).then(result=>{  
            if(result.body.code==0){
                this.items=result.body.myEssayList;  
            } 
        });  
        this.currentOffset=0;  
     }, 
   }, 
   
}
</script>
<style scoped> 
.inner{ 
    position: relative;
}
.background-large{
    width: 2.52rem;
    height: 2.52rem;
    background: #F9E5E6;
    border-radius: 50%;
    position: fixed;
    top:2.5rem;
    right: .87rem;

}
.background-small{
    width: 1.78rem;
    height: 1.78rem;
    background: #C5161D;
    opacity: .6;
    border-radius: 50%;
    position: fixed;
    top:3.5rem;
    right: 1.13rem; 
} 
#first{
    width: 100%;
    height: 100%;
    padding-top: .2rem;
    position: absolute;
    background: #ffffff;
}
.par-type {
    /* height: 50px; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    position: fixed;
    /* top: 1rem; */
    z-index: 1000;
    background: #fff;
} 
.type {
    height: 1rem;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space:nowrap; 
}
.con { 
    height: .85rem;
    display: flex;
    align-items: center;
    padding-top: .2rem;
}  
.con>li {
    text-align: center;
    font-size: 16px; 
    color: #313131;
    list-style: none;
    height:.65rem;
    display: inline-block;
    padding-bottom: .2rem;
    line-height: .65rem;
    margin-left: .24rem;
    padding-left:.2rem;
    padding-right:.2rem;
    z-index: 999;
    color: #C5161D;
    border:1px solid #C5161D;
    border-top-left-radius:.5rem;
    border-bottom-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
} 
.con>li:hover { 
    background:#C5161D;height:.6rem;margin-left:.24rem;color:#fff;line-height:.6rem; border-top-left-radius: .3rem; 
    border-bottom-left-radius: .3rem;  border-top-right-radius: .3rem; border-bottom-right-radius: .3rem; 
}
.con>li:visited { 
    background:#C5161D;height:.6rem;margin-left:.24rem;color:#fff;line-height:.6rem; border-top-left-radius: .3rem; 
    border-bottom-left-radius: .3rem;  border-top-right-radius: .3rem; border-bottom-right-radius: .3rem; 
}
.par-type ::-webkit-scrollbar {
    display: none;
}
/* 点击对应的标题添加对应的背景颜色 */
.con .active{ 
     background: #C5161D;
     color: #fff;
}  
* { 
    padding: 0; 
        margin: 0; 
}  
#app{
    background: #ffffff;
} 
#app .tile{
    height:.88rem;
    width: 100%;
    border-bottom: 1px solid #F1F1F1;
}
.box { 
    width:100%;  
    margin: 0 auto;  
} 
.tabs li { 
    float: left; 
    margin-right:.2rem; 
    list-style: none; 
    text-align:center; 
} 
.tabs .tab-link { 
    display: block; 
    width:100%; 
    height: .58rem; 
    text-align: center;
    line-height: .58rem;  
    color: #C5161D; 
    font-size: .32rem;
    text-decoration: none; 
    font-family:"SourceHanSerifSC-Light";
}  
.cards { 
    width: 4rem;
    margin:1.7rem auto;
    /* float: left;  */
    margin-bottom: 1.5rem; 
} 
.cards .tab-card { 
    display: none; 
} 
.clearfix:after { 
    content: ""; 
    display: block; 
    height: 0; 
    clear: both; 
    display: block;
} 
.clearfix { 
    zoom: 1; 
    width:94%; 
    margin: auto;
    margin-top: .27rem;
} 
.tabs li:nth-child(1){
    width:1.49rem; 
    height:.58rem; 
    border: 1px solid #C5161D; 
    border-top-left-radius: .3rem; 
    border-bottom-left-radius: .3rem;
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
}
.tabs li:nth-child(2){
    width:2.57rem; 
    height:.58rem;  
    border: 1px solid #C5161D; 
    border-top-left-radius: .3rem; 
    border-bottom-left-radius: .3rem;
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
}
.tabs li:nth-child(3){
    width:2.57rem; 
    height:.58rem;  
    border: 1px solid #C5161D; 
    margin-right: 0;
    border-top-left-radius: .3rem; 
    border-bottom-left-radius: .3rem;
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
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
 }  
 #Hlist .list .goods-item .left img{
     width: 50%; 
     margin-top: 1rem;
 }
 #Hlist .list .goods-item .con div{
     text-align: center;
 }
 #Hlist .list .goods-item .con .con-til{
     font-size: .32rem;
     color: #313131;
     margin-top: .25rem;
     font-family:"SourceHanSerifSC-Light";
 }  
 #Hlist .list .goods-item .con .sl{
     font-size: .28rem;
     margin-top: .2rem;
     color: #939393;
     font-family:"SourceHanSerifSC-Light";
 }
 #Hlist .list .goods-item .con .pri{
     /* 字体待设置 */
     margin-top: .3rem;
     color: #C5171C;
 }
 .inner a img{
     width: 4rem;
     height: 4.7rem;
 }
 .prevs{
 position: fixed;
 left: .24rem;
 top:6rem; 
width:.7rem;
height:.7rem;
background: #C5161D; 
border-radius: 50%;
}
.prevs img{
width: .3rem;
height: .25rem;
line-height: .7rem;
position: absolute;
top: .2rem;
right: .15rem;
}
.nexts{
position: fixed;
 right: .24rem;
 top:6rem;  
width:.7rem;
height:.7rem;
background: #c5161d; 
border-radius: 50%;  
}
.nexts img{
width: .3rem;
height: .25rem;
position: absolute;
top: .2rem;
right: .15rem;
}
span{
  display: block;
}
.quan-title{
  width: 100%;
  height: .45rem;
  line-height: .45rem;
  text-align: center;
  font-size: .38rem;
  font-family: "SourceHanSerifSC-Bold";
  font-weight: bold;
  color: #C5171C;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: .5rem;
  display: inline-block;
}
.quan-til{
  width: 3.7rem;
  height: .6rem;
  margin: auto;
  line-height: .32rem;
  font-size: .28rem;
  color: #313131;
  /* overflow:hidden; 
  text-overflow:ellipsis;  
  word-break:keep-all;  */
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: .4rem; 
  text-align: center;
  font-family: "SourceHanSerifSC-Light";
}
.btn{
  width: 3.05rem;
  height: .9rem;
  border:1px solid #E73937;
  margin:.6rem auto;
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
  text-align: center;
  line-height: .9rem;
  font-size: .38rem;
  color: #C5171C;
  font-family: "SourceHanSerifSC-Light";
}
.order{
  text-align: center;
  font-size: .32rem;
  color: #313131;
  font-family: "SourceHanSerifSC-Light";
  text-overflow:ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: .33rem;
  line-height: .33rem;
}
.time{
  font-size: .24rem;
  color: #939393;
  text-align: center;
  margin-top: .3rem;
  font-family: "SourceHanSerifSC-Light";
}
.count{
  width:1.3rem;
  margin: auto;
  font-size: .38rem;
  text-align: center;
  color: #939393;
  margin-top: .2rem;
  font-family: "SourceHanSerifSC-Light";
}
.count span{
  float: left;
  font-weight: bold;
  color: #C5161D;
  font-family: "SourceHanSerifSC-Light";
}
.count small{
  font-size: .38rem;
  font-weight: normal;
  font-family: "SourceHanSerifSC-Light";
}
body {
  background: #f8f8f8;
  color: #2c3e50;
  font-family: 'Source Sans Pro', sans-serif;
  min-height: 1000px;
  padding:0;
  margin:0;
}

.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: #666a73;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width:217px;
}
.card-carousel--overflow-container {
  overflow: hidden;
}
.card-carousel--nav__left, .card-carousel--nav__right {
  display: inline-block;
  width: .35rem;
  height: .35rem;
  padding: .35rem;
  background: #C5161D;
  border-radius: 50%;
  box-sizing: border-box; 
  cursor: pointer;
  
}
.card-carousel--nav__left{
  margin:.2rem .6rem .2rem .2rem; 
}
.card-carousel--nav__right{
  margin:.2rem .2rem .2rem .6rem; 
}
.card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
  opacity: 0.2;
  border-color: black;
}
.card-carousel--nav__left {
  position: relative;
  position: fixed;
  left: 0;
  top:7.8rem;
  /* transform: rotate(-135deg); */
}
.card-carousel--nav__left img{
  width:.33rem;
  height: .27rem; 
  position: absolute;
  top: .2rem;
  right: .18rem;
}
.card-carousel--nav__left:active {
  /* transform: rotate(-135deg) scale(0.9); */
}
.card-carousel--nav__right img{
  width:.33rem;
  height: .27rem; 
  position: absolute;
  top: .2rem;
  right: .18rem;
}
.card-carousel--nav__right {
  position: relative;
  position: fixed;
  right: 0;
  top:7.8rem;
  /* transform: rotate(45deg); */
}
.card-carousel--nav__right:active {
  /* transform: rotate(45deg) scale(0.9); */
}

.card-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(4rem);
  width: 217px;
}
.card-carousel-cards .card-carousel--card {
  /* margin: 0 10px; */
  cursor: pointer;
  /* box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40, 44, 53, 0.08); */
  /* background-color: #fff; */
  border-radius: 4px;
  z-index: 3;
   /* margin-left:.5rem; */
  /* margin-right: .5rem; */
  /* margin-bottom: 2px; */
  /* position: relative; */

}

.card-carousel-cards .card-carousel--card:first-child {
  /* margin-left:.5rem;
  margin-right: .5rem; */
}
.card-carousel-cards .card-carousel--card:last-child {
  /* margin-right:.5rem;
  margin-left: .5rem; */
}
.card-carousel-cards .card-carousel--card{
  width: 100%;
  -webkit-transform:rotate(0deg); 
  -webkit-transform:rotate(0deg);
}
.card-carousel-cards .card-carousel--card img {
  vertical-align: bottom;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  transition: opacity 150ms linear;
  user-select: none;
  width:200px;
  margin-left: 10px;
  height:240px;
  /* margin-left: .25rem; */
  /* position: absolute;
  left: 0; */

}
.card-carousel-cards .card-carousel--card img:hover {
  opacity: 0.5;
}
.card-carousel-cards .card-carousel--card--footer {
  border-top: 0;
  width:217px;
  /* padding: 7px 15px; */
}
.card-carousel-cards .card-carousel--card--footer p {
  padding: 3px 0;
  margin: 0;
  margin-bottom: 2px;
  font-size: 19px;
  font-weight: 500;
  color: #2c3e50;
  user-select: none;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2) {
  font-size: 12px;
  font-weight: 300;
  padding: 6px;
  background: rgba(40, 44, 53, 0.06);
  display: inline-block;
  position: relative;
  margin-left: 4px;
  color: #666a73;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):before {
  content: "";
  float: left;
  position: absolute;
  top: 0;
  left: -12px;
  width: 0;
  height: 0;
  border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
  border-style: solid;
  border-width: 12px 12px 12px 0;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):after {
  content: "";
  position: absolute;
  top: 10px;
  left: -1px;
  float: left;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: white;
  box-shadow: -0px -0px 0px #004977;
}

h1 {
  font-size: 3.6em;
  font-weight: 100;
  text-align: center;
  margin-bottom: 0;
  color: #42b883;
}

</style> 