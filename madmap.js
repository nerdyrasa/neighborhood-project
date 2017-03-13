var map;
var markers = [];

function initMap() {

  var madisonCenter = {lat: 43.069352, lng: -89.396601};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: madisonCenter
  });
}


