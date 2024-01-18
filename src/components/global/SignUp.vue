<template>
  <section class="login-page bg-white h-auto rounded-b-lg">
    <h1
      class="title-form text-center tracking-[-7px] italic text-5xl py-5 capitalize text-black"
    >
      sign <span class="text-md text-blue-600">up</span>
    </h1>

    <form
      class="p-2 grid grid-cols-2 gap-y-4 text-blue-color"
      @submit.prevent="signup()"
    >
      <div class="name-field col-start-1 col-end-2 mr-2">
        <input
          type="text"
          placeholder=" firstName"
          class="placeholder:capitalize w-full placeholder:px-2 placeholder: text-slate-800 focus:outline-0 border border-blue-900 rounded-lg p-2"
          v-model.trim="firstName"
        />
        <span v-for="(error, index) of v$.firstName.$errors" :key="index">
          <strong class="text-red-500 block text-sm p-0 m-0"
            >*{{ error.$message }}</strong
          >
        </span>
      </div>
      <div class="lastName-field col-start-2 col-end-3">
        <input
          type="text"
          placeholder=" lastName"
          class="placeholder:capitalize w-full placeholder:px-2 placeholder:text-slate-500 focus:outline-0 border border-blue-900 rounded-lg p-2"
          v-model.trim="lastName"
        />
        <span v-for="(error, index) of v$.lastName.$errors" :key="index">
          <strong class="text-red-500 block text-sm p-0 m-0"
            >*{{ error.$message }}</strong
          >
        </span>
      </div>
      <input
        type="email"
        placeholder=" email"
        class="placeholder:capitalize col-start-1 col-end-3 placeholder:px-2 placeholder:text-slate-500 focus:outline-0 border border-blue-900 rounded-lg w-full p-2"
        v-model.trim="email"
      />
      <span
        v-for="(error, index) of v$.email.$errors"
        :key="index"
        v-show="v$.email.$error"
        class="text-red-500 col-start-1 col-end-5 text-sm p-0 m-0"
      >
        <strong>*{{ error.$message }}</strong>
      </span>
      <div class="city-field col-start-1 col-end-2 mr-2">
        <input
          type="text"
          placeholder=" city"
          class="placeholder:capitalize w-full placeholder:px-2 placeholder:text-slate-500 focus:outline-0 border border-blue-900 rounded-lg p-2"
          v-model.trim="city"
        />
        <span
          v-for="(error, index) of v$.city.$errors"
          class="block"
          :key="index"
        >
          <strong class="text-red-500 block text-sm p-0 m-0"
            >*{{ error.$message }}</strong
          >
        </span>
      </div>
      <div class="phone-field col-start-2 col-end-3">
        <input
          type="text"
          placeholder=" phone number"
          class="placeholder:capitalize w-full placeholder:px-2 placeholder:text-slate-500 focus:outline-0 border border-blue-900 rounded-lg p-2"
          v-model.trim="phone"
        />
        <span
          v-for="(error, index) of v$.phone.$errors"
          class="block"
          :key="index"
        >
          <strong class="text-red-500 text-sm p-0 m-0"
            >*{{ error.$message }}</strong
          >
        </span>
      </div>

      <div class="password-field col-start-1 col-end-3">
        <input
          type="password"
          v-if="!checked"
          placeholder=" password"
          class="placeholder:capitalize placeholder:px-2 placeholder:text-slate-500 focus:outline-0 border border-blue-900 rounded-lg w-full p-2"
          v-model.trim="password"
        />
        <input
          type="text"
          v-else
          placeholder=" password"
          class="placeholder:capitalize relative placeholder:px-2 placeholder:text-slate-500 focus:outline-0 border border-blue-900 rounded-lg w-full p-2"
          v-model.trim="password"
        />

        <span
          v-for="(error, index) of v$.password.$errors"
          :key="index"
          class="text-red-500 text-sm p-0 m-0"
        >
          <strong>*{{ error.$message }}</strong>
        </span>
      </div>
      <el-checkbox
        v-model="checked"
        @change="checkedbox()"
        class="col-start-1 col-end-3"
        >{{ checkedboxValue }}</el-checkbox
      >

      <button
        class="block bg-blue-color text-white rounded-full p-4 min-w-[200px] m-auto capitalize col-start-1 w-fit col-end-5 mb-2"
      >
        register
      </button>
    </form>
  </section>
</template>

<script>
import { email, required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import firebase from "@/Firebase.js";

export default {
  name: "sign-up-page",

  data() {
    return {
      checked: false,
      checkedboxValue: "show password",
      firstName: "",
      lastName: "",
      password: "",
      city: "",
      phone: "",
      email: "",
      message: "",
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      city: { required },
      phone: { required, maxLength: maxLength(11) },
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
    signup() {
      this.v$.$validate(); //run function validations
      if (!this.v$.$error) {
        //dirty or invalid or error
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((userDate) => {
            console.log(userDate);
            localStorage.setItem(
              "user-info",
              JSON.stringify({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                phone: this.phone,
                city: this.city,
                id: userDate.user.uid,
              })
            );
            firebase.firestore().collection("users").add({
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password,
              phone: this.phone,
              city: this.city,
              id: userDate.user.uid,
            });
            this.$message({
              showClose: true,
              message: "Successfully registered",
            });
            this.message = "Successfully registered";
            setTimeout(() => {
              this.$router.push({ name: "home" });
            }, 1000);
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: "Oops, this is a error to add user ....",
              type: "error",
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "Oops, this is a error to add user data ....",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: red !important;
}
.el-checkbox__label {
  display: block;
  width: 100%;
  padding-left: 10px;
  line-height: 19px;
  font-size: 20px !important;
}
</style>
