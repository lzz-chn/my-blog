import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './plugins/axios'
import './plugins/element.js';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    // console.log('to :', to); // to 代表即将进入的路由
    // console.log('from :', from); // from 表示正要离开的路由
    // && !to.path.match(/^\/admin\/\w+/)
    if (to.name != 'loading' && from.name != 'loading' && !to.path.match(/^\/admin\/\w+/)) {
        sessionStorage.setItem('path', to.fullPath); //  暂存路径
        // sessionStorage.setItem('path', to.name); //  暂存路径
        // sessionStorage.setItem('params', { p: to.params }); //  暂存参数
        next('/loading');
    } else {
        next();
    }
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
