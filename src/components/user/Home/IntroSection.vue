<template>
  <div
    class="intro-section bg-intro-page-image bg-no-repeat min-h-[600px] grid grid-cols-2-auto max-md:grid-cols-1 lg:px-32 md:px-5 max-md:px-5 sm:px-5 max-sm:px-5 content-center py-10"
  >
    <div class="intro-des space-y-4">
      <h2 class="text-blue-color text-[85px] max-md:text-[40px] font-bold">
        Romofyi
      </h2>
      <h1 class="text-amber-400 text-[116px] max-md:text-[50px]">
        Trands 2023
      </h1>
      <p class="text-blue-color text-[33px] max-md:text-[20px] max-sm:text-sm">
        {{ $t("A huge fashion collection for ever") }}
      </p>
      <router-link
        :to="{ name: 'products' }"
        class="bg-blue-700 w-[150px] mt-10 block text-center max-md:text-sm py-4 rounded-full uppercase text-white"
      >
        {{ $t("shop now") }}
      </router-link>
    </div>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/e-comerce-f9e20.appspot.com/o/products%2Fimages%2Fshoes6.png?alt=media&token=6d46df4c-c10a-49f3-ae7e-f0806318cabc"
      alt=""
      class="h-[300px] w-auto max-md:mx-auto"
      loading="lazy"
    />
  </div>
</template>

<script>
export default {
  name: "IntroSection",
};
</script>

<style></style>
