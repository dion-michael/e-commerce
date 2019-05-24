<template>
  <div>
    <v-card flat class="status">
      <v-layout row wrap class="pa-3">
        <v-flex xs12 sm4>
          <div class="caption grey--text">Product Name</div>
          <div>
            <router-link :to="'/products/' + item._id" class="art-title">{{item.product_name}}</router-link>
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
          <v-btn flat icon color="pink" @click="deleteItem">
            <v-icon small>delete</v-icon>
          </v-btn>
          <router-link :to="'/manage/' + item._id">
            <v-btn flat icon color="pink" @click="editItem">
              <v-icon small>edit</v-icon>
            </v-btn>
          </router-link>
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
    deleteItem() {
      // this.$store.dispatch("deleteProduct", this.item._id);
    },
    editItem() {
      // this.$store.dispatch("deleteProduct", this.item._id)
    }
  }
};
</script>
