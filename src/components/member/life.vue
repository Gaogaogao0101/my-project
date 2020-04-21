<template>
<div id="life">
    <div class="top" style="z-index:4;position:fixed;top:0; width:100%;">
        <router-link to="/member"><div class="top-left"><img src="../../lib/img/ios/fanhui@3x.png" alt=""></div></router-link>
        <div class="top-right">生活馆</div>
    </div>  
    <div class="con-list">
        <ul>
            <li v-for="(item,index) in ls" :key="index">
                <div><!-- @click='lifemap(item.shopname)'--> 
                <div class="fu" >
                    <div class="left">
                        <img :src="'http://app.hzhlsy.net/'+item.shopimg" alt="">
                    </div>
                    <div class="right" >
                         <div class="store">{{item.shopname}}</div>
                         <div class="address">{{item.province}}{{item.city}}{{item.county}}{{item.address}}</div>
                         <div class="tel"><img src="../../lib/img/ios/hongtel@3x.png" alt="">{{item.telephone}}</div>
                    </div>
                </div>
                </div>
            </li>
        </ul>
    </div>
</div>    
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            list:[],
            ls:[],
        }
    }, 
    created(){
        this.Getlist();
    },
    methods:{
        Getlist:function(){
            var url="freeter-api/myshops/list";
            this.$http.post(url).then(result=>{
                if(result.body.code==0){
                    this.list=result.body.myShops;
                     this.ls=this.list.reverse(); 
                }else if(result.body.code==0){
                    Toast(result.body.msg);
                }
            })
        },
      lifemap(name){ 
         this.$router.push({name:"map",params:{name}});
      },
    }

}
</script>
<style scoped> 
.continer{
    width: 100%;
    height: 100%;
    background: #fff;
}
#life{
    width: 100%;
    height: 100%;
    background: #fff;
}
#life .top{
    height: 1rem; 
    line-height: 1rem;
    background: #fff;
    padding-left: .24rem;
}
#life .top div{
    float: left;
}
#life .top .top-left{
    width: .2rem;
}
#life .top .top-left img{
    width: 100%;
    width: .2rem;
    height: .35rem;
   margin-top: .3rem;
    position: fixed;
   left: .24rem;
}
#life .top .top-right{
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
.con-list{
    margin-top: 1rem;
    background: #fff;
}
.con-list ul{
    padding-left: .24rem;
    padding-right: .24rem;
}
.con-list ul li{
    height: 2.3rem; 
    padding: .2rem 0 .4rem 0;
    
    border-bottom: 1px solid #E0E0E0;
     
}
.con-list ul li .fu{
    width: 100%;
    height: 100%; 
}
.con-list ul li .fu .left{
    width: 1.7rem;
    height: 1.7rem;
    float: left; 
}
.con-list ul li .fu .left img{
    width: 100%;
    height: 100%;
}
.con-list ul li .fu .right{
    width:76%;
    height: 100%; 
    margin-left: 1.7rem;
    padding-left: .2rem;
    padding-top: .2rem;
}
.con-list ul li .fu .right .store{
    font-size: .32rem;
    font-family: "SourceHanSerifSC-bold";
    font-weight:bold;
    color: #313131; 
}
.con-list ul li .fu .right .address{
    color: #545454;
    font-size: .24rem;
}
.con-list ul li .fu .right .tel{
    color: #545454;
    font-size: .24rem;
}
.con-list ul li .fu .right .tel img{
    width: .29rem;
    height: .27rem;
    margin-right: .2rem;
}
</style>
