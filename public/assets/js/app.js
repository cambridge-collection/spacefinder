/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-flexbox-cssclasses-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(prefixes.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b){for(var d in a){var e=a[d];if(!A(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}function D(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return z(b,"string")||z(b,"undefined")?B(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),C(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.flexbox=function(){return D("flexWrap")};for(var E in p)w(p,E)&&(u=E.toLowerCase(),e[u]=p[E](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,e._version=d,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return B([a])},e.testAllProps=D,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+s.join(" "):""),e}(this,this.document);

//app code below this point
var map,
$list = $('#list'),
openPoints = [],
loc = {'lat':52.205575, 'lng':0.121682},
userLoc = {'lat':0, 'lng':0}, //52.2050683,0.1077597
userDetails = null,
getLocation = true,
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
queryLimit = 9999,
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
activeColor = '#00b1c1',
initialView = 'map',
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

    loadTemplates({
        data: templates,
        callback: function() {
            if ("geolocation" in navigator && !!getLocation && userLoc.lat == 0 && userLoc.lng == 0) {
                //console.log('get user location');
                navigator.geolocation.getCurrentPosition(function(position) {
                    userLoc.lat = position.coords.latitude;
                    userLoc.lng = position.coords.longitude;
                    //set the center of the map on users current location

                    loadSpaces({
                        callback:function() {
                            switchView(startView);
                        }
                    });
                }, function () {
                    getLocation = false;
                    loadSpaces({
                        callback:function() {
                            switchView(startView);
                        }
                    });
                }, {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0
                });
            } else {
                loadSpaces({
                    callback:function() {
                        switchView(startView);
                    }
                });
            }
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
    //console.log('new view = ' + newView);
    if(newView.indexOf('/') == -1 && $('#' + newView).length > 0) {
        if(currView == 'small') {
            console.log(newView);
            $('.view-container').css('display', 'none');
            $('a').removeClass('active');
            $('a[href="#/' + newView + '"]').addClass('active');

            $('#' + newView).fadeIn({
                duration: 300,
                start:function () {

                    if (newView == 'map') {
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
                        $(window).scrollTop(listScroll);
                    }
                    if (newView == 'map') {
                        if(openPoints.length > 0) {
                            new google.maps.event.trigger( points[openPoints[0]].marker, 'click' );
                            systemEvent = true;
                            map.setZoom(currentZoom);
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
    }
    if($('.loading-cover').length > 0 && !!$('html').hasClass('flexbox')) {
        $('.loading-cover').addClass('loaded').delay(500).fadeOut(300, function() {
            $(this).remove();
        });
    } else {
        $('.loading-cover').html("<p>It appears you are using an outdated browser. If possible switch to a newer one as some things may not look as they should or are missing. To continue into the app please click below</p><p><a href=\"#\" id=\"old-continue\">Continue</a></p>")
        $('#old-continue').on('click', function(event) {
            event.preventDefault();
            $('.loading-cover').addClass('loaded').fadeOut(300, function() {
                $(this).remove();
            });
        });
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
            points[openPoints[i]].marker.icon.fillColor = inactiveColor;
            points[openPoints[i]].marker.setMap(map);
            openPoints.splice(i, 1);
        }
    }

    systemEvent = true;
    map.setZoom(currentZoom);
    systemEvent = true;
    map.setCenter(currentLoc);
}

function resetViews() {
    mapOptions.center = currentLoc;
    mapOptions.zoom = currentZoom;
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $('#list').html('');

    google.maps.event.addListener(map, 'center_changed', function(e) {
        if(!systemEvent && $('div[id^=space-]').length == 0) {
            //console.log('non system event fired - center');
            var newCenter = map.getCenter();
            currentLoc.lat = newCenter.G;
            currentLoc.lng = newCenter.K;
        }

        setTimeout(function() {
            systemEvent = false;
        }, 300);
    });
    google.maps.event.addListener(map, 'bounds_changed', function() {
        if(!systemEvent && $('div[id^=space-]').length == 0) {
            //console.log('non system event fired - bounds');
            currentZoom = map.getZoom();
            pointsInView();
        }
        setTimeout(function() {
            systemEvent = false;
        }, 300);

    });
}

function loadSpaces(options) {
    var defaults = {
        queryString:'',
        reset:false,
        keepData:false
    };
    $.extend(defaults, options);
    /*----load spaces-----*/

    defaults.queryString += '&limit=' + queryLimit;

    if(!defaults.keepData) resetViews();

    if (spacesRequest  && spacesRequest.readyState != 4) {
        console.log('abort request');
        spacesRequest.abort();
    }
    spacesRequest = $.ajax('https://uoc-spacefinder.herokuapp.com/spaces.json?callback=?', {
        cache:false,
        dataType:'json',
        method:'GET',
        data:defaults.queryString
    }).done(function(data) {
        //$.getJSON('/assets/data/points.json').done(function(data) {
        if (!!defaults.keepData) {
            points = cleanData(points.concat(data.results))
        } else {
            points = data.results;
        }

        distCount = 0;

        totalSpaceCount = data.total_count;

        if(points.length == 0) {
            loadMap();
            loadList();

            if(typeof(defaults.callback) == 'function') {
                defaults.callback();
            }
            return false;
        }

        if(!!getLocation) {
            //console.log('get distance');
            $.each(points, function(key, value) {

                if(points[key].lat !== null && points[key].lng !== null) {
                    getDistance(userLoc, {lat:Number(points[key].lat),lng:Number(points[key].lng)}, function(dist) {
                        points[key].distance = dist;
                        distCount++;
                        if (distCount == points.length) {
                            if(!defaults.reset) {
                                loadSearch();

                            }
                            orderSpaces();
                            loadMap();
                            loadList();

                            if(typeof(defaults.callback) == 'function') {
                                defaults.callback();
                            }
                        }
                    });
                } else {
                    distCount++;
                    if (distCount == points.length) {
                        if(!defaults.reset) {
                            loadSearch();

                        }
                        orderSpaces();
                        loadMap();
                        loadList();
                        if(typeof(defaults.callback) == 'function') {
                            defaults.callback();
                        }
                    }
                }
                points[key].link = '#/space/' + points[key].id + '/' + (points[key].name).replace(' ', '-');
            });
        } else {
            $.each(points, function(key, value) {
                points[key].link = '#/space/' + points[key].id + '/' + (points[key].name).replace(' ', '-');
            });
            if(!defaults.reset) {
                loadSearch();

            }
            orderSpaces();
            loadMap();
            loadList();
            if(typeof(defaults.callback) == 'function') {
                defaults.callback();
            }
        }

    });
}

function cleanData(data) {
    var foundIds =[],
        ret = [];

    for (var i = 0; i < data.length; i++) {
        if(foundIds.indexOf(data[i].id) == -1) {
            ret.push(data[i]);
            foundIds.push(data[i].id);
        }
    }

    return ret;
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
    $.ajax('https://uoc-spacefinder.herokuapp.com/spaces/filters.json?callback=?', {
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
            icon: (isMultiMarker ? multiMarkerSymbol : markerSymbol)
        });
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
                    points[openPoints[i]].marker.icon.fillColor = inactiveColor;
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
            this.icon.fillColor = defaults.activeColor;
            this.setMap(map);
            openPoints.push(key);
        });
        google.maps.event.addListener(infowindow,'closeclick',function(){
            marker.icon.fillColor = defaults.inactiveColor;
            marker.setMap(map);
            openPoints = [];
        });
    });
    if(typeof(defaults.callback) == 'function') {
        defaults.callback();
    }
}

function loadList(options) {
    var defaults = {
        inactiveColor:'rgba(0,0,0,0.6)',
        activeColor:'#e2637c'
    };
    $.extend(defaults, options);
    if(points.length == 0) {
        $list.append($('<div />').html('There are no spaces to show with the current search criteria.').addClass('empty-list'));

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
    if (points.length !== totalSpaceCount) {
        $list.append(
            $('<a href="#">Load more spaces</a>').on('click', function(event) {
                event.preventDefault();
                console.log('pages = ', Math.ceil(totalSpaceCount/queryLimit));
                console.log('current page = ', points.length/queryLimit);
                if($.type(prepSearch) == 'function') {
                    var search = prepSearch();
                    search += '&page=' + (points.length/queryLimit + 1);
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
        //console.log(desc);
        //$(this).find('.description').html(desc.substr(0, desc.lastIndexOf(' ')) + '...');
        $(this).hover(function(event) {
            event.preventDefault();
            event.stopPropagation();
            if(!$(this).hasClass('hover')) {
                $(this).addClass('hover')
                var space = findMarkers(points, {'id':$(this).data('id')}).spaces[0];
                if(space.marker !== undefined && space.marker.icon !== undefined) {
                    space.marker.icon.fillColor = activeColor;
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
                    if(space.marker !== undefined && space.marker.icon !== undefined) {
                        space.marker.icon.fillColor = inactiveColor;
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
    raw = null;

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
            limit = matches[i].match(/.*\(.*limit="(.*)".*/);
            value = matches[i].match(/.*\(.*value="(.*)".*/);
            attr = matches[i].match(/.*\(.*attr="(.*)".*/);
            icon = matches[i].match(/.*\(.*icon.*/);
            raw = matches[i].match(/.*\(.*raw.*/);
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
            if(value !== null) {
                value = value[1];
            }
            var key = ''
            if (limit !== null || icon !== null || attr !== null || value !== null || raw !== null) {
                key = matches[i].match(/#{(.*)\(.*}/);
            } else {
                key = matches[i].match(/#{(.*)}/);
            }
            var str = convertToValue(matches[i], data[key[1]], {"limit":limit, "icon":icon, "attr":attr, "value":value, "raw":raw});
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
    var mapBounds = map.getBounds(),
    bounds = [
        new google.maps.LatLng(mapBounds.Ia.G, mapBounds.Ca.G),
        new google.maps.LatLng(mapBounds.Ia.j, mapBounds.Ca.G),
        new google.maps.LatLng(mapBounds.Ia.j, mapBounds.Ca.j),
        new google.maps.LatLng(mapBounds.Ia.G, mapBounds.Ca.j)
    ];

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
            } else {
                $list.find('[data-id=' + points[i].id + ']').slideUp(300);
            }
        }

    }
}
