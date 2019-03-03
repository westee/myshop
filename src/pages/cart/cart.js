import './cart.css'
import './cart_base.css'
import './cart_trade.css'

import Vue from 'vue'
import Axios from 'axios'
import Mixin from 'js/mixin.js'
import Api from 'js/api.js'

let app = new Vue({
  el: '.container',
  data:{
    cartList: null, //购物车商品列表
  },
  computed:{

  },
  created(){
    this.getCartList()
  },
  methods:{
    /**
     * 获取购物车中的商品数据
     */
    getCartList(){
      Axios.get(Api.cartList,{
        id: 1
      }).then((res)=>{
        let tempList = res.data.cartList
        tempList.forEach((shops)=>{
          //给商店添加选中信息
          shops.checked = true
          shops.goodsList.forEach((goods)=>{
            //给商品添加选中信息
            goods.checked = true
          })
        })
        this.cartList = tempList
      })
    },

    /**
     * 选中或反选商品
     * @goods Object 单个商品的data
     */
    selectGood(goods){
      goods.checked = !goods.checked
    },


  },
  mixins:[Mixin]
})

