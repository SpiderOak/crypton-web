$().ready(function () {
  var $rows = $('.row').fadeTo(0, 0);
  $('.row:lt(2)').fadeTo(250, 1);

  $(window).scroll(function () {
    $rows.each(function () {
      var a = $(this).offset().top + ($(this).height() / 2);
      var b = $(window).scrollTop() + $(window).height();
      if (a < b) {
        $(this).fadeTo(250, 1);
      }
    });
  });
});

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 250);

        if ($(this).attr('href') == '#signup') {
          $('#notification-form input').first().focus();
        }

        return false;
      }
    }
  });
});
