import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie';

Vue.use(Router)

const router = new Router({
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
            path: '/owner',
            name: '我是车主',
            component: resolve => require(['@/views/main/owner'], resolve),
        },
        {
            path: '/carRental',
            name: '我要租车',
            component: resolve => require(['@/views/main/carRental'], resolve),
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
              path: '/certificate',
              name: '证件实名',
              meta: {
                permissions: true,
              },
              component: resolve => require(['@/views/user_message/certificate'], resolve),
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
