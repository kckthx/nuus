<template>
        <v-card class="ma-3"> 

<div v-if="$root.showMedia">
            <video v-if="item.enclosureType != null && item.enclosureType.indexOf('video') === 0" 
              ref="video"
              width="100%" 
              controls 
              @timeupdate="onTimeUpdate"
              v-bind:currentTime.prop="savedPlayTime(item.enclosure)">
              <source :src="item.enclosure" :type="item.enclosureType">
              Your browser does not support the video tag.
            </video>
          <v-img v-else-if="item.imageSrc != null"
            :src="item.imageSrc"
            aspect-ratio="2.75"
          ></v-img>
</div>
          <v-card-title primary-title>
            <div>
              <h3>{{ item.title }}</h3>
            </div>
          </v-card-title>
          <v-card-text>
              <div v-html="item.description" />
          </v-card-text>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
</template>


<script>

export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  mounted: () => ({
  }),
  // data: () => ({
  //   savedPlayTime: 30
  // }),
  methods: {
    onTimeUpdate () {
        // Save playhead position
        var url = this.item.enclosure;
        var time = this.$refs.video.currentTime;
        localStorage.setItem("playhead:" + url, time);
      },
    savedPlayTime(url) {
      // Get saved playhead position, if any
      if (localStorage.getItem("playhead:" + url) != null) {
        return localStorage.getItem("playhead:" + url);
      }
      return 0;
    }
  }
};
</script>

<style>
</style>
