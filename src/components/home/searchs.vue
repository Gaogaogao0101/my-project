<template>
    <div id="search">
        <div class="top-sear">
            <div class="ts-left" @click="reutrns"><img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""></div>
            <div class="ts-right"><input type="text" v-model="searchVal" placeholder="输入会员手机号" oninput = "value=value.replace(/[^\d]/g,'')"><img src="../../lib/img/ios/search.png" alt=""></div>
        </div> 
        <div style="height:100%;width:100%;">
         <div class="leaguer" v-if="list.length==0" style="height:100%;">
            <div class="inline" style="height:100%;"><img src="../../lib/img/ios/nosearch@3x.png" alt="" style=""></div>
            <div class="nosearch" style="">
              <p>没有查询到</p>
              <p>您可以向上滑动查找您要找的成员</p>
            </div>
         </div>
         <div class="leaguer"> <!--v-if='index<1'-->
            <div class="l-top"></div>
            <div class="l-til">
                <div class="til-left"><div class="kuai" style="width:.12rem;height:.22rem;background:#16C54C;float:left;margin-top:.25rem;margin-right:.05rem;"></div>推荐人信息</div>
                <!-- <div class="til-right"><div class="kuai" style="width:.12rem;height:.22rem;background:#16C54C;float:left;margin-top:.25rem;margin-right:.05rem;"></div>推荐人</div> -->
            </div>
            <div class="l-con">
                <div class="con-left">
                    <div class="con-lefts">
                        <span><img v-bind:src="'http://app.hzhlsy.net/'+parid.userImg"  :onerror="logo" /></span>
                        <div class="name">{{parid.userName}}</div>
                    </div>
                    <div class="con-rights">
                        <div class="tle"><img src="../../lib/img/ios/dh@3x.png" alt="">{{parid.userPhone}}</div>
                        <div class="wxwx" style="margin-top:.3rem;"><img src="../../lib/img/ios/wx@3x.png" alt="">{{parid.userWX}}</div>
                    </div>
                </div> 
                <div class="l-bottom" @click="userId(parid.userId)">
                    <img src="../../lib/img/ios/jifen@3x.png" alt="">
                    <div >转积分</div>
                </div>
            </div> 
        </div>
        <div class="leaguer" v-for="(item,index) in lists" v-if='index>=1'> <!--v-if='index<1'-->
            <div class="l-top"></div>
            <div class="l-til">
                <div class="til-left"><div class="kuai" style="width:.12rem;height:.22rem;background:#16C54C;float:left;margin-top:.25rem;margin-right:.05rem;"></div> 成员信息</div>
                <div class="til-right"><div class="kuai" style="width:.12rem;height:.22rem;background:#16C54C;float:left;margin-top:.25rem;margin-right:.05rem;"></div>推荐人</div>
            </div>
            <div class="l-con">
                <div class="con-left">
                    <div class="con-lefts">
                        <span><img v-bind:src="'http://app.hzhlsy.net/'+item.userImg"  :onerror="logo"/></span>
                        <div class="name">{{item.userName}}</div>
                    </div>
                    <div class="con-rights">
                        <div class="tle"><img src="../../lib/img/ios/dh@3x.png" alt="">{{item.userPhone}}</div>
                        <div class="wxwx" style="margin-top:.3rem;"><img src="../../lib/img/ios/wx@3x.png" alt="">{{item.userWX}}</div>
                    </div>
                </div>
                <div class="con-right">
                   <span> <img v-bind:src="'http://app.hzhlsy.net/'+item.parentImg"  :onerror="logo"/></span>
                    <div class="tuijianren">{{item.parentName}}</div>
                </div>
                <div class="l-bottom" @click="userId(item.userId)">
                    <img src="../../lib/img/ios/jifen@3x.png" alt="">
                    <div >转积分</div>
                </div>
            </div> 
        </div>  
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            lists:[],
            searchVal:'', //默认输入为空
            token:localStorage.getItem('token'), 
            parid:[],
            logo: 'this.src="' + require('../../lib/img/ios/user20190727140338.png') + '"'  
        }
    }, 
    created(){
        this.getsearch();
    },
     methods:{ 
        // 转积分
        userId(usersid){ 
             this.$router.push({name:'divide',params:{usersid}});
         },
          search:function(){
            
        },  
          reutrns:function(){
            javascript:history.back(-1);
         }, 
         getsearch(){
             var token=this.token;
             var phone=this.searchVal;
             var url=`freeter-api/user/myPhoneInfo?token=${token}&phoneLike=${phone}`;
             this.$http.post(url).then(res=>{ 
                 console.log(url);
                 if(res.body.code==0){
                     this.lists=res.body.listPhone;  
                     this.lists.forEach(con=>{
                        if(con.parentId==0){
                            this.parid=con; 
                           return Object(this.parid);
                        }
                     })
                 }
             })
         },
     },
     computed:{
        user(){

        },
        list: function(){
                var _this = this;
                //根据input的value值筛选goodsList中的数据
                var arrByZM = [];//声明一个空数组来存放数据
                for (var i=0;i<this.lists.length;i++){
                //for循环数据中的每一项（根据name值）
                if(this.lists[i].userPhone.search(this.searchVal) != -1){
                //判断输入框中的值是否可以匹配到数据，如果匹配成功
                arrByZM.push(this.lists[i]);
                //向空数组中添加数据
                }
            }
            return arrByZM;
        }
    }
}
</script>
<style scoped> 
#search{
    width: 100%;
    height: 100%;
    background-color: #F3F3F3; 
    padding-top: .2rem;
    /* position: fixed;   */
}
#search .top-sear{
    width: 100%;
    height: 1rem; 
    background: #F3F3F3;
}
#search .top-sear .ts-left{
    text-align: left;
    padding-left: .24rem;
    padding-top: .16rem;
    float: left;
}
#search .top-sear .ts-left img{
    width: .17rem;
    height: .31rem;
}
#search .top-sear .ts-right{
    width: 4.66rem;
    margin: auto;
}
#search .top-sear .ts-right input{
    width: 4.66rem;
    height: .72rem;
    line-height: .72rem;
    font-size: .32rem;
    color: #545454;
    border: 1px solid #E8E8E8;
    font-family:"SourceHanSerifSC-Light";
}
#search .top-sear .ts-right input::placeholder{
    font-size: .24rem;
    line-height: .72rem;    
    color: #939393;
    font-family:"SourceHanSerifSC-Light";
}
#search .top-sear .ts-right img{
    width: .3rem;
    height: .29rem;
    margin-left: -.6rem;
}
.leaguer{
    height: 4.35rem; 
    background: #fff;
    box-shadow: 0 .1rem .2rem #E8E8E8;
    margin-bottom: .2rem;
} 
.leaguer .l-til{
    height: .7rem;
} 
.leaguer .l-til .til-left{
    width: 60%; 
    height: .7rem;
    line-height: .7rem;
    font-size: .24rem;
    font-weight: bold;
    padding-left: .13rem;
    float: left;
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-til .til-right{
    width:40%;
    height: .7rem;
    line-height: .7rem;
    font-size: .24rem;
    float: right; 
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-con{
    height: 2.07rem; 
    padding-left: .2rem;
    border-bottom: 1px solid #E0E0E0;
}
.leaguer .l-con .con-left{ 
    width: 59%; 
}
.leaguer .l-con .con-left .con-lefts{ 
     width:1.2rem;
     height: 1.2rem; 
    text-align: center;
    font-size: .32rem;
    font-weight: bold;  
    color: #313131;
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-con .con-left .con-lefts span{
    display: block;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background: #eee;
}
.leaguer .l-con .con-left .con-lefts img{
    width: 100%;
    border-radius: 50%;
    height: 100%;
}  
.leaguer .l-con .con-left .con-lefts img[src=""],img:not([src]){
    opacity:0;
    visibility: hidden;
    border: none;
    margin:-2px;
}
.leaguer .l-con .con-left .con-lefts .name{
    width: 1.2rem;
      overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:1; 
    -webkit-box-orient: vertical;
    word-wrap:break-word;
    margin-top: .1rem;
    font-size: .3rem;
    font-family:' PingFangSC-Regular, sans-serif';
}
.leaguer .l-con .con-left .con-rights{
    width:70%;
    height: 100%; 
    float: right;
    margin-top: -.95rem;
    padding-left: .2rem;
}    
.leaguer .l-con .con-left .con-rights .tle{
    font-size: .32rem;
    color: #545454;
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-con .con-left .con-rights .tle img{
    width: .32rem;
    height: .32rem;
    margin-right: .2rem;
    
}  
.leaguer .l-con .con-left .con-rights .wxwx{
    font-size: .32rem;
    color: #545454;
    font-family:"SourceHanSerifSC-Light";
}
.leaguer .l-con .con-left .con-rights .wxwx img{
    width: .45rem;
    height: .35rem;
    margin-right: .08rem;
}  
.leaguer .l-con .con-right{
    width: 42%; 
    height: 80%;
    float: right;
    margin-top: -1.2rem;
    text-align: center;
    font-size: .32rem;
    font-weight: bold;
    color: #313131;
    border-left: 1px solid #E0E0E0;
    font-family:"SourceHanSerifSC-Light";      
}
.leaguer .l-con .con-right span{
    display: block;
    width: .9rem;
    height: .9rem;
    margin: auto;
    border-radius: 50%;
    background: #eee;
}
.leaguer .l-con .con-right img{
    width: .9rem;
    height: .9rem;
    border-radius: 50%;
}
.leaguer .l-con .con-right img[src=""],img:not([src]){
    opacity:0;
    visibility: hidden;
    border: none;
    margin: -2px;
}
.leaguer .l-bottom{
    text-align: center;
    /* padding-top: .2rem; */
    font-size: .28rem;
    margin-top: 1.1rem; 
    color: #545454;
    font-family:"SourceHanSerifSC-Light";
    background-image: url(../../lib/img/ios/tuoyuan@2x.png);
    background-repeat: no-repeat;
    background-size: .58rem .27rem;
    background-position: 3.369rem 0rem;
}                 
.leaguer .l-bottom img{
    width: .48rem;
    height: .49rem;
    margin-top: .1rem;
}  
.leaguer .inline{
    width:3.2rem;height:3.06rem;margin:auto;
}
.leaguer .inline img{
    width:100%;height:100%;
}
.leaguer .nosearch{
    text-align:center;margin-top:.5rem;font-size:.32rem;color:#939393;font-family:"SourceHanSerifSC-Light";
}
.tuijianren{
    overflow:hidden;  
    text-overflow:ellipsis; 
    display:-webkit-box;  
    -webkit-box-orient:vertical; 
    -webkit-line-clamp:1;  
    width: 1.17rem;
    margin:auto;
    font-size: .3rem;
    color: #313131;
    margin-top: .2rem;
    font-family:' PingFangSC-Regular, sans-serif';
}
</style>






