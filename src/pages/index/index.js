import 'css/common.css'
import './index.css'
import Vue from 'vue'
import Axios from  'axios'
import url from 'js/api'

new Vue({
  el: "#app",
  data:{
    lists: null
  },
  methods:{

  },
  created(){

  },
  mounted(){
    // 为给定 ID 的 user 创建请求
    Axios.get(url.indexHotList)
      .then((response)=> {
        this.lists = response.data.lists
        console.log(this.lists);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
})
