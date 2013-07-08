//Hello, Everybody!
//This stuff made by Saike
//saike@saike.ru
//kishkoglot@gmail.com

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};
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
var inputs_to_validate = $("[validate]");
inputs_to_validate.each(function(){

    $(this).attr('onkeyup', 'validateMe(this)');

});
function validateMe(input){
    var target = '#' + $(input).attr('messageTo');
    var validates = $(input).attr('validate').split(' ');
    console.log(validates);
    var testValue = $(input).val();
    var message = '';
    $(validates).each(function(){

        if(this.contains('number')){

            if(IsNumeric(testValue) || testValue == null || testValue == ''){

                validates.splice(validates.indexOf(this), this.length);

            }
            else {

                message = message + 'Only numbers! ';

            }

        }
        if(this.contains('required')){

            if(testValue != null && testValue != ''){

                validates.splice(validates.indexOf(this), this.length);

            }
            else {

                message = message + 'Required! ';

            }

        }
        if(this.contains('minChars')){

            minValue = this.substring(9);
            console.log('new value = ' + minValue);
            if(testValue.length >= minValue){

                validates.splice(validates.indexOf(this), this.length);

            }
            else {

                message = message + 'Minimum ' + minValue + ' characters! ';

            }

        }

        if(this.contains('maxChars')){

            maxValue = this.substring(9);
            if(testValue.length <= maxValue){

                validates.splice(validates.indexOf(this), this.length);

            }
            else {

                message = message + 'Maximum ' + maxValue + ' characters! ';

            }

        }

        if(this.contains('url')){

            if(checkURL(testValue)){

                validates.splice(validates.indexOf(this), this.length);

            }

            else {

                message = message + 'Invalid URL! ';

            }

        }

    });
    if($(input).attr('validate').contains('required') == false && testValue == ''){

        $(target).html('');

    }
    else if(validates.length == 0){

        console.log('ok!!!');

        $(target).html("It's OK!").css('color', 'green');

    }

    else {

        console.log(message);
        $(target).html(message).css('color', 'red');

    }
}
