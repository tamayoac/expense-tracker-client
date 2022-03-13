import * as API from '../../services/api-service';

const state = {
    roles: []
};

const mutations = {
    SET_ROLES(state, roles) {
        state.roles = roles;
    },
}
const actions = {
    async getSelectRoles(context) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/select-roles",
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        
        if(response.status === 200) {
          
            context.commit("SET_ROLES", response.data)
            context.commit("SET_LOADING", false,  {root: true})
        } else {    
            context.commit("SET_ROLES", []);
            context.commit("SET_LOADING", false,  {root: true})
        }
    },
    async getRoles(context, page) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/roles?page=${page}`,
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        
        if(response.status === 200) {
            
            context.commit("SET_ROLES", response.data.data)
            context.commit("SET_LOADING", false,  {root: true})
            return response.data
        } else {    
            context.commit("SET_ROLES", []);
            context.commit("SET_LOADING", false,  {root: true})
        }
    },
    async createRole(context, payload) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/roles",
                method: "POST",
                data: payload
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 201) {
            context.commit("SET_LOADING", false,  {root: true})
            return response.status
        }
        if(response.status === 422) {
            context.commit("SET_ERRORS", response.data.message, {root: true})
            context.commit("SET_LOADING", false,  {root: true})
            return response.status
        }
        else {    
            context.commit("SET_ROLES", []);
        }
    } ,
    async updateRole(context, payload) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/roles/${payload.id}`,
                method: "PUT",
                data: payload
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 200) {
            context.commit("SET_LOADING", false,  {root: true})
            return response.status
        }
        if(response.status === 422) {
            context.commit("SET_ERRORS", response.data.message, {root: true})
            context.commit("SET_LOADING", false,  {root: true})
            return response.status
        }
        else {    
            context.commit("SET_ROLES", []);
        }
    } ,
    async deleteRole(context, role) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/roles/${role}`,
                method: "DELETE",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 200) {
            context.commit("SET_LOADING", false,  {root: true})
            return response.status
        }
        if(response.status === 422) {
            context.commit("SET_ERRORS", response.data.message, {root: true})
            context.commit("SET_LOADING", false,  {root: true})
            return response.status
        }
        else {    
            context.commit("SET_ROLES", []);
        }
    } ,
};
const getters = {
    roles: state => state.roles,
};

export default {
    state,
    mutations,
    actions,
    getters
}