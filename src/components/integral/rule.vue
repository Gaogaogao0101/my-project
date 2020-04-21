<template>
 <div class="content">
    <div class="top">
        <div class="til-left" @click="reutrns"> <img src="../../lib/img/ios/fanhuizuo@3x.png" alt=""> </div>
        <div class="til-con">{{rule.name}}</div> 
    </div> 
    <div class="con rule-con" v-html="rule.content" style="margin-top:1.2rem;">
        {{rule.content}}
    </div>
 </div>
</template>
<script>
import {Toast} from 'mint-ui'
import '../../lib/css/img.css'
export default {
    data(){
        return{
            type:this.$route.params.type,
            rule:[]
        }
    },
    created(){
        this.getrule();
    },
    methods:{
        reutrns:function(){
            javascript:history.back(-1);
        },
        getrule(){
            var url="freeter-api/rule/info?type="+this.type;
            this.$http.post(url).then(res=>{ 
                if(res.body.code==0){
                    this.rule=res.body.rule;
                }else if(res.body.code==500){Toast(res.body.msg);}
            })
        }
    }
}
</script>
<style scoped>
.top{
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    padding-left: .24rem;
    padding-right: .24rem;
    background: #ffffff;
    width: 100%;
    position: fixed;
    top: 0;
}
.top div{
    float: left;
}
.top .til-left{
    width:5%;
}
.top .til-left img{
    width: .18rem;
    height: .33rem;
     position: fixed;
     top:.3rem;
   left: .24rem;
}
.top .til-con{
    width: 95%;
    text-align: center;
    font-size: .42rem;
    color: #313131;
    font-weight: bold;
}
p{
    padding-left: .24rem;
    padding-right: .24rem;
}
.til{
    font-size: .32rem;
    color: #313131;
}
.cont{
    text-indent: 2em;
}
.con{
    padding-left: .24rem;
    padding-right: .24rem;
}
.con img{
    width: 100%;
}
</style>