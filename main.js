$(document).ready(function() {

  // Slideout Variable
  var slideoutLeft = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('left-menu'),
    'padding': 256,
    'tolerance': 70
  });

  // Toggle button
  $('#left-nav').click(function() {
    slideoutLeft.toggle();
  });

  // Add event handler
  slideoutLeft.on('beforeopen', function() {
    document.querySelector('.fixed').classList.add('fixed-open-left');
  });

  // Add event handler
  slideoutLeft.on('beforeclose', function() {
    document.querySelector('.fixed').classList.remove('fixed-open-left');
  });

});