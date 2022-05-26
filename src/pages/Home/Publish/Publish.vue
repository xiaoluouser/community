<template>
  <!-- 发布 -->
  <div class="publish">
    <div class="title"><span>发</span><span>布</span></div>
    <div class="publish-entry">
      <button @click="jump">
        <i class="fa fa-pencil"></i>发布帖子<i class="el-icon-arrow-right"></i>
      </button>
      <span>在这里，你可以发布任何你想发布的东西，并将其分享给所有人</span>
<!--       <button>
        <i class="fa fa-image"></i>发布图片<i class="el-icon-arrow-right"></i>
      </button>
      <span>绘画、COS、手工、表情包</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Publish",
  methods:{
    jump(){
      this.$router.push({
        path:'/newArticle'
      })
    }
  }
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;
//发布
.publish {
  height: (@base*296);
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  overflow: hidden;
  padding: 0 10px;
  width: (@base*350);

  span {
    font-size: 20px;
    font-weight: 800;
    margin: 10px;
  }

  .title {
    height: (@base*63);
    line-height: (@base*63);
    border-bottom: 1px dashed rgb(150, 150, 150);
  }

  .publish-entry {
    padding: 20px 30px;
    user-select: none;

    button {
      width: (@base*201);
      height: (@base*51);
      border-radius: 8px;
      font-size: 17px;
      font-weight: 600;
      margin-top: 20px;
      background-color: rgb(123, 199, 243);
      cursor: pointer;

      i {
        margin: 5px;
        //font-weight: 600;
      }

      &:hover {
        background-color: rgb(107, 196, 248);
      }
    }

    span {
      display: block;
      margin: 10px;
      line-height: 20px;
      color: rgb(126, 126, 126);
      font-size: 10px;
    }
  }
}
</style>