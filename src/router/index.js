import VueRouter from "vue-router";
import Vue from "vue";
const vm = new Vue();

import Home from "@/pages/Home/Home.vue"
import Forum from "@/pages/Forum/Forum.vue";
import Login from "@/pages/Login/Login.vue";
import ContentDetail from "@/pages/ContentDetail/ContentDetail.vue";
import Find from "@/pages/Find/Find.vue";
import Event from "@/pages/Event/Event.vue";
import Register from "@/pages/Register/Register.vue";
import NewArticle from "@/pages/NewArticle/NewArticle.vue";
import Search from "@/pages/Search/Search.vue";
import UserCenter from "@/pages/UserCenter/UserCenter.vue";
import userCollect from "@/pages/UserCenter/UserCollect/UserCollect.vue";
import UserNews from "@/pages/UserCenter/UserNews/UserNews.vue";
import UserFocus from "@/pages/UserCenter/UserFocus/UserFocus.vue";
import ChangeInfo from "@/pages/UserCenter/ChangeInfo/ChangeInfo.vue";

const router = new VueRouter({
    routes: [{
            path: '/home',
            component: Home,
            meta: {
                show: true
            }
        },
        {
            path: '/forum',
            component: Forum,
            meta: {
                show: true,
                title: '论坛'
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                show: false,
                title: '登录',
                index: 1
            }
        },
        {
            path: '/contentDetail',
            component: ContentDetail,
            meta: {
                show: true,
                title: '发布内容详情'
            }
        },
        {
            path: '/find',
            component: Find,
            meta: {
                show: true,
                title: '发现'
            }
        },
        {
            path: '/event',
            component: Event,
            meta: {
                show: true,
                title: '活动'
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                show: false,
                title: '注册',
                index: 2
            }
        },
        {
            path: '/newArticle',
            component: NewArticle,
            meta: {
                show: true,
                title: '发布帖子'
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                show: true,
                title: '搜索'
            }
        },
        {
            path: '/userCenter',
            component: UserCenter,
            meta: {
                show: true,
                title: '用户中心'
            },
            children: [{
                    path: 'userCollect',
                    component: userCollect,
                    meta: {
                        show: true,
                        title: '我的收藏',
                    }
                },
                {
                    path: 'userNews',
                    component: UserNews,
                    meta: {
                        show: true,
                        title: '我的消息',
                    }
                },
                {
                    path: 'userFocus',
                    component: UserFocus,
                    meta: {
                        show: true,
                        title: '我的关注',
                    }
                },
                {
                    path: 'changeInfo',
                    component: ChangeInfo,
                    meta: {
                        show: true,
                        title: '修改资料',
                    }
                }
            ]
        },
        //重定向，在项目跑起来的时候，定向到home
        {
            path: '*',
            redirect: '/home'
        }
    ],
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 选择性的滚动
        if (to.path.includes('/userCenter') && from.path.includes('/userCenter')) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0,
                behavior: 'smooth',
            }
        }

    },
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') {
        if (localStorage.getItem("token")) {
            vm.$message({
                message: "不能跳转,",
                type: "warning",
                duration: 2000,
            })
            next(from.path);
            return;
        }
    }
    if (to.path === '/newArticle') {
        if (!localStorage.getItem("token")) {
            vm.$message({
                message: "不能跳转,请先登录。",
                type: "warning",
                duration: 2000,
            })
            next(from.path);
            return;
        }
    }
    next();
})
router.afterEach((to) => {
    document.title = to.meta.title || 'V社区 首页';
})

export default router;

//解决重复点击路由控制台报错的问题
//push
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err);
}

//replace
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch(err => err);
}