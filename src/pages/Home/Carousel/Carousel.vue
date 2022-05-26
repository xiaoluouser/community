<template>
  <!-- 轮播图 -->
  <div class="carousel">
    <el-carousel :interval="3000" type="card" height="200px" trigger="click">
      <el-carousel-item v-for="(item, index) in carousel_img" :key="index">
        <img :src="item" alt="轮播图" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { carousel } from "@/api/index.js";
export default {
  name: "Carousel",
  data() {
    return {
      carousel_img: [],
    };
  },
  mounted() {
    carousel().then((res) => {
      this.carousel_img = res.data;
    });
  },
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;

//轮播图
.carousel {
  width: 700px;
  height: 258px;
  overflow: hidden;

  .el-carousel {
    z-index: 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
}
</style>