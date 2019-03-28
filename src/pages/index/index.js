import 'css/common.css'
import './index.css'
import Vue from 'vue'
import Axios from  'axios'
import url from 'js/api'

import footnav from 'components/footnav'
import swiper from 'components/swiper'

import bus from 'js/bus.js'

import { InfiniteScroll,Indicator } from 'mint-ui';
import 'mint-ui/lib/style.min.css'
Vue.use(InfiniteScroll);
new Vue({
  el: "#app",
  data:{
    productList: null, //
    loading: false,
    allLoading: false,
    swiperList: null,
    perPage: 6,
    pageNum: 1,
    obj:{
      age: 23
    }
  },
  methods:{
    getIndexList(){
      if(this.loading){
        return
      }
      if(this.pageNum > 3){
        this.allLoading = true
        this.loading = true
        return
      }
      this.loading = true
      // 为给定 ID 的 user 创建请求
      Axios.get(url.indexHotList,{
        pageNum: this.pageNum,
        perPage: this.perPage
      })
        .then((res)=> {
          if(this.productList){ //如果已经有内容
            this.productList = this.productList.concat(res.data)
          } else {
            //首次加载内容
            this.productList = res.data
          }
          this.loading = false
          this.pageNum ++
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getSwiper(){
      Axios.get(url.indexSwiper)
        .then((res)=> {
          this.swiperList = res.data
        })
    },
    // childEve(val){
    //   console.log('子组件的数据是：'+val)
    // }

  },
  created(){
    bus.$on('change',(val)=>{
      // console.log('我是$on:'+val)
    })
    this.getIndexList()
    this.getSwiper()
  },
  mounted(){

  },
  components:{
    footnav,swiper
  }
})
