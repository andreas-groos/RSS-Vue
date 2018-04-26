import Vue from "vue";
import Router from "vue-router";
import MainPostDetail from "./components/MainPostDetail.vue";
import MainPostList from "./components/MainPostList.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "MainPostList",
      component: MainPostList
    },
    {
      path: "/post",
      name: "MainPostDetail",
      component: MainPostDetail
    }
  ]
});
