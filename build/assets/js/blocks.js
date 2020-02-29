
;jQuery(function($) {
    var $body = $('body');
    var minSymbols = 4;
    var getAjaxDataUrl = '/parser/autocomplete.php';
    $body.on('click', '.js-add-item', function(e) {
        e.preventDefault();
        var $item = $('.b-lk-row_item').eq(0).clone();
        $item.css('opacity', 0);
        $item.find('input').val('');
        $item.appendTo('.c-lk__items');
        $item.animate({opacity:1}, 500);
    });
    
    $body.on('click', '.js-remove-item', function(e) {
        e.preventDefault();
        var count = $('.b-lk-row_item').length;
        if(count<2) return false;
        var $this = $(this);
        var $item = $this.closest('.b-lk-row_item');
        $item.animate({opacity:0}, 500, function() {
            $(this).remove();
        });
    });
    
    
    
    $body.on('submit', '.c-lk__form', function(e) {
        e.preventDefault();
        console.log($(this));
        //        ajaxs( 'order_submit', this );
    });
    
    
    
    
    $body.on('keyup', '.js-order-item-code-input', _.debounce(
        function(e){
            var $this = $(this);
            var value = $this.val();
            var valLen = value.length;
            console.log('value', value);

            if(valLen>minSymbols){
                var url = getAjaxDataUrl +'?sku='+ value;
                $.get(url, function(response) {
                    var data = $.parseJSON(response);
                    console.log(response);
                    console.log(data);
                    showAutocompleteResult($this, data); 
                });
            }
        }
        ,500));
    
    function showAutocompleteResult($input, data){
        
    }
});
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
;jQuery(function($){
    var $body = $('body');
    
    // клик по пункту автокомлита
    $body.on('click', '.b-lk-row__col-code .ui-autocomplete__item', function(e) {
        e.preventDefault();
        var $this = $(this);
        var sku = $this.text().trim();
        var $input = $this.closest('.b-lk-row__col-code').find('.b-lk-row__input-code');
        $input.val(sku);
        $this.closest('.ui-autocomplete').remove();
    });
})
;

;jQuery(function($) {
    $('.ui-btn_download').append('<i></i>')
    //    $('.ui-btn_remove').append('<i></i>')
    
});


const ham = document.querySelector('.js-ham'),
      nav = document.querySelector('.b-header__nav'),
      hamCallback = function(e) {
          e.preventDefault();
          this.classList.toggle("is-active");
          nav.classList.toggle("is-active");
      };

ham.addEventListener('click', hamCallback);


function getPopupId(classes) {
    var id;
    classes.forEach( function(cls) {
        if(cls.indexOf('popup-id_') +1){
            id = cls.replace('popup-id_', '');
        }
    });
    return id;
}



const popupBtns = document.querySelectorAll('.ui-open-popup');
popupBtns.forEach(function(item, index) {
    var popupId = getPopupId(item.classList);
    var dataAttr = '#ui-popup_'+ popupId;
//    item.setAttribute('data', "src: "+dataAttr);
    item.dataset.src = dataAttr;
    console.log(popupId);
    console.log('item.dataset');
    console.log(item.dataset);
    
});

jQuery(function($) {
    setTimeout(function() {
        $('.ui-open-popup').fancybox();
    }, 50 );
    
});


