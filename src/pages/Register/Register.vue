<template>
  <div class="box">
    <div class="container">
      <h1>注册</h1>
      <form>
        <!-- <div class="form-control">
          <input type="text" required v-model="username" />
          <label>
            <span style="transition-delay: 0ms">昵</span>
            <span style="transition-delay: 50ms">称</span>
          </label>
        </div> -->
        <div class="form-control">
          <input type="text" required v-model="phone" />
          <label>
            <span style="transition-delay: 0ms">手</span>
            <span style="transition-delay: 50ms">机</span>
            <span style="transition-delay: 100ms">号</span>
          </label>
        </div>

        <div class="verification-code">
          <input type="text" required v-model="code" />
          <label>
            <span style="transition-delay: 0ms">验</span>
            <span style="transition-delay: 50ms">证</span>
            <span style="transition-delay: 100ms">码</span>
          </label>
          <button @click="sendCode">
            {{ showTime ? `${countdown}s后重新获取` : "获取验证码" }}
          </button>
        </div>

        <div class="form-control">
          <input type="password" required v-model="newPassword" />
          <label>
            <span style="transition-delay: 0ms">新</span>
            <span style="transition-delay: 50ms">密</span>
            <span style="transition-delay: 100ms">码</span>
          </label>
        </div>

        <div class="form-control">
          <input type="password" required v-model="confirmPassword" />
          <label>
            <span style="transition-delay: 0ms">确</span>
            <span style="transition-delay: 50ms">认</span>
            <span style="transition-delay: 100ms">新</span>
            <span style="transition-delay: 150ms">密</span>
            <span style="transition-delay: 200ms">码</span>
          </label>
        </div>

        <button class="btn" @click.prevent="register">注册</button>
        <p class="text">
          已有账号？去 <router-link to="/login" replace>登录</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { getCode, register } from "@/api/index.js";
import { messageSound } from "@/tools/sound.js";
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
      countdown: 30,
      showTime: "",
      codeStorage: "",
      //elementui头像图片的地址
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    async sendCode() {
      if (this.showTime) return;
      if (!/^1[3-9]([0-9]{9})$/.test(this.phone)) {
        this.$message({
          message: "手机号码不正确，请重新输入！",
          type: "error",
          duration: 2000,
        });
        return;
      }
      let isPhone = await getCode(this.phone);
      console.log(isPhone.data);
      if (isPhone.data.status === 1) {
        this.$message({
          message: isPhone.data.message,
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (isPhone.data.status === 0) {
        this.codeStorage = isPhone.data.data;
        this.$message({
          message: `验证码是 : ${this.codeStorage}`,
          type: "info",
          duration: 5000,
        });
        messageSound();
        this.showTime = true;
        let timer = setInterval(() => {
          this.countdown--;
          if (this.countdown < 0) {
            this.showTime = false;
            this.countdown = 30;
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    async register() {
      if (Number(this.code) !== this.codeStorage) {
        this.$message({
          message: "验证码错误！",
          type: "error",
          duration: 2000,
        });
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.$message({
          message: "密码不相同，请重新输入！",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      let user = {
        phone: this.phone,
        password: this.confirmPassword,
        user_avatar:this.circleUrl,
      };
      let userInfo = await register(user);
      if (userInfo.data.status === 0) {
        this.$message({
          message: userInfo.data.message,
          type: "success",
          duration: 2000,
        });
        setTimeout(() => {
          this.$router.replace("/login");
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
    background-color: rgba(129, 129, 129, 0.5);
    padding: 20px 30px;
    border-radius: 10px;
    width: 500px;
  }

  h1 {
    text-align: center;
    letter-spacing: 5px;
  }

  .form-control {
    margin-top: 30px;
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

  .verification-code {
    margin-top: 40px;
    position: relative;
    //background-color: red;
    display: flex;

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
    button {
      background-color: rgb(209, 235, 240);
      width: 200px;
      border-radius: 6px;
      margin-left: 10px;
      font-size: 16px;
      font-weight: 600;
      &:hover {
        background-color: rgb(163, 221, 231);
        color: #fff;
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