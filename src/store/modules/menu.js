import { getMenusReq } from '@/api/menu'

const getDefaultState = () => {
    return {
        menus: []
    }
}

const state = getDefaultState()

const mutations = {
    M_menus: (state, menus) => {
        state.menus = menus
    }
}

const actions = {
    getMenus({ commit }) {
        return new Promise((resolve, reject) => {
            getMenusReq()
                .then(({ data }) => {
                    if (data.code === 200) {
                        commit('M_menus', data?.data)
                        resolve(data?.data || [])
                    } else {
                        reject(data)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
