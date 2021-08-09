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


    var data = JSON.stringify({
        "name": name,
        "email": email,
        "message": msg_subject + " : " + message,
        "type": "business"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            formSuccess();
        }
    });

    if (message.length > 0 && msg_subject.length > 0 && email.length > 0 && name.length > 0) {
        xhr.open("POST", "https://api.pseudocoin.io/v1/emailer/messages");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
    else {
        formError();
    }
}


function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError() {
    $("#contactForm").removeClass().addClass('shake animated-').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h5 text-center tada- animated- text-success";
    } else {
        var msgClasses = "h5 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}