<template>
     <div class="shopcar" id="demo04">  
     <div class="title" style="z-index:4;position:fixed;top:0;border-bottom:1px solid #eee;width:100%;"><span class="shop">购物车</span> <router-link to="/cart"><span class="gl">管理</span></router-link> </div>  
    <div class="car-list">
      <ul>
        <li class="car-item" v-for="(item,index) in ls" :key="index">
          
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
              <span @click="reduce(index,item.cartId)" class="countjian"><img src="../../lib/img/ios/jian@3x.png" alt=""></span>
              <span>{{item.goodCount}}</span>
              <span @click="add(index,item.cartId)" style="float:right;"><img src="../../lib/img/ios/jia@3x.png" alt=""></span>
            </div>
          
          </div>
           <div class="input-block">
            <label class="input-label" :class="{active: item.is_selected}" :for="'car-checkbox-'+index" @click="select_one(index,item.cartId,item.goodSpecId)"></label>
          </div>
          <div class="hr" style="height:.2rem;margin-left:-.24rem;margin-right:-.24rem;background:#fafafa;margin-top:1rem;"></div>
        </li>
      </ul>
    </div>
    <div class="car-footer">
      <div class="foot-car">
        <label for="foot-check" class="input-labels" :class="{active: selected_all}" @click="slect_all(good_list.goodId)"></label><span>全选({{totalNum}})</span>
        
      </div>
      <div class="total-cont">
        <span v-if="xjs" @click="cartId">结算({{totalPrice}})</span> 
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
                <router-link to="/cartdemo">
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
        ls:[],
        // is_selected: true,
        totalPrice: 0,
        totalNum: 0,
        selected_all: false,
        // userid:localStorage.getItem('userid'),
        token:localStorage.getItem('token'), 
        dataId:[],
         //存放被选择的数据
        allSelectedGoods: [],
        allid:[],
        xjs:true,
        goodSpecId:[], 
      }
    },
    mounted: function () {
      this.getTotal(); 
      sessionStorage.removeItem('selectyh');
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
        this.iftoken();
    },
    methods: {
      // 判断是否登录
     iftoken(){
        var url="freeter-api/user/userinfo?token="+this.token;
        this.$http.post(url).then(res=>{
            if(res.body.code==500){
                 Toast(res.body.msg);
                 localStorage.removeItem('token');
                 this.$router.push('/land');
            }
        })
      },  
       // 商品详情
      getDetail(goodId){  
          localStorage.setItem('gid',goodId);
          this.$router.push({name:"cartdetail"});
      },  
      aaa(){ 
        var id=this.allid;
        this.$router.push({name:"order",params:{id}});
      },
    // 获取购物车商品 
    getlist(){ 
        var token=this.token;
        var url=`freeter-api/cart/myCart?token=${token}`;
        this.$http.post(url).then(res=>{ 
            if(res.body.code==0){
                this.good_list=res.body.data; 
                 this.ls=this.good_list.reverse();  
                this.good_list.forEach(cont=>{
                  cont.is_selected = false;
                  this.allid.push(cont.cartId); 
                })
            }else if(res.body.code==500){
              Toast(res.body.msg);
            } 
        })
        localStorage.removeItem('gid');
        localStorage.removeItem('isActive');
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
      //抽出一个取消选中购物车商品的方法（删除选中的id）
      deleteId(list,id){
        //如果选中id的数组中有这个id 删除
        if(list.indexOf(id)>-1){
          //遍历数组的id 找到那个id删除
          let selIndex = list.indexOf(id);
          list.forEach(selid=>{
            if(selid == id) list.splice(selIndex,1);
            else return;
          })
        }
      },
      select_one (index,id,goodSpecId) {
        this.goodSpecId=goodSpecId; 
         //当前商品为选中状态
        if(this.good_list[index].is_selected == true){
          this.good_list[index].is_selected = false; 
          //如果选中id的数组中有这个id 删除
          this.deleteId(this.allSelectedGoods,id)
        }else{//否则 添加
          this.good_list[index].is_selected = true;
          //如果选中id的数组中有这个id 不做任何操作
          if(this.allSelectedGoods.indexOf(id)>-1){
            return;
          }else{
            this.allSelectedGoods.push(id);
          }
        }
        // console.log(this.allSelectedGoods); 
        this.getTotal()
      }, 
      slect_all(id) { 
        if(this.selected_all){
          for (var i = 0; i < this.good_list.length; i++) {
            this.good_list[i].is_selected = false;
             
          }
          this.selected_all = false  
             this.delid();      
        }else{
          for (var i = 0; i < this.good_list.length; i++) {
            this.good_list[i].is_selected = true;
             
          }
          this.selected_all = true 
                  this.setid(); 
        }
        this.getTotal(); 
        // this.aaa();
        // TODO 全选结算
        
      },
      // 获取所有的id
      setid(){
        let mu = this.allSelectedGoods.find((n) => n == id);
            if(mu){
                  // console.log('标签已选择..')
                  return;
              }else{
                //  this.allSelectedGoods.push(id); 
                this.good_list.forEach(con=>{
                var id=con.cartId;
                this.allSelectedGoods.push(id);
                //  console.log(id);
                //  console.log(this.allSelectedGoods);
                })
              }
            },
      // 删除所有的id
      delid(){ 
        this.allSelectedGoods.length=0;
        console.log(this.allSelectedGoods);
      },
      reduce(index,id) {
        if(this.good_list[index].goodCount <= 1){ return Toast("不能再减少了~")};  
         this.good_list[index].goodCount --;
         this.getTotal() 
            var token=this.token;
            let shu=parseInt(1);
            var url=`freeter-api/cart/changeNum?token=${token}&cartId=${id}&typeNum=${shu}`;
            this.$http.post(url).then(res=>{
              if(res.body.code==0){ 
              }else if(res.body.code==500){
                Toast(res.body.msg);
              } 
            }) 
      },
      add(index,id) { 
        this.good_list[index].goodCount ++
        this.getTotal()
        var token=this.token;
        var id=parseInt(id);
        let shu=parseInt(0);
        var url=`freeter-api/cart/changeNum?token=${token}&cartId=${id}&typeNum=${shu}`;
        this.$http.post(url).then(res=>{
          if(res.body.code==0){ 
          } 
        })
      },
      // 结算
      cartId(){ 
          var id=this.allSelectedGoods; 
          var token=this.token;
          var url=`freeter-api/cart/accountCart?token=${token}&cartIds=${id}`; 
           if(id ==''){
             Toast("请选择结算商品");
           }else{ 
            this.$http.post(url).then(res=>{  
              
              if(res.body.code==0){ 
              }
            })
           this.jump();
          }
      },
      cartIds(){ 
          var id=parseInt(this.allid); 
          var token=this.token;
            var url=`freeter-api/cart/accountCart?token=${token}&cartIds=${id}`; 
           if(id ==''){
             Toast("请选择结算商品");
           }else{ 
            this.$http.post(url).then(res=>{  
              if(res.body.code==0){ 
              }
            })
          this.jump();
          }
      },
      jump(){ 
         var id=this.allSelectedGoods;
         let goodSpecId=localStorage.setItem('goodSpecPriceId',this.goodSpecId);  
         if(id==''|| goodSpecId==''){
            Toast('请选择结算商品');
         }else{
           this.$router.push({name:"order",params:{id}});  
            localStorage.setItem('caid',this.allSelectedGoods);
            console.log(id);
         }
         
      },
    }
  }

</script>


<style scoped>
.mint-header-title{
  font-weight: bold !important;
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
  margin-top: 1rem;
  }
.car-item
  { 
  position: relative;
  height:3.1rem;
  overflow: hidden;
  padding-left: .24rem;
  padding-right: .24rem;
  background: #fff;
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
  margin-top: .1rem;
  background: #939393; 
  border-radius: 50%;}
.input-label:after{
  /* opacity: 0; */
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
  {background:#c5161d;}
.car-cont{
  font-size: .32rem;
  color: #313131;
  float: right;
  height: 1rem;
  width: 75%; 
  padding-top: .1rem;
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
      margin-top: .08rem;
  }
  .input-labels{
  cursor :pointer;  
  left: .1rem; 
  width :.5rem;
  height:.5rem; 
  margin-top: .15rem;
  background: #939393; 
  border-radius: 50%;}
  .input-labels.active
  {background: #c5161d;}
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
  width: 3.35rem;
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
  float:left;
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

