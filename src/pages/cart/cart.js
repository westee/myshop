import './cart.css'
import './cart_base.css'
import './cart_trade.css'

import Vue from 'vue'
import Axios from 'axios'
import Mixin from 'js/mixin.js'
import Api from 'js/api.js'
import {
  MessageBox,
  Toast
} from 'mint-ui';
import 'mint-ui/lib/style.min.css'

let app = new Vue({
  el: '.container',
  data: {
    cartList: null, //购物车商品列表
    totalPrice: 0, //选中商品总价
    editShop: null, //被编辑的商店的商品信息
    editShopIndex: -1 //
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

    // 删除时的操作
    allSelectRemove: {
      get() {
        if (this.editShop) {
          return this.editShop.removeChecked
        }
        return false
      },
      set(newValue) {
        if (this.editShop) {
          this.editShop.removeChecked = newValue
          this.editShop.goodsList.forEach((goods) => {
            goods.removeChecked = newValue
          })
        }
      },
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
    },

    // 选中要删除的商品
    removeList() {
      if (this.editShop) {
        let arr = []
        this.editShop.goodsList.forEach((goods) => {
          if (goods.removeChecked) {
            arr.push(goods)
          }
        })
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
          // 编辑状态
          shops.editing = false
          // 编辑状态的展示信息
          shops.editMsg = '编辑'
          shops.removeChecked = false
          shops.goodsList.forEach((goods) => {
            //给商品添加选中信息
            goods.checked = true
            goods.removeChecked = false
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
      let attr = this.editShop ? 'removeChecked' : 'checked'
      goods[attr] = !goods[attr]
      shop[attr] = shop.goodsList.every((goodsitem) => {
        return goodsitem[attr]
      })
    },

    selectShop(shop) {
      let attr = this.editShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach((goodsitem) => {
        goodsitem[attr] = shop[attr]
      })
    },

    // 点击全选按钮
    clickSelectAll() {
      let attr = this.editShop ? 'allSelectRemove' : 'allSelect'
      this[attr] = !this[attr]
    },

    // 编辑状态
    edit(shop, shopIndex) {
      shop.editing = !shop.editing
      shop.editMsg = shop.editing ? '完成' : '编辑'
      this.editShop = shop.editing ? shop : null
      this.editShopIndex = shop.editing ? shopIndex : -1

      this.cartList.forEach((shopitem, index) => {
        if (index != shopIndex) {
          shopitem.editMsg = !shop.editing ? '编辑' : ''
        }
      })
    },

    goodsReduce(goods) {
      if (goods.num === '1') return
      Axios.get(Api.cartReduce)
        .then((res) => {
          if (Number(res.data.code) === 200) {
            goods.num--
          }
        })
    },

    goodsAdd(goods) {
      Axios.get(Api.cartReduce)
        .then((res) => {
          if (Number(res.data.code) === 200) {
            goods.num++
          }
        })
    },

    // 删除商品
    goodsRemove(shop, shopIndex, goods, goodsIndex) {
      MessageBox({
        title: '提示',
        message: '确定执行此操作?',
        showCancelButton: true
      }).then(
        (res) => {
          if (res === 'confirm') {
            Axios.get(Api.cartReduce)
              .then((res) => {
                if (Number(res.data.code) === 200) {
                  shop.goodsList.splice(goodsIndex, 1)
                  // 店铺下没有商品后
                  if (shop.goodsList.length === 0) {
                    this.cartList.splice(shopIndex, 1)
                    this.removeShop()
                  }
                  Toast('删除成功');
                }
              })
          } else {

          }
        })
    },

    // 删除店铺下的所有商品后将其他店铺edit状态改为默认状态
    removeShop() {
      this.editShop = null
      this.editShopIndex = -1
      this.cartList.forEach((shop) => {
        shop.editing = false
        shop.editMsg = '编辑'
      })
    },

    removeMultiGoods() {
      MessageBox({
        title: '提示',
        message: `确定将所选 ${this.removeList.length} 个商品删除？`,
        showCancelButton: true
      }).then(
        (res) => {
          if (res === 'confirm') {
            let ids = []
            this.removeList.forEach(good => {
              ids.push(good.id)
            })
            Axios.get(Api.cartList, {
              ids
            }).then(res => {
              let arr = []
              this.editShop.goodsList.forEach(good => {
                let index = this.removeList.findIndex(item => {
                  return item.id == good.id
                })
                if (index === -1) {
                  arr.push(good)
                }
              })
              if (arr.length) {
                this.editShop.goodsList = arr
              } else {
                this.cartList.splice(this.editShopIndex, 1)
                this.removeShop()
              }
            })
          }

        })

    }
  },
  mixins: [Mixin]
})
