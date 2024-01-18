<template>
  <section
    class="form-page bg-intro-page-image h-screen w-full bg-cover bg-center flex flex-wrap justify-center content-center"
  >
    <div
      class="forms bg-blue-color min-h-[50vh] max-sm:mx-2 p-5 text-white rounded-lg"
    >
      <div class="group-btn capitalize">
        <button
          @click="show = true"
          class="focus:bg-slate-100 focus:text-blue-color w-1/2 rounded-t-lg py-2"
        >
          login
        </button>
        <button
          @click="show = false"
          class="focus:bg-slate-100 focus:text-blue-color w-1/2 rounded-t-lg py-2"
        >
          signup
        </button>
      </div>
      <div class="min-w-1/2">
        <login-form v-if="show"></login-form>
        <sign-form v-else></sign-form>
      </div>
    </div>
  </section>
</template>

<script>
import loginPage from "@/components/global/Login.vue";
import signUp from "@/components/global/SignUp.vue";

export default {
  name: "FormPage",

  data() {
    return {
      show: true,
    };
  },
  components: {
    "login-form": loginPage,
    "sign-form": signUp,
  },
};
</script>

<style></style>
