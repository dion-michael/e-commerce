<template>
  <v-carousel :hide-controls="true" :hide-delimiters="true">
    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src:
            "https://vinylbannersprinting.co.uk/wp-content/uploads/2016/04/sb05-RA-preview.png"
        },
        {
          src:
            "https://cdn.wccftech.com/wp-content/uploads/2018/02/Apple-Watch-Series-3.png"
        },
        {
          src:
            "https://static-news.moneycontrol.com/static-mcnews/2018/05/OnePlus-6-India-launch-skins-770x433.jpg"
        },
        {
          src:
            "https://ciyashop.potenzaglobalsolutions.com/wp-content/uploads/2018/06/shop-banner-new.jpg"
        }
      ]
    };
  }
};
</script>