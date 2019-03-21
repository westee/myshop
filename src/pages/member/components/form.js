import Address from 'js/addressService'

export default {
  data() {
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      id: '',
      type: '',
      instance: '',
      addressData: require('js/address.json'),
      cityList: '',
      districtList: ''
    }
  },
  created() {
    let query = this.$route.query
    this.instance = query.instance
    this.type = query.type

    // 编辑状态渲染已有数据
    if(this.type === 'edit'){
      let address = this.instance
      this.name = address.name
      this.tel = address.tel
      this.address = address.address
      this.provinceValue = parseInt(address.provinceValue)
      // this.cityValue = parseInt(address.cityValue)
      // this.districtValue = parseInt(address.districtValue)
    }
  },
  methods: {
    commitAddressData(){
      let { name, tel, address, provinceValue, districtValue, cityValue } = this
      let data = { name, tel, address, provinceValue, districtValue, cityValue }
      if(this.type === 'edit'){
        data.id = this.id
        Address.add(data).then((res)=>{
          if(res.data.code === 200){
            this.$router.go(-1)
          }
        })
      }
      if(this.type === 'add'){
        Address.update(data).then((res)=>{
          if(res.data.code === 200){
            this.$router.go(-1)
          }
        })
      }
    }
  },
  watch: {
    provinceValue(val) {
      // 如果未选择省
      if (val == -1) return
      // 选择了省
      let list = this.addressData.list
      let provinceIndex = list.findIndex(element => {
        return element.value === val
      });
      this.cityList = list[provinceIndex].children

      // 重置市区的value为默认值
      this.cityValue = -1
      this.districtValue = -1

      if(this.type === 'edit'){
        this.cityValue = parseInt(this.instance.cityValue)
      }
    },
    cityValue(val) {
      // 如果未选择市
      if (val == -1) return
      // 选择了市
      let list = this.cityList
      let cityIndex = list.findIndex(element => {
        return element.value === val
      });
      this.districtList = list[cityIndex].children

      // 重置市区的value为默认值
      this.districtValue = -1

      if(this.type === 'edit'){
        this.districtValue = parseInt(this.instance.districtValue)
      }
    }
  }
}
