// first name and last name value must be more then 2 symbol and less then 16 symbol    +
// first name and last name must not contain numbers                                    +
// phone number must only contain numbers, and symbols must be 12                       +
// password input must be more then 6 symbol and less then 16 symbol,                   +
// it must contain at least one cap letter, 1 small letter and 1 number                 +
// password value must be matched value of confirm password                             +
// click on submit button must print all values of inputs

let firstName = $("#firstName");
let lastName = $("#lastName");
let email = $("#email");
let phoneNumber = $("#number");
let password = $("#psw");
let passwordConfirmed = $("#pswCon");
let submitBtn = $("#submitBtn");
let errorDiv = $(".err");
let showHidePassBtn = $(".showPsw");

errorDiv.hide();

function checkInputLength(min, max, elem){
    let element = elem;
    let value = element.val();

    if(value.length >= min && value.length <= max) {
        if(element.css("border-color", "red")) {
            element.css("border-color", "#cecdcd");
        }

    } else {
        let errorText = `${element.prev().html()} input - please enter symbols more then ${min} an less then ${max}`;

        if(min === max) {
            errorText = `${element.prev().html()} input - please enter ${min} symbols`;
        }
        errorDiv.append("<p>"+errorText+"</p>");

        element.css("border-color", "red");
    }
}

function checkInputOnNumbers(elem) {
    let element = elem;
    let value = element.val();

    for(let i = 0; i < value.length; i++) {
        if($.isNumeric(value[i])){
            element.css("border-color", "red");
            let errorText = `${element.prev().html()} input must not contain any numbers `;
            errorDiv.append("<p>"+errorText+"</p>");
        }
    }
}

function passwordValidation(elem) {
    let element = elem;
    let value = element.val();
    let isUpper = false;
    let isNumber = false;

    for(let i = 0; i < value.length; i++) {
        if(value[i] === value[i].toUpperCase()) isUpper = true;
        if($.isNumeric(value[i])) isNumber = true;
    }

    if(!isUpper){
        let errorText = `${element.prev().html()} input - please enter at least one upper letter`;
        errorDiv.append("<p>"+errorText+"</p>");

        element.css("border-color", "red");
    }

    if(!isNumber){
        let errorText = `${element.prev().html()} input - please enter at least one number`;
        errorDiv.append("<p>"+errorText+"</p>");

        element.css("border-color", "red");
    }
}

function isPasswordConfirmed(psw, conPsw) {
    let element = conPsw;
    let password = psw.val();
    let confirmedPassword = conPsw.val();

    if(element.css("border-color", "red")) {
        element.css("border-color", "#cecdcd");
    }

    if(password === confirmedPassword && password.length !== 0) {
        console.log("password confirmed")

    }else if(confirmedPassword.length === 0) {
        let errorText = `${element.prev().html()} input - please confirm password`;
        errorDiv.append("<p>"+errorText+"</p>");

    }else {
        let errorText = `${element.prev().html()} input - password does not match`;
        errorDiv.append("<p>"+errorText+"</p>");

        element.css("border-color", "red");
    }
}

function emailValidation(elem) {
    let element = elem;
    let value = element.val();

    if(element.css("border-color", "red")) {
        element.css("border-color", "#cecdcd");
    }

    if(value.length === 0 || value.indexOf("@") === -1) {
        let errorText = `${element.prev().html()} input - please enter email correctly`;
        errorDiv.append("<p>"+errorText+"</p>");
        element.css("border-color", "red");
    }
}

function printInputValues(arr){
    $.each(arr, function (index, item){
        console.log(item.prev().html() + " - " + item.val());
    })
}

function showHidePassword() {
    password.toggleClass("show");

    if(password.hasClass("show")){
        password.attr("type","text");
        passwordConfirmed.attr("type","text");

        password.text("Show");
        passwordConfirmed.text("Show");

        showHidePassBtn.html("hide password");

    }else {
        password.attr("type","password");
        passwordConfirmed.attr("type","password");

        password.text("Hide");
        passwordConfirmed.text("Hide");

        showHidePassBtn.html("show password");
    }
}

function submit() {
    errorDiv.empty();

    checkInputLength(2, 16, firstName);
    checkInputLength(2,16, lastName)
    checkInputLength(12,12, phoneNumber);
    checkInputLength(6, 16, password);

    checkInputOnNumbers(firstName);
    checkInputOnNumbers(lastName);

    emailValidation(email);

    passwordValidation(password);
    isPasswordConfirmed(password, passwordConfirmed);

    errorDiv.show();
    if(errorDiv.is(':empty')){
        printInputValues([firstName, lastName, email, phoneNumber]);
    }
}

submitBtn.click(submit);
showHidePassBtn.click(showHidePassword);