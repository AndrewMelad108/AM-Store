<template>
  <header class="w-full">
    <div
      class="header-social max-md:hidden p-2 bg-head-color flex justify-around content-baseline"
    >
      <div
        class="call-me flex space-x-2 w-1/3 flex-wrap content-baseline justify-center"
      >
        <img src="@/assets/images/call.png" alt="call-icons" loading="lazy" />
        <a href="https://api.whatsapp.com/send?phone=01210673776">
          {{ $t("call-us:0121-067-3776") }}</a
        >
      </div>
      <div class="social-links w-1/3">
        <ul class="flex space-x-2 justify-center">
          <li class="bg-slate-400 p-1 rounded-full">
            <img
              src="@/assets/images/call.png"
              alt="call-icons"
              loading="lazy"
            />
          </li>
          <li
            class="bg-slate-400 p-1 flex flex-wrap justify-center content-center rounded-full"
          >
            <img
              src="@/assets/images/shopping.png"
              class="max-w-[15px]"
              alt="call-icons"
              loading="lazy"
            />
          </li>
          <li
            class="bg-slate-400 p-1 flex flex-wrap justify-center content-center rounded-full"
          >
            <img
              src="@/assets/images/email.png"
              alt="call-icons"
              loading="lazy"
            />
          </li>
        </ul>
      </div>
      <div class="work-hour w-1/3 flex justify-center content-center">
        <select
          v-model="lang"
          class="w-28 p-1 text-sm bg-transparent capitalize ml-4"
          @change="changeLen($event)"
        >
          <option value="en" class="foucs:bg-transparent text-amber-400">
            {{ $t("english") }}
          </option>
          <option value="ar" class="bg-transparent">
            {{ $t("arabic") }}
          </option>
        </select>

        <p class="text-[15px] max-md:text-md">
          {{ $t("Open hour: 8.00 - 18.00") }}
        </p>
      </div>
    </div>
    <div
      class="header-info p-10 max-sm:p-4 flex max-md:flex max-md:justify-around"
    >
      <div
        class="email-info max-md:hidden flex flex-wrap justify-center content-baseline w-3/6"
      >
        <img
          src="@/assets/images/email.png"
          alt="email-icon"
          class="w-auto self-center max-h-auto h-[15px]"
          loading="lazy"
        />
        <p class="email-title text-xs md:text-sm">andrewmelad108@gmail.com</p>
      </div>
      <p
        class="logo-page cursor-pointer w-1/6 text-center max-sm:w-1/2 sm:w-1/2 font-bold text-2xl"
      >
        <span class="text-yellow-400"> AM</span> store
      </p>
      <div
        class="cart flex justify-center flex-wrap content-start space-x-1 w-2/6 sm:w-1/2 max-sm:w-1/2"
      >
        <router-link
          :to="{
            name: 'orderList',
          }"
        >
          <i
            v-if="user !== null"
            class="order-info el-icon-s-order text-3xl text-blue-color h-fit cursor-pointer"
          ></i>
        </router-link>
        <router-link
          class="flex justify-center flex-warp content-center"
          :to="{
            name: 'addToCard',
          }"
        >
          <img
            src="@/assets/images/shopping.png"
            alt="shopping-icon"
            class="self-start h-fit w-fit cursor-pointer"
            loading="lazy"
          />
          <span
            class="counter-product h-fit relative right-2 rtl:right-[-10px] top-1 px-1 text-white bg-black text-xs rounded-full"
            >{{ counter }}</span
          ></router-link
        >
        <router-link
          :to="{ name: 'order' }"
          class="order-btn block lg:text-[18px] capitalize text-center text-white bg-blue-color rounded-full md:w-[150px] max-sm:text-xs max-sm:m-h-[20px] max-sm:p-1 max-md:p-2 max-sm:self-center max-sm:w-auto sm:w-auto max-md:w-[250px] w-[150px] lg:w-[150px]"
        >
          {{ $t("order now") }}
        </router-link>
      </div>
    </div>
    <div
      class="header-links max-md:p-5 max-md:max-h-auto max-md:flex max-md:justify-around max-sm:justify-between sm:justify-between flex flex-wrap justify-between content-center uppercase bg-blue-color text-white h-[100px] lg:pl-28 lg:pr-20 max-lg:pl-16 max-lg:pr-14 md:pr-2 md:pl-2"
    >
      <h1
        class="logo cursor-pointer px-5 max-md:px-5 self-center max-md:w-fit font-bold text-2xl"
      >
        <span class="text-yellow-400"> AM</span> store
      </h1>
      <div
        class="links max-md:hidden md:text-md pl-20 md:pl-0 flex flex-wrap content-center justify-end space-x-20 md:space-x-14 max-md:space-x-10 h-[100%] min-w-[800px] md:min-w-[500px]"
      >
        <router-link
          class="px-4 md:px-1 hover:bg-amber-500 h-[100%]"
          v-if="user !== null"
          :to="{
            name: 'home',
          }"
          ><span class="block mt-10">{{ $t("home") }}</span></router-link
        >

        <router-link
          class="px-4 md:px-1 hover:bg-amber-500 h-[100%]"
          v-if="user !== null"
          :to="{
            name: 'products',
          }"
          ><span class="block mt-10 rtl:mr-4">{{
            $t("products")
          }}</span></router-link
        >

        <router-link
          class="px-4 md:px-1 hover:bg-amber-500 h-[100%]"
          v-if="user !== null"
          :to="{
            name: 'contact',
          }"
          ><span class="block mt-10">{{ $t("contact-us") }}</span></router-link
        >
        <a
          class="px-4 md:px-1 hover:bg-amber-500 h-[100%] cursor-pointer"
          v-if="user !== null"
          ><span class="block mt-10" v-on:click="logout()">{{
            $t("logout")
          }}</span></a
        >
        <router-link
          v-if="user == null"
          :to="{
            name: 'login',
          }"
          class="px-4 md:px-1 hover:bg-amber-500 h-[100%] cursor-pointer"
          ><span class="block mt-10" v-on:click="logout()">{{
            $t("login")
          }}</span></router-link
        >
        <router-link
          v-if="user == null"
          :to="{
            name: 'register',
          }"
          class="px-4 md:px-1 hover:bg-amber-500 h-[100%] cursor-pointer"
          ><span class="block mt-10" v-on:click="logout()">{{
            $t("register")
          }}</span></router-link
        >
      </div>
      <div class="header-phone lg:hidden md:hidden max-md:w-fit">
        <img
          src="@/assets/images/toggle-icon.png"
          alt="menu-icon"
          class="h-[30px] cursor-pointer w-fit"
          @click="show = !show"
          loading="lazy"
        />

        <div
          v-if="show"
          class="drop-menu space-x-1 bg-[#183661] w-[90%] mx-auto shadow-black rounded-md absolute right-5 p-5"
        >
          <router-link
            class="hover:bg-amber-500"
            v-if="user !== null"
            :to="{
              name: 'home',
            }"
            ><span
              class="block w-fit ml-auto my-2 font-bold hover:pr-5 hover:text-yellow-400 transition-all duration-1000 ease-in-out"
              >{{ $t("home") }}</span
            ></router-link
          >

          <router-link
            class="hover:bg-amber-500"
            v-if="user !== null"
            :to="{
              name: 'products',
            }"
            ><span
              class="block w-fit ml-auto my-2 font-bold hover:pr-5 hover:text-yellow-400 transition-all duration-1000 ease-in-out"
              >{{ $t("products") }}</span
            ></router-link
          >

          <router-link
            class="hover:bg-amber-500"
            v-if="user !== null"
            :to="{
              name: 'contact',
            }"
            ><span
              class="block w-fit ml-auto my-2 font-bold hover:pr-5 hover:text-yellow-400 transition-all duration-1000 ease-in-out"
              >{{ $t("contact-us") }}</span
            ></router-link
          >
          <a class="hover:bg-amber-500 cursor-pointer" v-if="user !== null"
            ><span
              class="block w-fit ml-auto my-2 font-bold hover:pr-5 hover:text-yellow-400 transition-all duration-1000 ease-in-out"
              v-on:click="logout()"
              >{{ $t("logout") }}</span
            ></a
          >
          <router-link
            v-if="user == null"
            :to="{
              name: 'login',
            }"
            class="hover:bg-amber-500 cursor-pointer"
            ><span
              class="block w-fit ml-auto my-2 font-bold hover:pr-5 hover:text-yellow-400 transition-all duration-1000 ease-in-out"
              v-on:click="logout()"
              >{{ $t("login") }}</span
            ></router-link
          >
          <router-link
            v-if="user == null"
            :to="{
              name: 'register',
            }"
            class="hover:bg-amber-500 cursor-pointer"
            ><span
              class="block w-fit ml-auto my-2 font-bold hover:pr-5 hover:text-yellow-400 transition-all duration-1000 ease-in-out"
              >{{ $t("register") }}</span
            ></router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from "../../Firebase.js";
import "firebase/auth";
export default {
  name: "Header-comp",
  props: {
    languages: {
      type: String,
    },
  },
  data() {
    const len = localStorage.getItem("len") || "en";
    return {
      lang: len,
      show: false,
      user: {},
      counter: 0,
    };
  },
  computed: {},
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
    if (this.user !== null) {
      firebase
        .firestore()
        .collection("card")
        .where("userID", "==", this.user.id)
        .onSnapshot((va) => {
          console.log(va.docs);
          this.counter = va.docs.length;
        });
    }
  },
  methods: {
    changeLen(event) {
      localStorage.setItem("len", event.target.value);
      window.location.reload();
    },
    logout() {
      localStorage.clear();

      setTimeout(() => {
        this.$router.push({
          name: "account",
        });
      }, 1000);
    },
  },
};
</script>

<style></style>
