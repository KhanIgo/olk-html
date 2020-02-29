;
var minSymbols = 3,
    getAjaxDataUrl = '/parser/autocomplete.php',
    responseData,
    codeInput;

function afterOrderSubmitted(response){
    jQuery('.c-lk__loader').removeClass('is-active');

//    console.log(response);
    
    var data = jQuery.parseJSON(response);
    if(data.status == 'success'){
        Swal.fire({
              icon: 'success',
              text: data.message
        });
    }
    else{
        Swal.fire({
              icon: 'error',
              text: data.message
        });
    }
    clearOrderForm();
}

function afterValidateOrderRow(response) {
    var data = jQuery.parseJSON(response);
    if(data.status=='success'){
        var $input = codeInput;
        $input.data('inited', 'yes');
        setMinQty($input, data.prod); 
        $input.closest('.b-lk-row_item').find('.ui-autocomplete').remove();
        countTotal();
    }
    else if(data.status=='error'){
        Swal.fire({
              icon: 'error',
              text: data.message
        });
    }
}

function afterCodeInputChanged(responseJSON) {
    console.log(responseJSON);
    var response = jQuery.parseJSON(responseJSON);
    if(response.status == 'success' && response.count>0){
        responseData = response.data;
        $this = codeInput;
        showAutocompleteResult($this, response.data); 
    }
    else if(response.status == 'error'){}
}
function afterAjaxLog(data) {
    console.log(data);
}


function checkAllRows(){
    var status = true;
    var $rows = jQuery('.b-lk-row_item');
    if($rows.length == 0) return false;
    $rows.each(function(i, $item) {
        console.log('$item', $item);
        $item = jQuery($item);
        var $codeInp = $item.find('.b-lk-row__input-code');
        var code = $codeInp.val();
        code = normSku(code);
        
        var restrictedIndex = _.find(restricted, function(o) {
            return o==code;
        });
        if(restrictedIndex){
            $item.addClass('has-error');
            status = false;
        }
        else{
            $item.removeClass('has-error');
        }
    });
    
    var total = getTotal();
    if( isNaN(total) || (total === undefined) || (total==0) ){
        Swal.fire({
            icon: 'error',
            text: 'Заполните данные заказа'
        });
        status = false;
    }
    return status;
}

function setMinQty($acItem, data) {
    var min = data.min_qty;
    var price = data.price;
    var $input = $acItem.closest('.b-lk-row_item').find('.b-lk-row__input-qty');
    $input.data('min', min).data('price', price).val(min);
}

function normSku(sku){
    sku = _.replace(sku, /\s+/g, '');
    sku = _.replace(sku, ' ', '');
    sku = _.replace(sku, '-', '');
    sku = _.replace(sku, '.', '');
    sku = _.replace(sku, ',', '');
    return sku;
}
function countTotal(){
        var total = getTotal();
        var totalNonNds = (total/120)*100;
        jQuery('.b-lk-row__total-value_nds').text(total.toFixed(2));
        jQuery('.b-lk-row__total-value_non-nds').text(totalNonNds.toFixed(2));
}
function getTotal() {
    var total = 0;
    var $items = jQuery('.b-lk-row_item');
    $items.each(function() {
        var $this = jQuery(this);
        var $qtyInp = $this.find('.b-lk-row__input-qty');
        var qty = parseInt( $qtyInp.val() );
        var price = parseFloat( $qtyInp.data('price') );
        var subtotal = qty*price;
        total+=subtotal;
    });
    return total;
}

function clearOrderForm(){
    var $ = jQuery;
        var $items = $('.b-lk-row_item:not(:first)');
        $('.b-lk-row__total-value').text(0);
        $items.animate({opacity:0}, 500, function(arguments) {
            $(this).remove();
        });
        setTimeout(function(arguments) {
            var $item = $('.b-lk-row_item');
            var $codeInp = $item.find('.b-lk-row__input-code');
            var $qtyInp = $item.find('.b-lk-row__input-qty');
            $('.b-lk-row__comment-field').val('');
            $item.removeClass('has-error');
            $codeInp.val('');
            $qtyInp.data('min', 0).data('price', 0).val('');
        }, 600);
}

function showAutocompleteResult($input, data){
        $input.next('.ui-autocomplete').remove();
        var autocompleteHTML = '<div class="ui-autocomplete"><div class="ui-autocomplete__inner"><div class="ui-autocomplete__items">';
        
        data.forEach(function(item) {
            var itemHTML = '<div class="ui-autocomplete__item">'
            itemHTML += item.sku;
            itemHTML +='</div>';
            autocompleteHTML += itemHTML;
        });
        
        autocompleteHTML += '</div></div></div>';
        $input.after(autocompleteHTML);
}

jQuery(function($) {
    var $body = $('body');
    $body.on('click', '.js-add-item', function(e) {
        e.preventDefault();
        var $item = $('.b-lk-row_item').eq(0).clone();
        $item.css('opacity', 0);
        $item.find('input').removeClass('inited').val('');
        $item.appendTo('.c-lk__items');
        $item.animate({opacity:1}, 500);
    });
    
    $body.on('click', '.js-remove-item', function(e) {
        e.preventDefault();
        var count = $('.b-lk-row_item').length;
        var $this = $(this);
        var $item = $this.closest('.b-lk-row_item');
        $item.removeClass('has-error');
        $item.find('.b-lk-row__input-code').val('');
        $item.find('.b-lk-row__input-qty').data('price', 0).data('min', 0).val(0);
        setTimeout(function() {
            countTotal();
        }, 600);
        
        if(count<2) return false;
        $item.animate({opacity:0}, 500, function() {
            $(this).remove();
        });
    });
    
    $body.on('focus', '.js-order-item-code-input', function(e){
        $(this).addClass('focused');
    });
    $body.on('blur', '.js-order-item-code-input', function(e){
        $(this).removeClass('focused');
    });
    
    $body.on('click', '.b-lk-row__col-code .ui-autocomplete__item', function(e) {
        e.preventDefault();
        var $this = $(this);
        var sku = $this.text().trim();
        var $input = $this.closest('.b-lk-row__col-code').find('.b-lk-row__input-code');
        $input.val(sku);
        $input.addClass('inited');
        var itemData = _.find(responseData, function(item) { return item.sku == sku; });
        setMinQty($this, itemData); 
        $this.closest('.ui-autocomplete').remove();
        countTotal();
        $input.change();
    });
    
    
    
    $body.on('submit', '.c-lk__form', function(e) {
        e.preventDefault();
        
        var status = checkAllRows();
        if( !status ){
            Swal.fire({
                icon: 'error',
                text: 'В некоторых позициях обнаружены ошибки'
            });
            return false;
        }
        $('.c-lk__loader').addClass('is-active');
        ajaxs( 'order_submit', this );
    });
    
    $body.on('keyup', '.js-order-item-code-input', _.debounce( function(e){    
        $(this).removeClass('inited').trigger('change');
    },500));
    
    $body.on('change', '.js-order-item-code-input', function(e){
        var $this = $(this);
        setTimeout( function() {
            if( $this.is('.inited') ) return;
            var value = $this.val();
            var valLen = value.length;
            var ajaxData = { sku: value };
            if(valLen>minSymbols){
                ajaxs('code_input_change', ajaxData);
                codeInput = $this;
            }            
        }, 100);

        
//        var $this = $(this);
//        if( $this.is('.focused') ) return;
//        setTimeout(function() {
//            codeInput = $this;
//            var flag = $this.data('inited');
//            var code = $this.attr('value');
//            console.log('log 1');
//            if(flag=='yes') return;
//            console.log('log 2');
//            var ajaxData = {
//                sku: code
//            };
//            ajaxs('validate_order_row', ajaxData);
//        }, 100);
    });
    
    $body.on('change', '.b-lk-row__input-qty', function(e){
        var $this = $(this);
        var min = parseInt( $this.data('min') );
        var val = parseInt( $this.val() );
        if(val<min){
            $this.val(min);
            
            Swal.fire({
              icon: 'error',
              text: 'Нельзя установить количество меньше минимального для этого товара'
            });
        } 
        countTotal();
    });
    
    
    
    $body.on('click', '.js-clear-order', function(e) {
        e.preventDefault();
        clearOrderForm();
    });
    
    $body.on('change', '.js-date-input', function(e) {
        var $this = $(this);
        var date = $this.val();
        var search = window.location.search;
        console.log('currentUrl', window.location);
        if(date != ''){
            var url = '/orders?date='+date;
            window.location = url;
        }
        else{
            if(search != '') window.location = '/orders/';
        }
        
    });
    
    
    function validateRow(){
        
    }
    
    
});