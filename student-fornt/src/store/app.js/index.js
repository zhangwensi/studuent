const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse'))  || false
  }
const getters = {
  GET_COLLAPSE_STATUS: (state) => {
    return state.isCollapse
  }
}
const mutations = {
  SET_COLLAPSE_STATUS: (state) => {
    state.isCollapse = !state.isCollapse
    JSON.stringify(sessionStorage.setItem('isCollapse',state.isCollapse))
  }
}
const actions = {}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
