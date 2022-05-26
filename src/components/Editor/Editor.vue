<template>
  <div>
    <myEditor id="tinymce" v-model="value" :init="init"> </myEditor>
    <div v-html="value"></div>
  </div>
</template>

<script>
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
export default {
  name: "Editor",
  components: {
    myEditor: Editor,
  },
  data() {
    return {
      value: "",
      init: {
        language_url: "/zh_CN.js", //语言类型
        skin_url: "/skins/ui/oxide", // 语言包位置，因为放在public下所以可以省略public
        selector: "#tinymce", //tinymce的id
        language: "zh_CN",
        height: 500, //编辑器高度
        branding: false, //是否禁用“Powered by TinyMCE”
      },
    };
  },
  mounted() {
    tinymce.init({});
  },
};
</script>

<style lang="less">
</style>