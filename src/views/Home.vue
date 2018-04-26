<template>
  <v-app>
    <div id="home">
      <!-- <Header class="header" />-->
      <multipane class="custom-resizer"
                 layout="vertical"
                 @paneResizeStop="stoppedResize">
        <div class="pane sidebar">
          <Sidebar />
        </div>
        <multipane-resizer></multipane-resizer>
        <div class="pane main">
          <Main />
        </div>
      </multipane>
    </div>
  </v-app>
</template>
<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { Multipane, MultipaneResizer } from "vue-multipane";

export default {
  name: "Home",
  components: { Header, Sidebar, Main, Multipane, MultipaneResizer },
  data() {
    return {};
  },
  mounted() {
    this.$store.commit("getLocalStorage");
  },
  methods: {
    stoppedResize: function(e) {
      console.log("e", e.style.width);
      // TODO: write action and write to localStorage!
    }
  }
};
</script>

<style lang="scss" >
.sidebar {
  min-width: 20rem;
  width: 20%;
}
.main {
  flex-grow: 1;
}
.custom-resizer {
  width: 100%;
  height: 100vh;
}
.custom-resizer > .pane {
  text-align: left;
  padding: 15px;
  overflow: hidden;
  // background: #eee;
  border: 1px solid #ccc;
}
.custom-resizer > .pane ~ .pane {
}
.custom-resizer > .multipane-resizer {
  margin: 0;
  left: 0;
  background: #eee;
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -1.5px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  &:hover {
    &:before {
      border-color: #999;
    }
  }
}
</style>
