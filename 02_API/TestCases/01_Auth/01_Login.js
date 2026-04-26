const API_Object = require("../../../CommonStep/API/API_Object");
const API_Env = require("../../../CommonStep/API/API_Env");
const ApiReq = new API_Object("https://api.unibee.top");

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
const {wait, click} = require("../../../CommonStep/Web/Web_Common_Step");
const urlencoded = require("urlencode");
const driver = require("../../../CommonStep/Web/seleniumWebDriver");
const webdriver = require("selenium-webdriver");
const loginPage = require("../../../01_Web/PageObject/LoginPage");
const baseStep = require("../../../CommonStep/Web/Web_Common_Step");
const userPlanPage = require("../../../01_Web/PageObject/UserPlanPage");
const merchantInvoicePage = require("../../../01_Web/PageObject/MerchantInvoicePage");
let request;
let response;
let timeStamp = new Date();

describe('Positive Check : Login=> Success', function () {
    this.timeout(9000000);

    beforeEach(function () {
        response = null;
        addContext(this, {
            title: 'StartTime',
            value: {
                StartTime: timeStamp = new Date()
            }
        });
    });
    afterEach(function () {
        if (response) {
            addContext(this, {
                title: 'Request',
                value: {
                    Request: request
                }
            });
            addContext(this, {
                title: 'Response',
                value: {
                    Response: response
                }
            });
        }
        addContext(this, {
            title: 'EndTime',
            value: {
                EndTime: timeStamp = new Date()
            }
        });

    });


    it('Case 01: login => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "joshua.yu+8@wowow.io",
                    "password":"Aa@666666"
                },(res, url, header, bodyObject) => {
                    request = JSON.stringify(bodyObject);
                    request = {
                        URL: url,
                        Headers: header,
                        Body: JSON.parse(request)

                    };
                    // response = res.body;
                    // Expect response headers：x-app,Content-Type
                    expect(res.statusCode).to.equal(200);
                    const resBody = JSON.parse(res.body);
                    response = resBody;
                    console.log(resBody)
                    // // token check
                    expect(resBody.code).to.equal(0);
                    expect(resBody.message).to.equal("");
                    expect(resBody.data.merchantMember.id).to.equal(61);
                    expect(resBody.data.merchantMember.merchantId).to.equal(15671);
                    expect(resBody.data.merchantMember.email).to.equal("joshua.yu+8@wowow.io");
                    expect(resBody.data.merchantMember.firstName).to.equal("Joshua8");
                    expect(resBody.data.merchantMember.lastName).to.equal("Yu");
                    expect(resBody.data.merchantMember.mobile).to.equal("");
                    expect(resBody.data.merchantMember.isOwner).to.equal(true);
                    expect(resBody.data.merchantMember.status).to.equal(0);
                    expect(resBody.data.token).not.null;
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });



});

describe('Required Check : Login=> Success', function () {
    this.timeout(9000000);

    beforeEach(function () {
        response = null;
        addContext(this, {
            title: 'StartTime',
            value: {
                StartTime: timeStamp = new Date()
            }
        });
    });
    afterEach(function () {
        if (response) {
            addContext(this, {
                title: 'Request',
                value: {
                    Request: request
                }
            });
            addContext(this, {
                title: 'Response',
                value: {
                    Response: response
                }
            });
        }
        addContext(this, {
            title: 'EndTime',
            value: {
                EndTime: timeStamp = new Date()
            }
        });

    });


    it('Case 01: email is missed => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "delete",
                    "password":"Aa@666666"
                },(res, url, header, bodyObject) => {
                    request = JSON.stringify(bodyObject);
                    request = {
                        URL: url,
                        Headers: header,
                        Body: JSON.parse(request)

                    };
                    // response = res.body;
                    // Expect response headers：x-app,Content-Type
                    expect(res.statusCode).to.equal(400);
                    const resBody = JSON.parse(res.body);
                    response = resBody;
                    console.log(resBody)
                    // // token check
                    expect(resBody.code).to.equal(51);
                    expect(resBody.message).to.equal("The Email field is required");
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: email is empty => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "",
                    "password":"Aa@666666"
                },(res, url, header, bodyObject) => {
                    request = JSON.stringify(bodyObject);
                    request = {
                        URL: url,
                        Headers: header,
                        Body: JSON.parse(request)

                    };
                    // response = res.body;
                    // Expect response headers：x-app,Content-Type
                    expect(res.statusCode).to.equal(400);
                    const resBody = JSON.parse(res.body);
                    response = resBody;
                    console.log(resBody)
                    // // token check
                    expect(resBody.code).to.equal(51);
                    expect(resBody.message).to.equal("The Email field is required");
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: password is missed => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "joshua.yu+8@wowow.io",
                    "password":"delete"
                },(res, url, header, bodyObject) => {
                    request = JSON.stringify(bodyObject);
                    request = {
                        URL: url,
                        Headers: header,
                        Body: JSON.parse(request)

                    };
                    // response = res.body;
                    // Expect response headers：x-app,Content-Type
                    expect(res.statusCode).to.equal(400);
                    const resBody = JSON.parse(res.body);
                    response = resBody;
                    console.log(resBody)
                    // // token check
                    expect(resBody.code).to.equal(51);
                    expect(resBody.message).to.equal("The Password field is required");
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: password is empty => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "joshua.yu+8@wowow.io",
                    "password":""
                },(res, url, header, bodyObject) => {
                    request = JSON.stringify(bodyObject);
                    request = {
                        URL: url,
                        Headers: header,
                        Body: JSON.parse(request)

                    };
                    // response = res.body;
                    // Expect response headers：x-app,Content-Type
                    expect(res.statusCode).to.equal(400);
                    const resBody = JSON.parse(res.body);
                    response = resBody;
                    console.log(resBody)
                    // // token check
                    expect(resBody.code).to.equal(51);
                    expect(resBody.message).to.equal("The Password field is required");
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });



})
