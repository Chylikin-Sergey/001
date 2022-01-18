$(document).ready(function () {
  //animate scroll menu HEADER
  $(".menu").on("click", "a", function (event) {
    event.preventDefault();
    var menuId = $(this).attr("href"),
      top = $(menuId).offset().top;
    console.log(top);
    $("html, body").animate({ scrollTop: top }, 1000);
  });

  /* появления кнопки скролл */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > $(window).height() * 0.3) {
      $(".btn__scroll-top").css("display", "flex");
    } else {
      $(".btn__scroll-top").css("display", "none");
    }
  });

  /* скролл на верх к меню */
  $(".btn__scroll-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
});


new WOW().init();