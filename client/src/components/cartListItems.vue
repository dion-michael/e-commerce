<template>
  <div>
    <v-card flat class="status">
      <v-layout row wrap class="pa-3">
        <v-flex xs12 sm4>
          <div class="caption grey--text">Product Name</div>
          <div>
            <router-link :to="'/cart/' + item._id" class="art-title">{{item.product_name}}</router-link>
          </div>
        </v-flex>
        <v-flex xs12 sm2>
          <div class="caption grey--text">Seller</div>
          {{item.seller.username}}
        </v-flex>
        <v-flex xs12 sm4>
          <div class="caption grey--text">Price</div>
          <div>Rp.{{item.price}}</div>
        </v-flex>
        <v-flex xs12 sm2>
          <v-btn flat icon color="pink" @click="deleteFromCart">
            <v-icon small>delete</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    deleteFromCart() {
      this.$store.dispatch("deleteFromCart", this.item._id);
    }
  }
};
</script>
