var HttpRequest = require("./API_Common_Step");
var Env = require("./API_Env");
var fs = require("fs");
var path = require("path");
var FormData = require('form-data');

function API_Object(baseUrl) {
    this.baseUrl = baseUrl || Env.get().BasicSet.url;
}
var proto = API_Object.prototype;

proto.login = function (header, body, cb) {

    let url = `${this.baseUrl}/merchant/auth/sso/login`;
    let bodyObject = {
        "email": "qa.testing@unibee.dev",
        "password": "q^GP8JxVx%b"
    }

    for (let k in bodyObject) {
        if (k in body) {
            bodyObject[k] = body[k];
        }
    }

    HttpRequest.post(url, header, JSON.stringify(bodyObject), (err, res) => {
        cb(err ? err : res, url, header, bodyObject)
    })
}

proto.getUserList = function (header, email, cb) {

    let url = `${this.baseUrl}/merchant/user/list?email=${email}`;

    HttpRequest.get(url, header, "", (err, res) => {
        cb(err ? err : res, url, header)
    })
}

proto.getSubscription = function (header, userId, cb) {

    let url = `${this.baseUrl}/merchant/subscription/list?userId=${userId}`;

    HttpRequest.get(url, header, "", (err, res) => {
        cb(err ? err : res, url, header)
    })
}

proto.cancelSubscription = function (header, body, cb) {

    let url = `${this.baseUrl}/merchant/subscription/cancel`;
    let bodyObject = {
        "subscriptionId": "sub20240528u4EwLvwEFlhi3Ix",
        "userId": "0"
    }

    for (let k in bodyObject) {
        if (k in body) {
            bodyObject[k] = body[k];
        }
    }

    HttpRequest.post(url, header, JSON.stringify(bodyObject), (err, res) => {
        cb(err ? err : res, url, header, bodyObject)
    })
}
module.exports = API_Object;