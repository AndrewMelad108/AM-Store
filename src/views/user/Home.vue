<template>
  <section class="home-page">
    <img
      src="@/assets/images/loading.gif"
      alt="loading-icon"
      v-if="loading"
      class="mx-auto"
    />
    <div v-else>
      <header-app></header-app>
      <div class="home-content max-h-[20000px]">
        <intro-app></intro-app>
        <ProductFeature-app></ProductFeature-app>
        <Fashion-app></Fashion-app>
      </div>
      <footer-app></footer-app>
    </div>
  </section>
</template>

<script>
import header from "@/components/user/HeaderSection.vue";
import footer from "@/components/user/Footer.vue";
import IntroSection from "@/components/user/Home/IntroSection.vue";
import ProductFeature from "@/components/user/Home/ProductFeature.vue";
import fashion from "@/components/user/Home/Fashion.vue";

export default {
  name: "Home-page",
  data: () => {
    return {
      loading: true,
      user: {},
    };
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },

  components: {
    "header-app": header,
    "footer-app": footer,
    "intro-app": IntroSection,
    "ProductFeature-app": ProductFeature,
    "Fashion-app": fashion,
  },
  methods: {},
};
</script>
