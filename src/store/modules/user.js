import * as API from '../../services/api-service';
const state = {
    users: [],
};

const mutations = {
    SET_USERS(state, users) {
        state.users = users;
    },
}
const actions = {
    async getUsers(context, page) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/users?page=${page}`,
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 200) {
            context.commit("SET_USERS", response.data.data)
            context.commit("SET_LOADING", false, {root: true})
            return response.data
        } else {    
            context.commit("SET_ERRORS", response.data.message, {root: true})
            context.commit("SET_USERS", []);
            context.commit("SET_LOADING", false, {root: true})
        }
    },
    async createUser(context, payload) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/users",
                method: "POST",
                data: payload
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 201) {
            context.commit("SET_LOADING", false, {root: true})
            return response.status
        }
        if(response.status === 422) {
            context.commit("SET_ERRORS", response.data.message, {root: true})
            context.commit("SET_LOADING", false, {root: true})
            return response.status
        } 
        else {    
            context.commit("SET_USERS", []);
        }
    } ,
    async updateUser(context, payload) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/users/${payload.id}`,
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
            context.commit("SET_USERS", []);
        }
    } ,
    async deleteUser(context, user) {
        const response = await API.call({
            config: {
                url: `/users/${user}`,
                method: "DELETE",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 200) {
            return response.status
        }
        if(response.status === 422) {
            context.commit("SET_ERRORS", response.data.message, {root: true})
            return response.status
        }
        else {    
            context.commit("SET_USERS", []);
        }
    } ,
};
const getters = {
    users: state => state.users,
};

export default {
    state,
    mutations,
    actions,
    getters
}