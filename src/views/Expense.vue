<template>
  <custom-datatable
    :items="expenses"
    :loading="loading"
    :columns="columns"
    @getAction="setAction"
  ></custom-datatable>
  <div v-if="checkGate('create_expense')" class="flex justify-end mt-6">
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
      Add Expense
    </button>
  </div>

  <custom-modal v-if="isShow" :title="title" :action="action">
    <template #body>
      <form @submit.prevent="createExpenses">
        <div class="modal px-10 py-6">
          <div class="flex flex-wrap items-center justify-between w-full my-2">
            <label class="w-2/6 text-left">Category</label>
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
                v-model="form.category"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.display_name }}
                </option>
              </select>
              <p v-if="errors.category" class="text-red-600 text-sm pt-1">
                The Category field is required
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center w-full my-2">
            <label class="w-2/6 text-left">Amount</label>
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
                v-model="form.amount"
              />
              <p v-if="errors.amount" class="text-red-600 text-sm pt-1">
                {{ errors.amount[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center w-full my-2">
            <label class="w-2/6 text-left">Entry Date</label>
            <div class="w-4/6">
              <input
                type="date"
                class="
                  w-full
                  px-2
                  py-1
                  border
                  focus:outline-none
                  border-black
                  rounded-sm
                "
                v-model="form.date"
              />
              <p v-if="errors.date" class="text-red-600 text-sm pt-1">
                {{ errors.date[0] }}
              </p>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-between border-t bg-white w-full px-4 py-3">
        <div v-if="checkGate('delete_expense')">
          <button
            v-if="action === 'Update'"
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
            v-if="checkGate('create_expense')"
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
import checkGate from "../mixins/gateMixin";
import CustomDataTable from "../components/CustomDataTable.vue";
import CustomModal from "../components/CustomModal.vue";
export default {
  name: "ExpenseView",
  data: function () {
    return {
      action: "",
      form: {
        id: "",
        category: "",
        amount: 0.0,
        date: "",
      },
      columns: ["category", "amount", "date", "created_at"],
    };
  },
  methods: {
    ...mapActions({
      createExpense: "createExpense",
      updateExpense: "updateExpense",
      deleteExpense: "deleteExpense",
      getExpenses: "getExpenses",
      getCategories: "getCategories",
      getSelectCategory: "getSelectCategory",
    }),
    formClear() {
      (this.form.id = ""), (this.form.category = "");
      this.form.amount = "";
      this.form.date = "";
    },
    submitFormHandler() {
      if (this.action === "Create") {
        this.createExpense(this.form).then((status) => {
          if (status === 201) {
            this.closeModal();
          }
        });
      }
      if (this.action === "Update") {
        this.updateExpense(this.form).then((status) => {
          if (status === 200) {
            this.closeModal();
            this.formClear();
          }
        });
      }
      if (this.action === "Delete") {
        this.deleteExpense(this.form.id).then((status) => {
          if (status === 200) {
            this.closeModal();
            this.formClear();
          }
        });
      }
      this.getExpenses();
    },
    setAction(expense, action) {
      if (action === "create") {
        this.action = "Create";
        this.formClear();
        this.showModal();
      }
      if (action === "update") {
        if (this.checkGate("update_expense")) {
          this.action = "Update";
          this.form.id = expense.id;
          this.form.category = expense.category.id;
          this.form.amount = expense.amount;
          this.form.date = expense.date;
          this.showModal();
        }
      }
      if (action === "delete") {
        this.action = "Delete";
        this.submitFormHandler();
      }
    },
  },
  components: {
    "custom-datatable": CustomDataTable,
    "custom-modal": CustomModal,
  },
  mounted() {
    this.getSelectCategory();
    this.getExpenses();
  },
  computed: {
    ...mapGetters({
      categories: "categories",
      loading: "loading",
      errors: "errors",
      userRole: "userRole",
      expenses: "expenses",
    }),
  },
  mixins: [modalMixin, checkGate],
};
</script>
<style scoped>
.modal {
  width: 600px;
}
</style>