<template>
  <div class="container" style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a @click="toEdit(address)"
        class="block-item js-address-item address-item" :class="{'address-item-default':address.default}"
        href="javascript:;" v-for="address in list" :key="address.id"
      >
        <div class="address-title">{{address.name}} {{address.tel}}</div>
        <p>{{address.provinceName}}{{address.cityName}}{{address.districtName}}</p>
        <a class="address-edit" >修改</a>
      </a>
      
    </div>
    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name: 'form', query:{type: 'add'}}"
      >新增地址
      </router-link>
    </div>
  </div>
</template>

<script>

export default {

  computed: {
    list () {
      return this.$store.state.list
    }
  },
  methods:{
    toEdit(list){
        // this.$router.push({name: '/address/form'})
        this.$router.push({name: 'form',query: { type: 'edit', instance: list}})
    }
  },
  created(){
    this.$store.dispatch('getAddressData')
  }
}
</script>


