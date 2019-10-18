import Vue from 'vue';
import Router from 'vue-router';
import Header from '@/components/blog/Header';
import Footer from '@/components/blog/Footer';
import Home from '@/components/blog/Home';
import Article from '@/components/blog/Article';
import Classify from '@/components/blog/Classify';
import About from '@/components/blog/About';
import Loading from '@/components/common/Loading';
import Login from '@/components/backstage/Login';
import Admin from '@/components/backstage/Admin';
import AdminHome from '@/components/backstage/AdminHome';
import AdminArticleList from '@/components/backstage/AdminArticleList';
import AdminArticleItem from '@/components/backstage/AdminArticleItem';
import AdminUserInfo from '@/components/backstage/AdminUserInfo';
import AdminWebsite from '@/components/backstage/AdminWebsite';
import AdminAbout from '@/components/backstage/AdminAbout';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            components: { default: Header, Home, Footer }
        },
        {
            path: '/article',
            name: 'Article',
            components: { default: Header, Article, Footer }
        },
        {
            path: '/classify',
            name: 'Classify',
            components: { default: Header, Classify, Footer },
            children: [
                {
                    path: 'phone',
                    name: 'ClassifyBase',
                    component: { template: `<div>手机平板</div>` }
                },
                {
                    path: 'pc',
                    name: 'ClassifyBase',
                    component: { template: `<div>硬件装机</div>` }
                },
                {
                    path: 'wear',
                    name: 'ClassifyBase',
                    component: { template: `<div>智能穿戴</div>` }
                },
                {
                    path: 'name',
                    name: 'ClassifyBase',
                    component: { template: `<div></div>` }
                }
            ]
        },
        {
            path: '/about',
            name: 'About',
            components: { default: Header, About, Footer }
        },
        {
            path: '/loading',
            name: 'loading',
            component: Loading
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            children: [
                {
                    path: 'home',
                    name: 'adminHome',
                    component: AdminHome
                },
                {
                    path: 'articleList',
                    name: 'adminArticleList',
                    component: AdminArticleList
                },
                {
                    path: 'articleItem',
                    name: 'adminArticleItem',
                    component: AdminArticleItem
                },
                {
                    path: 'userInfo',
                    name: 'userInfo',
                    component: AdminUserInfo
                },
                {
                    path: 'adminWebsite',
                    name: 'adminWebsite',
                    component: AdminWebsite
                },
                {
                    path: 'adminAbout',
                    name: 'adminAbout',
                    component: AdminAbout
                }
            ]
        },
        {
            path: '/admin/login',
            name: 'login',
            component: Login
        }
    ]
});
