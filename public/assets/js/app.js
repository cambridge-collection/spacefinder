var map,
$list = $('#list'),
openPoints = [],
loc = {'lat':52.205575, 'lng':0.121682},
userLoc = {'lat':0, 'lng':0}
getLocation = true,
centerOnLocation = false,
points = [],
listScroll = 0,
mapOptions = {
    center: loc,
    zoom: 14,
    disableDefaultUI: true
},
oldView = undefined,
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
    }
},
inactiveColor = 'rgba(0,0,0,0.6)',
activeColor = '#E37222',
initialView = 'map',
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
    var startView = initialView;
    $(window).on('hashchange', function(Event) {
        oldView = Event.originalEvent.oldURL.split('#')[1];
        var view = window.location.hash.substr(1);
        if(view.substr(0,1) != '/') {
            return false;
        } else if (view == '/') {
            window.location.hash = '/' + initialView;
        }
        view = view.substr(1);
        switchView(view);
    });

    if(window.location.hash !== "" && initialView !== window.location.hash) {
        var view = window.location.hash.substr(1);
        if(view.substr(0,1) != '/') {
            return false;
        }
        view = view.substr(1);
        startView = view;
    }

    loadTemplates({
        data: templates,
        callback: function() {
            if ("geolocation" in navigator && !!getLocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    userLoc.lat = position.coords.latitude;
                    userLoc.lng = position.coords.longitude;
                    //set the center of the map on users current location
                    if(!!centerOnLocation) {
                        map.setCenter(userLoc);
                    }
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

});


function switchView(newView, modal) {
    if(oldView == '/list') {
        listScroll = Number($(window).scrollTop());
        console.log(listScroll);
    }
    if(newView == undefined) newView = initialView;
    closeSpaces();
    if(newView.indexOf('/') == -1 && $('#' + newView).length > 0) {
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
                    if(!!centerOnLocation) {
                        map.setCenter(userLoc);
                    } else {
                        map.setCenter(loc);
                    }

                }
            },
            progress : function() {
                if (newView == 'list') {
                    console.log('scroll to ', listScroll);
                    $(window).scrollTop(listScroll);
                }
                if (newView == 'map') {
                    if(openPoints.length > 0) {
                        new google.maps.event.trigger( points[openPoints[0]].marker, 'click' );
                    }
                }
            }
        });
    } else {
        if(newView.indexOf('space') !== -1) {
            $('.view-container').css('display', 'none');
            var parts = newView.split('/');
            loadSpace({
                'id': parts[1],
                'name': parts[2].replace('-', ' ')
            })
        }
    }

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
        console.log('too many spaces with same ID returned');
    }

}

function showSpace(data) {
    var space = $('<div />')
    .css('display', 'none')
    .attr('id', 'space-' + data.id)
    .addClass('space-container')
    .append(parseTemplate('spaceDetail', data))
    .appendTo('body')
    .fadeIn(300, function() {

    });

}

function closeSpaces() {
    $('div[id^=space-]').fadeOut(300, function() {
        $(this).remove();
    });
}

function resetViews() {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $('#list').html('');
}

function loadSpaces(options) {
    var defaults = {
        queryString:'',
        reset:false
    };
    $.extend(defaults, options);
    /*----load spaces-----*/
    console.log('load spaces');

    resetViews();
    $.ajax('https://uoc-spacefinder.herokuapp.com/spaces.json?callback=?', {
        cache:false,
        dataType:'json',
        method:'GET',
        data:defaults.queryString
    }).done(function(data) {
    //$.getJSON('/assets/data/points.json').done(function(data) {
        points = data,
        distCount = 0;
        if(!!getLocation) {
            $.each(points, function(key, value) {
                points[key].link = '#/space/' + points[key].id + '/' + (points[key].name).replace(' ', '-');
                if(points[key].lat !== null && points[key].lng !== null) {
                    getDistance(userLoc, {lat:Number(points[key].lat),lng:Number(points[key].lng)}, function(dist) {
                        points[key].distance = dist;
                        distCount++;
                        if (distCount == points.length) {
                            if(!defaults.reset) {
                                loadSearch();

                            }
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
                        loadMap();
                        loadList();
                        if(typeof(defaults.callback) == 'function') {
                            defaults.callback();
                        }
                    }
                }

            });
        } else {
            if(!defaults.reset) {
                loadSearch();

            }
            loadMap();
            loadList();
            if(typeof(defaults.callback) == 'function') {
                defaults.callback();
            }
        }


    });
}

function loadSearch() {
    console.log('load spaces');
    //$.getJSON('https://uoc-spacefinder.herokuapp.com/spaces.json')
    $.getJSON('/assets/data/search.json')
        .done(function(data) {
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
            if(!getLocation) {
                data[key].distance = markers.distance = '';
            }
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
            backgroundColor: 'rgba(54,54,54,0.9)',
            borderRadius: 4,
            arrowSize: 10,
            borderWidth: 1,
            //borderColor: '#2c2c2c',
            padding: 10,
            disableAutoPan: false,
            hideCloseButton: false,
            maxWidth:($(window).width() * 0.9),
            maxHeight:($(window).height() * 0.6),
            //arrowPosition: 50,
            backgroundClassName: 'map-info-bubble',
            disableAnimation: true,
            arrowStyle: 0
        });
        points[key].mapSummary = infowindow;
        marker.setMap(map);




        google.maps.event.addListener(marker, 'click', function() {
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
                    $('#bubble-' + points[key].id).html('');
                    $('#bubble-' + points[key].id).append(parseTemplate(points[key].template, points[key]));
                }, 100);
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
    $.each( points, function( key ) {
        var space = parseTemplate('list', points[key]);

        $list.append(space);

    });



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
    attr = null;

    if(partial == true) {
        template = t;
    } else {
        template = templates[t].template;
    }

    //if(template == undefined) console.log(t, data, partial);
    //console.log('template', templates, template);
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
                console.log(match[3], data[match[2]]);
                template = template.replace(match[1], str);
            }

        }
    }
    r = new RegExp('(#{(.*?)})', "g")
    matches = template.match(r);
    if (matches !== null) {
        for (var i = 0; i < matches.length; i++) {
            limit = matches[i].match(/.*\(.*limit="(.*)".*/);
            attr = matches[i].match(/.*\(.*attr="(.*)".*/);
            icon = matches[i].match(/.*\(.*icon.*/);
            if(icon !== null) {
                icon = true;
            }
            if(limit !== null) {
                limit = Number(limit[1]);
            }
            if(attr !== null) {
                attr = attr[1];
            }
            var key = ''
            if (limit !== null || icon !== null || attr !== null) {
                key = matches[i].match(/#{(.*)\(.*}/);
            } else {
                key = matches[i].match(/#{(.*)}/);
            }
            var str = convertToValue(matches[i], data[key[1]], {"limit":limit, "icon":icon, "attr":attr});
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
                console.log(t, data[i]);
                str = parseTemplate(t, data[i], true);
            } else {
                var searchIconMap = searchArray(iconMap, data[i]);
                if(searchIconMap !== -1) {
                    str = str.replace(/#{value}/g, iconMap[searchIconMap][1]);
                    str = str.replace(/#{attr}/g, iconMap[searchIconMap][0].replace(/ /g, '-'));
                    str = str.replace(/#{icon}/g, iconMap[searchIconMap][2]);
                } else {
                    str = str.replace(/#{value}/g, data[i].replace(/(.*?)_/, ''));
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
        $.each(data, function(key, value) {
            if (options.limit !== null) {
                //console.log(limit, value);
                temp = temp.replace('/#{' + key +'}/g', String(value).substr(0, options.limit));
            } else {
                temp = temp.replace('/#{' + key +'}/g', value);
            }

        });
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
