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
            path: '/login',
            name: '登录',
            component: resolve => require(['@/views/login/login'], resolve),
        },
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.permissions){
    var token = cookie.get('token');
    if(token){
      next();
    }else{
      next({
        path:'/',
      });
      Vue.prototype.$Message.warning('请先登录');
    }
  }else{
    next();
  }
});
export default router;
