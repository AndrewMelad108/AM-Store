<template>
  <el-table
    :data="Users"
    style="width: 100%"
    class="text-blue-color text-center"
  >
    <el-table-column label="id" prop="key"> </el-table-column>
    <el-table-column label="Name" prop="name"> </el-table-column>
    <el-table-column label="Email" prop="email"> </el-table-column>
    <el-table-column label="role" prop="role"> </el-table-column>

    <el-table-column>
      <button
        slot-scope="scope"
        @click="handleDelete(scope.row)"
        class="hover:bg-red-500 bg-blue-color text-white px-5 py-1 rounded-lg capitalize transition duration-700 ease-in-out"
      >
        delete
      </button></el-table-column
    >
  </el-table>
</template>

<script>
import firebase from "../../Firebase.js";
export default {
  name: "user-section",
  data() {
    return {
      Users: [],
      user: {},
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
    if (this.user !== null) {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            this.Users.push({
              key: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              role: doc.data().role || "user",
            });
          });
        });
    }
  },
  methods: {
    handleDelete(data) {
      if (data.role === "admin") {
        this.$message({
          showClose: true,
          message: "It cannot be deleted because it is admin",
          type: "error",
        });
      } else {
        firebase
          .firestore()
          .collection("users")
          .doc(data.key)
          .delete()
          .then(() => {
            this.$message({
              showClose: true,
              message: "has been user deleted successfully",
            });

            window.location.reload();
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: "There was a problem deleting the user",
              type: "error",
            });
          });
      }
    },
  },
};
</script>
<style scoped></style>
