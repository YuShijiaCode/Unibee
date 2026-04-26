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

describe('Create → Delete => Success', function () {
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


    it('Case 01: create product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.createProduct(API_Env.get().headerSet,
                    {
                        "productName": "auto product",
                        "description": "product for automation test",
                        "imageUrl": "string",
                        "homeUrl": "string",
                        "status": 0,
                        "metadata": {
                            "property1": {},
                            "property2": {}
                        }
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
                        testData["id"] = resBody.data["product"].id;
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Delete first product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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


});

describe('Create → Edit → Delete => Success', function () {
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


    it('Case 01: create product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.createProduct(API_Env.get().headerSet,
                    {
                        "productName": "auto product",
                        "description": "product for automation test",
                        "imageUrl": "string",
                        "homeUrl": "string",
                        "status": 0,
                        "metadata": {
                            "property1": {},
                            "property2": {}
                        }
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
                        testData["id"] = resBody.data["product"].id;
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Edit product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.editProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"],
                        "productName": "auto product update",
                        "description": "product for automation test update",
                        "imageUrl": "string",
                        "homeUrl": "string",
                        "status": 1,
                        "metadata": {
                            "property1": {},
                            "property2": {}
                        }
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
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product update");
                        expect(resBody.data["product"].description).to.equal("product for automation test update");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Delete first product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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


});

describe('Create → Copy → Delete => Success', function () {
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


    it('Case 01: create product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.createProduct(API_Env.get().headerSet,
                    {
                        "productName": "auto product",
                        "description": "product for automation test",
                        "imageUrl": "string",
                        "homeUrl": "string",
                        "status": 0,
                        "metadata": {
                            "property1": {},
                            "property2": {}
                        }
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
                        testData["id"] = resBody.data["product"].id;
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


    it('Case 02: Copy product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.copyProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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
                        testData["copyId"] = resBody.data["product"].id;
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product(Copy)");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


    it('Case 03: Delete first product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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

    it('Case 04: Delete second product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["copyId"]
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


});

describe('Create → Edit → Copy →Delete => Success', function () {
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


    it('Case 01: create product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.createProduct(API_Env.get().headerSet,
                    {
                        "productName": "auto product",
                        "description": "product for automation test",
                        "imageUrl": "string",
                        "homeUrl": "string",
                        "status": 0,
                        "metadata": {
                            "property1": {},
                            "property2": {}
                        }
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
                        testData["id"] = resBody.data["product"].id;
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Edit product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.editProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"],
                        "productName": "auto product update",
                        "description": "product for automation test update",
                        "imageUrl": "string",
                        "homeUrl": "string",
                        "status": 1,
                        "metadata": {
                            "property1": {},
                            "property2": {}
                        }
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
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product update");
                        expect(resBody.data["product"].description).to.equal("product for automation test update");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Copy product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.copyProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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
                        testData["copyId"] = resBody.data["product"].id;
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product update(Copy)");
                        expect(resBody.data["product"].description).to.equal("product for automation test update");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: Delete first product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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

    it('Case 05: Delete second product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["copyId"]
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


});

describe('Create  → Inactivate → Product Detail → Activate → Product Detail → delete => Success', function () {
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


    it('Case 01: create product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.createProduct(API_Env.get().headerSet,
                    {
                        "productName": "auto product",
                        "description": "product for automation test",
                        "imageUrl": "string",
                        "homeUrl": "string",
                        "status": 0,
                        "metadata": {
                            "property1": {},
                            "property2": {}
                        }
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
                        testData["id"] = resBody.data["product"].id;
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: inactivate product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.inactivateProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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

    it('Case 03: get product detail, status = 2=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getProductDetail(API_Env.get().headerSet,
                    testData["id"]
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
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(2);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: activate product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.activateProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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

    it('Case 05: get product detail, status = 1 => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getProductDetail(API_Env.get().headerSet,
                    testData["id"]
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
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 06: Delete first product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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


});

describe('Create  → Inactivate →  Product Detail  → Activate → Product Detail → Edit → Copy → Product List → delete first product → delete copied product => Success', function () {
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


    it('Case 01: create product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.createProduct(API_Env.get().headerSet,
                    {
                        "productName": "auto product",
                        "description": "product for automation test",
                        "imageUrl": "string",
                        "homeUrl": "string",
                        "status": 0,
                        "metadata": {
                            "property1": {},
                            "property2": {}
                        }
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
                        testData["id"] = resBody.data["product"].id;
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: inactivate product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.inactivateProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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

    it('Case 03: get product detail, status = 2=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getProductDetail(API_Env.get().headerSet,
                    testData["id"]
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
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(2);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: activate product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.activateProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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

    it('Case 05: get product detail, status = 1 => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getProductDetail(API_Env.get().headerSet,
                    testData["id"]
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
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product");
                        expect(resBody.data["product"].description).to.equal("product for automation test");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 06: Edit product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.editProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"],
                        "productName": "auto product update",
                        "description": "product for automation test update",
                        "imageUrl": "string",
                        "homeUrl": "string",
                        "status": 1,
                        "metadata": {
                            "property1": {},
                            "property2": {}
                        }
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
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product update");
                        expect(resBody.data["product"].description).to.equal("product for automation test update");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 07: Copy product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.copyProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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
                        testData["copyId"] = resBody.data["product"].id;
                        expect(resBody.data["product"].merchantId).to.equal(15671);
                        expect(resBody.data["product"].productName).to.equal("auto product update(Copy)");
                        expect(resBody.data["product"].description).to.equal("product for automation test update");
                        expect(resBody.data["product"].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 08: get product List, => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getProductList(API_Env.get().headerSet,
                    {}
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
                        expect(resBody.data["products"][1].id).to.equal(testData["copyId"]);
                        expect(resBody.data["products"][1].merchantId).to.equal(15671);
                        expect(resBody.data["products"][1].productName).to.equal("auto product update(Copy)");
                        expect(resBody.data["products"][1].description).to.equal("product for automation test update");
                        expect(resBody.data["products"][1].status).to.equal(1);
                        expect(resBody.data["products"][2].id).to.equal(testData["id"]);
                        expect(resBody.data["products"][2].merchantId).to.equal(15671);
                        expect(resBody.data["products"][2].productName).to.equal("auto product update");
                        expect(resBody.data["products"][2].description).to.equal("product for automation test update");
                        expect(resBody.data["products"][2].status).to.equal(1);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 09: Delete first product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["id"]
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

    it('Case 10: Delete second product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": testData["copyId"]
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


});

describe('Delete a product with plans => Success', function () {
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



    it('Case 01: Delete product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": 248970
                    },(res, url, header) => {
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
                        // // token check
                        expect(resBody.code).to.equal(51);
                        expect(resBody.message).to.equal("product can not delete while has plan linked");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });



});

describe('Delete default product => Success', function () {
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



    it('Case 01: Delete default product => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteProduct(API_Env.get().headerSet,
                    {
                        "productId": 0
                    },(res, url, header) => {
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
                        // // token check
                        expect(resBody.code).to.equal(51);
                        expect(resBody.message).to.equal("Can't delete default product");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });



});
