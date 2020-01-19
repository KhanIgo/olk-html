var md = new MobileDetect(window.navigator.userAgent);
var winW = window.innerWidth;
var winH = window.innerHeight;

var isDesktop, isTablet, isPhone, device, viewport_orientation, vWidth, vHeight;
if(md.phone()){
    isPhone = true;
    device = 'phone';
} 
else isPhone = false;
if(md.tablet()){
    device = 'tablet';
    isTablet = true;
} 
else isTablet = false;
if(!md.mobile()){
    device = 'desktop';
    isDesktop = true;
}
else isDesktop = false;

jQuery(function($){
    var $body = $('body');
    detect_device_type();
    
    $(window).resize(function(){
        if( w != $( window ).width() ){
            detect_viewport_orientation();
            winW = window.innerWidth;
        }
    });
    
    function detect_device_type(){
        detect_viewport_orientation();
        $body.addClass(device);
        set_viewport();
    }
    
    function set_viewport(){
        if( device=='tablet' && viewport_orientation=='landscape'){
            var viewport_content = 'width=1200';
        }
        else if( device=='tablet' && viewport_orientation=='portrait'){
            var viewport_content = 'width=1200';
        }
        else if( device=='phone' && viewport_orientation=='landscape'){
            var viewport_content = 'width=1200';
        }
        else if( device=='phone' && viewport_orientation=='portrait'){
            var viewport_content = 'width=480';
            var scale = vWidth/480;
            viewport_content = viewport_content+ ', initial-scale=' +scale;
            //viewport_content = viewport_content+ ', initial-scale=1';
            console.log(vWidth);
        }
        //viewport_content += ', minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=no';
        
        if( device=='phone' && viewport_orientation=='portrait'){}
        else{ viewport_content += ', initial-scale=1'; }
        
        //console.log('viewport_content: '+viewport_content);
        //$('#viewport-meta').attr('content', viewport_content);
        $('meta[name=viewport]').attr('content', viewport_content);
    }
    function detect_viewport_orientation(){
        vWidth = window.innerWidth;
        vHeight = window.innerHeight;
        
        if(vWidth > vHeight) viewport_orientation = 'landscape';
        else if(vWidth < vHeight) viewport_orientation = 'portrait';
        body = $('body');
        if(viewport_orientation == 'landscape'){
            body.removeClass('portrait').addClass('landscape');
        }
        if(viewport_orientation == 'portrait'){
            body.addClass('portrait').removeClass('landscape');
        }
    }
    
});
//window.onload = function () {}