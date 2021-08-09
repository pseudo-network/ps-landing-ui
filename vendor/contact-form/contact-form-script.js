$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {

    console.log("submitForm");
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    var settings = {
        "url": "https://api.pseudocoin.io/v1/emailer/messages",
        "method": "POST",
        "timeout": 60,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": {
            "name": name,
            "email": email,
            "message": msg_subject + " : " + message,
            "type": "business"
        },
    };

    console.log("settings");
    console.log(settings);
    if (message.length > 0 && msg_subject.length > 0 && email.length > 0 && name.length > 0) {
        $.ajax(settings).done(function (response) {
            console.log(response);
            formSuccess();
        });
    }
}

function submitFormOld() {
    console.log("submitForm");
    var message = document.getElementById('message').value;
    var msg_subject = document.getElementById('msg_subject').value;
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;


    var settings = {
        "url": "https://api.pseudocoin.io/v1/emailer/messages",
        "method": "POST",
        "timeout": 60,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "name": name,
            "email": email,
            "message": message,
            "type": "business"
        }),
    };

    console.log("settings");
    console.log(settings);
    if (message.length > 0 && msg_subject.length > 0 && email.length > 0 && name.length > 0) {
        $.ajax(settings).done(function (response) {
            console.log(response);
            formSuccess();
        });
    }
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError() {
    //$("#contactForm").removeClass().addClass('shake animated-').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    //    $(this).removeClass();
    //});
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h5 text-center tada- animated- text-success";
    } else {
        var msgClasses = "h5 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}