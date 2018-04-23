<template>
  <div>
    <b-container class="main">
      <b-row>
        <b-col v-if="post">
          <h1>{{post.title}}</h1>

          <font-awesome-icon :icon="star"
                             :color="{gold : post.star}"
                             @click="toggleStar"
                             size="2x" />
          <p v-if="!isDouble"
             v-html="noImg(post.summary)"></p>
          <hr />
          <h6 v-html="post.description"></h6>
          <div v-if="audioInfo.url">
            <b-button variant="outline-primary"
                      @click="setAudio"
                      block>Listen to audio</b-button>
          </div>
        </b-col>
        <b-col v-else>
          <p>Something went wrong</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import truncate from "truncate-html";
import { mapState } from "vuex";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import star from "@fortawesome/fontawesome-free-solid/faStar";

export default {
  name: "SinglePost",
  data() {
    return {
      // audio: this.hasAudio()
    };
  },
  components: { FontAwesomeIcon },
  computed: {
    ...mapState({ post: "selectedPost" }),
    // In some feed description and summary are the same, don't render summary in this case
    isDouble() {
      if (this.post.description == this.post.summary) {
        return true;
      } else {
        return false;
      }
    },
    audioInfo() {
      let info = {};
      if (this.post && this.post.enclosures) {
        this.post.enclosures.map(e => {
          if (e.url) {
            info.url = e.url;
            info.type = e.type;
          }
        });
      }
      return info;
    },
    star() {
      return star;
    }
  },
  methods: {
    toggleStar() {
      this.$store.commit("toggleStar", this.post);
    },
    noImg: function(html) {
      if (html && html.length > 0) {
        return truncate(html, {
          length: 1000,
          excludes: "img"
        });
      } else {
        return "";
      }
    },
    setAudio: function() {
      this.$store.commit("setAudioSource", this.audioInfo);
    }
    // hasAudio: function() {
    //   let audio = false;
    //   if (this.post && this.post.enclosures) {
    //     this.post.enclosures.map(e => {
    //       if (e.type.includes("audio")) {
    //         audio = true;
    //       }
    //     });
    //   }
    //   return audio;
    // }
  }
};
</script>

<style>
.main {
  margin-top: 10px;
  padding-left: 5px;
  color: #111111;
  text-align: left;
}
.gold {
  color: gold;
}
</style>
