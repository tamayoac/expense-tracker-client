import * as API from '../../services/api-service';

const state = {
    user: [],
    role: '',
    auth: {
        access_token: localStorage.getItem('access_token') || null,
        duration: localStorage.getItem('expiration') || 0,
    },
    userpermissions: [],
};

const mutations = {
    SET_USER_DATA(state, user) {
        state.user = user
    },
    SET_AUTH(state, auth) {
        state.auth.access_token = auth.access_token
        state.auth.duration = auth.expires_in
        localStorage.setItem('access_token', auth.access_token)
        localStorage.setItem('expiration', auth.expires_in)
    },
    SET_USER_PERMISSIONS(state, userpermissions) {
        state.userpermissions = userpermissions
    },   
    SET_USER_ROLE(state, role) {
        state.role = role
    },
    CLEAR_USER_DATA () {
        localStorage.removeItem('access_token')
        localStorage.removeItem('expiration')
        location.reload()
    },
    LOGIN_STATUS(state, isLoggedIn) {
        state.loading = isLoggedIn;
    },
};

const actions = {
    async login (context, credentials) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/login",
                method: "POST",
                data: credentials,
            },
            isAuthenticated: false,
        }).catch((err) => err);
        if(response.status === 200) {  
            context.commit("SET_AUTH", response.data.data)
            context.commit("SET_LOADING", false,  {root: true})
            return true
        } else {
            localStorage.removeItem('access_token')
            localStorage.removeItem('expiration')
            localStorage.removeItem('refresh_token')
            context.commit("SET_ERROR", response.data)
            context.commit("SET_LOADING", false,  {root: true})
        }
    },
    async logout (context) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/logout",
                method: "POST",
            },
            isAuthenticated: true,
        }).catch((err) => err);
        if(response.status === 200) {
            context.commit("SET_LOADING", false,  {root: true})
            context.commit('CLEAR_USER_DATA')
        }
    },
    async getMe(context) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/me",
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 200) {
            context.commit("SET_USER_DATA", response.data.data.user)
            context.commit("SET_USER_ROLE", response.data.data.role)
            context.commit('SET_USER_PERMISSIONS', response.data.data.permissions);
            context.commit("SET_LOADING", false,  {root: true})
        } else {    
            context.commit("SET_USER_DATA", []);
            context.commit("SET_LOADING", false,  {root: true})
        }
    } ,
    async passwordReset(context, payload) {
        context.commit("SET_LOADING", true,  {root: true})
        const response = await API.call({
            config: {
                url: "/change-password",
                method: "POST",
                data: payload
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 200) {
            context.commit("SET_USER_DATA", response.data.data.user)
            context.commit("SET_LOADING", false,  {root: true})
            context.commit('CLEAR_USER_DATA')
        } 
        else if(response.status == 422) {    
            context.commit("SET_ERRORS", response.data.message, {root: true})
            context.commit("SET_LOADING", false, {root: true})
            return response.status
        } else {
            context.commit("SET_USER_DATA", []);
            context.commit("SET_LOADING", false,  {root: true})
        }
    } ,
};

const getters = {
    userpermissions: state => state.userpermissions,
    isLoggedIn: state => !!state.auth.access_token,
    userData: state => state.user,
    userRole: state => state.role
};

export default {
    state,
    mutations,
    actions,
    getters
}