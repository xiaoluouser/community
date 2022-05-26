<template>
  <!-- 中间的书写区 -->
  <div class="middle-content">
<!--     <Editor></Editor> -->
    <div class="top-title">
      <h3>发布帖子</h3>
    </div>
    <div class="content-area">
      <div class="content-title">
        <span>标题:</span>
        <div class="box">
          <el-input
            v-model="title"
            placeholder="请输入内容"
            maxlength="15"
            show-word-limit
          ></el-input>
        </div>
      </div>
      <div class="content-images">
        <span>图片:</span>
        <div class="box">
          <input
            type="file"
            id="upload"
            @change="uploadImages($event)"
            multiple
          />
          <label
            for="upload"
            @dragover="dragImages($event)"
            @drop="dropImages($event)"
          >
            <span>
              拖拽到此处以上传图片
              <i class="el-icon-folder-add"></i>
            </span>
          </label>
          <div class="images-box">
            <span v-show="!imageValue.length">最多上传7张图片!</span>
            <div
              class="everyone-image-box"
              v-for="(item, index) in imageValue"
              :key="index"
            >
              <img
                :src="item"
                alt=""
                @click="removeImage(index)"
                draggable="false"
              />
            </div>
          </div>
        </div>
        <p>( 只能上传 jpg , png , jepg 等类型的图片 。)</p>
      </div>
      <div class="content">
        <span>内容:</span>
        <div class="box">
          <el-input
            type="textarea"
            placeholder="请输入想要发布的内容....."
            v-model="article"
            :autosize="{ minRows: 10, maxRows: 10 }"
          >
          </el-input>
        </div>
      </div>
      <div class="classification">
        <span>分区:</span>
        <div class="box">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="分区1"></el-checkbox>
            <el-checkbox label="分区2"></el-checkbox>
            <el-checkbox label="分区3"></el-checkbox>
            <el-checkbox label="分区4"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <button @click="publish">发布</button>
    </div>
  </div>
</template>

<script>
//引入momentjs
import moment from "moment";
import { postArticle } from "@/api/index.js";
import compress from "@/tools/compressFIles.js";

//import Editor from "@/components/Editor/Editor.vue";

export default {
  name: "NewArticle",
/*   components:{
    Editor 
  }, */
  data() {
    return {
      title: "",
      article: "",
      imageValue: [],
      checkList: [],
    };
  },
  methods: {
    //这个函数，当只有添加的图片和上一次不同时，才会执行。
    uploadImages(event) {
      let files = event.target.files;
      this.loadFiles(files);
    },
    dragImages(event) {
      event.preventDefault();
    },
    dropImages(event) {
      event.preventDefault();
      let files = event.dataTransfer.files;
      this.loadFiles(files);
    },
    removeImage(index) {
      this.imageValue.splice(index, 1);
    },
    async publish() {
      if (this.title.trim() != "" && this.article.trim() != "") {
        const obj = {
          title: this.title,
          images: this.imageValue,
          article: this.article,
          time: moment().format("MM-DD HH:mm"),
          classification: this.checkList,
        };
        (await postArticle(obj)).data;
        this.$message({
          message: "发布成功！",
          type: "success",
          duration: 2000,
        });
        this.$router.push({
          path: "/home",
        });
      } else {
        this.$message({
          message: "请输入完整的内容！",
          type: "warning",
          duration: 2000,
        });
      }
    },
    loadFiles(files) {
      let filetype = ["image/jpg", "image/png", "image/jpeg"];
      for (let i = 0; i < files.length; i++) {
        if (!filetype.includes(files[i].type)) {
          this.$message({
            message: `不能上传文件 : ${files[i].name}`,
            type: "warning",
            duration: 2000,
          });
          continue;
        }
        let size = Math.floor((files[i].size / 1024) * 100) / 100;
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          compress(reader.result, "image/jpeg").then((res) => {
            this.imageValue.push(res);
            let littleSize =
              Math.floor((this.baseToBlob(res).size / 1024) * 100) / 100;
            console.log("压缩后的大小", littleSize);
          });
          console.log("原来的大小", size);
        };
      }
    },
    //将base64转换为file文件流
    baseToBlob(b64) {
      const byteCharacters = b64;
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      return blob;
    },
  },
  watch: {
    imageValue(val) {
      if (val.length > 7) {
        this.$message({
          message: "超出最大限度！",
          type: "error",
          duration: 2000,
        });
        val.splice(0, 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;
.super-center() {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

//中间的书写区
.middle-content {
  width: (@base*1000);
  margin: (@base*40) auto;
  background-color: #fff;
  padding: 0 10px 10px 10px;
  border-radius: 10px;
  .top-title {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-bottom: 1px rgb(223, 223, 223) solid;
  }
  .content-area {
    .content-title {
      width: 80%;
      margin: 0 auto;
      padding: 50px 10px;
      padding-right: 45px;
      display: flex;
      align-items: center;
      span {
        width: 50px;
        margin-right: 40px;
        color: #666;
      }
      .box {
        width: 85%;
        overflow: hidden;
      }
    }
    .content-images {
      width: 80%;
      margin: 0 auto;
      padding: 20px 10px;
      padding-right: 45px;
      display: flex;
      align-items: center;
      position: relative;
      span {
        width: 50px;
        margin-right: 40px;
        color: #666;
      }
      .box {
        width: 85%;
        height: 200px;
        display: flex;
        //overflow: hidden;
        align-items: center;
        label {
          background-color: rgb(238, 238, 238);
          width: 155px;
          height: 155px;
          border-radius: 10px;
          position: relative;
          margin-bottom: 10px;
          border: 2px rgb(153, 153, 153) solid;
          margin-right: 10px;
          font-size: 14px;
          text-align: center;
          line-height: 200px;
          user-select: none;

          span {
            letter-spacing: 0px;
            width: 100px;
            height: 20px;
            color: #a7b4c1;
            font-size: 13px;
            i {
              font-size: 50px;
              position: absolute;
              top: 25%;
              left: 35%;
            }
          }
          &:hover {
            border: 2px solid #409eff;
            background-color: rgb(214, 214, 214);
          }
        }
        input {
          display: none;
        }
        .images-box {
          width: 350px;
          height: 150px;
          margin-top: -15px;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          span {
            width: 200px;
            height: 20px;
            color: rgb(175, 175, 175);
            position: absolute;
            top: 70px;
          }
          .everyone-image-box {
            height: 75px;
            width: 75px;
            margin-right: 6px;
            margin-bottom: 5px;
            position: relative;
            &::after,
            &::before {
              border-radius: 5px;
              background-color: rgb(85, 84, 84);
              .super-center();
              display: none;
              pointer-events: none;
            }
            &::after {
              content: "";
              font-size: 40px;
              height: 3px;
              width: 25px;
              transform: rotateZ(43deg);
            }
            &::before {
              content: "";
              height: 25px;
              width: 3px;
              transform: rotateZ(45deg);
            }
            img {
              height: 75px;
              width: 75px;
              border-radius: 5px;
              user-select: none;
            }
            &:hover {
              img {
                filter: opacity(0.2);
              }
              &::before,
              &::after {
                display: block;
              }
            }
          }
        }
      }
      p {
        position: absolute;
        bottom: 20px;
        left: 95px;
        font-size: 14px;
        letter-spacing: 1px;
        color: rgb(175, 175, 175);
      }
    }
    .content {
      width: 80%;
      height: 300px;
      margin: 0 auto;
      padding: 10px;
      padding-right: 45px;
      display: flex;
      align-items: center;
      span {
        width: 50px;
        margin-right: 40px;
        color: #666;
      }
      .box {
        width: 85%;
        height: 224px;
        overflow: hidden;
      }
    }
    .classification {
      width: 80%;
      margin: 0 auto;
      padding: 10px;
      padding-right: 45px;
      display: flex;
      align-items: center;
      span {
        width: 50px;
        margin-right: 40px;
        color: #666;
      }
      .box {
        width: 85%;
        overflow: hidden;
      }
    }
    button {
      background-color: rgb(0, 217, 255);
      margin: 20px auto;
      display: block;
      height: 50px;
      width: 200px;
      color: #666;
      font-size: 20px;
      border-radius: 10px;
    }
  }
}
</style>