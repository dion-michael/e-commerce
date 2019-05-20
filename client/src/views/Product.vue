<template>
  <div class="about">
    <v-container>
      <v-layout row wrap class fill-height>
        <v-flex xs12 sm4 class="pr-3">
          <v-card flat class="productImg">
            <v-img :src="productDetails.image" aspect-ratio="1.7" contain height="300px"></v-img>
          </v-card>
        </v-flex>
        <v-flex xs12 sm8>
          <v-card flat class="detailContainer pa-4" height="100%">
            <v-card-title style="border-left: #e91e63 solid 4px" class="pa-0 pl-3 mb-3">
              <v-list two-line>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title class="title">{{productDetails.product_name}}</v-list-tile-title>
                    <v-list-tile-title class="subheading">{{productDetails.product_description}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-title>
            <v-card-content>
              <p>stock: {{productDetails.stock}}</p>
              <div class="title mb-2">Rp. {{productDetails.price}}</div>
            </v-card-content>
            <v-card-action>
              <v-btn flat class="accent--text">
                <v-icon class="mr-2">shopping_cart</v-icon>buy now
              </v-btn>
              <v-btn flat class="accent--text" @click="addCart">
                <v-icon class="mr-2">add</v-icon>cart
              </v-btn>
            </v-card-action>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center row fill-height class="mt-3">
        <v-btn flat rounded class="grey--text">
          <router-link to="/" style="text-decoration: none">
            <v-icon class="mr-3">arrow_back</v-icon>back
          </router-link>
        </v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import api from "@/api/config";
export default {
  data() {
    return {
      productDetails: {}
    };
  },
  created() {
    console.log(this.$route.params.productId);
    api({
      url: `/products/${this.$route.params.productId}`,
      method: "GET"
    }).then(details => {
      this.productDetails = details.data;
      console.log(this.productDetails);
    });
  },
  methods: {
    addCart() {
      this.$store.dispatch("addCart", this.$route.params.productId);
    }
  }
};
</script>

<style>
.productImg {
  border-radius: 20px 0px 0px 20px;
}
.detailContainer {
  border-radius: 0px 20px 20px 0px;
}
</style>


