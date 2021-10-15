
const state = {
  // 商品信息
  productInfo: {
    // info: {},
    // promotion: {},
    // attribute: {},
    // relevance: {}
  }
}

const mutations = {
  SET_PRODUCT_INFO(state, data) {
    state.productInfo = data
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
