<template>
  <v-layout row>
    <v-dialog v-model="dialog" max-width="400px">
      <template v-slot:activator="{ on }">
        <a color="primary" v-on="on">Sign In</a>
      </template>
      <v-card>
        <v-card-title>
          <v-flex text-xs-center class="mt-3">
            <img src="diapetoko-dark.png" height="40px" class="mb-3" alt>
            <p class="headline accent--text">Sign In</p>
          </v-flex>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-container grid-list-md>
            <form @submit.prevent="signInOrRegister">
              <v-layout wrap>
                <v-flex xs12 v-if="register">
                  <v-text-field label="Name" required v-model="name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Email*" required v-model="email"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password*" type="password" required v-model="password"></v-text-field>
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <v-btn type="submit" v-if="register" flat class="accent--text">Register</v-btn>
                  <v-btn type="submit" v-if="!register" flat class="accent--text">Sign In</v-btn>
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <a @click="register=true" v-if="!register">Don't have an account yet?</a>
                  <a @click="register=false" v-if="register">Sign in instead</a>
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
    dialog: false,
    register: false,
    name: "",
    email: "",
    password: ""
  }),
  methods: {
    signInOrRegister() {
      if (this.register) {
        this.registerUser();
      } else {
        this.signInUser();
      }
    },
    signInUser() {
      api({
        url: "/signin",
        data: {
          email: this.email,
          password: this.password
        },
        method: "POST"
      }).then(({ data }) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("cartId", data.cartId);
        localStorage.setItem("userId", data.userId);
        this.$store.dispatch("setLogin", true);
        this.$store.dispatch("getCart");
        console.log(this.$store.state);
        this.dialog = false;
        Swal.fire(
          "Nice to see you again!",
          `Welcome, ${data.username}`,
          "success"
        );
      });
    },
    registerUser() {
      api({
        url: "/register",
        data: {
          username: this.name,
          email: this.email,
          password: this.password
        },
        method: "POST"
      })
        .then(savedData => {
          this.signInUser();
        })
        .catch(error => {
          console.log(error.errors);
        });
    }
  }
};
</script>