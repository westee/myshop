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
import 'velocity-animate'

let app = new Vue({
  el: '.container',
  data: {
    cartList: null, // 购物车商品列表
    totalPrice: 0, // 选中商品总价
    editShop: null, // 被编辑的商店的商品信息
    editShopIndex: -1 // 选中的第几个店铺； -1 === 未选中
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

    // 编辑状态删除时的操作
    allSelectRemove: {
      get() {
        // 某店铺处于编辑状态
        if (this.editShop) {
          // 当前店铺是否被选中
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
     * 添加选中、编辑状态
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
      console.log(goods[attr])
      goods[attr] = !goods[attr]
      // 商铺下的所有商品被选中返回true，否则返回false
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
      // 根据有无editshop对象判断是普通状态下还是编辑状态
      let attr = this.editShop ? 'allSelectRemove' : 'allSelect'
      // 执行相应computed
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

    // 检测输入的产品数量
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

    // 删除单个商品
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

    // 移除多个商品
    removeMultiGoods() {
      MessageBox({
        title: '提示',
        message: `确定将所选 ${this.removeList.length} 个商品删除？`,
        showCancelButton: true
      }).then(
        (res) => {
          if (res === 'confirm') {
            let ids = []
            // 计算属性 返回编辑状态下被选中的商品
            this.removeList.forEach(good => {
              ids.push(good.id)
            })
            Axios.get(Api.cartList, {
              ids
            }).then(res => {
              let arr = []
              // 选中商店下的商品
              this.editShop.goodsList.forEach(good => {
              // findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
                let index = this.removeList.findIndex(item => {
                  return item.id == good.id
                })
                // 如果商品没被选中
                if (index === -1) {
                  arr.push(good)
                }
              })
              // 如果被编辑的商铺中还有商品没有被选中
              if (arr.length) {
                // 用没被删除的商品覆盖原有数据 ===》 删除选中的商品
                this.editShop.goodsList = arr
              } else {
                // 如果一个商店下的商品全被选中，删除时从cartList删除从editShopIndex开始的一个数据。
                this.cartList.splice(this.editShopIndex, 1)
                this.removeShop()
              }
            })
          }

        })

    },

    start(event, good){
      // 开始X坐标
      good.startX = event.changedTouches[0].clientX
    },
    end(event, shop, good, shopIndex, goodsIndex){
      let endX = event.changedTouches[0].clientX
      // 确定删除键的位置
      let left = '0px'
      if(good.startX - endX > 60){
        left = '-60px'
      }
      if(endX - good.startX  > 60){
        left = '0px'
      }
      
      Velocity(this.$refs['goods-' + shopIndex + '-' + goodsIndex], {left})
    },
  },
  mixins: [Mixin]
})
