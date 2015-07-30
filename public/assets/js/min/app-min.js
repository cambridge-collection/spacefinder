function resizeForMobile(){currView="small",$("body").removeClass("large_view"),$("#top-bar").find('a[href!="#/search"]').show(0),$(window).trigger("hashchange"),$("#search-btn").removeClass("active")}function resizeForDesktop(){if(currView="large",$("body").addClass("large_view"),$("#top-bar").find('a[href!="#/search"]').hide(0),$("#map").show(0),0==$(".space-container").length?$("#list").show(0):$("#list").hide(0),$("#search-btn").addClass("active"),$("#search").show(),void 0!==map){if(map.setZoom(14),openPoints.length>0)for(var e=0;e<openPoints.length;e++)points[openPoints[e]].mapSummary.close(),points[openPoints[e]].marker.icon.fillColor=inactiveColor,points[openPoints[e]].marker.setMap(map),openPoints.splice(e,1);centerOnLocation?map.setCenter(userLoc):map.setCenter(loc)}}function switchView(e,t){if("/list"==oldView&&(listScroll=Number($(window).scrollTop())),void 0==e&&(e=initialView),closeSpaces(),-1==e.indexOf("/")&&$("#"+e).length>0)"small"==currView?($(".view-container").css("display","none"),$("a").removeClass("active"),$('a[href="#/'+e+'"]').addClass("active"),$("#"+e).fadeIn({duration:300,start:function(){"map"==e&&(google.maps.event.trigger(map,"resize"),$(window).scrollTop(0)),mapViewed||(1==mapViewed,centerOnLocation?map.setCenter(userLoc):map.setCenter(loc))},progress:function(){"list"==e&&$(window).scrollTop(listScroll),"map"==e&&openPoints.length>0&&(new google.maps.event.trigger(points[openPoints[0]].marker,"click"),map.setZoom(14))}})):mapViewed||(1==mapViewed,centerOnLocation?map.setCenter(userLoc):map.setCenter(loc));else if(-1!==e.indexOf("space")){"small"==currView&&$(".view-container").css("display","none");var a=e.split("/");loadSpace({id:a[1],name:a[2].replace("-"," ")})}}function loadSpace(e){var t={},a;$.extend(t,e),a=findMarkers(points,{id:t.id}).spaces,1==a.length?showSpace(a[0]):0==a.length?$.ajax({url:"/assets/data/unloaded-space.json",dataType:"json",data:{id:t.id}}).done(function(e){"array"==$.type(e)&&(e=e[0]),showSpace(e)}):console.log("too many spaces with same ID returned")}function showSpace(e){var t=$("<div />").css("display","none").attr("id","space-"+e.id).addClass("space-container").append(parseTemplate("spaceDetail",e)).insertAfter("#list").fadeIn(300);"large"==currView&&$("#list").css("display","none")}function closeSpaces(){if($("div[id^=space-]").fadeOut(300,function(){$(this).remove()}),"large"==currView){if($("#list").css("display","block"),map.setZoom(14),openPoints.length>0)for(var e=0;e<openPoints.length;e++)points[openPoints[e]].mapSummary.close(),points[openPoints[e]].marker.icon.fillColor=inactiveColor,points[openPoints[e]].marker.setMap(map),openPoints.splice(e,1);centerOnLocation?map.setCenter(userLoc):map.setCenter(loc)}}function resetViews(){map=new google.maps.Map(document.getElementById("map"),mapOptions),$("#list").html("")}function loadSpaces(e){var t={queryString:"",reset:!1};$.extend(t,e),resetViews(),$.ajax("https://uoc-spacefinder.herokuapp.com/spaces.json?callback=?",{cache:!1,dataType:"json",method:"GET",data:t.queryString}).done(function(e){points=e,distCount=0,getLocation?$.each(points,function(e,a){points[e].link="#/space/"+points[e].id+"/"+points[e].name.replace(" ","-"),null!==points[e].lat&&null!==points[e].lng?getDistance(userLoc,{lat:Number(points[e].lat),lng:Number(points[e].lng)},function(a){points[e].distance=a,distCount++,distCount==points.length&&(t.reset||loadSearch(),loadMap(),loadList(),"function"==typeof t.callback&&t.callback())}):(distCount++,distCount==points.length&&(t.reset||loadSearch(),loadMap(),loadList(),"function"==typeof t.callback&&t.callback()))}):(t.reset||loadSearch(),loadMap(),loadList(),"function"==typeof t.callback&&t.callback())})}function showLoginScreen(e,t){var a=$(e),n={};$.extend(n,t),$("<div />").addClass("login-screen").html(parseTemplate("login",n)).appendTo(a),$(a.parents("div")[a.parents("div").length-1]).scrollTop(0)}function loadSearch(){$.ajax("https://uoc-spacefinder.herokuapp.com/spaces/filters.json",{cache:!1,dataType:"json",method:"GET"}).done(function(e){console.log("loaded search"),$("#search").append(parseTemplate("search",e))})}function checkMarker(e,t){var a=!0;return $.each(t,function(t,n){return e[t]!=n?(a=!1,!1):void 0}),a}function findMarkers(e,t){var a={spaces:[]};return $.each(e,function(n){checkMarker(e[n],t)&&(e[n]._jsid=n,a.spaces.push(e[n]))}),a.spaces.length>1&&(a.lat=a.spaces[0].lat,a.lng=a.spaces[0].lng,""!==a.spaces[0].library?a.name=a.spaces[0].library:a.name=a.spaces[0].address),a}function loadMap(e){var t={inactiveColor:inactiveColor,activeColor:activeColor};$.extend(t,e),$.each(points,function(e){if(void 0!==points[e].marker)return!0;if(null==points[e].lat||null==points[e].lng)return!0;"string"==$.type(points[e].lat)&&(points[e].lat=Number(points[e].lat)),"string"==$.type(points[e].lng)&&(points[e].lng=Number(points[e].lng));for(var a=findMarkers(points,{lat:points[e].lat,lng:points[e].lng}),n=a.spaces.length>1?!0:!1,i=new google.maps.Marker({position:{lat:Number(points[e].lat),lng:Number(points[e].lng)},icon:n?multiMarkerSymbol:markerSymbol}),o=0;o<a.spaces.length;o++)points[a.spaces[o]._jsid].marker=i;points[e].marker=i;var l;n?(points[e].spaces=a.spaces,points[e].template="mapMulti",l=parseTemplate("mapMulti",points[e])):(points[e].template="mapSingle",l=parseTemplate("mapSingle",points[e]));var s=new InfoBubble({content:l,shadowStyle:0,padding:0,backgroundColor:"rgba(54,54,54,0.9)",borderRadius:4,arrowSize:10,borderWidth:1,padding:10,disableAutoPan:!1,hideCloseButton:!1,backgroundClassName:"map-info-bubble",disableAnimation:!0,arrowStyle:0});points[e].mapSummary=s,i.setMap(map),google.maps.event.addListener(i,"click",function(){if(openPoints.length>0)for(var a=0;a<openPoints.length;a++)points[openPoints[a]].mapSummary.close(),points[openPoints[a]].marker.icon.fillColor=inactiveColor,points[openPoints[a]].marker.setMap(map),openPoints.splice(a,1);0==$("#bubble-"+points[e].id).length&&setTimeout(function(){$("#bubble-"+points[e].id).html(""),$("#bubble-"+points[e].id).append(parseTemplate(points[e].template,points[e]))},100),s.open(map,i),this.icon.fillColor=t.activeColor,this.setMap(map),openPoints.push(e)}),google.maps.event.addListener(s,"closeclick",function(){i.icon.fillColor=t.inactiveColor,i.setMap(map),openPoints=[]})}),"function"==typeof t.callback&&t.callback()}function loadList(e){var t={inactiveColor:"rgba(0,0,0,0.6)",activeColor:"#e2637c"};$.extend(t,e),$.each(points,function(e){var t=parseTemplate("list",points[e]);$list.append(t)}),"function"==typeof t.callback&&t.callback()}function loadTemplates(e){var t={},a=0;$.extend(t,e),$.each(templates,function(e){a++,$.ajax({url:templates[e].url,dataType:"html"}).done(function(t){templates[e].template=t,a--})});var n=setInterval(function(){"function"==typeof t.callback&&0>=a&&(clearInterval(n),t.callback())},10)}function parseTemplate(e,t,a){if(void 0==e)return!1;var n=new RegExp("(#{.*\\[.*\\].*})","g"),i,o,l,s=null,r=null,c=null;if(o=1==a?e:templates[e].template,i=o.match(n),null!==i)for(var p=0;p<i.length;p++){var n=new RegExp("(#{(.*)\\[(.*)\\](.*?)})","g"),u=n.exec(i[p]);if(null!==u&&u!==u[4]!==void 0&&(s=u[4].match(/.*limit="(.*)".*/),s=null!==s?Number(s[1]):null),null!==u&&void 0!==u[2]){var d=convertToValue(u[3],t[u[2]],{limit:s,icon:r,attr:c});o=o.replace(u[1],d)}}if(n=new RegExp("(#{(.*?)})","g"),l=o.match(n),null!==l)for(var p=0;p<l.length;p++){s=l[p].match(/.*\(.*limit="(.*)".*/),value=l[p].match(/.*\(.*value="(.*)".*/),c=l[p].match(/.*\(.*attr="(.*)".*/),r=l[p].match(/.*\(.*icon.*/),null!==r&&(r=!0),null!==s&&(s=Number(s[1])),null!==c&&(c=c[1]),null!==value&&(value=value[1]);var m="";m=null!==s||null!==r||null!==c||null!==value?l[p].match(/#{(.*)\(.*}/):l[p].match(/#{(.*)}/);var d=convertToValue(l[p],t[m[1]],{limit:s,icon:r,attr:c,value:value});o=o.replace(l[p],d)}return o}function convertToValue(e,t,a){if("array"==$.type(t)){for(var n="",i=0;i<t.length;i++){var o=e;if("object"==$.type(t[i])||"array"==$.type(t[i]))o=parseTemplate(e,t[i],!0);else{var l=searchArray(iconMap,t[i]);-1!==l?(o=o.replace(/#{value}/g,iconMap[l][1]),o=o.replace(/#{attr}/g,iconMap[l][0].replace(/ /g,"-")),o=o.replace(/#{icon}/g,iconMap[l][2])):(o=o.replace(/#{value}/g,t[i].replace(/(.*?)_/,"")),o=o.replace(/#{attr}/g,t[i]))}if(n+=o,null!==a.limit&&i>=a.limit-1)break}return n}if("object"==$.type(t)){var n=e;return null!==a.value?n=null!==a.limit?t[a.value].substr(0,a.limit):t[a.value]:$.each(t,function(e,t){n=null!==a.limit?n.replace("/#{"+e+".*}/g",String(t).substr(0,a.limit)):n.replace("/#{"+e+".*}/g",t)}),n}if(void 0!==t&&null!==t&&"null"!==t){if(null!==a.limit&&(t=String(t).substr(0,a.limit)),null!==a.attr&&(t=String(t).replace(" ",a.attr)),a.icon){var l=searchArray(iconMap,t);-1!==l&&(t=iconMap[l][2])}return t}return""}function searchArray(e,t){for(var a=-1,n=0;n<e.length;n++)if("array"==$.type(e[n])){for(var i=0;i<e[n].length;i++)if(e[n][i]==t){a=n;break}if(-1!==a)break}else if(e[n]==t){a=n;break}return a}function getDistance(e,t,a){var n=new google.maps.DistanceMatrixService;if("array"!==$.type(e)){var i=[];i.push(e),e=i}if("array"!==$.type(t)){var i=[];i.push(t),t=i}n.getDistanceMatrix({origins:e,destinations:t,unitSystem:google.maps.UnitSystem.IMPERIAL,travelMode:google.maps.TravelMode.WALKING},function(e,t){return"OK"!=t?"":void("function"==$.type(a)&&(void 0!==e.rows[0].elements[0].distance?a(e.rows[0].elements[0].distance.text):a()))})}var map,$list=$("#list"),openPoints=[],loc={lat:52.205575,lng:.121682},userLoc={lat:0,lng:0},userDetails=null,getLocation=!0,centerOnLocation=!1,points=[],listScroll=0,currView="small",currWidth=0;mapOptions={center:loc,zoom:14,disableDefaultUI:!0},oldView=void 0,templates={list:{url:"/assets/templates/list-space.html",template:""},mapSingle:{url:"/assets/templates/map-single-space.html",template:""},mapMulti:{url:"/assets/templates/map-multi-space.html",template:""},spaceDetail:{url:"/assets/templates/space-detail.html",template:""},search:{url:"/assets/templates/search.html",template:""},addTip:{url:"/assets/templates/add-tip.html",template:""},addTag:{url:"/assets/templates/add-tag.html",template:""},spaceTip:{url:"/assets/templates/space-tip.html",template:""},login:{url:"/assets/templates/login.html",template:""}},inactiveColor="rgba(0,0,0,0.6)",activeColor="#E37222",initialView="map",view="",mapViewed=!1;var markerSymbol={path:"M0-30.5c-5.7,0-10.2,4.6-10.2,10.2C-10.2-14.6,0,0,0,0s10.2-14.6,10.2-20.2C10.2-25.9,5.7-30.5,0-30.5z M0-17.7c-1.6,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S1.6-17.7,0-17.7z",fillColor:inactiveColor,fillOpacity:1,scale:1,strokeWeight:0},multiMarkerSymbol={path:"M0-28.5c-5.7,0-10.2,4.6-10.2,10.2C-10.2-12.6,0,0,0,0s10.2-12.6,10.2-18.2C10.2-23.9,5.7-28.5,0-28.5z M5.2-17.8h-4v4h-2.4v-4h-4v-2.4h4v-4h2.4v4h4V-17.8z",fillColor:inactiveColor,fillOpacity:1,scale:1,strokeWeight:0};$().ready(function(){$("#search-btn").on("click touchstart",function(e){"large"==currView&&(e.preventDefault(),console.log("search clicked"),$(this).hasClass("active")?($("#search").hide(0),$(this).removeClass("active")):($("#search").show(0),$(this).addClass("active")))});var e=initialView;if($(window).on("hashchange",function(e){return void 0!==e.originalEvent&&(oldView=e.originalEvent.oldURL.split("#")[1]),view=window.location.hash.substr(1),"/"!=view.substr(0,1)?!1:("/"==view&&(window.location.hash="/"+initialView),view=view.substr(1),void switchView(view))}),""!==window.location.hash&&initialView!==window.location.hash){if(view=window.location.hash.substr(1),"/"!=view.substr(0,1))return!1;view=view.substr(1),e=view}loadTemplates({data:templates,callback:function(){"geolocation"in navigator&&getLocation?navigator.geolocation.getCurrentPosition(function(t){userLoc.lat=t.coords.latitude,userLoc.lng=t.coords.longitude,centerOnLocation&&map.setCenter(userLoc),loadSpaces({callback:function(){switchView(e)}})},function(){getLocation=!1,loadSpaces({callback:function(){switchView(e)}})}):loadSpaces({callback:function(){switchView(e)}})}}),moment.locale("en",{relativeTime:{future:"in %s",past:"%s",s:"seconds",m:"a minute",mm:"%d m",h:"an hour",hh:"%d h",d:"a day",dd:"%d d",M:"a month",MM:"%d m",y:"a year",yy:"%d y"}}),$(window).on("resize",function(e){e.preventDefault(),currWidth=$(window).width(),1e3>currWidth&&"small"!==currView?(resizeForMobile(),$(window).trigger("layout")):currWidth>1e3&&"large"!==currView&&(resizeForDesktop(),$(window).trigger("layout"))}),$(window).trigger("resize");var t=navigator.userAgent.match(/(iPad|iPhone|iPod)/g);null!==t&&"large"==currView&&$("body").height($(window).height()),$(window).on("login_success",function(e){e.preventDefault(),console.log("login successful"),$(".login-screen").hide(300,function(){$(this).remove()})})});