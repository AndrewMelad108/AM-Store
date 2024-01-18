<template>
  <section class="search-input">
    <input
      type="search"
      :placeholder="$t('search any product in watchs or headphoe ......')"
      class="w-full placeholder:text-blue-color placeholder:capitalize border-0 outline-0"
      v-model="result"
    />
  </section>
</template>

<script>
export default {
  name: "search-input",
  data() {
    return {
      result: "",
    };
  },
  watch: {
    result: function () {
      // Emit this information to the parents component
      setTimeout(() => {
        this.$emit("search", this.result);
      }, 1000);
    },
  },
};
</script>

<style></style>
