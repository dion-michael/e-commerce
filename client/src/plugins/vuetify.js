import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    "primary": "#00838f",
    "secondary": "#e6e8e6",
    "accent": "#e91e63",
    "error": "#d32f2f",
    "info": "#536dfe",
    "success": "#00bfa5",
    "warning": "#ff9800",
  }
})