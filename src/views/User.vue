<template>
  <div class="flex text-sm justify-end">
    <button
      class="
        px-2
        py-2
        border-black border
        rounded-sm
        hover:bg-blue-600 hover:border-0 hover:text-white
      "
      @click="setAction(null, 'create')"
    >
      Add {{ title }}
    </button>
  </div>
  <custom-datatable
    :items="users"
    :loading="loading"
    :columns="columns"
    @getAction="setAction"
    :totalPages="totalPages"
    :perPage="perPage"
    :currentPage="currentPage"
    @pagechanged="onPageChange"
  ></custom-datatable>

  <custom-modal v-if="isShow" :title="title" :action="action">
    <template #body>
      <form @submit.prevent="createUser">
        <div class="modal px-10 py-6">
          <div class="flex flex-wrap items-center w-full my-2">
            <label class="w-2/6 text-left">Name</label>
            <div class="w-4/6">
              <input
                type="text"
                class="
                  w-full
                  px-2
                  py-1
                  border
                  focus:outline-none
                  border-black
                  rounded-sm
                "
                v-model="form.name"
              />
              <p v-if="errors.name" class="text-red-600 text-sm pt-1">
                {{ errors.name[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center w-full my-2">
            <label class="w-2/6 text-left">Email Address</label>
            <div class="w-4/6">
              <input
                type="email"
                class="
                  w-full
                  px-2
                  py-1
                  border
                  focus:outline-none
                  border-black
                  rounded-sm
                "
                v-model="form.email"
              />
              <p v-if="errors.email" class="text-red-600 text-sm pt-1">
                {{ errors.email[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center justify-between w-full my-2">
            <label class="w-2/6 text-left">Role</label>
            <div class="w-4/6">
              <select
                class="
                  border-black border
                  px-2
                  py-1
                  w-full
                  focus:outline-none
                  rounded-sm
                "
                v-model="form.role"
              >
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.display_name }}
                </option>
              </select>
              <p v-if="errors.role" class="text-red-600 text-sm pt-1">
                The role field is required
              </p>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-between border-t bg-white w-full px-4 py-3">
        <div>
          <button
            v-if="action === 'Update' && checkGate('delete_user')"
            @click="setAction(user, 'delete')"
            class="
              text-sm
              mx-1
              px-2
              py-1
              border-black border
              rounded-sm
              hover:bg-red-600 hover:border-0 hover:text-white
              w-16
            "
          >
            Delete
          </button>
        </div>
        <div class="flex flex-row">
          <button
            @click="closeModal"
            class="
              text-sm
              mx-1
              px-2
              py-1
              border-black border
              rounded-sm
              hover:bg-gray-600 hover:border-0 hover:text-white
              w-16
            "
          >
            Cancel
          </button>
          <button
            v-if="checkGate('create_user')"
            type="submit"
            @click="submitFormHandler()"
            :class="
              action == 'Add' ? 'hover:bg-green-600' : 'hover:bg-blue-600'
            "
            class="
              text-sm
              mx-1
              px-2
              py-1
              border-black border
              rounded-sm
              hover:border-0 hover:text-white
              w-16
            "
          >
            {{ action }}
          </button>
        </div>
      </div>
    </template>
  </custom-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import modalMixin from "../mixins/modalMixin";
import CustomDataTable from "../components/CustomDataTable.vue";
import CustomModal from "../components/CustomModal.vue";
import checkGate from "../mixins/gateMixin";
export default {
  name: "UserView",
  data: function () {
    return {
      title: "User",
      action: "",
      currentPage: 1,
      totalPages: 1,
      perPage: 1,
      total: 1,
      form: {
        id: "",
        name: "",
        email: "",
        role: "",
      },
      columns: ["name", "email", "role", "created_at"],
    };
  },
  components: {
    "custom-datatable": CustomDataTable,
    "custom-modal": CustomModal,
  },
  mixins: [modalMixin, checkGate],
  methods: {
    ...mapActions({
      createUser: "createUser",
      updateUser: "updateUser",
      deleteUser: "deleteUser",
      getUsers: "getUsers",
      getRoles: "getRoles",
    }),
    submitFormHandler() {
      if (this.action === "Create") {
        this.createUser(this.form).then((status) => {
          if (status === 201) {
            this.closeModal();
            this.getUsers();
          }
        });
      }
      if (this.action === "Update") {
        this.updateUser(this.form).then((status) => {
          if (status === 200) {
            this.closeModal();
            this.formClear();
            this.getUsers();
          }
        });
      }
      if (this.action === "Delete") {
        this.deleteUser(this.form.id).then((status) => {
          if (status === 200) {
            this.closeModal();
            this.formClear();
            this.getUsers();
          }
        });
      }
      this.fetchUsers(this.currentPage);
    },
    formClear() {
      this.form.id = "";
      this.form.name = "";
      this.form.email = "";
      this.form.role = "";
    },
    fetchUsers(page) {
      this.getUsers(page).then((response) => {
        this.totalPages = response.last_page;
        this.currentPage = response.current_page;
        this.perPage = response.per_page;
        this.total = response.total;
      });
    },
    onPageChange(page) {
      this.fetchUsers(page);
    },
    setAction(user, action) {
      if (action === "create") {
        this.action = "Create";
        this.formClear();
        this.showModal();
      }
      if (action === "update") {
        this.action = "Update";
        this.form.id = user.id;
        this.form.name = user.name;
        this.form.email = user.email;
        this.form.role = user.role.id;
        this.showModal();
      }
      if (action === "delete") {
        this.action = "Delete";
        this.submitFormHandler();
      }
    },
  },
  mounted() {
    this.fetchUsers(this.currentPage);
    this.getRoles();
  },
  computed: {
    ...mapGetters({
      users: "users",
      roles: "roles",
      loading: "loading",
      errors: "errors",
    }),
  },
};
</script>

<style scoped>
.modal {
  width: 600px;
}
</style>