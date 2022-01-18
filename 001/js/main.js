$(document).ready(function () {

    let video = $('.video');

    $('.inicio__watch-now').on('click', function () {
        video.fadeIn();
    });

    $('.video__close').on('click', function () {
        video.fadeOut();
    })
    video.on('click', function () {
        if (!$('.video__inner').is(':hover')) {
            video.fadeOut();
        }
    })

    //-----add class active when header list in state burger and open-----//
    $('.header__burger').on('click', function () {
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    })
    //----------//

    //-----open only one detatils-----//
    $('details').click(function (event) {
        $('details').not(this).removeAttr("open");
    });
    //----------//

    //-----button-scroll-top-----//
    let button = $('.button-scroll-top');
    $(window).on('scroll', function () {

        if ($(this).scrollTop() > 0) {
            button.addClass('show');
        } else {
            button.removeClass('show');
        }

        $('.animate').each(function (i) {

            var bottom_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window >= bottom_of_object) {
                $(this).addClass('animate__play');
            }
        })
    });
    //----------//

    //-----timer-----//
    let timer_hours = $('.timer__hours').children(':first-child');
    let timer_minutes = $('.timer__minutes').children(':first-child');
    let timer_seconds = $('.timer__seconds').children(':first-child');

    let hours = 12;
    let minutes = 0;
    let seconds = 0;

    let timerId = setInterval(function () {
        --seconds;

        if (seconds < 0) {
            seconds = 59;
            --minutes;
        }
        if (minutes < 0) {
            minutes = 59;
            --hours;
        }

        timer_hours.text(hours);
        timer_minutes.text(minutes);
        timer_seconds.text(seconds);

        if (hours == 0 && minutes == 0 && seconds == 0) {
            clearInterval(timerId);

        }

    }, 1000)

    //----------//

    //------scroll to anchor with animation -----//

    //.offset() - get coordinate element.
    $('.header__link a').on('click', function (e) {
        e.preventDefault();
        let headerHeight = $('.header__body').height();
        let anchor = $($(this).attr('href'));
        if ($("html, body").scrollTop() != anchor.offset().top) {
            $("html, body").stop().animate({ scrollTop: anchor.offset().top - headerHeight }, 1000);
        }

    })
    //-----------//

    //-----scroll button to top with animation-----//

    $('.button-scroll-top').on('click', function (e) {

        $("html, body").stop().animate({ scrollTop: 0 }, 1000);


    });
    //----------//
    $('.depoimentos-slider').slick({
        arrows: true, //on-off arrows
        slidesToShow: 3,//count visual slide
        slidesToScroll: 1,
        speed: 400,//speed move animation
        easing: 'ease',
        infinite: true,// on-off infinite
        initialSlide: 0,
        autoplay: true,// on-off autoplay slide
        autoplaySpeed: 2000,
        pauseOnHover: true,
        pauseOnFocus: true,
        draggable: false,//onf-off touch swipe on computer
        swipe: true,
        // touchTreshhold:10
        touchMove: false,
        waitForAnimate: true,// on-off waiting for end animate
        centerMode: false,
        variableWidth: false,
        rows: 1,
        slidesPerRow: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    mobileFirst: true,
                    arrows: false
                }
            },
            {
                breakpoint: 769,
                settings: {
                    mobileFirst: true,
                    arrows: false,
                    slidesToShow: 1
                }

            }
        ],

    });
});