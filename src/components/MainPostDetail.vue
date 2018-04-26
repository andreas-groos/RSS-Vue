<template>
  <div>
    <v-layout row
              mb-4
              justify-space-between="">
      <v-btn color="primary"
             @click="prevArticle">
        previous article
      </v-btn>
      <v-btn @click="starPost"
             :class="{starred: selectedPost.starred}">
        <v-icon>star</v-icon>
      </v-btn>
      <v-btn @click="externalLink">
        <v-icon>link</v-icon>
      </v-btn>
      <v-btn color="primary"
             @click="nextArticle">
        next article
      </v-btn>
    </v-layout>
    <hr/>
    <v-chip outline
            color="primary"
            :key="category"
            v-for="category in selectedPost.categories">{{category}}</v-chip>

    <div class="mt-2 title">{{selectedPost.title}}</div>
    <div class="body-1"
         v-html="selectedPost.description"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import find from "lodash/find";

export default {
  name: "MainPostDetail",
  computed: {
    ...mapState(["selectedPost", "selectedFeed"])
  },
  mounted() {},

  methods: {
    prevArticle: function() {
      this.$store.commit("prevPost");
    },
    nextArticle: function() {
      this.$store.commit("nextPost");
    },
    starPost: function() {
      this.$store.commit("starPost", this.selectedPost);
    },
    externalLink: function() {
      window.open(this.selectedPost.link, "_blank");
    }
  }
};
</script>

<style scoped>
.starred {
  color: goldenrod;
}
</style>
