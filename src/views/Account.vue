<template>
  <div class="">
    <div class="container-md">
      <div class="text-xs uppercase font-bold text-gray-400 mx-1">
        Account Information
      </div>
      <form @submit.prevent="updateInformation" class="flex flex-wrap">
        <div class="w-full flex mt-5">
          <div class="flex flex-wrap w-1/2 mx-1">
            <label for="" class="form-label w-full">Name</label>
            <input
              type="text"
              class="form-control w-full"
              v-model="userData.name"
            />
          </div>
          <div class="flex flex-wrap w-1/2 mx-1">
            <label for="" class="form-label w-full">Email</label>
            <input
              type="email"
              class="form-control w-full"
              v-model="userData.email"
              disabled
            />
          </div>
        </div>
        <div class="w-full float-right pt-3 mx-1">
          <button class="primary-btn">Update</button>
        </div>
      </form>
    </div>
    <div class="container-md">
      <div class="text-xs uppercase font-bold text-gray-400 mx-1">
        Account Security
      </div>
      <form @submit.prevent="passwordResetHandler" class="flex flex-wrap">
        <div class="w-full flex items-center pt-3">
          <div class="flex flex-wrap w-1/2 mx-1">
            <label for="" class="form-label w-full">Current Password</label>
            <div class="w-full">
              <input
                type="password"
                class="form-control"
                v-model="form.current_password"
              />
              <p
                v-if="errors.current_password"
                class="text-red-600 text-sm pt-1"
              >
                {{ errors.current_password[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap w-1/2"></div>
        </div>
        <div class="w-full flex items-center pt-3">
          <div class="flex flex-wrap w-1/2 mx-1">
            <label for="" class="form-label w-full">New Password</label>
            <div class="w-full">
              <input
                type="password"
                class="form-control"
                v-model="form.new_password"
              />
              <p v-if="errors.new_password" class="text-red-600 text-sm pt-1">
                {{ errors.new_password[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap w-1/2 mx-1">
            <label for="" class="form-label w-full">Confirm New Password</label>
            <div class="w-full">
              <input
                type="password"
                class="form-control"
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
        </div>

        <div class="w-full float-right pt-3 mx-1">
          <button class="primary-btn">Change Password</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AccountView",
  data: function () {
    return {
      userForm: {
        name: "",
      },
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
      getMe: "getMe",
    }),
    updateInformation() {
      this.userForm = this.userData.name;
    },
    passwordResetHandler() {
      this.passwordReset(this.form).then((response) => {
        console.log(response, "Successfully Reset");
      });
    },
  },
  computed: {
    ...mapGetters({
      errors: "errors",
      userData: "userData",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>