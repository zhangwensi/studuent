import {setToken} from '../../utils/auth'

const state = {
    isCollapse: !JSON.parse(sessionStorage.getItem('isCollapse'))  || false,
    token: null,
    username: null,
    sclass: null,
    grader: null,
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
  },
  // 设置token
  SET_USER_TOKEN: (state,paylod) => {
    state.token = paylod
    setToken(state.token)
  },
  // 设置用户角色
  SET_USER_USERNAME: (state,paylod) => {
    state.username = paylod
    JSON.stringify(sessionStorage.setItem('username',state.username))
  },
  SET_USER_SCLASS: (state,paylod) => {
    state.sclass = paylod
    JSON.stringify(sessionStorage.setItem('sclass',state.sclass))
  },
  SET_USER_GRADER: (state,paylod) => {
    state.grader = paylod
    JSON.stringify(sessionStorage.setItem('grader',state.grader))
  }
}
const actions = {

}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
