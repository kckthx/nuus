<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-menu offset-y data-app>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">home</v-icon>
        </template>
        <v-list>
          <v-list-tile
            v-for="(item, index) in menuItems"
            :key="index"
            @click="menuItemClicked(item.url)"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    <v-flex>
        <v-text-field
          v-model="dataUrl"
            append-icon="get_app"
            @click:append="appendIconClicked"
          >
            This is the url
        </v-text-field>
      </v-flex>
        </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      url: String
     },
    data: () => ({
      menuItems: [
        { title: 'NASA', url: './assets/nasa.xml' },
        { title: 'The Guardian', url: './assets/test.xml' },
      ],
      dataUrl: ""
    }),
    methods: {
      appendIconClicked () {
        this.$emit('update:url', this.dataUrl);
       },
      menuItemClicked (url) {
        this.$emit('update:url', url);
       }
    }
  }
</script>

<style>

</style>
