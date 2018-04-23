<template>
  <div>
    <font-awesome-icon :icon="plusSquare"
                       size="2x"
                       @click="addSubscription" />
    <font-awesome-icon :icon="sync"
                       class="pull-right"
                       size="2x"
                       @click="updateSubscriptions" />
    <transition name="slide">
      <input v-if="showAddSubscriptionBox"
             class="subscriptionUrlInput"
             v-model="newSubscriptionUrl"
             v-on:keyup.enter="submit"
             type="text"
             placeholder="new Subscription Url"></input>
    </transition>
    <div v-if="audioInfo && audioInfo.url">
      <audio controls>
        <source :src="audioInfo.url"
                :type="audioInfo.type">
      </audio>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import plusSquare from "@fortawesome/fontawesome-free-solid/faPlusSquare";
import sync from "@fortawesome/fontawesome-free-solid/faSync";
import { mapState } from "vuex";

export default {
  name: "Header",
  components: { FontAwesomeIcon },
  data() {
    return {
      showAddSubscriptionBox: false,
      newSubscriptionUrl: ""
    };
  },
  methods: {
    addSubscription: function() {
      this.showAddSubscriptionBox = !this.showAddSubscriptionBox;
    },
    updateSubscriptions: function() {
      this.$store.dispatch("updateSubscriptions");
    },
    submit: function() {
      this.$store.dispatch("addNewSubscription", this.newSubscriptionUrl);

      this.newSubscriptionUrl = "";
      this.showAddSubscriptionBox = false;
    }
  },
  computed: {
    plusSquare() {
      return plusSquare;
    },
    sync() {
      return sync;
    },
    ...mapState(["audioInfo"])
  }
};
</script>

<style scoped>
.subscriptionUrlInput {
  margin-left: 10px;
  padding-left: 10px;
  border-radius: 10px;
}
.pull-right {
  margin-left: auto;
  margin-right: 10px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
}
.slide-enter,
.slide-leave-to {
  /* transform: translate(-100%); */
  opacity: 0;
}
</style>
