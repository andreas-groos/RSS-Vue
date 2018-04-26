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
      <v-btn color="primary"
             @click="nextArticle">
        next article
      </v-btn>
    </v-layout>
    <hr/>
    <v-chip outline
            color="primary"
            v-for="category in selectedPost.categories">{{category}}</v-chip>

    <div class="mt-2 title">{{selectedPost.title}}</div>
    <div class="body-1"
         v-html="selectedPost.description"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainPostDetail",
  computed: {
    ...mapState(["selectedPost"])
  },
  mounted() {
    console.log(this.selectedPost);
  },

  methods: {
    prevArticle: function() {
      console.log("prev");
    },
    nextArticle: function() {
      console.log("next");
    },
    starPost: function() {
      this.$store.commit("starPost", this.selectedPost);
    }
  }
};
</script>

<style scoped>
.starred {
  color: goldenrod;
}
</style>
