function initMap() {

  var madisonCenter = {lat: 43.069352, lng: -89.396601};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: madisonCenter
  });
}

function initMarkers(locations) {

  largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].name;
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP
    });



    locations[i].marker = marker;

    marker.addListener('click', (function (location) {

      return function () {

        for ( var i=0; i < locations.length; i++ ) {
          locations[i].activeItem(false);
        }
        location.activeItem(true);


        // if slideout is not open, then need to open it

        if (!slideoutLeft.isOpen()) {
          slideoutLeft.toggle();
        }


        populateInfoWindow(this, largeInfoWindow, location);
      };
    })(locations[i]));

    bounds.extend(new google.maps.LatLng(locations[i].location));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());

  }
}

function populateInfoWindow(currentMarker, infowindow, place) {

  var marker = place.marker;

  // Check to make sure the info window is not already opened on this marker
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    // look up the yelp rating if available

    console.log("Populating the info window. The place is ", place);

    var rating = place.yelpRating;
    var yelpUrl = place.yelpUrl;

    console.log('populating the window with a rating = ', rating);

    console.log("The place is ", place);

    var imgTag = '',
      yelpLink = '';
    if (rating)
      imgTag = "<img src = ' " + rating + "' alt='Yelp Rating'/>";
    if (yelpUrl)
      yelpLink = "<a href='" + yelpUrl + "' target='_blank'><i class='fa fa-yelp'></i>Yelp Reviews</a>";

    infowindow.setContent("<div><h1>" + place.name + "</h1><p>" + place.category + "</p>" + imgTag + "<span class='yelp-link'>" + yelpLink + "</span></div>");


    infowindow.open(map, marker);
    // make sure the marker property is cleared if the infowindow is closed
    infowindow.addListener('closeclick', function () {
      //infoWindow.setMap(null);
      infowindow.setMarker = null;
      infowindow.marker = null;
      console.log("Did a closeclick here", place);
      place.activeItem(false);
    })
  }
}

function filterMap(places, filtered) {

  console.log("places = ", places);
  for (var i = 0; i < places.length; i++) {
    places[i].marker.setMap(null);
  }

  console.log("filtered = ", filtered);
  for (var i = 0; i < filtered.length; i++) {
    filtered[i].marker.setMap(map);
  }
}


