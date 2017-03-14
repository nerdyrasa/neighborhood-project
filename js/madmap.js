function initMap() {

  var madisonCenter = {lat: 43.069352, lng: -89.396601};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
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



        // First reset all items so no item in the list is active and then set the active item.
        for ( var i=0; i < locations.length; i++ ) {
          locations[i].activeItem(false);
        }
        location.activeItem(true);

        // if slideout is not open, then need to open it
        if (!vm.slideout.isOpen()) {
          vm.slideout.toggle();
        }
        populateInfoWindow(this, largeInfoWindow, location);

      };
    })(locations[i]));

    bounds.extend(new google.maps.LatLng(locations[i].location));
  }
}

function populateInfoWindow(currentMarker, infowindow, place) {

  var marker = place.marker;

  // Check to make sure the info window is not already opened on this marker
  if (infowindow.marker != marker) {
    infowindow.marker = marker;

    // Only add the html if the item exists
    var imgTag = '',
      yelpLink = '';
    if (place.yelpRating.length > 0)
      imgTag = "<img src = ' " + place.yelpRating + "' alt='Yelp Rating'/>";
    if (place.yelpUrl.length > 0)
      yelpLink = "<a href='" + place.yelpUrl + "' target='_blank'><i class='fa fa-yelp'></i>Yelp Reviews</a>";

    infowindow.setContent("<div><h1>"
      + place.name
      + "</h1><p>"
      + place.category
      + "</p>"
      + imgTag
      + "<span class='yelp-link'>"
      + yelpLink
      + "</span></div>");

    infowindow.open(map, marker);

    // make sure the marker property is cleared if the infowindow is closed
    infowindow.addListener('closeclick', function () {
      infowindow.setMarker = null;
      infowindow.marker = null;
      // When the info window is closed, make sure that the item is no longer highlighted in the list.
      place.activeItem(false);
    })
  }
}

function filterMap(places, filtered) {

  // First clear all markers from the map
  for (var i = 0; i < places.length; i++) {
    places[i].marker.setVisible(false);
  }

  // Add markers that correspond to the filtered category
  for (var i = 0; i < filtered.length; i++) {
    filtered[i].marker.setVisible(true);
  }
}

