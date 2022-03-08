<template>
  <div class="flex items-center space-x-1 py-4">
    <button
      @click="onClickPreviousPage"
      :disabled="isInFirstPage"
      class="
        flex
        items-center
        px-4
        py-2
        text-gray-500
        bg-gray-300
        rounded-md
        hover:bg-blue-600 hover:text-white
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 17l-5-5m0 0l5-5m-5 5h12"
        />
      </svg>
    </button>
    <button
      v-for="page in pages"
      :key="page.name"
      :disabled="page.isDisabled"
      :class="
        isPageActive(page.name) ? 'bg-blue-600 text-white' : 'bg-gray-200'
      "
      @click="onClickPage(page.name)"
      class="
        px-4
        py-2
        text-gray-700
        rounded-md
        hover:bg-blue-600 hover:text-white
      "
    >
      {{ page.name }}
    </button>
    <button
      @click="onClickNextPage"
      :disabled="isInLastPage"
      class="
        px-4
        py-2
        text-gray-500
        bg-gray-300
        rounded-md
        hover:bg-blue-600 hover:text-white
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
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
  methods: {
    isPageActive(page) {
      return this.currentPage === page;
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        const start = this.totalPages - (this.maxVisibleButtons - 1);

        if (start === 0) {
          return 1;
        } else {
          return start;
        }
      }

      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>