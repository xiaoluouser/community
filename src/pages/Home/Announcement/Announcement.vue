<template>
  <!-- 公告部分-->
  <ul class="announcement-section">
    <li class="announcement" v-for="item in announcement" :key="item.id">
      <!-- 发布者的一些信息 -->
      <div class="author-information">
        <div class="author-avatar">
          <a>
            <img :src="item.avatar" alt="" />
          </a>
        </div>
        <a href="javascript:;">{{ item.username }}</a>
        <span>{{ item.time }} • 个人</span>
      </div>
      <!-- 发布的内容 -->
      <div class="announcement-content">
        <a @click="jumpConDetail(item)">
          <h3>{{ item.title }}</h3>
          <p>{{ item.article }}</p>
          <div class="announcement-imgs">
            <img
              v-for="(imagesItem, idx) in item.images"
              :key="idx"
              :src="imagesItem"
              alt=""
            />
          </div>
        </a>
      </div>
      <!-- 发布内容的标签以及点赞数 -->
      <div class="announcement-label-like">
        <div class="label">
          <a href="javascript:;">{{ item.classification }}</a>
        </div>
        <div class="like">
          <a><i class="el-icon-view"></i>{{ item.views }}</a>
          <a href="javascript:;"><i class="el-icon-chat-dot-round"></i></a>
          <a @click="announcementLike(item)"
            ><i class="fa fa-thumbs-up"></i>{{ item.likes }}</a
          >
        </div>
      </div>
    </li>
    <li class="loading">
      <a href="javascript:;" v-if="show" @click="loading">点击加载更多内容</a>
      <a href="javascript:;" v-if="!show"
        >正在加载中<i class="el-icon-loading"></i
      ></a>
    </li>
  </ul>
</template>

<script>
import { throttle } from "@/tools/methods.js";
import { getArticle, updateLikes } from "@/api/index.js";
export default {
  name: "Announcement",
  data() {
    return {
      announcement: [],
      num: 0,
      show: true,
    };
  },
  methods: {
    async jumpConDetail(item) {
      item.views++;
      const updateNum = {
        views: item.views,
        likes: item.likes,
        id: item.id,
        user_id: item.user_id,
      };
      this.$router.push({
        path: "/contentDetail",
        //用query传参的方式将id参数传递给ContenDetail路由组件
        query: {
          id: item.id,
          user_id: item.user_id,
        },
      });
      await updateLikes(updateNum);
    },
    announcementLike: throttle(
      async function (item) {
        item.likes++;
        const updateNum = {
          views: item.views,
          likes: item.likes,
          id: item.id,
          user_id: item.user_id,
        };
        await updateLikes(updateNum);
      },
      1000,
      1
    ),
    async loading() {
      this.show = false;
      this.num += 5;
      let data = (await getArticle(this.num)).data;
      if (data.status === 0) {
        this.show = true;
        data.article.forEach((item) => {
          this.announcement.push(item);
        });
      }
    },
  },
  async mounted() {
    let data = (await getArticle()).data;
    if (data.status === 0) {
      data.article.forEach((item) => {
        this.announcement.push(item);
      });
    }
  },
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;
//公告部分
.announcement-section {
  width: (@base*877);
  .announcement {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    margin-top: 10px;

    //发布者的一些信息
    .author-information {
      height: (@base*30);

      .author-avatar {
        width: (@base*30);
        height: (@base*30);
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;

        a {
          img {
            width: (@base*30);
            height: (@base*30);
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
      a {
        display: block;
        margin-top: 18px;
        overflow: hidden;

        h3 {
          color: #000;
          font-size: 20px;
          font-weight: 800;
        }

        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis; //让超出文字显示....
          white-space: nowrap;
          margin-top: 10px;
          color: rgb(29, 29, 29);
          line-height: 20px;
        }

        .announcement-imgs {
          overflow: hidden;
          margin-top: 20px;
          display: flex;
          img {
            height: (@base*152);
            width: (@base*152);
            border-radius: 5px;
            margin-right: 5px;
          }
        }

        &:hover h3 {
          color: rgb(72, 210, 252);
        }
      }
    }

    //发布内容的标签以及点赞数
    .announcement-label-like {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
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

      .like {
        a {
          color: #666;
          margin-right: 40px;
          font-weight: 300;
          font-size: 15px;

          i {
            margin-right: 5px;
          }

          &:hover {
            color: rgb(34, 34, 34);
          }
          &:active {
            color: red;
          }
        }
      }
    }
  }
  .loading {
    background-color: #ffffff;
    padding: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: 10px;
    text-align: center;
    a {
      color: rgb(72, 210, 252);
    }
  }
}
</style>