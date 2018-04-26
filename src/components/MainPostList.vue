<template>
  <v-container v-if="selectedFeed"
               grid-list-md
               fluid>
    <v-layout row
              wrap>
      <v-flex xs12
              md6
              lg4
              @click="selectPost(post)"
              v-for="post in selectedFeed.posts"
              :key="post.guid">
        <v-card height="100%"
                hover>
          <v-card-title primary-title>
            <div class="flex">
              <h3 :class="{read: post.read}">{{post.title}}</h3>
              <v-icon v-if="post.starred"
                      class="starred">star</v-icon>
            </div>
          </v-card-title>
          <v-card-text :class="{read: post.read}"
                       v-html="post.shortSummary"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainPostList",
  computed: {
    ...mapState(["selectedFeed"])
  },
  methods: {
    selectPost: function(post) {
      this.$store.commit("selectPost", post);
      this.$router.push("/post");
    }
  }
};
</script>

<style scoped>
.read {
  color: grey;
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.starred {
  color: goldenrod;
}
</style>
