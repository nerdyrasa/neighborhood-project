var googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwPVLHkMHn3e7BX0MzQHLki_efPdTX35c&v=3&callback=initialize";

var places = [
    new Place({
      "category": "Food",
      "name": "Dotty Dumpling's Dowry",
      "location": {
        "lat": 43.072829,
        "lng": -89.401329
      },
      "yelpId": "dotty-dumplings-dowry-madison"
    }),
    new Place({
      "category": "Attraction",
      "name": "Madison Children's Museum",
      "location": {
        "lat": 43.076674,
        "lng": -89.384438
      },
      "yelpId": "madison-childrens-museum-madison"
    }),
    new Place({
      "category": "Food",
      "name": "Paisan's Restaurant",
      "location": {
        "lat": 43.070682,
        "lng": -89.383026
      },
      "yelpId": "paisans-madison"
    }),
    new Place({
      "category": "Food",
      "name": "Graze",
      "location": {
        "lat": 43.075617,
        "lng": -89.382206
      },
      "yelpId": "graze-madison"
    }),
    new Place({
      "category": "Attraction",
      "name": "Camp Randall Stadium",
      "location": {
        "lat": 43.069897,
        "lng": -89.412772
      },
      "yelpId": "camp-randall-stadium-madison-2"
    })
  ],
  map = undefined,
  largeInfoWindow = undefined,
  vm = undefined;

function initialize() {
  initMap();
  initMarkers(places);
}

$.getScript(googleMapsUrl)
  // if getting the script is successful
  .done(function () {
    loadYelpData(places);
    vm = new ViewModel(places || []);
    ko.applyBindings(vm);
  })
  // if getting the script fails
  .fail(function () {
    var message = "The internet is broken. Please try again later.";
    alert(message);
  });
