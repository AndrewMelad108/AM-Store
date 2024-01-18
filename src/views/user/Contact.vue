<template>
  <section class="contact-us min-h-screen">
    <header-app></header-app>
    <div
      class="contact-content px-20 max-sm:px-5 p-2 bg-no-repeat bg-intro-page-image mb-20"
    >
      <form
        @submit.prevent="contact()"
        class="grid grid-cols-2 max-sm:grid-cols-1 space-y-12 justify-between content-start gap-x-4 h-auto w-full p-5 rounded-lg"
      >
        <i
          class="el-icon-headset col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2 text-7xl mt-5 font-bold text-center block mx-auto w-full"
        ></i>
        <h1
          class="text-blue-800 text-center col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2 text-5xl my-10 capitalize tracking-tighter"
        >
          {{ $t("contact-us") }}
        </h1>
        <div class="name-input-field">
          <input
            type="text"
            :placeholder="$t('Enter your name')"
            class="p-2 w-full rounded-lg placeholder:capitalize bg-transparent border border-blue-color placeholder:text-blue-color focus:outline-0"
            v-model.trim="name"
          />
          <span v-for="(error, index) of v$.name.$errors" :key="index">
            <strong class="text-red-500 text-sm p-0 m-0"
              >*{{ error.$message }}</strong
            ></span
          >
        </div>
        <div class="email-input-field">
          <input
            type="email"
            :placeholder="$t('Enter your email')"
            class="p-2 w-full rounded-lg placeholder:capitalize bg-transparent border border-blue-color placeholder:text-blue-color focus:outline-0"
            v-model.trim="email"
          />
          <span v-for="(error, index) of v$.email.$errors" :key="index">
            <strong class="text-red-500 text-sm p-0 m-0"
              >*{{ error.$message }}</strong
            ></span
          >
        </div>

        <div
          class="comment-input-field col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2"
        >
          <textarea
            cols="20"
            :placeholder="$t('enter any comment .....')"
            v-model.trim="comment"
            rows="3"
            class="w-full p-2 my-2 resize-none rounded-lg placeholder:capitalize bg-transparent border border-blue-color placeholder:text-blue-color focus:outline-0"
          ></textarea>
          <span v-for="(error, index) of v$.comment.$errors" :key="index">
            <strong class="text-red-500 text-sm p-0 m-0"
              >*{{ error.$message }}</strong
            ></span
          >
        </div>

        <button
          class="text-2xl w-fit mx-auto px-12 col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2 capitalize my-4 bg-blue-color p-5 rounded-lg text-white font-bold hover:bg-black hover:text-blue-700 transition duration-700 ease-in-out"
        >
          {{ $t("send") }}
        </button>
      </form>
    </div>
    <footer-app></footer-app>
  </section>
</template>

<script>
import header from "@/components/user/HeaderSection.vue";
import footer from "@/components/user/Footer.vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import firebase from "@/Firebase.js";
export default {
  name: "contact-us",
  data() {
    return { name: "", comment: "", email: "", user: {} };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      name: { required },
      email: { required, email },
      comment: {},
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
  },
  components: {
    "header-app": header,
    "footer-app": footer,
  },
  methods: {
    contact() {
      this.v$.$validate(); //run function validations
      if (!this.v$.$error) {
        firebase.firestore().collection("contact-us").add({
          name: this.name,
          comment: this.comment,
          email: this.email,
          userID: this.user.id,
        });
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 3000);
      } else {
        this.$message({
          showClose: true,
          message: "Oops, There is a problem with the data ",
          type: "error",
        });
      }
    },
  },
};
</script>

<style></style>
