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
let testData = [];

describe('Positive Check : Update Merchant profile=> Success', function () {
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
                    testData['token'] = resBody.data.token
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Update merchant profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                API_Env.get().headerSet.Authorization = testData['token'];
                ApiReq.updateMerchantProfile(API_Env.get().headerSet,        {
                    "companyName": "Update Name",
                    "address": "Update Address",
                    "email": 'joshua.yu+8@wowow.io',
                    "companyLogo": "http://unibee.top/files/invoice/cm/d1lw6e8d3sv34lssjh.jpg",
                    "phone": "15642543250",
                    "timeZone": "delete",
                    "host": 'delete'
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
                    expect(resBody.data).to.have.property('merchant');
                    expect(resBody.data.merchant.id).to.equal(15671);
                    expect(resBody.data.merchant.userId).to.equal(0);
                    expect(resBody.data.merchant.email).to.equal('joshua.yu+8@wowow.io');
                    expect(resBody.data.merchant.host).to.equal('autotest.unibee.top');
                    expect(resBody.data.merchant.companyName).to.equal('Update Name');
                    expect(resBody.data.merchant.address).to.equal("Update Address");

                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: revert merchant profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                API_Env.get().headerSet.Authorization = testData['token'];
                ApiReq.updateMerchantProfile(API_Env.get().headerSet,        {
                    "companyName": "Automation Company",
                    "address": "Test Address",
                    "email": 'joshua.yu+8@wowow.io',
                    "companyLogo": "http://unibee.top/files/invoice/cm/d1lw6e8d3sv34lssjh.jpg",
                    "phone": "15642543250",
                    "timeZone": "delete",
                    "host": 'delete'
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
                    expect(resBody.data).to.have.property('merchant');
                    expect(resBody.data.merchant.id).to.equal(15671);
                    expect(resBody.data.merchant.userId).to.equal(0);
                    expect(resBody.data.merchant.email).to.equal('joshua.yu+8@wowow.io');
                    expect(resBody.data.merchant.host).to.equal('autotest.unibee.top');
                    expect(resBody.data.merchant.companyName).to.equal('Automation Company');
                    expect(resBody.data.merchant.address).to.equal("Test Address");

                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });



});

