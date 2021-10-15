
const state = {
  token: ''
}

const mutations = {
  SET_TOKEN(state, data) {
    state.token = data
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
