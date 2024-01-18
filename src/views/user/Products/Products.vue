<template>
  <section class="product-section min-h-screen w-full bg-cover bg-center">
    <img
      src="@/assets/images/loading.gif"
      alt="loading-icon"
      v-if="loading"
      class="mx-auto w-auto"
      loading="lazy"
    />
    <div v-else>
      <header-app></header-app>
      <div
        class="products-content bg-product-page-image w-full flex min-h-[500px] pb-10"
      >
        <div
          class="sidebar lg:block md:block sm:hidden max-sm:hidden w-1/3 text-2xl px-5 pt-5 border-solid border-r-4"
        >
          <form @change="searchCategory" class="space-y-5 min-h-full">
            <el-checkbox-group v-model="checked" class="group-btn">
              <el-checkbox-button
                v-for="cat in categories"
                :label="cat.name"
                :key="cat.id"
                value="cat.name"
                class="checkbox"
                >{{ $t(cat.name) }}</el-checkbox-button
              >
            </el-checkbox-group>
          </form>
        </div>
        <div
          class="products mx-auto gap-4 content-start grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 max-sm:grid-cols-1 w-full min-h-[1000px] mb-[200px]"
        >
          <search-app
            class="lg:col-start-1 lg:col-end-5 md:col-start-1 md:col-end-4 sm:col-start-1 sm:col-end-4 max-sm:col-start-1 max-sm:col-end-2 w-[70vw] border border-blue-color my-5 p-5 mx-auto"
            @search="filterProduct($event)"
          ></search-app>
          <div
            class="product-item px-2 max-h-[300px] rounded-xl cursor-pointer"
            v-for="product in products"
            :key="product.index"
          >
            <div class="product-item py-5" @click="productInfo(product.key)">
              <img
                :src="product.image"
                alt="image-product"
                class="mx-auto max-h-[75px] rtl:max-h-[75px] hover:scale-150 transition-all duration-1000 ease-in-out"
              />
              <h1 class="productName text-blue-900 py-2 text-start">
                {{ $t(product.name) }}
              </h1>
              <p
                class="productName max-h-[30px] text-blue-color py-2 text-xs text-start"
              >
                {{ $t(product.des) }}
              </p>
              <el-rate
                disabled
                v-model="product.rate"
                class="text-xs my-5 text-slate-400 block"
                show-score
                text-color="#ff9900"
                :score-template="$t(`{ value }`)"
              >
              </el-rate>
              <div class="flex justify-between flex-wrap content-center">
                <p class="product-price text-blue-color capitalize">
                  {{ product.price }}{{ $t("$") }}
                </p>

                <p
                  class="product-price text-white bg-blue-color p-1 w-3/6 text-center rounded-md capitalize"
                >
                  {{ product.discount }}%{{ $t("offer") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer-app></footer-app>
    </div>
  </section>
</template>

<script>
import header from "@/components/user/HeaderSection.vue";
import footer from "@/components/user/Footer.vue";
import searchInput from "@/components/user/SearchInput.vue";
import firebase from "@/Firebase.js";
export default {
  name: "productSection",

  data() {
    return {
      loading: true,
      products: [],
      checked: [],
      filterProducts: [],
      categories: [],
      searchInputValue: "",
    };
  },
  components: {
    "header-app": header,
    "footer-app": footer,
    "search-app": searchInput,
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    filterProduct(value) {
      if (value !== "") {
        this.products = [];
        setTimeout(() => {
          firebase
            .firestore()
            .collection("products")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.data().productName.startsWith(value)) {
                  this.products.push({
                    key: doc.id,
                    name: doc.data().productName,
                    category: doc.data().category,
                    des: doc.data().des,
                    discount: doc.data().discount,
                    price: doc.data().price,
                    rate: doc.data().rate,
                    image: doc.data().imageUrl,
                  });
                } else {
                  console.log("erro");
                }
              });
            });
        }, 500);
      } else {
        this.products = [];
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
                des: doc.data().des,
                discount: doc.data().discount,
                price: doc.data().price,
                rate: doc.data().rate,
                image: doc.data().imageUrl,
              });
            });
          });
      }
    },
    searchCategory() {
      if (this.checked.length === 0) {
        this.products = [];
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
                des: doc.data().des,
                discount: doc.data().discount,
                price: doc.data().price,
                rate: doc.data().rate,
                image: doc.data().imageUrl,
              });
            });
          });
      } else if (this.checked.length > 1) {
        this.checked.shift();
        this.products = [];
        firebase
          .firestore()
          .collection("products")
          .where("category", "==", this.checked[0])
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
              this.products.push({
                key: doc.id,
                name: doc.data().productName,
                category: doc.data().category,
                des: doc.data().des,
                discount: doc.data().discount,
                price: doc.data().price,
                rate: doc.data().rate,
                image: doc.data().imageUrl,
              });
            });
          });
      } else {
        this.products = [];
        firebase
          .firestore()
          .collection("products")
          .where("category", "==", this.checked[0])
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
              this.products.push({
                key: doc.id,
                name: doc.data().productName,
                category: doc.data().category,
                des: doc.data().des,
                discount: doc.data().discount,
                price: doc.data().price,
                rate: doc.data().rate,
                image: doc.data().imageUrl,
              });
            });
          });
      }
    },
    productInfo(id) {
      this.$router.push({
        name: "productDescription",
        params: { productId: id },
      });
    },
  },
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
            name: doc.data().productName,
            category: doc.data().category,
            des: doc.data().des,
            discount: doc.data().discount,
            price: doc.data().price,
            rate: doc.data().rate,
            image: doc.data().imageUrl,
          });
        });
      });

    firebase
      .firestore()
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.categories.push(doc.data());
        });
      });
  },
};
</script>

<style>
.el-checkbox-button {
  display: block;
}
.el-checkbox-button > span {
  display: block !important;
  width: 100% !important;
  margin: 10px auto;
  text-align: start;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  background-color: #183661;
}
</style>
