<template>
  <section class="display-orders-user">
    <header-app></header-app>
    <div
      class="orderList h-screen px-2 py-8 content-start flex flex-wrap"
      v-if="orders.length > 0 && orders !== null"
    >
      <div
        class="grid lg:grid-cols-2 md:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:space-y-2 w-[90vw] mx-auto transition-all duration-1000 ease-in-out shadow-lg hover:shadow-2xl hover:scale-105 shadow-black-color min-h-[100px] p-2 cursor-pointer rounded-md bg-slate-100"
        v-for="order in orders"
        :key="order.key"
      >
        <div class="order-info flex flex-col" @click="orderInfo(order.key)">
          <h1 class="capitalize text-xl">{{ $t("name") }}: {{ order.name }}</h1>
          <h1 class="capitalize text-lg">{{ $t("city") }}: {{ order.city }}</h1>
          <h3 class="capitalize text-md">
            {{ $t("address") }} {{ order.address }}
          </h3>
          <h6 class="capitalize text-lg">
            {{ $t("totalprice") }} {{ order.totalprice }} {{ $t("$") }}
            {{ $t("after discount") }}
          </h6>
        </div>

        <button
          @click="deleteOrder(order.key)"
          class="min-w-[100px] self-center max-w-[300px] text-center mx-auto capitalize cursor-pointer text-white p-2 h-fit bg-blue-color rounded-full"
        >
          {{ $t("delete") }}
        </button>
      </div>
    </div>
    <div
      class="msg h-screen w-full flex flex-wrap text-4xl capitalize justify-center content-center"
      v-else
    >
      {{ $t(" No order in card") }}
    </div>
    <footer-app></footer-app>
  </section>
</template>

<script>
import header from "@/components/user/HeaderSection.vue";
import footer from "@/components/user/Footer.vue";
import firebase from "@/Firebase.js";
export default {
  name: "order-info",
  data() {
    return {
      orders: [],
      user: {},
    };
  },
  components: {
    "header-app": header,
    "footer-app": footer,
  },
  beforeCreate() {
    this.user = JSON.parse(localStorage.getItem("user-info"));

    if (this.user !== null) {
      firebase
        .firestore()
        .collection("orders")
        .where("userID", "==", this.user.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((order) => {
            this.orders.push({
              key: order.id,
              name: order.data().name,
              address: order.data().address,
              city: order.data().city,
              phone: order.data().phone,
              price: order.data().price,
              totalprice: order.data().totalprice,
              productsOrder: order.data().productsOrder,
            });
          });
        });
    }
  },
  methods: {
    orderInfo(key) {
      this.$router.push({
        name: "orderInfo",
        params: {
          orderID: key,
        },
      });
    },
    deleteOrder(key) {
      firebase
        .firestore()
        .collection("orders")
        .doc(key)
        .delete()
        .then(() => {
          this.$message({
            showClose: true,
            message: "Congrats,order deleted successfully",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: "Oops, There is a problem deleted the order",
            type: "error",
          });
        });
    },
  },
};
</script>

<style></style>
