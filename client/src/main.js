import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store"
import currency from 'v-currency-field'
import 'v-currency-field/dist/index.css'

Vue.use(currency)
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");