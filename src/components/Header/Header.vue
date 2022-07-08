<template>
  <!-- 首页的顶部菜单栏 -->
  <div class="top-menu">
    <div class="top-menu-bar">
      <div class="top-menu-bar-center">
        <!-- 首页菜单栏logo -->
        <div class="logo">
          <router-link :to="pathName[0]"></router-link>
        </div>
        <!-- 顶部菜单栏的中间的选项 -->
        <ul class="top-menu-bar-list">
          <li v-for="(item, index) in TopName" :key="index">
            <a @click="Jump(index)" :class="colorStyle[index]">{{ item }}</a>
          </li>
        </ul>
        <!-- 顶部菜单右侧的用户相关 -->
        <div class="top-menu-bar-user">
          <form>
            <input type="text" placeholder="搜索" v-model="searchValue" />
            <button @click="jumpSearch"><i class="fa fa-search"></i></button>
          </form>
          <ul class="user">
            <li>
              <a @click="user_login">
                <el-tooltip
                  :content="
                    userinfo.username ? `用户${userinfo.username}` : '请登录'
                  "
                  placement="bottom"
                  effect="light"
                >
                  <img :src="userinfo.user_avatar || circleUrl" />
                </el-tooltip>
              </a>
            </li>
            <li>
              <span>{{ userinfo.username }}</span>
            </li>
          </ul>
          <ul class="user-list" v-if="this.userinfo.username">
            <li>
              <router-link :to="`/userCenter?phone=${userinfo.phone}`">
                <i class="el-icon-user"></i>
                个人中心</router-link
              >
            </li>
            <li>
              <router-link :to="`/userCenter/userNews?phone=${userinfo.phone}`">
                <i class="el-icon-chat-round"></i>
                我的消息
              </router-link>
            </li>
            <li>
              <router-link
                :to="`/userCenter/userCollect?phone=${userinfo.phone}`"
              >
                <i class="el-icon-star-off"></i>
                我的收藏
              </router-link>
            </li>
            <li>
              <router-link
                :to="`/userCenter/userFocus?phone=${userinfo.phone}`"
              >
                <i class="el-icon-view"></i>
                我的关注
              </router-link>
            </li>
            <li>
              <a @click="signOut"><i class="el-icon-switch-button"></i>退出登录</a>
            </li>
          </ul>
          <div class="triangle" v-if="this.userinfo.username"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/index.js";
import { MessageBox } from "element-ui";
export default {
  name: "Header",
  data() {
    return {
      //elementui头像图片的地址
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      TopName: ["首页", "论坛", "发现", "活动"],
      pathName: ["/home", "/forum", "/find", "/event"],
      colorStyle: JSON.parse(sessionStorage.getItem("colorVal")),
      searchValue: "",
      userinfo: {},
    };
  },
  methods: {
    Jump(index) {
      switch (index) {
        case 0:
          {
            this.$router.push({
              path: "/home",
            });
          }
          break;
        case 1:
          {
            this.$router.push({
              path: "/forum",
            });
          }
          break;
        case 2:
          {
            this.$router.push({
              path: "/find",
            });
          }
          break;
        case 3:
          {
            this.$router.push({
              path: "/event",
            });
          }
          break;
      }
    },
    async jumpSearch() {
      if (this.searchValue.trim() === "") {
        this.$message({
          message: "请输入搜索的内容！",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      this.$router.push({
        path: "/search",
        query: {
          searchValue: this.searchValue,
        },
      });
      setTimeout(() => {
        this.searchValue = "";
      }, 2000);
    },
    user_login() {
      if (!this.userinfo.username) {
        this.$router.push({
          path: "/login",
        });
      } else {
        this.$router.replace({
          path: "/userCenter",
          query: {
            phone: this.userinfo.phone,
          },
        });
      }
    },
    async signOut() {
      await MessageBox.confirm("确定是否退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
      });
      localStorage.removeItem("token");
      this.$store.state.copyuserinfo = {};
      this.$router.replace({
        path: "/home",
      });
    },
  },
  computed: {
    getUser() {
      return this.$store.state.copyuserinfo;
    },
  },
  watch: {
    //监视字体颜色
    colorStyle: {
      deep: true,
      handler(val) {
        sessionStorage.setItem("colorVal", JSON.stringify(val));
      },
    },
    //监视路由的变化
    $route: {
      deep: true,
      handler(val) {
        this.pathName.forEach((item, index) => {
          this.colorStyle[index].checkColor = false;
          if (val.path === item) {
            this.colorStyle[index].checkColor = true;
          }
        });
      },
    },
    //监视用户信息的修改
    getUser: {
      deep: true,
      handler(val) {
        this.userinfo = { ...val };
      },
    },
  },
  beforeCreate() {
    if (JSON.parse(sessionStorage.getItem("colorVal")) === null) {
      sessionStorage.setItem(
        "colorVal",
        JSON.stringify([
          { checkColor: true },
          { checkColor: "" },
          { checkColor: "" },
          { checkColor: "" },
        ])
      );
    }
  },
  async mounted() {
    let isToken = (await getUserInfo()).data;
    if (isToken.status === 1) {
      this.$message({
        message: isToken.message,
        type: "warning",
        duration: 2000,
      });
      return;
    }
    if (isToken.status === 0) {
      this.userinfo = { ...isToken.data };
    }
  },
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;

.showUserList() {
  height: 230px;
}

//首页的顶部菜单栏
.top-menu {
  width: 100%;
  height: (@base*78);
  position: relative;
  z-index: 2;
  user-select: none;
  .top-menu-bar {
    background-color: rgba(255, 247, 247, 0.6);
    backdrop-filter: blur(10px);
    height: (@base*78);
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    position: fixed;
    box-shadow: 0 2px 4px rgb(235, 235, 235);

    .top-menu-bar-center {
      width: 1250px;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .logo {
        a {
          display: block;
          width: 120px;
          height: (@base*78);
          background: url("./images/logo.png") no-repeat center;
        }
      }

      .top-menu-bar-list {
        width: (@base*600);
        color: #666;
        display: flex;
        justify-content: space-between;

        li {
          &:first-of-type a {
            font-weight: 800;
          }

          a {
            line-height: (@base*78);
            display: block;
            height: 100%;
            text-align: center;
            letter-spacing: 1px;
            overflow: hidden;
            cursor: pointer;

            &::after {
              content: "";
              display: inline-block;
              width: 0;
              height: 2px;
              background-color: #000;
              position: relative;
              top: -38px;
              border-radius: 40%;
              transition: width 0.3s ease-in-out;
            }

            &:hover {
              &::after {
                width: 100%;
              }
            }
          }
        }
      }

      .top-menu-bar-user {
        display: flex;
        align-items: center;
        width: 350px;
        position: relative;
        form {
          border-radius: 40px;
          position: relative;
          overflow: hidden;
          width: 120px;
          text-align: right;
          margin-right: 15px;

          input {
            width: 80px;
            height: 25px;
            border-radius: 40px;
            outline: none;
            background-color: rgba(94, 93, 93, 0.2);
            padding: 0 10px;
            padding-right: 30px;
            transition: width 0.3s ease-in-out;

            &:focus {
              width: 100px;
            }
          }

          button {
            background-color: rgba(94, 93, 93, 0);
            border: none;
            position: absolute;
            right: 0;
            top: 0;
            height: 25px;
            padding-right: 9px;
            line-height: 25px;
          }
        }

        .triangle {
          width: 18px;
          height: 18px;
          border-radius: 2px;
          border: 8px rgba(255, 255, 255, 0) solid;
          border-bottom: 8px #fff solid;
          position: absolute;
          z-index: 1;
          bottom: 6px;
          right: 80px;
          display: none;
          pointer-events: none;
        }
        .user-list {
          width: 130px;
          height: 0px;
          background-color: #fff;
          box-shadow: 0px 0px 20px rgb(205, 205, 205);
          border-radius: 5px;
          position: absolute;
          top: (@base*70);
          right: 20px;
          overflow: hidden;
          transition: all 0.3s ease-in-out;
          &:hover {
            .showUserList();
          }
          &:hover + .triangle {
            display: block;
          }
          li {
            padding-left: 10px;
            padding-right: 10px;
            &:first-child {
              margin-top: 10px;
            }
            a {
              display: block;
              padding-top: 12px;
              padding-bottom: 12px;
              text-align: center;
              border-bottom: 1px rgb(249, 249, 249) solid;
              i {
                margin-right: 5px;
              }
            }
            &:hover {
              background-color: rgb(241, 241, 241);
              a {
                color: rgb(0, 217, 255);
              }
            }
            &:last-child {
              a {
                color: red;
              }
            }
          }
        }

        .user {
          width: 160px;
          margin-left: 45px;
          display: flex;
          padding: 6px 0;
          //justify-content: space-around;
          cursor: pointer;
          a {
            transition: all 0.1s ease-in-out;
            display: block;
            height: 40px;
            border-radius: 50%;
            img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            &:hover {
              transform: scale(1.05);
            }
          }
          li {
            line-height: 40px;
            margin-right: 15px;
            span {
              display: block;
              width: 100px;
              color: rgb(140, 140, 140);
              overflow: hidden;
              text-overflow: ellipsis; //让超出文字显示....
              white-space: nowrap;
            }
          }
          &:hover + .user-list {
            .showUserList();
          }
          &:hover + .user-list + .triangle {
            display: block;
          }
        }
      }
    }
  }
}
//由于选择器的权重，原来的样式会将动态添加的样式覆盖掉，因此挪到下面来
a {
  color: #666;
}
.checkColor {
  color: rgb(0, 217, 255);
}
.eventNo {
  pointer-events: none;
  background-color: red;
}
</style>