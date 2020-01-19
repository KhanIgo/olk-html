


const ham = document.querySelector('.js-ham'),
      hamCallback = function(e) {
          e.preventDefault();
          this.classList.toggle("is-active");
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

