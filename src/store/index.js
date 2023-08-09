import {createStore} from 'vuex'
import {api} from "@/api/index.js"

const store = createStore({
    state: {
        user: null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user.data.response
        }
    },
    actions: {
        async SET_USER_FROM_API(context) {
            const data = await api.getUserInfo()
            context.commit('SET_USER', data)
        }
    },
    getters: {
        USER(state) {
            return state.user
        }
    }
})
export default store;