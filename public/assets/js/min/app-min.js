function switchView(e,a){if(void 0==e&&(e=initialView),closeSpaces(),-1==e.indexOf("/")&&$("#"+e).length>0)$(".view-container").css("display","none"),$("a").removeClass("active"),$('a[href="#/'+e+'"]').addClass("active"),$("#"+e).fadeIn({duration:300,start:function(){"map"==e&&google.maps.event.trigger(map,"resize"),mapViewed||(1==mapViewed,centerOnLocation?map.setCenter(userLoc):map.setCenter(loc))}});else if(-1!==e.indexOf("space")){var t=e.split("/");loadSpace({id:t[1],name:t[2].replace("-"," ")})}}function loadSpace(e){var a={},t;$.extend(a,e),t=findMarkers(points,{id:a.id}).spaces,1==t.length?showSpace(t[0]):0==t.length?$.$.ajax({url:"/assets/data/unloaded-space.json",dataType:"json",data:{id:a.id}}).done(function(e){"array"==$.type(e)&&(e=e[0]),showSpace(e)}):console.log("too many spaces with same ID returned")}function showSpace(e){if(getLocation&&void 0==e.distance)return void getDistance(userLoc,{lat:e.latitude,lng:e.longitude},function(a){e.distance=a,showSpace(e)});var a=$("<div />").css("display","none").attr("id","space-"+e.id).addClass("space-container").append(parseTemplate("spaceDetail",e)).appendTo("body").fadeIn(300,function(){})}function closeSpaces(){$("div[id^=space-]").fadeOut(300,function(){$(this).remove()})}function loadSpaces(e){var a={};$.extend(a,e),$.getJSON("/assets/data/points.json").done(function(e){points=e,loadMap(),loadList(),"function"==typeof a.callback&&a.callback()})}function checkMarker(e,a){var t=!0;return $.each(a,function(a,n){return e[a]!=n?(t=!1,!1):void 0}),t}function findMarkers(e,a){var t={spaces:[]};return $.each(e,function(n){checkMarker(e[n],a)&&(e[n]._jsid=n,t.spaces.push(e[n]),getLocation||(e[n].distance=markers.distance=""),e[n].link="#/space/"+points[n].id+"/"+points[n].name.replace(" ","-"))}),t.spaces.length>1&&(t.latitude=t.spaces[0].latitude,t.longitude=t.spaces[0].longitude,""!==t.spaces[0].library?t.name=t.spaces[0].library:t.name=t.spaces[0].address),t}function loadMap(e){var a={inactiveColor:"rgba(0,0,0,0.6)",activeColor:activeColor};$.extend(a,e),$.each(points,function(e){if(void 0!==points[e].marker)return!0;for(var t=findMarkers(points,{latitude:points[e].latitude,longitude:points[e].longitude}),n=t.spaces.length>1?!0:!1,i=new google.maps.Marker({position:{lat:points[e].latitude,lng:points[e].longitude},title:points[e].name,icon:n?multiMarkerSymbol:markerSymbol}),o=0;o<t.spaces.length;o++)points[t.spaces[o]._jsid].marker=i;points[e].marker=i;var s;n?(points[e].template="mapMulti",s=parseTemplate("mapMulti",t)):(points[e].template="mapSingle",s=parseTemplate("mapSingle",points[e]));var l=new InfoBubble({content:s,shadowStyle:0,padding:0,backgroundColor:"rgba(54,54,54,0.9)",borderRadius:4,arrowSize:10,borderWidth:1,padding:10,disableAutoPan:!1,hideCloseButton:!1,maxWidth:300,backgroundClassName:"map-info-bubble",disableAnimation:!0,arrowStyle:0});points[e].mapSummary=l,i.setMap(map),getLocation&&getDistance(userLoc,{lat:points[e].latitude,lng:points[e].longitude},function(a){points[e].distance=a,points[e].mapSummary.content=parseTemplate(points[e].mapSummary.content,points[e],!0)}),google.maps.event.addListener(i,"click",function(){if(openPoints.length>0)for(var t=0;t<openPoints.length;t++)points[openPoints[t]].mapSummary.close(),points[openPoints[t]].marker.icon.fillColor="#797979",points[openPoints[t]].marker.setMap(map),openPoints.splice(t,1);l.open(map,i),this.icon.fillColor=a.activeColor,this.setMap(map),openPoints.push(e)}),google.maps.event.addListener(l,"closeclick",function(){i.icon.fillColor=a.inactiveColor,i.icon.fillOpacity=1,i.setMap(map)})}),"function"==typeof a.callback&&a.callback()}function loadList(e){var a={inactiveColor:"rgba(0,0,0,0.6)",activeColor:"#e2637c"};$.extend(a,e),$.each(points,function(e){var a=parseTemplate("list",points[e]);$list.append(a)}),"function"==typeof a.callback&&a.callback()}function loadTemplates(e){var a={},t=0;$.extend(a,e),$.each(templates,function(e){t++,$.ajax({url:templates[e].url,dataType:"html"}).done(function(a){templates[e].template=a,t--})});var n=setInterval(function(){"function"==typeof a.callback&&0>=t&&(clearInterval(n),a.callback())},10)}function parseTemplate(e,a,t){var n=e;return t||(n=templates[e].template),$.each(a,function(e,t){if("array"!==$.type(t)){var i=new RegExp("(#{"+e+"})","g");n=n.replace(i,t);var i=new RegExp("(#{"+e+"-attr})","g");t=String(t).replace(/ /g,"-"),n=n.replace(i,t)}else{var i=new RegExp("#{"+e+"\\[(.*)\\]}","g"),o=n.match(i);if(null!==o)for(var s=0;s<o.length;s++){var l="",c=new RegExp("#{.*\\[(.*)\\]}","g"),r=c.exec(o[s]);if(console.log(o[s],r,"#{"+e+"\\[(.*)\\]}"),null!=r&&void 0!=r[1]&&(r=r[1],null!==r)){for(var p=0;p<a[e].length;p++){var d="";"object"==$.type(a[e][s])?d=parseTemplate(r,a[e][p],!0):(d=r.replace("#{value}",a[e][p]),d=d.replace("#{attr}",a[e][p].replace(/ /g,"-"))),l+=d}n=n.replace(o[s],l)}}}}),n}function getDistance(e,a,t){var n=new google.maps.DistanceMatrixService;if("array"!==$.type(e)){var i=[];i.push(e),e=i}if("array"!==$.type(a)){var i=[];i.push(a),a=i}n.getDistanceMatrix({origins:e,destinations:a,unitSystem:google.maps.UnitSystem.IMPERIAL,travelMode:google.maps.TravelMode.WALKING},function(e,a){return"OK"!=a?"":void("function"==$.type(t)&&t(e.rows[0].elements[0].distance.text))})}var map,$list=$("#list"),openPoints=[],loc={lat:52.205575,lng:.121682},userLoc={lat:0,lng:0};getLocation=!0,centerOnLocation=!1,points=[],mapOptions={center:loc,zoom:14,disableDefaultUI:!0},oldView=void 0,templates={list:{url:"/assets/templates/list-space.html",template:""},mapSingle:{url:"/assets/templates/map-single-space.html",template:""},mapMulti:{url:"/assets/templates/map-multi-space.html",template:""},spaceDetail:{url:"/assets/templates/space-detail.html",template:""}},inactiveColor="rgba(0,0,0,0.6)",activeColor="#E37222",initialView="map",mapViewed=!1;var markerSymbol={path:"M0-30.5c-5.7,0-10.2,4.6-10.2,10.2C-10.2-14.6,0,0,0,0s10.2-14.6,10.2-20.2C10.2-25.9,5.7-30.5,0-30.5z M0-17.7c-1.6,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S1.6-17.7,0-17.7z",fillColor:inactiveColor,fillOpacity:.8,scale:1,strokeWeight:0},multiMarkerSymbol={path:"M0-28.5c-5.7,0-10.2,4.6-10.2,10.2C-10.2-12.6,0,0,0,0s10.2-12.6,10.2-18.2C10.2-23.9,5.7-28.5,0-28.5z M5.2-17.8h-4v4h-2.4v-4h-4v-2.4h4v-4h2.4v4h4V-17.8z",fillColor:inactiveColor,fillOpacity:.8,scale:1,strokeWeight:0};$().ready(function(){map=new google.maps.Map(document.getElementById("map"),mapOptions);var e=initialView;if($(window).on("hashchange",function(e){oldView=e.originalEvent.oldURL.split("#")[1];var a=window.location.hash.substr(1);return"/"!=a.substr(0,1)?!1:("/"==a&&(window.location.hash="/"+initialView),a=a.substr(1),void switchView(a))}),""!==window.location.hash&&initialView!==window.location.hash){var a=window.location.hash.substr(1);if("/"!=a.substr(0,1))return!1;a=a.substr(1),e=a}loadTemplates({data:templates,callback:function(){"geolocation"in navigator&&getLocation?navigator.geolocation.getCurrentPosition(function(a){userLoc.lat=a.coords.latitude,userLoc.lng=a.coords.longitude,centerOnLocation&&map.setCenter(userLoc),loadSpaces({callback:function(){switchView(e)}})},function(){getLocation=!1,loadSpaces({callback:function(){switchView(e)}})}):loadSpaces({callback:function(){switchView(e)}})}})});