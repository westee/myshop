let url = {
  indexHotList: '/index/hotLists',
  goodsDetail: 'goods/details'
}
let host = 'https://easy-mock.com/mock/5bf64f88bd33e47f3c8fbe43'

for (let key in  url) {
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url
