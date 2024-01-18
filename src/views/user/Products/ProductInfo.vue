<template>
  <section
    class="product bg-product-page-image bg-cover bg-center h-screen"
    v-if="product !== null"
  >
    <div
      v-if="showImage"
      @click="showImage = !showImage"
      class="image-model cursor-pointer flex flex-col bg-black-color w-full h-[100vh] min-h-[1500px] absolute z-40"
    >
      <i
        @click="showImage = !showImage"
        class="el-icon-close block w-fit p-2 text-3xl text-black cursor-pointer font-bold hover:bg-black m-10 rounded-md transition-all duration-1000 ease-in-out hover:text-white"
      ></i>
      <div class="image mt-[20%]">
        <img
          :src="product.imageUrl"
          alt="image-product"
          class="mx-auto h-[30vw]"
        />
      </div>
    </div>
    <header-app></header-app>
    <div
      class="product-content grid grid-cols-3 max-sm:grid-cols-1 content-start"
    >
      <div class="product-image self-center max-sm:col-span-2">
        <img
          :src="product.imageUrl"
          alt="image-product"
          class="mx-auto min-h-[200px] cursor-pointer"
          @click="showImage = !showImage"
        />
      </div>

      <div
        class="product-description pl-10 max-sm:pl-5 max-sm:pr-5 capitalize text-lg py-10 col-start-2 col-end-4 max-sm:col-start-1 max-sm:col-end-2"
      >
        <h1 class="capitalize text-start text-3xl">
          {{ $t(product.productName) }}
        </h1>
        <el-rate
          disabled
          v-model="product.rate"
          show-score
          text-color="#183661"
          score-template="{value} points"
          class="text-start"
        >
        </el-rate>
        <hr class="w-[80%] my-2" />
        <p class="mb-5 text-3xl">
          {{ $t(product.price) }}
          <span class="text-sm">{{ $t("dollar") }}</span>
        </p>
        <span class="block capitalize text-md text-blue-color mb-4">
          {{ $t("free return") }}
        </span>
        <p class="capitalize">{{ $t("prices include VAT") }}</p>
        <div class="grid grid-cols-4 my-5 w-[70%]">
          <div class="text-center p-2 space-y-2 cursor-pointer">
            <i
              class="el-icon-shopping-cart-full text-2xl text-blue-900 hover:text-yellow-500"
            ></i>
            <p
              class="serves-des text-xs capitalize text-blue-color hover:text-yellow-500"
            >
              {{ $t("Cash on Delivery") }}
            </p>
          </div>
          <div class="text-center p-2 space-y-2 cursor-pointer">
            <i
              class="el-icon-refresh text-2xl text-blue-900 hover:text-yellow-500"
            ></i>
            <p
              class="serves-des text-xs capitalize text-blue-color hover:text-yellow-500"
            >
              {{ $t("15 days Returnable") }}
            </p>
          </div>
          <div class="text-center p-2 space-y-2 cursor-pointer">
            <i
              class="el-icon-box text-2xl text-blue-900 hover:text-yellow-500"
            ></i>
            <p
              class="serves-des text-xs capitalize text-blue-color hover:text-yellow-500"
            >
              {{ $t("Fulfilled by AM Store") }}
            </p>
          </div>
          <div class="text-center p-2 space-y-2 cursor-pointer">
            <i
              class="el-icon-lock text-2xl text-blue-900 hover:text-yellow-500"
            ></i>
            <p
              class="serves-des text-xs capitalize text-blue-color hover:text-yellow-500"
            >
              {{ $t("Secure transaction") }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 max-sm:grid-cols-1">
          <el-input-number
            size="medium"
            v-model="Quantity"
            class="input-number"
            placeholder="product Quantity"
          ></el-input-number>

          <el-select
            v-model="value"
            clearable
            :placeholder="$t('product size')"
            class="select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="summary space-y-4">
          <h3 class="my-2 capitalize text-blue-color font-bold text-2xl">
            {{ $t("summary product") }}
          </h3>
          <hr class="w-[80%] my-2" />
          <span
            class="capitalize inline-block mr-4 font-bold text-blue-color"
            >{{ $t("description") }}</span
          >
          <p class="product-des text-start">
            {{ $t(product.des) }}
          </p>
          <span
            class="capitalize inline-block mr-4 font-bold text-blue-color"
            >{{ $t("Offer") }}</span
          >
          <p class="product-des text-start">
            {{ $t(product.discount) }}% {{ $t("of the base product price") }}
          </p>
        </div>
        <div
          class="group-btn grid grid-cols-2-auto max-sm:grid-cols-1 max-sm:space-y-3 mt-10 justify-around capitalize"
        >
          <button
            :plain="true"
            class="bg-white text-center text-blue-color border border-blue-color rounded-xl p-4 min-w-[150px] max-sm:text-sm max-sm:w-[100px] max-sm:mx-auto"
            @click="addToCart"
          >
            {{ $t("addtocard") }}
          </button>
          <router-link
            :to="{
              name: 'products',
            }"
            class="bg-blue-color text-center text-white rounded-xl max-sm:text-sm max-sm:w-[100px] max-sm:mx-auto p-4 min-w-[150px]"
            >{{ $t("back") }}</router-link
          >
        </div>
      </div>
    </div>
    <footer-app></footer-app>
  </section>
</template>

<script>
import firebase from "@/Firebase.js";
import header from "@/components/user/HeaderSection.vue";
import footer from "@/components/user/Footer.vue";
import { mapState, mapMutations } from "vuex"; // component vuex
export default {
  name: "productDescription",
  data() {
    return {
      showImage: false,
      productId: this.$route.params.productId,
      Quantity: null,
      options: [
        {
          value: "l",
          label: "l",
        },
        {
          value: "xl",
          label: "xl",
        },
        {
          value: "xxl",
          label: "xxl",
        },
        {
          value: "sm",
          label: "sm",
        },
        {
          value: "medium",
          label: "medium",
        },
      ],
      value: "",
      product: {},
      user: {},
    };
  },
  components: {
    "header-app": header,
    "footer-app": footer,
  },
  computed: {
    ...mapState(["conter"]),
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));

    firebase
      .firestore()
      .collection("products")
      .doc(this.productId)
      .onSnapshot((doc) => {
        console.log(doc);
        this.product = doc.data();
      });
  },
  methods: {
    ...mapMutations(["increaseCounter"]),

    addToCart() {
      if (this.Quantity !== "" && this.value !== "") {
        firebase
          .firestore()
          .collection("card")
          .add({
            ...this.product,
            Quantity: this.Quantity,
            size: this.value,
            userID: this.user.id,
          })
          .then(() => {
            this.increaseCounter();
            setTimeout(() => {
              this.$router.push({ name: "products" });
            }, 1000);
            this.$message({
              showClose: true,
              message: "Congrats,Product added successfully",
            });
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: "Oops, There is a problem adding the product",
              type: "error",
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "Oops, There is a problem size or Quantity  the product",
          type: "error",
        });
      }
    },
  },
};
</script>

<style>
.input-number {
  margin-right: auto;
}
.select {
  width: 50%;
  display: inline-block;
}
.select,
.input-number {
  margin: 20px 0;
}
</style>
