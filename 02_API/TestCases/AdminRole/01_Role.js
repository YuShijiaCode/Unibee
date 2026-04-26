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

describe('Create → Get -> Edit-> Get->Delete => Success', function () {
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


    it('Case 01: create role => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.createRole(API_Env.get().headerSet,
                    {
                        "role": "autorole",
                        "permissions": [
                                {
                                    "group": "plan",
                                    "permissions": [
                                        "access"
                                    ]
                                },
                                {
                                    "group": "billable-metric",
                                    "permissions": [
                                        "access"
                                    ]
                                },
                                {
                                    "group": "discount-code",
                                    "permissions": [
                                        "access"
                                    ]
                                }
                        ]
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

    it('Case 02: get role list=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getRoleList(API_Env.get().headerSet,
                    (res, url, header) => {
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
                        let roleArray = resBody.data.merchantRoles;
                        for (let role of roleArray){
                            if(role.role === "autorole"){
                                testData["roleId"] = role.id;
                                expect(3).to.equal(role.permissions.length);
                                expect(role.permissions[0].group).to.equal("plan");
                                expect(role.permissions[1].group).to.equal("billable-metric");
                                expect(role.permissions[2].group).to.equal("discount-code");
                                break;
                            }
                        }
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Edit role => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.editRole(API_Env.get().headerSet,
                    {
                        "id":  testData["roleId"],
                        "role": "autorole",
                        "permissions": [
                            {
                                "group": "plan",
                                "permissions": [
                                    "access"
                                ]
                            },
                            {
                                "group": "billable-metric",
                                "permissions": [
                                    "access"
                                ]
                            },
                            {
                                "group": "discount-code",
                                "permissions": [
                                    "access"
                                ]
                            },
                            {
                                "group": "report",
                                "permissions": [
                                    "access"
                                ]
                            }
                        ]
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

    it('Case 04: get role list=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getRoleList(API_Env.get().headerSet,
                    (res, url, header) => {
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
                        let roleArray = resBody.data.merchantRoles;
                        for (let role of roleArray){
                            if(role.role === "autorole"){
                                expect(role.role).to.equal("autorole");
                                expect(4).to.equal(role.permissions.length);
                                expect(role.permissions[0].group).to.equal("plan");
                                expect(role.permissions[1].group).to.equal("billable-metric");
                                expect(role.permissions[2].group).to.equal("discount-code");
                                expect(role.permissions[3].group).to.equal("report");
                                break;
                            }
                        }
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 05: Delete role => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteRole(API_Env.get().headerSet,
                    {
                        "id":  testData["roleId"]
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

