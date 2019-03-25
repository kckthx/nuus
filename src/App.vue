<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>NUUS</span>
        <span class="font-weight-light"> RSS READER</span>
      </v-toolbar-title>

    </v-toolbar>

<v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      style="position:fixed; top:0; left:0; overflow-y:scroll;"
      >
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
  
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
  
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
  
          <v-list-tile
            v-for="item in menuItems"
            :key="item.title"
            @click=""
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
              <v-list-tile-action>
                <v-checkbox v-model="$root.showMedia"></v-checkbox>
              </v-list-tile-action>
  
              <v-list-tile-content @click="$root.showMedia = !$root.showMedia">
                <v-list-tile-title>Show media</v-list-tile-title>
                <v-list-tile-sub-title>Show images, video and audio</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

        </v-list>
      </v-navigation-drawer>

    <v-content>
      <UrlInput v-on:update:url="urlUpdated($event)" v-bind:url="url"/>
      <ItemList v-bind:items="items"/>
    </v-content>
  </v-app>
</template>

<script>
import UrlInput from './components/UrlInput'
import ItemList from './components/ItemList'
import axios from "axios";
import sanitizeHTML from 'sanitize-html';
//import { settings } from './services/settings';

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
//mixins: [settings],
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
              //console.log(i);
              console.log(sanitizeHTML(i.description));
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
      items: [],
      drawer: null,
      menuItems: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
      //
    }
  }
}
</script>
