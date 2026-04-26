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
let randomNumber = Math.floor(Math.random() * 999) + 1;
describe('Admin list => Success', function () {
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


    it('Case 01: Invite member=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                console.log(randomNumber);
                ApiReq.inviteMember(API_Env.get().headerSet,
                    {
                        "email": "joshua.yu+" + randomNumber + "@wowow.io",
                        "roleIds": [
                            80
                        ],
                        "firstName": "auto"+ randomNumber,
                        "lastName": "test"
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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Get member List=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                console.log(randomNumber);
                ApiReq.getMemberList(API_Env.get().headerSet,
                    {"roleIds" : [
                        80
                        ]}
            ,(res, url, header) => {
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
                        expect(resBody.data.merchantMembers).not.empty;
                        testData["memberId"] = resBody.data.merchantMembers[0].id;
                        expect(resBody.data.merchantMembers[0].email).to.equal("joshua.yu+" + randomNumber + "@wowow.io");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


    it('Case 03: update role => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.updateMemberRole(API_Env.get().headerSet,{
                    "memberId":  testData["memberId"],
                    "roleIds": [
                        70
                    ]
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

    it('Case 04: suspend member => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.suspendMember(API_Env.get().headerSet,{
                    "memberId":  testData["memberId"]
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

    it('Case 05: resume member => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.resumeMember(API_Env.get().headerSet,{
                    "memberId":  testData["memberId"]
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

    it('Case 06: suspend member => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.suspendMember(API_Env.get().headerSet,{
                    "memberId":  testData["memberId"]
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


});

describe('Member => Success', function () {
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
                    testData["token"] = resBody.data.token;
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


    it('Case 02: Get member Profile=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                let randomNumber = Math.floor(Math.random() * 999) + 1;
                console.log(randomNumber);
                API_Env.get().headerSet.Authorization = testData["token"];
                ApiReq.getMemberProfile(API_Env.get().headerSet,
                    {
                    }
                    ,(res, url, header) => {
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
                        expect(resBody.data.merchantMember.id).to.equal(61);
                        expect(resBody.data.merchantMember.merchantId).to.equal(15671);
                        expect(resBody.data.merchantMember.email).to.equal("joshua.yu+8@wowow.io");
                        expect(resBody.data.merchantMember.firstName).to.equal("Joshua8");
                        expect(resBody.data.merchantMember.lastName).to.equal("Yu");
                        expect(resBody.data.merchantMember.mobile).to.equal("");
                        expect(resBody.data.merchantMember.isOwner).to.equal(true);
                        expect(resBody.data.merchantMember.status).to.equal(0);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Get member operation log list=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                let randomNumber = Math.floor(Math.random() * 999) + 1;
                console.log(randomNumber);
                API_Env.get().headerSet.Authorization = testData["token"];
                ApiReq.getMemberOperationLogList(API_Env.get().headerSet,
                    {
                    }
                    ,(res, url, header) => {
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
                        expect(resBody.data.merchantOperationLogs).not.empty;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: Logout=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                let randomNumber = Math.floor(Math.random() * 999) + 1;
                console.log(randomNumber);
                API_Env.get().headerSet.Authorization = testData["token"];
                ApiReq.logout(API_Env.get().headerSet,
                    {
                    }
                    ,(res, url, header) => {
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
                        done()

                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


});

