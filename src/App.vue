<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <UrlInput v-on:update:url="urlUpdated($event)" v-bind:url="url"/>

      Current url is: {{ url }}

      <ArticleList/>
    </v-content>
  </v-app>
</template>

<script>
import UrlInput from './components/UrlInput'
import ArticleList from './components/ArticleList'

export default {
  name: 'App',
  components: {
    UrlInput,
    ArticleList
  },
  methods: {
    urlUpdated (url) {
      this.url = url
    }
  },
  data () {
    return {
      url: "Please enter a URL"
      //
    }
  }
}
</script>
