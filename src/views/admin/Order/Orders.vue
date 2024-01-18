<template>
  <section class="orders-section p-4">
    <el-table :data="orders" style="width: 100%" class="text-blue-color">
      <el-table-column label="orderID" prop="key"> </el-table-column>
      <el-table-column label="User Name" prop="name"> </el-table-column>
      <el-table-column label="City" prop="city"> </el-table-column>
      <el-table-column label="Address" prop="address"> </el-table-column>
      <el-table-column label="Total Price" prop="totalprice"> </el-table-column>
      <el-table-column>
        <button
          slot-scope="scope"
          @click="orderInfo(scope.row)"
          class="hover:bg-slate-900 bg-slate-500 text-white px-5 py-1 rounded-lg capitalize transition duration-700 ease-in-out"
        >
          info
        </button></el-table-column
      >
      <el-table-column>
        <button
          slot-scope="scope"
          @click="Delete(scope.row)"
          class="hover:bg-red-500 bg-blue-color text-white px-5 py-1 rounded-lg capitalize transition duration-700 ease-in-out"
        >
          delete
        </button></el-table-column
      >
    </el-table>
  </section>
</template>

<script>
import firebase from "@/Firebase.js";
export default {
  name: "orders-section",
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
    if (this.user !== null) {
      firebase
        .firestore()
        .collection("orders")
        .get()
        .then((doc) => {
          doc.forEach((order) => {
            this.orders.push({
              key: order.id,
              name: order.data().name,
              city: order.data().city,
              address: order.data().address,
              totalprice: order.data().totalprice,
            });
          });
        });
    }
  },
  methods: {
    Delete(order) {
      console.log(order.key);
      firebase
        .firestore()
        .collection("orders")
        .doc(order.key)
        .delete()
        .then(() => {
          this.$message({
            showClose: true,
            message: "has been order deleted successfully",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err,
            type: "error",
          });
        });
    },
    orderInfo(order) {
      this.$router.push({
        name: "orderInfoInAdmin",
        params: {
          orderId: order.key,
        },
      });
    },
  },
};
</script>

<style scoped>
.el-table {
  text-align: center !important;
  color: #183661;
}
</style>
