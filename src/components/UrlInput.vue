<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
    <v-flex>
        <v-text-field
          v-model="dataUrl"
            append-icon="get_app"
            prepend-icon="home"
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
      dataUrl: this.url
    }),
    methods: {
      appendIconClicked () {
        this.$emit('update:url', this.dataUrl);
       }
    }
  }
</script>

<style>

</style>
