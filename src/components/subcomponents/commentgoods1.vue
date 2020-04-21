 
<template> 
<div id="app">
  <div class="top-sear" style="z-index:4;background:#fff;top:0;">
        <div class="ts-left"><router-link to="/home"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></router-link> </div>
        <div class="ts-right"><router-link to="/search"><input type="text" placeholder="输入你想要查找的商品"><img src="../../lib/img/ios/search.png" alt=""></router-link></div>
     </div>
   <div id="topNav" class="swiper-container"> 
    <div class="swiper-wrapper">
         <div class="swiper-slide" v-for="(item,index) in depList" :class="{active:index==syindex}" @click="ind(index,item.categoryId)">
            <span>{{item.name}}</span>  <p></p>
         </div>
     </div>
   </div>
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
</template>
<script> 
import '../../lib/js/jquery-1.11.3'
export default {
  inject:['reload'],
 name:"find_doc",
        data(){
            return {
                mySwiper:false, 
                swiperWidth:'',
                maxTranslate:'',
                maxWidth:'',
                dep_id:'',
                depList:[] ,
                syindex:localStorage.getItem('syindex'),
                getlistid:'',
                classid:this.$route.params.listid,
                scrollX:true, 
                tabId:[], 
                goodId:'', 
                willShow:true,
                tabNav:[],
            }
        }, 
        created(){
          this.getGoodinfo();
          this.xiabaio();
          this.detailclassID();
        },
    mounted(){
          var that = this;
          that.mySwiper = new Swiper('#topNav', {
            freeMode: true,
            freeModeMomentumRatio: 0.5,
            slidesPerView: 'auto',
            resistanceRatio:0.7,
             observer:true,
            observeSlideChildren:true,//修改swiper自己或子元素时，自动初始化swiper 
          });
          that.swiperWidth =that.mySwiper.container['0'].clientWidth;
          that.maxTranslate = that.mySwiper.maxTranslate();
          that.maxWidth = -that.maxTranslate + that.swiperWidth / 2
          that.mySwiper.on('tap', function(swiper, e) {
              //swiper.clickedIndex(获取到当前点击的索引) 
              if(that.dep_id==that.depList[swiper.clickedIndex].categoryId){ 
                return;
              }
                that.loading_show=true; 
                that.dep_name=that.depList[swiper.clickedIndex].name; 
                that.dep_id=that.depList[swiper.clickedIndex].categoryId; 
                var slide,slideLeft,slideWidth,slideCenter,nowTlanslate;
                slide = swiper.slides[swiper.clickedIndex] 
                slideLeft = slide.offsetLeft
                slideWidth = slide.clientWidth
                slideCenter = slideLeft + slideWidth / 2
                that.mySwiper.setWrapperTransition(300)
              if (slideCenter < that.swiperWidth / 2) {
                  that.mySwiper.setWrapperTranslate(0) 
              } else if (slideCenter > that.maxWidth) { 
                //  that.mySwiper.setWrapperTranslate(-200) 
              } else if (slideCenter > that.maxWidth && slideCenter >550) { 
                 that.mySwiper.setWrapperTranslate(-460) 
              }else if (slideCenter > that.maxWidth && slideCenter >770) { 
                 that.mySwiper.setWrapperTranslate(-690) 
              }else {
                nowTlanslate = slideCenter - that.swiperWidth / 2
                that.mySwiper.setWrapperTranslate(-nowTlanslate)   
              }; 
          }) 
          if(that.syindex>3){ 
            that.mySwiper.setWrapperTranslate(-200);
          }else if(that.syindex>6){
            that.mySwiper.setWrapperTranslate(-400);
          }else if(that.syindex>9){
            that.mySwiper.setWrapperTranslate(-600);
          }else if(that.syindex>12){
            that.mySwiper.setWrapperTranslate(-800);
          }else if(that.syindex>15){
            that.mySwiper.setWrapperTranslate(-1000);
          }else if(that.syindex>18){
            that.mySwiper.setWrapperTranslate(-1200);
          }else if(that.syindex>21){
            that.mySwiper.setWrapperTranslate(-1400);
          }else if(that.syindex>24){
            that.mySwiper.setWrapperTranslate(-1600);
          }
    },
    methods:{ 
      // 商品详情
          goodDetail(goodId){ 
              var isActive=this.isActive; 
              localStorage.setItem('gid',goodId);
              var listid=this.getlistid; 
              this.$router.push({name:"cartdetail",params:{isActive,listid}});
          },       
      // 根据id获取数据 
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
      // 切换高亮
        xiabaio(){
          var i=localStorage.getItem('syindex'); 
          if(this.syindex==i){ 
             this.syindex=i;
          }else{
            this.syindex=i;
          }
        },
        ind(index,classid){
          localStorage.setItem('syindex',index); 
          localStorage.setItem('listids',classid);
           this.xiabaio();
          this.detailclassID();
        },
       // 分类
        getGoodinfo:function(){
            var url="freeter-api/category/goodClassify";
            this.$http.post(url).then(result=>{  
                if(result.body.code==0){
                   this.depList=result.body.listGoodClassify;    
                //    console.log(this.tabTitle);
                 for(let i=0;i<=this.depList.length;i++){
                   this.tabId=this.depList[i];   
                  }
                }else{
                    Toast("数据加载失败");
                }
            })  
        }, 

    } 
}
</script>

<style scoped>
#app{
  padding-left: .24rem;
  padding-right: .24rem;
}
#topNav .swiper-slide{
  padding:0 !important;
}
#topNav .swiper-slide:nth-child(2){
  width: 1rem;
}
/* 导航 */
#topNav{
  height:.8rem;
  padding-left: .24rem;
  padding-right: .24rem;
}
#topNav .swiper-slide span{
  line-height: .8rem;
  height: 95%;
}
#topNav .swiper-slide.active p{
  width: 50%;
  height:.02rem;
  margin:-.06rem auto 0; 
  border-bottom:2px solid #C5171C;
} 
 /* 搜索 */
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
/* 滑动样式 */ 
  * {
	margin: 0;
	padding: 0;
}
.active{
  color: #313131;
}
#topNav {
	width: 100%;
	overflow: hidden;
	font: 16px/32px hiragino sans gb, microsoft yahei, simsun;
	border-bottom:1px solid #f8f8f8;
}
#topNav .swiper-slide {
	padding: 0 5px;
	letter-spacing:2px;
	width:1.8rem;
	text-align:center;
}
#topNav .swiper-slide span{
  color: #939393;
	transition:all .3s ease;
	/* display:block; */
}
#topNav .active span{
	transform:scale(1.0);
	color:#313131;
}
img{
	width:100%;
	line-height:0;
	}
 /* 商品样式 */
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




