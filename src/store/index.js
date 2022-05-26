import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

//定义一个存储函数
/* function Storage() {
    return localStorage.setItem("announcementData", JSON.stringify(state.obj));
} */

const actions = {
    //首次添加公告时存入
    /* jump(context, announcementData) {
        context.commit('JUMP', announcementData);
    },
    //修改公告里面的评论数据时存入
    reviseComment(context, commentObj) {
        context.commit('REVISECOMMENT', commentObj);
    },
    //修改公告的观看量时存入
    reviseViews(context, views) {
        context.commit('REVISEVIEWS', views);
    },
    //修改公告点赞数时存入
    reviseLikes(context, likes) {
        context.commit('REVISELIKES', likes);
    }, */
    //token
    savetoken(context,token){
        context.commit('SAVETOKEN', token);
    },
    //存入修改后的用户信息
    senduser(context,copyuserinfo){
        context.commit('SENDUSER',copyuserinfo);
    }
}

const mutations = {
   /*  JUMP(state, announcementData) {
        state.obj.unshift(announcementData);
        Storage();
    },
    REVISECOMMENT(state, commentObj) {
        state.obj.commentObj = commentObj;
        Storage();
    },
    REVISEVIEWS(state, views) {
        state.obj.views = views;
        Storage();
    },
    REVISELIKES(state, likes) {
        state.obj.likes = likes;
        Storage();
    }, */
    SAVETOKEN(state,token){
        state.token=token;
        localStorage.setItem("token", JSON.stringify(state.token));
    },
    SENDUSER(state,copyuserinfo){
        state.copyuserinfo=copyuserinfo;
    }
}

const state = {
    //obj: JSON.parse(localStorage.getItem("announcementData")) || [],
    token:JSON.parse(localStorage.getItem("token")) || '',
    copyuserinfo:{},
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})