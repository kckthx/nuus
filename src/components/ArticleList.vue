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
  props: {
    articles: {
      type: Array,
      // Object or array defaults must be returned from
      // a factory function
      default: function () {
        return []
      }
    }
  },
  data: () => ({
  })
};
</script>

<style>
</style>
