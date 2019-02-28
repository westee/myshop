import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_base.css'
import './goods_transition.css'

import { Indicator } from 'mint-ui'; //加载提示框
import 'mint-ui/lib/style.min.css'
Indicator.open('加载中');
import { Toast } from 'mint-ui'; //加载toast

import  Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin.js'
import qs from 'qs'

let {id} = qs.parse(location.search.substring(1)) //获取id

let detailTab =  ['商品详情','本店成交']
new Vue({
  el: '#app',
  data:{
    detailData: null, //商品详情数据
    detailTab,
    tabIndex: 0 , //默认tab
    dealList: null, //成交列表
    swiperList: [], //传递给swiper组件的图片
    skuType: 1, //skuType === 1 选择规格； skuType === 2  加入购物车 ； skuType === 3 立即购买
    showMask: false, //是否显示弹出层
    skuNum: 1, //购买的数量
    showCart: false, //添加购物车成功后  true 显示小购物车图标；fasle 不显示；
    showCartTip: false, //添加购物车成功后提示
  },
  methods:{
    test(e){
      let input = e.target.value
      let regNum = /^[1-9]\d*$/
      if(!regNum.test(input)) { //输入的不是正整数
        Toast('请输入正确数量');
      }else if(0){ 

      }
    },
    /**
     * function
     * 获取商品详情
     */
    getGoodsDetail(){
      axios.post(url.goodsDetail,{
        id
      }).then((res)=>{
        this.detailData = res.data.data

        res.data.data.images.forEach((img)=>{
          let data = {
            'clickUrl': '',
            'image': img
          }
          this.swiperList.push(data)
        })
        Indicator.close()
      })
    },

    /**
     * 点击切换tab
     */
    changeTab(index){
      this.tabIndex = index
      if(index){
        this.getDealData()
      }else{
      }
    },

    /**
     * 请求交易记录
     */
    getDealData(){
      axios.get(url.goodsDeal)
        .then((res)=>{
          this.dealList = res.data.data
        })
    },

    /**
     *
     */
    chooseSku(type){
      this.skuType = type
      this.showMask = true
    },
    
    /**
     * 加减购买数量
     */
    changeSkuNum(val){
      console.log(1);
      
      if(val < 0 && this.skuNum == 1 ){ //点击减一并且当前选择数量为1
        return 
      } else{
        this.skuNum += val
      }
    },

    /**
     * 添加到购物车
     */
    addCart(){
      axios.post(url.addCart)
        .then(res=>{
          if(res.data == 200){
            this.showMask = false
            this.showCart = true
            this.showCartTi = true
            setTimeout(() => {
              this.showCartTip = false
            }, timeout);
          }
        })
    }
  },
  beforeCreate(){
  },
  created(){
    this.getGoodsDetail()
  },
  watch:{
    showMask(val, oldValue){
      //防止阴影层被拖动。
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }
  },
  mixins:[mixin]
})
