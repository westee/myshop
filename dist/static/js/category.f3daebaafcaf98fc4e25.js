webpackJsonp([5],{"+mQk":function(t,e,a){"use strict";var n=a("DNVT"),i=(a("mgS3"),{name:"swiper.vue",props:{swiper:{}},mounted:function(){new n.a(".swiper-container",{direction:"horizontal",loop:!0,pagination:{el:".swiper-pagination"}})}}),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},this._l(this.swiper,function(t,a){return e("div",{key:a,staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])}),0),this._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var s=a("VU/8")(i,r,!1,function(t){a("vDkK")},"data-v-43112c1b",null);e.a=s.exports},"035s":function(t,e){},Hwmd:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("035s"),i=(a.n(n),a("igmb")),r=(a.n(i),a("TFhR")),s=(a("U/rD"),a("7+uW")),o=a("mtWM"),c=a.n(o),d=a("U/rD");new s.default({el:"#app",data:{categoryTopList:null,secondData:null,rankData:null,currentCategory:0},methods:{getCategoryTopList:function(){var t=this;c.a.get(r.a.categoryTopList).then(function(e){t.categoryTopList=e.data})},getSecondList:function(t,e){var a=this;this.currentCategory=e||0,0==e?this.getRankData():c()({method:"get",url:r.a.categorySubList}).then(function(t){a.secondData=t.data})},getRankData:function(){var t=this;c()({method:"get",url:r.a.categoryRank}).then(function(e){t.rankData=e.data})},toSearch:function(t){location.href="search.html?keyword="+t.title+"&id="+t.id}},created:function(){this.getCategoryTopList(),this.getSecondList(0,this.currentCategory)},mixins:[d.a]})},LhI5:function(t,e,a){"use strict";var n=a("mvHQ"),i=a.n(n),r=a("mw3O"),s=a.n(r),o=a("jCMp"),c=s.a.parse(location.search.substring(1)).index,d=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],u={name:"footnav",props:["obj"],data:function(){return{navConfig:d,currentIndex:parseInt(c)||0,ob:JSON.parse(i()(this.obj))}},created:function(){var t=this;setTimeout(function(){t.ob.age=18,o.a.$emit("change","还没找到工作")},2e3)},methods:{changeIndex:function(t,e){location.href=t.href+"?index="+e}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,n){return a("li",{class:{active:t.currentIndex==n},on:{click:function(a){return t.changeIndex(e,n)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v(t._s(e.name))])])])}),0)])},staticRenderFns:[]};var f=a("VU/8")(u,l,!1,function(t){a("ieAo")},"data-v-0d9077d4",null);e.a=f.exports},TFhR:function(t,e,a){"use strict";var n={indexHotList:"/index/lists",goodsDetail:"/pro/detail",goodsDeal:"/pro/deal",indexSwiper:"/index/swiper",categoryTopList:"/category/toplist",categorySubList:"/category/secondlist",categoryRank:"/category/rank",searchList:"/search/list",addCart:"/pro/addcart",addNum:"/pro/addNum",cartList:"/cart/list",cartReduce:"/cart/multireduce",cartRemove:"/cart/remove",cartMuiltRemove:"/cart/remove",addressList:"/address/list",addressAdd:"/address/add",addressRemove:"",addressUpdate:"/address/add",addressSetDefault:""};for(var i in n)n.hasOwnProperty(i)&&(n[i]="https://nei.netease.com/api/apimock/92deac019f949d0a0d609dd8570da724/0419"+n[i]);e.a=n},"U/rD":function(t,e,a){"use strict";var n=a("LhI5"),i=a("+mQk"),r={filters:{currency:function(t){var e=""+t;if(e.indexOf(".")>-1){var a=e.split(".");return a[0]+"."+(a[1]+"0").substr(0,2)}return e+".00"}},components:{footnav:n.a,swiper:i.a}};e.a=r},ieAo:function(t,e){},igmb:function(t,e){},jCMp:function(t,e,a){"use strict";var n=new(a("7+uW").default);e.a=n},mgS3:function(t,e){},vDkK:function(t,e){}},["Hwmd"]);
//# sourceMappingURL=category.f3daebaafcaf98fc4e25.js.map