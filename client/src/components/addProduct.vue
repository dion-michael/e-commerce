<template>
  <v-layout row>
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }">
        <a color="primary" v-on="on">Sell Product</a>
      </template>
      <v-card>
        <v-card-title>
          <v-flex text-xs-center class="mt-3">
            <img src="diapetoko-dark.png" height="40px" class="mb-3" alt>
            <p class="headline accent--text">
              Let's make some
              <span class="success--text">$</span>
              !
            </p>
          </v-flex>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-container grid-list-md>
            <form @submit.prevent="sellProduct">
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Product Name" required v-model="product_name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea label="Product Description" required v-model="product_description"></v-textarea>
                </v-flex>
                <v-flex xs2>
                  <v-text-field type="number" label="Stock" suffix="unit" required v-model="stock"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs9>
                  <v-text-field type="number" label="Price" prefix="Rp" required v-model="price"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-progress-circular indeterminate color="accent" v-if="showLoading"></v-progress-circular>
                  <img :src="imageUrl" height="150" v-if="imageUrl">
                  <v-text-field
                    :disabled="coverImg !== ''"
                    label="Product Image"
                    @click="pickFile"
                    v-model="imageName"
                    prepend-icon="attach_file"
                  ></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                  >
                  <v-btn flat class="mx-0 mt-3" @click="uploadCoverImg" v-if="imageUrl">
                    <v-icon small>send</v-icon>upload
                  </v-btn>
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <v-btn type="submit" flat class="accent--text">Start Selling!</v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import api from "@/api/config";
import Swal from "sweetalert2";
export default {
  data: () => ({
    product_name: "",
    product_description: "",
    price: 0,
    stock: 0,
    dialog: false,
    register: false,
    name: "",
    imageUrl: "",
    imageName: "",
    coverImg: "",
    showLoading: false
  }),
  methods: {
    sellProduct() {
      api({
        url: "/products",
        method: "POST",

        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          product_name: this.product_name,
          product_description: this.product_description,
          price: this.price,
          image: this.coverImg,
          stock: this.stock
        }
      }).then(success => {
        this.imageUrl = "";
        this.product_name = "";
        this.product_description = "";
        this.price = "";
        this.stock = "";
        this.coverImg = "";
        this.dialog = false;
        this.$store.dispatch("getAllProducts");
        Swal.fire("Good job!", "Let's earn some money!", "success");
      });
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    uploadCoverImg() {
      this.showLoading = true;
      this.imageUrl = "";
      let formData = new FormData();
      formData.append("image", this.imageFile);
      api({
        url: "http://localhost:3000/upload",
        method: "POST",

        headers: {
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(result => {
          let url = result.data.link;
          this.showLoading = false;
          this.coverImg = url;
          this.imageName += " uploaded";
          this.imageUrl = "";
          this.$store.dispatch("getAllProducts");
        })
        .catch(error => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: error
          });
        });
    }
  }
};
</script>