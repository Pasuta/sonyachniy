'use strict';
var parse = require('co-body');

function send(text, from, to, subject){

    var email   = require("emailjs/email");
    var server  = email.server.connect({
        user: "test@attracti.com",
        password: "testuser",
        host: "mail.icebrg.net",
        tls: true
    });

    server.send({
        from: from,
        to: to,
        subject: subject,
        attachment:
            [
                {data:text, alternative:true}
            ]
    }, function(err, message) {
        console.log(err || message);
    });
}

module.exports = function *() {
    var post = yield parse(this);
    var text = "Ім’я: " + post.name;
    text += '. Телефон: ' + post.phone;
    text += '. Email: ' + post.email;
    text += '. Повідомлення: ' + post.message;

    send(text, post.email, "info@sonyachniy.com.ua", "Заявка на сайті sonyachniy.com.ua");
    //send(text, post.email, "pasutavitaliy@gmail.com", "Заявка на сайті sonyachniy.com.ua");

    this.body = yield {"status": 200};
};