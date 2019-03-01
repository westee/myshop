import 'css/common.css'
import './search.css'

import Vue from 'vue'
import Axios from 'axios'
import api from 'js/api.js'
import  qs from 'qs' //解析地址的参数
let {id, keyword} = qs.parse(location.search.substring(1))
import mixin from 'js/mixin.js'

//上拉加载
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

//点击回到顶部
import Velocity from "velocity-animate";

let app = new Vue({
  el: "#app",
  data:{
    searchList: null, //商品列表
    keyword: keyword || null,
    id: id || 0,
    isShow: false, //true显示到顶按钮 false不显示
    allLoading: false, //是否加载全部
    loading: false, //true不触发上拉加载 false触发
  },
  created(){
    this.getSearchList()
  },
  methods:{
    getSearchList(){
      // if(this.loading) return
      // this.loading = true
      Axios.post(api.searchList,{
        id,
        title:keyword
      })
        .then((res)=>{
          if(this.searchList){
            this.searchList = this.searchList.concat(res.data.lists)
          } else {
            this.searchList = res.data.lists
          }
          // this.loading =false
        })
    },
    move(){
      this.isShow = document.documentElement.scrollTop > 100;
    },
    clickToTop(){
      // document.documentElement.scrollTop = 0
      Velocity(document.body, 'scroll', 1000)
    }
  },
  mixins:[mixin]
})
/**
 * todo
 * 上拉加载更多有问题
 */
