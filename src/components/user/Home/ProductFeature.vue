<template>
  <section
    class="ProductFeature bg-product-page-image mt-4 px-32 max-md:px-10 max-sm:px-5 min-h-screen"
  >
    <h1 class="title-section capitalize font-bold text-3xl pt-20">
      {{ $t("Featured Products") }}
    </h1>
    <span class="line block mt-2 w-full h-1 bg-amber-400"></span>
    <div
      class="grid xl:grid-cols-4 lg:grid-cols-3 max-md:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-1"
    >
      <div
        class="product-item max-h-[300px] min-h-[200px] space-y-5 p-5 rounded-xl cursor-pointer"
        v-for="product in products"
        :key="product.id"
        v-show="products.length > 0"
      >
        <img
          :src="product.imageUrl"
          alt="image-product"
          class="mx-auto max-h-[100px]"
          loading="lazy"
        />
        <h1 class="productName text-blue-color text-center">
          {{ product.productName }}
        </h1>
        <el-rate
          disabled
          v-model="product.rate"
          show-score
          text-color="#183661"
          score-template="{value} points"
          class="text-center my-5"
        >
        </el-rate>
        <div class="flex justify-between flex-wrap content-center">
          <p class="product-price text-blue-color capitalize">
            {{ product.price }}$
          </p>

          <p
            class="product-price text-white bg-blue-color p-1 w-3/6 text-center rounded-md capitalize"
          >
            {{ $t(product.discount) }}% {{ $t("offer") }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="capitalize h-screen flex flex-wrap justify-center content-center"
      v-show="products.length === 0"
    >
      no product
    </div>
  </section>
</template>

<script>
import firebase from "@/Firebase.js";
export default {
  name: "ProductFeature",
  data() {
    return {
      products: [],
    };
  },
  methods: {},
  created() {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          this.products.push({
            key: doc.id,
            name: doc.data().name,
            rate: doc.data().rate,
            discount: doc.data().discount,
            price: doc.data().price,
            imageUrl: doc.data().imageUrl,
          });
        });
      });
  },
};
</script>

<style></style>
