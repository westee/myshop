webpackJsonp([1],{"+mQk":function(t,e,a){"use strict";var n=a("DNVT"),i=(a("mgS3"),{name:"swiper.vue",props:{swiper:{}},mounted:function(){new n.a(".swiper-container",{direction:"horizontal",loop:!0,pagination:{el:".swiper-pagination"}})}}),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},this._l(this.swiper,function(t,a){return e("div",{key:a,staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])}),0),this._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var o=a("VU/8")(i,s,!1,function(t){a("vDkK")},"data-v-43112c1b",null);e.a=o.exports},"60YY":function(t,e){},AeEs:function(t,e){},AnIW:function(t,e){},"Do/K":function(t,e){},HFfA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("JWK+"),i=(a.n(n),a("pI1A")),s=(a.n(i),a("AeEs")),o=(a.n(s),a("AnIW")),r=(a.n(o),a("d7BR")),c=(a.n(r),a("Do/K")),d=(a.n(c),a("wI1h")),u=(a.n(d),a("LjF4")),l=(a.n(u),a("60YY")),f=(a.n(l),a("Au9i")),h=(a.n(f),a("7+uW")),p=a("TFhR"),m=a("mtWM"),v=a.n(m),g=a("U/rD"),w=a("mw3O"),k=a.n(w).a.parse(location.search.substring(1)).id;new h.default({el:"#app",data:{detailData:null,detailTab:["商品详情","本店成交"],tabIndex:0,dealList:null,swiperList:[],skuType:1,showMask:!1,skuNum:1,showCart:!1,showCartTip:!1},methods:{test:function(t){var e=t.target.value;/^[1-9]\d*$/.test(e)||Object(f.Toast)("请输入正确数量")},getGoodsDetail:function(){var t=this;v.a.post(p.a.goodsDetail,{id:k}).then(function(e){t.detailData=e.data.data,e.data.data.images.forEach(function(e){var a={clickUrl:"",image:e};t.swiperList.push(a)}),f.Indicator.close()})},changeTab:function(t){this.tabIndex=t,t&&this.getDealData()},getDealData:function(){var t=this;v.a.get(p.a.goodsDeal).then(function(e){t.dealList=e.data.data})},chooseSku:function(t){this.skuType=t,this.showMask=!0},changeSkuNum:function(t){t<0&&1==this.skuNum||(this.skuNum+=t)},addCart:function(){var t=this;v.a.post(p.a.addCart).then(function(e){200==e.data.code?(t.showMask=!1,t.showCart=!0,t.showCartTip=!0,setTimeout(function(){t.showCartTip=!1},1e3)):Object(f.Toast)("添加失败，请稍后再试")})}},beforeCreate:function(){},created:function(){this.getGoodsDetail()},watch:{showMask:function(t,e){document.body.style.overflow=t?"hidden":"auto",document.querySelector("html").style.overflow=t?"hidden":"auto",document.body.style.height=t?"100%":"auto",document.querySelector("html").style.height=t?"100%":"auto"}},mixins:[g.a]})},"JWK+":function(t,e){},LhI5:function(t,e,a){"use strict";var n=a("mvHQ"),i=a.n(n),s=a("mw3O"),o=a.n(s),r=a("jCMp"),c=o.a.parse(location.search.substring(1)).index,d=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],u={name:"footnav",props:["obj"],data:function(){return{navConfig:d,currentIndex:parseInt(c)||0,ob:JSON.parse(i()(this.obj))}},created:function(){var t=this;setTimeout(function(){t.ob.age=18,r.a.$emit("change","还没找到工作")},2e3)},methods:{changeIndex:function(t,e){location.href=t.href+"?index="+e}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,n){return a("li",{class:{active:t.currentIndex==n},on:{click:function(a){return t.changeIndex(e,n)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v(t._s(e.name))])])])}),0)])},staticRenderFns:[]};var f=a("VU/8")(u,l,!1,function(t){a("ieAo")},"data-v-0d9077d4",null);e.a=f.exports},LjF4:function(t,e){},TFhR:function(t,e,a){"use strict";var n={indexHotList:"/index/lists",goodsDetail:"/pro/detail",goodsDeal:"/pro/deal",indexSwiper:"/index/swiper",categoryTopList:"/category/toplist",categorySubList:"/category/secondlist",categoryRank:"/category/rank",searchList:"/search/list",addCart:"/pro/addcart",addNum:"/pro/addNum",cartList:"/cart/list",cartReduce:"/cart/multireduce",cartRemove:"/cart/remove",cartMuiltRemove:"/cart/remove",addressList:"/address/list",addressAdd:"/address/add",addressRemove:"",addressUpdate:"/address/add",addressSetDefault:""};for(var i in n)n.hasOwnProperty(i)&&(n[i]="https://nei.netease.com/api/apimock/92deac019f949d0a0d609dd8570da724/0419"+n[i]);e.a=n},"U/rD":function(t,e,a){"use strict";var n=a("LhI5"),i=a("+mQk"),s={filters:{currency:function(t){var e=""+t;if(e.indexOf(".")>-1){var a=e.split(".");return a[0]+"."+(a[1]+"0").substr(0,2)}return e+".00"}},components:{footnav:n.a,swiper:i.a}};e.a=s},d7BR:function(t,e){},ieAo:function(t,e){},jCMp:function(t,e,a){"use strict";var n=new(a("7+uW").default);e.a=n},mgS3:function(t,e){},pI1A:function(t,e){},vDkK:function(t,e){},wI1h:function(t,e){}},["HFfA"]);
//# sourceMappingURL=goods.1d83e47fb0248979fbda.js.map