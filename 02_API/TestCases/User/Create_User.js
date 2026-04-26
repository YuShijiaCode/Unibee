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
describe('Create new user => Success', function () {
    this.timeout(9000000);

    for(let i = 0; i< 20000; i++){
        it('Case '+ i+': new user => Success', (done) => {
            try {
                setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                    let tmpTime = new Date().getTime();
                    ApiReq.newUser(API_Env.get().headerSet,
                        {
                            "externalUserId": "",
                            "email": "API"+ tmpTime + "@test.com",
                            "firstName": "",
                            "lastName": "",
                            "password": "Aa@666666",
                            "phone": "",
                            "address": "",
                            "language": ""
                        },(res, url, header) => {
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
                            testData["userId"] = resBody.data.user.id;
                            testData["email"] = "API"+ tmpTime + "@test.com";
                            expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                            done();
                        });
                }, 0);
            } catch (e) {
                done(e);
            }
        });

    }



});


describe('测试黑名单 => Success', function () {
    this.timeout(9000000);

    for(let i = 0; i< 10; i++){
        it('Case '+ i+': new user => Success', (done) => {
            try {
                setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                    let tmpTime = new Date().getTime();
                    ApiReq.checkOUtCreateSubmit(API_Env.get().headerSet,
                        {
                            "planId": 1209,
                            "quantity": 1,
                            "gatewayId": 112,
                            "vatCountryCode": "EE",
                            "email": "joshua.yu+"+(90010+i)+"@wowow.io",
                            "currency": "EUR",
                            "user": {"email": "joshua.yu+"+(90010+i)+"@wowow.io", "type": 1, "countryCode": "EE", "language": "en"}
                        },(res, url, header) => {
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
                            done();
                        });
                }, 0);
            } catch (e) {
                done(e);
            }
        });

    }



});