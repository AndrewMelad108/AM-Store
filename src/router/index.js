import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/user/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "account",

    component: () => import("../views/global/Account.vue"),
    children: [
      {
        path: "/login",
        name: "login",

        component: () => import("@/components/global/Login.vue"),
      },
      {
        path: "/register",
        name: "register",

        component: () => import("@/components/global/SignUp.vue"),
      },
    ],
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
  },

  {
    path: "/productDescription/:productId",
    name: "productDescription",

    component: () => import("@/views/user/Products/ProductInfo.vue"),
  },
  {
    path: "/products",
    name: "products",

    component: () => import("@/views/user/Products/Products.vue"),
  },
  {
    path: "/contact",
    name: "contact",

    component: () => import("@/views/user/Contact.vue"),
  },
  {
    path: "/addToCard",
    name: "addToCard",

    component: () => import("@/views/user/Card.vue"),
  },
  {
    path: "/orderList",
    name: "orderList",

    component: () => import("@/views/user/Order/OrderList.vue"),
  },
  {
    path: "/orderInfo/:orderID",
    name: "orderInfo",

    component: () => import("@/views/user/Order/OrderInfo.vue"),
  },
  {
    path: "/order",
    name: "order",

    component: () => import("@/views/user/Order/Order.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/adminPage.vue"),
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/admin/Users.vue"),
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import("@/views/admin/Order/Orders.vue"),
      },
      {
        path: "/orderInfo/:orderId",
        name: "orderInfoInAdmin",
        component: () => import("@/views/admin/Order/OrderInfo.vue"),
      },
      {
        path: "/adminProducts",
        name: "adminProducts",
        component: () => import("@/views/admin/Products/Products.vue"),
      },
      {
        path: "/setting",
        name: "setting",
        component: () => import("@/views/admin/Profile/Setting.vue"),
      },
      {
        path: "/addProducts",
        name: "addProducts",
        component: () => import("@/views/admin/Products/addProducts.vue"),
      },
      {
        path: "/categories",
        name: "categories",
        component: () => import("@/views/admin/categories.vue"),
      },
      {
        path: "/editProducts/:productID",
        name: "editProducts",
        component: () => import("@/views/admin/Products/editProducts.vue"),
      },
      {
        path: "/contact-us",
        name: "contact-us",
        component: () => import("@/views/admin/ContactUs.vue"),
      },
      {
        path: "/editProfile",
        name: "editProfile",
        component: () => import("@/views/admin/Profile/editProfile.vue"),
      },
    ],
  },
  {
    path: "*",
    name: "error",

    component: () => import("@/views/global/Erorr.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
