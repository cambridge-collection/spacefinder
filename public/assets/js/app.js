if (typeof console == "undefined") var console = { log: function() {} };
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
* Build: http://modernizr.com/download/#-flexbox-cssclasses-testprop-testallprops-domprefixes
*/
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(prefixes.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b){for(var d in a){var e=a[d];if(!A(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}function D(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return z(b,"string")||z(b,"undefined")?B(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),C(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.flexbox=function(){return D("flexWrap")};for(var E in p)w(p,E)&&(u=E.toLowerCase(),e[u]=p[E](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,e._version=d,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return B([a])},e.testAllProps=D,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+s.join(" "):""),e}(this,this.document);
/*! jQuery UI - v1.11.4 - 2016-01-28
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, draggable.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var s=0,n=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,a=n.call(arguments,1),o=0,r=a.length;r>o;o++)for(i in a[o])s=a[o][i],a[o].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(a){var o="string"==typeof a,r=n.call(arguments,1),h=this;return o?this.each(function(){var i,n=e.data(this,s);return"instance"===a?(h=n,!1):n?e.isFunction(n[a])&&"_"!==a.charAt(0)?(i=n[a].apply(n,r),i!==n&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+a+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+a+"'")}):(r.length&&(a=e.widget.extend.apply(null,[a].concat(r))),this.each(function(){var t=e.data(this,s);t?(t.option(a||{}),t._init&&t._init()):e.data(this,s,new i(a,this))})),h}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=s++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget;var a=!1;e(document).mouseup(function(){a=!1}),e.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!a){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),a=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),a=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),e.widget("ui.draggable",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur()}catch(s){}},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n})),n?(a.isOver||(a.isOver=1,s._parent=i.helper.parent(),a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,h,l,u,c,d,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,_=i.offset.top,b=_+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)h=s.snapElements[d].left-s.margins.left,l=h+s.snapElements[d].width,u=s.snapElements[d].top-s.margins.top,c=u+s.snapElements[d].height,h-m>v||g>l+m||u-m>b||_>c+m||!e.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),a=m>=Math.abs(c-_),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-_),a=m>=Math.abs(c-b),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=n||a||o||r||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}}),e.ui.draggable});



//app code below this point
var map,
$list = $('#list'),
$map = $('#map'),
openPoints = [],
loc = {'lat':52.205575, 'lng':0.121682},
userLoc = {'lat':0, 'lng':0}, //52.2050683,0.1077597
getLocation = false,
centerOnLocation = false,
points = [],
listScroll = 0,
currView = 'small',
currWidth = 0,
loginWindow,
currentZoom = 14,
currentLoc = loc,
systemEvent = false,
spacesRequest = null,
totalSpaceCount = 0,
queryLimit = 35,
lastQuery = '',
exclude = {
    'exclusions':[],
    'total':0
},
mapOptions = {
    center: loc,
    zoom: 20,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
    }
},
oldView = undefined,
currViewHash = undefined,
templates = {
    list : {
        url : '/assets/templates/list-space.html',
        template : ''
    },
    mapSingle : {
        url : '/assets/templates/map-single-space.html',
        template : ''
    },
    mapMulti : {
        url : '/assets/templates/map-multi-space.html',
        template : ''
    },
    spaceDetail : {
        url : '/assets/templates/space-detail.html',
        template : ''
    },
    search : {
        url : '/assets/templates/search.html',
        template : ''
    },
    addTip : {
        url : '/assets/templates/add-tip.html',
        template : ''
    },
    addTag : {
        url : '/assets/templates/add-tag.html',
        template : ''
    },
    spaceTip : {
        url : '/assets/templates/space-tip.html',
        template : ''
    },
    login : {
        url : '/assets/templates/login.html',
        template : ''
    }
},
inactiveColor = 'rgba(0,0,0,1)',
activeColor = '#D6083B',
initialView = 'map',
cancelGeoLocation = false,
view = '',
mapViewed = false;
var markerSymbol = {
    path: 'M0-30.5c-5.7,0-10.2,4.6-10.2,10.2C-10.2-14.6,0,0,0,0s10.2-14.6,10.2-20.2C10.2-25.9,5.7-30.5,0-30.5z M0-17.7c-1.6,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S1.6-17.7,0-17.7z',
    fillColor: inactiveColor,
    fillOpacity: 1,
    scale: 1,
    strokeWeight: 0
};

var multiMarkerSymbol = {
    path: 'M0-28.5c-5.7,0-10.2,4.6-10.2,10.2C-10.2-12.6,0,0,0,0s10.2-12.6,10.2-18.2C10.2-23.9,5.7-28.5,0-28.5z M5.2-17.8h-4v4h-2.4v-4h-4v-2.4h4v-4h2.4v4h4V-17.8z',
    fillColor: inactiveColor,
    fillOpacity: 1,
    scale: 1,
    strokeWeight: 0
};
$().ready(function() {
    //alert($(body).hasClass('flexbox'));
    resetViews();

    $(window).on('initialLoadComplete', function(event) {
        event.preventDefault();
        $('.loading-cover .message').html('finalising');
        if($('.loading-cover').length > 0 && !!$('html').hasClass('flexbox')) {
            $('.loading-cover').addClass('loaded');
            window.setTimeout(function() {
                $('.loading-cover').remove();
            }, 500);
        } else {
            $('.loading-cover').html("<p>It appears you are using an outdated browser. If possible switch to a newer one as some things may not look as they should or are missing. To continue into the app please click below</p><p><a href=\"#\" id=\"old-continue\">Continue</a></p>")
            $('#old-continue').on('click', function(event) {
                event.preventDefault();
                $('.loading-cover').addClass('loaded').fadeOut(300, function() {
                    $(this).remove();
                });
            });
        }
    });

    if (!$('html').hasClass('flexbox')) {
        $('head').append('<link  rel="stylesheet" type="text/css" href="/assets/css/old.css" />');
    }
    var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    if(iOS !== null && $(window).width() > 1000){
        //alert('detected ios');
        $('.view-container').each(function() {
            var $this = $(this);
            $this.height($(window).height() - ($('#top-bar').outerHeight(true)));
            if($this.attr('id') == 'search') {
                $this.height($(window).height() - ($('#top-bar').outerHeight(true) + 60));
            }
        });
        $(window).on('scroll', function(event) {
            event.preventDefault();
            $('body').stop().animate({scrollTop: 0}, 10)
        });
    }
    $('#search-btn').on('click touchstart', function(event) {
        if(currView == 'large') {
            event.preventDefault();
            //console.log('search clicked');
            if($(this).hasClass('active')) {
                $('#search').hide(0);
                $(this).removeClass('active')
            } else {
                $('#search').show(0);
                $(this).addClass('active')
            }
            $(window).resize();
            $('div[id^=space-]').css({
                'left': $list.offset().left,
                'width': $list.width()
            });
            systemEvent = true;
            google.maps.event.trigger(map, 'resize')
        }
    });

    var startView = initialView;
    $(window).on('hashchange', function(Event) {
        //console.log('hashchange');
        if (Event.originalEvent.oldURL !== undefined) {
            oldView = Event.originalEvent.oldURL.split('#')[1];
        } else {
            if(currViewHash !== undefined) {
                oldView = currViewHash
            }
        }
        console.log(oldView);
        currViewHash = view = window.location.hash.substr(1);
        if(view.substr(0,1) != '/') {
            return false;
        } else if (view == '/') {
            window.location.hash = '/' + initialView;
        }
        view = view.substr(1);
        console.log('switch view - ' + view);
        switchView(view);
    });

    if(window.location.hash !== "" && initialView !== window.location.hash) {
        view = window.location.hash.substr(1);
        if(view.substr(0,1) != '/') {
            return false;
        }
        view = view.substr(1);
        startView = view;
    }
    $('.current-status').html('templates');
    loadTemplates({
        data: templates,
        callback: function() {
            $('.current-status').html('spaces');
            loadSpaces({
                //location:loc,
                callback:function() {
                    //$('.current-status').html('switch view');
                    switchView(startView);
                }
            });
            /*if ("geolocation" in navigator && !!getLocation && userLoc.lat == 0 && userLoc.lng == 0) {
            //console.log('get user location');
            $('.current-status').html('location');
            navigator.geolocation.getCurrentPosition(function(position) {
            if(cancelGeoLocation == false) {
            cancelGeoLocation = null;
            userLoc.lat = position.coords.latitude;
            userLoc.lng = position.coords.longitude;
            //set the center of the map on users current location
            $('.current-status').html('spaces');
            loadSpaces({
            location:userLoc,
            callback:function() {
            switchView(startView);
        }
    });
}

}, function () {
if(cancelGeoLocation == false) {
cancelGeoLocation = null;
getLocation = false;
$('.current-status').html('spaces');
loadSpaces({
location:loc,
callback:function() {
switchView(startView);
}
});
}
}, {
enableHighAccuracy: false,
timeout: 5000,
maximumAge: 0
});
window.setTimeout(function () {
if (cancelGeoLocation !== null) {
getLocation = false;
cancelGeoLocation = true;
$('.current-status').html('spaces');
loadSpaces({
location:loc,
callback:function() {
switchView(startView);
}
});
}

}, 8000)
} else {
$('.current-status').html('spaces');
loadSpaces({
location:loc,
callback:function() {
switchView(startView);
}
});
}*/
}
})
moment.locale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s",
        s:  "seconds",
        m:  "a minute",
        mm: "%d m",
        h:  "an hour",
        hh: "%d h",
        d:  "a day",
        dd: "%d d",
        M:  "a month",
        MM: "%d m",
        y:  "a year",
        yy: "%d y"
    }
});

$(window).on('resize orientationchange', resize);

$(window).trigger('resize');


$(window).on('login_success', function(event) {
    event.preventDefault();
    //console.log('login successful');
    $('.login-screen').fadeOut(300, function() {
        $(this).remove();
    });
});
});
function resize(event) {
    systemEvent = true;
    event.preventDefault();
    currWidth = $(window).width();
    $('div[id^=space-]').width($list.width()).css('left', $list.offset().left);
    if(currWidth < 1000 && currView !== 'small') {
        resizeForMobile();
        $(window).trigger('layout');
    } else if(currWidth > 1000 && currView !== 'large') {
        resizeForDesktop();
        $(window).trigger('layout');
    }
    if(map !== undefined && openPoints.length == 0) {

        if(!!centerOnLocation) {
            map.setCenter(userLoc);
        } else {
            map.setCenter(loc);
        }

    }
    var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    if(iOS !== null && currView == 'large'){
        $('.view-container').each(function() {
            var $this = $(this);
            //$this.height($(window).height() - ($('#top-bar').height()+ 60));
        });
    }
    $list.find('.list-meta').width($list.width());
}
function resizeForMobile() {
    currView = 'small';
    $('body').removeClass('large_view')
    $('#top-bar').find('a[href!="#/search"]').show(0);
    $('#search-btn').removeClass('active');
    $('div[id^=space-]').css({
        'left':0,
        'top':0,
        'width':'100%'
    });
}
function resizeForDesktop() {
    currView = 'large';
    $('body').addClass('large_view')
    $('#top-bar').find('> a[href!="#/search"]').hide(0);
    $('#map').show(0);
    $('#search-btn').addClass('active');
    $('#search').show();
    $('div[id^=space-]').css({
        'left':$list.offset().left,
        'top':0,
        'width':$list.width()
    });
    if(map !== undefined) {
        /*map.setZoom(14);
        if(openPoints.length > 0) {
        for (var i = 0; i < openPoints.length; i++) {
        points[openPoints[i]].mapSummary.close();
        points[openPoints[i]].marker.icon.fillColor = inactiveColor;
        points[openPoints[i]].marker.setMap(map);
        openPoints.splice(i, 1);
    }
}
if(!!centerOnLocation) {
map.setCenter(userLoc);
} else {
map.setCenter(loc);
}*/
}

}

function switchView(newView, modal) {

    if(oldView == '/list') {
        listScroll = Number($(window).scrollTop());
    }
    if(newView == undefined) newView = initialView;
    closeSpaces();
    if(currView == 'small') $('.view-container').css('position', '');
    if (typeof ga !== "undefined") {
        ga('set', 'page', '/' + newView);
        if (userDetails !== null && userDetails.id > 0) {
            ga('set', 'userId', userDetails.id);
        }
        ga('send', 'pageview');
    }
    if(newView.indexOf('/') == -1 && $('#' + newView).length > 0) {
        if(currView == 'small') {

            $('.view-container').css({'z-index':'0', 'max-height':'90%', 'overflow':'hidden'});
            $('a').removeClass('active');
            $('a[href="#/' + newView + '"]').addClass('active');
            $('.current-status').html('initial view');
            $('#' + newView).css({'z-index':'1', 'max-height':'', 'overflow':'auto'}).fadeIn({
                duration: 300,
                start:function () {

                    if (newView == 'map') {
                        systemEvent = true;
                        google.maps.event.trigger(map, 'resize');
                        $(window).scrollTop(0);

                    }
                    if(!mapViewed) {
                        mapViewed == true;
                        systemEvent = true;
                        if(!!centerOnLocation) {
                            map.setCenter(userLoc);
                        } else {
                            map.setCenter(loc);
                        }

                    }
                },
                progress : function() {
                    if (newView == 'list') {
                        systemEvent = true;
                        $(window).scrollTop(listScroll);
                        //map.setZoom(currentZoom);
                        //pointsInView();
                    }
                    if (newView == 'map') {
                        if(openPoints.length > 0) {
                            systemEvent = true;
                            new google.maps.event.trigger( points[openPoints[0]].marker, 'click' );
                            systemEvent = true;
                            //map.setZoom(currentZoom);
                            //pointsInView();
                        }
                    }
                }
            });
        }
    } else {

        if(newView.indexOf('space') !== -1) {
            if(currView == 'small') $('.view-container').css('position', 'fixed');
            var parts = newView.split('/');
            loadSpace({
                'id': parts[1],
                'name': parts[2].replace('-', ' ')
            })
        }
        //pointsInView();
    }



    /*if(!mapViewed) {
    mapViewed == true;
    if(!!centerOnLocation) {
    map.setCenter(userLoc);
} else {
map.setCenter(loc);
}
}*/
}


function loadSpace(options) {
    var defaults = {
    },
    space;
    $.extend(defaults, options);
    //see if we've already have it loaded
    space = findMarkers(points, {'id':defaults.id}).spaces;



    if(space.length == 1) {
        //we've got the space so show it
        showSpace(space[0]);
    } else if(space.length == 0){
        $.ajax({
            url: '/assets/data/unloaded-space.json',
            dataType: 'json',
            data: {id: defaults.id}
        })
        .done(function(data) {
            if($.type(data) == 'array') {
                data = data[0];
            }
            showSpace(data);


        })

        //load the space and show it;
    } else {
        //console.log('too many spaces with same ID returned');
    }

}

function showSpace(data) {
    var space = $('<div />')
    .css({'margin-top':$(window).height()})
    .attr('id', 'space-' + data.id)
    .addClass('space-container')
    .append(parseTemplate('spaceDetail', data))
    .insertAfter('#list')
    //.fadeIn(300)

    if(currView == 'large') {
        //$('#list').css('display', 'none');
        space.width($list.width()).css('left', $list.offset().left);
        space.animate({'margin-top': $('#top-bar').outerHeight(true)}, 300);
    } else {
        space.animate({'margin-top': 0}, 300, function() {
            space.find('.title').css('position', 'fixed');
            space.css('overflow', 'auto');
        });
    }
}

function closeSpaces() {
    var spaces = $('div[id^=space-]');
    spaces.css('overflow', 'hidden').find('.title').removeAttr('style');
    $('div[id^=space-]').animate({'margin-top' : $(window).height()}, 300, function() {
        $(this).remove();
        if(currView == 'large')$('#list').css('display', 'block');
    });

    if(openPoints.length > 0) {
        for (var i = 0; i < openPoints.length; i++) {
            if(points[openPoints[i]].mapSummary !== undefined) points[openPoints[i]].mapSummary.close();
            //points[openPoints[i]].marker.icon.fillColor = markerColor(points[openPoints[i]].space_type);
            points[openPoints[i]].marker.setZIndex(0);
            points[openPoints[i]].marker.setMap(map);
            openPoints.splice(i, 1);
        }
        for (var i = 0; i < points.length; i++) {
            points[i].marker.setOptions({'opacity': 1});
            points[i].marker.icon.fillColor = markerColor(points[i].space_type);
            points[i].marker.setMap(map);
        }
    }
    if (currView == 'large') {
        systemEvent = true;
        map.setZoom(currentZoom);
        systemEvent = true;
        map.setCenter(currentLoc);
    }

}

function resetViews() {
    systemEvent = true;
    mapOptions.center = currentLoc;
    mapOptions.zoom = currentZoom;
    $map.empty();
    //if (map == undefined || map == null) {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //}
    for (var i = 0; i < points.length; i++) {
        points[i].marker.setMap(null);
    }
    //points = []

    $('#list').html('');

    google.maps.event.addListener(map, 'center_changed', function(e) {
        if(!systemEvent && $('div[id^=space-]').length == 0) {
            //console.log('non system event fired - center');
            var newCenter = map.getCenter();
            currentLoc.lat = newCenter.lat();
            currentLoc.lng = newCenter.lng();
        }

        setTimeout(function() {
            systemEvent = false;
        }, 300);
    });
    google.maps.event.addListener(map, 'bounds_changed', function() {
        if(!systemEvent && $('div[id^=space-]').length == 0) {
            console.log('non system event fired - bounds');
            currentZoom = map.getZoom();
            var center = map.getCenter();

            window.setTimeout(function() {
                exclude = {
                    'exclusions':[],
                    'total':0
                }
                $('.search-button').trigger('click');
            }, 300);

            pointsInView();
        }
        setTimeout(function() {
            systemEvent = false;
        }, 300);

    });
}

function loadSpaces(options) {
    $('.current-status').html('load spaces');
    var defaults = {
        location:'',
        queryString:(typeof prepSearch == 'function'  ? prepSearch() : ''),
        reset:false,
        keepData:false,
        boundToMap:true,
        expanded:{
            'exclusions':[],
            'total':0
        }
    };
    $.extend(defaults, options);
    console.log('load spaces, exclude:' + defaults.expanded.exclusions.join(','));
    /*----load spaces-----*/
    $('#top-bar a[href*=map] i').removeClass('icon-marker').addClass('icon-loading');
    defaults.queryString += '&limit=' + queryLimit;
    /*if(defaults.location !== '') {
    defaults.queryString += '&filters[nearest]=' + defaults.location.lat + ',' + defaults.location.lng;
}*/
//defaults.queryString += '&filters[nearest]=' + userLoc.lat + ',' + userLoc.lng;
$('.current-status').html('reset');
//if(!defaults.keepData) resetViews();
$('.current-status').html('complete reset');
//$('.current-status').html(typeof map.getBounds);

if(!!defaults.boundToMap && typeof map !== 'undefined') {
    var bounds = map.getBounds();
    if (bounds !== undefined) {
        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();
        defaults.queryString += '&filters[bounds][sw]=' + sw.lat() + ',' + sw.lng();
        defaults.queryString += '&filters[bounds][ne]=' + ne.lat() + ',' + ne.lng();
    }

}

if (spacesRequest  && spacesRequest.readyState != 4) {
    console.log('abort request', spacesRequest);
    spacesRequest.abort();
}

if (typeof ga !== "undefined") {
    if (userDetails !== null && userDetails.id > 0) {
        ga('set', 'userId', userDetails.id);
    }
    var qs = defaults.queryString;
    try {
        if ($.type(defaults.queryString) == 'object') {
            qs = $.serialize(defaults.queryString);
        }
    } catch (e) {

    }
    ga('set', 'page', '/search?' + qs);
}
lastQuery = defaults.queryString;
spacesRequest = $.ajax(domain + 'spaces.json?callback=?', {
    cache:false,
    dataType:'json',
    contentType: "application/json; charset=utf-8",
    method:'GET',
    data:defaults.queryString
}).complete(function(event, xhr, settings) {
    if (xhr.readyState !== 4) {
        if(typeof(defaults.callback) == 'function') {
            defaults.callback();
        }
        $('#top-bar a[href*=map] i').addClass('icon-marker').removeClass('icon-loading');
    }

}).success(function(data, status, xhr) {
    if (!!defaults.clearSpaces) {
        for (var i = 0; i < points.length; i++) {
            points[i].marker.setMap(null);
        }
        //points = [];
        $list.html('');
        exclude = {
            'exclusions':[],
            'total':0
        }
    }
    console.log('success triggered', data, status, xhr);
    //$.getJSON('/assets/data/points.json').done(function(data) {
    console.log('spaces loaded', defaults.queryString, data.results.length);
    if (!!defaults.keepData) {
        var temp = points
        niceExclusions = [];

        for (var i = 0; i < exclude.exclusions.length; i++) {
            switch (exclude.exclusions[i]) {
                case "noise":
                niceExclusions.push('noise levels');
                break;
                case "atmosphere":
                niceExclusions.push('atmosphere filters');
                break;
                case "work":
                niceExclusions.push('work environments');
                break;
            }
        }

        for (var i = 0; i < data.results.length; i++) {
            data.results[i].excluded = niceExclusions;
        }
        points = cleanData(points.concat(data.results));
    } else {
        points = data.results;
    }

    distCount = 0;
    totalSpaceCount = data.total_count;
    if(typeof checkExpansions == 'function' && defaults.queryString.indexOf('page') == -1) {
        checkExpansions();
        expandSearch(defaults.expansionCount);

        if (defaults.expansionCount == undefined) {
            defaults.expansionCount = 0;
        }
        console.log('-----------------------------expanded:', defaults.expanded, exclude, defaults.expansionCount);
        if (points.length <= 0 && exclude.total > 0 && defaults.expansionCount <= exclude.total) {
            loadSpaces({
                "queryString": prepSearch(),
                "keepData":true,
                "expanded":exclude,
                "expansionCount": ++defaults.expansionCount
            })
        }
    }


    if(points.length == 0) {
        loadMap();
        loadList();


        return false;
    }

    if($('#near-me-btn').hasClass('active')) {
        console.log('get distance');
        $.each(points, function(key, value) {

            if(points[key].lat !== null && points[key].lng !== null) {
                getDistance(userLoc, {lat:Number(points[key].lat),lng:Number(points[key].lng)}, function(dist) {
                    points[key].distance = dist;
                    distCount++;
                    if (distCount == points.length) {
                        orderSpaces();
                        loadMap();
                        loadList();

                    }
                });
            } else {
                distCount++;
                if (distCount == points.length) {
                    orderSpaces();
                    loadMap();
                    loadList();
                }
            }
            points[key].link = '#/space/' + points[key].id + '/' + (points[key].name).replace(' ', '-');
        });
    } else {
        $.each(points, function(key, value) {
            points[key].link = '#/space/' + points[key].id + '/' + (points[key].name).replace(' ', '-');
        });
        if($('#search').html() == '') {
            loadSearch();

        }
        //orderSpaces();
        loadMap();
        loadList();
    }

});
}

function cleanData(data) {
    var foundIds =[],
    ret = [],
    allIds = [];
    console.log('clean data', data.sort(sortNumber), data.length);
    for (var i = 0; i < data.length; i++) {
        allIds.push(data[i].id);
        if(foundIds.indexOf(data[i].id) == -1) {
            ret.push(data[i]);
            foundIds.push(data[i].id);
        }
    }
    console.log('all ids', allIds.sort(sortNumber), allIds.length);
    console.log('cleaned data', ret.length);
    return ret;
}

function sortNumber(a,b) {
    return a - b;
}

function showLoginScreen(container, data) {
    var $con = $(container);
    var tData = {};
    $.extend(tData, data);

    $('<div />')
    .addClass('login-screen')
    .html(parseTemplate('login', tData))
    .appendTo($con);
    $($con.parents('div')[$con.parents('div').length - 1]).scrollTop(0);

}

function loadSearch() {
    $.ajax(domain + 'spaces/filters.json?callback=?', {
        cache:false,
        dataType:'json',
        method:'GET'
    })
    .done(function(data) {
        //console.log('loaded search');
        $('#search').append(parseTemplate('search', data));
    })
}

function checkMarker(data, checks) {
    var match = true;
    $.each(checks, function(key, val) {
        if(data[key] != val) {
            match = false;
            return false;
        }
    });
    return match;
}
function findMarkers(data, checks) {
    var ret = {spaces:[]};
    $.each( data, function( key ) {
        if(checkMarker(data[key], checks)) {
            data[key]._jsid = key;
            ret.spaces.push(data[key]);
        }
    });
    if(ret.spaces.length > 1) {
        ret.lat = ret.spaces[0].lat;
        ret.lng = ret.spaces[0].lng;
        if(ret.spaces[0].library !== "") {
            ret.name = ret.spaces[0].library;
        } else {
            ret.name = ret.spaces[0].address;
        }
    }

    return ret
}
/*---------- map --------------*/
function loadMap(options) {
    $('.current-status').html('map');
    var defaults = {
        inactiveColor:inactiveColor,
        activeColor:activeColor
    };
    $.extend(defaults, options);


    $.each( points, function( key ) {
        if(points[key].marker !== undefined) return true;
        console.log('add new point');
        if(points[key].lat == null || points[key].lng == null) {
            return true;
        }

        if($.type(points[key].lat) == 'string') {
            points[key].lat = Number(points[key].lat);
        }
        if($.type(points[key].lng) == 'string') {
            points[key].lng = Number(points[key].lng);
        }
        var markers = findMarkers(points, {'lat':points[key].lat, 'lng':points[key].lng}),
        isMultiMarker = markers.spaces.length > 1 ? true : false;

        var marker = new google.maps.Marker({
            position: {'lat':Number(points[key].lat),'lng':Number(points[key].lng)},
            icon: (isMultiMarker ? multiMarkerSymbol : markerSymbol),
            //animation: google.maps.Animation.DROP
        });

        marker.icon.fillColor = markerColor(points[key].space_type);

        for (var i = 0; i < markers.spaces.length; i++) {
            points[markers.spaces[i]._jsid].marker = marker;
        }
        points[key].marker = marker;
        var contentString;

        if(isMultiMarker) {
            points[key].spaces = markers.spaces;
            points[key].template = 'mapMulti';
            contentString = parseTemplate('mapMulti', points[key]);
        } else {
            points[key].template = 'mapSingle';
            contentString = parseTemplate('mapSingle', points[key]);
        }

        var infowindow = new InfoBubble({
            content: contentString,
            shadowStyle: 0,
            padding: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderRadius: 0,
            arrowSize: 10,
            borderWidth: 0,
            //borderColor: '#2c2c2c',
            padding: 12,
            disableAutoPan: false,
            hideCloseButton: false,
            //maxWidth:($(window).width() * 0.9),
            //maxHeight:($(window).height() * 0.6),
            //arrowPosition: 50,
            backgroundClassName: 'map-info-bubble',
            disableAnimation: true,
            arrowStyle: 0
        });
        points[key].mapSummary = infowindow;

        marker.setMap(map);

        google.maps.event.addListener(marker, 'click', function() {
            systemEvent = true;
            if(openPoints.length > 0) {
                for (var i = 0; i < openPoints.length; i++) {
                    points[openPoints[i]].mapSummary.close();
                    points[openPoints[i]].marker.icon.fillColor = markerColor(points[openPoints[i]].space_type);
                    points[openPoints[i]].marker.setZIndex(0);
                    points[openPoints[i]].marker.setMap(map);
                    openPoints.splice(i, 1);
                }
            }
            if($('#bubble-' + points[key].id).length == 0) {
                setTimeout(function() {
                    systemEvent = true;
                    var parent = $('#bubble-' + points[key].id).parent();
                    $('#bubble-' + points[key].id).remove();
                    parent.parents('.infoBubble').css('width', $('#map').width() * 0.8);
                    points[key].mapSummary.open();
                    $(parent).append(parseTemplate(points[key].template, points[key]));
                    parent.parents('.infoBubble').css('width', $('#map').width() * 0.8);
                }, 100);
            } else {
                var parent = $('#bubble-' + points[key].id).parent();
                parent.parents('.infoBubble').css('width', $('#map').width() * 0.8);
            }



            infowindow.open(map,marker);
            //this.icon.fillColor = defaults.activeColor;
            this.setZIndex(100);
            this.setMap(map);
            openPoints.push(key);
        });
        google.maps.event.addListener(infowindow,'closeclick',function(){
            marker.icon.fillColor = markerColor(points[key].space_type);
            marker.setZIndex(0);
            marker.setMap(map);
            openPoints = [];
        });
    });
    if(openPoints.length == 1) {
        //points[openPoints[0]].marker.icon.fillColor = activeColor;
    }
    $map.find('.map-meta').remove();
    if (currView == 'small') {
        $map.prepend(
            $('<div class="map-meta" />').append('<span class="spaces-count">' + pointsInView().length + '/' + totalSpaceCount + '</span>')
        );
        if (pointsInView().length < totalSpaceCount) {
            console.info($map.find('.map-meta'))
            $map.find('.map-meta').append(
                $('<a href="#" class="map-load-spaces-link">Load ' + ((totalSpaceCount - pointsInView().length) > queryLimit ? queryLimit : totalSpaceCount - pointsInView().length) + ' more</a>').on('click', function(event) {
                    $(this).html('<i class="icon-loading"></i>');
                    event.preventDefault();
                    console.log('pages = ', Math.ceil(totalSpaceCount/queryLimit));
                    console.log('current page = ', Math.floor(pointsInView().length/queryLimit));
                    if($.type(prepSearch) == 'function') {
                        var search = prepSearch();
                        search += '&page=' + Math.floor(pointsInView().length/queryLimit + 1);
                        console.log(search);
                        loadSpaces(
                            {
                                queryString: search,
                                keepData: true,
                                "reset": true
                            }
                        )
                    }
                })
            );
        }
    }

    if(typeof(defaults.callback) == 'function') {
        defaults.callback();
    }
}

function markerColor(space_type) {
    switch (String(space_type).toLowerCase()) {
        case 'bar':
        case 'café':
        case 'restaurant':
        return '#EA7125';
        break;
        case 'lab':
        case 'lecture room':
        case 'library space':
        case 'meeting room':
        case 'seminar room':
        return '#00B1C1';
        break;
        default:
        return '#666666';
    }
}

function loadList(options) {
    $('.current-status').html('list');
    var defaults = {
        inactiveColor:'rgba(0,0,0,0.6)',
        activeColor:'#e2637c'
    };
    $.extend(defaults, options);
    $list.removeClass('no-spaces');
    if(points.length == 0) {
        //$list.empty();
        $list.find('.empty-list').remove();
        $list.addClass('no-spaces');
        //$list.append($('<div />').html('There are no spaces to show with the current search criteria.').addClass('empty-list'));

        return true;
    }
    $.each( points, function( key ) {
        //check if space already exists, if not add it
        if ($list.find('[data-id=' + points[key].id + ']').length == 0) {
            console.log(key);
            var space = parseTemplate('list', points[key]);
            $list.append(space);
        }

    });
    $('.more-spaces-link').remove();

    $('.list-footer').remove();
    if (currView == "small") {
        $list.append('<div class="list-footer"><span>&copy; <span class="year"></span> Cambridge University Library </span><a href="/terms.html">Terms &amp; Feedback</a></div>');
        var d = new Date();
        var n = d.getFullYear();
        $('.list-footer .year').html(n);
    }


    $('.list-space>h2>.library').each(function(index, el) {
        var $address = $(this).next('.address');
        if($(this).html() == "")  {
            if($address.length > 0 && $address.html() !== '') {
                $address.removeClass('hidden').html($address.html().split(/\r\n|\r|\n|,/g)[0]);
                $(this).remove();
            }
        } else {
            $address.remove();
        }
    });
    $('.list-space').each(function () {
        var desc = $(this).find('.description').html();
        if($(this).find('.exclude-array').html() == '') {
            $(this).find('.excluded-search').remove();
        } else if ($(this).find('.exclude-array').length > 0 && $(this).attr('data-expanded') == undefined) {
            var str = '' + $(this).find('.excluded-value:last').html();
            if (str !== '') {
                str = str.substring(0, str.length - 1);
                $(this).find('.excluded-value:last').html(str);
            }
            $(this).attr('data-expanded', $(this).find('.excluded-value').length);
        }

        //console.log(desc);
        //$(this).find('.description').html(desc.substr(0, desc.lastIndexOf(' ')) + '...');
        $(this).hover(function(event) {
            event.preventDefault();
            event.stopPropagation();
            if(!$(this).hasClass('hover')) {
                $(this).addClass('hover')
                var space = findMarkers(points, {'id':$(this).data('id')}).spaces[0];
                if (currView !== 'small') {
                    for (var i = 0; i < points.length; i++) {
                        points[i].marker.setOptions({'opacity': 0.0});
                        points[i].marker.setMap(map);
                    }
                }

                if(space.marker !== undefined && space.marker.icon !== undefined) {
                    //space.marker.icon.fillColor = activeColor;
                    space.marker.setOptions({'opacity': 1});
                    space.marker.setZIndex(10000);
                    space.marker.setMap(map);
                }
            }

            /* Act on the event */
        }, function(event) {
            event.preventDefault();
            event.stopPropagation();
            if(!!$(this).hasClass('hover')) {
                $(this).removeClass('hover')
                var space = findMarkers(points, {'id':$(this).data('id')}).spaces[0];
                if(!$(this).hasClass('clicked')) {
                    for (var i = 0; i < points.length; i++) {
                        points[i].marker.setOptions({'opacity': 1});
                        points[i].marker.setMap(map);
                    }
                    if(space.marker !== undefined && space.marker.icon !== undefined) {
                        space.marker.icon.fillColor = markerColor(space.space_type);
                        space.marker.setOptions({'opacity': 1});
                        space.marker.setZIndex(0);
                        space.marker.setMap(map);
                    }
                }

            }
        }).on('click', function(event) {
            event.preventDefault();
            $this = $(this);
            $this.addClass('clicked')
            setTimeout(function() {
                $this.removeClass('clicked');
            }, 400);
            $this.trigger('mouseout')
            window.location.hash = $(this).data('link');
            /* Act on the event */
        });;
    })
    for (var i = 0; i < exclude.total; i++) {
        console.log('add title', i, $list.find('.list-space[data-expanded="' + (i+1) + '"]:first'));
        if ($list.find('.list-space[data-expanded="' + (i+1) + '"]:first').prev('div').is('.extended-description')) {
            continue;
        }
        $list.find('.list-space[data-expanded="' + (i+1) + '"]:first').before('<div class="extended-description"><b>Your search criteria returned no exact matches.</b> <br /> Below are spaces not including: ' + $list.find('.list-space[data-expanded="' + (i+1) + '"]:first').find('.exclude-array').html() + '</div>');
        var str = "" + $list.find('.extended-description:last').html();
        var ax=str.lastIndexOf(',');
        if(ax!=-1 ){
            str = str.substring(0,ax)+' or '+ str.substring(ax+1);
        }
        $list.find('.extended-description:last').html(str);
    }
    //$list.find('.exclude-array:first')
    pointsInView();
    $list.find('.list-meta').remove();
    $list.prepend(
        $('<div class="list-meta" />').append('<span class="spaces-count">Showing ' + pointsInView().length + ' of ' + totalSpaceCount + ' results.</span>')
    );
    if (pointsInView().length < totalSpaceCount) {
        $list.find('.list-meta').append(
            $('<a href="#" class="more-spaces-link">Load ' + ((totalSpaceCount - pointsInView().length) > queryLimit ? queryLimit : totalSpaceCount - pointsInView().length) + ' more</a>').on('click', function(event) {
                $(this).html('<i class="icon-loading"></i>');
                event.preventDefault();
                console.log('pages = ', Math.ceil(totalSpaceCount/queryLimit));
                console.log('current page = ', Math.floor(pointsInView().length/queryLimit));
                if($.type(prepSearch) == 'function') {
                    var search = lastQuery;
                    search += '&page=' + Math.floor(pointsInView().length/queryLimit + 1);
                    console.log(search);
                    loadSpaces(
                        {
                            queryString: search,
                            keepData: true,
                            expanded: exclude
                            //clearSpaces:true
                        }
                    )
                }
            })
        );
    }
    $list.find('.list-meta').width($list.width());
    if(typeof(defaults.callback) == 'function') {
        defaults.callback();
    }
}

function loadTemplates(options) {
    var defaults = {},
    loadCount = 0;
    $.extend(defaults, options);

    $.each(templates, function(key) {
        loadCount++;
        $.ajax({
            url: templates[key].url,
            dataType: 'html'
        })
        .done(function(d) {
            templates[key].template = d;
            loadCount--;
        });
    });
    var check = setInterval(function () {
        if(typeof(defaults.callback) == 'function' && loadCount <= 0) {
            clearInterval(check)
            defaults.callback();
        }
    }, 10)

}

function parseTemplate(t, data, partial) {
    if(t == undefined) {
        return false;
    }

    var r = new RegExp('(#{.*\\[.*\\].*})', "g"),
    arrays,
    template,
    matches,
    limit = null,
    icon = null,
    attr = null,
    raw = null,
    transform = null;

    if(partial == true) {
        template = t;
    } else {
        template = templates[t].template;
    }

    arrays = template.match(r);
    if(arrays !== null) {
        for (var i = 0; i < arrays.length; i++) {
            var r = new RegExp('(#{(.*)\\[(.*)\\](.*?)})', "g");
            var match = r.exec(arrays[i]);

            if (match !== null && match !== match[4] !== undefined) {
                limit = match[4].match(/.*limit="(.*)".*/);
                if(limit !== null) {
                    limit = Number(limit[1]);
                } else {
                    limit = null;
                }
            }

            if(match !== null && match[2] !== undefined) {
                var str = convertToValue(match[3], data[match[2]], {"limit":limit, "icon":icon, "attr":attr});
                template = template.replace(match[1], str);
            }

        }
    }
    r = new RegExp('(#{(.*?)})', "g")
    matches = template.match(r);
    if (matches !== null) {
        for (var i = 0; i < matches.length; i++) {
            limit = matches[i].match(/.*limit="(.*?)".*/);
            value = matches[i].match(/.*value="(.*?)".*/);
            attr = matches[i].match(/.*attr="(.*?)".*/);
            transform = matches[i].match(/.*transform="(.*?)".*/);
            icon = matches[i].match(/.*icon.*/);
            raw = matches[i].match(/.*raw.*/);
            if(icon !== null) {
                icon = true;
            }
            if(raw !== null) {
                raw = true;
            }
            if(limit !== null) {
                limit = Number(limit[1]);
            }
            if(attr !== null) {
                attr = attr[1];
            }
            if(transform !== null) {
                transform = transform[1];
            }
            if(value !== null) {
                value = value[1];
            }
            var key = ''
            if (limit !== null || icon !== null || attr !== null || value !== null || raw !== null) {
                key = matches[i].match(/#{(.*)\(.*}/);
            } else {
                key = matches[i].match(/#{(.*)}/);
            }
            var str = convertToValue(matches[i], data[key[1]], {"limit":limit, "icon":icon, "attr":attr, "value":value, "raw":raw, "transform":transform});
            template = template.replace(matches[i],str);

        }
    }


    return template;
}


function convertToValue(t, data, options) {
    if($.type(data) == 'array') {
        var temp = '';
        for (var i = 0; i < data.length; i++) {
            var str = t;
            if($.type(data[i]) == 'object' || $.type(data[i]) == 'array') {
                if(!!options.raw) {
                    str = data[i];
                } else {
                    str = parseTemplate(t, data[i], true);
                }

            } else {
                var searchIconMap = searchArray(iconMap, data[i]);
                if(searchIconMap !== -1) {
                    str = str.replace(/#{value}/g, iconMap[searchIconMap][1]);
                    str = str.replace(/#{attr}/g, iconMap[searchIconMap][0].replace(/ /g, '-'));
                    str = str.replace(/#{icon}/g, iconMap[searchIconMap][2]);
                } else {
                    str = str.replace(/#{value}/g, data[i].replace(/(.*?)/, ''));
                    str = str.replace(/#{attr}/g, data[i]);
                }
            }
            temp += str;
            if (options.limit !== null && i >= (options.limit - 1) ) {
                break;
            }
        }

        return temp;

    } else if($.type(data) == 'object') {
        var temp = t;
        if(!!options.raw) {
            //console.log(data);
            return JSON.stringify(data);
        }
        if(options.value !== null) {
            if (options.limit !== null) {
                temp = data[options.value].substr(0, options.limit);
            } else {
                temp = data[options.value];
            }
        } else {
            $.each(data, function(key, value) {
                if (options.limit !== null) {
                    temp = temp.replace('/#{' + key +'.*}/g', String(value).substr(0, options.limit));
                } else {
                    temp = temp.replace('/#{' + key +'.*}/g', value);
                }

            });
        }

        return temp;
    } else {
        if (data !== undefined && data !== null && data !== 'null') {
            if (options.limit !== null) {
                data = String(data).substr(0, options.limit)
            }
            if (options.attr !== null) {
                data = String(data).replace(' ', options.attr)
            }
            if (options.transform == 'lowercase') {
                data = String(data).toLowerCase();
            }
            if (options.transform == 'uppercase') {
                data = String(data).toUpperCase();
            }
            if (!!options.icon) {
                var searchIconMap = searchArray(iconMap, data);
                if(searchIconMap !== -1) {
                    data = iconMap[searchIconMap][2];
                }
            }
            return data;
        }
        return '';
    }

}

function searchArray(haystack, needle) {
    var ret = -1;
    for (var i = 0; i < haystack.length; i++) {
        if($.type(haystack[i]) == 'array') {
            for (var j = 0; j < haystack[i].length; j++) {
                if(haystack[i][j] == needle) {
                    ret = i;
                    break;
                }
            }
            if(ret !== -1) break;
        } else {
            if(haystack[i] == needle) {
                ret = i;
                break;
            }
        }
    }
    return ret;
}

function getDistance(origin, dest, callback) {
    //console.log('get distance()');
    var service = new google.maps.DistanceMatrixService();
    if($.type(origin) !== 'array') {
        var temp = [];
        temp.push(origin);
        origin = temp;
    }
    if($.type(dest) !== 'array') {
        var temp = [];
        temp.push(dest);
        dest = temp;
    }
    service.getDistanceMatrix({
        origins: origin,
        destinations: dest,
        unitSystem:google.maps.UnitSystem.IMPERIAL,
        travelMode: google.maps.TravelMode.WALKING
    }, function (response, status) {
        if(status == "OK") {
            if($.type(callback) == 'function') {
                if (response.rows[0].elements[0].distance !== undefined) {
                    callback(response.rows[0].elements[0].distance.text);
                } else {
                    callback();
                }

            }
        } else {
            return '';
        }

    });
}

function loginCallback(response) {
    //console.log('login callback success');
    //console.log(response);
    if(response.status == 'success') {
        if($.type(response) == 'object') {
            userDetails = response;
        }
        $(window).trigger('login_callback');
    }


}

function orderSpaces() {
    points.sort(function(a, b) {
        aNum = parseFloat(a.distance);
        bNum = parseFloat(b.distance);
        ////console.log(parseFloat(a.distance), parseFloat(b.distance));
        if(a.distance == undefined) return 1;
        if(b.distance == undefined) return -1;

        if(a.distance.indexOf('ft') !== -1) {
            aNum = Number("0.0" + parseFloat(a.distance));
        }
        if(b.distance.indexOf('ft') !== -1) {
            bNum = Number("0.0" + parseFloat(b.distance));
        }
        //check if we have one in feet and one in miles - return feet
        //console.log(a.distance.indexOf('ft'), b.distance.indexOf('ft'));

        if (aNum > bNum) {
            return 1;
        } else if (aNum < bNum) {
            return -1;
        } else {
            return 0;
        }
        //else compare the number from both as they will be the same unit of measurement


    });
}

function pointsInView() {
    if(map == undefined) return [];
    var mapHidden = false;
    var mapBounds = map.getBounds(),
    ret = [],
    ne = mapBounds.getNorthEast(),
    sw = mapBounds.getSouthWest(),
    bounds = [
        new google.maps.LatLng(ne.lat(), sw.lng()),
        new google.maps.LatLng(ne.lat(), ne.lng()),
        new google.maps.LatLng(sw.lat(), ne.lng()),
        new google.maps.LatLng(sw.lat(), sw.lng())
    ];
    console.log(mapBounds);
    /*//console.log(mapBounds.Ia.G, mapBounds.Ca.G);
    //console.log(mapBounds.Ia.j, mapBounds.Ca.G)
    //console.log(mapBounds.Ia.j, mapBounds.Ca.j)
    //console.log(mapBounds.Ia.G, mapBounds.Ca.j)*/
    var poly =  new google.maps.Polygon({
        paths: bounds,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    //poly.setMap(map);

    for (var i = 0; i < points.length; i++) {
        ////console.log(points[i].lat, points[i].lng);
        if(points[i].lat !== null || points[i].lng !== null) {
            var latlng = new google.maps.LatLng(points[i].lat, points[i].lng);
            ////console.log(latlng);
            var contains = google.maps.geometry.poly.containsLocation(latlng, poly);
            if (!!contains) {
                $list.find('[data-id=' + points[i].id + ']').slideDown(300);
                ret.push(points[i]);
            } else {
                $list.find('[data-id=' + points[i].id + ']').slideUp(300);
            }
        }

    }
    console.log('points in view', ret);
    if (ret.length > 0 && $('.loading-cover').length > 0) {
        $(window).trigger('initialLoadComplete')
    }
    return ret;
}

function lineDistance( point1, point2 )
{
  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt( xs + ys );
}
