<template>
  <div id="app">
    <navbar />

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
<script>
import Navbar from "./components/Navbar";

export default {
  components: {Navbar},
}
</script>
