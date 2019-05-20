<template>
  <div>
    <v-container fluid>
      <Carousel class="mb-5"/>
      <div class="title mb-4 accent--text">Recommended Products</div>

      <!-- SORT BUTTONS -->
      <h1>{{searchQuery}}</h1>
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>sort_by_alpha</v-icon>
            <span class="caption text-lowercase">By Title</span>
          </v-btn>
          <span>sort by title</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('createdAt')" slot="activator">
            <v-icon left small>date_range</v-icon>
            <span class="caption text-lowercase">By Date</span>
          </v-btn>
          <span>sort by date</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('status')" slot="activator">
            <v-icon left small>done</v-icon>
            <span class="caption text-lowercase">By Status</span>
          </v-btn>
          <span>sort by status</span>
        </v-tooltip>
      </v-layout>

      <!-- PRODUCT CARDS -->
      <v-layout row wrap justify-center>
        <div xs3 v-for="product in products" :key="product.id">
          <ProductCard class="ma-2 mb-5" v-on:cartAdded="add" :product="product"></ProductCard>
        </div>
      </v-layout>

      <!-- PAGINATIONS -->
      <div class="text-xs-center">
        <v-pagination :length="4" circle></v-pagination>
      </div>
    </v-container>
    <Footer/>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import NavigationDrawer from "@/components/NavigationDrawer";
import api from "@/api/config.js";
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  components: {
    ProductCard,
    Carousel,
    Footer,
    NavigationDrawer
  },
  methods: {
    add() {
      console.log(this.$router);
      this.$emit("cartPlusOne");
    }
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    ...mapState(["searchQuery"])
  }
};
</script>
