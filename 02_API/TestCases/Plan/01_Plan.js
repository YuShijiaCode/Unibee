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

// describe('Create -> edit -> delete=> Success', function () {
//     this.timeout(9000000);
//
//     beforeEach(function () {
//         response = null;
//         addContext(this, {
//             title: 'StartTime', value: {
//                 StartTime: timeStamp = new Date()
//             }
//         });
//     });
//     afterEach(function () {
//         if (response) {
//             addContext(this, {
//                 title: 'Request', value: {
//                     Request: request
//                 }
//             });
//             addContext(this, {
//                 title: 'Response', value: {
//                     Response: response
//                 }
//             });
//         }
//         addContext(this, {
//             title: 'EndTime', value: {
//                 EndTime: timeStamp = new Date()
//             }
//         });
//
//     });
//
//
//     it('Case 01: create plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.createPlan(API_Env.get().headerSet, {
//                     "planName": "auto" + tmpTime,
//                     "description": "test description",
//                     "status": 1,
//                     "publishStatus": 1,
//                     "currency": "EUR",
//                     "amount": 2000,
//                     "intervalUnit": "month",
//                     "intervalCount": 1,
//                     "type": 1,
//                     "addonIds": [],
//                     "trialAmount": 0,
//                     "trialDurationTime": 0,
//                     "trialDemand": "",
//                     "cancelAtTrialEnd": 0,
//                     "metadata": "",
//                     "imageUrl": "http://www.google.com",
//                     "homeUrl": "http://www.google.com",
//                     "productId": 249072,
//                     "metricLimits": []
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     testData["planId"] = resBody.data.plan.id;
//                     testData["planName"] = "auto" + tmpTime;
//                     expect("auto" + tmpTime).to.equal(resBody.data.plan.planName);
//                     expect(2000).to.equal(resBody.data.plan.amount);
//                     expect("EUR").to.equal(resBody.data.plan.currency);
//                     expect("month").to.equal(resBody.data.plan.intervalUnit);
//                     expect(1).to.equal(resBody.data.plan.intervalCount);
//                     expect("test description").to.equal(resBody.data.plan.description);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 02: edit plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.editPlan(API_Env.get().headerSet, {
//                     "planName": testData["planName"],
//                     "description": "test description update",
//                     "externalPlanId": "",
//                     "currency": "EUR",
//                     "amount": 5000,
//                     "intervalUnit": "month",
//                     "intervalCount": 1,
//                     "addonIds": [],
//                     "onetimeAddonIds": [],
//                     "trialAmount": 0,
//                     "trialDurationTime": 0,
//                     "trialDemand": "",
//                     "cancelAtTrialEnd": 0,
//                     "gasPayer": "",
//                     "metadata": null,
//                     "imageUrl": "http://www.google.com",
//                     "homeUrl": "http://www.google.com",
//                     "planId": testData["planId"],
//                     "metricLimits": [],
//                     "productId": 249022
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     expect(5000).to.equal(resBody.data.plan.amount);
//                     expect("EUR").to.equal(resBody.data.plan.currency);
//                     expect("month").to.equal(resBody.data.plan.intervalUnit);
//                     expect(1).to.equal(resBody.data.plan.intervalCount);
//                     expect("test description update").to.equal(resBody.data.plan.description);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 03: delete plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.deletePlan(API_Env.get().headerSet, {
//                     "planId": testData["planId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
// });


    describe('Create -> activate -> publish -> unpublish=> Success', function () {
        this.timeout(9000000);

        beforeEach(function () {
            response = null;
            addContext(this, {
                title: 'StartTime', value: {
                    StartTime: timeStamp = new Date()
                }
            });
        });
        afterEach(function () {
            if (response) {
                addContext(this, {
                    title: 'Request', value: {
                        Request: request
                    }
                });
                addContext(this, {
                    title: 'Response', value: {
                        Response: response
                    }
                });
            }
            addContext(this, {
                title: 'EndTime', value: {
                    EndTime: timeStamp = new Date()
                }
            });

        });

        for(let i =0; i< 250;i++) {
            it('Case 01: create plan => Success', (done) => {
                try {
                    setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                        let tmpTime = new Date().getTime();
                        ApiReq.createPlan(API_Env.get().headerSet, {
                            "planName": "auto" + tmpTime,
                            "description": "test description",
                            "status": 1,
                            "publishStatus": 1,
                            "currency": "EUR",
                            "amount": 2000,
                            "intervalUnit": "month",
                            "intervalCount": 1,
                            "type": 1,
                            "addonIds": [],
                            "trialAmount": 0,
                            "trialDurationTime": 0,
                            "trialDemand": "",
                            "cancelAtTrialEnd": 0,
                            "metadata": "",
                            "imageUrl": "http://www.google.com",
                            "homeUrl": "http://www.google.com",
                            "productId": 249072,
                            "metricLimits": []
                        }, (res, url, header) => {
                            request = {
                                URL: url, Headers: header,

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
                            testData["planId"] = resBody.data.plan.id;
                            testData["planName"] = "auto" + tmpTime;
                            expect("auto" + tmpTime).to.equal(resBody.data.plan.planName);
                            expect(2000).to.equal(resBody.data.plan.amount);
                            expect("EUR").to.equal(resBody.data.plan.currency);
                            expect("month").to.equal(resBody.data.plan.intervalUnit);
                            expect(1).to.equal(resBody.data.plan.intervalCount);
                            expect("test description").to.equal(resBody.data.plan.description);
                            done();
                        });
                    }, 1000);
                } catch (e) {
                    done(e);
                }
            });

            it('Case 02: activate plan => Success', (done) => {
                try {
                    setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                        let tmpTime = new Date().getTime();
                        ApiReq.activatePlan(API_Env.get().headerSet, {
                            "planId": testData["planId"]
                        }, (res, url, header) => {
                            request = {
                                URL: url, Headers: header,

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

            it('Case 03: publish plan => Success', (done) => {
                try {
                    setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                        let tmpTime = new Date().getTime();
                        ApiReq.publishPlan(API_Env.get().headerSet, {
                            "planId": testData["planId"]
                        }, (res, url, header) => {
                            request = {
                                URL: url, Headers: header,

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

        }
        // it('Case 04: get plan list=> Success', (done) => {
        //     try {
        //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
        //             let tmpTime = new Date().getTime();
        //             ApiReq.planList(API_Env.get().headerSet, {
        //                 "productIds": [249022],
        //                 "status": [2],
        //                 "publishStatus": 2,
        //
        //             }, (res, url, header) => {
        //                 request = {
        //                     URL: url, Headers: header,
        //
        //                 };
        //                 // response = res.body;
        //                 // Expect response headers：x-app,Content-Type
        //                 expect(res.statusCode).to.equal(200);
        //                 const resBody = JSON.parse(res.body);
        //                 response = resBody;
        //                 console.log(resBody)
        //                 // // token check
        //                 expect(resBody.code).to.equal(0);
        //                 expect(resBody.message).to.equal("");
        //                 expect(testData["planId"]).to.equal(resBody.data.plans[0].plan.id);
        //                 expect(testData["planName"]).to.equal(resBody.data.plans[0].plan.planName);
        //                 expect(2).to.equal(resBody.data.plans[0].plan.status);
        //                 done();
        //             });
        //         }, 1000);
        //     } catch (e) {
        //         done(e);
        //     }
        // });
        //
        // it('Case 05: unPublish plan => Success', (done) => {
        //     try {
        //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
        //             let tmpTime = new Date().getTime();
        //             ApiReq.unpPublishPlan(API_Env.get().headerSet, {
        //                 "planId": testData["planId"]
        //             }, (res, url, header) => {
        //                 request = {
        //                     URL: url, Headers: header,
        //
        //                 };
        //                 // response = res.body;
        //                 // Expect response headers：x-app,Content-Type
        //                 expect(res.statusCode).to.equal(200);
        //                 const resBody = JSON.parse(res.body);
        //                 response = resBody;
        //                 console.log(resBody)
        //                 // // token check
        //                 expect(resBody.code).to.equal(0);
        //                 expect(resBody.message).to.equal("");
        //                 done();
        //             });
        //         }, 1000);
        //     } catch (e) {
        //         done(e);
        //     }
        // });
        //
        // it('Case 06: get plan detail=> Success', (done) => {
        //     try {
        //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
        //             let tmpTime = new Date().getTime();
        //             ApiReq.getPLanDetail(API_Env.get().headerSet, testData["planId"], (res, url, header) => {
        //                 request = {
        //                     URL: url, Headers: header,
        //
        //                 };
        //                 // response = res.body;
        //                 // Expect response headers：x-app,Content-Type
        //                 expect(res.statusCode).to.equal(200);
        //                 const resBody = JSON.parse(res.body);
        //                 response = resBody;
        //                 console.log(resBody)
        //                 // // token check
        //                 expect(resBody.code).to.equal(0);
        //                 expect(resBody.message).to.equal("");
        //                 expect(testData["planName"]).to.equal(resBody.data.plan.plan.planName);
        //                 expect(1).to.equal(resBody.data.plan.plan.publishStatus);
        //                 done();
        //             });
        //         }, 1000);
        //     } catch (e) {
        //         done(e);
        //     }
        // });

    });

// describe('Create -> activate -> publish -> unpublish=> Success', function () {
//     this.timeout(9000000);
//
//     beforeEach(function () {
//         response = null;
//         addContext(this, {
//             title: 'StartTime', value: {
//                 StartTime: timeStamp = new Date()
//             }
//         });
//     });
//     afterEach(function () {
//         if (response) {
//             addContext(this, {
//                 title: 'Request', value: {
//                     Request: request
//                 }
//             });
//             addContext(this, {
//                 title: 'Response', value: {
//                     Response: response
//                 }
//             });
//         }
//         addContext(this, {
//             title: 'EndTime', value: {
//                 EndTime: timeStamp = new Date()
//             }
//         });
//
//     });
//
//
//     it('Case 01: create plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.createPlan(API_Env.get().headerSet, {
//                     "planName": "auto" + tmpTime,
//                     "description": "test description",
//                     "status": 1,
//                     "publishStatus": 1,
//                     "currency": "EUR",
//                     "amount": 2000,
//                     "intervalUnit": "month",
//                     "intervalCount": 1,
//                     "type": 1,
//                     "addonIds": [],
//                     "trialAmount": 0,
//                     "trialDurationTime": 0,
//                     "trialDemand": "",
//                     "cancelAtTrialEnd": 0,
//                     "metadata": "",
//                     "imageUrl": "http://www.google.com",
//                     "homeUrl": "http://www.google.com",
//                     "productId": 249072,
//                     "metricLimits": []
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     testData["planId"] = resBody.data.plan.id;
//                     testData["planName"] = "auto" + tmpTime;
//                     expect("auto" + tmpTime).to.equal(resBody.data.plan.planName);
//                     expect(2000).to.equal(resBody.data.plan.amount);
//                     expect("EUR").to.equal(resBody.data.plan.currency);
//                     expect("month").to.equal(resBody.data.plan.intervalUnit);
//                     expect(1).to.equal(resBody.data.plan.intervalCount);
//                     expect("test description").to.equal(resBody.data.plan.description);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 02: activate plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.activatePlan(API_Env.get().headerSet, {
//                     "planId": testData["planId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 03: publish plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.publishPlan(API_Env.get().headerSet, {
//                     "planId": testData["planId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     // it('Case 04: get plan list=> Success', (done) => {
//     //     try {
//     //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//     //             let tmpTime = new Date().getTime();
//     //             ApiReq.planList(API_Env.get().headerSet, {
//     //                 "productIds": [249022],
//     //                 "status": [2],
//     //                 "publishStatus": 2,
//     //
//     //             }, (res, url, header) => {
//     //                 request = {
//     //                     URL: url, Headers: header,
//     //
//     //                 };
//     //                 // response = res.body;
//     //                 // Expect response headers：x-app,Content-Type
//     //                 expect(res.statusCode).to.equal(200);
//     //                 const resBody = JSON.parse(res.body);
//     //                 response = resBody;
//     //                 console.log(resBody)
//     //                 // // token check
//     //                 expect(resBody.code).to.equal(0);
//     //                 expect(resBody.message).to.equal("");
//     //                 expect(testData["planId"]).to.equal(resBody.data.plans[0].plan.id);
//     //                 expect(testData["planName"]).to.equal(resBody.data.plans[0].plan.planName);
//     //                 expect(2).to.equal(resBody.data.plans[0].plan.status);
//     //                 done();
//     //             });
//     //         }, 1000);
//     //     } catch (e) {
//     //         done(e);
//     //     }
//     // });
//     //
//     // it('Case 05: unPublish plan => Success', (done) => {
//     //     try {
//     //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//     //             let tmpTime = new Date().getTime();
//     //             ApiReq.unpPublishPlan(API_Env.get().headerSet, {
//     //                 "planId": testData["planId"]
//     //             }, (res, url, header) => {
//     //                 request = {
//     //                     URL: url, Headers: header,
//     //
//     //                 };
//     //                 // response = res.body;
//     //                 // Expect response headers：x-app,Content-Type
//     //                 expect(res.statusCode).to.equal(200);
//     //                 const resBody = JSON.parse(res.body);
//     //                 response = resBody;
//     //                 console.log(resBody)
//     //                 // // token check
//     //                 expect(resBody.code).to.equal(0);
//     //                 expect(resBody.message).to.equal("");
//     //                 done();
//     //             });
//     //         }, 1000);
//     //     } catch (e) {
//     //         done(e);
//     //     }
//     // });
//     //
//     // it('Case 06: get plan detail=> Success', (done) => {
//     //     try {
//     //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//     //             let tmpTime = new Date().getTime();
//     //             ApiReq.getPLanDetail(API_Env.get().headerSet, testData["planId"], (res, url, header) => {
//     //                 request = {
//     //                     URL: url, Headers: header,
//     //
//     //                 };
//     //                 // response = res.body;
//     //                 // Expect response headers：x-app,Content-Type
//     //                 expect(res.statusCode).to.equal(200);
//     //                 const resBody = JSON.parse(res.body);
//     //                 response = resBody;
//     //                 console.log(resBody)
//     //                 // // token check
//     //                 expect(resBody.code).to.equal(0);
//     //                 expect(resBody.message).to.equal("");
//     //                 expect(testData["planName"]).to.equal(resBody.data.plan.plan.planName);
//     //                 expect(1).to.equal(resBody.data.plan.plan.publishStatus);
//     //                 done();
//     //             });
//     //         }, 1000);
//     //     } catch (e) {
//     //         done(e);
//     //     }
//     // });
//
// });
//
// describe('Create with addon and one time payment=> Success', function () {
//     this.timeout(9000000);
//
//     beforeEach(function () {
//         response = null;
//         addContext(this, {
//             title: 'StartTime', value: {
//                 StartTime: timeStamp = new Date()
//             }
//         });
//     });
//     afterEach(function () {
//         if (response) {
//             addContext(this, {
//                 title: 'Request', value: {
//                     Request: request
//                 }
//             });
//             addContext(this, {
//                 title: 'Response', value: {
//                     Response: response
//                 }
//             });
//         }
//         addContext(this, {
//             title: 'EndTime', value: {
//                 EndTime: timeStamp = new Date()
//             }
//         });
//
//     });
//
//
//     it('Case 01: create addon => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.createPlan(API_Env.get().headerSet, {
//                     "planName": "addon" + tmpTime,
//                     "description": "addon description",
//                     "status": 1,
//                     "publishStatus": 1,
//                     "currency": "EUR",
//                     "amount": 1000,
//                     "intervalUnit": "month",
//                     "intervalCount": 1,
//                     "type": 2,
//                     "addonIds": [],
//                     "trialAmount": 0,
//                     "trialDurationTime": 0,
//                     "trialDemand": "",
//                     "cancelAtTrialEnd": 0,
//                     "metadata": "",
//                     "imageUrl": "http://www.google.com",
//                     "homeUrl": "http://www.google.com",
//                     "productId": 249022,
//                     "metricLimits": []
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     testData["addonId"] = resBody.data.plan.id;
//                     testData["addonName"] = "addon" + tmpTime;
//                     expect("addon" + tmpTime).to.equal(resBody.data.plan.planName);
//                     expect(1000).to.equal(resBody.data.plan.amount);
//                     expect("EUR").to.equal(resBody.data.plan.currency);
//                     expect("month").to.equal(resBody.data.plan.intervalUnit);
//                     expect(1).to.equal(resBody.data.plan.intervalCount);
//                     expect("addon description").to.equal(resBody.data.plan.description);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 02: activate plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.activatePlan(API_Env.get().headerSet, {
//                     "planId": testData["addonId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 03: publish plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.publishPlan(API_Env.get().headerSet, {
//                     "planId": testData["addonId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 04: create one time payment => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.createPlan(API_Env.get().headerSet, {
//                     "planName": "one time" + tmpTime,
//                     "description": "one time description",
//                     "status": 1,
//                     "publishStatus": 1,
//                     "currency": "EUR",
//                     "amount": 1000,
//                     "type": 3,
//                     "addonIds": [],
//                     "trialAmount": 0,
//                     "trialDurationTime": 0,
//                     "trialDemand": "",
//                     "cancelAtTrialEnd": 0,
//                     "metadata": "",
//                     "imageUrl": "http://www.google.com",
//                     "homeUrl": "http://www.google.com",
//                     "productId": 249022,
//                     "metricLimits": []
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     testData["oneTimeId"] = resBody.data.plan.id;
//                     testData["oneTimeName"] = "one time" + tmpTime;
//                     expect("one time" + tmpTime).to.equal(resBody.data.plan.planName);
//                     expect(1000).to.equal(resBody.data.plan.amount);
//                     expect("EUR").to.equal(resBody.data.plan.currency);
//                     expect("month").to.equal(resBody.data.plan.intervalUnit);
//                     expect(1).to.equal(resBody.data.plan.intervalCount);
//                     expect("one time description").to.equal(resBody.data.plan.description);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 05: activate plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.activatePlan(API_Env.get().headerSet, {
//                     "planId": testData["oneTimeId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 06: publish plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.publishPlan(API_Env.get().headerSet, {
//                     "planId": testData["oneTimeId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 07: create plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.createPlan(API_Env.get().headerSet, {
//                     "planName": "auto" + tmpTime,
//                     "description": "test description",
//                     "status": 1,
//                     "publishStatus": 1,
//                     "currency": "EUR",
//                     "amount": 2000,
//                     "intervalUnit": "month",
//                     "intervalCount": 1,
//                     "type": 1,
//                     "addonIds": [],
//                     "trialAmount": 0,
//                     "trialDurationTime": 0,
//                     "trialDemand": "",
//                     "cancelAtTrialEnd": 0,
//                     "metadata": "",
//                     "imageUrl": "http://www.google.com",
//                     "homeUrl": "http://www.google.com",
//                     "productId": 249022,
//                     "metricLimits": []
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     testData["planId"] = resBody.data.plan.id;
//                     testData["planName"] = "auto" + tmpTime;
//                     expect("auto" + tmpTime).to.equal(resBody.data.plan.planName);
//                     expect(2000).to.equal(resBody.data.plan.amount);
//                     expect("EUR").to.equal(resBody.data.plan.currency);
//                     expect("month").to.equal(resBody.data.plan.intervalUnit);
//                     expect(1).to.equal(resBody.data.plan.intervalCount);
//                     expect("test description").to.equal(resBody.data.plan.description);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 08: Addon binding => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.addonBinding(API_Env.get().headerSet, {
//                     "planId": testData["planId"],
//                     "action": 1,
//                     "addonIds": [testData["addonId"]],
//                     "onetimeAddonIds": [testData["oneTimeId"]]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     expect(testData["planName"]).to.equal(resBody.data.plan.planName);
//                     expect(2000).to.equal(resBody.data.plan.amount);
//                     expect("EUR").to.equal(resBody.data.plan.currency);
//                     expect("month").to.equal(resBody.data.plan.intervalUnit);
//                     expect(1).to.equal(resBody.data.plan.intervalCount);
//                     expect("test description").to.equal(resBody.data.plan.description);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 09: get plan detail=> Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.getPLanDetail(API_Env.get().headerSet, 452, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     expect(testData["planName"]).to.equal(resBody.data.plan.plan.planName);
//                     expect(testData["planId"]).to.equal(resBody.data.plan.plan.id);
//                     expect(testData["addonId"]).to.equal(resBody.data.plan.plan.bindingAddonIds);
//                     expect(testData["oneTimeId"]).to.equal(resBody.data.plan.plan.bindingOnetimeAddonIds);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 10: unPublish plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.unpPublishPlan(API_Env.get().headerSet, {
//                     "planId": testData["addonId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 11: unPublish plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.unpPublishPlan(API_Env.get().headerSet, {
//                     "planId": testData["oneTimeId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 12: delete plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.deletePlan(API_Env.get().headerSet, {
//                     "planId": testData["planId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
// });
//
// describe('Create -> copy -> delete=> Success', function () {
//     this.timeout(9000000);
//
//     beforeEach(function () {
//         response = null;
//         addContext(this, {
//             title: 'StartTime', value: {
//                 StartTime: timeStamp = new Date()
//             }
//         });
//     });
//     afterEach(function () {
//         if (response) {
//             addContext(this, {
//                 title: 'Request', value: {
//                     Request: request
//                 }
//             });
//             addContext(this, {
//                 title: 'Response', value: {
//                     Response: response
//                 }
//             });
//         }
//         addContext(this, {
//             title: 'EndTime', value: {
//                 EndTime: timeStamp = new Date()
//             }
//         });
//
//     });
//
//
//     it('Case 01: create plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.createPlan(API_Env.get().headerSet, {
//                     "planName": "auto" + tmpTime,
//                     "description": "test description",
//                     "status": 1,
//                     "publishStatus": 1,
//                     "currency": "EUR",
//                     "amount": 2000,
//                     "intervalUnit": "month",
//                     "intervalCount": 1,
//                     "type": 1,
//                     "addonIds": [],
//                     "trialAmount": 0,
//                     "trialDurationTime": 0,
//                     "trialDemand": "",
//                     "cancelAtTrialEnd": 0,
//                     "metadata": "",
//                     "imageUrl": "http://www.google.com",
//                     "homeUrl": "http://www.google.com",
//                     "productId": 249022,
//                     "metricLimits": []
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     testData["planId"] = resBody.data.plan.id;
//                     testData["planName"] = "auto" + tmpTime;
//                     expect("auto" + tmpTime).to.equal(resBody.data.plan.planName);
//                     expect(2000).to.equal(resBody.data.plan.amount);
//                     expect("EUR").to.equal(resBody.data.plan.currency);
//                     expect("month").to.equal(resBody.data.plan.intervalUnit);
//                     expect(1).to.equal(resBody.data.plan.intervalCount);
//                     expect("test description").to.equal(resBody.data.plan.description);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 02: copy plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.copyPlan(API_Env.get().headerSet, {
//                     "planId": testData["planId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//                     testData["copyId"] = resBody.data.plan.id;
//                     expect(testData["planName"] + "(Copy)").to.equal(resBody.data.plan.planName);
//                     expect(2000).to.equal(resBody.data.plan.amount);
//                     expect("EUR").to.equal(resBody.data.plan.currency);
//                     expect("month").to.equal(resBody.data.plan.intervalUnit);
//                     expect(1).to.equal(resBody.data.plan.intervalCount);
//                     expect("test description").to.equal(resBody.data.plan.description);
//                     done();
//                 });
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 03: delete plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.deletePlan(API_Env.get().headerSet, {
//                     "planId": testData["planId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
//     it('Case 04: delete copy plan => Success', (done) => {
//         try {
//             setTimeout(() => {//Wait syncTimeAPI*1000 seconds
//                 let tmpTime = new Date().getTime();
//                 ApiReq.deletePlan(API_Env.get().headerSet, {
//                     "planId": testData["copyId"]
//                 }, (res, url, header) => {
//                     request = {
//                         URL: url, Headers: header,
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
//             }, 1000);
//         } catch (e) {
//             done(e);
//         }
//     });
//
// });
