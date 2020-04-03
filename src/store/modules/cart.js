const state = {
  shop_list: [],
  add: []
}

const getters = {
  // 获取购物车列表
  addShopList: state => {
    return state.add.map(({ id, num }) => {
      const product = state.shop_list.find(n => n.id == id)
      if (product) {
        return {
          ...product,
          num
        }
      }
    })
  },
  // 获取总数量
  totalNum: (state) => {
    let total = 0
    state.add.map(n => {
      console.log(n)
      total += n.num
    })
    return total
  },
  // 计算总价格
  totalPrice: (state, getters) => {
    let total = 0
    getters.addShopList.map(n => {
      total += n.num * n.price
    })
    return total
  }
}

const actions = {
  // 加入购物车
  addToCart({ commit, dispatch }, product) {
    commit('addCart', {
      id: product.id
    })
    let total = 0
    state.add.map(n => {
      total += n.num
    })
    dispatch('app/setCartNum', total, { root: true })
  },
  // 清空购物车
  clearToCart({ commit }) {
    commit('clearCart')
  },
  // 删除单个物品
  deletToShop({ commit }, product) {
    commit('deleteShop', product)
  }
}

const mutations = {
  // 加入购物车
  addCart(state, { id }) {
    const record = state.add.find(n => n.id == id)
    if (!record) {
      state.add.push({
        id,
        num: 1
      })
    } else {
      record.num++
    }
  },
  // 删除单个物品
  deleteShop(state, product) {
    state.add.forEach((item, i) => {
      if (item.id == product.id) {
        state.add.splice(i, 1)
      }
    })
  },
  // 清空购物车
  clearCart(state) {
    state.add = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

