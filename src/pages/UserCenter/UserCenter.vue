<template>
  <!-- 中间的内容区 -->
  <div class="middle-content">
    <div class="userInfoData">
      <div class="userAvatar">
        <a href="javascript:;">
          <img :src="userinfo.user_avatar" alt="用户头像" />
        </a>
      </div>
      <div class="userDetailsData">
        <div class="name">
          {{ userinfo.username }}
          <i
            :class="userinfo.sex === 'man' ? 'el-icon-male' : 'el-icon-female'"
          ></i>
        </div>
        <div class="account"><span>Phone</span> {{ userinfo.phone }}</div>
        <div class="sign">{{ userinfo.sign }}</div>
      </div>
      <ul class="likes">
        <li>
          <p class="count">0</p>
          <p>粉丝</p>
        </li>
        <li>
          <p class="count">0</p>
          <p>关注</p>
        </li>
        <li>
          <p class="count">0</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>

    <div class="userCenterList">
      <div class="title">个人中心</div>
      <ul class="menu">
        <li>
          <!--vue会为选中的路由添加一个router-link-active(仅限于在router-link标签中，a标签中没有)  -->
          <router-link :to="`/userCenter/userNews?phone=${userinfo.phone}`">
            <i class="el-icon-chat-round"></i>
            我的消息
          </router-link>
        </li>
        <li>
          <router-link :to="`/userCenter/userCollect?phone=${userinfo.phone}`">
            <i class="el-icon-star-off"></i>
            我的收藏
          </router-link>
        </li>
        <li>
          <router-link :to="`/userCenter/userFocus?phone=${userinfo.phone}`">
            <i class="el-icon-view"></i>
            我的关注
          </router-link>
        </li>
        <li>
          <router-link :to="`/userCenter/changeInfo?phone=${userinfo.phone}`">
            <i class="el-icon-edit"></i>
            修改资料
          </router-link>
        </li>
        <li>
          <a @click="open">
            <i class="el-icon-switch-button"></i>
            退出登录
          </a>
        </li>
      </ul>
    </div>

    <div class="userContentShow">
      <div class="title">{{ title || "内容" }}</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/index.js";
import { MessageBox } from "element-ui";
export default {
  name: "UserCenter",
  data() {
    return {
      title: "",
      userinfo: {},
    };
  },
  methods: {
    async open() {
      await MessageBox.confirm("确定是否退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
      });
      localStorage.removeItem("token");
      this.$store.state.copyuserinfo={};
      this.$router.replace({
        path:'/home',
      })
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(val) {
        this.title = val.meta.title;
      },
    },
    getUser: {
      deep: true,
      handler(val) {
        this.userinfo = { ...val };
      },
    },
  },
  computed: {
    getUser() {
      return this.$store.state.copyuserinfo;
    },
  },
  async mounted() {
    this.title = this.$route.meta.title;
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
//中间的内容区
//中间的内容区
.middle-content {
  width: (@base*1200);
  margin: (@base*40) auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

  .userInfoData {
    width: (@base*1200);
    height: (@base*200);
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 10px;

    .userAvatar {
      width: (@base*155);
      height: (@base*155);

      a {
        display: block;
        width: (@base*155);
        height: (@base*155);
        border-radius: 50%;
        overflow: hidden;

        img {
          width: (@base*155);
          height: (@base*155);
        }
      }
    }

    .userDetailsData {
      width: 400px;
      height: 100px;

      .name {
        margin-top: 10px;
        font-weight: 600;
        font-size: 17px;
        color: rgb(68, 68, 68);
        i {
          color: #fff;
          font-weight: 600;
          margin-left: 10px;
          padding: 1px 2px;
          border-radius: 5px;
          background-color: rgb(0, 217, 255);
        }
      }

      .account {
        margin-top: 15px;
        color: #666;
        font-size: 14px;

        span {
          background-color: rgb(0, 217, 255);
          border-radius: 5px;
          padding: 0 5px;
          color: #fff;
        }
      }

      .sign {
        margin-top: 15px;
        color: rgb(134, 134, 134);
        font-size: 14px;
        font-weight: 600;
      }
    }

    .likes {
      width: 200px;
      display: flex;
      justify-content: space-between;

      p {
        text-align: center;
        margin-bottom: 10px;
        color: rgb(137, 135, 135);
      }

      .count {
        font-size: 19px;
      }
    }
  }

  .userCenterList {
    background-color: #fff;
    margin-top: 30px;
    width: 200px;
    height: 300px;
    border-radius: 10px;

    .title {
      padding: 15px 0;
      text-align: center;
      color: rgb(52, 52, 52);
      font-size: 18px;
      font-weight: 600;
      border-bottom: 2px rgb(232, 232, 232) solid;
    }

    .menu {
      padding-bottom: 10px;

      li {
        a {
          display: block;
          padding: 15px 0;
          text-align: center;
          letter-spacing: 1px;
          font-size: 16px;

          &:hover {
            background-color: rgb(246, 246, 246);
          }
        }

        &:last-child {
          a {
            color: red;
          }
        }
      }
    }
  }

  .userContentShow {
    width: 730px;
    //height: 600px;
    margin-top: 30px;
    border-radius: 10px;
    background-color: #fff;

    .title {
      padding: 15px 0;
      text-align: center;
      color: rgb(52, 52, 52);
      font-size: 18px;
      font-weight: 600;
      border-bottom: 2px rgb(232, 232, 232) solid;
    }
  }
}
a {
  color: #666;
}
.router-link-active {
  color: rgb(0, 217, 255);
}
</style>