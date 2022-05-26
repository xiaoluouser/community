<template>
  <div class="box">
    <div class="container">
      <router-link class="back" to="/home" replace>
        <el-tooltip content="back to home" placement="top" effect="light">
          <i class="el-icon-back"></i>
        </el-tooltip>
      </router-link>
      <h1>登录</h1>
      <form>
        <div class="form-control">
          <input type="text" required v-model="phone" />
          <label>
            <span style="transition-delay: 0ms">手</span>
            <span style="transition-delay: 50ms">机</span>
            <span style="transition-delay: 100ms">号</span>
          </label>
        </div>

        <div class="form-control">
          <input type="password" required v-model="password" />
          <label>
            <span style="transition-delay: 0ms">密</span>
            <span style="transition-delay: 50ms">码</span>
          </label>
        </div>

        <button class="btn" @click.prevent="Login">登录</button>

        <p class="text">
          还没有账号？ <router-link to="/register">注册</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/index.js";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    async Login() {
      let user = {
        phone: this.phone,
        password: this.password,
      };
      let userInfo = await login(user);
      if (userInfo.data.status === 1) {
        this.$message({
          message: userInfo.data.message,
          type: "warning",
          duration: 2000,
        });
      }
      if (userInfo.data.status === 0) {
        this.$store.dispatch("savetoken", userInfo.data.token);
        this.$message({
          message: userInfo.data.message,
          type: "success",
          duration: 2000,
        });
        setTimeout(() => {
          this.$router.replace("/home");
        }, 2000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  background-color: #d2f2fc;
  color: #fff;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  overflow: hidden;
  width: 100%;
  .container {
    background-color: rgba(114, 114, 114, 0.5);
    padding: 20px 30px;
    border-radius: 10px;
    width: 400px;
  }

  .back {
    color: #fff;
    i {
      position: absolute;
      font-size: 30px;
      &:hover {
        color: rgb(133, 225, 253);
      }
    }
  }

  h1 {
    text-align: center;
    letter-spacing: 5px;
  }

  .form-control {
    margin-top: 40px;
    position: relative;

    input {
      display: block;
      width: 100%;
      background-color: transparent;
      border: none;
      border-bottom: 2px #fff solid;
      color: #fff;
      padding: 15px 10px;
      font-size: 20px;

      &:focus,
      &:valid {
        outline: none;
        border-bottom-color: rgb(135, 233, 248);

        //当获取到焦点和有效的时候，向y轴的负方向移动
        & + label span {
          color: lightblue;
          transform: translateY(-30px);
        }
      }
    }

    label {
      position: absolute;
      top: 12px;
      left: 8px;
      pointer-events: none;
      font-size: 20px;

      span {
        display: inline-block;
        transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }
  }

  .btn {
    display: block;
    width: 100%;
    margin-top: 20px;
    height: 40px;
    border-radius: 6px;
    border: none;
    font-size: 20px;
    font-weight: 600;
    background-color: rgb(130, 213, 238);
    cursor: pointer;

    &:hover {
      background-color: rgb(71, 210, 252);
      color: #fff;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .text {
    text-align: center;
    margin-top: 16px;
    margin-bottom: 20px;

    a {
      color: rgb(75, 172, 211);

      &:hover {
        color: rgb(18, 105, 139);
        text-decoration: underline;
      }
    }
  }
}
</style>