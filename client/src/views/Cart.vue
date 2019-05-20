<template>
  <div class="dashboard">
    <v-container fluid class="my-5">
      <div v-if="cartItems.length === 0">
        <v-layout align-center justify-center column>
          <v-flex xs12 align-center justify-center>
            <h1>oops, your cart is empty</h1>
          </v-flex>
          <v-flex xs12 align-center justify-center>
            <router-link to="/">
              <v-btn flat class="accent--text">
                <v-icon>shopping_cart</v-icon>go shopping
              </v-btn>
            </router-link>
          </v-flex>
        </v-layout>
      </div>
      <div v-if="cartItems.length>0">
        <v-layout row class="mb-3">
          <blockquote class="accent--text">Your Cart</blockquote>
        </v-layout>
        <v-layout>
          <v-flex xs12 sm4>
            <cartListItems v-for="item in cartItems" :key="item.id" :item="item"></cartListItems>
          </v-flex>
          <v-flex xs12 sm8 class="px-5">
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </div>
</template>

<script>
import cartListItems from "@/components/cartListItems.vue";
export default {
  data() {
    return {
      items: {}
    };
  },
  components: {
    cartListItems
  },
  methods: {
    sortBy(prop) {
      this.articles.sort((a, b) => {
        a[prop] > b[prop] ? 1 : -1;
      });
    }
  },
  created() {
    this.$store.dispatch("getCart");
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.products;
    }
  }
};
</script>
