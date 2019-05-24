<template>
  <v-card class="pa-3 mx-1" flat>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="product.product_name" label="Product Name"></v-text-field>

      <v-text-field v-model="product.product_description" label="Product Description"></v-text-field>

      <v-text-field v-model="product.stock" type="number" label="Stock"></v-text-field>

      <v-text-field v-model="product.price" type="number" label="Price"></v-text-field>

      <v-btn color="success" @click="submitChange">update</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  methods: {
    submitChange() {
      let newData = {
        productId: this.$route.params.productId,
        product_name: this.product.product_name,
        product_description: this.product.product_description,
        stock: this.product.stock,
        price: this.product.price
      };
      this.$store.dispatch("updateOneProduct", newData);
    }
  },

  created() {
    console.log(this.$route.params.productId);
    this.$store.dispatch("getOneProduct", this.$route.params.productId);
  },
  computed: {
    product() {
      return this.$store.state.product;
    }
  },
  watch: {
    "$route.params.productId": function(id) {
      this.$store.dispatch("getOneProduct", id);
    }
  }
};
</script>