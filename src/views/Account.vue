<template>
  <div class="mt-20 mx-auto max-w-2xl">
    <form @submit.prevent="passwordResetHandler">
      <div class="flex items-center pt-3">
        <label for="" class="w-2/6">Current Password</label>
        <div class="w-4/6">
          <input
            type="password"
            class="py-2 px-3 border rounded focus:outline-none w-full"
            v-model="form.current_password"
          />
          <p v-if="errors.current_password" class="text-red-600 text-sm pt-1">
            {{ errors.current_password[0] }}
          </p>
        </div>
      </div>
      <div class="flex items-center pt-3 w-full">
        <label for="" class="w-2/6">New Password</label>
        <div class="w-4/6">
          <input
            type="password"
            class="py-2 px-3 border rounded focus:outline-none w-full"
            v-model="form.new_password"
          />
          <p v-if="errors.new_password" class="text-red-600 text-sm pt-1">
            {{ errors.new_password[0] }}
          </p>
        </div>
      </div>
      <div class="flex items-center pt-3">
        <label for="" class="w-2/6">Confirm New Password</label>
        <div class="w-4/6">
          <input
            type="password"
            class="py-2 px-3 border rounded focus:outline-none w-full"
            v-model="form.new_confirm_password"
          />
          <p
            v-if="errors.new_confirm_password"
            class="text-red-600 text-sm pt-1"
          >
            {{ errors.new_confirm_password[0] }}
          </p>
        </div>
      </div>

      <button
        class="
          mt-4
          float-right
          px-2
          py-2
          border-black border
          rounded-sm
          hover:bg-blue-600 hover:border-0 hover:text-white
        "
      >
        Change Password
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AccountView",
  data: function () {
    return {
      form: {
        current_password: "",
        new_password: "",
        new_confirm_password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      passwordReset: "passwordReset",
    }),
    passwordResetHandler() {
      this.passwordReset(this.form).then((response) => {
        console.log(response, "Successfully Reset");
      });
    },
  },
  computed: {
    ...mapGetters({
      errors: "errors",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>