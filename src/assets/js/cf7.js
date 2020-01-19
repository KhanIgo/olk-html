jQuery($ => {
    $('body').on('wpcf7submit', function (e) {
        let $form = $(e.target);
        let $loader = $form.find('.js-form-loader');
        var $completeMessage = $form.find('.js-on-complete');
        var $errorMessage = $form.find('.js-on-error');

        if ($loader.length > 0) {
            $loader.removeClass('active');
        }

        if (e.detail.apiResponse.status == 'mail_sent') {
            var message = e.detail.apiResponse.message;
            var inputsData = e.detail.inputs;
            $completeMessage.find('span').text(message);
            showValidation($form, inputsData)

            if ($completeMessage.length > 0) {
                $completeMessage.addClass('active');
                setTimeout(function () {
                    $completeMessage.removeClass('active');
                }, 3000);
            }
        } else {
            var inputsData = e.detail.inputs;
            showValidation($form, inputsData)

            var message = e.detail.apiResponse.message;
            $errorMessage.find('span').text(message);
            if ($errorMessage.length > 0) {
                $errorMessage.addClass('active');
                setTimeout(function () {
                    $errorMessage.removeClass('active');
                }, 2500);
            }
        }

    });

    function showValidation($form, inputs) {
        inputs.forEach(function (el) {
            var inputName = el['name'];
            var inputVal = el['value'];
            var inputSelector = '[name=' + inputName + ']';
            var $input = $form.find(inputSelector);
            if ($input.is('.wpcf7-validates-as-required') && inputVal == '') {
                $input.addClass('validation-failed');
                $input.removeClass('validation-successed');
            } else {
                $input.removeClass('validation-failed');
                $input.addClass('validation-successed');
            }
        });
    }

    $('.wpcf7-form').on('submit', function (e) {
        let $form = $(e.target);
        let $loader = $form.find('.js-form-loader');
        if ($loader.length > 0) {
            $loader.addClass('active');
        }
    });
});

const messages = {
        empty: 'Поле обязательно для заполнения',
        email: 'Некорректно введен e-mail',
        phone: 'Некорректно введен номер телефона',
        formInvalid: 'При отправке заявки произошла ошибка. Пожалуйста проверьте введеные данные.'
    },
    cf7RequiredFields = document.querySelectorAll('.wpcf7-validates-as-required'),
    cf7SubmitButtons = document.querySelectorAll('.wpcf7-submit'),
    submitButtonClickCallback = function (event) {
        var form = this.closest('form');
        var fields = form.querySelectorAll('input, textarea');
        fields.forEach(function (field, index) {
            checkField(field);
        });

        var formValid = isFormValid(form);
        if (!isFormValid(form)) {
            event.stopPropagation();
            event.preventDefault();
            showFormError(form, messages.formInvalid);
            return false;
        }
    };

cf7RequiredFields.forEach(function (field) {
    var wrpr = field.closest('div');
    wrpr.classList.add('ui__has-required-input');
});
cf7SubmitButtons.forEach(function (button, index) {
    button.addEventListener('click', submitButtonClickCallback);
});

function checkField(field) {
    var valid = true,
        value = _.trim(field.value),
        isRequired = field.classList.contains('wpcf7-validates-as-required'),
        isEmpty = true,
        type;
    if (field.classList.contains('mask-email')) type = 'email';
    else if (field.classList.contains('mask-phone')) type = 'phone';
    else type = 'common';
    if (value != '') isEmpty = false;

    removeErrorMessage(field);

    if (type == 'email') {
        var isValidEmail = validateEmail(value);
        if (isRequired && isEmpty) {
            field.classList.add('ui__invalid_email');
            addErrorMessage(field, messages.empty);
        } else if (!isEmpty && !isValidEmail) {
            field.classList.add('ui__invalid_email');
            addErrorMessage(field, messages.email);
        } else {
            field.classList.remove('ui__invalid_email');
        }
    } else if (type == 'phone') {
        var isValidPhone = validatePhone(value);
        if (isRequired && isEmpty) {
            field.classList.add('ui__invalid_phone');
            addErrorMessage(field, messages.empty);
        } else if (!isEmpty && !isValidPhone) {
            field.classList.add('ui__invalid_phone');
            addErrorMessage(field, messages.phone);
        } else {
            field.classList.remove('ui__invalid_phone');
        }
    } else if (type != 'phone' && type != 'email') {
        if (isEmpty && isRequired) {
            field.classList.add('ui__invalid_is-empty');
            addErrorMessage(field, messages.empty);
        } else {
            field.classList.remove('ui__invalid_is-empty');
            removeErrorMessage(field);
        }
    }
}

function addErrorMessage(field, message) {
    var sibling = field.nextSibling;
    if (typeof (sibling) == 'object') {
        if (typeof (sibling.classList) != 'undefined' && sibling.classList.contains('ui__invalid_message')) {
            sibling.remove();
        }
    }
    var errorMessage = document.createElement("span");
    errorMessage.classList.add('ui__invalid_message');
    errorMessage.textContent = message;
    field.after(errorMessage);
}

function removeErrorMessage(field) {
    var sibling = field.nextSibling;
    if (sibling == null) return;
    if (typeof (sibling) === 'object') {
        if (typeof (sibling.classList) != 'undefined' && sibling.classList.contains('ui__invalid_message')) {
            sibling.remove();
        }
    }
}

function showFormError(form, message) {
    var errorDiv = form.querySelector('.js-on-error'),
        errorSpan = form.querySelector('.b-course-purchase__on-error-message');

    try {
        if (isExist(errorDiv) && isExist(errorSpan)) {
            errorSpan.textContent = message;
            errorDiv.classList.add('active');
            setTimeout(function () {
                errorDiv.classList.remove('active');
            }, 1500);
        }
    } catch (e) {
        console.log(e.name);
        console.error(e.message);
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    var re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;
    return re.test(phone);
}

function isFormValid(form) {
    var invalidFields = form.querySelectorAll('.ui__invalid_is-empty, .ui__invalid_email, .ui__invalid_phone');
    if (invalidFields.length > 0) return false;
    else return true;
}

// маски ввода для полей email, phone и гибридное поле
if (typeof (IMask) === "function") {
    const emailFields = document.querySelectorAll('.mask-email'),
        phoneFields = document.querySelectorAll('.mask-phone'),
        emailPhoneFields = document.querySelectorAll('.mask-phone-email, .mask-email-phone');
    const emailMask = {
            mask: /^\S*@?\S*$/
        },
        phoneMask = {
            mask: '+{7} (000) 000-00-00'
        },
        emailPhoneMask = [
            {
                mask: /^\S*@?\S*$/
            },
            {
                mask: '+{7} (000) 000-00-00'
            }
          ];

    if (emailFields.length > 0) {
        emailFields.forEach(function (field) {
            IMask(field, emailMask);
        });
    }
    if (phoneFields.length > 0) {
        phoneFields.forEach(function (field) {
            IMask(field, phoneMask);
        });
    }
    if (emailPhoneFields.length > 0) {
        emailPhoneFields.forEach(function (field) {
            IMask(field, emailPhoneMask);
        });
    }
}