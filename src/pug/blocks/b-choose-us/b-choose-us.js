;jQuery(function($) {
    $sliders = $('.b-choose-us__slider');
    
    $sliders.each(function() {
        var w = 0;
        var $slider = $(this);
        $slides = $slider.find('.b-choose-us-item');
        w = getSliderWidth($slides);
        var t = getTransitionTime(w);
        var winWidth = $(window).innerWidth();
        
        
        console.log('w', w);
        console.log('winWidth', winWidth);
        
        if(w<winWidth){
            $slider.addClass('not-moving');
        }
        else{
            $slider.css('width', w+'px');
            if(winWidth<600) t = t*2.5;
            var transition = getTransition(t);
            $slider.css('transition', transition);
            $slider.addClass('moving');
            setInterval(function() {
                $slider.toggleClass('moving');
            }, t*1000);
        }
    });
});