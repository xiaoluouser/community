<template>
  <div class="focus">
    <!-- <el-empty description="你还没有关注别人。" ></el-empty> -->
    <div class="empty">
      <img src="../images/notFocus.png" alt="" />
      <span>你还没有关注别人。</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFocus",
};
</script>

<style lang="less" scoped>
.focus {
  text-align: center;
  .empty {
    margin: 30px;
    img {
      width: 300px;
      margin: 10px;
    }
    span {
      display: block;
      color: rgb(161, 159, 159);
    }
  }
}
</style>