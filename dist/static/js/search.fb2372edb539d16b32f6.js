webpackJsonp([2],{"+mQk":function(t,n,e){"use strict";var i=e("DNVT"),a=(e("mgS3"),{name:"swiper.vue",props:{swiper:{}},mounted:function(){new i.a(".swiper-container",{direction:"horizontal",loop:!0,pagination:{el:".swiper-pagination"}})}}),s={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"swiper-container"},[n("div",{staticClass:"swiper-wrapper"},this._l(this.swiper,function(t,e){return n("div",{key:e,staticClass:"swp-page swiper-slide"},[n("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[n("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])}),0),this._v(" "),n("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var r=e("VU/8")(a,s,!1,function(t){e("vDkK")},"data-v-43112c1b",null);n.a=r.exports},"035s":function(t,n){},"0mhr":function(t,n){},"73R0":function(t,n){},LhI5:function(t,n,e){"use strict";var i=e("mw3O"),a=e.n(i).a.parse(location.search.substring(1)).index,s=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],r={name:"footnav",data:function(){return{navConfig:s,currentIndex:parseInt(a)||0}},methods:{changeIndex:function(t,n){location.href=t.href+"?index="+n}}},o={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"bottom-nav"},[e("ul",t._l(t.navConfig,function(n,i){return e("li",{class:{active:t.currentIndex==i},on:{click:function(e){return t.changeIndex(n,i)}}},[e("a",[e("i",{class:n.icon}),t._v(" "),e("div",[t._v(t._s(n.name))])])])}),0)])},staticRenderFns:[]};var c=e("VU/8")(r,o,!1,function(t){e("73R0")},"data-v-fd4bc9ae",null);n.a=c.exports},TFhR:function(t,n,e){"use strict";var i={indexHotList:"/index/lists",goodsDetail:"/pro/detail",goodsDeal:"/pro/deal",indexSwiper:"/index/swiper",categoryTopList:"/category/toplist",categorySubList:"/category/secondlist",categoryRank:"/category/rank",searchList:"/search/list",addCart:"/pro/addcart"};for(var a in i)i.hasOwnProperty(a)&&(i[a]="https://nei.netease.com/api/apimock/92deac019f949d0a0d609dd8570da724/0419"+i[a]);n.a=i},"U/rD":function(t,n,e){"use strict";var i=e("LhI5"),a=e("+mQk"),s={filters:{currency:function(t){var n=""+t;if(n.indexOf(".")>-1){var e=n.split(".");return e[0]+"."+(e[1]+"0").substr(0,2)}return n+".00"}},components:{footnav:i.a,swiper:a.a}};n.a=s},mgS3:function(t,n){},sSMw:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("035s"),a=(e.n(i),e("0mhr")),s=(e.n(a),e("7+uW")),r=e("mtWM"),o=e.n(r),c=e("TFhR"),l=e("mw3O"),d=e.n(l),u=e("U/rD"),f=e("Au9i"),h=(e.n(f),e("9qgI")),p=e.n(h),m=d.a.parse(location.search.substring(1)),v=m.id,g=m.keyword;s.default.use(f.InfiniteScroll);new s.default({el:"#app",data:{searchList:null,keyword:g||null,id:v||0,isShow:!1,allLoading:!1,loading:!1},created:function(){this.getSearchList()},methods:{getSearchList:function(){var t=this;o.a.post(c.a.searchList,{id:v,title:g}).then(function(n){t.searchList?t.searchList=t.searchList.concat(n.data.lists):t.searchList=n.data.lists})},move:function(){console.log(document.documentElement.scrollTop),this.isShow=document.documentElement.scrollTop>100},clickToTop:function(){p()(document.body,"scroll",1e3)}},mixins:[u.a]})},vDkK:function(t,n){}},["sSMw"]);
//# sourceMappingURL=search.fb2372edb539d16b32f6.js.map