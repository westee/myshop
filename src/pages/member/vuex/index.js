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
    },
    add(state, instance){
      state.list.push(instance)
    },
    remove(state, id){
      let list = state.list
      let index = list.findIndex(item => {
        return item.item === id
      })
      list.splice(index, 1)
    },
    update(state, instance){
      let list =  JSON.parse(JSON.stringify(state.list) ) 
      let index = list.findIndex(item => {
        return item.item === instance.id
      })
      list[index] = instance
    },
    setDefault(state, id){
      let list  = state.list
      list.forEach(item => {
        if(item.id == id){
          item.isDefault = true
        }else {
          item.isDefault = false
        }
      });
    },

  },
  actions:{
    getAddressData({commit}){
      Address.getlist().then((res)=>{
        res.data.addresslist[0].isDefault = true
        // this.list = res.data.addresslist
        commit('init',res.data.addresslist)
     })
    },
    addAction({commit}, instance){
      Address.add(instance).then((res)=>{
        commit('add', instance)
      })
    },
    removeAction({commit}, id){
      Address.remove(id).then(res =>{
        commit('remove', id)
      })
    },
    updateAction({commit}, data){
      Address.update().then(res => {
        commit('update', data)
      })
    },
    setDefaultAction({commit}, id){
      Address.setDefault(id).then(res =>{
        commit('setDefault', id)
      })
    }
  }
})

export default store