//  The view model consists of the list of places as well as the map and the maps corresponding
//  markers.

var ViewModel = function (places) {

  var self = this;

  self.places = places;

  self.selectedCategory = ko.observable();

  self.categories = ["Food", "Attraction"];

  self.processClickOnListItem = function () {
    var place = this;

    // Go through and deselect any other items that may have been previously selected
    for (var i = 0; i < self.places.length; i++) {
      self.places[i].activeItem(false);
    }

    // Set the selected item as the active item
    this.activeItem(true);

    google.maps.event.trigger(place.marker, 'click');
  };

  self.toggleLeftNav = function() {
    self.slideout.toggle();
  };

  self.filteredByCategory = ko.computed(function () {

    // If the info window is open when a filter is selected, close the window.
    if (largeInfoWindow) {
      largeInfoWindow.close(map, largeInfoWindow.marker);
    }

    var results = this.places;
    var filterCategory = this.selectedCategory();

    if (filterCategory) {
      results = ko.utils.arrayFilter(results, function (place) {
        return place.category === filterCategory;
      });
    }

    // Show only the map markers that correspond to the selected category.
    if (results) {
      filterMap(this.places, results);
    }
    return results;

  }, self);

  self.init = function () {
    self.slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': 256,
      'tolerance': 70
    });
    document.getElementById('category-select').classList = 'select show-select';
  };

  self.init();

};

