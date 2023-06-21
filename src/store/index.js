import {createStore} from 'vuex'
import user_methods from "@/data/user_methods";

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
            const data = await user_methods[0].getUserInfo()
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