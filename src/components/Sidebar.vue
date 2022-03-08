<template>
  <div class="w-64 h-screen fixed pb-6 px-0 bg-blue-600">
    <router-link to="/account">
      <div class="flex flex-wrap my-4">
        <div class="w-1/3">
          <div
            class="w-10 h-10 bg-gray-400 rounded-full mx-6 hover:bg-gray-500"
          ></div>
        </div>
        <div class="flex flex-wrap w-2/3 text-sm text-white">
          <div class="w-full">
            {{ userData.name }} <span class="font-bold">({{ userRole }})</span>
          </div>

          <div class="w-full">{{ userData.email }}</div>
        </div>
      </div>
    </router-link>
    <div>
      <div v-for="nav in navs" :key="nav.title">
        <div
          v-if="checkGate(nav.gate)"
          @click="toggleChild"
          class="flex justify-center flex-col"
        >
          <router-link
            :to="nav.link"
            class="
              flex
              items-center
              px-6
              py-3
              text-base
              font-normal
              text-gray-900
              dark:text-white
              hover:bg-blue-200 hover:bg-opacity-25
            "
            :class="
              nav.title === this.$route.name
                ? 'border-l-2 border-white bg-blue-200 bg-opacity-25 w-full text-white'
                : ''
            "
            >{{ nav.title }}</router-link
          >
          <div v-for="children in nav.children" :key="children.title">
            <div v-if="checkGate(children.gate)" class="text-white font-normal">
              <router-link
                :to="children.link"
                class="
                  pl-16
                  w-full
                  flex
                  items-center
                  p-3
                  text-base
                  font-normal
                  text-gray-900
                  dark:text-white
                  hover:bg-blue-200 hover:bg-opacity-25
                "
                :class="
                  children.title === this.$route.name
                    ? 'border-l-2 border-white bg-blue-200 bg-opacity-25 w-full text-white'
                    : ''
                "
                >{{ children.title }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import checkGate from "../mixins/gateMixin";
export default {
  name: "NavbarComponent",
  data: function () {
    return {
      navs: [
        {
          link: "/dashboard",
          title: "Dashboard",
          icon: "bell",
          gate: "view_dashboard",
        },
        {
          link: "#",
          title: "User Management",
          icon: "user",
          gate: ["view_role", "view_user"],
          children: [
            {
              link: "/roles",
              title: "Roles",
              icon: "",
              gate: "view_role",
            },
            {
              link: "/users",
              title: "Users",
              icon: "",
              gate: "view_user",
            },
          ],
        },
        {
          link: "#",
          title: "Expense Management",
          icon: "user",
          gate: ["view_category", "view_expense"],
          children: [
            {
              link: "/categories",
              title: "Categories",
              icon: "",
              gate: "view_category",
            },
            {
              link: "/expenses",
              title: "Expenses",
              icon: "",
              gate: "view_expense",
            },
          ],
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      getMe: "getMe",
    }),
  },
  mixins: [checkGate],
  mounted() {
    this.getMe();
  },
  watch: {
    $route: {
      handler() {
        this.getMe();
      },
    },
  },
  computed: {
    ...mapGetters({
      userpermissions: "userpermissions",
      userData: "userData",
      userRole: "userRole",
    }),
  },
};
</script>
