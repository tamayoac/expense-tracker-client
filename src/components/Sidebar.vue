<template>
    
    <div class="w-64 h-screen fixed pb-6 px-0 bg-blue-600">
        <div class="text-lg font-bold py-3 px-6 text-white">Expense Tracker</div>
        <div>
            <div v-for="nav in navs" :key="nav.title" class="pt-2">
                <div v-if="checkGate(nav.gate)" class="flex justify-center flex-col">
                    <router-link :to="nav.link" class="flex items-center px-6 py-2 text-base font-normal text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{{nav.title}}</router-link>
                    <div v-for="children in nav.children" :key="children.title">
                        <div v-if="checkGate(children.gate)" class=" text-white font-normal">
                            <router-link :to="children.link" class="pl-16 w-full flex items-center p-2 text-base font-normal text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{{children.title}}</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import checkGate from '../mixins/gateMixin'
export default {
  name: 'NavbarComponent',
  data: function() {
      return {
          navs: [
            {
                'link': '/dashboard',
                'title': 'Dashboard', 
                'icon': 'bell',
                'gate': 'view_dashboard'
            },
            {
                'link': '#',
                'title': 'User Management',
                'icon': 'user',
                'gate': ['view_role', 'view_user'],
                'children': [
                    {
                        'link': '/roles',
                        'title': 'Roles', 
                        'icon': '',
                        'gate': 'view_role'
                    },
                    {
                        'link': '/users',
                        'title': 'Users', 
                        'icon': '',
                        'gate': 'view_user'
                    },
                ]

            },
            {
                'link': '#',
                'title': 'Expense Management',
                'icon': 'user',
                'gate': ['view_category','view_expense'],
                'children': [
                    {
                        'link': '/categories',
                        'title': 'Categories', 
                        'icon': '',
                        'gate': 'view_category'
                    },
                    {
                        'link': '/expenses',
                        'title': 'Expenses', 
                        'icon': '',
                        'gate': 'view_expense'
                    },
                ]

            },
          ]
      }
  },
  mixins: [checkGate],
    
    mounted() {
        this.$store.dispatch("getMe");
        this.$store.dispatch("getUserPermission");
    },
    computed: {
        ...mapGetters({
        userpermissions: 'userpermissions',
    })
  },
}
</script>
<style scoped>

</style>
