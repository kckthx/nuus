<template>
  <v-container>
    <v-layout>
        <a
          v-for="(link, i) in articles"
          :key="i"
          :href="link.link"
          class="subheading"
          target="_blank"
        >{{ link.title }}</a>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  methods: {
  },

  data: () => ({
    articles: [
      {
        title: "vuetify-loader",
        link: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        title: "github",
        link: "https://github.com/vuetifyjs/vuetify"
      },
      {
        title: "awesome-vuetify",
        link: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ]
  })
};
</script>

<style>
</style>
