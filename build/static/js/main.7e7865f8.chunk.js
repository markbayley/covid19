(this.webpackJsonpok=this.webpackJsonpok||[]).push([[0],{115:function(e,a,t){},150:function(e,a,t){},199:function(e,a,t){e.exports=t(637)},203:function(e,a,t){},204:function(e,a,t){},359:function(e,a,t){},360:function(e,a,t){},361:function(e,a,t){},637:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),c=t(28),i=t.n(c),r=(t(203),t(2)),o=t(4),s=t(5),m=t(7),u=t(6),d=(t(115),t(204),n.Component,t(8)),f=t.n(d),p=t(10),b=t(12),E=t(9),g=t(42);function h(e){return e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):"0"}var v=t(3),N="https://corona.lmao.ninja/v2",x=N+"/all",O=N+"/countries",y=N+"/continents",j=t(640),A=function(){return l.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"80vh"}},l.a.createElement("div",{className:"spinner-border text-info",role:"status"},l.a.createElement("span",{className:"sr-only"},"Loading...")))},k=t(193),C=t.n(k),w=(n.Component,n.Component,["#63b598","#ce7d78","#ea9e70","#a48a9e","#c6e1e8","#648177","#0d5ac1","#f205e6","#1c0365","#14a9ad","#4ca2f9","#a4e43f","#d298e2","#6119d0","#d2737d","#c0a43c","#f2510e","#651be6","#79806e","#61da5e","#cd2f00","#9348af","#01ac53","#c5a4fb","#996635","#b11573","#4bb473","#75d89e","#2f3f94","#2f7b99","#da967d","#34891f","#b0d87b","#ca4751","#7e50a8","#c4d647","#e0eeb8","#11dec1","#289812","#566ca0","#ffdbe1","#2f1179","#935b6d","#916988","#513d98","#aead3a","#9e6d71","#4b5bdc","#0cd36d","#250662","#cb5bea","#228916","#ac3e1b","#df514a","#539397","#880977","#f697c1","#ba96ce","#679c9d","#c6c42c","#5d2c52","#48b41b","#e1cf3b","#5be4f0","#57c4d8","#a4d17a","#225b8","#be608b","#96b00c","#088baf","#f158bf","#e145ba","#ee91e3","#05d371","#5426e0","#4834d0","#802234","#6749e8","#0971f0","#8fb413","#b2b4f0","#c3c89d","#c9a941","#41d158","#fb21a3","#51aed9","#5bb32d","#807fb","#21538e","#89d534","#d36647","#7fb411","#0023b8","#3b8c2a","#986b53","#f50422","#983f7a","#ea24a3","#79352c","#521250","#c79ed2","#d6dd92","#e33e52","#b2be57","#fa06ec","#1bb699","#6b2e5f","#64820f","#1c271","#21538e","#89d534","#d36647","#7fb411","#0023b8","#3b8c2a","#986b53","#f50422","#983f7a","#ea24a3","#79352c","#521250","#c79ed2","#d6dd92","#e33e52","#b2be57","#fa06ec","#1bb699","#6b2e5f","#64820f","#1c271","#9cb64a","#996c48","#9ab9b7","#06e052","#e3a481","#0eb621","#fc458e","#b2db15","#aa226d","#792ed8","#73872a","#520d3a","#cefcb8","#a5b3d9","#7d1d85","#c4fd57","#f1ae16","#8fe22a","#ef6e3c","#243eeb","#1dc18","#dd93fd","#3f8473","#e7dbce","#421f79","#7a3d93","#635f6d","#93f2d7","#9b5c2a","#15b9ee","#0f5997","#409188","#911e20","#1350ce","#10e5b1","#fff4d7","#cb2582","#ce00be","#32d5d6","#17232","#608572","#c79bc2","#00f87c","#77772a","#6995ba","#fc6b57","#f07815","#8fd883","#060e27","#96e591","#21d52e","#d00043","#b47162","#1ec227","#4f0f6f","#1d1d58","#947002","#bde052","#e08c56","#28fcfd","#bb09b","#36486a","#d02e29","#1ae6db","#3e464c","#a84a8f","#911e7e","#3f16d9","#0f525f","#ac7c0a","#b4c086","#c9d730","#30cc49","#3d6751","#fb4c03","#640fc1","#62c03e","#d3493a","#88aa0b","#406df9","#615af0","#4be47","#2a3434","#4a543f","#79bca0","#a8b8d4","#00efd4","#7ad236","#7260d8","#1deaa7","#06f43a","#823c59","#e3d94c","#dc1c06","#f53b2a","#b46238","#2dfff6","#a82b89","#1a8011","#436a9f","#1a806a","#4cf09d","#c188a2","#67eb4b","#b308d3","#fc7e41","#af3101","#ff065","#71b1f4","#a2f8a5","#e23dd0","#d3486d","#00f7f9","#474893","#3cec35","#1c65cb","#5d1d0c","#2d7d2a","#ff3420","#5cdd87","#a259a4","#e4ac44","#1bede6","#8798a4","#d7790f","#b2c24f","#de73c2","#d70a9c","#25b67","#88e9b8","#c2b0e2","#86e98f","#ae90e2","#1a806b","#436a9e","#0ec0ff","#f812b3","#b17fc9","#8d6c2f","#d3277a","#2ca1ae","#9685eb","#8a96c6","#dba2e6","#76fc1b","#608fa4","#20f6ba","#07d7f6","#dce77a","#77ecca"]),q=t(80),S=t.n(q),I=t(638),L=t(639),T=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){var e;Object(o.a)(this,t);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(e=a.call.apply(a,[this].concat(l))).state={countries:[],filterText:"",allCountryTotal:0,allDeathTotal:0,allActiveTotal:0,selectedCountries:[]},e.url="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv",e.handleOnRowSelected=function(a){var t=Object(p.a)(e.state.countries),n=t.findIndex((function(e){return e.name===a.name})),l={name:a.name,total:a.total,selected:!a.selected};t[n]=l,e.setState({countries:t,selectedCountries:t.filter((function(e){return e.selected}))})},e.sortByTotal=function(e,a){return a.total>e.total?1:a.total<e.total?-1:0},e.handleOnSortByTotal=function(a){e.handleOnSortBy(a,e.sortByTotal)},e.sortByCountryName=function(e,a){return e.name>a.name?1:e.name<a.name?-1:0},e.handleOnSortByCountryName=function(a){e.handleOnSortBy(a,e.sortByCountryName)},e.handleOnSortBy=function(a,t){a.preventDefault();var n=Object(p.a)(e.state.countries);n.sort(t),e.setState({countries:n})},e.handleFilterTextChange=function(a){var t=a.target.value;e.setState({filterText:t})},e}return Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(b.a)(f.a.mark((function e(){var a,t,n,l,c,i,r,o,s,m,u,d;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.get(this.url);case 2:for(a=e.sent,t=a.data.split("\n"),n=[],l=0,c=0,i=0,r=1;r<t.length;r++)o=t[r].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/),s=o[0].replace(/"/g,""),m=Number(o[4]),u=Number(o[5]),d=Number(o[7]),""!==s&&(n.push({name:s,total:m,deaths:u,active:d}),l+=m,c+=u,i+=d),console.log(o);return e.next=11,new Promise((function(e){setTimeout(e,1e3)}));case 11:this.setState({countries:n,allCountryTotal:l,allDeathTotal:c,allActiveTotal:i});case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"numberWithCommas",value:function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},{key:"render",value:function(){var e=this.state,a=(e.countries,e.allDeathTotal),t=e.allCountryTotal,n=e.allActiveTotal;e.selectedCountries,e.filterText;return l.a.createElement("div",{className:"text-info",style:{position:"absolute",width:"90vw",marginTop:"25px"}},l.a.createElement(I.a,null,l.a.createElement(L.a,{xl:5}),l.a.createElement(L.a,{xl:1,style:{border:"1px solid #fff"}},l.a.createElement("h5",null,l.a.createElement("i",{style:{color:"grey"},className:"fa fa-male"})," ","Cases"),l.a.createElement("h3",null,l.a.createElement(S.a,{start:0,end:t,duration:36,separator:","}))),l.a.createElement(L.a,{xl:1},l.a.createElement("h5",null,l.a.createElement("i",{style:{color:"black"},className:"fa fa-male"})," Deaths"),l.a.createElement("h3",null,l.a.createElement(S.a,{start:0,end:a,duration:36,separator:","}))),l.a.createElement(L.a,{xl:1},l.a.createElement("h5",null,l.a.createElement("i",{style:{color:"orange"},className:"fa fa-male"})," ","Active"),l.a.createElement("h3",null,l.a.createElement(S.a,{start:0,end:n,duration:36,separator:","})))),0===t?l.a.createElement(A,null):l.a.createElement("div",null))}}]),t}(n.Component),z=function(){var e=Object(n.useState)([]),a=Object(E.a)(e,2),t=a[0],c=a[1],i=Object(n.useState)([]),r=Object(E.a)(i,2),o=r[0],s=r[1],m=Object(n.useState)(20),u=Object(E.a)(m,2),d=u[0],g=u[1],v=Object(n.useState)(1),N=Object(E.a)(v,2),x=N[0],y=N[1];Object(n.useEffect)((function(){function e(){return(e=Object(b.a)(f.a.mark((function e(){var a,t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(O);case 3:return a=e.sent,e.next=6,a.json();case 6:t=e.sent,c(Object(p.a)(t)),s(Object(p.a)(t)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var j=function(e,a){var n=Object(p.a)(t);n.sort((function(e,t){return e[a]>t[a]?1:-1})),s(Object(p.a)(n))},A=function(e,a){var n=Object(p.a)(t);n.sort((function(e,t){return e[a]<t[a]?1:-1})),s(Object(p.a)(n))},k=1!==x,C=Math.ceil(o.length/d),w=x!==C;return l.a.createElement("div",{className:"",style:{fontSize:"13px",color:"turquoise"}},l.a.createElement("div",{className:"d-flex  flex-column flex-sm-row justify-content-between mb-3"},l.a.createElement("div",{className:"d-inline-flex"},l.a.createElement("select",{className:"form-control-sm mx-2 view-rows",onChange:function(e){return function(e){g(Number(e.target.value)),y(1)}(e)}},l.a.createElement("option",{value:"5"},"5"),l.a.createElement("option",{value:"10"},"10"),l.a.createElement("option",{value:"20",selected:!0},"20"),l.a.createElement("option",{value:"50"},"50"),l.a.createElement("option",{value:"100"},"100"))),l.a.createElement("div",{className:"input-group search-bar mt-2 mt-sm-0"},l.a.createElement("input",{type:"text",className:"form-control-sm",placeholder:"Enter country name",onChange:function(e){return function(e){var a=t.filter((function(a){return a.country.toLowerCase().startsWith(e.target.value.toLowerCase())}));s(Object(p.a)(a)),y(1)}(e)}}),l.a.createElement("div",{className:"input-group-append"},l.a.createElement("span",{className:"input-group-text"},l.a.createElement("i",{className:"fa fa-search",onChange:!0}))))),l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",{className:" "},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"country",l.a.createElement("div",{className:"d-inline-block d-inline"},l.a.createElement("span",{className:"ml-1 fa fa-arrow-up",onClick:function(e){return j(0,"country")}}),l.a.createElement("span",{className:"fa fa-arrow-down",onClick:function(e){return A(0,"country")}}))),l.a.createElement("th",null,"confirmed",l.a.createElement("div",{className:"d-inline-block d-inline"},l.a.createElement("span",{className:"ml-1 fa fa-arrow-up",onClick:function(e){return j(0,"cases")}}),l.a.createElement("span",{className:"fa fa-arrow-down",onClick:function(e){return A(0,"cases")}}))),l.a.createElement("th",null,"deaths",l.a.createElement("div",{className:"d-inline-block d-inline"},l.a.createElement("span",{className:"ml-1 fa fa-arrow-up",onClick:function(e){return j(0,"deaths")}}),l.a.createElement("span",{className:"fa fa-arrow-down",onClick:function(e){return A(0,"deaths")}}))),l.a.createElement("th",null,"recovered",l.a.createElement("div",{className:"d-inline-block d-inline"},l.a.createElement("span",{className:"ml-1 fa fa-arrow-up",onClick:function(e){return j(0,"recovered")}}),l.a.createElement("span",{className:"fa fa-arrow-down",onClick:function(e){return A(0,"recovered")}}))))),function(){if(!o.length)return l.a.createElement("tr",null,l.a.createElement("td",null,"noResults"));var e=o.slice((x-1)*d,x*d),a=(x-1)*d+1;return e.map((function(e,t){return l.a.createElement("tbody",{key:e.country,style:{color:"#fff"}},l.a.createElement("tr",null,l.a.createElement("th",{scope:"row"},a+t),l.a.createElement("td",null,e.country),l.a.createElement("td",null,h(e.cases)),l.a.createElement("td",null,h(e.deaths)),l.a.createElement("td",null,h(e.recovered))))}))}())),o.length?l.a.createElement("nav",{"aria-label":"Page navigation"},l.a.createElement("ul",{className:"mt-3 mt-sm-0 pagination pagination-sm justify-content-center justify-content-sm-end flex-wrap"},l.a.createElement("li",{className:"page-item"+(k?"":" disabled")},l.a.createElement("div",{className:"page-link ",onClick:function(){y((function(e){return e-1}))}},"prev")),function(){for(var e=[],a=1;a<=Math.ceil(o.length/d);a++)e.push(a);var t=x,n=e.length;return n-t<3&&(t=Math.max(1,n-3)),(e=e.slice(t-1,n)).length>6&&e.splice(4,e.length-6,"..."),t>10&&e.splice(0,0,1,"..."),e.map((function(e,a){return l.a.createElement("li",{className:"page-item"+("..."===e?" disabled":""),key:a},l.a.createElement("div",{className:"page-link "+(x===e?" active":""),id:e,onClick:function(e){y(Number(e.target.id))}},e))}))}(),l.a.createElement("li",{className:"page-item"+(w?"":" disabled")},l.a.createElement("div",{className:"page-link ",onClick:function(){y((function(e){return e+1}))}},"next")))):null)},B=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement(v.Animated,{animationIn:"fadeInLeft",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",{className:"App-side"},l.a.createElement("div",{className:"App-side-menu"},l.a.createElement(j.a,{onClick:this.props.toggleAsia,size:"sm",variant:"outline-light",className:"App-side-close"},l.a.createElement(v.Animated,{animationIn:"fadeInDown",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",null,"x"))),l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement("div",{className:"App-side-button"},l.a.createElement("h4",null,this.props.name),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))))))))}}]),t}(n.Component),D=function(e){var a=e.state,t=e.toggleSouthAmerica,c=Object(n.useState)([]),i=Object(E.a)(c,2),r=i[0],o=i[1];Object(n.useEffect)((function(){function e(){return(e=Object(b.a)(f.a.mark((function e(){var a,t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(y);case 3:return a=e.sent,e.next=6,a.json();case 6:t=e.sent,o(Object(p.a)(t)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var s=function(e){return r.map((function(a){return a[e]}))},m=(s("continent"),s("cases")),u=s("deaths"),d=s("active");return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:a?"visible":"hidden"},l.a.createElement(v.Animated,{animationIn:"fadeInLeft",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",{className:"App-side"},l.a.createElement("div",{className:"App-side-menu"},l.a.createElement(j.a,{onClick:t,size:"sm",variant:"outline-light",className:"App-side-close"},l.a.createElement(v.Animated,{animationIn:"fadeInDown",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",null,"x"))),l.a.createElement("div",{className:a?"visible":"hidden"},l.a.createElement("div",{className:"App-side-button"},l.a.createElement("h4",null,"South America"),l.a.createElement("h5",null,h(m[3])," Cases",l.a.createElement("br",null),h(d[3])," Active",l.a.createElement("br",null),h(u[3])," Deaths"),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))))))))},U=function(e){var a=e.toggleAsia,t=e.toggleEurope,c=e.toggleOceania,i=e.toggleNorthAmerica,r=e.toggleSouthAmerica,o=e.toggleAfrica,s=e.toggleGlobal,m=Object(n.useState)([]),u=Object(E.a)(m,2),d=u[0],g=u[1];Object(n.useEffect)((function(){function e(){return(e=Object(b.a)(f.a.mark((function e(){var a,t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(y);case 3:return a=e.sent,e.next=6,a.json();case 6:t=e.sent,g(Object(p.a)(t)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var h=function(e){return d.map((function(a){return a[e]}))},v=h("continent"),N=h("cases");console.log("CC",N);return l.a.createElement("div",{style:{left:"94%",height:"100vh",position:"absolute"}},l.a.createElement(j.a,{className:"asia button",id:"asia",onClick:a,size:"md",variant:"info"},l.a.createElement("h6",null,v[1]),N[1]),l.a.createElement(j.a,{className:"europe button",onClick:t,size:"md",id:"europe",variant:"info"},l.a.createElement("h6",null,v[3])),l.a.createElement(j.a,{className:"northamerica button",onClick:i,size:"md",id:"northamerica",variant:"info"},l.a.createElement("h6",null,v[0])),l.a.createElement(j.a,{className:"africa button",onClick:o,size:"md",id:"africa",variant:"info"},l.a.createElement("h6",null,v[4])),l.a.createElement(j.a,{className:"southamerica button",onClick:r,size:"md",id:"southamerica",variant:"info"},l.a.createElement("h6",null,v[2])),l.a.createElement(j.a,{className:"oceania button",onClick:c,size:"md",id:"oceania",variant:"info"},l.a.createElement("h6",null,"Oceania")),l.a.createElement(j.a,{className:"global button",onClick:s,size:"md",id:"global",variant:"info"},l.a.createElement("h6",null,"Global")),l.a.createElement(D,{labels:v,data:h("cases")}))},F=(t(359),n.Component,n.Component,n.Component,n.Component,n.Component,t(150),n.Component,t(360),n.Component,t(52)),G=t.n(F);t(361);G.a.accessToken="pk.eyJ1IjoibWFya3liMTUyIiwiYSI6ImNrZzJraGl1NTAwcjkyeXFyMHljNjExcmoifQ.RxhYWJnYveNc1LjK6wB9sQ";var V=function(e){e.toggleInfo;var a=Object(n.useRef)(null),t=Object(n.useState)(0),c=Object(E.a)(t,2),i=c[0],r=c[1],o=Object(n.useState)(20),s=Object(E.a)(o,2),m=s[0],u=s[1],d=Object(n.useState)(1.7),g=Object(E.a)(d,2),v=g[0],N=g[1],x=Object(n.useState)([]),y=Object(E.a)(x,2),j=y[0],A=y[1];Object(n.useEffect)((function(){function e(){return(e=Object(b.a)(f.a.mark((function e(){var a,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(O);case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,A(Object(p.a)(n)),console.log("COUNTRIES",n),n.forEach((function(e){var a=[e.countryInfo.long,e.countryInfo.lat],n=e.country,l=e.cases,c=e.active,i=e.deaths,r=e.countryInfo.flag;console.log(a,e,"FLAG",r);var o=new G.a.Popup({className:"popup"}).setLngLat([a[0],a[1]]).setHTML("\n            <img src=".concat(r,' alt="" width="30px" height="50px"></img><br />\n            <strong>').concat(n.toUpperCase(),"</strong><br/>\n            Cases: ").concat(h(l),"<br>\n            Active: ").concat(h(c),"<br>\n            Deaths: ").concat(h(i),"<br>\n           \n            ")).setMaxWidth("100px").addTo(t),s=document.createElement("div");s.className="marker",new G.a.Marker(s).setLngLat([a[0],a[1]]).setPopup(o).addTo(t)})),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}();var t=new G.a.Map({container:a.current,style:"mapbox://styles/mapbox/dark-v10",center:[i,m],zoom:v});t.doubleClickZoom.enable(),document.getElementById("africa").addEventListener("click",(function(){t.flyTo({zoom:3,center:[3.2,1.8],essential:!0})})),document.getElementById("europe").addEventListener("click",(function(){t.flyTo({zoom:4,center:[6,47],essential:!0})})),document.getElementById("northamerica").addEventListener("click",(function(){t.flyTo({zoom:3,center:[-120,45],essential:!0})})),document.getElementById("southamerica").addEventListener("click",(function(){t.flyTo({zoom:3.5,center:[-74,-4],essential:!0})})),document.getElementById("asia").addEventListener("click",(function(){t.flyTo({zoom:3.1,center:[100,17],essential:!0})})),document.getElementById("oceania").addEventListener("click",(function(){t.flyTo({zoom:3.7,center:[131,-28],essential:!0})})),document.getElementById("global").addEventListener("click",(function(){t.flyTo({zoom:1.7,center:[0,20],essential:!0})}));var n={width:100,height:100,data:new Uint8Array(4e4),onAdd:function(){var e=document.createElement("canvas");e.width=this.width,e.height=this.height,this.context=e.getContext("2d")},render:function(){var e=performance.now()%1e3/1e3,a=35*e+15,n=this.context;return n.clearRect(0,0,this.width,this.height),n.beginPath(),n.arc(this.width/2,this.height/2,a,0,2*Math.PI),n.fillStyle="rgba(5, 200, 200,"+(1-e)+")",n.fill(),n.beginPath(),n.arc(this.width/2,this.height/2,15,0,2*Math.PI),n.fillStyle="rgba(5, 100, 100, 1)",n.strokeStyle="white",n.lineWidth=2+4*(1-e),n.fill(),n.stroke(),this.data=n.getImageData(0,0,this.width,this.height).data,t.triggerRepaint(),!0}};return t.on("load",(function(){t.addImage("pulsing-dot",n,{pixelRatio:2}),t.addSource("points",{type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:[50,0]}}]}}),t.addLayer({id:"points",type:"symbol",source:"points",layout:{"icon-image":"pulsing-dot"}})})),t.addControl(new G.a.NavigationControl,"top-right"),t.on("move",(function(){r(t.getCenter().lng.toFixed(4)),u(t.getCenter().lat.toFixed(4)),N(t.getZoom().toFixed(2))})),function(){return t.remove()}}),[]);var k;k="country",j.map((function(e){return e[k]}));return l.a.createElement("div",null,l.a.createElement("div",{className:"sidebarStyle"},l.a.createElement("div",null,"Longitude: ",i," | Latitude: ",m," | Zoom: ",v)),l.a.createElement("div",{className:"map-container",ref:a}))},M=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement(v.Animated,{animationIn:"fadeInLeft",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",{className:"App-side"},l.a.createElement("div",{className:"App-side-menu"},l.a.createElement(j.a,{onClick:this.props.toggleEurope,size:"sm",variant:"outline-light",className:"App-side-close"},l.a.createElement(v.Animated,{animationIn:"fadeInDown",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",null,"x"))),l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement("div",{className:"App-side-button"},l.a.createElement("h4",null,"Europe"),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))))))))}}]),t}(n.Component),P=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement(v.Animated,{animationIn:"fadeInLeft",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",{className:"App-side"},l.a.createElement("div",{className:"App-side-menu"},l.a.createElement(j.a,{onClick:this.props.toggleAfrica,size:"sm",variant:"outline-light",className:"App-side-close"},l.a.createElement(v.Animated,{animationIn:"fadeInDown",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",null,"x"))),l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement("div",{className:"App-side-button"},l.a.createElement("h4",null,"Africa"),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))))))))}}]),t}(n.Component),R=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement(v.Animated,{animationIn:"fadeInLeft",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",{className:"App-side"},l.a.createElement("div",{className:"App-side-menu"},l.a.createElement(j.a,{onClick:this.props.toggleOceania,size:"sm",variant:"outline-light",className:"App-side-close"},l.a.createElement(v.Animated,{animationIn:"fadeInDown",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",null,"x"))),l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement("div",{className:"App-side-button"},l.a.createElement("h4",null,"Oceania"),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))))))))}}]),t}(n.Component),W=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement(v.Animated,{animationIn:"fadeInLeft",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",{className:"App-side"},l.a.createElement("div",{className:"App-side-menu"},l.a.createElement(j.a,{onClick:this.props.toggleNorthAmerica,size:"sm",variant:"outline-light",className:"App-side-close"},l.a.createElement(v.Animated,{animationIn:"fadeInDown",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",null,"x"))),l.a.createElement("div",{className:this.props.state?"visible":"hidden"},l.a.createElement("div",{className:"App-side-button"},l.a.createElement("h4",null,"North America"),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))))))))}}]),t}(n.Component),J=(t(362),function(e){var a=e.props,t=e.state,c=e.toggleGlobal,i=Object(n.useState)({}),o=Object(E.a)(i,2),s=o[0],m=o[1];Object(n.useEffect)((function(){function e(){return(e=Object(b.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(x);case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,m(Object(r.a)({},n)),a.updated(n.updated),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:t?"visible":"hidden"},l.a.createElement(v.Animated,{animationIn:"slideInLeft",animationOut:"slideOutLeft",isVisible:!0},l.a.createElement("div",{className:"App-side"},l.a.createElement("div",{className:"App-side-menu"},l.a.createElement(j.a,{onClick:c,size:"sm",variant:"outline-light",className:"App-side-close"},l.a.createElement(v.Animated,{animationIn:"fadeInDown",animationOut:"fadeOut",isVisible:!0},l.a.createElement("div",null,"x"))),l.a.createElement("div",{className:t?"visible":"hidden"},l.a.createElement("div",{className:"App-side-button"},l.a.createElement("h4",null,"Global"),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),l.a.createElement("h5",null," ",l.a.createElement("i",{className:"fa fa-male",style:{color:"#fff"}})," ",h(s.cases)," Cases"),l.a.createElement("h5",null,l.a.createElement("i",{className:"fa fa-male",style:{color:"orange"}})," ",h(s.active)," Active"),l.a.createElement("h5",null,l.a.createElement("i",{className:"fa fa-male",style:{color:"red"}})," ",h(s.deaths)," Deaths"," ")," ",l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."),l.a.createElement("p",null,l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"orange"}}),l.a.createElement("i",{className:"fa fa-male fa-2x",style:{color:"red"}}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("br",null),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("br",null),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"}),l.a.createElement("i",{className:"fa fa-male fa-2x"})))))))))}),Z={visible:!0,info:!1,facts:!1,asia:!1,northamerica:!1,southamerica:!1,europe:!1,oceania:!1,africa:!1,global:!1},Y=function(e){Object(m.a)(t,e);var a=Object(u.a)(t);function t(){var e;Object(o.a)(this,t);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(e=a.call.apply(a,[this].concat(l))).state=Object(r.a)({},Z),e.setDefaultState=function(){e.setState(Object(r.a)({},Z))},e.toggleMap=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{visible:!e.state.visible}))},e.toggleFacts=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{facts:!e.state.facts}))},e.toggleInfo=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{info:!e.state.info}))},e.toggleRegion=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{india:!e.state.india}))},e.toggleAsia=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{asia:!e.state.asia}))},e.toggleOceania=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{oceania:!e.state.oceania}))},e.toggleEurope=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{europe:!e.state.europe}))},e.toggleAfrica=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{africa:!e.state.africa}))},e.toggleSouthAmerica=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{southamerica:!e.state.southamerica}))},e.toggleNorthAmerica=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{northamerica:!e.state.northamerica}))},e.toggleGlobal=function(){e.setState(Object(r.a)(Object(r.a)({},Z),{},{global:!e.state.global}))},e}return Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(V,null),l.a.createElement(U,{toggleGlobal:this.toggleGlobal,toggleAsia:this.toggleAsia,toggleOceania:this.toggleOceania,toggleAfrica:this.toggleAfrica,toggleEurope:this.toggleEurope,toggleNorthAmerica:this.toggleNorthAmerica,toggleSouthAmerica:this.toggleSouthAmerica}),l.a.createElement("div",{className:"map"},l.a.createElement("div",{className:"grid"},l.a.createElement(B,{state:this.state.asia,toggleAsia:this.toggleAsia,name:"Asia"}),l.a.createElement(M,{state:this.state.europe,toggleEurope:this.toggleEurope}),l.a.createElement(P,{state:this.state.africa,toggleAfrica:this.toggleAfrica}),l.a.createElement(R,{state:this.state.oceania,toggleOceania:this.toggleOceania}),l.a.createElement(W,{state:this.state.northamerica,toggleNorthAmerica:this.toggleNorthAmerica}),l.a.createElement(D,{state:this.state.southamerica,toggleSouthAmerica:this.toggleSouthAmerica}),l.a.createElement(J,{state:this.state.global,toggleGlobal:this.toggleGlobal}))))}}]),t}(n.Component),H=function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("h3",{className:"card-text"},e.labels[0]),l.a.createElement("p",{className:"card-text"},e.data[0]))),l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("h3",{className:"card-text"},e.labels[1]),l.a.createElement("p",{className:"card-text"},e.data[1]))),l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("h3",{className:"card-text"},e.labels[2]),l.a.createElement("p",{className:"card-text"},e.data[2]))),l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("h3",{className:"card-text"},e.labels[3]),l.a.createElement("p",{className:"card-text"},e.data[3]))),l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("h3",{className:"card-text"},e.labels[4]),l.a.createElement("p",{className:"card-text"},h(e.data[4])))),l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("h3",{className:"card-text"},e.labels[5]),l.a.createElement("p",{className:"card-text"},e.data[5]))))},Q=function(e){e.props;var a=e.state,t=(e.toggleAsia,e.toggleEurope,e.toggleOceania,e.toggleNorthAmerica,e.toggleSouthAmerica,e.toggleAfrica,e.toggleGlobal),c=Object(n.useState)([]),i=Object(E.a)(c,2),r=i[0],o=i[1];Object(n.useEffect)((function(){function e(){return(e=Object(b.a)(f.a.mark((function e(){var a,t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(y);case 3:return a=e.sent,e.next=6,a.json();case 6:t=e.sent,o(Object(p.a)(t)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var s=function(e){return r.map((function(a){return a[e]}))},m=s("continent");return l.a.createElement("div",{className:a?"visible":"hidden"},l.a.createElement(H,{labels:m,data:s("cases"),toggleGlobal:t,name:"Global"}),l.a.createElement(j.a,{className:"asia button",id:"asia",onClick:t,size:"md",variant:"dark"},l.a.createElement("h6",null,m[1]),s("cases")[1]))},$={visible:!0,updated:0,asia:!1,northamerica:!1,southamerica:!1,europe:!1,oceania:!1,africa:!1,global:!1};n.Component,Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(636);i.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[199,1,2]]]);
//# sourceMappingURL=main.7e7865f8.chunk.js.map