<template>
  <div class="change">
    <div class="changeAvatar">
      <div class="avatar">
        <img
          :src="userinfo.user_avatar"
          alt="用户头像"
        />
        <input type="file" id="avatar" @change="changeAvatar($event)" hidden />
        <label for="avatar">修改头像</label>
      </div>
    </div>
    <div class="changeName">
      <p>昵称</p>
      <span>{{ userinfo.username }}</span>
      <el-button class="name" type="text" @click="open">修改</el-button>
    </div>
    <div class="changeSex">
      <p>性别</p>
      <div class="box">
        <el-radio v-model="userinfo.sex" label="man">男</el-radio>
        <el-radio v-model="userinfo.sex" label="woman">女</el-radio>
      </div>
    </div>
    <div class="changeSign">
      <p>签名</p>
      <div class="box">
        <el-input
          type="textarea"
          placeholder="请输入你的个性签名。"
          :autosize="{ minRows: 3, maxRows: 3 }"
          v-model="userinfo.sign"
        >
        </el-input> 
      </div>
    </div>
    <div class="save">
      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from "@/api/index.js";
import compress from "@/tools/compressFIles.js";
import { MessageBox } from "element-ui";
export default {
  name: "ChangeInfo",
  data() {
    return {
      userinfo: {},
    };
  },
  methods: {
    changeAvatar(event) {
      let filetype = ["image/jpg", "image/png", "image/jpeg"];
      let file = event.target.files;
      if (!filetype.includes(file[0].type)) {
        this.$message({
          message: `不能上传文件 : ${file[0].name}`,
          type: "warning",
          duration: 2000,
        });
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.userinfo.user_avatar = reader.result;
      };
    },
    open() {
      MessageBox.prompt("请输入新的昵称", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        lockScroll: false,
      }).then(({ value }) => {
        this.userinfo.username = value;
      });
    },
    async save() {
      let res = await compress(this.userinfo.user_avatar, "image/jpeg");
      this.userinfo.user_avatar = res;
      await updateUserInfo(this.userinfo);
      let copyUser={...this.userinfo};//复制一个用户信息的对象，让vuex中存的是复制品
      this.$store.dispatch("senduser",copyUser);
      this.userinfo.sign='';
      this.$message({
        message: "保存用户信息成功",
        type: "success",
        duration: 2000,
      });
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
.change {
  .changeAvatar {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .avatar {
      text-align: center;
      img {
        width: (@base*155);
        height: (@base*155);
        border-radius: 50%;
      }
      label {
        display: block;
        margin-top: 20px;
        color: rgb(0, 217, 255);
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .changeName {
    height: 30px;
    display: flex;
    padding: 0 40px;
    margin-top: 20px;
    color: rgb(114, 114, 114);
    font-size: 14px;
    align-items: center;
    p {
      margin-right: 40px;
      font-size: 17px;
    }
    .name {
      margin-left: 10px;
      color: rgb(0, 217, 255);
      font-size: 12px;
    }
  }
  .changeSex {
    height: 30px;
    display: flex;
    padding: 0 40px;
    margin-top: 20px;
    color: rgb(63, 63, 63);
    font-size: 14px;
    align-items: center;
    p {
      margin-right: 40px;
      font-size: 17px;
    }
  }
  .changeSign {
    display: flex;
    padding: 0 40px;
    margin-top: 20px;
    color: rgb(63, 63, 63);
    font-size: 14px;
    align-items: center;
    p {
      margin-right: 40px;
      font-size: 17px;
    }
    .box {
      width: 400px;
      height: 75px;
      padding-bottom: 5px;
      overflow: hidden;
    }
  }
  .save {
    margin-top: 50px;
    button {
      background-color: #fff;
      border: 1px rgb(0, 217, 255) solid;
      margin: 20px auto;
      display: block;
      height: 50px;
      width: 150px;
      color: rgb(61, 61, 61);
      font-size: 20px;
      border-radius: 10px;
    }
  }
}
</style>