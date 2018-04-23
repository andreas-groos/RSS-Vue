<template>
  <div>
    <div class="list">
      <div class="display-2">Regular</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  computed: mapState(["posts", "subscriptions", "selectedFeed"]),
  methods: {
    selectFeed: function(key) {
      this.$store.commit("selectFeed", key);
      this.$router.push("/");
    },
    isActiveFeed: function(key) {
      if (key === this.selectedFeed) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.list {
  margin-top: 10px;
  /* margin: 10px 10px; */
  padding-left: 5px;
  /* list-style-type: bullet; */
  color: #111111;
}
.flex {
  display: flex;
  justify-content: space-between;
}

.post-number {
  color: white;
  background: darkgray;
  padding: 5px 5px;
  border-radius: 10px;
}
.activeFeed {
  background: #007bff;
  color: white;
  margin-left: -10px;
  padding-left: 10px;
}
li {
  text-align: left;
  padding: 5px 5px;
}

li:hover {
  background: rgb(125, 163, 233);
  color: white;
  border-radius: 5px;
}
</style>
