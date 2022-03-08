import * as API from '../../services/api-service';

const state = {
   categories: []
};

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
}
const actions = {
    async getSelectCategory(context) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/select-categories",
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        
        if(response.status === 200) {
            context.commit("SET_CATEGORIES", response.data)
            context.commit("SET_LOADING", false,  {root: true})
        } else {    
            context.commit("SET_CATEGORIES", []);
            context.commit("SET_LOADING", false,  {root: true})
        }
    },
    async getCategories(context) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/categories",
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        
        if(response.status === 200) {
            context.commit("SET_CATEGORIES", response.data)
            context.commit("SET_LOADING", false,  {root: true})
        } else {    
            context.commit("SET_CATEGORIES", []);
            context.commit("SET_LOADING", false,  {root: true})
        }
    },
    async createCategory(context, payload) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/categories",
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
            context.commit("SET_CATEGORIES", []);
        }
    } ,
    async updateCategory(context, payload) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/categories/${payload.id}`,
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
            context.commit("SET_CATEGORIES", []);
        }
    } ,
    async deleteCategory(context, category) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/categories/${category}`,
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
            context.commit("SET_CATEGORIES", []);
        }
    } ,
};
const getters = {
    categories: state => state.categories,
};

export default {
    state,
    mutations,
    actions,
    getters
}