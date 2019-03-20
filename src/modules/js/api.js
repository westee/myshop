let url = {
  indexHotList: '/index/lists',
  goodsDetail: '/pro/detail',
  goodsDeal:'/pro/deal', //商品成交记录
  indexSwiper: '/index/swiper',
  categoryTopList: '/category/toplist', //分类 ==》 侧边栏 ==》 分类
  categorySubList: '/category/secondlist', //品牌分类 && 类别分类
  categoryRank: '/category/rank', //热销商品 && 热销店铺 && 关键字
  searchList: '/search/list', //商品列表
  addCart: '/pro/addcart', //添加到购物车

  addNum: '/pro/addNum', //增加商品数量1 post
  cartList: '/cart/list', //购物车列表
  cartReduce: '/cart/multireduce', //删除减少一个商品,增加商品数量也是这个
  cartRemove: '/cart/remove', //删除一个商品
  cartMuiltRemove: '/cart/remove', //删除多个商品

  addressList: '/address/list', // 地址列表
  addressAdd: '', // 增加地址
  addressRemove: '', // 删除地址
  addressUpdate: '', // 更新地址
  addressSetDefault: '', // 设置默认地址
}
let host = 'https://nei.netease.com/api/apimock/92deac019f949d0a0d609dd8570da724/0419'

for (let key in  url) {
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url
