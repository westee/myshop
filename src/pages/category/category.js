import 'css/common.css'
import './category.css'
import url from 'js/api.js'
import footnav from 'components/footnav'

import Vue from 'vue'
import Axios from 'axios'

new Vue({
  el: '#app',
  data:{
    categoryTopList:  null, //侧边栏分类
    secondData: null, //其他排行数据
    rankData: null , //综合排行数据
    currentCategory: 0, //选中分类
  },
  methods:{
    /**
     * 一级分类
     */
    getCategoryTopList(){
      Axios.get(url.categoryTopList)
        .then((res)=>{
          this.categoryTopList = res.data
        })
    },

    /**
     * 获取二级分类
     * index为0请求综合排行
     * index大于0请求其他排行
     */
    getSecondList(id, index){
      let useUrl
      this.currentCategory = index ? index : 0
      if(index == 0){
        this.getRankData()
      } else {
        Axios({
          method: 'get',
          url: url.categorySubList,
          // data: {
          //   id: id
          // }
        }).then((res)=>{
          this.secondData = res.data;
        })
      }

    },

    /**
     * 获得综合排行 rank
     */
    getRankData(){
      Axios({
        method: 'get',
        url: url.categoryRank,
      }).then((res)=>{
        this.rankData = res.data;
      })
    }
  },
  created(){
    this.getCategoryTopList()
    this.getSecondList(0, this.currentCategory)
  },
  components:{
    footnav
  },
  filters:{
    priceFilter(price){
      return price.toFixed(2)
    }
  }
})


