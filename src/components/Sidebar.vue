<template>
  <div
    class="
      w-64
      h-screen
      fixed
      pb-6
      px-0
      bg-gradient-to-r
      from-purple-500
      to-blue-500
    "
  >
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
        <div class="flex justify-center flex-col">
          <button
            v-if="$can(nav.gate)"
            @click="toggleNav(nav)"
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
          >
            {{ nav.title }}
          </button>
          <div v-if="toggle">
            <div v-for="children in nav.children" :key="children.title">
              <button
                v-if="$can(children.gate)"
                @click="toggleNav(children)"
                class="
                  pl-16
                  w-full
                  flex
                  items-center
                  p-3
                  text-base
                  dark:text-white
                  hover:bg-blue-200 hover:bg-opacity-25
                  text-white
                  font-normal
                "
                :class="
                  children.title === this.$route.name
                    ? 'border-l-2 border-white bg-blue-200 bg-opacity-25 w-full text-white'
                    : ''
                "
              >
                {{ children.title }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavbarComponent",
  data: function () {
    return {
      toggle: true,
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
    toggleNav(nav) {
      if (!Array.isArray(nav.children)) {
        this.$router.push({ path: nav.link });
      } else {
        this.toggle = !this.toggle;
      }
    },
  },
  mounted() {
    this.getMe();
  },
  watch: {
    $route: {
      handler(from) {
        if (from.name != "Login") {
          this.getMe();
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      userpermissions: "userpermissions",
      userData: "userData",
      userRole: "userRole",
      isLoggedIn: "isLoggedIn",
    }),
  },
};
</script>
