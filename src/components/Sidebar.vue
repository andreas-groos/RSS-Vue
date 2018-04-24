<template>
  <v-container fluid
               px-0>
    <v-layout row
              justify-center
              py-2>
      <v-btn @click="showSearch = !showSearch">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn @click="showAdd = !showAdd">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-layout row>
      <v-text-field v-if="showSearch"
                    v-model="searchText"
                    @keyup.enter="search"
                    placeholder="search anything"
                    autofocus></v-text-field>
      <v-text-field v-if="showAdd"
                    v-model="addUrl"
                    @keyup.enter="add"
                    placeholder="RSS url"
                    autofocus></v-text-field>
    </v-layout>

  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      showSearch: false,
      showAdd: false,
      searchText: "",
      addUrl: ""
    };
  },
  methods: {
    search: function() {
      console.log("object");
      this.showSearch = false;
    },
    add: function() {
      console.log("add");
      this.$store.dispatch("addNewFeed", this.addUrl);
      this.showAdd = false;
    }
  }
};
</script>

<style scoped>
</style>
