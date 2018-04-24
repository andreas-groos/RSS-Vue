<template>
  <v-container fluid
               px-0>
    <SidebarActionItems v-on:add-feed="addFeed" />
    <SidebarFeedList />
  </v-container>
</template>

<script>
import SidebarActionItems from "./SidebarActionItems";
import SidebarFeedList from "./SidebarFeedList";

export default {
  name: "Sidebar",
  data() {
    return {};
  },
  components: { SidebarActionItems, SidebarFeedList },
  methods: {
    search: function(searchText) {
      // TODO: implement search
      this.showSearch = false;
    },
    addFeed: function(addUrl) {
      this.$store.dispatch("addNewFeed", addUrl);
    }
  }
};
</script>

<style scoped>
</style>
