<template>
  <nav class="flex justify-between items-center p-3 border-b bg-white text-sm">
    <div class="text-gray-400">{{ $route.name }}</div>
    <div class="flex items-center">
      <div class="pr-8 text-gray-400">Welcome to Expense Manager</div>
      <button
        @click="handlerLogout"
        class="
          px-2
          py-1
          hover:bg-red-600 hover:text-white
          text-gray-400
          rounded
          mx-10
        "
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NavbarComponent",
  methods: {
    ...mapActions({
      logout: "logout",
    }),
    handlerLogout() {
      this.logout().then((response) => {
        if (response) {
          this.$router.push({ name: "Login" });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
