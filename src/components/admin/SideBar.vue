<template>
  <div class="dashbord capitalize">
    <el-menu
      background-color="#183661"
      default-active="2"
      class="el-menu-vertical-demo capitalize"
      :collapse="isCollapse"
    >
      <el-button
        icon="el-icon-menu"
        class="btn-toggle"
        @click="navMenu()"
      ></el-button>

      <div
        class="user-info mt-10 mx-auto space-x-4 grid grid-cols-2-auto gap-x-1 w-fit text-white"
      >
        <div
          class="admin-icon h-fit self-center flex bg-slate-400 p-2 rounded-full justify-center flex-wrap content-center"
        >
          <i class="el-icon-user-solid text-4xl h-fit block cursor-pointer"></i>
        </div>
        <div class="info">
          <h1 class="font-bold text-xl">{{ user.firstName }}</h1>
          <h4>{{ user.email }}</h4>
          <h6>
            <span
              class="online-circle animate-ping opacity-75 bg-green-600 w-3 h-3 rounded-full mr-1 inline-block"
            ></span>
            online
          </h6>
        </div>
      </div>

      <el-menu-item>
        <router-link tag="li" :to="{ name: 'user' }" class="links">
          <i class="el-icon-user"></i>
          <span class="title">user</span>
        </router-link>
      </el-menu-item>
      <el-menu-item>
        <router-link tag="li" :to="{ name: 'orders' }" class="links">
          <i class="el-icon-box"></i>
          <span class="title">orders</span></router-link
        >
      </el-menu-item>
      <el-menu-item>
        <router-link tag="li" :to="{ name: 'categories' }" class="links">
          <i class="el-icon-s-order"></i>
          <span class="title">categories</span></router-link
        >
      </el-menu-item>
      <el-menu-item>
        <router-link tag="li" :to="{ name: 'adminProducts' }" class="links">
          <i class="el-icon-goods"></i>
          <span class="title">products</span></router-link
        >
      </el-menu-item>
      <el-menu-item>
        <router-link tag="li" :to="{ name: 'contact-us' }" class="links">
          <i class="el-icon-setting"></i>
          <span class="title">contactus</span></router-link
        >
      </el-menu-item>
      <el-menu-item>
        <router-link tag="li" :to="{ name: 'setting' }" class="links">
          <i class="el-icon-setting"></i>
          <span class="title">setting</span></router-link
        >
      </el-menu-item>
      <el-menu-item>
        <button class="links" @click="logout()">
          <i class="el-icon-guide"></i>
          <span class="title capitalize"> logout</span>
        </button>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import firebase from "@/Firebase.js";
export default {
  data() {
    return {
      isCollapse: false,
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
            if (element.data().email == this.userEmail) {
              this.user = element.data();
            }
          });
        });
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({
        name: "account",
      });
    },
    navMenu() {
      this.isCollapse = !this.isCollapse;
    },
    handleResize() {
      if (window.innerWidth <= 910) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
<style lang="scss" scoped>
.dashbord {
  z-index: 999999999;
}
.el-menu 
  /*siderbar height*/ {
  border-radius: 0 10px 10px 0;
  position: relative;
}
.btn-toggle {
  position: absolute;
  top: 0;
  right: 0;
  background: #183661;
  color: #fff;
  font-size: 25px;
  margin-bottom: 20px;
  border: 0;
  &:hover {
    color: black;
  }
}
.el-menu--collapse {
  min-height: 100vh;
  height: 100%; //small size sidebar
  width: 50px;
  .links {
    .title {
      display: none;
    }
  }
  .user-info {
    display: none;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px; /*width slidebar  */
  min-height: 100vh;
  height: 100%;
}
.el-menu-item.is-active {
  /*color word link is active*/
  color: black;
}
.el-menu-item.is-active i {
  text-align: center;
  padding-left: 5px;
}
.el-menu-item:hover {
  /*hover links*/
  background: black !important;
  color: black;
}
.el-menu-item {
  /* color link without hover */
  color: #ffff !important;
  margin: 20px;
  font-size: 20px;
}
.el-menu-item i {
  /*color icon bettween link */
  color: #fff;
  margin: 0 20px 0 -18px !important;
  cursor: pointer;
}
.el-menu-item {
  margin: 25px 0;
}
.links {
  font-weight: bold;
  line-height: 1.5;
  padding: 10px;
  word-spacing: 1.5;
}
</style>
