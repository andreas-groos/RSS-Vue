<template>
  <v-layout column>
    <!-- <v-navigation-drawer permanent> -->

    <v-list-tile v-for="feed in feedList"
                 class="feed-list"
                 @click="handleFeedClick(feed.url)"
                 :key="feed.url">
      <v-list-tile-avatar tile
                          size="32">
        <img :src="feed.favicon">
      </v-list-tile-avatar>
      <v-subheader>{{feed.title}}</v-subheader>
    </v-list-tile>
    <!-- </v-navigation-drawer> -->
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SidebarFeedList",
  computed: { ...mapGetters(["feedList"]) },
  methods: {
    handleFeedClick: function(e) {
      this.$store.commit("selectFeed", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.feed-list:hover {
  background: lightgray;
}
</style>
