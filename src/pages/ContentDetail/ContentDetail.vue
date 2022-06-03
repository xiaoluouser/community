<template>
  <!-- 中间的内容区 -->
  <div class="middle-content">
    <!-- 发布的部分-->
    <ul class="announcement-section">
      <li class="announcement">
        <!-- 内容的头标题 -->
        <h2>{{ article.title }}</h2>
        <div class="author-information">
          <div class="author-avatar">
            <a href="javascript:;">
              <img :src="article.avatar" alt="" />
            </a>
          </div>
          <span>{{ article.time }} • {{ article.username }}</span>
        </div>
        <!-- 发布的内容 -->
        <div class="announcement-content">
          <div class="announcement-imgs">
            <img
              @dblclick="bigImage(item)"
              v-for="item in article.images"
              :key="item.id"
              :src="item"
            />
          </div>
          <p>{{ article.article }}</p>
          <div class="label">
            <a>{{ article.classification }}</a>
          </div>
        </div>
        <!-- 发布内容的标签以及点赞数 -->
        <div class="announcement-label-like">
          <div class="like">
            <a @click="contentLike"
              ><i class="fa fa-thumbs-up"></i>{{ article.likes }}</a
            >
          </div>
        </div>
      </li>
    </ul>
    <!-- 评论框 -->
    <div class="comment-box">
      <div class="box">
        <el-input
          type="textarea"
          placeholder="请输入想要评论的内容....."
          v-model="textarea"
          :autosize="{ minRows: 3, maxRows: 3 }"
        >
        </el-input>
      </div>
      <button @click="creatComment">评论</button>
    </div>
    <!-- 评论 -->
    <div class="comment">
      <div class="title">
        <h3>全部评论</h3>
        <span class="count">共 {{ comment.length }} 条</span>
        <div class="sort">
          <span>排序 :</span>
          <select v-model="sort">
            <option value="最新">最新</option>
            <option value="热度">热度</option>
            <option value="最早">最早</option>
          </select>
        </div>
      </div>

      <transition-group name="showComment">
        <div class="comment-content" v-for="item in comment" :key="item.id">
          <div class="author-information">
            <div class="author-avatar">
              <a href="javascript:;">
                <img :src="item.avatar" alt="" />
              </a>
            </div>
            <span>{{ item.username }}</span>
            <span> • </span>
            <span>{{ item.time }}</span>
          </div>
          <p>{{ item.comment }}</p>
          <div class="like">
            <a @click="remove(item.id)" v-if="UserId === item.user_id">删除</a>
            <a @click="commentLike(item)"><i class="fa fa-thumbs-up"></i></a>
            <span>{{ item.likes }}</span>
          </div>
        </div>
      </transition-group>
    </div>
    <transition name="bigImage">
      <div
        class="announcement-big-imgs"
        v-show="showBigImage"
        @click="bigImageDisappear"
      >
        <img :src="bigImageValue" alt="" />
      </div>
    </transition>
  </div>
</template>

<script>
//引入momentjs
import moment from "moment";
import { throttle } from "@/tools/methods.js";
import {
  getDetailArticle,
  updateLikes,
  postComment,
  getComment,
} from "@/api/index.js";
export default {
  name: "ContentDetail",
  data() {
    return {
      sort: "",
      textarea: "",
      article: {},
      comment: [],
      UserId: "",
      bigImageValue: "",
      showBigImage: false,
    };
  },
  methods: {
    async creatComment() {
      if (this.textarea.trim() == "") {
        this.$message({
          message: "输入不能为空！",
          type: "warning",
          duration: 2000,
        });
        this.textarea = "";
        return;
      }
      let commentInfo = {
        comment: this.textarea,
        time: moment().format("MM-DD HH:mm"),
        article_id: this.$route.query.id,
        user_id: this.$route.query.user_id,
      };
      let isComment = (await postComment(commentInfo)).data;
      this.$message({
        message: isComment.message,
        type: "success",
        duration: 2000,
      });
      let data = (await getComment(commentInfo.article_id)).data;
      if (data.status === 0) {
        this.comment = data.data;
      }
      //this.sort = "最新";
      this.textarea = "";
    },
    remove(id) {
      if (confirm("确定要删除吗？")) {
        this.content.commentObj.forEach((element, index, arr) => {
          if (element.id === id) {
            arr.splice(index, 1);
          }
        });
      }
    },
    commentLike: throttle(
      function (item) {
        item.likes++;
      },
      1000,
      1
    ),
    contentLike: throttle(
      async function () {
        this.article.likes++;
        const updateNum = {
          views: this.article.views,
          likes: this.article.likes,
          id: this.article.id,
          user_id: this.article.user_id,
        };
        await updateLikes(updateNum);
        //this.$store.dispatch("reviseLikes", this.content.likes);
      },
      1000,
      1
    ),
    bigImage(item) {
      this.bigImageValue = item;
      this.showBigImage = true;
    },
    bigImageDisappear() {
      this.showBigImage = false;
    },
  },
  watch: {
    "content.commentObj": {
      deep: true,
      handler(val) {
        this.arr = Array.from(val);
        this.$store.dispatch("reviseComment", val);
      },
    },
    sort: {
      handler(val) {
        if (val === "热度") {
          this.arr.sort((p1, p2) => {
            if (p1.likes > p2.likes) {
              return -1;
            }
          });
        }
        if (val === "最新") {
          this.arr = Array.from(this.content.commentObj);
        }
        if (val === "最早") {
          this.arr.sort((p1, p2) => {
            if (moment(p1.time).valueOf() < moment(p2.time).valueOf()) {
              return -1;
            }
          });
        }
      },
    },
  },
  async mounted() {
    //this.sort = "最新";
    //this.arr = Array.from(this.content.commentObj);
    //this.image = this.content.images;
    let id = this.$route.query.id;
    let user_id = this.$route.query.user_id;
    let data = (await getDetailArticle(id, user_id)).data.data;
    this.article = { ...data };
    let commentData = (await getComment(id)).data;
    if (commentData.status === 0) {
      this.UserId = commentData.UserId;
      this.comment = commentData.data;
    }
  },
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;
.announcement-big-imgs {
  background-color: rgba(39, 39, 39, 0.9);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 4;
  img {
    width: 831px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

//中间的内容区
.middle-content {
  width: (@base*1266);
  margin: (@base*40) auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

//信息详情部分
.announcement-section {
  width: (@base*1000);
  margin-bottom: 20px;

  .announcement {
    background-color: #fff;
    padding: 40px;
    padding-top: 15px;
    border-radius: 10px;
    margin-top: 10px;

    //发布者的一些信息
    .author-information {
      .author-avatar {
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;

        a {
          display: block;
          border-radius: 50%;
          overflow: hidden;
          width: (@base*50);
          height: (@base*50);
          img {
            width: (@base*50);
            height: (@base*50);
          }
        }
      }

      a {
        font-size: 14px;
        font-weight: 600;
        color: rgb(54, 54, 54);
        vertical-align: middle;

        &:hover {
          color: rgb(103, 122, 122);
        }
      }

      span {
        margin-left: 10px;
        font-size: 13px;
        color: #666;
        vertical-align: middle;
      }
    }

    //发布的内容
    .announcement-content {
      padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid rgb(233, 233, 233);
      overflow: hidden;
      .announcement-imgs {
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: center;
        img {
          margin-bottom: 20px;
          //height: 200px;
          width: 100%;
          border-radius: 10px;
        }
      }

      p {
        width: 100%;
        text-indent: 30px;
        white-space: normal;
        line-height: 25px;
        text-align: justify;
        margin-top: 10px;
        margin-bottom: 20px;
        color: rgb(129, 129, 129);
      }

      .label {
        display: flex;

        a {
          background-color: rgba(128, 129, 129, 0.4);
          display: block;
          padding: 5px 8px;
          border-radius: 15px;
          color: rgb(53, 53, 53);
          font-size: 10px;
          margin-right: 10px;

          &:hover {
            background-color: rgb(179, 179, 179);
          }
        }
      }
    }

    //发布内容的标签以及点赞数
    .announcement-label-like {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      user-select: none;
      .like {
        a {
          color: rgb(143, 143, 143);
          margin-right: 60px;
          font-weight: 600;
          font-size: 40px;

          i {
            margin-right: 5px;
            transition: all 0.1s ease-in;
          }

          &:active {
            color: rgb(255, 86, 86);
          }

          &:active i {
            transform: scale(1.2);
          }
        }
      }
    }
  }
}
//评论框
.comment-box {
  width: (@base*1000);
  height: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 30px;
  .box {
    width: 650px;
    height: 75px;
    padding-bottom: 5px;
    overflow: hidden;
  }
  button {
    background-color: #79d5ff;
    width: 80px;
    height: 75px;
    border-radius: 6px;
    font-size: 22px;
    color: rgb(255, 255, 255);
    &:hover {
      background-color: rgb(147, 230, 255);
    }
  }
}

//评论
.comment {
  width: (@base*1000);
  background-color: rgb(255, 255, 255);
  padding: 5px 30px 20px 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    h3 {
      font-family: OPPOSans-Regular, PingFang SC, Microsoft YaHei,
        Helvetica Neue, Helvetica, Arial;
      color: rgb(48, 48, 48);
    }
    .count {
      color: rgb(112, 112, 112);
      font-size: 12px;
      position: absolute;
      left: 100px;
    }
    .sort {
      span {
        margin-right: 5px;
        font-size: 14px;
        color: #666;
      }

      select {
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
  }

  .comment-content {
    border-bottom: 2px solid #f1f1f1;
    padding-bottom: 20px;
    margin-bottom: 20px;
    background-color: rgb(255, 255, 255);
    //评论内容
    .author-information {
      margin-bottom: 20px;
      .author-avatar {
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;

        a {
          display: block;
          border-radius: 50%;
          overflow: hidden;
          width: (@base*40);
          height: (@base*40);
          img {
            width: (@base*40);
            height: (@base*40);
          }
        }
        & + span {
          color: rgb(26, 25, 25);
          font-size: 15px;
          font-weight: 600;
        }
      }

      a {
        font-size: 14px;
        font-weight: 600;
        color: rgb(54, 54, 54);
        vertical-align: middle;

        &:hover {
          color: rgb(103, 122, 122);
        }
      }

      span {
        margin-left: 10px;
        font-size: 13px;
        color: #666;
        vertical-align: middle;
      }
    }
    p {
      font-size: 14px;
      padding: 0 55px;
      line-height: 30px;
      letter-spacing: 2px;
      text-align: justify;
      white-space: normal;
      margin-bottom: 20px;
      color: rgb(56, 56, 56);
      transition: all 0.3s ease-in-out;
    }
    .like {
      text-align: right;
      user-select: none;
      a:nth-child(1) {
        color: rgb(190, 190, 190);
        font-size: 14px;
        margin-right: 25px;
        cursor: pointer;
        &:hover {
          color: rgb(32, 203, 233);
        }
      }
      a:nth-child(2) {
        i {
          color: rgb(146, 146, 146);
          margin-right: 3px;
        }
        &:active i {
          color: rgb(250, 106, 106);
        }
      }
      span {
        font-size: 14px;
        font-weight: 100;
      }
    }
  }
}

.showComment-leave-active,
.showComment-enter-active {
  transition: all 0.5s ease-in-out;
}
.showComment-leave {
  transform: translateX(0);
}
.showComment-leave-to {
  transform: translateX(200%);
}
.showComment-enter {
  transform: translateX(-200%);
}
.showComment-enter-to {
  transform: translateX(0);
}

//控制选中图片放大预览的效果
.bigImage-leave-active,
.bigImage-enter-active {
  transition: all 0.3s ease-in-out;
}
.bigImage-leave,
.bigImage-enter-to {
  opacity: 0.9;
}
.bigImage-leave-to,
.bigImage-enter {
  opacity: 0;
}
</style>