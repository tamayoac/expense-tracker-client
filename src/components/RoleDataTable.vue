<template>
  <div class="w-full mb-8 overflow-hidden mt-4">
    <div v-if="items.length > 0">
      <div v-if="!loading" class="w-full">
        <div class="w-full">
          <div>
            <div class="table-header">
              <div class="w-full px-3 py-4 text-sm">Role</div>
              <div class="w-full px-3 py-4 text-sm">Description</div>
              <div class="w-full px-3 py-4 text-sm">Created At</div>
            </div>
          </div>

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
            <div class="w-full py-3 px-4 text-md">
              {{ item.display_name }}
            </div>
            <div class="w-full py-3 px-4 text-md">{{ item.description }}</div>

            <div class="w-full py-3 px-4 text-md">{{ item.created_at }}</div>
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
    permissions: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
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

<style lang="scss" scoped>
</style>