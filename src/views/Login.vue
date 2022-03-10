<template>
  <div class="bg-gradient-to-r from-purple-500 to-blue-500 w-full h-screen">
    <div class="absolute mt-28 ml-36 flex items-center">
      <div class="bg-white rounded-lg shadow-xl p-10 max-w-md mx-auto">
        <div class="font-thin text-3xl text-black">Welcome</div>
        <div class="text-lg text-black">Enter your credentials below</div>
        <form @submit.prevent="loginHandler">
          <div class="text-red-500 text-sm w-full">{{ errors.message }}</div>
          <div class="flex flex-wrap pt-10">
            <div class="w-full bg-white rounded-lg border border-gray-200">
              <div class="text-black pt-3 px-3 text-sm font-bold">E-MAIL</div>
              <input
                type="text"
                class="
                  bg-white
                  w-full
                  px-3
                  py-2
                  rounded-b-md
                  focus:outline-none
                  text-black
                "
                placeholder="your@email.com"
                v-model="form.email"
              />
            </div>
            <div class="w-full bg-white mt-3 rounded-lg border">
              <div class="text-black pt-3 px-3 text-sm font-bold">PASSWORD</div>
              <input
                type="password"
                class="
                  bg-white
                  w-full
                  px-3
                  py-2
                  rounded-b-md
                  focus:outline-none
                  text-black
                "
                placeholder="Password"
                v-model="form.password"
              />
            </div>
            <div class="w-full mt-5">
              <button
                class="
                  text-sm
                  font-semibold
                  text-center text-white
                  px-3
                  py-2
                  bg-gradient-to-r
                  from-purple-400
                  via-pink-500
                  to-red-500
                  w-full
                  rounded-lg
                  uppercase
                  transform
                  hover:-translate-y-1 hover:scale-110
                  transition
                  duration-500
                  ease-in-out
                  focus:outline-none
                "
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LoginView",
  data: function () {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      errors: "errors",
    }),
  },
  methods: {
    loginHandler() {
      this.login(this.form).then((response) => {
        if (response) {
          if (this.$can("view_dashboard")) {
            this.$router.push({ name: "Dashboard" });
          }
          this.$router.push({ name: "Roles" });
        }
      });
    },
    ...mapActions({
      login: "login",
    }),
  },
};
</script>