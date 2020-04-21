<template>
<div id="shift">
    <div class="top">
        <router-link to="/intlist"><div class="top-left" ><img src="../../lib/img/ios/fanhuileft@3x.png" alt=""></div></router-link>
        <div class="top-right" @click="getdate">{{monthsModel}}月 <div class="ups"></div></div>
    </div>
    <div class="inlie" v-if="list.length==0">
        <div class="inline" style=""><img src="../../lib/img/ios/nosearch@3x.png" alt="" style=""></div>
        <div class="nosearch" style="">没有查询到</div>
    </div>
    <div class="mem" v-for="(item,index) in list">
        <div class="mem-left"><span v-if="item.type==1">转给</span><span v-if="item.type==0">转自</span></div>
        <div class="mem-con">
            <div class="m-con-top"><img :src="'http://app.hzhlsy.net/'+item.img" :onerror="logo"></div>
            <div class="m-con-bot">{{item.name}}</div>
        </div>
        <div class="mem-right">
            <div class="m-r-top">{{item.time}}</div>
            <div class="m-r-con">转积分</div>
            <div class="m-r-bot"><span v-if="item.type==0">+</span><span v-if="item.type==1">-</span>{{item.integral}}</div>
        </div>
    </div> 
     <!-- 年选择器弹出框 -->
    <div id="year" v-if="year">
        <div class="hiden" style="width:100%;height:1rem;" @click="yearhadin"></div>
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
        <div class="hiden" style="width:100%;height:85%;margin-top:1.3rem;" @click="yearhadin"></div>
    </div>
</div>    
</template>
<script>
import {Rem} from "../../lib/js/rem.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf'
export default {
   data(){
       return{
         year:false,
         monthsModel:0,
         yearsModel:0,
         token:localStorage.getItem('token'),
         list:[],
         logo: 'this.src="' + require('../../lib/img/ios/user20190727140338.png') + '"'
       }    
   }, 
   created(){
       this.init();
       this.getmoer();
   },
    methods:{ 
          // 选择日期弹出
        getdate(){
            this.year=true;  
        },
        geti(){
            this.year=false;
             this.getshu();
        },
        // 关闭日期选择
        yearhadin(){
            this.year=false;
        },
        // 获取默认数据
        getmoer(){
             var token=this.token;
             let year=parseInt(0);
             let month=parseInt(0);
             var url=`freeter-api/integral/modulationIntegralRecord?token=${token}&year=${year}&month=${month}`;
             this.$http.post(url).then(res=>{  
                 if(res.body.code==0){
                     this.list=res.body.integralRecord.reverse(); 
                 }
             })
        },
        // 根据日期获取数据
        getshu(){
            var token=this.token;
            var year=parseInt(this.yearsModel);
            var month=parseInt(this.monthsModel);
            var url=`freeter-api/integral/modulationIntegralRecord?token=${token}&year=${year}&month=${month}`;
            this.$http.post(url).then(res=>{ 
               if(res.body.code==0){
                     this.list=res.body.integralRecord; 
                 }
            })
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
    } 
}
</script>
<style scoped> 
#shift .top{
    height: 1rem; 
    line-height: 1rem;
    position: relative;
    background: #ffffff;
}
#shift .top div{
    float: left;
}
#shift .top .top-left{
    width: 15%;
    height: 100%;
}
#shift .top .top-left img{
    width: 100%;
    width: .15rem;
    height: .28rem;
    margin-top: .3rem;
    position: absolute;
    left: .2rem;
}
#shift .top .top-right{
    width:65%; 
    text-align: center;
    font-size: .42rem;
    font-weight: bold;
    color: #313131;
    font-family:"Source Han Sans CN";
} 
#shift .top .ups{
    width: 0;
    height: 0; 
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 10px solid #A9A9A9;
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: .4rem;
    right: 3.2rem;
    } 
#shift .mem{ 
    height:2.4rem;   
    border-bottom: 1px solid #E3E3E3;
    background: #ffffff;
}
#shift .mem div{
    float: left;
    
}
#shift .mem .mem-left{
    width:13%;
    height: 100%; 
    padding-left: .2rem;
    padding-top: .7rem;
    color: #313131;
    font-size: .36rem;
    font-weight: bold;
    font-family: "SourceHanSerifSC-Light";  
}
#shift .mem .mem-con{
    width: 25%;
    height: 100%; 
}
#shift .mem .mem-con .m-con-top{
    width: 1.2rem;
    height: 1.2rem;
    margin-top: .25rem;
    margin-left: .34rem;
    border-radius: 50%;
    background: #E3E3E3;
}
#shift .mem .mem-con .m-con-top img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    
}
#shift .mem .mem-con .m-con-bot{
    text-align: center;
    width: 100%;
    color: #313131;
    font-weight: bold;
    font-family:"SourceHanSerifSC-Light";  
    margin-top: .1rem;
    overflow:hidden;  
    text-overflow:ellipsis; 
    display:-webkit-box;  
    -webkit-box-orient:vertical; 
    -webkit-line-clamp:1;  
    font-size: .3rem;
}
#shift .mem .mem-right{
    width:62%;
    height: 100%;
    text-align: right; 
    padding-right: .2rem;
}
#shift .mem .mem-right div{
    width: 100%;
}
#shift .mem .mem-right .m-r-top{
    height: .75rem; 
    line-height: .75rem; 
    margin-top: .05rem; 
    color: #313131;
    font-size: .24rem;
    font-family: "SourceHanSerifSC-Light";
}
#shift .mem .mem-right .m-r-con{
    font-size: .32rem;
    color: #313131; 
    font-family: "SourceHanSerifSC-Light";
}
#shift .mem .mem-right .m-r-bot{
    font-size: .42rem;
    color: #313131;
    font-weight: bold;
    margin-top: .4rem;
    font-family: "Source Han Sans CN";
}
#year{
    width: 100%;
    height: 100%;
    background-color: rgba(10,10,10,.3);
    position: fixed;
    top: 0;
}
#year .data-year{ 
    width: 100%;
    padding-left:2.5rem;
    position: absolute;
    top:1rem;
    right:0rem;
}
select{
    background:#eee;
}
.inlie .inline{
    width:3.2rem;height:3.06rem;margin:auto;margin-top:1.7rem;
}
.inlie .inline img{
    width:100%;height:100%;
}
.inlie .nosearch{
    text-align:center;margin-top:.5rem;font-size:.32rem;color:#939393;font-family:"SourceHanSerifSC-Light";
}
</style>
