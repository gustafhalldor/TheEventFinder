
function initMap() {
    var currInfoWindow;
    var rvkLOC = {lat: 64.138705, lng: -21.955501};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: rvkLOC,
      mapTypeId: 'roadmap'

    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('mapSearchBox');
    console.log(input);
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

   $.getJSON("/js/data.json", function(Events) {
     $.each(Events, function(key, data) {
        var location = {lat: data["lat"], lng:data["lgt"]};
        var marker = new google.maps.Marker({
           position: location,
           map: map
        });
        var imgSrc = ""+data["imgSrc"];
        var infowindow = new google.maps.InfoWindow({
          content: ''+data["eventName"]+'<br>' + data["eventDesc"] + '<br>' +
                   '<br> <Button>Sign Up!</Button>'
         });
         marker.addListener('click', function() {
               if(typeof(currInfoWindow) !== "undefined")currInfoWindow.close();
               currInfoWindow = infowindow;
               infowindow.open(map, marker);
         });
      });
   });





}




function initPlaceMarkerMap(){
    var currInfoWindow;
    var rvkLOC = {lat: 64.138705, lng: -21.955501};
    var radius;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: rvkLOC,
      mapTypeId: 'roadmap'
    });

    //Add listener
    google.maps.event.addListener(map, "click", function (event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    fillLocationTextBox(latitude, longitude);
    console.log( latitude + ', ' + longitude);
    if(radius) radius.setMap(null);
    radius = new google.maps.Circle({map: map,
        radius: 20,
        center: event.latLng,
        fillColor: '#777',
        fillOpacity: 0.1,
        strokeColor: '#AA0000',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        draggable: true,    // Dragable
        editable: false      // Resizable
    });
    google.maps.event.addListener(radius, "mouseup", function(event){
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        fillLocationTextBox(latitute, longitute);
        console.log( latitude + ', ' + longitude );
    })

    // Center of map
    map.panTo(new google.maps.LatLng(latitude,longitude));
    function fillLocationTextBox(lat, lgt){
        var lgtBox = document.getElementsByClassName("lgt");
        var latBox = document.getElementsByClassName("lat");
        console.log(lgtBox);
        lgtBox[0].value = lgt;
        latBox[0].value = lat;
    }


}); //end addListener




}





   /* var marker = new google.maps.Marker({
      position: rvkLOC,
      text: "Event",
      map: map
    });
    //The window that pops up when you click a marker.
    var infowindow = new google.maps.InfoWindow({
      content: 'Event hjá Vr2! <br> Klukkan: 16:00 <br><img src='+imgSrc+'>  <br> <button>Sign Up!</button>'
    });
     marker.addListener('click', function() {
      infowindow.open(map, marker);
    });*/


/*
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
*/
window.fbAsyncInit = function() {
    FB.init({
        appId      : '549623305236918',
        auth       : true,
        status     : true,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.5
    });

    $('#login').click(function(event) {
        event.preventDefault();
        FB.login(function(response) {
            var getInfo = $('#test');
            if(response.authResponse) {
                //this response return expiresIn, userID, accessToken and signedRequest
                var accessToken = response.authResponse.accessToken;
                var userId = response.authResponse.userID;
                FB.api('/'+userId+'/events/', function(response) {
                    console.log(response);
                    if(response && !response.error) {
                        getInfo.append(
                            $('<ul/>').text('event description: '+response.data[0].description),
                            $('<ul/>').text('event startTime: '+response.data[0].start_time),
                            $('<ul/>').text('event endTime: '+response.data[0].end_time),
                            $('<ul/>').text('event name: '+response.data[0].name),
                            $('<ul/>').text('event lat: '+response.data[0].place.location.latitude),
                            $('<ul/>').text('event long: '+response.data[0].place.location.longitude),
                            $('<ul/>').text('event id: '+response.data[0].id),
                            $('<ul/>').text('event status: '+response.data[0].rsvp_status)
                        );
                        $('.overlay').hide();
                        $('.loginDiv').hide();
                        $('#logout').show();
                    }
                });
            } else {
                window.alert("failed");
            }
        }, {
            scope: 'email,user_events'
        });
    });

    $('#logout').click(function(event) {
        event.preventDefault();
        FB.logout(function(response) {
            if(response.status !== 'connected') {
                console.log('goodbye');
            }
            $('.overlay').show();
            $('.loginDiv').show();
            $('#logout').hide();
        });
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


