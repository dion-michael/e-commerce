<template>
  <div class="px-3 pb-3">
    <v-img :src="details.image" height="300px" contain></v-img>
    <div class="mt-3">
      <v-layout justify-center row>
        <h1>{{details.product_name}}</h1>
      </v-layout>
      <v-layout justify-center row class="px-5 pt-3">
        <v-flex xs2>
          <div class="right">Description</div>
        </v-flex>
        <v-flex xs2></v-flex>
        <v-flex xs8>
          <div>{{details.product_description}}</div>
        </v-flex>
      </v-layout>
      <v-layout justify-center row class="px-5 pt-3">
        <v-flex xs2>
          <div class="right">Price</div>
        </v-flex>
        <v-flex xs2></v-flex>
        <v-flex xs8>
          <div>Rp. {{details.price}}</div>
        </v-flex>
      </v-layout>
      <v-layout justify-center row class="px-5 pt-3">
        <v-flex xs2>
          <div class="right">Stock</div>
        </v-flex>
        <v-flex xs2></v-flex>
        <v-flex xs8>
          <div>{{details.stock}} Unit</div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import api from "@/api/config";
export default {
  data() {
    return {
      details: {}
    };
  },
  mounted() {
    api({
      url: "/products/" + this.$route.params.productId,
      method: "GET"
    }).then(({ data }) => {
      this.details = data;
    });
  },
  watch: {
    "$route.params.productId": function(id) {
      api({
        url: "/products/" + id,
        method: "GET"
      }).then(({ data }) => {
        this.details = data;
      });
    }
  }
};
</script>

