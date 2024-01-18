<template>
  <section class="ContactUS-section p-4">
    <el-table :data="ContactUS" style="width: 100%" class="text-blue-color">
      <el-table-column label="userID" prop="key"> </el-table-column>
      <el-table-column label="User Name" prop="name"> </el-table-column>
      <el-table-column label="email" prop="email"> </el-table-column>
      <el-table-column label="comment" prop="comment"> </el-table-column>
    </el-table>
  </section>
</template>

<script>
import firebase from "@/Firebase.js";
export default {
  name: "ContactUS-section",
  data() {
    return {
      ContactUS: [],
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
    if (this.user !== null) {
      firebase
        .firestore()
        .collection("contact-us")
        .get()
        .then((doc) => {
          doc.forEach((order) => {
            this.ContactUS.push({
              key: order.id,
              name: order.data().name,
              email: order.data().email,
              comment: order.data().comment,
            });
          });
        });
    }
  },
};
</script>

<style scoped>
.el-table {
  text-align: center !important;
  color: #183661;
}
</style>
