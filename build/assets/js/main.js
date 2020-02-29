;var winW = window.innerWidth,
    isMobile = false;

if(winW<600) isMobile = true;

jQuery(function($) {
    $("a.js-popup").fancybox({
        'hideOnContentClick': true
    });
    
    $('a[href*="#"]').click(function(e){
        var hash = this.href.split("#")[1],
            sel = '#'+hash,
            $to = $( sel )
        ;
        if( $to.length>0 ){
            var top = $to.offset().top;
            if(isMobile) top-=50;

            $('html, body').animate({
                scrollTop:  top
            }, 1000);
        }
//        var top = $to.offset().top + parseInt( $to.css('margin-top') ) + parseInt( $to.css('padding-top') );
        
    });
});


function getSliderWidth($slides) {
        var w = 0;
        $slides.each(function() {
            w += parseInt( jQuery(this).width() );
            w += parseInt( jQuery(this).css('margin-left') );
            w += parseInt( jQuery(this).css('margin-right') );
        });
        console.log('width');
        console.log(w);
        return w;
    }
    function getTransform(){
        return 'translateX( 100vw - 100% )';
    }
    function getTransitionTime(w){
        var time = Math.ceil(w/150);
        console.log('time');
        console.log(time);
        return time;
    }
    function getTransition(t){
        var transition = t+'s linear';
        return transition;
    }
function isExist(el){
    if( typeof(el)!='undefined' && el!=null ) return true;
    else return false;
}