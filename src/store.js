import Vue from "vue";
import Vuex from "vuex";
import { Feed, Post } from "./utils";
import cloneDeep from "lodash/cloneDeep";
import uniqBy from "lodash/uniqBy";
import findIndex from "lodash/findIndex";
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
      if (feeds) {
        state.feeds = feeds;
      }
    },
    addNewFeed(state, feed) {
      if (findIndex(state.feeds, o => feed.url === o.url) === -1) {
        state.feeds.push(feed);
        localStorage.setItem("feeds", JSON.stringify(state.feeds));
      } else {
        state.errors.push("You already subscribed to this feed");
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
            favicon: m.favicon
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
        resolve(newFeed);
      });
      fetching.then(feed => {
        commit("addNewFeed", feed);
      });
    }
  }
});
