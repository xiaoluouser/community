<template>
  <!-- 中间的内容区 -->
    <div class="middle-content">
      <!-- 发布 -->
      <div class="publish">
        <button><i class="fa fa-pencil"></i>发布帖子</button>
      </div>
      <!-- 公告部分-->
      <ul class="announcement-section">
        <li class="announcement">
          <!-- 发布者的一些信息 -->
          <div class="author-information">
            <div class="author-avatar">
              <a href="javascript:;">
                <img src="./images/author-avatar1.png" alt="" />
              </a>
            </div>
            <a href="javascript:;">讨论者的昵称</a>
            <span>02-09 • 玩家</span>
          </div>
          <!-- 发布的内容 -->
          <div class="announcement-content">
            <a href="javascript:;">
              <h3>发布内容的标题</h3>
              <p>
                神樱自古立于影向山顶，根系深盘地底，绵延不绝。
                在它的荫蔽之下，有人类诚心祈福，有妖狐笑看浮世，
                也有神明梦系须臾永恒。世事流转，人聚又散，
                唯有绯樱连年烂漫，随风而安。
              </p>
              <div class="announcement-imgs"></div>
            </a>
          </div>
          <!-- 发布内容的标签以及点赞数 -->
          <div class="announcement-label-like">
            <div class="label">
              <a href="javascript:;">彩蛋锦集</a>
            </div>
            <div class="like">
              <a href="javascript:;"><i class="fa fa-eye"></i>65万+</a>
              <a href="javascript:;"><i class="fa fa-comment"></i>3242</a>
              <a href="javascript:;"><i class="fa fa-thumbs-up"></i>9万+</a>
            </div>
          </div>
        </li>
        <li class="announcement">
          <!-- 发布者的一些信息 -->
          <div class="author-information">
            <div class="author-avatar">
              <a href="javascript:;">
                <img src="./images/author-avatar1.png" alt="" />
              </a>
            </div>
            <a href="javascript:;">讨论者的昵称</a>
            <span>02-09 • 玩家</span>
          </div>
          <!-- 发布的内容 -->
          <div class="announcement-content">
            <a href="javascript:;">
              <h3>发布内容的标题</h3>
              <p>
                神樱自古立于影向山顶，根系深盘地底，绵延不绝。
                在它的荫蔽之下，有人类诚心祈福，有妖狐笑看浮世，
                也有神明梦系须臾永恒。世事流转，人聚又散，
                唯有绯樱连年烂漫，随风而安。
              </p>
              <div class="announcement-imgs"></div>
            </a>
          </div>
          <!-- 发布内容的标签以及点赞数 -->
          <div class="announcement-label-like">
            <div class="label">
              <a href="javascript:;">彩蛋锦集</a>
            </div>
            <div class="like">
              <a href="javascript:;"><i class="fa fa-eye"></i>65万+</a>
              <a href="javascript:;"><i class="fa fa-comment"></i>3242</a>
              <a href="javascript:;"><i class="fa fa-thumbs-up"></i>9万+</a>
            </div>
          </div>
        </li>
        <li class="announcement">
          <!-- 发布者的一些信息 -->
          <div class="author-information">
            <div class="author-avatar">
              <a href="javascript:;">
                <img src="./images/author-avatar1.png" alt="" />
              </a>
            </div>
            <a href="javascript:;">讨论者的昵称</a>
            <span>02-09 • 玩家</span>
          </div>
          <!-- 发布的内容 -->
          <div class="announcement-content">
            <a href="javascript:;">
              <h3>发布内容的标题</h3>
              <p>
                神樱自古立于影向山顶，根系深盘地底，绵延不绝。
                在它的荫蔽之下，有人类诚心祈福，有妖狐笑看浮世，
                也有神明梦系须臾永恒。世事流转，人聚又散，
                唯有绯樱连年烂漫，随风而安。
              </p>
              <div class="announcement-imgs"></div>
            </a>
          </div>
          <!-- 发布内容的标签以及点赞数 -->
          <div class="announcement-label-like">
            <div class="label">
              <a href="javascript:;">彩蛋锦集</a>
            </div>
            <div class="like">
              <a href="javascript:;"><i class="fa fa-eye"></i>65万+</a>
              <a href="javascript:;"><i class="fa fa-comment"></i>3242</a>
              <a href="javascript:;"><i class="fa fa-thumbs-up"></i>9万+</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: "Forum",
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;
//中间的内容区
.middle-content {
  width: (@base*1266);
  margin: (@base*40) auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-right: 90px;
  //发布
  .publish {
    padding: 10px 30px;
    height: 100px;

    button {
      width: (@base*201);
      height: (@base*51);
      border-radius: 8px;
      font-size: 17px;
      font-weight: 600;
      background-color: rgb(123, 199, 243);
      cursor: pointer;

      i {
        margin: 10px;
      }

      &:hover {
        background-color: rgb(107, 196, 248);
      }
    }
  }

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
          }

          .announcement-imgs {
            width: (@base*152);
            height: (@base*152);
            overflow: hidden;
            background: url("./images/announcement1.jpg") no-repeat center right;
            background-size: auto (@base*152);
            border-radius: 10px;
            margin-top: 10px;
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

        .label {
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
          }
        }
      }
    }
  }
}
</style>