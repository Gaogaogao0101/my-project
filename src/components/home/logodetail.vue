<template>
    <div id="detail">
        <router-link to="/home">
         <div class="top" style="z-index:4;position:fixed;top:0;border-bottom:1px solid #eee;width:100%;">
            <div class="top-left"><img src="../../lib/img/ios/fanhui@3x.png" alt=""></div>
            <div class="top-right">红绿生源简介</div>
        </div>
        </router-link>
        <!-- <div class="title"><router-link to="/home"><img src="../../lib/img/ios/fanhuizuo@2x.png" alt="" style="width:.24rem;float:left;margin-left:.24rem;margin-top:.25rem;"></router-link> 红绿生源简介</div> -->
        <div class="content">
            <div style="margin-left:.4rem;">“红绿生源”品牌来源：</div>
            <div style="margin-left:.4rem;">红色代表人体血红素</div>
            <div style="margin-left:.4rem;">绿色代表植物叶绿素</div>
            <div style="margin-left:.4rem;margin-right:.24rem;text-indent:.8rem;">植物的叶绿素和人体血液中的血红素均是自然界不同生命体的重要内源物质，叶绿素的分子结构与血红素极其相似,作用相反。</div>
            <div style="margin-left:.4rem;margin-right:.24rem;text-indent:.8rem;">因此，这一“红” 一“绿”既是维持自然界各种生命不可缺少的重要基础物质，有着十分密切的亲缘联系，又相辅相成。</div>
            <div style="margin-left:.4rem;text-indent:.8rem;">一红一绿是生命的源泉，故取名为红绿生源。</div>
            <div style="margin-left:.4rem;">发展历程：</div>
            <div style="margin-left:.4rem;margin-right:.24rem;text-indent:.8rem;">1956年成立的杭州叶绿素厂，是中国最早开始应用中药蚕砂提取叶绿素盐并专注出口创汇的生产企业，“红绿生源”叶绿素盐作为商品名称。</div>
            <div style="margin-left:.4rem;margin-right:.24rem;text-indent:.8rem;">研究叶绿素和血红素的发现者均获得诺贝尔奖，杭州叶绿素厂利用诺贝尔奖获得者的研究成果结合祖国医学，创造性地开发杭嘉湖独特的中药资源--蚕砂，对中药蚕砂资源进行提取，精制，分子结构改造等研究工作，用蚕砂提取了高纯度高水溶性高稳定性高人体吸收的叶绿素盐，是当时国内外商业应用中药蚕砂制成叶绿素盐最早的公司。</div>
            <div style="margin-left:.4rem;margin-right:.24rem;text-indent:.8rem;">1990年和杭州电化集团合并，杭州电化集团是中国500强企业，杭州市重点企业。合并后的杭州电化集团叶绿素厂，应用杭电化研发和化学合成方面的技术优势，提升企业规模和研发实力，研发并制成了叶绿素各种衍生物，并出口叶绿素盐到欧美国家，成为国内中药蚕砂制成叶绿素盐出口的最大生产企业。</div>
            <div style="margin-left:.4rem;margin-right:.24rem;text-indent:.8rem;">2017年更名为杭州红绿生源健康科技有限公司，推出健齿护龈，除口气，特含中药蚕砂提取的叶绿素盐的绿薇牙膏。</div>
        </div>
        <div id="ban">
            Copyright 版权所有 © 红绿生源 {{year}} All Right Reservid
        </div>
    </div>  
</template>
<script>
export default {
    data(){
        return{
            year:0,
        }
    }, 
    created(){
        this.getdate();
    },
    methods:{
        getdate(){
           var date=new Date();
           this.year=date.getFullYear(); 
        },
    },
    //监听路由改变
    watch: {
        '$route.path':function (newVal,oldVal) {
            console.log(newVal,oldVal);
        } 
    }
}
</script>
<style scoped>
.top{
    height: 1rem; 
    line-height: 1rem;
    background: #fff;
    padding-left: .24rem;
}
.top div{
    float: left;
}
.top .top-left{
    width: .2rem;
}
.top .top-left img{
    width: 100%;
    width: .2rem;
    height: .35rem;
   margin-top: .3rem;
   position: fixed; 
}
.top .top-right{
    width: 96%; 
    text-align: center;
    font-size: .42rem;
    font-weight: bold;
    color: #313131;
    font-family:"Source Han Sans CN";
}
.router-link-active{
    background: none;
}
#detail .title{
    width: 100%;
    font-size: .42rem;
    text-align: center;
    font-family: 'SourceHanSerifSC-Light';
    font-weight: bold;
    height:1rem;
    line-height:1rem; 
    margin-bottom: .2rem; 
}
.content{
    line-height: .8rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    background: #fff;
}
#ban{
    width: 6rem;
    margin: auto;
    text-align: center;
    color: #313131;
    border: 2px dashed #939393;
    margin-bottom: 1rem;
    background: #fff;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
}
</style>
