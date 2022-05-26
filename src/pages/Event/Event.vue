<template>
  <!-- 中间的内容区 -->
    <ul class="middle-content">
      <li>
        <a href="javascript:;">
          <div class="content">
            <h3>这是发布活动的标题</h3>
            <p>
              岁末的钟声已经敲响，这一年里，我们和各位旅行者一路相伴，
              在提瓦特大陆上收获了好多有趣的冒险故事。新的一年里，
              也想和旅行者一起继续开启新的冒险旅程！
              新年新气象，徒步团特地准备了一张新春祈愿卡，
              旅行者都有什么新春愿望呢？一起来分享吧！
              听说写在祈愿卡上的愿望更容易实现噢~
            </p>
          </div>
          <div class="with-pictures">
            <img src="./images/announcement1.jpg" alt="" />
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="content">
            <h3>这是发布活动的标题</h3>
            <p>
              岁末的钟声已经敲响，这一年里，我们和各位旅行者一路相伴，
              在提瓦特大陆上收获了好多有趣的冒险故事。新的一年里，
              也想和旅行者一起继续开启新的冒险旅程！
              新年新气象，徒步团特地准备了一张新春祈愿卡，
              旅行者都有什么新春愿望呢？一起来分享吧！
              听说写在祈愿卡上的愿望更容易实现噢~
            </p>
          </div>
          <div class="with-pictures">
            <img src="./images/announcement1.jpg" alt="" />
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="content">
            <h3>这是发布活动的标题</h3>
            <p>
              岁末的钟声已经敲响，这一年里，我们和各位旅行者一路相伴，
              在提瓦特大陆上收获了好多有趣的冒险故事。新的一年里，
              也想和旅行者一起继续开启新的冒险旅程！
              新年新气象，徒步团特地准备了一张新春祈愿卡，
              旅行者都有什么新春愿望呢？一起来分享吧！
              听说写在祈愿卡上的愿望更容易实现噢~
            </p>
          </div>
          <div class="with-pictures">
            <img src="./images/announcement1.jpg" alt="" />
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="content">
            <h3>这是发布活动的标题</h3>
            <p>
              岁末的钟声已经敲响，这一年里，我们和各位旅行者一路相伴，
              在提瓦特大陆上收获了好多有趣的冒险故事。新的一年里，
              也想和旅行者一起继续开启新的冒险旅程！
              新年新气象，徒步团特地准备了一张新春祈愿卡，
              旅行者都有什么新春愿望呢？一起来分享吧！
              听说写在祈愿卡上的愿望更容易实现噢~
            </p>
          </div>
          <div class="with-pictures">
            <img src="./images/announcement1.jpg" alt="" />
          </div>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  name: "Event",
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;
//中间的内容区
.middle-content {
  width: (@base*1000);
  margin: (@base*40) auto;

  li {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 20px 20px 20px;
    margin-top: 5px;

    a {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .content {
        width: 450px;
        line-height: 24px;

        h3 {
          margin-bottom: 10px;
        }

        p {
          height: 95px;
          color: rgb(77, 77, 77);
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4; //显示的行数
          -webkit-box-orient: vertical;
        }
      }

      .with-pictures {
        overflow: hidden;
        border-radius: 10px;

        img {
          width: (@base*302);
          height: (@base*134);

          transition: all 0.3s ease-in-out;
        }
      }

      &:hover img {
        transform: scale(1.05);
      }

      &:hover h3 {
        color: rgb(92, 213, 235);
      }
    }
  }
}
</style>