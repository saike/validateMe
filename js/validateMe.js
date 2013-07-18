//Hello, Everybody!
//This stuff made by Saike
//saike@saike.ru
//kishkoglot@gmail.com


if(window.validateMe == undefined || window.validateMe == null || window.validateMe == {} || window.validateMe == ''){

    var validateMe = {

        setDefaultMessage: true,
        messageOnStart: true

    }
}

function IsNumeric(value){
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(value));
}
function checkURL(value) {
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    if (urlregex.test(value)) {
        return (true);
    }
    return (false);
}

function removeMessageClasses(desk){

    $(desk).removeClass('validateMeError').removeClass('validateMeSuccess');

}

var inputs_to_validate = $("[validate]");
inputs_to_validate.each(function(){

    $(this).attr('onkeyup', 'validateMePlease(this)');
    var target = '#' + $(this).attr('messageTo');
    console.log($(target).text());
    if(validateMe.setDefaultMessage == false){

        $(target).attr('defaultMessage', $(target).text());

    }

});

function innerMessageSender(input){

    var valID = '#' + $(input).attr('messageTo');
    var message = $(valID).attr('defaultMessage');
    $(valID).text(message);
}
function startMessageSender(input){

    var message = '';

    var validates = $(input).attr('validate').split(' ');

    var valID = '#' + $(input).attr('messageTo');
    $(validates).each(function(){

        if(this.indexOf('number') >= 0){

            message = message + 'Only numbers! ';

        }
        if(this.indexOf('required') >= 0){

            message = message + 'Required! ';

        }
        if(this.indexOf('minChars') >= 0){
            var minValue = this.substring(9);
            message = message + 'Minimum ' + minValue + ' characters! ';

        }
        if(this.indexOf('maxChars') >= 0){
            var minValue = this.substring(9);
            message = message + 'Maximum ' + minValue + ' characters! ';

        }
        if(this.indexOf('url') >= 0){

            message = message + 'Invalid URL! ';

        }
    });

    $(valID).html(message);

}
if(validateMe.messageOnStart == undefined || validateMe.messageOnStart == true){

    if(validateMe.setDefaultMessage == undefined || validateMe.setDefaultMessage == true){

        inputs_to_validate.each(function(){

            startMessageSender(this);

        });

    }

}
function validateMePlease(input){
    var target = '#' + $(input).attr('messageTo');
    var validates = $(input).attr('validate').split(' ');
    console.log(validates);
    var testValue = $(input).val();
    var message = '';
    removeMessageClasses($(target));
    $(validates).each(function(){

        if(this.indexOf('number') >= 0){

            if(IsNumeric(testValue) || testValue == null || testValue == ''){

                validates.splice(validates.indexOf(this), this.length);

            }
            else {

                message = message + 'Only numbers! ';

            }

        }
        if(this.indexOf('required') >=0){

            if(testValue != null && testValue != ''){

                validates.splice(validates.indexOf(this), this.length);

            }
            else {

                message = message + 'Required! ';

            }

        }
        if(this.indexOf('minChars') >= 0){

            minValue = this.substring(9);
            console.log('new value = ' + minValue);
            if(testValue.length >= minValue){

                validates.splice(validates.indexOf(this), this.length);

            }
            else {

                message = message + 'Minimum ' + minValue + ' characters! ';

            }

        }

        if(this.indexOf('maxChars') >= 0){

            maxValue = this.substring(9);
            if(testValue.length <= maxValue){

                validates.splice(validates.indexOf(this), this.length);

            }
            else {

                message = message + 'Maximum ' + maxValue + ' characters! ';

            }

        }

        if(this.indexOf('url') >= 0){

            if(checkURL(testValue)){

                validates.splice(validates.indexOf(this), this.length);

            }

            else {

                message = message + 'Invalid URL! ';

            }

        }

    });
    if( testValue == ''){
        if(validateMe.setDefaultMessage == undefined || validateMe.setDefaultMessage == true){

            startMessageSender(input);

        }
        else if(validateMe.setDefaultMessage == false){

            innerMessageSender(input);

        }
        else {

            $(target).html('');

        }
    }
    else if(validates.length == 0){

        console.log('ok!!!');

            $(target).html("It's OK!").addClass('validateMeSuccess');

    }

    else {

        $(target).html(message).addClass('validateMeError');

        console.log(message);


    }
}
