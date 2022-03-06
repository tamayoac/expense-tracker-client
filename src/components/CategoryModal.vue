<template>
<Modal
    v-model="isShow"
    :close="closeModal"
  >
    <div class="bg-white">
      <div class="border-b bg-white w-full px-4 py-3">
        {{action}} Category
      </div>
      <form @submit.prevent="createCategory">
        <div class="modal px-10 py-6">
        <div class="flex flex-wrap items-center w-full my-2">
          <label class="w-2/6 text-left">Display Name</label>
          <div class="w-4/6">
            <input type="text" class="w-full px-2 py-1 border focus:outline-none border-black rounded-sm" v-model="form.display_name"/>
            <p v-if="errors.display_name" class="text-red-600 text-sm pt-1">{{errors.display_name[0]}}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center w-full my-2">
          <label class="w-2/6 text-left">Description</label>
            <div class="w-4/6">
              <input type="email" class="w-full px-2 py-1 border focus:outline-none border-black rounded-sm" v-model="form.description"/>
              <p v-if="errors.description" class="text-red-600 text-sm pt-1">{{errors.description[0]}}</p>
          </div>
        </div>
      </div>
      </form>
        <div class="flex justify-between border-t bg-white w-full px-4 py-3">
          <div>
            <button v-if="action === 'Update'" @click="setAction(role,'delete')" class="text-sm mx-1 px-2 py-1 border-black border rounded-sm hover:bg-red-600 hover:border-0 hover:text-white w-16">Delete</button>
          </div>
          <div class="flex flex-row">
            <button @click="closeModal" class="text-sm mx-1 px-2 py-1 border-black border rounded-sm hover:bg-gray-600 hover:border-0 hover:text-white w-16">
              Cancel
            </button>
            <button type="submit" @click="submitFormHandler()" :class="action == 'Add' ? 'hover:bg-green-600' : 'hover:bg-blue-600'" class="text-sm mx-1 px-2 py-1 border-black border rounded-sm hover:border-0 hover:text-white w-16">
              {{action}}
            </button>
        </div>
        
      </div>
    </div>
  </Modal>
</template>

<script>
import modalMixin from '../mixins/modalMixin'
export default {
    mixins: [modalMixin],
}
</script>

<style scoped>
.modal {
  width: 600px;
}
</style>