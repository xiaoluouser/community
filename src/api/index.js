import {
    baseurl1,
    baseurl2
} from "@/api/baseUrlConfig.js";
import QS from 'qs';

//当前这个模块对api进行统一管理
import requests from "./request.js";

//showInformation组件的api
export const createtContent = () => {
    return requests.get(`${baseurl1}/showInfo`);
}
export const createImage = () => {
    return requests.get(`${baseurl1}/showInfoImage`);
}
export const carousel = () => {
    return requests.get(`${baseurl1}/carousel`);
}
export const userAvatar = () => {
    return requests.get(`${baseurl1}/userAvatar`);
}

//注册
export const register = (userInfo) => {
    return requests.post(`${baseurl2}/api/register`,QS.stringify(userInfo))
}
export const getCode = (phone) => {
    return requests.get(`${baseurl2}/api/getcode?phone=${phone}`);
}
//登录
export const login = (userInfo) => {
    return requests.post(`${baseurl2}/api/login`,QS.stringify(userInfo))
}
//获取用户的基本信息
export const getUserInfo = () => {
    return requests.get(`${baseurl2}/my/userinfo`)
}
//修改用户的基本信息
export const updateUserInfo = (userInfo) => {
    return requests.post(`${baseurl2}/my/userinfo`,QS.stringify(userInfo))
}
//用户发布的内容
export const postArticle = (articleInfo) => {
    return requests.post(`${baseurl2}/article/postarticle`,QS.stringify(articleInfo))
}
//获取用户发布的内容(所有列表)
export const getArticle = (num) => {
    return requests.get(`${baseurl2}/article/getarticle?num=${num}`)
}
//获取用户发布内容的详情(一个)
export const getDetailArticle = (id,user_id) => {
    return requests.get(`${baseurl2}/article/getdetailarticle?id=${id}&user_id=${user_id}`)
}
//更新文章的点赞数和点击量
export const updateLikes = (updateNum) => {
    return requests.post(`${baseurl2}/article/updatelikes`,QS.stringify(updateNum));
}
//发布评论
export const postComment = (comment) => {
    return requests.post(`${baseurl2}/article/postcomment`,QS.stringify(comment));
}
//获取评论
export const getComment = (article_id) => {
    return requests.get(`${baseurl2}/article/getcomment?article_id=${article_id}`);
}