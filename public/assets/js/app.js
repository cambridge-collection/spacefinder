var map,
$list = $('#list'),
openPoints = [],
loc = {'lat':52.205575, 'lng':0.121682},
userLoc = {'lat':0, 'lng':0}
getLocation = true,
centerOnLocation = false,
points = [],
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
    }
},
inactiveColor = 'rgba(0,0,0,0.6)',
activeColor = '#E37222',
initialView = 'map',
mapViewed = false;
var markerSymbol = {
    path: 'M0-30.5c-5.7,0-10.2,4.6-10.2,10.2C-10.2-14.6,0,0,0,0s10.2-14.6,10.2-20.2C10.2-25.9,5.7-30.5,0-30.5z M0-17.7c-1.6,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S1.6-17.7,0-17.7z',
    fillColor: inactiveColor,
    fillOpacity: 0.8,
    scale: 1,
    strokeWeight: 0
};

var multiMarkerSymbol = {
    path: 'M0-28.5c-5.7,0-10.2,4.6-10.2,10.2C-10.2-12.6,0,0,0,0s10.2-12.6,10.2-18.2C10.2-23.9,5.7-28.5,0-28.5z M5.2-17.8h-4v4h-2.4v-4h-4v-2.4h4v-4h2.4v4h4V-17.8z',
    fillColor: inactiveColor,
    fillOpacity: 0.8,
    scale: 1,
    strokeWeight: 0
};
$().ready(function() {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
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
    //console.log('switchView', newView);
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
                }
                if(!mapViewed) {
                    mapViewed == true;
                    if(!!centerOnLocation) {
                        map.setCenter(userLoc);
                    } else {
                        map.setCenter(loc);
                    }

                }
            }
        });
    } else {
        if(newView.indexOf('space') !== -1) {
            var parts = newView.split('/');
            //console.log(parts);
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
    //console.log(defaults);
    //see if we've already have it loaded
    space = findMarkers(points, {'id':defaults.id}).spaces;
    if(space.length == 1) {
        //we've got the space so show it
        showSpace(space[0]);
    } else if(space.length == 0){
        $.$.ajax({
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
    if(!!getLocation && data.distance == undefined) {
        getDistance(userLoc, {'lat':data.latitude, 'lng':data.longitude}, function(dist) {
            data.distance = dist;
            showSpace(data);
        })
        return;
    }
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

function loadSpaces(options) {
    var defaults = {

    };
    $.extend(defaults, options);
    /*----load spaces-----*/
    //console.log('load spaces');
    $.getJSON('/assets/data/points.json').done(function(data) {
        points = data;
        loadMap();
        loadList();
        if(typeof(defaults.callback) == 'function') {
            defaults.callback();
        }
    });
}
function checkMarker(data, checks) {
    var match = true;
    //console.log(data, checks);
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

            //build link to space before parsing template
            data[key].link = '#/space/' + points[key].id + '/' + (points[key].name).replace(' ', '-');
        }
    });
    if(ret.spaces.length > 1) {
        ret.latitude = ret.spaces[0].latitude;
        ret.longitude = ret.spaces[0].longitude;
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
        inactiveColor:'rgba(0,0,0,0.6)',
        activeColor:activeColor
    };
    $.extend(defaults, options);
    //console.log('load map');


    $.each( points, function( key ) {
        if(points[key].marker !== undefined) return true;

        var markers = findMarkers(points, {'latitude':points[key].latitude, 'longitude':points[key].longitude}),
        isMultiMarker = markers.spaces.length > 1 ? true : false;

        var marker = new google.maps.Marker({
            position: {lat:points[key].latitude,lng:points[key].longitude},
            title:points[key].name,
            icon: (isMultiMarker ? multiMarkerSymbol : markerSymbol)
        });
        for (var i = 0; i < markers.spaces.length; i++) {
            points[markers.spaces[i]._jsid].marker = marker;
        }
        points[key].marker = marker;
        var contentString;

        if(isMultiMarker) {
            points[key].template = 'mapMulti';
            contentString = parseTemplate('mapMulti', markers);
        } else {
            points[key].template = 'mapSingle';
            contentString = parseTemplate('mapSingle', points[key]);
        }

        //console.log(contentString);

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
            maxWidth:300,
            //arrowPosition: 50,
            backgroundClassName: 'map-info-bubble',
            disableAnimation: true,
            arrowStyle: 0
        });
        points[key].mapSummary = infowindow;
        marker.setMap(map);

        if(!!getLocation) {
            getDistance(userLoc, {lat:points[key].latitude,lng:points[key].longitude}, function(dist) {
                points[key].distance = dist;
                points[key].mapSummary.content = parseTemplate(points[key].mapSummary.content, points[key], true);
            });
        }


        google.maps.event.addListener(marker, 'click', function() {
            if(openPoints.length > 0) {
                for (var i = 0; i < openPoints.length; i++) {
                    points[openPoints[i]].mapSummary.close();
                    points[openPoints[i]].marker.icon.fillColor = '#797979';
                    points[openPoints[i]].marker.setMap(map);
                    openPoints.splice(i, 1);
                }
            }
            infowindow.open(map,marker);
            this.icon.fillColor = defaults.activeColor;
            this.setMap(map);
            openPoints.push(key);
        });
        google.maps.event.addListener(infowindow,'closeclick',function(){
            marker.icon.fillColor = defaults.inactiveColor;
            marker.icon.fillOpacity = 1;
            marker.setMap(map);
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
    //console.log(points)
    $.each( points, function( key ) {
        //console.log('list space', points[key]);
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
    var template = t;
    if(!partial) {
        template = templates[t].template;
    }

    $.each(data, function(key, value) {
        if($.type(value) !== 'array') {
            var re = new RegExp('(#{' + key + '})', "g");
            template = template.replace(re, value);
            var re = new RegExp('(#{' + key + '-attr})', "g");
            value = String(value).replace(/ /g, '-');
            template = template.replace(re, value);
        } else {
            var re = new RegExp('#{' + key + '\\[(.*)\\]}', "g");
            var matches = template.match(re);
            //console.log('#{' + key + '\\[(.*)\\]}');
            //console.log(matches);

            //if(key == 'tags') console.log(matches);
            if(matches !== null) {
                for (var i = 0; i < matches.length; i++) {
                    var newStr = "";
                    //console.log(matches[i]);
                    var r = new RegExp('#{.*\\[(.*)\\]}', "g");
                    var str = r.exec(matches[i]);
                    console.log(matches[i], str, '#{' + key + '\\[(.*)\\]}');
                    if(str == null || str[1] == undefined) continue;
                    str = str[1];
                    //console.log(matches[i])
                    //console.log($.type(str));
                    if(str !== null) {
                        for (var j = 0; j < data[key].length; j++) {
                            var temp = '';
                            if($.type(data[key][i]) == 'object') {
                                temp = parseTemplate(str, data[key][j], true);
                            } else {
                                temp = str.replace('#{value}', data[key][j]);
                                temp = temp.replace('#{attr}', data[key][j].replace(/ /g, '-'));
                            }
                            newStr += temp;
                        }
                        template = template.replace(matches[i], newStr);
                    }
                }


            }

        }
    });
    return template;

}

function getDistance(origin, dest, callback) {
    var service = new google.maps.DistanceMatrixService();
    //console.log(arguments);
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
                callback(response.rows[0].elements[0].distance.text);
            }
        } else {
            return '';
        }

    });
}
