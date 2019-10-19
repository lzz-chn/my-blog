import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './plugins/axios'
import './plugins/element.js';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.name != 'loading' && from.name != 'loading' && !to.path.match(/^\/admin\/\w+/)) {
        sessionStorage.setItem('path', to.fullPath); //  暂存路径
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
