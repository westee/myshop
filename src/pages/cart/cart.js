import './cart.css'
import './cart_base.css'
import './cart_trade.css'

import Vue from 'vue'
import Axios from 'axios'
import Mixin from 'js/mixin.js'
import Api from 'js/api.js'

let app = new Vue({
  el: '.container',
  data: {
    cartList: null, //购物车商品列表
    totalNum: 0,
    totalPrice: 0,
  },
  computed: {
    // 全选
    allSelect: {
      //点击全选时的操作
      set(newValue) {
        this.cartList.forEach((shopitem) => {
          shopitem.checked = newValue
          shopitem.goodsList.forEach((goodsitem) => {
            goodsitem.checked = newValue
          })
        })
      },
      // 获取全选的状态
      get() {
        if (this.cartList && this.cartList.length) {
          return this.cartList.every((shopitem) => {
            return shopitem.checked
          })
        }
        return false
      }
    },

    // 选中的列表
    selectList() {
      if (this.cartList && this.cartList.length) {
        let totalPrice = 0
        let arr = []
        this.cartList.forEach((shop) => {
          shop.goodsList.forEach((goods) => {
            if (goods.checked) {
              totalPrice += goods.price * goods.num
              arr.push(goods)
            }
          })
        })
        this.totalPrice = totalPrice
        return arr
      }
      return []
    }
  },
  created() {
    this.getCartList()
  },
  methods: {
    /**
     * 获取购物车中的商品数据
     */
    getCartList() {
      Axios.get(Api.cartList, {
        id: 1
      }).then((res) => {
        let tempList = res.data.cartList
        tempList.forEach((shops) => {
          //给商店添加选中信息
          shops.checked = true
          shops.editing = false
          shops.editMsg = '编辑'
          shops.goodsList.forEach((goods) => {
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
    selectGood(goods, shop) {
      goods.checked = !goods.checked
      shop.checked = shop.goodsList.every((goodsitem) => {
        return goodsitem.checked
      })
    },

    selectShop(shop) {
      shop.checked = !shop.checked
      shop.goodsList.forEach((goodsitem) => {
        goodsitem.checked = shop.checked
      })
    },

    // 点击全选按钮
    clickSelectAll() {
      this.allSelect = !this.allSelect
    },

    // 编辑状态
    edit(shop, shopIndex) {
      shop.editing = !shop.editing
      shop.editMsg = shop.editing ? '完成' : '编辑'

      this.cartList.forEach((shopitem, index) => {
        if (index != shopIndex) {
          shopitem.editing = !shop.editing
          shopitem.editMsg = shopitem.editing ? '编辑' : ''
        }
      })
    }

  },
  mixins: [Mixin]
})
