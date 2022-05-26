<template>
  <!-- 右侧的资讯展示区 -->
  <div class="information-display-area">
    <div class="image-display">
      <a href="javascript:;">
        <img :src="imageUrl[1]" alt="" />
      </a>
    </div>
    <div class="information">
      <div class="title">
        <h3>资讯</h3>
      </div>
      <div class="information-content">
        <div class="image">
          <a href="javascript:;" :style="{backgroundImage:'url('+imageUrl[0]+')'}"></a>
        </div>
        <ul class="content">
          <li v-for="(item, index) in showContent" :key="index">
            <a href="javascript:;">
              <span>{{ item.title }}</span>
              <p>{{ item.content }}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { createtContent,createImage} from "@/api/index.js";
export default {
  name: "ShowInformation",
  data() {
    return {
      showContent: [],
      imageUrl:[],
    };
  },
  created() {
    createImage().then((res)=>{
      this.imageUrl=res.data;
    });
    createtContent().then((res) => {
      //console.log(res.data)
      this.showContent = res.data;
      if (this.showContent.length > 4) {
        this.showContent.length=4;
      }
    });
  },
};
</script>

<style lang="less" scope>
@base: 1px/1.25;

//右侧的资讯展示区
.information-display-area {
  width: (@base*350);
  margin-top: 10px;
  height: (@base*665);

  .image-display {
    a {
      display: block;
      background-color: #d4e0f8;
      height: (@base*200);
      border-radius: 10px;
      overflow: hidden;
    }
  }

  .information {
    width: (@base*350);
    background-color: #ffffff;
    padding: 1px 15px;
    border-radius: 10px;
    margin-top: 10px;

    .title {
      border-bottom: 1px dashed rgb(82, 82, 82);
      margin: 5px;
    }

    .information-content {
      padding: 15px 0;

      .image {
        a {
          margin: 0 auto;
          display: block;
          width: (@base*300);
          height: (@base*170);
          //background: url("./images/information.jpg") no-repeat center;
          background-repeat: no-repeat;
          background-size: (@base*300);
          background-position: center;
          border-radius: 10px;
        }
      }

      .content {
        margin-top: 10px;
        margin: 10px 5px;

        li {
          margin-bottom: 5px;

          a {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;

            span {
              background-color: rgb(255, 174, 174);
              padding: 1px;
              border-radius: 3px;
              color: rgb(71, 71, 71);
              font-size: 12px;
            }

            p {
              width: 200px;
              display: inline-block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #666;
              font-size: 13px;
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>