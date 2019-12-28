<template>
  <div id="app">
    <navbar />

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <router-view v-if="!isLoading" />
          <clip-loader v-if="isLoading" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
<script>
import Navbar from "./components/Navbar";
import {mapGetters} from "vuex";
import ClipLoader from "vue-spinner/src/ClipLoader";

export default {
  components: {ClipLoader, Navbar},
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>
