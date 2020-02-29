;jQuery(function($) {
    var $body = $('body');
    $('.b-catalogs__slider').owlCarousel({
        nav: true
        , dots: false
        , loop: true
        , autoWidth: false
        , autoplay: true
        , autoplayHoverPause: true
        , autoplaySpeed: 1500
        , stagePadding: 0
        , responsive: {
            1000:{
                items: 7
                , margin: 35
            },
            650: {
                items: 5
                , margin: 20
            },
            300: {
                items: 2
                , margin: 20
                , loop: false
            }
        }
    , });

    
    
    
    
    
    
    
//    $body.on('click', '.js-catalog-select-lev-1', function(e) {
//        e.preventDefault();
//        var parentIndex = $(this).data('parent');
//        var selector = '[data-child='+parentIndex+"]";
//        $(selector).toggleClass('is-active');
//        $(this).toggleClass('is-active');
//    });
//    $body.on('click', '.js-catalog-select-lev-2', function(e) {
//        e.preventDefault();
//        var parentIndex = $(this).data('parent');
//        var selector = '[data-child='+parentIndex+"]";
//        $(selector).toggleClass('is-active');
////        $(selector).siblings('.b-catalogs-toggled.is-active').removeClass('is-active');
//        $(this).toggleClass('is-active');
//        console.log(parentIndex);
//    });
});