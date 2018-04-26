<template>
  <div class="main-body">
    <ul>
      <li @click="selectPost(post)"
          :key="post.title"
          :class="{read: post.read}"
          v-for="post in selectedFeedPosts">
        <div v-html="post.title"></div>
        <font-awesome-icon v-if="hasAudio(post)"
                           :icon="audio"
                           class="spacer"
                           size="2x" />
        <small v-html="shorten(post.summary)"></small>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import truncate from "truncate-html";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import music from "@fortawesome/fontawesome-free-solid/faMusic";
import SinglePost from "./SinglePost";

export default {
  name: "PostList",
  data() {
    return {
      list: true
    };
  },
  components: { FontAwesomeIcon, SinglePost },
  computed: {
    ...mapGetters(["selectedFeedPosts"]),
    ...mapState(["selectedPost", "listView"]),
    audio() {
      return music;
    }
  },
  methods: {
    shorten: function(html) {
      if (html && html.length > 0) {
        return truncate(html, {
          length: 200,
          ellipsis: "~",
          excludes: ["img", "h1"]
        });
      } else {
        return "";
      }
    },
    hasAudio: function(post) {
      let audio = false;
      if (post.enclosures) {
        post.enclosures.map(e => {
          if (e.type.includes("audio")) {
            audio = true;
          }
        });
      }
      return audio;
    },
    selectPost: function(post) {
      this.$store.commit("selectPost", post);
      this.list = false;
      this.$router.push("/details");
    }
  }
};
</script>

<style>
.main-body {
  color: black;
  text-align: left;
  margin-top: 20px;
}
.spacer {
  margin-right: 10px;
  margin-top: 5px;
  float: left;
}
.read {
  color: grey;
}
</style>
