<template>
  <section class="order-info">
    <header-app></header-app>
    <div class="m-4 flex justify-end">
      <router-link :to="{ name: 'orderList' }">
        <i
          class="el-icon-arrow-left text-white p-4 bg-blue-color rounded-full cursor-pointer w-fit"
        ></i>
      </router-link>
    </div>
    <div class="order-content h-screen w-full p-4">
      <el-row>
        <el-col
          class=""
          :span="6"
          v-for="item in orderInfo.productsOrder"
          :key="item.index"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="item.imagUrl"
              class="productImage mx-auto h-[100px] text-blue-color"
            />
            <div style="padding: 14px" class="space-y-2 text-md">
              <h1 class="text-lg capitalize">
                {{ $t("name") }}: {{ $t(item.name) }}
              </h1>
              <h4 class="text-md capitalize">
                {{ $t("Quantity") }}:{{ $t(item.Quantity) }}
              </h4>
              <h4 class="text-sm capitalize">
                {{ $t("price") }}:{{ $t(item.price) }}$
              </h4>
              <h6 class="text-xs capitalize">
                {{ $t("totalprice") }} : {{ orderInfo.totalprice }}
                {{ $t("$") }}
              </h6>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <footer-app></footer-app>
  </section>
</template>

<script>
import header from "@/components/user/HeaderSection.vue";
import footer from "@/components/user/Footer.vue";
import firebase from "@/Firebase.js";
export default {
  name: "orderInfo",
  data() {
    return {
      orderID: this.$route.params.orderID,
      orderInfo: {},
      user: {},
    };
  },
  components: {
    "header-app": header,
    "footer-app": footer,
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
    if (this.orderID !== null && this.user !== null) {
      firebase
        .firestore()
        .collection("orders")
        .doc(this.orderID)

        .get()
        .then((res) => {
          this.orderInfo = res.data();
        });
    }
  },
};
</script>

<style></style>
