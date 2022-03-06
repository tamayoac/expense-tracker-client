import store from '../store'
export default {
    data: function() {
        return {
          isShow: false,
        }
    },
    methods: {
        showModal () {
            this.isShow = true
        },
        closeModal () {
            store.commit('CLEAR_ERRORS')
            this.isShow = false
          
        }
    },
}