<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="item,index in navConfig" :class="{'active': currentIndex == index}" @click="changeIndex(item, index)">
        <a>
          <i :class="item.icon"></i>
          <div>{{item.name}}</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import qs from 'qs'
  import bus from 'js/bus.js'

  let {index} = qs.parse(location.search.substring(1))

  let navConfig = [
    {
      name: '有赞',
      icon: 'icon-home',
      href: 'index.html'
    }, {
      name: '分类',
      icon: 'icon-category',
      href: 'category.html'
    }, {
      name: '购物车',
      icon: 'icon-cart',
      href: 'cart.html'
    }, {
      name: '我',
      icon: 'icon-user',
      href: 'member.html'
    },
  ]
  export default {
    name: "footnav",
    props:['obj'],
    data() {
      return {
        navConfig,
        currentIndex: parseInt(index) || 0,
        ob: JSON.parse(JSON.stringify(this.obj) )
      }
    },
    created(){
      setTimeout(()=>{
        this.ob.age = 18;
        bus.$emit('change','2333')
      },2000)
    },
    methods: {
      changeIndex(item, index) {
        location.href = `${item.href}?index=${index}`
      }
    }
  }
</script>

<style scoped>

</style>
