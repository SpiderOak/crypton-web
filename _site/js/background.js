$().ready(function () {
  var $rows = $('.row').fadeTo(0, 0);
  $('.row:lt(2)').fadeTo(500, 1);

  $(window).scroll(function () {
    $rows.each(function () {
      var a = $(this).offset().top + $(this).height();
      var b = $(window).scrollTop() + $(window).height();
      if (a < b) {
        $(this).fadeTo(500, 1);
      }
    });
  });

  var $headerHero = $('.header-hero');
  var $notificationHero = $('.notification-hero');

  var bg = new Trianglify({
    x_gradient: [ '#293233', '#252c2e', '#212a2c', '#1f2729' ],
    noiseIntensity: 0,
    cellpadding: 100,
    cellsize: 100
  }).generate($headerHero.width(), $headerHero.height()).dataUri;

  $headerHero.css('background-image', 'url(' + bg + ')');
  $notificationHero.css('background-image', 'url(' + bg + ')');

  var bg2 = new Trianglify({
    x_gradient: [ '#2a687f', '#2a6a83', '#2a6c84', '#296982' ],
    noiseIntensity: 0,
    cellpadding: 100,
    cellsize: 100
  }).generate($headerHero.width(), $headerHero.height()).dataUri;

  var bg3 = new Trianglify({
    x_gradient: [ '#22566b', '#22566b', '#225364', '#235367' ],
    noiseIntensity: 0,
    cellpadding: 100,
    cellsize: 100
  }).generate($headerHero.width(), $headerHero.height()).dataUri;

  $steps = $('.hero-unit.step');
  $steps.css('background-image', 'url(' + bg2 + ')');
  $steps.siblings('.dark').css('background-image', 'url(' + bg3 + ')');
});

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 500);
        return false;
      }
    }
  });
});
