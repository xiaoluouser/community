<template>
  <!-- 底部 -->
  <div class="footer">
    <ul class="footer-content">
      <li>
        <h3>标题</h3>
        <p><a href="javascript:;">关于我们</a></p>
        <p><a href="javascript:;">关于我们</a></p>
        <p><a href="javascript:;">关于我们</a></p>
      </li>
      <li>
        <h3>标题</h3>
        <p><a href="javascript:;">服务与支持</a></p>
        <p><a href="javascript:;">服务与支持</a></p>
        <p><a href="javascript:;">服务与支持</a></p>
      </li>
      <li>
        <h3>标题</h3>
        <p><a href="javascript:;">联系我们</a></p>
        <p><a href="javascript:;">联系我们</a></p>
        <p><a href="javascript:;">联系我们</a></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Footer'
};
</script>

<style lang="less" scoped>
//底部
.footer {
  background-color: rgb(36, 36, 36);
  display: flex;
  margin-top: 100px;
  padding: 100px 400px 300px 200px;
  justify-content: space-between;
  user-select: none;
  position: relative;
  .footer-content {
    display: flex;
    width: 1000px;
    justify-content: space-between;
    border-bottom: 1px rgb(105, 105, 105) solid;
    padding-bottom: 80px;

    li {
      width: 200px;

      h3 {
        color: #fff;
        font-family: OPPOSans-Regular, PingFang SC, Microsoft YaHei,
          Helvetica Neue, Helvetica, Arial;
      }

      p {
        margin-top: 20px;
        letter-spacing: 5px;

        a {
          color: rgb(167, 167, 167);
          font-family: OPPOSans-Regular, PingFang SC, Microsoft YaHei,
            Helvetica Neue, Helvetica, Arial;
          //font-weight: 400;
          font-size: 14px;
        }
      }
    }
  }
}
</style>