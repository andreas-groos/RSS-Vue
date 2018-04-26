<template>
  <div>
    <transition name="fade">
      <MainPostList v-if="!selectedPost" />
      <MainPostDetail v-else/>
      <!-- <router-view></router-view> -->
    </transition>
  </div>
</template>

<script>
import MainPostList from "./MainPostList";
import MainPostDetail from "./MainPostDetail";
import { mapState } from "vuex";

export default {
  name: "Main",
  components: { MainPostList, MainPostDetail },
  computed: {
    ...mapState(["selectedPost"])
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
}
