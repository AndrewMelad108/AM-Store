<template>
  <section class="login-page bg-white text-blue-color h-auto rounded-b-lg">
    <h1
      class="title-form text-center tracking-[-7px] italic text-5xl py-5 capitalize text-black"
    >
      log <span class="text-md text-blue-600">in</span>
    </h1>
    <form class="p-2 space-y-5 min-h-[40vh]" @submit.prevent="login()">
      <input
        type="text"
        placeholder="enter your email"
        class="placeholder:px-2 placeholder:capitalize placeholder:text-blue-color focus:outline-0 border border-blue-900 rounded-lg w-full p-2"
        v-model.trim="email"
      />
      <span v-for="(error, index) of v$.email.$errors" :key="index">
        <strong class="text-red-500 text-sm p-0 m-0"
          >*{{ error.$message }}</strong
        >
      </span>
      <input
        type="password"
        v-if="!checked"
        placeholder="enter your password"
        class="placeholder:px-2 placeholder:capitalize placeholder:text-blue-color focus:outline-0 border border-blue-900 rounded-lg w-full p-2"
        v-model.trim="password"
        show-password
      />
      <input
        type="text"
        v-else
        placeholder="enter your password"
        class="placeholder:px-2 placeholder:text-blue-color focus:outline-0 border border-blue-900 rounded-lg w-full p-2"
        v-model.trim="password"
        show-password
      />
      <span v-for="(error, index) of v$.password.$errors" :key="index">
        <strong class="text-red-500 text-sm p-0 m-0"
          >*{{ error.$message }}</strong
        >
      </span>
      <el-checkbox @change="checkedbox()" v-model="checked">{{
        checkedboxValue
      }}</el-checkbox>
      <button
        class="block bg-blue-color text-white rounded-full p-2 w-full mb-2"
      >
        login
      </button>
    </form>
  </section>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import firebase from "../../Firebase.js";
export default {
  name: "login-page",
  data() {
    return {
      checked: false,
      checkedboxValue: "show password",
      email: "",
      password: "",
      user: {},
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    checkedbox() {
      if (this.checked == true) {
        this.checkedboxValue = "hidden password";
      } else {
        this.checkedboxValue = "show password";
      }
    },
    async login() {
      this.v$.$validate(); //run function validations
      if (!this.v$.$error) {
        //dirty or invalid or error
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            console.log(userCredential.user.email);
            firebase
              .firestore()
              .collection("users")
              .where("email", "==", userCredential.user.email)
              .get()
              .then((res) => {
                res.forEach((element) => {
                  console.log(element.data().role == "admin");
                  if (element.data().role == "admin") {
                    this.$message({
                      showClose: true,
                      message: "Successfully logIn",
                    });
                    setTimeout(() => {
                      this.$router.push({
                        name: "admin",
                      });
                    }, 1000);
                    localStorage.setItem(
                      "user-info",
                      JSON.stringify({
                        name: element.data().name,
                        password: element.data().password,
                        email: element.data().email,
                        role: element.data().role,
                        id: userCredential.user.uid,
                      })
                    );
                  } else {
                    this.$message({
                      showClose: true,
                      message: "Successfully logIn",
                    });
                    localStorage.setItem(
                      "user-info",
                      JSON.stringify({
                        name: element.data().name,
                        password: element.data().password,
                        email: element.data().email,
                        role: element.data().role,
                        id: userCredential.user.uid,
                      })
                    );
                    setTimeout(() => {
                      this.$router.push({
                        name: "home",
                      });
                    }, 1000);
                  }
                });
              });
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: "Oops, this is a error to login user ....",
              type: "error",
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "Oops, this is a error to add data user ....",
          type: "error",
        });
      }
    },
  },
};
</script>

<style></style>
