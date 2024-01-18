<template>
  <section class="orders min-h-screen">
    <header-app></header-app>
    <div
      class="orders-content px-20 max-sm:px-5 bg-no-repeat bg-intro-page-image p-2"
    >
      <form
        @submit.prevent="order()"
        class="grid grid-cols-2 max-sm:grid-cols-1 space-y-12 justify-between content-start gap-x-4 h-auto w-full p-5 rounded-lg"
      >
        <i
          class="el-icon-shopping-cart-full col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2 text-7xl mt-5 font-bold text-center block mx-auto w-full"
        ></i>
        <h1
          class="text-blue-800 text-center col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2 text-5xl my-10 capitalize tracking-tighter"
        >
          {{ $t("order") }}
        </h1>
        <div class="name-input-field">
          <input
            type="text"
            :placeholder="$t('Enter your name')"
            class="p-2 w-full rounded-lg placeholder:capitalize bg-transparent border border-blue-color placeholder:text-blue-color focus:outline-0"
            v-model.trim="name"
          />
          <span v-for="(error, index) of v$.name.$errors" :key="index">
            <strong class="text-red-500 text-sm p-0 m-0"
              >*{{ error.$message }}</strong
            ></span
          >
        </div>
        <div class="city-input-field">
          <input
            type="text"
            :placeholder="$t('Enter your city')"
            class="w-full p-2 rounded-lg placeholder:capitalize bg-transparent border border-blue-color placeholder:text-blue-color focus:outline-0"
            v-model.trim="city"
          />
          <span v-for="(error, index) of v$.city.$errors" :key="index">
            <strong class="text-red-500 text-sm p-0 m-0"
              >*{{ error.$message }}</strong
            ></span
          >
        </div>
        <div
          class="phone-input-field col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2"
        >
          <input
            type="number"
            :placeholder="$t('Enter your phone number')"
            class="w-full p-2 rounded-lg placeholder:capitalize bg-transparent border border-blue-color placeholder:text-blue-color focus:outline-0"
            v-model.trim="phone"
          />
          <span v-for="(error, index) of v$.phone.$errors" :key="index">
            <strong class="text-red-500 text-sm p-0 m-0"
              >*{{ error.$message }}</strong
            ></span
          >
        </div>
        <p
          class="p-2 text-xl text-center text-blue-color capitalize col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2"
        >
          {{ $t("totalprice") }} : {{ totalprice }}{{ $t("$") }}
          {{ $t("after discount") }}
        </p>

        <div
          class="address-input-field col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2"
        >
          <textarea
            cols="20"
            :placeholder="$t('enter any address .....')"
            v-model.trim="address"
            rows="3"
            class="w-full p-2 my-2 resize-none rounded-lg placeholder:capitalize bg-transparent border border-blue-color placeholder:text-blue-color focus:outline-0"
          ></textarea>
          <span v-for="(error, index) of v$.address.$errors" :key="index">
            <strong class="text-red-500 text-sm p-0 m-0"
              >*{{ error.$message }}</strong
            ></span
          >
        </div>
        <button
          class="text-2xl col-start-1 col-end-3 max-sm:col-start-1 max-sm:col-end-2 w-fit mx-auto max-sm:mx-auto max-sm:text-sm bg-no-repeat capitalize my-4 bg-blue-color p-5 rounded-lg text-white font-bold hover:bg-black hover:text-blue-700 transition duration-700 ease-in-out"
        >
          {{ $t("chekout") }}
        </button>
      </form>
    </div>
    <footer-app></footer-app>
  </section>
</template>

<script>
import { required, minLength } from "@vuelidate/validators";
import header from "@/components/user/HeaderSection.vue";
import footer from "@/components/user/Footer.vue";
import { useVuelidate } from "@vuelidate/core";
import firebase from "@/Firebase.js";
export default {
  name: "order-comp",
  data() {
    return {
      show: false,
      name: "",
      city: "",
      phone: "",
      address: "",
      totalprice: 0,
      user: {},
      productsPrice: [],
      productsOrder: [],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      name: { required },
      city: { required },
      phone: { required, minlength: minLength(11) },
      address: { required },
      visa: {},
      nameOfVisa: {},
    };
  },
  components: {
    "header-app": header,
    "footer-app": footer,
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
    console.log(this.user.id);
    if (this.user !== null) {
      firebase
        .firestore()
        .collection("card")
        .where("userID", "==", this.user.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.productsPrice.push({
              key: doc.id,
              price: doc.data().price,
              Quantity: doc.data().Quantity,
              name: doc.data().productName,
              imagUrl: doc.data().imageUrl,
              discount: doc.data().discount,
            });
            this.productsOrder.push(...this.productsPrice);
            this.productsPrice = this.productsPrice.filter((item) => {
              return item.price > 0
                ? (this.totalprice +=
                    item.price * item.Quantity * (1 - item.discount / 100))
                : "";
            });
          });
        });
    }
  },
  methods: {
    order() {
      this.v$.$validate();
      if (!this.v$.$error && this.totalprice !== 0) {
        firebase
          .firestore()
          .collection("orders")
          .add({
            name: this.name,
            city: this.city,
            phone: this.phone,
            address: this.address,
            productsOrder: this.productsOrder,
            totalprice: this.totalprice,
            userID: this.user.id,
          })
          .then(() => {
            let productIdInDeleteCard = this.productsOrder.map((element) => {
              return element.key
                ? firebase
                    .firestore()
                    .collection("card")
                    .doc(element.key)
                    .delete()
                : "";
            });
            console.log(productIdInDeleteCard);
            this.$message({
              showClose: true,
              message: "Congrats,order added successfully",
            });
            setTimeout(() => {
              this.$router.push({ name: "home" }).then(() => {});
            }, 500);
          });
      } else {
        this.$message({
          showClose: true,
          message:
            "Oops, There is a problem with the data order or no product in card",
          type: "error",
        });
      }
    },
    showInputVisaNumber() {
      if (this.checkout === "visa") {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
};
</script>

<style></style>
