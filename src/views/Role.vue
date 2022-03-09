<template>
  <!-- Add button -->
  <div v-if="$can('create_role')" class="flex text-sm justify-end">
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
  <!-- Table -->
  <custom-datatable
    :items="roles"
    :loading="loading"
    :columns="columns"
    @getAction="setAction"
    :totalPages="totalPages"
    :perPage="perPage"
    :currentPage="currentPage"
    @pagechanged="onPageChange"
  ></custom-datatable>

  <!-- modal -->
  <custom-modal v-if="isShow" :title="title" :action="action">
    <template #body>
      <form @submit.prevent="createRole">
        <div class="modal px-10 py-6">
          <div class="flex flex-wrap items-center w-full my-2">
            <label class="w-2/6 text-left">Display Name</label>
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
                v-model="form.display_name"
              />
              <p v-if="errors.display_name" class="text-red-600 text-sm pt-1">
                {{ errors.display_name[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center w-full my-2">
            <label class="w-2/6 text-left">Description</label>
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
                v-model="form.description"
              />
              <p v-if="errors.description" class="text-red-600 text-sm pt-1">
                {{ errors.description[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center w-full my-2">
            <label class="w-2/6 text-left" for="">Permissions</label>
            <div class="w-4/6">
              <multi-select
                v-model="form.permissions"
                :options="permissions"
                :searchable="true"
                mode="tags"
              ></multi-select>
              <p v-if="errors.permissions" class="text-red-600 text-sm pt-1">
                {{ errors.permissions[0] }}
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
            v-if="action === 'Update' && $can('delete_role')"
            @click="setAction(role, 'delete')"
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
            v-if="$can('create_role')"
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
export default {
  name: "RoleView",
  data: function () {
    return {
      title: "Role",
      action: "",
      currentPage: 1,
      totalPages: 1,
      perPage: 1,
      total: 1,
      form: {
        id: "",
        display_name: "",
        description: "",
        permissions: [],
      },
      columns: ["display_name", "description", "created_at"],
    };
  },
  components: {
    "custom-datatable": CustomDataTable,
    "custom-modal": CustomModal,
  },
  mixins: [modalMixin],
  methods: {
    ...mapActions({
      createRole: "createRole",
      updateRole: "updateRole",
      deleteRole: "deleteRole",
      getRoles: "getRoles",
      getPermissions: "getPermissions",
      getMe: "getMe",
    }),
    submitFormHandler() {
      if (this.action === "Create") {
        this.createRole(this.form).then((status) => {
          if (status === 201) {
            this.closeModal();
            this.getRoles();
          }
        });
      }
      if (this.action === "Update") {
        this.updateRole(this.form).then((status) => {
          if (status === 200) {
            this.closeModal();
            this.formClear();
            this.getRoles();
            this.getMe();
          }
        });
      }
      if (this.action === "Delete") {
        this.deleteRole(this.form.id).then((status) => {
          if (status === 200) {
            this.closeModal();
            this.formClear();
            this.getRoles();
          }
        });
      }
      this.fetchRoles(this.currentPage);
    },
    fetchRoles(page) {
      this.getRoles(page).then((response) => {
        this.totalPages = response.last_page;
        this.currentPage = response.current_page;
        this.perPage = response.per_page;
        this.total = response.total;
      });
    },
    onPageChange(page) {
      this.fetchRoles(page);
    },
    formClear() {
      this.form.id = "";
      this.form.display_name = "";
      this.form.description = "";
      this.form.permissions = [];
    },

    setAction(item, action) {
      if (action === "create") {
        this.action = "Create";
        this.formClear();
        this.showModal();
      }
      if (action === "update") {
        if (this.$can("update_role")) {
          this.action = "Update";
          this.form.id = item.id;
          this.form.display_name = item.display_name;
          this.form.description = item.description;
          this.form.permissions = item.permissions;
          this.showModal();
        }
      }
      if (action === "delete") {
        this.action = "Delete";
        this.submitFormHandler();
      }
    },
  },
  mounted() {
    this.getRoles(this.currentPage);
    this.getPermissions();
  },
  computed: {
    ...mapGetters({
      roles: "roles",
      errors: "errors",
      loading: "loading",
      permissions: "permissions",
    }),
  },
};
</script>

<style scoped>
.modal {
  width: 600px;
}
</style>