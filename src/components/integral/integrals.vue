<template>
   <div id="int">
       <div class="til" style="background:#16C52F;position:fixed;top:0;height:1rem;z-index:2;">
               <router-link to="/member"><div class="left"><img src="../../lib/img/ios/baifanhui@3x.png" alt=""></div></router-link>
               <div class="right"><router-link to="/integral"><span>我的积分</span></router-link><samp>小组奖分</samp></router-link></div>
           </div>
       <div class="top"> 
            <div class="number">
                <img src="../../lib/img/ios/start@3x.png" alt=""><span>{{inte}}</span>
            </div>
       </div>
       <div class="month" @click="getifdate">
           <span class="til">奖分明细</span>
           <span class="share">{{ monthsModel}}月 <img src="../../lib/img/ios/triangle-img@3x.png" alt=""></span>
       </div>
       <div class="content">
           <div class="inlie" v-if="del.length==0"> 
                <div class="nosearch" style="color:#939393;line-height:5rem;text-align:center;">暂无数据</div>
            </div>
           <ul v-for="(item,index) in del" :key="index" >
               <li v-if="item.status==0">
                   <div class="cont">
                       <div class="left" style=""> <img :src="'http://app.hzhlsy.net/'+item.picImg" :onerror="logo" alt=""> </div>
                       <div class="con">{{item.userName}}</div>
                       <div class="rights">
                          <span class="commodity">贡献奖金</span> <span class="money">+{{item.money}}</span> <span class="date">{{item.createTime.substring(0,10)}}</span>
                       </div>       
                   </div> 
                   <div class="hs"></div>
               </li>  
           </ul>
       </div>
       <div class="bot">
            <div class="declare" @click="posttema" v-if="usershow">申报小组奖分</div>
            <div class="declare" v-else>提交成功</div>
             <span class="qualifications" @click="rule">申报规则</span> 
       </div>
       <!-- 年选择器弹出框 -->
        <div id="year" v-if="ifyear">                           
            <div class="data-year"> 
                <div id = "myDate" >
                    <!-- <button icon="el-icon-caret-left"  @click="dateChange(4)" ></button> -->
                    <select v-model="yearsModel" @change="dateChange(1)" placeholder="请选择" style="width:100px; position: relative;">
                        <option style="position: absolute;top:0;"
                        v-for="item in years"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </option>
                    </select>
                     <select v-model="monthsModel" @change="dateChange(2)" placeholder="请选择" style="width:100px;">
                        <option
                        v-for="item in months"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </option>
                    </select>
                </div>
                <!-- <DateSelect   />   -->
            </div> 
        </div>
   </div>
</template>
<script> 
import {Toast} from 'mint-ui'
export default {
    inject:['reload'],
    data(){
        return{
           token:localStorage.getItem('token'),  
           inte:'', 
           ifyear:false,
           yearsModel:'',
           years:[],
           monthsModel:'',
           months:[], 
           days:[],
           list:[],
           del:[],
           showmonth:'',
           isShow:'',
           del:[], 
           usershow:'true',
           logo: 'this.src="' + require('../../lib/img/ios/user20190727140338.png') + '"'  
        }
    },
    created(){ 
        this.init();  
        this.getteam();
        this.getint();  
    },
    mounted(){ 
    },
    methods:{ 
        // 查看规则
        rule(){
            var type=2;
            this.$router.push({name:'rule',params:{type}}); 
        },
         // 申报小组积分
        posttema(){
            var token=this.token;
            var url=`freeter-api/withdraw/declareTeamIntegral?token=${token}`;
            if(token==''||this.inte==null||this.inte==undefined){
                Toast('请稍后再试')
            }else if(this.inte==0){
                Toast('您当前没有积分');
            }else{
                this.$http.post(url).then(res=>{
                    if(res.body.code==0){
                        Toast(res.body.msg); 
                        this.usershow=false;
                        this.reload();
                    }else if(res.body.code==500){Toast(res.body.msg);}
                })
            }
        },
         // 小组积分
        getint(){
            var url='freeter-api/credits/teamIntegral?token='+this.token;
            this.$http.post(url).then(res=>{  
                if(res.body.code==0){
                    this.inte=res.body.myTeamIntegral;
                }else if(res.body.code==500){
                    Toast(res.body.msg);
                }
            })
        },
        // 小组积分明细
        getteam(){
            var myDate = new Date;
            var token=this.token;
            var year= this.yearsModel;
            var month=this.monthsModel;
            var url=`freeter-api/credits/teamIntegralDetail?token=${token}&year=${year}&month=${month}`;
            if(token==''||year==''||month==''){
                Toast('请稍后再试');
            }else{
                this.$http.post(url).then(res=>{ 
                    if(res.body.code==0){
                        this.del=res.body.myTeamIntegralDetail.reverse(); 
                    }else if(res.body.code==500){
                        Toast(res.body.msg);
                    }
                })
            }
        },
         // 选择日期弹出
        getifdate(){    
             if(this.ifyear==false){
                 this.ifyear=true; 
             }else if(this.ifyear=false){
                 this.ifyear=true; 
             }
        }, 
         
        //日期
        init(){
            var myDate = new Date;
            var year = myDate.getFullYear();//获取当前年
            var month = myDate.getMonth()+1;//获取当前月
            var day = myDate.getDate();//获取当前日 
            this.initSelectYear(year)
            this.initSelectMonth();
            this.initSelectDay(year,month);
            this.yearsModel = year;
            this.monthsModel = month;
            this.daysModel = day;
            // let obj ={year:this.yearsModel,month:this.monthsModel,day:this.daysModel }
            // this.$parent.dateChange(obj); 
        },
        initSelectYear(year){
            this.years = [];
            for(let i=0;i<30;i++){
                this.years.push({value:(year - i),label:(year - i)+ "年"});
            }
        },
        initSelectMonth(){
            this.months = [];
            this.months.push({value:0,label:"全部"});
            for(let i=1;i<=12;i++){
                this.months.push({value:i,label:i+ "月"});
            }
             
        },
        initSelectDay(year,month){
            var maxDay = this.getMaxDay(year,month);
            this.days = [];
            this.days.push({value:0,label:"全部"});
            for(var i=1;i<=maxDay;i++){
                this.days.push({value:i,label:i+ "日"});
            }
        },
        dateChange(type){
            //1年 2月 3日 4 左 5右
            if(type == 1||type == 2){
                if(this.monthsModel == 0){
                this.daysModel = 0;
                this.initSelectDay(this.yearsModel,1);
                }else{
                this.initSelectDay(this.yearsModel,this.monthsModel);
                }
            }
            if(type==2){
                this.geti();
                
            }
            if(type == 4){
            this.dayleft();
            }
            if(type == 5){
            this.dayright();
            }
            
        },
         geti(){
            this.ifyear=false; 
            this.getteam()
        },
        dayleft(){ 
            var tmpYear = this.yearsModel;
            var tmpMonth =  this.monthsModel;
            var tmpDay = this.daysModel;
            if(tmpYear ==null){ 
            var myDate = new Date;
            var year = myDate.getFullYear();//获取当前年
            var month = myDate.getMonth()+1;//获取当前月
            var day = myDate.getDate();//获取当前日
            this.yearsModel = year;
            this.monthsModel = month;
            this.daysModel = day;
            return;
            }
            if(tmpMonth ==null){ tmpMonth = 0}
            if(tmpDay ==null){ tmpDay = 0}
    
            var yearV = tmpYear;
            var monthV = tmpMonth ;
            var dayV = tmpDay;
        
        if((tmpMonth == 0||tmpMonth == 1) && (tmpDay == 0||tmpDay == 1)){
            yearV = tmpYear  - 1; monthV = 12;
            dayV = this.getMaxDay(tmpYear,tmpMonth);
        }
            if(!(tmpMonth == 0||tmpMonth == 1) && (tmpDay == 0||tmpDay == 1)){
                monthV = tmpMonth - 1;
                dayV = this.getMaxDay(tmpYear,tmpMonth);
            }
            if((tmpMonth == 0||tmpMonth == 1) && !(tmpDay == 0||tmpDay == 1)){
                dayV = tmpDay - 1;
            }
            if(!(tmpMonth == 0||tmpMonth == 1) && !(tmpDay == 0||tmpDay == 1)){
                dayV = tmpDay - 1;
            }
            this.yearsModel = yearV;
            this.monthsModel = monthV;
            this.daysModel = dayV;
        },
        dayright(){
    
            var myDate = new Date;
            var year = myDate.getFullYear();//获取当前年
            var month = myDate.getMonth()+1;//获取当前月
            var day = myDate.getDate();//获取当前日
    
            var tmpYear = this.yearsModel;
            var tmpMonth =  this.monthsModel;
            var tmpDay = this.daysModel;
    
            if(tmpYear ==null){ 
            var myDate = new Date;
            var year = myDate.getFullYear();//获取当前年
            var month = myDate.getMonth()+1;//获取当前月
            var day = myDate.getDate();//获取当前日
            this.yearsModel = year;
            this.monthsModel = month;
            this.daysModel = day;
            return;
            }
        
            if(tmpMonth ==null){ tmpMonth = 0}
            if(tmpDay ==null){ tmpDay = 0}
            if(tmpYear>year){
            this.yearsModel = year;
            this.monthsModel = month;
            this.daysModel = day;
            return;
            }
            if(tmpYear == year){
            if((tmpMonth > month || tmpMonth ==0 )||(tmpMonth == month )&&(tmpDay >= day || tmpDay ==0)){
                this.yearsModel = year;
                this.monthsModel = month;
                this.daysModel = day;
                return;
            }
            }
            
            var maxDay = this.getMaxDay(tmpYear,tmpMonth);
            var yearV = tmpYear;
            var monthV = tmpMonth ;
            var dayV = tmpDay;
    
            if((tmpMonth == 0 || tmpMonth == 12) && (tmpDay == 0 || tmpDay == maxDay)){
                yearV = tmpYear  + 1; monthV = 1;
                dayV = 1;
            }
            if(!(tmpMonth == 0 || tmpMonth == 12) && (tmpDay == 0 || tmpDay == maxDay)){
                monthV = tmpMonth + 1;
                dayV = 1;
            }
            if(!(tmpMonth == 0 || tmpMonth == 12) && !(tmpDay == 0 || tmpDay == maxDay)){
                dayV = tmpDay + 1;
            }
            
            this.yearsModel = yearV;
            this.monthsModel = monthV;
            this.daysModel = dayV;
    
        },
        getMaxDay(year,month){
                var new_year = year;  //取当前的年份
                var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
                if(month>12)      //如果当前大于12月，则年份转到下一年
                {
                    new_month -=12;    //月份减
                    new_year++;      //年份增
                }
                var new_date = new Date(new_year,new_month,1);//取当年当月中的第一天
                return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
        },
    },
}
</script>
<style scoped>
#int{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #F3F3F3;
}
 .top{
     width: 100%;
     height: 3rem;
     margin-top: 1rem;
     background: #16C52F;
     background-image: url(../../lib/img/ios/bg1@2x.png);
    background-size: 7.5rem 2.65rem;
    background-repeat: no-repeat;
    background-position:0rem .5rem;
    position: relative; 
 }
 .til{
     width: 100%;
     height: 1rem;
 }
 .left{
     width: 10%;
     height: 1rem;
     float: left;
     
 }
 p{
     margin: 0;
     padding:0;
 }
 .left img{
    width: .16rem;
    height: .28rem;
    line-height: 1rem;
    margin:.36rem .24rem; 
 }
 .right{
     font-size: 16px;
     color: #fff;
     line-height: 1rem;
     text-align: center; 
     font-family: ' PingFangSC-Regular, sans-serif';
 }

 .right span{
     margin-right: 25px;
     font-size: 16px;
     color: #fff;
     letter-spacing: 1px;
 }
 .right samp{
     font-size: 21px;
     color: #fff;
     font-weight: bold;
 }
 .number{
     position: relative;
 }
 .number img{
     width: 22px;
     height: 22px;
     position: absolute;
     top: .98rem;
     left: 2.68rem;
     
 }
 .number span{
     color: #fff;
     font-size: 47px;
      /* font-family: 'SourceHanSerifSC-Heavy'; */
     position: absolute;
     top: .95rem;
     left: 3.2rem;
 }
 .month{
     width: 100%;
     height: 1.55rem;
     background: #F3F3F3;
     padding-left: .24rem;
 }
 .month .til{
    font-size: 16px;
    padding-top: .38rem;
    height: 16px;
    color: #545454;
    display: inline-block;
 }
 .month .share{
     font-size: 21px;
     margin-top: .1rem;
     color: #313131;
     font-weight: bold;
     font-family: 'SourceHanSerifSC-Bold'; 
     display: inline-block;
 }
 .month .share img{
     width:10px;
 }
 .content{
     background: #fff;
     margin-bottom: 95px;
     margin-top: 10px;
 }
 .content ul li{
     width: 100%;
     height:2.1rem; 
     background: #fff;
     position: relative; 
 }
 .content ul li .cont{
     width: 100%;height:1.9rem;background:#fff; padding-left: .24rem;padding-right: .24rem;
 }
 .content ul li .cont .left{
    width:1.02rem;height:1.02rem;margin-top:.4rem;border:1px solid #F7F7F7;float: left;font-family: 'PingFangSC-Regular, sans-serif';
    border-radius: 50%; 
 }
 .content ul li .cont .left img{
     width:100%;
     height:100%;
     margin: 0;
     border-radius: 50%;
 }
  .content ul li .hs{
    width:100%;height:.2rem;position: absolute;bottom:0;background:#F3F3F3;
  }
  .content ul li .cont .con{
      width: 58%;
      height: 1.9rem;
      line-height: 1.9rem; 
      padding-left: .24rem;
      float: left;
      font-size: .28rem;
      color: #313131;
      font-weight: bold;
  }
  .content ul li .cont .rights{
      width: 22%;
      height: 1.9rem;
      float: right;
  }
  .commodity{
      font-size: .28rem;
      color: #313131;
      margin-top:.26rem;
      display: block;
      letter-spacing:2px;
      font-family:'PingFangSC-Light, sans-serif';
  }
  .money{
      font-size:.39rem;
      font-weight: bold;
      color: #C5161D;
      display: block;
      font-family: 'PingFangSC-Regular, sans-serif';
  }
  .date{
      font-size:.24rem;
      color: #939393;
      font-family: 'PingFangSC-Regular, sans-serif';
      margin-top: -10px;
  }
.declare{
    width: 90%; 
    height: .8rem;
    text-align: center;
    line-height: .8rem;
    font-size: 16px;
    color: #313131;
    background: #D3D3D3;
    position: fixed;
    bottom: 50px;
    left: 5%;
    border-radius: 30px;
}
.qualifications{
    font-size: 14px;
    color: #C5161D;
    position: fixed;
    bottom: 20px;
    left: 41%;
    text-decoration:underline; 
}
  .content ul li .come{
      height: 42px; 
      background: #fff;
      padding-left: .24rem;
      padding-right: .24rem;
  }
 .content ul li .come img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 5px;
        margin-left: 38px;
    }
.content ul li .come span{
    color: #939393;
    font-size: 12px;
    line-height: 42px;
    display:inline-block;
    position: absolute;
    text-align: center;
    padding-left: 5px;
}
.content ul li .come small{
    color: #313131;
    display: inline-block;
    position: absolute;
    line-height: 42px;
    margin-left: 7px;
    font-size: 16px;
}
.bot{
    width: 100%;
    height:95px;
    background: #F3F3F3;
    position: fixed;
    bottom: 0;
}
#year{
    position: absolute;
    top:4.7rem;
    left:1.6rem;
}
</style>