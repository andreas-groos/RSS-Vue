<template>
  <div>
    <v-layout row
              justify-center>
      <v-btn @click="clickOnSearch">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn @click="clickOnAdd">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-layout row>
      <v-text-field v-if="showSearch"
                    v-model="searchText"
                    @keyup.enter="$emit('search', searchText)"
                    placeholder="search anything"
                    autofocus></v-text-field>
      <v-text-field v-if="showAdd"
                    v-model="addUrl"
                    @keyup.enter="submitAddUrl"
                    placeholder="RSS url"
                    autofocus></v-text-field>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "SidebarActionItems",
  data() {
    return {
      showAdd: false,
      showSearch: false,
      addUrl: "",
      searchText: ""
    };
  },
  methods: {
    clickOnAdd: function() {
      this.showAdd = !this.showAdd;
      this.showSearch = false;
    },
    clickOnSearch: function() {
      this.showSearch = !this.showSearch;
      this.showAdd = false;
    },
    submitAddUrl: function() {
      this.$emit("add-feed", this.addUrl);
      this.showAdd = false;
      this.addUrl = "";
    }
  }
};
</script>

<style>
</style>
