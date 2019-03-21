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

      <ArticleList v-bind:articles="articles"/>
    </v-content>
  </v-app>
</template>

<script>
import UrlInput from './components/UrlInput'
import ArticleList from './components/ArticleList'
import axios from "axios";
//import xml2js from "xml2js";

export default {
  name: 'App',
  components: {
    UrlInput,
    ArticleList
  },
  methods: {
    urlUpdated (url) {
      this.url = url

  const self = this;
  axios.get("./assets/test.xml")
  .then(function (response) {
      var parseString = require('xml2js').parseString;
        parseString(response.data, function (err, result) {
          console.log(err);
            console.log(JSON.stringify(result.rss.channel[0].title));
            self.articles = result.rss.channel[0].item;
        });  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

 /*  axios.get('http://url.to/events.xml')
    .then(response => {
      console.log(response.data);
    parseString(response.data, (err, result) => {
      if(err) {
       //Do something
      } else {
       this.events = result
     }
    });        
  })
} */
/*
      const vm = this;
      var xml = require("!!raw-loader!./assets/test.xml");
      console.log(xml.data);
        var parseString = require('xml2js').parseString;
        parseString(xml, function (err, result) {
          console.log(err);
            console.log(JSON.stringify(result.rss.channel[0].title));
           // vm.importantLinks = result.rss.channel[0].item;
        });*/
    }
  },
  data () {
    return {
      url: "Please enter a URL",
      articles: []
      //
    }
  }
}
</script>
