<template>
  <section class="admin-info capitalize">
    <el-descriptions
      class="margin-top p-10"
      title="ADMIN INFO"
      :column="3"
      border
    >
      <template slot="extra">
        <router-link
          tag="button"
          :to="{ name: 'editProfile' }"
          type="primary"
          class="capitalize bg-blue-color text-white p-2 rounded-lg w-[5vw] transition duration-700 ease-in-out hover:bg-blue-800 hover:text-black"
          size="small"
          >edit</router-link
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          firstName
        </template>
        {{ user.firstName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          lastName
        </template>
        {{ user.lastName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          Telephone
        </template>
        {{ user.phone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          Place
        </template>
        {{ user.city }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Role
        </template>
        <el-tag size="small"> {{ user.role }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          e-mail
        </template>
        {{ user.email }}
      </el-descriptions-item>
    </el-descriptions>
  </section>
</template>

<script>
import firebase from "@/Firebase.js";
export default {
  name: "settings-section",
  data() {
    return {
      user: {},
      userEmail: "",
    };
  },
  created() {
    this.userEmail = JSON.parse(localStorage.getItem("user-info")).email;
    if (this.userEmail !== null) {
      this.user = firebase
        .firestore()
        .collection("users")
        .get()
        .then((res) => {
          res.forEach((element) => {
            console.log(element.data().email == this.userEmail);
            if (element.data().email == this.userEmail) {
              this.user = element.data();
            }
          });
        });
    }
  },
};
</script>

<style></style>
