import * as API from '../../services/api-service';

const state = {
   expenses: []
};

const mutations = {
    SET_EXPENSES(state, expenses) {
        state.expenses = expenses;
    },
}
const actions = {
    async getExpenses(context, page) {
       
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/expenses?page=${page}`,
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        
        if(response.status === 200) {
            context.commit("SET_EXPENSES", response.data.data)
            context.commit("SET_LOADING", false,  {root: true})
            return response.data
        } else {    
            context.commit("SET_EXPENSES", []);
            context.commit("SET_LOADING", false,  {root: true})
        }
    },
    async createExpense(context, expense) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/expenses",
                method: "POST",
                data: expense
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
            context.commit("SET_EXPENSES", []);
        }
    } ,
    async updateExpense(context, expense) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/expenses/${expense.id}`,
                method: "PUT",
                data: expense
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
            context.commit("SET_EXPENSES", []);
        }
    } ,
    async deleteExpense(context, expense) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: `/expenses/${expense}`,
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
            context.commit("SET_EXPENSES", []);
        }
    } ,
};
const getters = {
    expenses: state => state.expenses,
};

export default {
    state,
    mutations,
    actions,
    getters
}