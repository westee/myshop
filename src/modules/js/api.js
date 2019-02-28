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
}
let host = 'https://nei.netease.com/api/apimock/92deac019f949d0a0d609dd8570da724/0419'

for (let key in  url) {
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url
