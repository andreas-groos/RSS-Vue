import Vue from "vue";
import Vuex from "vuex";
import { Feed, Post } from "./utils";
import cloneDeep from "lodash/cloneDeep";
import uniqBy from "lodash/uniqBy";
import findIndex from "lodash/findIndex";
import find from "lodash/find";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    feeds: [],
    errors: [],
    loading: false,
    selectedFeed: null,
    selectedPost: null,
    audioInfo: null
  },
  mutations: {
    getLocalStorage(state) {
      let feeds = JSON.parse(localStorage.getItem("feeds"));
      let selectedPost = JSON.parse(localStorage.getItem("selectedPost"));
      let selectedFeed = JSON.parse(localStorage.getItem("selectedFeed"));
      if (feeds) {
        state.feeds = feeds;
      }
      if (selectedPost) {
        state.selectedPost = selectedPost;
        if (selectedFeed) {
          state.selectedFeed = selectedFeed;
        }
      }
    },
    addNewFeed(state, feed) {
      if (findIndex(state.feeds, o => feed.url === o.url) === -1) {
        state.feeds.push(feed);
        localStorage.setItem("feeds", JSON.stringify(state.feeds));
      } else {
        state.errors.push("You already subscribed to this feed");
      }
    },
    selectFeed(state, feedUrl) {
      let feed = find(state.feeds, o => o.url === feedUrl);
      state.selectedFeed = feed;
      localStorage.setItem("selectedFeed", JSON.stringify(state.selectedFeed));
      state.selectedPost = null;
      localStorage.setItem("selectedPost", JSON.stringify(state.selectedPost));
    },
    selectPost(state, post) {
      state.selectedPost = post;
      state.selectedPost.read = true;
      localStorage.setItem("selectedPost", JSON.stringify(state.selectedPost));
      localStorage.setItem("feeds", JSON.stringify(state.feeds));
    },
    starPost(state, post) {
      state.selectedPost.starred = !state.selectedPost.starred;
      localStorage.setItem("selectedPost", JSON.stringify(state.selectedPost));
      localStorage.setItem("feeds", JSON.stringify(state.feeds));
    },
    nextPost(state) {
      let nextIndex = state.selectedPost.index + 1;
      let next = find(state.selectedFeed.posts, o => o.index === nextIndex);
      if (next) {
        state.selectedPost = next;
        localStorage.setItem(
          "selectedPost",
          JSON.stringify(state.selectedPost)
        );
      }
    },
    prevPost(state) {
      let nextIndex = state.selectedPost.index - 1;
      let prev = find(state.selectedFeed.posts, o => o.index === nextIndex);
      if (prev) {
        state.selectedPost = prev;
        localStorage.setItem(
          "selectedPost",
          JSON.stringify(state.selectedPost)
        );
      }
    }
  },
  getters: {
    feedList: state => {
      return state.feeds.map(m => {
        if (m.posts.length > 0) {
          return {
            url: m.url,
            description: m.posts[0].meta.description,
            title: m.posts[0].meta.title,
            favicon: m.favicon,
            numberOfPosts: m.posts.length
          };
        }
      });
    }
  },
  actions: {
    addNewFeed({ commit }, url) {
      console.log("action");
      let newFeed = new Feed(url);
      let fetching = new Promise(async (resolve, reject) => {
        await newFeed.getFavicon();
        await newFeed.fetchPosts();
        newFeed.posts.map(p => {
          p.extractImg();
        });
        resolve(newFeed);
      });
      fetching.then(feed => {
        commit("addNewFeed", feed);
      });
    }
  }
});
