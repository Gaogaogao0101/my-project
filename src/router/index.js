import Vue from 'vue'
import Router from 'vue-router' 
// 登录
import Land from '@/components/tabbar/Land.vue'
// 忘记密码
import Forget from '@/components/integral/forget.vue'
// 重置密码
import Reset from '@/components/integral/reset.vue'
// 注册
import Logins from '@/components/tabbar/Logins.vue'
import LoginsA from '@/components/tabbar/loginsa.vue'
import LoginsB from '@/components/tabbar/loginsb.vue'
// 身份证正面
import CardBack from '@/components/subcomponents/cardBack.vue'
// 身份证反面
import Idcard from '@/components/subcomponents/cardImg.vue'
// 首页
import HomeContainer from '@/components/tabbar/HomeContainer.vue'
import HomeChild from '@/components/tabbar/zChildren.vue'
// logo图片跳转的页面
import LogoDetail from '@/components/home/logodetail.vue'  
// 发现组件
import Dsic from '@/components/tabbar/Discover.vue'
// 会员中心
import Member from '@/components/tabbar/member.vue'
// 个人信息
import Personal from '@/components/member/personal.vue'
// 我的优惠券
import Preferential from '@/components/member/preferential.vue'
// 选择优惠券
import Coupon from '@/components/cart/coupon.vue'
// 更换头像
import Portrait from '@/components/cobber/portrait.vue'
// 生活馆页面
import Life from '@/components/member/life.vue'
import LifeMap from '@/components/member/map.vue'
// 设置
import SetUp from '@/components/member/setup.vue'
// 购物车
import Cart from '@/components/tabbar/Cart.vue'
import Search from '@/components/tabbar/Search.vue'
// 首页分类模块商品组件
import zzz from '@/components/tabbar/zzz.vue' 
// 学术发现子页面
import HindDel from '@/components/find/finddetail.vue'
// 发现
import FindList from '@/components/find/findlist.vue'
import FindInfo from '@/components/find/findinfo.vue' 
// 我的收藏
import Ber from '@/components/member/ber.vue'
// 我的合伙人
import Bor from '@/components/cobber/coberlist.vue'
// 消息
import Newslist from '@/components/cobber/newslist.vue'
// 邀请码
import Codelist from '@/components/cobber/code.vue'
// 我的积分---转积分
import Divide from '@/components/member/divide.vue' 
// 我的积分---搜索
import Searchs from '@/components/home/searchs.vue'
// 收货地址
import Take from '@/components/member/take.vue'
import NewTake from '@/components/member/newtake.vue'
import Takes from '@/components/member/takes.vue'
import Takenot from '@/components/member/takenot.vue'
import NewOrder from '@/components/member/new.vue'
import NewOrders from '@/components/member/news.vue'
import Newnot from '@/components/member/newnot.vue'
// 订单部分
import Whole from '@/components/member/whole.vue'
import Stay from '@/components/member/stay.vue'
import Staya from '@/components/member/staya.vue'
import Already from '@/components/member/already.vue'
import Sale from '@/components/member/sale.vue'
// 物流
import Wuliu from '@/components/integral/wuliu.vue'
 //合伙人详情 
import BorInfo from '@/components/cobber/coberinfo.vue'
 // 商品详情页
import CartDel from '@/components/cart/CartDel.vue' 
// 我的积分
import IntList from '@/components/integral/integrallist.vue'
import Integral from '@/components/integral/integral.vue'
import Integrals from '@/components/integral/integrals.vue'
// 月份详情
import Shift from '@/components/integral/shift.vue'
// 确认订单
import OrderDel from '@/components/cart/order.vue' 
import Orders from '@/components/cart/orders.vue' 
// 选择支付
import Choice from '@/components/cart/choice.vue'
// 等待付款
import Not from '@/components/cart/not.vue'
// 支付成功
import Payment from '@/components/cart/payment.vue'
import Payments from '@/components/cart/payments.vue' 
//发现页面的子组件
import First from '@/components/find/first.vue'  
// 引导页面
import Yindao from '@/components/tabbar/yindao.vue'
// 导航id
import Homesa from '@/components/home/Homesa.vue' 
// 联系收藏
import Findinfo from '@/components/find/findinfo.vue'
//购物车
import Cartdemo from '@/components/subcomponents/commentgoods.vue' 
// 练习
import Cartdemos from '@/components/subcomponents/commentgoods1.vue' 
// 协议
import Agreement from '@/components/subcomponents/agreement.vue'
// 申报规则
import Rule from '@/components/integral/rule.vue'
// 扫码跳转页面
import Scan from '@/components/tabbar/Scan.vue'
Vue.use(Router)

export default new Router({
  
  routes: [
    // 扫码跳转页面
    {
      path:'/scan',
      name:'scan',
      component:Scan,
    },
    {
      path:'/',      //如果有用户访问/的时候，用户自动转换为/home
      component:()=>import('@/components/tabbar/HomeContainer.vue')
    },
    // 引导页
    {
      path:'/yindao',
      component:Yindao
    },
    // 登录
    {
      path:'/land',
      name:'land',
      component:Land,
      meta: {
        isLogin: false
      }
    },
    // 忘记密码
    {
      path:'/forget',
      component:Forget,
    },
    // 用户协议
    {
      path:'/agreement',
      component:Agreement
    },
    // 重置密码
    {
      path:'/reset',
      component:Reset
    },
    // 首页
    {
      path: '/home', 
      name:'home',
      component: HomeContainer
    },
    // 首页展示商品子组件
    {
      path:'/homeChild',
      component:HomeChild
    },
    // logo图片跳转
    {
      path:'/logodetail',
      component:LogoDetail
    },
    // 消息
    {
      path:'/newslist',
      component:Newslist
    },
    //邀请码 
    {
      path:'/codelist',
      component:Codelist
    },
    // 注册
    {
      path: '/login', 
      component:Logins, 
      meta: {
        isLogin: false
      }
    },
    // 身份证正面
    {
      path:'/cardBack',
      component:CardBack,
    }, 
    // 身份证反面
    {
      path:'/idcard',
      component:Idcard
    },
    // 完善信息
    {
      path:'/logina',
      name:'logina',
      component:LoginsA
    }, 
    {
      path:'/loginb',
      name:'loginb',
      component:LoginsB
    }, 
    // 会员中心
    {
      path: '/member', 
      component:Member,
      name: 'member',
      meta:{auth:true} 
    },
    // 个人信息
    {
      path:'/personal',
      name:'personal',
      component:Personal
    },
    // 优惠券
    {
      path:'/preferential',
      name:'preferential',
      component:Preferential
    },
    // 选择优惠劵
    {
      path:'/coupon',
      name:'coupon',
      component:Coupon
    },
    // 更换头像
    {
      path:'/portrait',
      component:Portrait,
    },
    // 生活馆
    {
      path:'/life',
      component:Life
    },
    // 地图
    {
      path:'/map',
      name:'map',
      component:LifeMap
    },
    // 设置
    {
      path:'/setup',
      component:SetUp
    },
      // 购物车
    {
      path:'/cart',
      component:Cart
    },

    {
      path:'/search',
      component:Search, 
    },
    {
      path:'/zzz',
      component:zzz
    },
    // 学术发现子页面
    {
      path:'/hindlist', 
      component:HindDel,
      name:"hindlist",
    },
    // 发现
    {
      path:'/findlist',
      component:FindList
    },
    {
      path:'/findinfo',
      component:FindInfo
    },
    // 我的收藏
    {
      path:'/ber',
      component:Ber

    },
    // 我的积分---转积分
    {
      path:'/divide',
      name:'divide',
      component:Divide
    }, 
    // 我的积分---搜索人员
    {
      path:'/searchs',
      component:Searchs
    },
    // 我的合伙人
    {
      path:'/borlist',
      component:Bor
    },
    //合伙人详情 
    {
      path:'/borinfo',
      name:'borinfo',
      component:BorInfo
    },
    // 地址
    {
      path:'/take',
      component:Take
    },
    {
      path:'/newtake',
      component:NewTake
    },
    {
      path:'/takes',
      component:Takes
    },
    {
      path:'/takenot',
      component:Takenot
    },
    // 新建收货地址 
    {
      path:'/new/:id',
      name:'new',
      component:NewOrder
    },
    {
      path:'/news/:id',
      name:'news',
      component:NewOrders
    },
    {
      path:'/newnot/:id',
      name:'newnot',
      component:Newnot
    },
    // 商品详情页
    {
      path:'/cart/cartdal',
      component:CartDel,
      name:"cartdetail"
    }, 
    // 我的积分
    {
      path:'/intlist',
      name:'intlist',
      component:IntList
    },
    {
      path:'/integral',
      name:'integral',
      component:Integral
    },
    {
      path:'/integrals',
      name:'integrals',
      component:Integrals
    },
    // 明细
    {
      path:'/intlist/shift',
      component:Shift      
    },
    // 确认订单 
    {
      path:'/order',
      name:'order',
      component:OrderDel
    },
    {
      path:'/orders',
      name:'sorders',
      component:Orders
    }, 
    // 选择支付
    {
      path:'/choice',
      name:'choice',
      component:Choice
    },
    // 等待付款
    {
      path:'/not',
      name:'not',
      component:Not
    },
    // 支付成功
    {
      path:'/payment',
      component:Payment 
    },
     // 支付失败
     {
      path:'/payments',
      component:Payments 
    },
    // 订单部分
    {
      path:'/whole',
      component:Whole
    }, 
    {
      path:'/stay',
      component:Stay
    },
    {
      path:'/staya',
      component:Staya
    },
    {
      path:'/already',
      component:Already
    },
    {
      path:'/sale',
      component:Sale
    },
    // 查看物流
    {
      path:'wuliu',
      name:'wuliu',
      component:Wuliu
    },
    // 发现组件
    {
      path:'/desc',
      component:Dsic,
      // meta:{ keepAlive:true,}
    }, 
// 发现页面子组件
    {
      path:'/first',
      component:First
    },  
    // 导航id传至的
    {
      path:'/homesa',
      // name:'homesa',
      component:Homesa
    }, 
    // 联系收藏
    {
      path:'/findinfo',
      component:Findinfo
    },
    //购物车
    {
      path:'/cartdemo',
      
      component:Cartdemo
    }, 
    // 练习
    {
      path:'/lianxi',
      name:'homesa',
      component:Cartdemos
    }, 
    // 申报规则
    {
      path:'/rule',
      name:'rule',
      component:Rule
    }
  ]
}) 