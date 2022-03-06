import * as API from '../../services/api-service';

const state = {
    user: {},
    role: '',
    auth: {
        access_token: localStorage.getItem('access_token') || null,
        duration: localStorage.getItem('expiration') || 0,
    },
    userpermissions: [],
    authLoading: false,
    loginError: {
        error: ''
    }
};

const mutations = {
    SET_USER_DATA(state, user) {
        state.user = user
    },
    SET_AUTH_LOADING(state, authLoading) {
        state.authLoading = authLoading
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
    SET_ERROR(state, loginError) {
        state.loginError.error = loginError.error
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
    REGISTER_LOADING(state, registerLoading) {
        state.registerLoading = registerLoading;
    }
};

const actions = {
    async login (context, credentials) {
        context.commit('SET_AUTH_LOADING', true)
        const response = await API.call({
            config: {
                url: "/login",
                method: "POST",
                data: credentials,
            },
            isAuthenticated: false,
        }).catch((err) => err);
        if(response.status === 200) {  
            context.commit('SET_AUTH_LOADING', false)
            context.commit("SET_AUTH", response.data.data)  
        } else {
            context.commit('SET_AUTH_LOADING', false)
            localStorage.removeItem('access_token')
            localStorage.removeItem('expiration')
            localStorage.removeItem('refresh_token')
            context.commit("SET_ERROR", response.data)
        }
    },
    async register (context, payload) {
        context.commit('SET_AUTH_LOADING', true)
        const response = await API.call({
            config: {
                url: "/register",
                method: "POST",
                data: payload,
            },
            isAuthenticated: false,
        }).catch((err) => err);
        if(response.status === 201) {
            context.commit("SET_AUTH_LOADING", false);
            return response.data.code
        }
        else if(response.status === 422) {
            context.commit("SET_ERROR", response.data);
            context.commit("SET_AUTH_LOADING", false);
            return response.data.code
        }
        else {
            context.commit("SET_AUTH_LOADING", false);
        }
    },
  
    async logout (context) {
        context.commit('SET_AUTH_LOADING', true)
        const response = await API.call({
            config: {
                url: "/logout",
                method: "POST",
            },
            isAuthenticated: true,
        }).catch((err) => err);
        if(response.status === 200) {
            context.commit('SET_AUTH_LOADING', false)
            context.commit('CLEAR_USER_DATA')
        }
    },
    async getUserPermission(context) {
        context.commit("SET_AUTH_LOADING", true)
        const response = await API.call({
            config: {
                url: "/userpermissions",
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err)=> err);
        if(response.status === 200) {
            context.commit('SET_USER_PERMISSIONS', response.data.data.permissions);
            context.commit('SET_AUTH_LOADING', false)
            
        }
    },
    async getMe(context) {
        const response = await API.call({
            config: {
                url: "/me",
                method: "GET",
            },
            isAuthenticated: true,
        }).catch((err) => err)
        if(response.status === 200) {
            context.commit("SET_USER_DATA", response.data.data)
            context.commit("SET_USER_ROLE", response.data.data.role)
        } else {    
            context.commit("SET_USER_DATA", []);
        }
    } ,
};

const getters = {
    userpermissions: state => state.userpermissions,
    authLoading: state => state.authLoading,
    loginError: state => state.loginError.error,
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