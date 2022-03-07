import * as API from '../../services/api-service';

const state = {
   permissions: []
};

const mutations = {
    SET_PERMISSIONS(state, permissions) {
        state.permissions = []
        permissions.forEach(item => {
            state.permissions.push({
                'label': item.title,
                'value': item.id,
            })
        });
       return state.permissions
    },
}
const actions = {
    async getPermissions(context) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/permissions",
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        
        if(response.status === 200) {
            context.commit("SET_PERMISSIONS", response.data)
            context.commit("SET_LOADING", false,  {root: true})
        } else {    
            context.commit("SET_PERMISSIONS", []);
            context.commit("SET_LOADING", false,  {root: true})
        }
    },
};
const getters = {
    permissions: state => state.permissions,
};

export default {
    state,
    mutations,
    actions,
    getters
}