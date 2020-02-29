;
//var cHeader = document.querySelector('.c-header');
//var body = document.querySelector('body');
//window.addEventListener('resize', function(e) {
//    var h = cHeader.offsetHeight;
////    var pos = cHeader.style.getPropertyValue('position');
//    console.log('h', h);
//    console.log('cHeader.style', cHeader.style);
////    console.log('pos', pos);
//});
;

jQuery(function($) {
    var $body = $('body');
    var cHeader = $('.c-header');
    
    initBodyPadding();
    $(window).on('resize', function(e) {
        initBodyPadding();
    });
    
    function initBodyPadding() {
        var pos = cHeader.css('position');
        if(pos == 'fixed' && !$body.is('.home') ){
            var h = cHeader.height();
            $body.css('padding-top', h+'px');
        }
        else $body.css('padding-top', '0px');
    }
});