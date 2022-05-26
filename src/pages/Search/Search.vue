<template>
  <!-- 中间的内容区 -->
  <div class="middle-content">{{ showValue }}</div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      showValue: "",
    };
  },
};
</script>

<style lang="less" scoped>
@base: 1px/1.25;
//中间的内容区
.middle-content {
  width: (@base*1000);
  height: 1000px;
  margin: (@base*40) auto;
  background-color: #fff;
  border-radius: 10px;
}
</style>