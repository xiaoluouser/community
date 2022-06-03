import Vue from 'vue';
import App from './App.vue';

import VueRouter from "vue-router";
Vue.use(VueRouter);

//引入fontawesome
import 'font-awesome/css/font-awesome.css';

//按需引入elementui
import {
  Carousel,
  CarouselItem,
  Input,
  Avatar,
  Checkbox,
  CheckboxGroup,
  Message,
  Tooltip,
  Radio,
  Empty,
  Button,
} from 'element-ui';
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Input.name, Input);
Vue.component(Avatar.name, Avatar);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Message.name, Message);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Radio.name, Radio);
Vue.component(Empty.name, Empty);
Vue.component(Button.name, Button);

//将Message弹出框方法放到Vue的原型上,以后可以直接在this上使用
Vue.prototype.$message = Message;

//引入路由
import router from "./router/index.js";
//引入vuex
import store from "@/store/index.js";
//运行mock里的文件
import '@/mock/showInfo.js';
import '@/mock/showInfoImage.js';
import '@/mock/carousel.js';
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  //创建全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
})