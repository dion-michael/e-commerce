<template>
  <nav>
    <v-toolbar app class="accent" height="100px">
      <v-toolbar-side-icon class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <!-- <span class="font-weight-light">e</span>
        <span class="accent--text">commerce</span>-->
        <router-link to="/">
          <img src="diapetoko.png" alt="diapetoko" height="25px" class="mt-2">
        </router-link>
      </v-toolbar-title>
      <v-text-field
        label="Search"
        full-width
        single-line
        v-model="searchQuery"
        background-color="white"
        prepend-inner-icon="search"
        clearable
        class="px-5 searchbar"
      ></v-text-field>
      <v-toolbar-items>
        <v-layout align-center justify-center row fill-height>
          <router-link to="/cart">
            <v-badge overlap left>
              <template v-slot:badge color="accent">
                <span>{{cartQty}}</span>
              </template>
              <v-btn icon small>
                <v-icon color="white">shopping_cart</v-icon>
              </v-btn>
            </v-badge>
          </router-link>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-avatar size="40px" color="grey lighten-4" v-on="on" class="ml-4">
                <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="avatar">
              </v-avatar>
            </template>
            <v-list>
              <div v-if="!isLogin">
                <v-list-tile>
                  <v-list-tile-title>
                    <Login/>
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-for="(item, index) in items" :key="index">
                  <v-list-tile-title>
                    <router-link :to="item.route">{{item.title}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </div>
              <div v-if="isLogin">
                <v-list-tile>
                  <v-list-tile-title>
                    <a @click="signOut">Sign Out</a>
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                    <addProduct/>
                  </v-list-tile-title>
                </v-list-tile>
              </div>
            </v-list>
          </v-menu>
        </v-layout>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" class="white">
      <v-layout align-center justify-center row class="my-5">
        <img src="diapetoko-dark.png" height="40">
      </v-layout>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="accent--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Login from "@/components/Login";
import addProduct from "@/components/addProduct";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      drawer: true,
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "shopping_cart", text: "Cart", route: "/cart" }
      ],
      items: [
        { title: "Register", route: "/register" },
        { title: "Sign In With Google", route: "/" }
      ]
    };
  },
  methods: {
    test() {
      alert("masuk");
    },
    signOut() {
      this.$store.dispatch("signOut");
      this.$router.push("/");
    }
  },
  components: {
    Login,
    addProduct
  },
  created() {
    if (this.$store.state.isLogin) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    cartQty() {
      return this.$store.state.cartLength;
    },
    searchQuery() {
      return this.$store.state.searchQuery;
    }
  }
};
</script>

<style>
.searchbar .v-input__control .v-input__slot {
  border-radius: 10px;
}

.v-list .v-list__tile__title a {
  text-decoration: none;
}
</style>


