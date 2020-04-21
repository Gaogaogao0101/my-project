<template>
     <div class="shopcar" id="demo04"> 
     <div class="title" style="z-index:4;position:fixed;top:0;width:100%;"><span class="shop">购物车</span> <router-link to="/cartdemo"><span class="gl">完成</span> </router-link></div>  
    <div class="car-list">
      <ul>
        <li class="car-item" v-for="(item,index) in good_list" :key="index">
          
          <div class="car-item-content">
            <div class="car-img" @click="getDetail(item.goodId)">
              <img :src="'http://app.hzhlsy.net/'+item.goodImg" />
            </div>
            <div class="car-cont">
              <span>{{item.goodTitle}} </span>
            </div>
            <div class="car-price">
              <span class="car-price">￥<small>{{item.goodUnitPrice}}</small></span> 
            </div>
            <div class="num">
              <span @click="reduce(index)" class="countjian"><img src="../../lib/img/ios/jian@3x.png" alt=""></span>
              <span>{{item.goodCount}}</span>
              <span @click="add(index)"><img src="../../lib/img/ios/jia@3x.png" alt=""></span>
            </div>
          
          </div>
           <div class="input-block">
            <label class="input-label" :class="{active: item.is_selected}" :for="'car-checkbox-'+index" @click="select_one(index,item.cartId)"></label>
          </div>
          <div class="hr" style="height:.2rem;margin-left:-.24rem;margin-right:-.24rem;background:#fafafa;margin-top:.9rem;"></div>
        </li>
      </ul>
    </div>
    <div class="car-footer">
      <div class="foot-car">
        <label for="foot-check" class="input-labels" :class="{active: selected_all}" @click="slect_all(good_list.goodId)"></label><span>全选({{totalNum}})</span>
      </div>
      <div class="total-cont" v-if="willShow">
        <span @click="selectidel">删除</span> 
      </div> 
      <div class="total-cont" v-else>
        <span @click="wholedel">删除</span> 
      </div> 
    </div>
     <div id="bottom">
            <ul>
                <router-link to="/home">
                <li class="li-a"><img src="../../lib/img/ios/shouyea@3x.png" alt=""><div class="bot-n">首页</div></li>
                </router-link>
                <router-link to="/desc">
                <li class="li-b"><img src="../../lib/img/ios/faxiana@3x.png" alt=""><div class="bot-n">活动</div></li>
                </router-link>
                <router-link to="/cart">
                <li class="li-c"><img src="../../lib/img/ios/cart@3x.png" alt=""><div class="bot-n" style="color:#313131;">购物车</div></li>
                </router-link>
                <router-link to="/member">
                <li class="li-d"><img src="../../lib/img/ios/huiyuana@3x.png" alt=""><div class="bot-n">会员中心</div></li>
                </router-link>
            </ul>
        </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
    export default {
      inject:['reload'], 
    data () {
      return {
        good_list: [],
        is_selected: true,
        totalPrice: 0,
        totalNum: 0,
        selected_all: false,
        userid:localStorage.getItem('userid'),
        token:localStorage.getItem('token'), 
        //存放被选择的数据
        allSelectedGoods: [],
        willShow:true,  
      }
    },
    mounted: function () {
      this.getTotal();  
    
    },
    watch: {
      'good_list': {
        handler: function (val, oldVal) { 
          return val;
        },
        deep: true
      }
    },
    created(){
        this.getlist();  
    },
    methods: {
      // 商品详情
      getDetail(goodId){ 
          localStorage.setItem('gid',goodId);
          this.$router.push({name:"cartdetail"});
      },  
         //批量删除
        delSelect() { 
            for(var i=this.good_list.length-1;i>=0;i--){
                if (this.allSelectedGoods.indexOf(this.good_list[i].goodId)!==-1) {
                    //从allSelectedGoods数组中也需要删除
                    var index = this.allSelectedGoods.indexOf(this.good_list[i].goodId); 
                    this.allSelectedGoods.splice(index,1);
                    //删除goods数组中的信息
                    /*var index = this.goods.indexOf(v.id);*/
                    this.good_list.splice(i,1);
                }
            }   
        },
    // 获取购物车商品
    getlist(){ 
        var token=this.token;
        var url=`freeter-api/cart/myCart?token=${token}`;
        this.$http.post(url).then(res=>{
            if(res.body.code==0){
                this.good_list=res.body.data; 
            }
        })
    },
      getTotal () {
        this.totalPrice = 0
        this.totalNum = 0
        for (var i = 0; i < this.good_list.length; i++) {
          var _d = this.good_list[i]
          if(_d.is_selected){
            this.totalPrice += _d['goodUnitPrice'] * _d['goodCount']
            this.totalNum +=_d['goodCount']
          }
        }
      },
      select_one (index,id) { 
        if(this.good_list[index].is_selected == true){
          this.good_list[index].is_selected = false;
           this.allSelectedGoods.splice(id);
        }else{
          this.good_list[index].is_selected = true; 
           this.allSelectedGoods.push(id);
        }
        this.getTotal()
      },
       //点击单选按钮
        selectSingle(k) { 
            if (event.currentTarget.checked) {
                this.allSelectedGoods.push(this.good_list[k].goodId)
            } else {
                for (var i = 0; i < this.allSelectedGoods.length; i++) {
                    if (this.good_list[k].goodId === this.allSelectedGoods[i]) {
                        this.allSelectedGoods.splice(i, 1);
                        this.allChecked = false;
                        break;
                    }
                }
            } 
        },
     // 全选
      slect_all(id) {  
        if(this.selected_all){
          for (var i = 0; i < this.good_list.length; i++) {
            this.good_list[i].is_selected = false;

          }
          this.selected_all = false           
        }else{
          for (var i = 0; i < this.good_list.length; i++) {
            this.good_list[i].is_selected = true;
            this.allSelectedGoods.splice(id);
          }
          this.selected_all = true           
        }
        this.getTotal();
        this.fn();
      },
      // display
        fn:function(){
            if(this.willShow==true){
                this.willShow=false;
            }else{
                this.willShow=true
            }
        },
      reduce(index) {
        if(this.good_list[index].goodCount <= 1) return;
        this.good_list[index].goodCount --
        this.getTotal()
      },
      add(index) {
        this.good_list[index].goodCount ++
        this.getTotal()
      },
      //   删除选中的商品
      selectidel(){
          var token=this.token;
          var cartIds=parseInt(this.allSelectedGoods); 
          var url=`freeter-api/cart/deleteById?token=${token}&cartIds=${cartIds}`;
          this.$http.post(url).then(res=>{ 
              if(res.body.code==0){ 
                  Toast("商品删除成功"); 
              } 
              this.reload();
          })
      },
      //   清空购物车
      wholedel(){
          var token=this.token;
          var userid=parseInt(this.userid);
          var url=`freeter-api/cart/emptyCart?token=${token}&userid=${userid}`;
          this.$http.post(url).then(res=>{ 
              if(res.body.code==0){
                  Toast("购物车已清空");
              } 
              this.reload();
          }) 
      },
    },
    watch:{
      
    },
  }

</script>


<style scoped>
.continer{
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: absolute;
}
.shopcar{
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: absolute;
}
  .title{
    height: 1rem; 
    color: #313131;
    line-height: 1rem;
    text-align: center; 
    background: #ffffff;
}
 .title .shop{ 
    font-size: .42rem;
    font-weight: bold;
    color: #313131; 
    text-align: center;
    margin-left: 1rem;
    font-family:"SourceHanSerifSC-Light";
}
 .gl{
    color: #313131;
    font-size: .38rem;
    float: right;
    margin-right: .3rem;
    font-family:"SourceHanSerifSC-Light";
} 
.car-list 
  { 
  /* padding: 8px; */
  margin-bottom:2.7rem;
  margin-top: .8rem;
  }
.car-item
  { 
  position: relative;
  height:3.1rem;
  overflow: hidden;
  padding-left: .24rem;
  padding-right: .24rem;
  background: #ffffff;
  }
  
.car-checkbox
 { display: none;}
.input-block
 { width:100%;  
  }
.input-label{
  cursor :pointer; 
  position: absolute;
  left: 45%;
  top:70%;
  width :.5rem;
  height:.5rem;
  margin: auto;
  background: #939393; 
  border-radius: 50%;}
.input-label:after{
  opacity: 1;
  content: '';
  position: absolute;
  width:.2rem;
  height: .12rem;
  background: transparent;
  top :.12rem;
  left:.12rem;
  border: 2px solid #fff;
  border-top :none;
  border-right: none;
  -webkit-transform: rotate(-45deg) ;
  -moz-transform :rotate(-45deg) ;
  -o-transform :rotate(-45deg) ;
  -ms-transform :rotate(-45deg) ;
  transform :rotate(-45deg) ;}
  .car-item-content{
    width: 100%;
    height: 1.6rem; 
    margin-top: .4rem; 
  }
.car-img
 { width:1.6rem;
  height:1.6rem;
  float: left;
  overflow: hidden;
  border: 1px solid #f7f7f7;   
  /* margin-right: .3rem; */
  }
.car-img img
 { width:1.3rem;
 margin: auto;
 line-height: 1.6rem;
 margin-top: .38rem;
 margin-left: .15rem;
 }
.input-label.active
  {background: #c5161d;;}
.car-cont{
  padding-top: .1rem;
  font-size: .32rem;
  color: #313131;
  float: right;
  height: 1rem;
  width: 75%; 
  font-family: 'SourceHanSerifSC-Regular';
  }
 
.car-price{ 
  width: 1.5rem;
  margin-left:.8rem;
  position: absolute;
  bottom: .6rem;
  left: .1rem; 
}
.car-price span{
  display :block; 
  width: 100%;
  color: #c5161d;
  font-size: .32rem; 
  font-family:'SourceHanSerifSC-Light'; 
  }
.car-price span small{ 
    font-size: .45rem;
    font-family: 'SourceHanSerifSC-Bold';
} 
.car-footer{
  height:1.39rem;
  border: 1px solid #e3e3e3;
  background: #fafafa;
  position :fixed;
  bottom:1.25rem;
  left: 0;
  right: 0;}
.foot-car{
  width:2rem;
  /* height: 60px; */
  float: left;
  padding-top: .35rem;
  margin-left:.25rem;
  position: relative;
  
  }
  .foot-car span{
      margin-left: .8rem;
      display: block;
      width: 1rem;

  }
  .input-labels{
  cursor :pointer; 
  position: absolute; 
  left: 0;
  top: .3rem;
  width :.5rem;
  height:.5rem;
  /* margin: auto; */
  background: #939393; 
  border-radius: 50%;}
  .input-labels.active
  {background: #c5161d;;}
.foot-car .input-labels:after{
  opacity: 1;
  content: '';
  position: absolute;
  width:.2rem;
  height: .12rem;
  background: transparent;
  top :.12rem;
  left:.12rem;
  border: 2px solid #fff;
  border-top :none;
  border-right: none;
  -webkit-transform: rotate(-45deg) ;
  -moz-transform :rotate(-45deg) ;
  -o-transform :rotate(-45deg) ;
  -ms-transform :rotate(-45deg) ;
  transform :rotate(-45deg) ;}
  .foot-car  span{
      width: 2rem;
      color: #939393;
      font-size: .28rem;
      font-family: 'SourceHanSerifSC-Light'; 
  }
.car-item-content{
    width: 100%;
    height: 1.6rem; 
    margin-top: .4rem; 
}
.total-cont{ 
  height:1.3rem;
  font-size :16px;
  float:right;
  margin-right: .24rem;
  }
.total-cont span{
  display: inline-block; 
  width:2rem;
  height: .8rem;
  background: #c5161d;
  color: #ffffff;
  margin-top:.15rem;
  text-align: center;
  line-height: .8rem; 
   font-size: .36rem;
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
  font-family:"SourceHanSerifSC-Light"; 
} 
.num{
  position: absolute; 
  right:.3rem; 
  top: 1.3rem;
}
.num span{
  display: inline-block;
  width: .5rem;
  height: .5rem;
  float: left;
  text-align: center;
  line-height: .5rem; 
  font-size:.32rem;
} 
.num span img{
    width: .25rem;
}
.countjian img{
  margin-bottom: .1rem;
}
</style>

