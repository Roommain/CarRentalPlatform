import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie';

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: '主页',
      component: resolve => require(['@/views/main/main'], resolve),
      redirect: '/home',
      children:[
        {
            path: '/home',
            name: '首页',
            component: resolve => require(['@/views/home/home'], resolve),
        },
        {
          path: '/collect',
          name: '收藏',
          meta: {
            permissions: true,
          },
          component: resolve => require(['@/views/main/collect'], resolve),
        },
        {
            path: '/owner',
            name: '成为车主',
            component: resolve => require(['@/views/main/owner'], resolve),
        },
        {
            path: '/carRental',
            name: '我要租车',
            component: resolve => require(['@/views/main/carRental'], resolve),
        },
        {
          path: '/carRentalParticulars',
          name: '租车详情',
          component: resolve => require(['@/views/main/carRentalParticulars'], resolve),
        },
        {
            path: '/login',
            name: '登录',
            component: resolve => require(['@/views/login/login'], resolve),
        },
        {
            path: '/register',
            name: '注册',
            component: resolve => require(['@/views/register/register'], resolve),
        },
        {
            path: '/findPassword',
            name: '找回密码',
            component: resolve => require(['@/views/findPassword/findPassword'], resolve),
        },
        {
          path: '/message_main',
          name: '个人中心',
          redirect: '/userinfo',
          meta: {
            permissions: true,
          },
          component: resolve => require(['@/views/user_message/message_main'], resolve),
          children:[
            {
              path: '/changePassword',
              name: '修改密码',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/userChangePassword'], resolve),
            },
            {
              path: '/userinfo',
              name: '我的信息',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/userinfo'], resolve),
            },
            {
              path: '/orderInformation',
              name: '租客订单',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/orderInformation'], resolve),
            },
            {
              path: '/ownerOrderInformation',
              name: '车主订单',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/ownerOrderInformation'], resolve),
            },
            {
              path: '/certificate',
              name: '证件实名',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/certificate'], resolve),
            },
          ]
        },
        {
          path: '/backstage',
          name: '后台管理',
          component: resolve => require(['@/views/backstage/backmain'], resolve),
          children:[
            //审核
            {
              path: '/drivinglicence',
              name: '驾驶证审核',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/audit/audit'], resolve),
            },
            {
              path: '/auditcar',
              name: '行驶证审核',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/audit/auditcar'], resolve),
            },
            {
              path: '/ownercaraudit',
              name: '车主车辆审核',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/ownercaraudit/ownercaraudit'], resolve),
            },
            //车型管理
            {
              path: '/addassessment',
              name: '录入车型',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/car_assessment/add_assessment'], resolve),
            },
            {
              path: '/deleteassessment',
              name: '删除车型',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/car_assessment/delete_assessment'], resolve),
            },
            {
              path: '/updateassessment',
              name: '修改车型',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/car_assessment/update_assessment'], resolve),
            },
            //租车管理
            {
              path: '/addcarrental',
              name: '增加租车',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/carrental/add_carrental'], resolve),
            },
            {
              path: '/updatecarrental',
              name: '修改租车',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/carrental/update_carrental'], resolve),
            },
            {
              path: '/deletecarrental',
              name: '删除租车',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/backstage/carrental/delete_carrental'], resolve),
            },
          ]
        },
        {
          path: '/ownermanagement',
          name: '车主管理',
          component: resolve => require(['@/views/ownerManagement/owner_main'], resolve),
          children:[
            {
              path: '/addownermanag',
              name: '增加车辆',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/ownerManagement/add_ownermanag'], resolve),
            },
            {
              path: '/statemanagement',
              name: '车辆状态',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/ownerManagement/state_management'], resolve),
            },
          ]
        },
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.permissions){
    var token = cookie.get('userName');
    if(token){
      next();
    }else{
      next({
        name: "登录", path:'/login',
      });
      // Vue.prototype.$Message.warning('请先登录');
    }
  }else{
    next();
  }
});
export default router;
