var log4js = require('log4js');
var request = require('request');

var log = log4js.getLogger('API_Common_Step');
log.level = 'debug';

exports.get = function (url, headers, bodyObject, cb) {
    call('GET', url, headers, bodyObject, cb);
};

exports.delete = function (url, headers, bodyObject, cb) {
    call('DELETE', url, headers, bodyObject, cb);
}

exports.post = function (url, headers, bodyObject, cb) {
    call('POST', url, headers, bodyObject, cb);
};

exports.put = function (url, headers, bodyObject, cb) {
    call('PUT', url, headers, bodyObject, cb);
};

exports.post_Nobody = function (url, headers, cb) {
    call('POST', url, headers, cb);
};

exports.patch = function (url, headers, bodyObject, cb) {
    call('PATCH', url, headers, bodyObject, cb);
};


const iconv = require('iconv-lite');
const call = function (method, url, headers, body, cb) {
    let options = {
        url: url,
        method: method,
        headers: headers,
        encoding:null
    };
    if (body) options.body = body;
    console.log('=============API Request Information==================');
    console.log(options);
    request(options, function (error, response, resBodyText) {
        if (!error) {
            if(response.headers["content-type"] !== undefined && response.headers["content-type"].indexOf("charset=") !== -1) {
                response.body = iconv.decode(response.body, response.headers["content-type"].split("charset=")[1]);
            }else {
                response.body = iconv.decode(response.body, "UTF-8")
            }
            log.error('response', response.statusCode, response.body);
            cb(response);
            return;
        } else {
            log.error('response', error);
            cb(error);
            return;
        }
        cb(null, response);
    });
};



