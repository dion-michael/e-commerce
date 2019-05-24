<template>
  <div class="container">
    <v-layout row wrap>
      <v-flex xs6>
        <productList v-for="product in userProducts" :key="product._id" :item="product"/>
      </v-flex>
      <v-flex xs6>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import productList from "@/components/YourProducts.vue";
export default {
  mounted() {
    this.$store.dispatch("getUserProducts");
  },
  components: {
    productList
  },
  computed: {
    userProducts() {
      return this.$store.state.userProducts;
    }
  }
};
</script>

