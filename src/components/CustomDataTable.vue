<template>
  <div class="w-full mb-8 overflow-hidden mt-4">
    <div v-if="!loading" class="w-full">
      <table class="w-full">
        <thead>
          <tr
            class="
              text-md
              font-semibold
              tracking-wide
              text-left text-gray-900
              bg-gray-100
              uppercase
              border-b border-gray-600
            "
          >
            <th
              v-for="(column, index) in columns"
              :key="index"
              class="px-4 py-3 text-xs font-normal border"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="index"
            class="text-gray-700 hover:bg-blue-600 hover:text-white"
            @click="setAction(item, 'update')"
          >
            <td
              v-for="(column, indexColumn) in columns"
              :key="indexColumn"
              class="px-4 py-3 border text-sm"
            >
              {{
                typeof item[column] != "object"
                  ? item[column]
                  : item[column][column]
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="flex justify-center items-center">
      <span class="text-lg text-gray-400">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    loading: Boolean,
    columns: Array,
  },
  methods: {
    setAction(item, action) {
      this.$emit("getAction", item, action);
    },
  },
};
</script>