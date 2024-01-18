<template>
  <section
    class="card-section bg-product-page-image bg-cover bg-center text-blue-colors capitalize"
  >
    <header-app></header-app>
    <div
      class="card-content h-screen grid lg:grid-cols-5 md:grid-cols-3 py-4 max-md:grid-cols-3 max-sm:grid-cols-2 sm:grid-cols-3 max-md:gap-y-2 p-2 gap-x-2"
    >
      <div
        class="product-card h-auto content-start grid grid-cols-1"
        v-for="product in products"
        :key="product.index"
        v-show="products.length > 0"
      >
        <div
          class="product-des min-h-[300px] flex-col p-2 flex bg-black-color hover:text-black rounded-md ease-in-out duration-700"
        >
          <img
            :src="product.image"
            alt="image-product"
            class="max-h-[150px] max-w-full w-1/2 mx-auto p-2"
          />
          <div class="des w-full pl-2">
            <h1 class="text-3xl text-blue-color font-bold">
              {{ $t(product.name) }}
            </h1>
            <h3 class="">
              {{ $t("price") }}: {{ $t(product.price) }}{{ $t("$") }}
            </h3>
            <p class="capitalize">
              {{ $t("description") }} : {{ $t(product.des) }}
            </p>
            <p class=" ">{{ $t("Quantity") }}: {{ product.Quantity }}</p>
            <button
              class="btn-delete mx-auto block bg-blue-color p-2 rounded-lg capitalize text-center text-white mt-2"
              @click="deleteProductInCard(product.key)"
            >
              {{ $t("delete") }}
            </button>
          </div>
        </div>
      </div>
      <div
        v-show="products.length === 0"
        class="capitalize flex col-start-1 col-end-6 rtl:text-3xl h-screen justify-center flex-wrap content-center text-2xl text-blue-color"
      >
        {{ $t("There are no products in the cart") }}
      </div>
    </div>
    <footer-app></footer-app>
  </section>
</template>

<script>
import header from "@/components/user/HeaderSection.vue";
import footer from "@/components/user/Footer.vue";
import firebase from "@/Firebase.js";
export default {
  name: "card-section",
  data() {
    return {
      products: [],
      user: {},
    };
  },
  components: {
    "header-app": header,
    "footer-app": footer,
  },

  created() {
    this.user = localStorage.getItem("user-info");
    this.user = JSON.parse(this.user);
    if (this.user !== null) {
      firebase
        .firestore()
        .collection("card")
        .where("userID", "==", this.user.id)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            this.products.push({
              key: doc.id,
              name: doc.data().productName,
              category: doc.data().category,
              des: doc.data().des,
              Quantity: doc.data().Quantity,
              price: doc.data().price,
              image: doc.data().imageUrl,
            });
          });
        });
    }
  },
  methods: {
    deleteProductInCard(id) {
      console.log(id);
      firebase
        .firestore()
        .collection("card")
        .doc(id)
        .delete()
        .then(() => {
          window.location.reload();
        });
    },
  },
};
</script>

<style></style>
