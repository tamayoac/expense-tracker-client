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
      <tbody v-for="role in roles" :key="role.id" class="bg-white">
        <tr @click="setAction(role, 'update')" class="text-gray-700 hover:bg-blue-600 hover:text-white">
          <td class="px-4 py-3 border">
            <div class="flex items-center text-sm">
              <div>
                <div class="text-md font-semibold">{{role.display_name}}</div>
              </div>
            </div>
          </td>
          <td class="px-4 py-3 border text-xs font-semibold">{{role.description}}</td>
          <td class="px-4 py-3 border text-sm">{{role.created_at}}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-6">
        <button class="px-2 py-2 border-black border rounded-sm hover:bg-blue-600 hover:border-0 hover:text-white " @click="setAction(null, 'create')">Add Role</button>
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
        {{action}} Role
      </div>
      <form @submit.prevent="createRole">
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
import { mapGetters } from 'vuex'
import modalMixin from '../mixins/modalMixin'
export default {
    name: "RoleView",
    data: function() {
    return {
        action: '',
        form: {
        id: '',
        display_name: '',
        description: '',
        }
    }
    },
    mixins: [modalMixin],
    methods: {
    createRole () {
        this.$store.dispatch("createRole", this.form).then((status) => {
            if(status === 201) {
              this.closeModal()
              this.$store.dispatch("getRoles");
            }
            }).catch(err => {
                console.log(err);
            });
        },
    updateRole() {
        this.$store.dispatch("updateRole", this.form).then((status) => {
            if(status === 200) {
              this.closeModal()
              this.formClear()
              this.$store.dispatch("getRoles");
            }
        }).catch(err => {
            console.log(err);
        });
    },
    deleteRole() {
        this.$store.dispatch("deleteRole", this.form.id).then((status) => {
            if(status === 200) {
              this.closeModal()
              this.formClear()
              this.$store.dispatch("getRoles");
            }
        }).catch(err => {
            console.log(err);
        });
    },
    submitFormHandler() {
        if(this.action === 'Create') {
            this.createRole()
        } if(this.action === "Update") {
            this.updateRole()
        } if(this.action === "Delete") {
            this.deleteRole()
        }
    },
    formClear(){
        this.form.id = '';
        this.form.display_name = '';
        this.form.description = '';
    },
        
    setAction(role, action) {
        if(action === 'create') {
            this.action = 'Create'
            this.formClear()
            this.showModal();
        }
        if(action === 'update') {
            this.action = "Update"
            this.form.id = role.id
            this.form.display_name = role.display_name
            this.form.description = role.description
            this.showModal();
        }
        if(action === 'delete') {
            this.action = "Delete"
            this.submitFormHandler();
            }
        },
    },
    mounted() {
        this.$store.dispatch("getRoles")
    },
    computed: {
        ...mapGetters({
        roles: 'roles',
        errors: 'errors',
        loading: 'loading'
        })
    }
}
</script>

<style scoped>
.modal {
  width: 600px;
}
</style>