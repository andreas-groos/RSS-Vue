import Vue from "vue";
import Router from "vue-router";
import SinglePost from "./components/SinglePost.vue";
import PostList from "./components/PostList.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "PostList",
      component: PostList
    },
    {
      path: "/details",
      name: "SinglePost",
      component: SinglePost
    }
  ]
});
