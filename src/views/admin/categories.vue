<template>
  <div class="p-4">
    <div class="flex justify-end">
      <i
        class="el-icon-plus cursor-pointer text-3xl bg-blue-color p-2 text-white ml-auto w-fit rounded-full"
        @click="add = !add"
      ></i>
    </div>
    <model-app
      v-if="show"
      FunnctionValue="update"
      :value="editvalue"
      :close="show"
      @updata="updataCat($event)"
      @back="back()"
    ></model-app>
    <model-app
      v-if="add"
      @updata="addCateory($event)"
      @back="back()"
      FunnctionValue="add"
    ></model-app>
    <el-table :data="categories">
      <el-table-column label="id" prop="key"> </el-table-column>
      <el-table-column label="Name" prop="name"> </el-table-column>

      <el-table-column label="Delete">
        <button
          slot-scope="scope"
          @click="handleDelete(scope.row)"
          class="hover:bg-red-500 bg-blue-color text-white px-5 py-1 rounded-lg capitalize transition duration-700 ease-in-out"
        >
          delete
        </button></el-table-column
      >
      <el-table-column label="Edit">
        <button
          slot-scope="scope"
          @click="handleEdit(scope.row)"
          class="hover:bg-red-500 bg-blue-color text-white px-5 py-1 rounded-lg capitalize transition duration-700 ease-in-out"
        >
          edit
        </button></el-table-column
      >
    </el-table>
  </div>
</template>

<script>
import model from "@/components/admin/Model.vue";
import firebase from "@/Firebase.js";
export default {
  name: "categories-section",
  data() {
    return {
      categories: [],
      user: {},
      show: false,
      editvalue: "",
      key: "",
      add: false,
    };
  },
  components: {
    "model-app": model,
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user-info"));
    if (this.user !== null) {
      firebase
        .firestore()
        .collection("categories")
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            this.categories.push({
              key: doc.id,
              name: doc.data().name,
            });
          });
        });
    }
  },
  methods: {
    handleDelete(data) {
      console.log(data.key);
      firebase
        .firestore()
        .collection("categories")
        .doc(data.key)
        .delete()
        .then(() => {
          this.$message({
            showClose: true,
            message: "category deleted successfully",
          });

          window.location.reload();
        })
        .catch(() => {});
    },
    handleEdit(data) {
      this.show = !this.show;
      console.log(data.key);
      this.editvalue = data.name;
      this.key = data.key;
    },
    updataCat(value) {
      console.log(value);
      firebase
        .firestore()
        .collection("categories")
        .doc(this.key)
        .update({
          name: value,
        })
        .then(() => {
          this.$message({
            showClose: true,
            message: "category updated successfully",
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch(() => {});
    },
    addCateory(value) {
      console.log(value);
      firebase
        .firestore()
        .collection("categories")
        .add({
          name: value,
        })
        .then(() => {
          this.$message({
            showClose: true,
            message: "category added successfully",
          });
          window.location.reload();
        })
        .catch(() => {});
    },
    back() {
      this.add = false;
      this.show = false;
    },
  },
};
</script>

<style></style>
