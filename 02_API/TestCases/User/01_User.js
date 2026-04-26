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


    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


});

describe('NewUser →  Get user profile => Success', function () {
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


    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: get user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserProfile(API_Env.get().headerSet,
                    testData["userId"] ,(res, url, header) => {
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
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["email"]);
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});

describe('NewUser → UpdateUserProfile → GetUserProfile => Success', function () {
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

    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


    it('Case 02: get user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserProfile(API_Env.get().headerSet,
                    testData["userId"] ,(res, url, header) => {
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
                        testData["updateBody"] = resBody.data.user;
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["email"]);
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.userName).to.equal("");
                        expect(resBody.data.user.address).to.equal("");
                        expect(resBody.data.user.firstName).to.equal("");
                        expect(resBody.data.user.lastName).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: update user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                testData["updateBody"]["userId"] = testData["userId"];
                testData["updateBody"]["firstName"] = "test";
                testData["updateBody"]["lastName"] = "QA";
                testData["updateBody"]["address"] = "test Address";
                testData["updateBody"]["type"] = 1;
                ApiReq.updateUserProfile(API_Env.get().headerSet,
                    testData["updateBody"] ,(res, url, header) => {
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
                        testData["updateBody"] = resBody.data.user;
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["email"]);
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.address).to.equal("test Address");
                        expect(resBody.data.user.firstName).to.equal("test");
                        expect(resBody.data.user.lastName).to.equal("QA");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: get user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserProfile(API_Env.get().headerSet,
                    testData["userId"] ,(res, url, header) => {
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
                        testData["updateBody"] = resBody.data.user;
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["email"]);
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.address).to.equal("test Address");
                        expect(resBody.data.user.firstName).to.equal("test");
                        expect(resBody.data.user.lastName).to.equal("QA");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});

describe('NewUser → ChangeUserEmail → GetUserProfile => Success', function () {
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

    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


    it('Case 02: change user email => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let newTime = new Date().getTime();
                ApiReq.changeUserEmail(API_Env.get().headerSet,
                    {
                        "userId": testData["userId"],
                        "externalUserId": "",
                        "newEmail": "test" + newTime +"@test.com",
                    } ,(res, url, header) => {
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
                        testData["newEmail"] = "test" + newTime +"@test.com";
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


    it('Case 03: get user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserProfile(API_Env.get().headerSet,
                    testData["userId"] ,(res, url, header) => {
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
                        testData["updateBody"] = resBody.data.user;
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["newEmail"]);
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});

describe('NewUser → ChangeUserDefaultGateway → GetUserProfile => Success', function () {
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

    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: ChangeUserDefaultGateway => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let newTime = new Date().getTime();
                ApiReq.changeUserDefaultGateway(API_Env.get().headerSet,
                    {
                        "userId": testData["userId"],
                        "gatewayId": 40,
                        "paymentMethodId": ""
                    } ,(res, url, header) => {
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


    it('Case 03: get user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserProfile(API_Env.get().headerSet,
                    testData["userId"] ,(res, url, header) => {
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
                        testData["updateBody"] = resBody.data.user;
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["email"]);
                        expect(resBody.data.user.gatewayId).to.equal(40);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});

describe('NewUser → ClearAutoChargeMethod → GetUserProfile => Success', function () {
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

    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: ClearAutoChargeMethod => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let newTime = new Date().getTime();
                ApiReq.clearAutoChargeMethod(API_Env.get().headerSet,
                    {
                        "userId": testData["userId"]
                    } ,(res, url, header) => {
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


    it('Case 03: get user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserProfile(API_Env.get().headerSet,
                    testData["userId"] ,(res, url, header) => {
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
                        testData["updateBody"] = resBody.data.user;
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["email"]);
                        expect(resBody.data.user.gatewayId).to.equal(0);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});

describe('NewUser → UserList => Success', function () {
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


    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: get user list => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.userList(API_Env.get().headerSet,
                    {
                        "userId": testData["userId"]
                    } ,(res, url, header) => {
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
                        expect(resBody.data.userAccounts[0].id).to.equal(testData["userId"]);
                        expect(resBody.data.userAccounts[0].email).to.equal(testData["email"]);
                        expect(resBody.data.userAccounts[0].merchantId).to.equal(15671);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});

describe('NewUser → UserSearch => Success', function () {
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


    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: user search => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.userSearch(API_Env.get().headerSet,
                     testData["userId"]
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
                        expect(resBody.data.userAccounts[0].id).to.equal(testData["userId"]);
                        expect(resBody.data.userAccounts[0].email).to.equal(testData["email"]);
                        expect(resBody.data.userAccounts[0].merchantId).to.equal(15671);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});

describe('NewUser → SuspendUser => Success', function () {
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


    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Suspend user => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.suspendUser(API_Env.get().headerSet,
                    {
                        "userId":testData["userId"]}
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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    // it('Case 02: resume user => Success', (done) => {
    //     try {
    //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
    //             ApiReq.suspendUser(API_Env.get().headerSet,
    //                 {
    //                     "userId":testData["userId"]}
    //                 ,(res, url, header) => {
    //                     request = {
    //                         URL: url,
    //                         Headers: header,
    //
    //                     };
    //                     // response = res.body;
    //                     // Expect response headers：x-app,Content-Type
    //                     expect(res.statusCode).to.equal(200);
    //                     const resBody = JSON.parse(res.body);
    //                     response = resBody;
    //                     console.log(resBody)
    //                     // // token check
    //                     expect(resBody.code).to.equal(0);
    //                     expect(resBody.message).to.equal("");
    //                     done();
    //                 });
    //         }, 1000);
    //     } catch (e) {
    //         done(e);
    //     }
    // });

});

describe('NewUser → UpdateUserProfile → ChangeUserEmail → ChangeUserDefaultGateway  → GetUserProfile → UserSearch → SuspendUser  => Success', function () {
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


    it('Case 01: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: get user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserProfile(API_Env.get().headerSet,
                    testData["userId"] ,(res, url, header) => {
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
                        testData["updateBody"] = resBody.data.user;
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["email"]);
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.userName).to.equal("");
                        expect(resBody.data.user.address).to.equal("");
                        expect(resBody.data.user.firstName).to.equal("");
                        expect(resBody.data.user.lastName).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: update user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                testData["updateBody"]["userId"] = testData["userId"];
                testData["updateBody"]["firstName"] = "test";
                testData["updateBody"]["lastName"] = "QA";
                testData["updateBody"]["address"] = "test Address";
                testData["updateBody"]["type"] = 1;
                ApiReq.updateUserProfile(API_Env.get().headerSet,
                    testData["updateBody"] ,(res, url, header) => {
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
                        testData["updateBody"] = resBody.data.user;
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["email"]);
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.address).to.equal("test Address");
                        expect(resBody.data.user.firstName).to.equal("test");
                        expect(resBody.data.user.lastName).to.equal("QA");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: change user email => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let newTime = new Date().getTime();
                ApiReq.changeUserEmail(API_Env.get().headerSet,
                    {
                        "userId": testData["userId"],
                        "externalUserId": "",
                        "newEmail": "test" + newTime +"@test.com",
                    } ,(res, url, header) => {
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
                        testData["newEmail"] = "test" + newTime +"@test.com";
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 05: ChangeUserDefaultGateway => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let newTime = new Date().getTime();
                ApiReq.changeUserDefaultGateway(API_Env.get().headerSet,
                    {
                        "userId": testData["userId"],
                        "gatewayId": 40,
                        "paymentMethodId": ""
                    } ,(res, url, header) => {
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

    it('Case 06: get user profile => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserProfile(API_Env.get().headerSet,
                    testData["userId"] ,(res, url, header) => {
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
                        testData["updateBody"] = resBody.data.user;
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect(resBody.data.user.id).to.equal(testData["userId"]);
                        expect(resBody.data.user.email).to.equal(testData["newEmail"]);
                        expect(resBody.data.user.gatewayId).to.equal(40);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 07: user search => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.userSearch(API_Env.get().headerSet,
                    testData["userId"]
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
                        expect(resBody.data.userAccounts[0].id).to.equal(testData["userId"]);
                        expect(resBody.data.userAccounts[0].email).to.equal(testData["newEmail"]);
                        expect(resBody.data.userAccounts[0].gatewayId).to.equal(40);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 08: Suspend user => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.suspendUser(API_Env.get().headerSet,
                    {
                        "userId":testData["userId"]}
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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});

describe('NewUser → NewAdminNote → UserAdminNoteList => Success', function () {
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
                    testData["token"] = resBody.data["token"];
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: new user => Success', (done) => {
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
                        expect(resBody.data.user.merchantId).to.equal(15671);
                        expect(resBody.data.user.email).to.equal("API"+ tmpTime + "@test.com");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: NewAdminNote => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                API_Env.get().headerSet["Authorization"] = testData["token"]
                ApiReq.newAdminNote(API_Env.get().headerSet,{
                    "userId": testData["userId"],
                    "note": "automation test for API"
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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: user Admin note list => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.userAdminNoteList(API_Env.get().headerSet,{
                        "userId": testData["userId"]
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
                        expect(resBody.data.noteLists[0].userId).to.equal(testData["userId"]);
                        expect(resBody.data.noteLists[0].note).to.equal("automation test for API");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});
