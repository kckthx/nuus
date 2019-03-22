<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>NUUS</span>
        <span class="font-weight-light"> RSS READER</span>
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

      <div>Current url is: {{ url }}</div>

      <ItemList v-bind:items="items"/>
    </v-content>
  </v-app>
</template>

<script>
import UrlInput from './components/UrlInput'
import ItemList from './components/ItemList'
import axios from "axios";
import sanitizeHTML from 'sanitize-html';
//import xml2js from "xml2js";

// Make sure Array.isArray is defined
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

export default {
  name: 'App',
  components: {
    UrlInput,
    ItemList
  },
  methods: {
    urlUpdated (url) {
      this.url = url

  const self = this;
  //axios.get("./assets/nasa.xml")
  axios.get(url)
  .then(function (response) {
      var parseString = require('xml2js').parseString;
        parseString(response.data, { explicitArray: false },  function (err, result) {
            var items = [];
            var index = 0;
            result.rss.channel.item.forEach(i => {
              console.log(i);
              var item = { 
                title: i.title, 
                link: i.link,
                guid: i.guid,
                index: index++,
                description: sanitizeHTML(i.description),
                pubDate: i.pubDate,
                author: i.author,
                content: i["content:encoded"]//,
                //enclosure: i.enclosure.url,
                //enclosureType: i.enclosure.type
              };

              var mediaContent = i["media:content"];
              var mediaDesc = i["media:description"];
              if (Array.isArray(mediaContent) && mediaContent.length > 0) {
                  item.imageSrc = mediaContent[0].$.url;
                  console.log("Setting source to " + item.imageSrc);
                  //item.imageDesc = mediaDesc[0];
              } else if (mediaContent != null) {
                  item.imageSrc = mediaContent.$.url;
                  //item.imageDesc = mediaDesc;
              }

              var enclosure = i["enclosure"];
              if (Array.isArray(enclosure) && enclosure.length > 0) {
                  item.enclosure = enclosure[0].$.url
                  item.enclosureType = enclosure[0].$.type
              } else if (enclosure != null) {
                  item.enclosure = enclosure.$.url
                  item.enclosureType = enclosure.$.type
              }

              items.push(item);
            });
            self.items = items;
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
      items: []
      //
    }
  }
}
</script>
