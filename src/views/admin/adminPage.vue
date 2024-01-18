<template>
  <section class="admin-page" v-if="person !== null">
    <side-app></side-app>
    <router-view />
  </section>
</template>

<script>
import sidebar from "../../components/admin/SideBar.vue";

export default {
  name: "admin-page",
  components: {
    "side-app": sidebar,
  },

  beforeCreate() {
    this.person = JSON.parse(localStorage.getItem("user-info"));
    if (this.person !== null && this.person.role === "admin") {
      //this is admin
    } else {
      this.$router.push({
        name: "account",
      });
    }
  },
};
</script>

<style>
.admin-page {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
}
</style>
