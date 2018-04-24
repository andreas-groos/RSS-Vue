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
    feedList: [],
    errors: [],
    loading: false,
    selectedFeed: null,
    selectedPost: null,
    audioInfo: null
  },
  mutations: {
    getLocalStorage(state) {
      // let posts = JSON.parse(localStorage.getItem("posts"));
      // let subscriptions = JSON.parse(localStorage.getItem("subscriptions"));
      // let selectedFeed = localStorage.getItem("selectedFeed");
      // let selectedPost = JSON.parse(localStorage.getItem("selectedPost"));
      // if (posts) {
      //   state.posts = posts;
      // }
      // if (subscriptions) {
      //   state.subscriptions = subscriptions;
      // }
      // if (selectedFeed) {
      //   state.selectedFeed = selectedFeed;
      // }
      // if (selectedPost) {
      //   state.selectedPost = selectedPost;
      // }
    },
    addNewFeed(state, feed) {
      if (!state.feedList.includes(feed.url)) {
        state.feeds.push(feed);
        state.feedList.push(feed.url);
      } else {
        state.errors.push("You already subscribed to this feed");
      }
    }
  },
  actions: {
    addNewFeed({ commit }, url) {
      console.log("action");
      let newFeed = new Feed(url);
      let fetching = new Promise(async (resolve, reject) => {
        await newFeed.fetchPosts();
        resolve(newFeed);
      });
      fetching.then(feed => {
        commit("addNewFeed", feed);
      });
    }
  }
});
