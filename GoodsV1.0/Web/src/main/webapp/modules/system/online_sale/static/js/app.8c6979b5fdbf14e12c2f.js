webpackJsonp([1],{NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("7+uW"),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var n=a("VU/8")({name:"App"},r,!1,function(t){a("ns30")},null,null).exports,s=a("/ocq"),o=a("7t+N"),c=a.n(o),h=null,l=null,d=null,v=null,u=null,g=null,f={data:function(){return{}},props:{chartsId:{type:String,default:""},chartsType:{type:String,default:""},chartsHeight:{type:Number,default:1080},chartsData:{type:Object,default:null}},watch:{chartsData:function(t,e){this.drawCharts(t)}},methods:{init:function(){h=null,l=null,d=null,v=null,u=null,g=null},drawCharts:function(t){if(this.init(),h=this.chartsId,l=this.chartsType,d=this.chartsHeight,"bar"==l)c()(".chartsDiv").css("height",.72*d*.875),v=t.chartsX,u=t.chartsY,g=t.chartsY2,this.$echarts.init(document.getElementById(h)).setOption({grid:{top:"15%",right:"0%",bottom:"5%",left:"0%",containLabel:!0},xAxis:[{type:"category",data:v,axisPointer:{type:"shadow"},axisLine:{show:!1,lineStyle:{color:"#ccc"}},axisTick:{show:!1}}],yAxis:[{type:"value",name:"数量",min:0,show:!1,axisTick:{show:!1}},{type:"value",name:"次数",min:0,interval:10,show:!1,axisTick:{show:!1}}],series:[{name:"数量",type:"bar",itemStyle:{normal:{color:new this.$echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(247, 8, 111, 1)"},{offset:1,color:"rgba(227, 157, 195, 0.02)"}])}},data:u,barMaxWidth:"30"},{name:"次数",type:"line",yAxisIndex:1,symbolSize:8,lineStyle:{color:"#F1770C"},data:g}],textStyle:{color:"white"}});else if("bar2"==l){c()(".chartsDiv").css("height",.72*d*.875),v=t.chartsX,g=t.chartsY2,this.$echarts.init(document.getElementById(h)).setOption({grid:{top:"15%",right:"1.5%",bottom:"5%",left:"0%",containLabel:!0},xAxis:[{type:"category",data:v,axisPointer:{type:"shadow"},axisLine:{show:!1,lineStyle:{color:"#ccc"}},axisTick:{show:!1}}],yAxis:[{type:"value",name:"数量",min:0,show:!1,axisTick:{show:!1}}],series:[{name:"数量",type:"bar",itemStyle:{normal:{color:new this.$echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(247, 120, 8, 1)"},{offset:1,color:"rgba(227, 199, 157, 0.02)"}])}},data:g,barMaxWidth:"30"}],textStyle:{color:"white"}})}else if("pie"==l){c()(".chartsDiv").css("height",.72*d*.875*.2),this.$echarts.init(document.getElementById(h)).setOption({series:[{type:"pie",radius:"76%",center:["20%","50%"],hoverAnimation:!0,data:[{value:10,selected:!0,itemStyle:{borderColor:"rgba(51, 111, 255, 1)",borderWidth:5}},{value:20,selected:!0,temStyle:{borderColor:"rgba(255, 76, 78, 1)",borderWidth:5}}],labelLine:{show:!1},itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}],color:["rgba(51, 111, 255, 1)","rgba(255, 76, 78, 1)"]})}else if("pie2"==l){c()(".chartsDiv").css("height",.72*d*.875*.35),this.$echarts.init(document.getElementById(h)).setOption({tooltip:{trigger:"item",formatter:"{b} : {c} ({d}%)"},series:[{type:"pie",radius:"50%",data:[{value:1003,name:"凉鞋"},{value:2e3,name:"皮鞋"},{value:1727,name:"休闲鞋"},{value:1397,name:"运动鞋"}],label:{formatter:"{b|{b}}:\n\n{d|{d}%} {c|{c}}",rich:{b:{fontSize:13},d:{fontSize:13,fontWeight:"bold"},c:{fontSize:15,fontWeight:"bold"}}},labelLine:{show:!0},itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]})}}},mounted:function(){}},p={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"chartsDiv",style:{width:"100%",height:"100%"},attrs:{id:this.chartsId}})},staticRenderFns:[]};var m=a("VU/8")(f,p,!1,function(t){a("xwCh")},"data-v-379c5c45",null).exports,_=a("//Fk"),C=a.n(_),y=a("mtWM"),b=a.n(y),x=a("BO1k"),w=a.n(x),k=a("mvHQ"),S=a.n(k),D={setCookie:function(t,e,a){if(a){var i=(new Date).getTime()+a,r=new Date(i);e=S()(e),document.cookie=t+"="+escape(e)+";expires="+r.toUTCString()}else e=S()(e),document.cookie=t+"="+escape(e)},getCookie:function(t){var e=t+"=",a=document.cookie.split(";"),i=!0,r=!1,n=void 0;try{for(var s,o=w()(a);!(i=(s=o.next()).done);i=!0){var c=s.value,h=unescape(c.trim());if(0==h.indexOf(e)){h=h.substring(e.length,h.length);return h=/\{|\[/.test(h)?JSON.parse(h):h.replace(/\"/g,"")}}}catch(t){r=!0,n=t}finally{try{!i&&o.return&&o.return()}finally{if(r)throw n}}return""},removeCookie:function(t){document.cookie=t+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"},Base64:function(){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";this.encode=function(a){var i,r,n,s,o,c,h,l="",d=0;for(a=e(a);d<a.length;)s=(i=a.charCodeAt(d++))>>2,o=(3&i)<<4|(r=a.charCodeAt(d++))>>4,c=(15&r)<<2|(n=a.charCodeAt(d++))>>6,h=63&n,isNaN(r)?c=h=64:isNaN(n)&&(h=64),l=l+t.charAt(s)+t.charAt(o)+t.charAt(c)+t.charAt(h);return l};var e=function(t){t=t.replace(/\r\n/g,"\n");for(var e="",a=0;a<t.length;a++){var i=t.charCodeAt(a);i<128?e+=String.fromCharCode(i):i>127&&i<2048?(e+=String.fromCharCode(i>>6|192),e+=String.fromCharCode(63&i|128)):(e+=String.fromCharCode(i>>12|224),e+=String.fromCharCode(i>>6&63|128),e+=String.fromCharCode(63&i|128))}return e};this.decode=function(e){var i,r,n,s,o,c,h="",l=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<e.length;)i=t.indexOf(e.charAt(l++))<<2|(s=t.indexOf(e.charAt(l++)))>>4,r=(15&s)<<4|(o=t.indexOf(e.charAt(l++)))>>2,n=(3&o)<<6|(c=t.indexOf(e.charAt(l++))),h+=String.fromCharCode(i),64!=o&&(h+=String.fromCharCode(r)),64!=c&&(h+=String.fromCharCode(n));return h=a(h)};var a=function(t){for(var e="",a=0,i=0,r=0,n=0;a<t.length;)(i=t.charCodeAt(a))<128?(e+=String.fromCharCode(i),a++):i>191&&i<224?(r=t.charCodeAt(a+1),e+=String.fromCharCode((31&i)<<6|63&r),a+=2):(r=t.charCodeAt(a+1),n=t.charCodeAt(a+2),e+=String.fromCharCode((15&i)<<12|(63&r)<<6|63&n),a+=3);return e}},timeFormat:function(t){if("string"!=typeof t)return t.getFullYear()+"/"+t.getMonth()+"/"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()}},A="http://117.48.157.6/interface",B="/system/loginOnline",T={username:"wzxsjShow",password:"123",captcha:"",uuid:""},E=function(t,e){return new C.a(function(a,i){H(t,e).then(function(t){b.a.get(t).then(function(t){L(t)?a(t.data):(console.warn("数据返回结果 "+t.data.msg),"token失效，请重新登录"==t.data.msg&&D.removeCookie("token"),a(""))}).catch(function(t){console.error("服务器访问错误"),i(t)})})})};function H(t,e){return new C.a(function(a){var i=A+t+"?token=",r=D.getCookie("token");if(r){for(var n in i+=r,e)i+="&"+n+"="+e[n];a(i)}else new C.a(function(t,e){var a=A+B,i=T;b.a.post(a,i).then(function(e){if(L(e)){var a=e.data.expire;D.setCookie("token",e.data.token,a),t(e.data.token)}else console.warn("数据返回结果 "+e.data.msg),t("")}).catch(function(t){console.error("服务器访问错误，Token获取失败"),e(t)})}).then(function(t){for(var r in i+=t,e)i+="&"+r+"="+e[r];a(i)})})}function L(t){return!(200!=t.status||!t.data||0!=t.data.code)}var O={data:function(){return{nowBox:0,pageHeight:0,titleData:{},chartsData_bar1:{},chartsData_pie1:{},chartsData_pie2:{},bottom_six:[]}},components:{shoesCharts:m},methods:{GetPageHeight:function(){var t=document.documentElement.clientHeight;this.pageHeight=t,c()(".shoes_page").css("height",t+"px")},changeBox:function(t){var e;e=this.nowBox,this.nowBox=t,e!=this.nowBox&&c()("#swiper_box").css("left",-100*t+"%"),this.changeElementName(t)},changeElementName:function(t){0==t?(c()("#pageName").text("订货量排行榜"),this.GetPageDatas(2,"")):(c()("#pageName").text("关注度排行榜"),this.GetPageDatas(1,""))},swiperBox1:function(){this.changeBox(1)},swiperBox2:function(){this.changeBox(0)},GetPageDatas:function(t,e){var a=this;E("/system/onlineRank/rankList",{type:t}).then(function(t){if(console.log(t.rank),0==t.code){var e={};e.titieName=t.rank.goodsPeriodEntity.name;var i=t.rank.goodsPeriodEntity.meetingStartTime.split(" ")[0].split("/"),r=t.rank.goodsPeriodEntity.meetingEndTime.split(" ")[0].split("/");e.titieTime=i[0]+"."+i[1]+"."+i[2]+"-"+r[0]+"."+r[1]+"."+r[2],a.titleData=e;var n,s=[];s=t.rank.rankList.length>30?t.rank.rankList.slice(-30):t.rank.rankList,n=t.rank.rankList.slice(-6),a.bottom_six=n;var o=[],c=[],h=[];for(var l in s)o.unshift(s[l].shoesSeq+""),c.unshift(s[l].num),h.unshift(s[l].count);var d={};d.chartsX=o,d.chartsY=c,d.chartsY2=h,a.chartsData_bar1=d;var v=[];for(var u in t.rank.goodsCategoryList){var g={itemStyle:{borderWidth:5}};g.value=t.rank.goodsCategoryList[u].num,0==u?(g.selected=!1,g.itemStyle.borderColor="rgba(51, 111, 255, 1)"):(g.selected=!0,g.itemStyle.borderColor="rgba(255, 76, 78, 1)"),v.push(g)}console.log(v);var f={};f.pieDatas=v,a.chartsData_pie1=f}})},defaultLoad:function(){this.GetPageDatas(2,"")}},mounted:function(){var t=this;c()(window).resize(function(){t.GetPageHeight(),location.reload()}),this.GetPageHeight(),this.defaultLoad()}};setInterval(function(){var t=new Date,e=t.getFullYear(),a=t.getMonth()+1,i=t.getDate(),r=(t.getDay(),t.getHours()),n=t.getMinutes(),s=t.getSeconds(),o=e+"年"+(a<10?"0"+a:a)+"月"+(i<10?"0"+i:i)+"日  "+(r<10?"0"+r:r)+":"+(n<10?"0"+n:n)+":"+(s<10?"0"+s:s);c()("#clock").text(o)},1e3);var N={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"shoes_page"},[a("div",{staticClass:"pages_top"},[t._m(0),t._v(" "),a("div",{staticClass:"top_title"},[a("div",[t._v(t._s(t.titleData.titieName))]),t._v(" "),a("div",[t._v(t._s(t.titleData.titieTime))])])]),t._v(" "),a("div",{staticClass:"pages_center"},[t._m(1),t._v(" "),a("div",{staticClass:"center_chart"},[a("div",{staticClass:"swiper_box",attrs:{id:"swiper_box"}},[a("div",{staticClass:"every_box",attrs:{id:"page_OrderQuantity"}},[a("div",{staticClass:"Columnar_charts"},[a("shoes-charts",{attrs:{chartsId:"bar1",chartsType:"bar",chartsHeight:t.pageHeight,chartsData:t.chartsData_bar1}})],1),t._v(" "),a("div",{staticClass:"pie_charts1"},[a("shoes-charts",{attrs:{chartsId:"pie1",chartsType:"pie",chartsHeight:t.pageHeight,chartsData:t.chartsData_pie1}})],1),t._v(" "),a("div",{staticClass:"pie_charts2"}),t._v(" "),t._m(2)]),t._v(" "),a("div",{staticClass:"every_box",attrs:{id:"page_Concern"}},[a("div",{staticClass:"Columnar_charts"},[a("shoes-charts",{attrs:{chartsId:"bar2",chartsType:"bar2",chartsHeight:t.pageHeight,chartsData:t.chartsData_bar1}})],1),t._v(" "),a("div",{staticClass:"pie_charts1"}),t._v(" "),a("div",{staticClass:"pie_charts2"}),t._v(" "),t._m(3)])])]),t._v(" "),a("div",{staticClass:"center_pageTurn"},[a("div",{class:0==t.nowBox?"chooseBox":"",on:{click:function(e){return t.changeBox(0)}}}),t._v(" "),a("div",{class:1==t.nowBox?"chooseBox":"",on:{click:function(e){return t.changeBox(1)}}})])]),t._v(" "),a("div",{staticClass:"pages_bottom"},[t._m(4),t._v(" "),a("div",t._l(t.bottom_six,function(e,i){return a("div",{key:i},[a("div",[a("img",{attrs:{src:e.imgSrc,alt:""}})]),t._v(" "),a("div",[a("div",[a("img",{attrs:{src:e.wxORCode,alt:""}})]),t._v(" "),a("div",[t._v(t._s(e.shoesSeq))])])])}),0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"top_clock"},[e("div",{attrs:{id:"clock"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"center_title"},[e("div",[e("div",{attrs:{id:"pageName"}},[this._v("订货量排行榜")])]),this._v(" "),e("div",[this._v("男女鞋占比")]),this._v(" "),e("div",[this._v("男女品类占比")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"charts1_datas"},[a("div",[a("div",[t._v("关注度：")]),t._v(" "),a("div",[t._v("12000")])]),t._v(" "),a("div",[a("div",[a("p"),t._v(" "),a("p",[t._v("男鞋：")])]),t._v(" "),a("div",[t._v("60%")]),t._v(" "),a("div",[t._v("18000")])]),t._v(" "),a("div",[a("div",[a("p"),t._v(" "),a("p",[t._v("女鞋：")])]),t._v(" "),a("div",[t._v("40%")]),t._v(" "),a("div",[t._v("14000")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"charts1_datas"},[a("div",[a("div",[t._v("关注度：")]),t._v(" "),a("div",[t._v("12000")])]),t._v(" "),a("div",[a("div",[a("p"),t._v(" "),a("p",[t._v("男鞋：")])]),t._v(" "),a("div",[t._v("60%")]),t._v(" "),a("div",[t._v("18000")])]),t._v(" "),a("div",[a("div",[a("p"),t._v(" "),a("p",[t._v("女鞋：")])]),t._v(" "),a("div",[t._v("40%")]),t._v(" "),a("div",[t._v("14000")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this._v("\n      单\n      "),e("br"),this._v("品\n      "),e("br"),this._v("排\n      "),e("br"),this._v("行\n    ")])}]};var $=a("VU/8")(O,N,!1,function(t){a("Srn/")},"data-v-0adc432f",null).exports;i.a.use(s.a);var P=new s.a({routes:[{path:"/",redirect:"/shoes"},{path:"/shoes",name:"shoes",component:$}]}),I=a("XLwt"),G=a.n(I);i.a.config.productionTip=!1,i.a.prototype.$echarts=G.a,new i.a({el:"#app",router:P,components:{App:n},template:"<App/>"})},"Srn/":function(t,e){},ns30:function(t,e){},xwCh:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.8c6979b5fdbf14e12c2f.js.map