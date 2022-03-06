<template>

    <category-item :categories="categories" :loading="loading" @getAction="setAction"></category-item>
     <category-modal :action="action" :isShow="isShow"></category-modal>
</template>
<script>
import { mapGetters } from 'vuex'
import CategoryItem from '../components/CategoryItem.vue'
import CategoryModal from '../components/CategoryModal.vue'
import modalMixin from '../mixins/modalMixin'
export default {
name: "CategoryView",
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
components: {
    'category-item': CategoryItem,
    'category-modal': CategoryModal
    
},
mixins: [modalMixin],
computed: {
        ...mapGetters({
        categories: 'categories',
        errors: 'errors',
        loading: 'loading'
    })
},
methods: {
    createCategory () {
        this.$store.dispatch("createCategory", this.form).then((status) => {
            if(status === 201) {
            this.closeModal()
            this.$store.dispatch("getCategories");
            }
            }).catch(err => {
                console.log(err);
            });
        },
    updateCategory() {
        this.$store.dispatch("updateCategory", this.form).then((status) => {
            if(status === 200) {
            this.closeModal()
            this.formClear()
            this.$store.dispatch("getCategories");
            }
        }).catch(err => {
            console.log(err);
        });
    },
    deleteCategory() {
        this.$store.dispatch("deleteCategory", this.form.id).then((status) => {
            if(status === 200) {
            this.closeModal()
            this.formClear()
            this.$store.dispatch("getCategories");
            }
        }).catch(err => {
            console.log(err);
        });
    },
    submitFormHandler() {
        if(this.action === 'Create') {
            this.createCategory()
        } if(this.action === "Update") {
            this.updateCategory()
        } if(this.action === "Delete") {
            this.deleteCategory()
        }
    },
    formClear(){
        this.form.id = '';
        this.form.display_name = '';
        this.form.description = '';
    },
        
    setAction(payload) {
        if(payload.action === 'create') {
            this.action = 'Create'
            this.formClear()
            this.showModal();
        }
        // if(action === 'update') {
        //     this.action = "Update"
        //     this.form.id = category.id
        //     this.form.display_name = category.display_name
        //     this.form.description = category.description
        //     this.showModal();
        // }
        // if(action === 'delete') {
        //     this.action = "Delete"
        //     this.submitFormHandler();
        //     }
        },
    },
    
}
</script>