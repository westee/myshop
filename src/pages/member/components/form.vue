<template>
  <div class="container" style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value>
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" value maxlength="20" v-model="name">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" value maxlength="11" v-model="tel">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option
                :value="province.value"
                v-for="province in addressData.list"
                :key="province.value"
              >{{province.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="city.value" v-for="city in cityList" :key="city.value">{{city.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" v-model="districtValue" data-code>
              <option value="-1">选择地区</option>
              <option
                :value="district.value"
                v-for="district in districtList"
                :key="district.value"
              >{{district.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input
            type="text"
            placeholder="街道门牌信息"
            v-model="address"
            name="address_detail"
            value
            maxlength="100"
          >
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn">
      <div class="block-item c-blue center" @click="commitAddressData">保存</div>
    </div>
    <div v-show="type == 'edit'">
      <div class="block section js-delete block-control-btn">
        <div class="block-item c-red center" @click="remove()">删除</div>
      </div>
      <div class="block stick-bottom-row center js-save-default">
        <button class="btn btn-standard js-save-default-btn" @click="setDefault">设为默认收货地址</button>
      </div>
    </div>
  </div>
</template>

<script src="./form.js"></script>