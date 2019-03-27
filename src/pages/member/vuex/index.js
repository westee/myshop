import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

import Address from 'js/addressService.js'

const store = new Vuex.Store({
  state: {
    list: null // 地址数据
  },
  mutations:{
    init(state, data){
      state.list = data
    }
  },
  actions:{
    getAddressData({commit}){
      Address.getlist().then((res)=>{
        res.data.addresslist[0].default = true
        // this.list = res.data.addresslist
        commit('init',res.data.addresslist)
     })
    }
  }
})

export default store