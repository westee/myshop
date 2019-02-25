let url = {
  indexHotList: '/index/lists',
  goodsDetail: '/goods/details',
  indexSwiper: '/index/swiper'
}
let host = 'https://nei.netease.com/api/apimock/92deac019f949d0a0d609dd8570da724/0419'

for (let key in  url) {
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url
