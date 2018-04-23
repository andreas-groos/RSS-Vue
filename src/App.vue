<template>
  <div>
    <Home />
  </div>
</template>

<script>
import Home from "./views/Home";
import "vuetify/dist/vuetify.min.css";
export default {
  name: "App",
  components: { Home }
};
</script>
<style lang="scss">
body {
  font-family: "Roboto", "Ubuntu", sans-serif; // FIXME: didn't use Roboto otherwise
}
</style>
