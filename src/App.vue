<template>
  <div v-if="isLoggedIn" class="flex relative">
    <sidebar></sidebar>
    <div class="w-screen ml-64">
      <navbar></navbar>
      <div class="">
        <router-view />
      </div>
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Sidebar from "../src/components/Sidebar.vue";
import Navbar from "../src/components/Navbar.vue";
export default {
  components: {
    Sidebar,
    Navbar,
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },
};
</script>
<style>
</style>
