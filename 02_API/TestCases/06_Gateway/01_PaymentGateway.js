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
let testData= [];

describe('Positive Check : Payment Gateway=> Success', function () {
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


    it('Case 01: Payment Gateway set up => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.paymentGatewaySetup(API_Env.get().headerSet,
                    {
                        "gatewayName": "stripe",
                        "gatewayKey": "xxxxx",
                        "gatewaySecret": "xxxxx"
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
                        // expect(resBody.code).to.equal(0);
                        // expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Payment Gateway edit => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.paymentGatewayEdit(API_Env.get().headerSet,
                    {
                        "gatewayId": 40,
                        "gatewayKey": "xxxxxx",
                        "gatewaySecret": "xxxxx"
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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Get Payment Gateway list => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getPaymentGatewayList(API_Env.get().headerSet
                    ,(res, url, header, bodyObject) => {
                        request = JSON.stringify(bodyObject);
                        request = {
                            URL: url,
                            Headers: header,

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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: Payment Gateway Webhook Setup => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.paymentGatewayWebhookSetup(API_Env.get().headerSet,
                {"gatewayId":40,
                "webhookSecret": "whsec_OxFUQ5sYb6Ungyj6cLFzPyqVNjtqfc0T"},(res, url, header, bodyObject) => {
                        request = JSON.stringify(bodyObject);
                        request = {
                            URL: url,
                            Headers: header,

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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 05: Wire Transfer Setup => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.wireTransferSetup(API_Env.get().headerSet,
                    {
                        "currency": "EUR",
                        "minimumAmount": 1000,
                        "bank": {
                            "accountHolder": "MULTILOGIN SOFTWARE OÜ",
                            "bic": "TRWIBEB1XXX",
                            "iban": "11111111",
                            "address": "Avenue Louise 54, Room S52 Brussels 1050"
                        }
                    },(res, url, header, bodyObject) => {
                        request = JSON.stringify(bodyObject);
                        request = {
                            URL: url,
                            Headers: header,

                        };
                        // response = res.body;
                        // Expect response headers：x-app,Content-Type
                        expect(res.statusCode).to.equal(400);
                        const resBody = JSON.parse(res.body);
                        response = resBody;
                        console.log(resBody)

                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 06: Wire Transfer Edit => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.wireTransferEdit(API_Env.get().headerSet,
                    {
                        "gatewayId": 41,
                        "currency": "EUR",
                        "minimumAmount": 1000,
                        "bank": {
                            "accountHolder": "MULTILOGIN SOFTWARE OÜ",
                            "bic": "TRWIBEB1XXX",
                            "iban": "11111111",
                            "address": "Avenue Louise 54, Room S52 Brussels 1050"
                        }
                    },(res, url, header, bodyObject) => {
                        request = JSON.stringify(bodyObject);
                        request = {
                            URL: url,
                            Headers: header,

                        };
                        // response = res.body;
                        // Expect response headers：x-app,Content-Type
                        expect(res.statusCode).to.equal(200);
                        const resBody = JSON.parse(res.body);
                        response = resBody;
                        console.log(resBody)
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });
});