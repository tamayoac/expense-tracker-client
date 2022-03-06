<template>
<div class="w-full mb-8 overflow-hidden mt-16">
  <div v-if="!loading" class="w-full">
    <table class="w-full ">
      <thead>
        <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
          <th class="px-4 py-3 text-xs font-normal border">Display Name</th>
          <th class="px-4 py-3 text-xs font-normal border">Description</th>
          <th class="px-4 py-3 text-xs font-normal border">Created at</th>
        </tr>
      </thead>
      <tbody v-for="category in categories" :key="category.id" class="bg-white">
        <tr @click="setAction(category, 'update')" class="text-gray-700 hover:bg-blue-600 hover:text-white">
          <td class="px-4 py-3 border">
            <div class="flex items-center text-sm">
              <div>
                <div class="text-md font-semibold">{{category.display_name}}</div>
              </div>
            </div>
          </td>
          <td class="px-4 py-3 border text-xs font-semibold">{{category.description}}</td>
          <td class="px-4 py-3 border text-sm">{{category.created_at}}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-6">
        <button class="px-2 py-2 border-black border rounded-sm hover:bg-blue-600 hover:border-0 hover:text-white " @click="setAction(null, 'create')">Add Category</button>
        </div>
    </div>
    <div v-else class="flex justify-center items-center">
        <span class="text-lg text-gray-400">Loading...</span>
    </div>
  </div>
</template>

<script>

export default {
    props: {
        categories: Array,
        loading: Boolean
    },
    methods: {
        setAction(category, action) {
            this.$emit('getAction', {
                category: category, 
                action:action
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>