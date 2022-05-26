<template>
  <!-- 中间的内容区 -->
  <div class="middle-content-area">
    <Carousel></Carousel>
    <Publish></Publish>
    <Announcement></Announcement>
    <ShowIformation></ShowIformation>
  </div>
</template>

<script>
import Carousel from "./Carousel/Carousel.vue";
import Publish from "./Publish/Publish.vue";
import Announcement from "./Announcement/Announcement.vue";
import ShowIformation from "./ShowIformation/ShowIformation.vue";
export default {
  name: "Home",
  components: {
    Carousel,
    Publish,
    Announcement,
    ShowIformation,
  },
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;
//中间的内容区
.middle-content-area {
  width: (@base*1266);
  margin: (@base*40) auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>