<template>
  <div class="w-full mb-8 overflow-hidden mt-4">
    <div v-if="items.length > 0">
      <div v-if="!loading" class="w-full">
        <div class="w-full">
          <div>
            <div
              class="
                flex
                justify-between
                uppercase
                focus:outline-none
                border
                rounded-md
                space-x-5
                bg-gradient-to-r
                from-blue-500
                to-purple-500
                text-white
              "
            >
              <div
                v-for="(column, index) in columns"
                :key="index"
                class="w-full px-3 py-4 text-sm"
              >
                {{ column }}
              </div>
            </div>
          </div>
          <div class="">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="
                flex
                justify-between
                w-full
                border
                rounded-md
                my-2
                space-x-5
                hover:bg-gray-200 hover:border-gray-200
              "
              @click="setAction(item, 'update')"
            >
              <div
                v-for="(column, indexColumn) in columns"
                :key="indexColumn"
                class="w-full py-3 px-4 text-md"
              >
                {{
                  typeof item[column] != "object"
                    ? item[column]
                    : item[column][column]
                }}
              </div>
            </div>
          </div>
        </div>
        <custom-pagination
          :totalPages="totalPages"
          :perPage="perPage"
          :currentPage="currentPage"
          @pagechanged="onPageChange"
        ></custom-pagination>
      </div>
      <div v-else class="flex justify-center items-center">
        <span class="text-lg text-gray-400">Loading...</span>
      </div>
    </div>
    <div v-else class="flex items-center justify-center">
      <h1 class="text-xl font-bold text-gray-400 pt-32">No Data Available</h1>
    </div>
  </div>
</template>

<script>
import CustomPagination from "../components/CustomPagination.vue";
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  components: {
    "custom-pagination": CustomPagination,
  },
  methods: {
    setAction(item, action) {
      this.$emit("getAction", item, action);
    },
    onPageChange(page) {
      this.$emit("pagechanged", page);
    },
  },
};
</script>