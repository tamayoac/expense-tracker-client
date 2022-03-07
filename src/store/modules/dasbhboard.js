import * as API from '../../services/api-service';
const state = {
    dashboard_expenses: [],
}
const actions = {
    async getDashboard(context) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/dashboard",
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 200) {
            context.commit("SET_DASHBOARD_EXPENSES", response.data.data)
            return response.data.data
        } 
    }
}
const mutations = {
    SET_DASHBOARD_EXPENSES(state, dashboard_expenses) {
       state.dashboard_expenses = dashboard_expenses
    },
}
const getters = {
    dashboard_expenses: state => state.dashboard_expenses,
}

export default  {
    state,
    actions,
    mutations,
    getters
}