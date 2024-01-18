<template>
  <div
    id="app"
    :dir="direction"
    class="p-0 m-0 box-border selection:text-yellow-400 selection:bg-blue-color"
  >
    <router-view />
    <el-backtop :bottom="100">
      <div class=" ">UP</div>
    </el-backtop>
  </div>
</template>
<script>
export default {
  data: () => {
    const lang = localStorage.getItem("len") || "en";
    return {
      direction: "",
      lang,
    };
  },
  mounted() {
    if (this.lang === "en") {
      this.direction = "lft";
    } else {
      this.direction = "rtl";
    }
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Signika&display=swap");
#app {
  font-family: "Signika", sans-serif;
}
</style>
