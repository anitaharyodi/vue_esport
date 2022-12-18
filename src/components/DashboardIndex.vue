<template>
    <v-carousel cycle height="700" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(slide, i) in slides" :key="i" eager>
        <v-row class="fillheight" align="center" justify="center">
            <v-img :src="slide.src" height="100%" eager/>
        </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        slides:  [
            {
            src: 'https://img.sportstars.id//2022/08/QH952r/master_Wi2i4985pC_218_mobile_legends.jpeg',
            },
            {
            src: 'https://wallpaperaccess.com/full/678900.jpg',
            },
            {
            src: 'https://wallpapercave.com/wp/wp2532672.jpg',
            },
            {
            src: 'https://image.winudf.com/v2/image1/ZXUuYmx1ZW5ldHdlYi5iZ2ltYWdlX3ZhbG9yYW50X3NjcmVlbl8wXzE1OTY0MDI0MTZfMDc1/screen-0.jpg?fakeurl=1&type=.webp',
            },
        ],
      }
    },
  }
</script>