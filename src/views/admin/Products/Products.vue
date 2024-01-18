<template>
  <section class="p-4">
    <img
      src="@/assets/images/loading.gif"
      alt="loading-icon"
      v-if="loading"
      class="mx-auto"
    />
    <div v-else>
      <router-link :to="{ name: 'addProducts' }">
        <i
          class="el-icon-plus cursor-pointer text-3xl bg-blue-color p-2 text-white block w-fit float-right rounded-full"
        ></i
      ></router-link>
      <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 max-md:grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-2"
      >
        <div
          class="product-item max-h-[300px] min-h-[200px] space-y-5 p-5 rounded-xl cursor-pointer"
          v-for="product in products"
          :key="product.id"
          v-show="products.length > 0"
        >
          <img
            :src="product.image"
            alt="image-product"
            class="mx-auto max-h-[100px]"
            loading="lazy"
          />

          <h1 class="productName text-blue-color text-center">
            {{ product.name }}
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
              {{ product.discount }}% offer
            </p>
          </div>
          <div class="btn-group flex justify-around my-7">
            <router-link
              class="capitalize bg-blue-color p-2 rounded-md w-20 text-white cursor-pointer text-center"
              :to="{
                name: 'editProducts',
                params: {
                  productID: product.key,
                },
              }"
            >
              edit
            </router-link>
            <button
              class="capitalize bg-blue-color p-2 rounded-md w-20 text-white cursor-pointer text-center"
              @click="deleteProduct(product.key)"
            >
              delete
            </button>
          </div>
        </div>
      </div>
      <div
        class="capitalize h-screen flex flex-wrap justify-center content-center"
        v-show="products.length === 0"
      >
        no product
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "@/Firebase.js";
export default {
  name: "products-section",
  data() {
    return {
      products: [],
      user: {},
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
    if (this.user !== null) {
      firebase
        .firestore()
        .collection("products")
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            this.products.push({
              key: doc.id,
              name: doc.data().productName,
              category: doc.data().category,
              des: doc.data.des,
              discount: doc.data().discount,
              price: doc.data().price,
              rate: doc.data().rate,
              image: doc.data().imageUrl,
            });
          });
        });
    }
  },
  methods: {
    deleteProduct(id) {
      console.log(id);
      firebase
        .firestore()
        .collection("products")
        .doc(id)
        .delete()
        .then(() => {
          window.location.reload();
          console.log("delete product");
        });
    },
  },
};
</script>

<style></style>
