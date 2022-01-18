var input = document.querySelector("#phone");
window.intlTelInput(input, {
    utilsScript: "../../js/utils.js?1585994360633",
    initialCountry: "br",
});

$(document).ready(function () {

    var button_whats_app_wrapper = $('.whats-app-wrapper');
    $('.button-whats-app').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $(this).removeClass('shake1');
        button_whats_app_wrapper.fadeToggle();


    })

    $('.whats-app__close').on('click', function () {
        $('.button-whats-app').removeClass('open');
        button_whats_app_wrapper.fadeOut();
    })
})
