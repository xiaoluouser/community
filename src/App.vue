<template>
  <div>
    <Header v-if="$route.meta.show"></Header>
    <transition :name="anname">
      <router-view></router-view>
    </transition>
    <Footer v-show="$route.meta.show"></Footer>
    <el-tooltip content="back top" placement="top" effect="light">
      <a @click="backTop" class="backTop" v-show="$route.meta.show"
        ><i class="el-icon-caret-top"></i
      ></a>
    </el-tooltip>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      anname: "",
    };
  },
  watch: {
    $route: {
      handler(val, oldval) {
        if (val.meta.index > oldval.meta.index) {
          this.anname = "left";
        } else if (val.meta.index < oldval.meta.index) {
          this.anname = "right";
        } else {
          this.anname = "";
        }
      },
    },
  },
  methods:{
    backTop(){
      scrollTo(0,0);
    }
  }
};
</script>

<style lang="less">
.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: all 0.75s ease-in-out;
  position: absolute;
}
.left-enter {
  transform: translateX(100%);
}
.left-enter-to {
  transform: translateX(0);
}
.left-leave {
  transform: translateX(0);
}
.left-leave-to {
  transform: translateX(-100%);
}

.right-enter {
  transform: translateX(-100%);
}
.right-enter-to {
  transform: translateX(0);
}
.right-leave {
  transform: translateX(0);
}
.right-leave-to {
  transform: translateX(100%);
}
body {
  overflow-x: hidden;
}
#nprogress .bar {
  background: rgb(0, 217, 255) !important;
}
* {
  scroll-behavior: smooth;
}
.backTop {
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  position: fixed;
  z-index: 3;
  right: 50px;
  bottom: 30px;
  box-shadow: 0 0 10px rgb(225, 225, 225);
  color: rgb(0, 217, 255);
  i {
    font-size: 30px;
  }
}
</style>