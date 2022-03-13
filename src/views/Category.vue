<template>
  <div class="container-lg">
    <div v-if="$can('create_category')" class="flex justify-end text-sm">
      <button class="primary-btn" @click="setAction(null, 'create')">
        Add {{ title }}
      </button>
    </div>
    <custom-datatable
      :items="categories"
      :loading="loading"
      :columns="columns"
      @getAction="setAction"
      :totalPages="totalPages"
      :perPage="perPage"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    ></custom-datatable>
  </div>
  <custom-modal v-if="isShow" :action="action" :title="title">
    <template #body>
      <form @submit.prevent="createCategory">
        <div class="modal px-10 py-6">
          <div class="flex flex-wrap items-center w-full my-2">
            <label class="w-2/6 text-left">Display Name</label>
            <div class="w-4/6">
              <input
                type="text"
                class="form-control"
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
                class="form-control"
                v-model="form.description"
              />
              <p v-if="errors.description" class="text-red-600 text-sm pt-1">
                {{ errors.description[0] }}
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
            v-if="action === 'Update'"
            @click="setAction(role, 'delete')"
            class="danger-btn ml-3"
          >
            Delete
          </button>
        </div>
        <div class="flex flex-row">
          <button @click="closeModal" class="default-btn mr-2">Cancel</button>
          <button
            type="submit"
            @click="submitFormHandler()"
            :class="
              action == 'Add' ? 'hover:bg-green-600' : 'hover:bg-blue-600'
            "
            class="primary-btn mr-3"
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
import CustomDataTable from "../components/CustomDataTable.vue";
import CustomModal from "../components/CustomModal.vue";
import modalMixin from "../mixins/modalMixin";
export default {
  name: "CategoryView",
  data: function () {
    return {
      title: "Category",
      currentPage: 1,
      totalPages: 1,
      perPage: 1,
      total: 1,
      action: "",
      form: {
        id: "",
        display_name: "",
        description: "",
      },
      columns: ["display_name", "description", "created_at"],
    };
  },
  components: {
    "custom-datatable": CustomDataTable,
    "custom-modal": CustomModal,
  },
  mixins: [modalMixin],
  computed: {
    ...mapGetters({
      categories: "categories",
      errors: "errors",
      loading: "loading",
    }),
  },
  mounted() {
    this.fetchCategories(this.currentPage);
  },
  methods: {
    ...mapActions({
      createCategory: "createCategory",
      updateCategory: "updateCategory",
      deleteCategory: "deleteCategory",
      getCategories: "getCategories",
    }),
    submitFormHandler() {
      if (this.action === "Create") {
        this.createCategory(this.form).then((status) => {
          if (status === 201) {
            this.closeModal();
          }
        });
      }
      if (this.action === "Update") {
        this.updateCategory(this.form).then((status) => {
          if (status === 200) {
            this.closeModal();
            this.formClear();
          }
        });
      }
      if (this.action === "Delete") {
        this.deleteCategory(this.form.id).then((status) => {
          if (status === 200) {
            this.closeModal();
            this.formClear();
          }
        });
      }
      this.fetchCategories(this.currentPage);
    },
    fetchCategories(page) {
      this.getCategories(page).then((response) => {
        this.totalPages = response.last_page;
        this.currentPage = response.current_page;
        this.perPage = response.per_page;
        this.total = response.total;
      });
    },
    onPageChange(page) {
      this.fetchCategories(page);
    },
    formClear() {
      this.form.id = "";
      this.form.display_name = "";
      this.form.description = "";
    },

    setAction(item, action) {
      if (action === "create") {
        this.action = "Create";
        this.formClear();
        this.showModal();
      }
      if (action === "update") {
        if (this.$can("update_category")) {
          this.action = "Update";
          this.form.id = item.id;
          this.form.display_name = item.display_name;
          this.form.description = item.description;
          this.showModal();
        }
      }
      if (action === "delete") {
        this.action = "Delete";
        this.submitFormHandler();
      }
    },
  },
};
</script>
<style scoped>
.modal {
  width: 600px;
}
</style>