<template>
  <!-- 中间的区域 -->
    <ul class="middle-content">
    <li>
      <img src="./images/find.jpg" alt="" />
      <div class="title">
        <h4>标题</h4>
        <div class="info-like">
          <div class="author-avatar">
            <a href="javascript:;">
              <img src="./images/author-avatar1.png" alt="" />
            </a>
          </div>
          <div class="like">
            <a href="javascript:;"><i class="fa fa-thumbs-up"></i></a>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Find",
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;
//中间的内容区
.middle-content {
  width: (@base*1000);
  margin: (@base*40) auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  li {
    position: relative;
    height: (@base*310);
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    z-index: 0;

    img {
      height: (@base*310);
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }

    .title {
      width: 100%;
      background-color: rgba(256, 256, 256, 0.4);
      backdrop-filter: blur(3px);
      position: absolute;
      bottom: 0;
      padding: 10px;
      box-shadow: 0 -1px 6px rgba(255, 255, 255, 0.6);

      h4 {
        margin: 0 0 10px 0;
        color: rgb(66, 66, 66);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        letter-spacing: 1px;
      }

      .info-like {
        display: flex;
        justify-content: space-between;

        .author-avatar {
          width: (@base*25);
          height: (@base*25);
          border-radius: 50%;
          overflow: hidden;
          display: inline-block;
          margin-right: 10px;
          vertical-align: middle;

          a {
            img {
              width: (@base*25);
              height: (@base*25);
            }

            &:hover img {
              transform: scale(1);
            }
          }
        }

        .like {
          a {
            i {
              color: #666;
            }

            &:hover i {
              color: rgb(255, 89, 89);
            }
          }
        }
      }
    }
  }
}
</style>