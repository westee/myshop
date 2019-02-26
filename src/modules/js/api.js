let url = {
  indexHotList: '/index/lists',
  goodsDetail: '/goods/details',
  indexSwiper: '/index/swiper',
  categoryTopList: '/category/toplist', //分类 ==》 侧边栏 ==》 分类
  categorySubList: '/category/secondlist', //品牌分类 && 类别分类
  categoryRank: '/category/rank' //热销商品 && 热销店铺 && 关键字
}
let host = 'https://nei.netease.com/api/apimock/92deac019f949d0a0d609dd8570da724/0419'

for (let key in  url) {
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url
