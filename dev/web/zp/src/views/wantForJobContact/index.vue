/*
 * @Author: liuyr 
 * 求职联系页面
 * @Date: 2019-12-23 20:59:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-24 15:00:24
 */
<template>
  <div id="wantForJobConcat">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="求职列表" name="job"></el-tab-pane>
    </el-tabs>
    <!-- 选项卡体部 -->
    <div class="tbl-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "wantForJobContcat",
  data() {
    return {
      activeName: "job"
    };
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/wantForJobContcat/index/" + tab.name);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
