const state = {
  shop_list: [],
  add: [],
  table_id: '',
  table_name: ''
}

const getters = {
  // 获取购物车列表
  addShopList: state => {
    return state.add.map(({id, num}) => {
      const product = state.shop_list.find(n => n.id === id)
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
  addToCart({commit, dispatch}, product) {
    commit('addCart', {
      product: product,
    })
    let total = 0
    state.add.map(n => {
      total += n.number
    })
    dispatch('app/setCartNum', total, {root: true})
  },
  updateGood({commit, dispatch}, product){
    commit('updateGood', {
      product: product,
    })
    let total = 0
    state.add.map(n => {
      total += n.number
    })
    dispatch('app/setCartNum', total, {root: true})
  },
  // 清空购物车
  clearToCart({commit, dispatch}) {
    commit('clearCart')
    dispatch('app/setCartNum', 0, {root: true})
  },
  // 删除单个物品
  deleteToShop({commit, dispatch}, product) {
    commit('deleteShop', { product: product })
    let total = 0
    state.add.map(n => {
      total += n.number
    })
    dispatch('app/setCartNum', total, {root: true})
  }
}

const mutations = {
  // 加入购物车
  addCart(state, {product}) {
    state.table_id = product.table_id
    state.table_name = product.table_name
    const record = state.add.find(n => n.id === product.id)
    if (!record) {
      var goods = {img: product.imgs, descript: product.name}
      state.add.push({
        id: product.id,
        goods: goods,
        price: product.price,
        goodTotal: product.price * 1,
        number: 1
      })
    } else {
      record.number++
      record.goodTotal = record.number * record.price
    }
  },
  updateGood(state, {product}){
    const record = state.add.find(n => n.id === product.id)
    record.number=product.number
    record.goodTotal = record.number * record.price
  },
  // 删除单个物品
  deleteShop(state, {product}) {
    var newarr=[]
    state.add.forEach((item, i) => {
      console.log(item,product)
      if (item.id !== product.id) {
        newarr.push(item)
      }
    })
    state.add=newarr
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

