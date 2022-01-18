$(document).ready(function () {
    $('.lgpd-privacy-bar__preferences').on('click', function () {
        $('.lgpd-back').fadeIn();
    });

    $('.lgpd-back').on('click', function () {

        if (!$('.lgpd').is(':hover')) {

            $(this).fadeOut();
        }
    })
    $('.lgpd__agreement, .lgpd-privacy-bar__agreement').on('click', function () {
        $('.lgpd-back').fadeOut();
        $('.lgpd-privacy-bar').fadeOut();
    });
});