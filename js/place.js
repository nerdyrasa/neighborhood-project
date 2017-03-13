// Constructor function for a Place
var Place = function (place) {
  'use strict';
  this.category = place.category || 'No category';
  this.name = place.name || '';
  this.location = place.location || undefined;
  this.yelpId = place.yelpId || '';
  this.marker = place.marker || undefined;
  this.yelpRating = ko.observable(place.yelpRating || '');
  this.yelpUrl = ko.observable(place.yelpUrl || '');
  this.activeItem = ko.observable(false);
};
