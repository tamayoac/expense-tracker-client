<template>
<div class="w-full mb-8 overflow-hidden mt-16">
  <div v-if="!loading" class="w-full">
    <table class="w-full ">
      <thead>
        <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
          <th class="px-4 py-3 text-xs font-normal border">Name</th>
          <th class="px-4 py-3 text-xs font-normal border">Email</th>
          <th class="px-4 py-3 text-xs font-normal border">Role</th>
          <th class="px-4 py-3 text-xs font-normal border">Created at</th>
        </tr>
      </thead>
      <tbody v-for="user in users" :key="user.id" class="bg-white">
        <tr @click="setAction(user, 'update')" class="text-gray-700 hover:bg-blue-600 hover:text-white">
          <td class="px-4 py-3 border">
            <div class="flex items-center text-sm">
              <div>
                <div class="text-md font-semibold">{{user.name}}</div>
              </div>
            </div>
          </td>
          <td class="px-4 py-3 border text-xs font-semibold">{{user.email}}</td>
          <td class="px-4 py-3 border text-xs">
            <span class="px-2 py-1 font-semibold leading-tight rounded-sm">{{user.role.display_name}} </span>
          </td>
          <td class="px-4 py-3 border text-sm">{{user.created_at}}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-6">
      <button class="px-2 py-2 border-black border rounded-sm hover:bg-blue-600 hover:border-0 hover:text-white " @click="setAction(null, 'create')">Add User</button>
    </div>
    </div>
   <div v-else class="flex justify-center items-center">
      <span class="text-lg text-gray-400">Loading...</span>
    </div>
  </div>
  
  <Modal
    v-model="isShow"
    :close="closeModal"
  >
    <div class="bg-white">
      <div class="border-b bg-white w-full px-4 py-3">
        {{action}} User
      </div>
      <form @submit.prevent="createUser">
        <div class="modal px-10 py-6">
        <div class="flex flex-wrap items-center w-full my-2">
          <label class="w-2/6 text-left">Name</label>
          <div class="w-4/6">
            <input type="text" class="w-full px-2 py-1 border focus:outline-none border-black rounded-sm" v-model="form.name"/>
            <p v-if="errors.name" class="text-red-600 text-sm pt-1">{{errors.name[0]}}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center w-full my-2">
          <label class="w-2/6 text-left">Email Address</label>
            <div class="w-4/6">
              <input type="email" class="w-full px-2 py-1 border focus:outline-none border-black rounded-sm" v-model="form.email"/>
              <p v-if="errors.email" class="text-red-600 text-sm pt-1">{{errors.email[0]}}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between w-full my-2">
          <label class="w-2/6 text-left">Role</label>
          <div class="w-4/6">
            <select class="border-black border px-2 py-1 w-full focus:outline-none rounded-sm" v-model="form.role">
              <option v-for="role in roles" :key="role.id" :value="role.id">{{role.display_name}}</option>
            </select>
             <p v-if="errors.role" class="text-red-600 text-sm pt-1">The role field is required</p>
          </div>
        </div>
      </div>
      </form>
        <div class="flex justify-between border-t bg-white w-full px-4 py-3">
          <div>
            <button v-if="action === 'Update'" @click="setAction(user,'delete')" class="text-sm mx-1 px-2 py-1 border-black border rounded-sm hover:bg-red-600 hover:border-0 hover:text-white w-16">Delete</button>
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
import { mapGetters } from 'vuex'
import modalMixin from '../mixins/modalMixin'

export default {
    name: "UserView",
    data: function() {
      return {
        action: '',
        form: {
          id: '',
          name: '',
          email: '',
          role: '',
        }
      }
    },
    mixins: [modalMixin],
    methods: {
      createUser () {
        this.$store.dispatch("createUser", this.form).then((status) => {
            if(status === 201) {
              this.closeModal()
              this.$store.dispatch("getUsers");
            }
        }).catch(err => {
            console.log(err);
        });
      },
      updateUser() {
        this.$store.dispatch("updateUser", this.form).then((status) => {
            if(status === 200) {
              this.closeModal()
              this.formClear()
              this.$store.dispatch("getUsers");
            }
        }).catch(err => {
            console.log(err);
        });
      },
      deleteUser() {
          this.$store.dispatch("deleteUser", this.form.id).then((status) => {
            if(status === 200) {
              this.closeModal()
              this.formClear()
              this.$store.dispatch("getUsers");
            }
        }).catch(err => {
            console.log(err);
        });
      },
      submitFormHandler() {
        if(this.action === 'Create') {
          this.createUser()
        } if(this.action === "Update") {
          this.updateUser()
        } if(this.action === "Delete") {
          this.deleteUser()
        }
      },
      formClear(){
        this.form.id = ''
        this.form.name = '';
        this.form.email = '';
        this.form.role = '';
      },
      
      setAction(user, action) {

        if(action === 'create') {
          this.action = 'Create'
          this.formClear()
          this.showModal();
        }if(action === 'update') {
          this.action = "Update"
          this.form.id = user.id
          this.form.name = user.name
          this.form.email = user.email
          this.form.role = user.role.id
          this.showModal();
        }
        if(action === 'delete') {
          this.action = "Delete"
          this.submitFormHandler();
        }
      
      },
    },
    mounted() {
        this.$store.dispatch("getUsers");
        this.$store.dispatch("getRoles");
    },
    computed: {
    ...mapGetters({
      users: 'users',
      roles: 'roles',
      loading: 'loading',
      errors: 'errors'
    })
  },
}
</script>

<style scoped>
.modal {
  width: 600px;
}
</style>