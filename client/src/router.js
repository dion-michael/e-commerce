import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import cartDetails from "@/components/cartDetails.vue"
import Manage from "@/views/Manage.vue"
import EditProduct from "@/views/EditProduct.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/products/:productId",
      name: "products",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Product.vue")
    },
    {
      path: "/cart",
      name: "cart",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Cart.vue"),
      children: [{
        path: ':productId',
        component: cartDetails
      }]
    },
    {
      path: "/manage",
      name: "manage",
      component: Manage,
      children: [{
        path: ":productId",
        component: EditProduct
      }]
    }
  ]
});