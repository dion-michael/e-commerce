<template>
  <v-hover>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      Added to cart
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto productCard"
      max-width="300"
    >
      <v-img :src="product.image" height="200px"></v-img>

      <v-card-title primary-title>
        <div>
          <div class="subheading">
            <router-link :to="'/products/' + product._id">{{product.product_name}}</router-link>
          </div>
          <span class="title accent--text">Rp. {{product.price}}</span>
          <v-rating
            v-model="rating"
            background-color="grey"
            color="yellow accent-4"
            dense
            medium
            half-increments
            readonly
            size="18"
          ></v-rating>
          <span class="caption grey--text">Stock: {{product.stock}}</span>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="accent">
          <v-icon>shopping_cart</v-icon>buy now
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="addCart" flat color="accent">
          <v-icon>add</v-icon>cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import { setTimeout } from "timers";

export default {
  data() {
    return {
      rating: 4,
      image:
        "https://image2.geekbuying.com/ggo_pic/2018-10-30/Global-ROM-Oneplus-6T-6-41-Inch-8GB-128GB-Smartphone-Midnight-Black-762279-.jpg",
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Hello, I'm a snackbar"
    };
  },
  props: ["product"],
  methods: {
    addCart() {
      this.$store.dispatch("addCart", this.product._id);
      this.$store.dispatch("getCart");
    }
  }
};
</script>

<style>
.productCard {
  border-radius: 15px;
}
</style>

