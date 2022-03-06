<template>
    <nav class="flex justify-between items-center p-4 border-b bg-white">
        <div>{{$route.name}}</div>
        <div>
          <button @click="handlerLogout" class="px-2 py-1 hover:bg-red-600 hover:text-white rounded">Logout</button>
        </div> 
    </nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'NavbarComponent',
  methods: {
  ...mapActions({
        logout: 'logout'
    }),
    handlerLogout() {
        this.logout()
    },
  }
}
</script>
<style scoped>

</style>
