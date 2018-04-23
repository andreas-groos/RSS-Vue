import Vue from "vue";
import Vuex from "vuex";
import feedparser from "feedparser-promised";
import cloneDeep from "lodash/cloneDeep";
import uniqBy from "lodash/uniqBy";
import findIndex from "lodash/findIndex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    subscriptions: [],
    errors: [],
    loading: false,
    selectedFeed: null,
    selectedPost: null,
    listView: true,
    audioInfo: null
  },
  mutations: {
    getLocalStorage(state) {
      let posts = JSON.parse(localStorage.getItem("posts"));
      let subscriptions = JSON.parse(localStorage.getItem("subscriptions"));
      let selectedFeed = localStorage.getItem("selectedFeed");
      let selectedPost = JSON.parse(localStorage.getItem("selectedPost"));
      if (posts) {
        state.posts = posts;
      }
      if (subscriptions) {
        state.subscriptions = subscriptions;
      }
      if (selectedFeed) {
        state.selectedFeed = selectedFeed;
      }
      if (selectedPost) {
        state.selectedPost = selectedPost;
      }
    },
    addSubscription(state, newSubscription) {
      if (!state.subscriptions.includes(newSubscription)) {
        state.subscriptions.push(newSubscription);
        localStorage.setItem(
          "subscriptions",
          JSON.stringify(state.subscriptions)
        );
      }
      // TODO: add error handling
      //  else {
      //   commit("newError", "already subscribed");
      // }
    },
    addPosts(state, { newSubscription, items }) {
      state.posts = { ...state.posts, [newSubscription]: items };
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    newError(state, error) {
      state.errors.push(error);
    },
    selectFeed(state, feedName) {
      state.selectedFeed = feedName;
      state.selectedPost = null;
      localStorage.setItem("selectedFeed", feedName);
    },
    selectPost(state, post) {
      state.selectedPost = post;
      state.listView = false;
      let cloned = cloneDeep(state.posts);
      if (cloned) {
        Object.keys(cloned).map(key => {
          const index = findIndex(cloned[key], o => o.title === post.title);
          if (index !== -1) {
            cloned[key][index] = { ...cloned[key][index], read: true };
          }
        });
      }
      state.posts = { ...cloned };
      localStorage.setItem("posts", JSON.stringify(state.posts));
      localStorage.setItem("selectedPost", JSON.stringify(post));
    },
    setAudioSource(state, info) {
      state.audioInfo = info;
    },
    toggleStar(state, post) {
      let cloned = cloneDeep(state.posts);
      Object.keys(cloned).map(key => {
        const index = findIndex([cloned[key], o => o.title === post.title]);
        if (index !== -1) {
          cloned[key][index].star = !cloned[key][index].star;
        }
      });
      state.posts = { ...cloned };
      localStorage.setItem("posts", JSON.stringify(state.posts));
    }
  },
  actions: {
    addNewSubscription({ commit }, newSubscription) {
      commit("addSubscription", newSubscription);
      feedparser
        .parse(newSubscription)
        .then(items => {
          commit("addPosts", { newSubscription, items });
        })
        .catch(err => {
          console.log(err);
          commit("newError", err.message);
        });
    },
    updateSubscriptions(context) {
      console.log("update");
      let subs = context.state.subscriptions;
      subs.map(s => {
        feedparser.parse(s).then(items => {
          console.log(items);
          if (items) {
            console.log("s", s);
            console.log("context.state.posts[s]", context.state.posts[s]);
            let joined = context.state.posts[s].concat(items);
            console.log("joined", joined);
            joined = uniqBy(joined, "title");
            console.log("joined", joined);
            context.state.posts = [...joined];
          }
        });
      });
    }
  },
  getters: {
    selectedFeedPosts: state => {
      if (state.selectedFeed && state.posts) {
        return state.posts[state.selectedFeed];
      } else {
        return [];
      }
    }
  }
});
