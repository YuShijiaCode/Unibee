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


let count = 20 ;

describe('new event => Success', function () {
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

for(let i = 0; i< count; i++){
    it('Case 01: new event => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                console.log(randomNumber);
                API_Env.get().headerSet.Authorization =
                    "Bearer " + "ub_test_1T7ROhjb719Yoha5L3VeR657m1BJDae1";

                let num =new Date().getDay().toString()+new Date().getHours().toString()+new Date().getMinutes().toString()+new Date().getSeconds().toString();
                ApiReq.newMetricEvent(API_Env.get().headerSet,
                    {
                        "metricCode": "LMsum",
                        "externalEventId": num,
                        "externalUserId": "",
                        "email": "joshua.yu+920@wowow.io",
                        "userId": 2235429568,
                        "metricProperties": {
                            "test": 100
                        },
                        "aggregationValue": 100,
                        "aggregationUniqueId": "0001",
                        "productId": 248976
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
                        console.log("Used: " + resBody.data.merchantMetricEvent.used);
                        console.log("totalChargeAmount: " + resBody.data.merchantMetricEvent.eventCharge.totalChargeAmount);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });
}


});


