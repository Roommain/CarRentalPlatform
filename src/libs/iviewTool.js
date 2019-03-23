import Vue from 'vue';
import iview from 'iView';
Vue.use(iview);
// 全局提示配置
new Vue().$Message.config({
    top:260,
    duration:1.5,
    closable:true
});

   