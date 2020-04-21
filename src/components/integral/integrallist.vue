<template>
<div id="intlist">
    <!-- <div class="til">我的积分</div> -->
    <div class="int-top">
        <div class="it">
            <router-link to="/member"><div class="it-left"><img src="../../lib/img/ios/baifanhui@3x.png" alt=""></div></router-link>
            <div class="it-con">我的积分</div>
            <router-link to="/intlist/shift"><div class="it-right">明细</div></router-link>
        </div>
        <div class="cds">
            <div class="cd-left">
                <div class="counts">{{jifen}}</div>
                <div class="distribution">可分配积分</div>
            </div>
            <div class="cd-right">
                <img src="../../lib/img/ios/my-back-img@3x.png" alt="">
            </div>
        </div>
    </div>
    <router-link to="/searchs">
        <div class="int-z"> 
            <span class="zj z-left"> <img src="../../lib/img/ios/jifen@3x.png" alt=""></span>
            <span class="zj z-con">转积分</span> 
            <span class="zj z-right"><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></span> 
        </div>
    </router-link>
    <div class="news" >
        <div class="news-z" @click="getdate">
            <span>今年</span><span class="z-right"><img src="../../lib/img/ios/fanhuiyou@3x.png" alt=""></span>
        </div>
    </div>
     <div class="inlie" v-if="list.length==0"> 
        <div class="nosearch" style="font-size:.38rem;font-family: 'SourceHanSerifSC-Bold';text-align:center;line-height:3rem;">没有查询到</div>
    </div>
    <div class="add" v-for="(item,index) in list" v-if="index==0">
        <div class="add-left">
            <div class="a-l-top"> </div>
            <div class="a-l-con">{{item.month}}月</div>
            <div class="a-l-bot">进行中</div>
        </div>
        <div class="add-right">
            <div class="a-r-top">
                <span class="top-block-left"><img src="../../lib/img/ios/tongji@3x.png" alt="">业绩统计</span>
                <span class="jf" @click="distribution"><img src="../../lib/img/ios/bianji@3x.png" alt=""> <span>分配积分</span></span>
            </div>
            <div class="a-r-bot">
                <div class="yj" style="">
                    <div class="y-data">{{item.groupFanli}}</div>
                    <div class="y-branch"><span v-if="item.grade==0">我的小组</span><span v-if="item.grade==1">我的部门</span></div>
                    <div class="y-pass" v-if="item.groupFanli>=2000">达标</div>
                    <div class="y-pass y-no-pass" v-if="item.groupFanli<2000">不达标</div>
                </div>
                <!-- <div class="yj" style="">
                    <div class="y-data">3,246</div>
                    <div class="y-branch">我的小组</div>
                    <div class="y-pass">达标</div>
                </div> -->
                <div class="yj" style="">
                    <div class="y-data">{{item.userFanli}}</div>
                    <div class="y-branch">个人积分</div>
                    <div class="y-pass" v-if="item.userFanli>=880">达标</div>
                    <div class="y-pass y-no-pass" v-if="item.userFanli<880">不达标</div>
                </div>
            </div>
        </div>
    </div>
     <div class="add" v-for="(item,index) in list.slice(1)" :key="index">
        <div class="add-left">
           
            <div class="a-l-con">{{item.month}}月</div>
            <div class="a-l-bot"><span v-if="item.isDeclare==1">已申报</span><span v-if="item.isDeclare==0">未申报</span></div>
        </div>
        <div class="add-right">
            <div class="a-r-top">
                <span class="top-block-left"><img src="../../lib/img/ios/tongji@3x.png" alt="">业绩统计</span>
                <span class="jfs">
                    奖分：+{{item.score}}
                </span>
            </div>
            <div class="a-r-bot">
                <div class="yj" style="">
                    <div class="y-data">{{item.groupFanli}}</div>
                    <div class="y-branch"><span v-if="item.grade==0">我的小组</span><span v-if="item.grade==1">我的部门</span></div>
                    <div class="y-pass" v-if="item.groupFanli>=2000">达标</div>
                    <div class="y-pass y-no-pass" v-if="item.groupFanli<2000">不达标</div>
                </div>
                <!-- <div class="yj" style="">
                    <div class="y-data">3,246</div>
                    <div class="y-branch">我的小组</div>
                    <div class="y-pass">达标</div>
                </div> -->
                <div class="yj" style="">
                    <div class="y-data">{{item.userFanli}}</div>
                    <div class="y-branch">个人积分</div>
                    <div class="y-pass" v-if="item.userFanli>=880">达标</div>
                    <div class="y-pass y-no-pass" v-if="item.userFanli<880">不达标</div>
                </div>
            </div>
        </div>
    </div>  
    <div id="bottom-dec">
        <div class="declare" v-for="(item,index) in list" v-if="index==1" @click="sourmonth">申报{{item.month}}月积分</div>
    </div>
    <!-- 分配积分弹出框 -->
    <div id="ttt" v-if="pass">
        <div id="z-ttt">
            <div class="t-top"><img src="../../lib/img/ios/fanhuileft@3x.png" @click="outup" alt=""><span @click="outup">取消</span></div>    
            <span class="spn"> <input type="text" class="int" v-model="shu" placeholder="请输入积分"  oninput = "value=value.replace(/[^\d]/g,'')"></span> 
            <div class="btn" @click="paydist">确认</div>
        </div>
    </div>
    <!-- 申报积分弹出框 -->
    <div id="sour" v-if="sour">
        <div class="tis">
            <div class="sour-cons">
                是否申报积分
            </div>
            <div class="sour-btn">
                <div class="sour-btn-left" @click="pay" :disabled="isDisable">确认</div>
                <div class="sour-btn-right" @click="outsourmonth">取消</div>
            </div>
        </div>
    </div>
    <!-- 年选择器弹出框 -->
    <div id="year" v-if="year">                           
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
            </div>
            <!-- <DateSelect   />   -->
        </div> 
    </div>
</div>    
</template>
<script>
import {Rem} from "../../lib/js/rem.js";
import {source} from '../../lib/js/SourceHanSansCN-Regular.ttf' 
import {Pingf} from '../../lib/js/pingfang.ttf'
import {Toast} from 'mint-ui' 
export default {

    inject:['reload'],
    data(){
        return{
           token:localStorage.getItem('token'),
           jifen:0,
           list:[],  
           pass:false,
           sour:false,
           shu:"",
           groupFanli:0,
           userFanli:0,
           isDisable: true,
           year:false,
           yearsModel:null,
            years:[],
            monthsModel:null,
            months:[],
            daysModel:null,
            days:[],
        }
    }, 
    // components: { DateSelect },
    created(){
        this.getjifen();
        this.getmonth();
        this.init(); 
        // this.zhuangtai();
    },
    methods:{
        // 修改手机状态栏
        zhuangtai(){ 
                if(window.plus) {
                    plusReady();
                } else {
                    document.addEventListener("plusready", plusReady, false);
                }  
            },
            plusReady(){
				// 设置系统状态栏背景为红色
				var type = plus.os.name;
				if(type == "iOS") {
					plus.navigator.setStatusBarBackground("#C5161D");
				} else {
					plus.navigator.setStatusBarBackground("#C5161D");
				} 
            },  
        // 日期
        getdates(){
            var token = this.token;
            var years = parseInt(this.yearsModel);
            var url=`freeter-api/integral/getUserMonthJiFen?token=${token}&year=${years}`;
            this.$http.post(url).then(res=>{
                if(res.body.code==0){
                    this.list=res.body.getUserMonthJiFen;
                }
            }) 
        }, 
        // 选择日期弹出
        getdate(){   
             this.getdates();
             if(this.year==true){
                 this.year=false;
             }else if(this.year=true){
                 this.year=true;
             }
        },
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
            if(type == 4){
            this.dayleft();
            }
            if(type == 5){
            this.dayright();
            }
            this. getdates(); 
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
        // 申报积分
        getjf(){
            this.isDisable = true; 
            var token=this.token;
            var groupFanli=this.groupFanli;
            var userFanli=this.userFanli;
             var url=`freeter-api/integral/declareUserJiFen?token=${token}&userFanli=${userFanli}&groupFanli=${groupFanli}`;
            if(userFanli>=880){ 
                this.$http.post(url).then(res=>{
                    console.log(url);
                    this.isDisable = false; 
                    if(res.body.code==0){
                        Toast(res.body.msg);
                        this.sour=false;
                        this.reload();
                    }else if(res.body.code==500){
                        Toast(res.body.msg);
                        this.sour=false;
                    }
                })
                 this.reload();
            }else if(userFanli<880){
                Toast("您当前的积分不达标");
                this.sour=false;
            }
            this.reload();
            this.getjifen();            
        },
        pay(){
            if(this.isDisable==true){
                this.getjf();
                this.isDisable=false;
            }else{
               Toast("数据重复提交");
                this.sour=false;
                return;
            }
        },
        sourmonth(){
            this.sour=true;
        },
        outsourmonth(){
            this.sour=false;
        },
        // 分配积分
        dist(){
            let shu=parseInt(this.shu);
            let token=this.token;
            var url=`freeter-api/integral/allotUserJiFen?token=${token}&integral=${shu}`;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    Toast("分配成功");
                    this.pass=false;
                    this.reload();
                }else if(res.body.code==0){
                    Toast(res.body.msg);
                }
            }) 
        },
        paydist(){
            if(this.isDisable==true){
                this.dist();
                this.isDisable=false;
            }else{
               Toast("数据重复提交");
                this.sour=false;
                return;
            }  
        },
        // 分配积分框
        distribution(){
            this.pass=true;
        },
        outup(){
            this.pass=false;
        },
         
        // 我的总积分
        getjifen(){
            var url=`freeter-api/integral/getUserJiFen?token=`+this.token;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    this.jifen=res.body.JiFen;  
                }
            })
        },
        // 月份业绩
        getmonth(){  
            let token=this.token;  
            let year=parseInt(0);
            var url=`freeter-api/integral/getUserMonthJiFen?token=${token}&year=${year}`;
            this.$http.post(url).then(res=>{   
                if(res.body.code==0){
                    this.list=res.body.getUserMonthJiFen;//.reverse();反序 
                    let onelist=this.list[1];
                    console.log(onelist);
                    this.groupFanli=onelist.groupFanli;
                    this.userFanli=onelist.userFanli;               
                }
            })
        },
    }
}
</script>
<style scoped>
#intlist{
    margin-bottom: 2.15rem;
}
#intlist .int-top{
    height: 4.1rem;
    background: #C5161D;
    padding-left: .24rem;
    padding-right: .24rem;
}
#intlist .int-top .it {
    height: .9rem;
    line-height: .9rem; 
}
#intlist .int-top .it .it-left{
    width: 5%;
    float: left;
    line-height: 1rem;
}
#intlist .int-top .it .it-left img{
    width: .16rem;
    height: .28rem;
    line-height: 1rem;
}
#intlist .int-top .it .it-con{
    width: 80%;
    color: #ffffff;
    font-size: .42rem;
    font-family: "SourceHanSerifSC-Light";
    float: left;
}
#intlist .int-top .it .it-right{
    width: 15%;
    float: right;
    text-align: right;
    font-size: .32rem;
    color: #ffffff;
    font-family: "SourceHanSerifSC-Light";
}
#intlist .int-top .cds .cd-left{
    width: 50%;
}
#intlist .int-top .cd-left .counts{ 
    color: #ffffff;
    margin-top: .88rem;
    height: .5rem;
    font-size: .945rem;
    font-family: "SourceHanSerifSC-Light";
}
#intlist .int-top .cds .cd-left .distribution{
    margin-top: .37rem;
    font-size: .32rem;
    color: #EBC1C1;
    font-family: "SourceHanSerifSC-Light";
}
#intlist .int-top .cds .cd-right{
    width: 50%;
    float: right;
    position: relative;
}
#intlist .int-top .cds .cd-right img{
    width:2.85rem;
    height:3.16rem;
    position:absolute;
    top: -2.15rem;
    right:-.24rem;
}
#intlist .int-z{
    height: 1.1rem;
    padding-left: .2rem;
    background: #fff;
}
#intlist .int-z span{
    display: block;
    float: left;
}
#intlist .int-z .z-left{
    width: 1rem;
    /* display: block; */
    background-image: url(../../lib/img/ios/tuoyuan@2x.png);
    background-size: .6rem;
    background-position: .1rem .2rem;
    background-repeat: no-repeat;
    font-family: "SourceHanSerifSC-Light";
}
#intlist .int-z .z-left img{
    width: .6rem;
    margin-top: .25rem;
    margin-left: .1rem;
}
#intlist .int-z .z-con{
    line-height: 1.1rem;
    font-size: .32rem;
    color: #313131;
    font-family: "Source Han Sans CN";
}
#intlist .int-z .z-right{
    float: right;
    margin-right: .38rem;

}
#intlist .int-z .z-right img{
    width: .17rem;
    height: .28rem;
    margin-top: .38rem;
}
#intlist .news{
    height: 1.38rem;
    background: #F3F3F3; 
    padding-top: .39rem;
}
#intlist .news .news-z{
    width: 2rem;
    height: .6rem;
    background: #ffffff;
    line-height: .6rem; 
    text-align: center;
    margin-left: .24rem;
    border-top-right-radius:20px;
    border-top-left-radius:20px;
    border-bottom-left-radius:20px;
    border-bottom-right-radius:20px;
}
#intlist .news .news-z span{
    color: #313131;
    font-size: .32rem;
    font-family: "Source Han Sans CN";
}
#intlist .news .news-z .z-right{
    margin-left: .3rem;
}
#intlist .news .news-z .z-right img{
    width: .13rem;
    height: .23rem;
}
#intlist .add{
    height:3.15rem; 
    box-shadow:0 8px 20px rgba(222,222,222,0.6);
    margin-bottom: .27rem;
    background: #fff;
}
#intlist .add .add-left{
    width: 1.2rem;
    height: 100%; 
    border-right: 1px solid #C6C6C6;
    padding-top: 1rem;
    text-align: center;
    float: left;
} 
#intlist .add .add-left .a-l-top{
    width: .48rem;
    height: .2rem;
    background: #C5161D;
    margin-left:.36rem; 
}
#intlist .add .add-left .a-l-con{
    margin-top: .1rem;
    font-size: .32rem;
    font-weight: bold;
    color: #313131;
    font-family: "Source Han Sans CN";
}
#intlist .add .add-left .a-l-bot{
    margin-top: .2rem;
    font-size: .28rem;
    color: #313131;
}
#intlist .add .add-right{ 
    height: 100%;
    width: 84%;
    margin-left: 16%;
}
#intlist .add .add-right .a-r-top{
    height:.8rem; 
    padding-top: .3rem; 
}
#intlist .add .add-right .a-r-top .top-block-left{
    display: block;
    font-size: .24rem;
    width: 40%; 
    margin-left: .35rem; 
    font-family: "Source Han Sans CN";
}
#intlist .add .add-right .a-r-top .top-block-left img{
    width: 0.4rem;
    height: .4rem;
    margin-right: .1rem;
}
#intlist .add .add-right .a-r-top .jf{
    width: 1.85rem;
    margin-right: .2rem;
    display: block;
    height: .5rem;
    float: right;
    margin-top: -.5rem;
    font-size: .24rem;
    line-height: .5rem;
    background:#C5161D;
    border-top-right-radius:20px;
    border-top-left-radius:20px;
    border-bottom-left-radius:20px;
    border-bottom-right-radius:20px;
}
#intlist .add .add-right .a-r-top .jf img{
    width: .3rem;
    height: .35rem;
    margin-top: .07rem;
    margin-left: .25rem;
    float: left;
}
#intlist .add .add-right .a-r-top .jf span{
    line-height: .5rem;
    display: block;
    color: #ffffff;
    margin-left: .1rem;
    font-family: "SourceHanSerifSC-Light";
}
#intlist .add .add-right .a-r-bot{
    height: 2.1rem; 
}
#intlist .add .add-right .a-r-bot .yj{
    width: 33.333%;
    height: 100%;       
    float: left;
    text-align: center;
    padding-top: .4rem;
    margin-left: 10%;
}
#intlist .add .add-right .a-r-bot .yj div{
    margin-bottom: .1rem;
}
#intlist .add .add-right .a-r-bot .yj .y-data{
    font-size: .32rem;
    color: #545454;
    font-weight: bold;
    font-family: "SourceHanSerifSC-Bold";  
}
#intlist .add .add-right .a-r-bot .yj .y-branch{
    font-size: .24rem;
    color: #939393;
    font-family:"SourceHanSerifSC-Light";
}
#intlist .add .add-right .a-r-bot .yj .y-pass{
    width: 1.13rem;
    height: .4rem;
    font-size: .24rem;
    font-family: "SourceHanSerifSC-Light";
    line-height: .38rem;
    background: #16C54C;
    border-top-right-radius:20px;
    border-top-left-radius:20px;
    border-bottom-left-radius:20px;
    border-bottom-right-radius:20px;
    margin:auto;
    color: #ffffff;
    letter-spacing:2px;
}
#intlist .add .add-right .a-r-bot .yj .y-no-pass{
    background: #C5161D;
    font-family: "SourceHanSerifSC-Light";
}
#intlist .add .add-right .a-r-top .jfs{
    float: right;
    margin-top: -.45rem; 
    margin-right: .2rem;
    font-weight: bold;
    color: #545454;
    font-family: "Source Han Sans CN";
}
#intlist #bottom-dec{
    width: 100%;
    height: 1.8rem;
    background: #F3F3F3;
      position: fixed;
    bottom:0;
}
#intlist #bottom-dec .declare{
    width: 94%;
    height: .89rem;
    background: #D3D3D3;
    margin:.46rem auto;
    text-align: center;
    line-height: .89rem;
    counter-reset: #313131;
    font-size: .32rem;
    font-family: "SourceHanSerifSC-Light";
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
}
/* 弹框 */
/* 分配积分 */
#ttt{
    width: 100%;
    height: 100%;
    background-color: rgba(10,10,10,.3);
    position: fixed;
    top: 0;
}
#z-ttt{
    width: 80%;
    height: 4rem;
    margin: auto;
    position: absolute;
    top:4rem;
    left: 10%;
    background: #fff;
    border: 1px solid #eeeeee;
}
#z-ttt .t-top{
    width: 100%;
    height: .8rem; 
    font-size: .32rem;
    color: #5C5C5C;
    line-height: .8rem;
    padding-left: .5rem;
}
#z-ttt .t-top img{
    width: .18rem;
    height: .32rem; 
    position: absolute;
    top: .2rem;
    left: .24rem;
}
#z-ttt .spn{
    display: block;
    width: 80%;
    height:.8rem;
    margin:.5rem auto;
    color: #939393;
    padding-left: .24rem;
    line-height: .8rem; 
    font-size:.32rem;
    position: relative;
}
#z-ttt .spn .int{
    position:absolute;
    left:0;
    background-color: rgba(250,250,250,0);
    background: #F3F3F3;
    opacity: .6;
    border: none;
}
#z-ttt .btn{
    width: 40%;
    height: .8rem;
    background: #C5161D;
    color: #fff;
    margin: auto;
    text-align: center;
    line-height: .8rem;
    font-size: .32rem;
    border-top-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    border-top-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
}
/* 申报积分 */
#sour{
    width: 100%;
    height: 100%;
    background-color: rgba(10,10,10,.3);
    position: fixed;
    top: 0; 
}
#sour .tis{
    width: 80%;
    height: 4rem;
    background: #fff;
    position: absolute;
    top: 4rem;
    left: 10%;
}
#sour .tis .sour-cons{
    height: 2.5rem;
    width: 100%;
    text-align: center;
    line-height: 2.5rem;
    font-size: .42rem; 
    font-family: 'SourceHanSerifSC-Bold';
}
#sour .tis .sour-btn{
    height: 1.5rem;
    width: 100%; 
    /* padding-top: .35rem; */
}
#sour .tis .sour-btn div{
    float: left;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    text-align: center;
    line-height: .8rem;
    color: #fff;
    font-size: .32rem;
    font-family: 'SourceHanSerifSC-Light';
}
#sour .tis .sour-btn .sour-btn-left{
    width: 40%;
    height: .8rem;
    background: #C5161D;
    margin-left: 7.5%;
}
#sour .tis .sour-btn .sour-btn-right{
    width: 40%;
    height: .8rem;
    background: #C5161D;
    margin-left:5%;
} 
#year .data-year{ 
    position: absolute;
    top: 5.5rem;
    left: 2.5rem;
}
</style>
