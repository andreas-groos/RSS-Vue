<template>
  <v-layout column>
    <v-list-tile v-for="feed in feedList"
                 :key="feed.url">
      <v-list-tile-avatar tile
                          size="32">
        <img :src="feed.favicon">
      </v-list-tile-avatar>
      <v-subheader>{{feed.title}}</v-subheader>
    </v-list-tile>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SidebarFeedList",
  computed: { ...mapGetters(["feedList"]) }
};
</script>

<style>
</style>
