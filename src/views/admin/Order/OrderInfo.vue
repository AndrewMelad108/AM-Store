<template>
  <section class="orderInfo p-4 capitalize to-blue-color">
    <h1 class="title text-start text-3xl">order Info</h1>
    <div
      class="content mt-20 border h-auto w-full p-2 grid grid-cols-2 gap-9"
      v-for="order in orderInfo"
      :key="order.id"
    >
      <p class="orderOwner p-2">orderOwner: {{ order.name }}</p>
      <p class="orderOwner p-2">place: {{ order.city }}</p>
      <p class="orderOwner p-2">phone: {{ order.phone }}</p>
      <p class="orderOwner p-2">address: {{ order.address }}</p>
      <p class="orderOwner p-2 col-start-1 col-end-3 text-center">
        totalprice: {{ order.totalprice }}$
      </p>
      <div class="products p-2 col-start-1 col-end-3">
        <el-row>
          <el-col
            :span="12"
            v-for="product in order.productsOrder"
            :key="product.index"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img :src="product.imagUrl" class="image" />
              <div style="padding: 14px">
                <div class="bottom space-y-3 clearfix">
                  <h1 class="name">{{ product.name }}</h1>
                  <h3 class="price">{{ product.price }} $</h3>
                  <h6 class="Quantity">{{ product.Quantity }} piece</h6>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="group-btn p-4 my-10 grid grid-cols-2">
          <button
            @click="DeleteOrder()"
            class="bg-blue-color transition duration-700 ease-in-out p-2 capitalize w-[20vw] rounded-full text-slate-300 font-bold cursor-pointer"
          >
            delete
          </button>
          <router-link
            tag="button"
            :to="{
              name: 'orders',
            }"
            class="bg-black p-2 transition duration-700 ease-in-out capitalize w-[20vw] rounded-full text-slate-300 font-bold cursor-pointer"
          >
            back
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "@/Firebase.js";
export default {
  name: "orderInfo",
  data() {
    return {
      orderID: this.$route.params.orderId,
      orderInfo: [],
    };
  },
  created() {
    firebase
      .firestore()
      .collection("orders")
      .doc(this.orderID)
      .onSnapshot((order) => {
        this.orderInfo.push(order.data());
      });
  },
  methods: {
    DeleteOrder() {
      firebase
        .firestore()
        .collection("orders")
        .doc(this.orderID)
        .delete()
        .then(() => {
          this.$message({
            showClose: true,
            message: "has been order deleted successfully",
          });
          setTimeout(() => {
            this.$router.push({
              name: "orders",
            });
          }, 2000);
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err,
            type: "error",
          });
        });
    },
  },
};
</script>

<style></style>
