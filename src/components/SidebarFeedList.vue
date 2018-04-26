<template>
  <v-layout column>
    <v-list-tile v-for="feed in feedList"
                 class="feed-list"
                 @click="handleFeedClick(feed.url)"
                 :key="feed.url">
      <v-list-tile-avatar tile
                          size="32">
        <img :src="feed.favicon">
      </v-list-tile-avatar>
      <div class="flex">
        <v-subheader>{{feed.title}}</v-subheader>
        <v-chip outline
                color="primary">{{feed.numberOfPosts}}</v-chip>
      </div>
    </v-list-tile>
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
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.feed-list:hover {
  background: lightgray;
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
