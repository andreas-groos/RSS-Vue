import Vue from "vue";
import Vuex from "vuex";
import cloneDeep from "lodash/cloneDeep";
import uniqBy from "lodash/uniqBy";
import findIndex from "lodash/findIndex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    feeds: [],
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
    }
  }
});
