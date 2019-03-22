<template>
<v-container>
    <v-layout row wrap>
      <v-list>
        <v-card v-for="(item, i) in articles"
          :key="i" class="ma-3"> 
          <v-card-title primary-title>
            <div>
              <h3>{{ item.title }}</h3>
            </div>
          </v-card-title>
          <v-card-text>
              <div> {{ item.description }} </div>
          </v-card-text>
  
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-list>
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
