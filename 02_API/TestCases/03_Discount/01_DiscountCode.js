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

describe('Create  → delete=> Success', function () {
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


    it('Case 01: New discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.newDiscountCode(API_Env.get().headerSet,
                    {
                        "name":"auto"+tmpTime,
                        "code":"auto"+tmpTime,
                        "billingType":1,
                        "discountType":1,
                        "quantity":0,
                        "discountPercentage":5000,
                        "cycleLimit":1,
                        "planIds":[],
                        "startTime":new Date().getTime()/1000,
                        "endTime":new Date(new Date().getTime()+3600*1000).getTime()/1000
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
                        expect(resBody.data.token).not.null;
                        testData["id"] = resBody.data.discount.id;
                        testData["name"] = resBody.data.discount.name;
                        testData["code"] = resBody.data.discount.code;
                        testData["discountBody"] = resBody.data.discount;
                        expect(1).to.equal(resBody.data.discount.status);
                        expect(1).to.equal(resBody.data.discount.billingType);
                        expect(1).to.equal(resBody.data.discount.discountType);
                        expect(0).to.equal(resBody.data.discount.discountAmount);
                        expect(5000).to.equal(resBody.data.discount.discountPercentage);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: delete discount => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.deleteDiscount(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


});

describe('Create  → Edit → delete=> Success', function () {
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


    it('Case 01: New discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.newDiscountCode(API_Env.get().headerSet,
                    {
                        "name":"auto"+tmpTime,
                        "code":"auto"+tmpTime,
                        "billingType":1,
                        "discountType":1,
                        "quantity":0,
                        "discountPercentage":5000,
                        "cycleLimit":1,
                        "planIds":[],
                        "startTime":new Date().getTime()/1000,
                        "endTime":new Date(new Date().getTime()+3600*1000).getTime()/1000
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
                        expect(resBody.data.token).not.null;
                        testData["id"] = resBody.data.discount.id;
                        testData["name"] = resBody.data.discount.name;
                        testData["code"] = resBody.data.discount.code;
                        testData["discountBody"] = resBody.data.discount;
                        expect(1).to.equal(resBody.data.discount.status);
                        expect(1).to.equal(resBody.data.discount.billingType);
                        expect(1).to.equal(resBody.data.discount.discountType);
                        expect(0).to.equal(resBody.data.discount.discountAmount);
                        expect(5000).to.equal(resBody.data.discount.discountPercentage);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Edit discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                testData["discountBody"].quantity = 20
                ApiReq.editDiscountCode(API_Env.get().headerSet,
                    testData["discountBody"],(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: delete discount => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.deleteDiscount(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


});

describe('Create  → Edit → ActivateDiscountCode → DeactivateDiscountCode → delete=> Success', function () {
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


    it('Case 01: New discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.newDiscountCode(API_Env.get().headerSet,
                    {
                        "name":"auto"+tmpTime,
                        "code":"auto"+tmpTime,
                        "billingType":1,
                        "discountType":1,
                        "quantity":0,
                        "discountPercentage":5000,
                        "cycleLimit":1,
                        "planIds":[],
                        "startTime":new Date().getTime()/1000,
                        "endTime":new Date(new Date().getTime()+3600*1000).getTime()/1000
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
                        expect(resBody.data.token).not.null;
                        testData["id"] = resBody.data.discount.id;
                        testData["name"] = resBody.data.discount.name;
                        testData["code"] = resBody.data.discount.code;
                        testData["discountBody"] = resBody.data.discount;
                        expect(1).to.equal(resBody.data.discount.status);
                        expect(1).to.equal(resBody.data.discount.billingType);
                        expect(1).to.equal(resBody.data.discount.discountType);
                        expect(0).to.equal(resBody.data.discount.discountAmount);
                        expect(5000).to.equal(resBody.data.discount.discountPercentage);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Edit discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                testData["discountBody"].quantity = 20
                ApiReq.editDiscountCode(API_Env.get().headerSet,
                    testData["discountBody"],(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Activate discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.activateDiscountCode(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: Deactivate discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                testData["discountBody"].quantity = 20
                ApiReq.deactivateDiscountCode(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 05: delete discount => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.deleteDiscount(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


});

describe('Create  → Edit → plan apply preview → activate → delete=> Success', function () {
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


    it('Case 01: New discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.newDiscountCode(API_Env.get().headerSet,
                    {
                        "name":"auto"+tmpTime,
                        "code":"auto"+tmpTime,
                        "billingType":1,
                        "discountType":1,
                        "quantity":0,
                        "discountPercentage":5000,
                        "cycleLimit":1,
                        "planIds":[],
                        "startTime":new Date().getTime()/1000,
                        "endTime":new Date(new Date().getTime()+3600*1000).getTime()/1000
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
                        expect(resBody.data.token).not.null;
                        testData["id"] = resBody.data.discount.id;
                        testData["name"] = resBody.data.discount.name;
                        testData["code"] = resBody.data.discount.code;
                        testData["discountBody"] = resBody.data.discount;
                        expect(1).to.equal(resBody.data.discount.status);
                        expect(1).to.equal(resBody.data.discount.billingType);
                        expect(1).to.equal(resBody.data.discount.discountType);
                        expect(0).to.equal(resBody.data.discount.discountAmount);
                        expect(5000).to.equal(resBody.data.discount.discountPercentage);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Edit discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                testData["discountBody"].quantity = 20
                ApiReq.editDiscountCode(API_Env.get().headerSet,
                    testData["discountBody"],(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Activate discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.activateDiscountCode(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: plan apply preview => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.planApplyPreview(API_Env.get().headerSet,
                    {
                        "code": testData["code"],
                        "planId": 248
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
                        expect(resBody.data.valid).to.equal(true);
                        expect(resBody.data.discountAmount).to.equal(1000);
                        expect(resBody.data.discountCode.id).to.equal(testData["id"]);
                        expect(resBody.data.discountCode.code).to.equal(testData["code"]);
                        expect(resBody.data.discountCode.quantity).to.equal(20);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 05: delete discount => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.deleteDiscount(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


});

describe('Create  → QuantityIncrement → QuantityDecrement → activate → delete=> Success', function () {
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


    it('Case 01: New discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.newDiscountCode(API_Env.get().headerSet,
                    {
                        "name":"auto"+tmpTime,
                        "code":"auto"+tmpTime,
                        "billingType":1,
                        "discountType":1,
                        "quantity":0,
                        "discountPercentage":5000,
                        "cycleLimit":1,
                        "planIds":[],
                        "startTime":new Date().getTime()/1000,
                        "endTime":new Date(new Date().getTime()+3600*1000).getTime()/1000
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
                        expect(resBody.data.token).not.null;
                        testData["id"] = resBody.data.discount.id;
                        testData["name"] = resBody.data.discount.name;
                        testData["code"] = resBody.data.discount.code;
                        testData["discountBody"] = resBody.data.discount;
                        expect(1).to.equal(resBody.data.discount.status);
                        expect(1).to.equal(resBody.data.discount.billingType);
                        expect(1).to.equal(resBody.data.discount.discountType);
                        expect(0).to.equal(resBody.data.discount.discountAmount);
                        expect(5000).to.equal(resBody.data.discount.discountPercentage);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Quantity Increment => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.quantityIncrement(API_Env.get().headerSet,
                    {"id": testData["id"],
                        "amount": 10},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Quantity Decrement => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.quantityDecrement(API_Env.get().headerSet,
                    {"id": testData["id"],
                        "amount": 5},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: delete discount => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.deleteDiscount(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


});

describe('Create  → Merchant Discount Detail → DiscountCodeList → delete=> Success', function () {
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


    it('Case 01: New discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.newDiscountCode(API_Env.get().headerSet,
                    {
                        "name":"auto"+tmpTime,
                        "code":"auto"+tmpTime,
                        "billingType":1,
                        "discountType":1,
                        "quantity":0,
                        "discountPercentage":5000,
                        "cycleLimit":1,
                        "planIds":[],
                        "startTime":new Date().getTime()/1000,
                        "endTime":new Date(new Date().getTime()+3600*1000).getTime()/1000
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
                        expect(resBody.data.token).not.null;
                        testData["id"] = resBody.data.discount.id;
                        testData["name"] = resBody.data.discount.name;
                        testData["code"] = resBody.data.discount.code;
                        testData["discountBody"] = resBody.data.discount;
                        expect(1).to.equal(resBody.data.discount.status);
                        expect(1).to.equal(resBody.data.discount.billingType);
                        expect(1).to.equal(resBody.data.discount.discountType);
                        expect(0).to.equal(resBody.data.discount.discountAmount);
                        expect(5000).to.equal(resBody.data.discount.discountPercentage);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Get Merchant Discount Detail => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getMerchantDiscountDetail(API_Env.get().headerSet,
                    testData["id"],(res, url, header) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Get Discount list => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getDiscountCodeList(API_Env.get().headerSet,
                    {"page": 0,
                        "count": 1},(res, url, header) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: delete discount => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.deleteDiscount(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


});

describe('Create  → Edit → ActivateDiscountCode → QuantityIncrement → QuantityDecrement → Merchant Discount Detail → DiscountCodeList→ plan apply preview→ DeactivateDiscountCode → delete=> Success', function () {
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


    it('Case 01: New discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.newDiscountCode(API_Env.get().headerSet,
                    {
                        "name":"auto"+tmpTime,
                        "code":"auto"+tmpTime,
                        "billingType":1,
                        "discountType":1,
                        "quantity":0,
                        "discountPercentage":5000,
                        "cycleLimit":1,
                        "planIds":[],
                        "startTime":new Date().getTime()/1000,
                        "endTime":new Date(new Date().getTime()+3600*1000).getTime()/1000
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
                        expect(resBody.data.token).not.null;
                        testData["id"] = resBody.data.discount.id;
                        testData["name"] = resBody.data.discount.name;
                        testData["code"] = resBody.data.discount.code;
                        testData["discountBody"] = resBody.data.discount;
                        expect(1).to.equal(resBody.data.discount.status);
                        expect(1).to.equal(resBody.data.discount.billingType);
                        expect(1).to.equal(resBody.data.discount.discountType);
                        expect(0).to.equal(resBody.data.discount.discountAmount);
                        expect(5000).to.equal(resBody.data.discount.discountPercentage);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Edit discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                testData["discountBody"].quantity = 20
                ApiReq.editDiscountCode(API_Env.get().headerSet,
                    testData["discountBody"],(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Activate discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.activateDiscountCode(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: Quantity Increment => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.quantityIncrement(API_Env.get().headerSet,
                    {"id": testData["id"],
                        "amount": 10},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 05: Quantity Decrement => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.quantityDecrement(API_Env.get().headerSet,
                    {"id": testData["id"],
                        "amount": 15},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 06: Get Merchant Discount Detail => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getMerchantDiscountDetail(API_Env.get().headerSet,
                    testData["id"],(res, url, header) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 07: Get Discount list => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getDiscountCodeList(API_Env.get().headerSet,
                    {"page": 0,
                        "count": 1},(res, url, header) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 08: Get User Discount list => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserDiscountCodeList(API_Env.get().headerSet,
                    15836,(res, url, header) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 09: plan apply preview => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.planApplyPreview(API_Env.get().headerSet,
                    {
                        "code": testData["code"],
                        "planId": 248
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
                        expect(resBody.data.valid).to.equal(true);
                        expect(resBody.data.discountAmount).to.equal(1000);
                        expect(resBody.data.discountCode.id).to.equal(testData["id"]);
                        expect(resBody.data.discountCode.code).to.equal(testData["code"]);
                        expect(resBody.data.discountCode.quantity).to.equal(15);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 10: Deactivate discount code => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                testData["discountBody"].quantity = 20
                ApiReq.deactivateDiscountCode(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 11: delete discount => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.deleteDiscount(API_Env.get().headerSet,
                    {"id": testData["id"]},(res, url, header, bodyObject) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


});

describe('UserDiscountCodeList=> Success', function () {
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



    it('Case 01: Get User Discount list => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.getUserDiscountCodeList(API_Env.get().headerSet,
                    15836,(res, url, header) => {
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
                        expect(resBody.data.token).not.null;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });



});

