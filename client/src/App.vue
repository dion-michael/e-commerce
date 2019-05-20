<template>
  <div class="main">
    <v-app>
      <Navbar :cartQty="cartQty"/>
      <v-content>
        <router-view @cartPlusOne="add1"></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      cartQty: 0
    };
  },
  methods: {
    add1() {
      console.log("masuk");
      this.cartQty++;
      console.log(this.cartQty);
    }
  },
  created() {
    this.$store.dispatch("getAllProducts");
    console.log(this.$store.state.isLogin);
    if (localStorage.getItem("token")) {
      this.$store.dispatch("setLogin", true);
      this.$store.dispatch("getCart");
    }
    console.log("is any user logged in? ", this.$store.state.isLogin);
  }
};
</script>

<style>
.main {
  background-image: url("/doodles.png");
  background-repeat: repeat;
}
</style>

