import url from 'js/api.js'
import fetch from "./fetch";

class Cart {
  static add(goods) {
    return fetch(url.addNum, {
      id: goods.id,
      number: 1
    }).then((res)=>{
      goods.num++
    })
  }
}

export default Cart