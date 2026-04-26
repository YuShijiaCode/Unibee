let loginPage = require("../../PageObject/LoginPage");
let merchantSubPage = require("../../PageObject/MerchantSubscriptionPage");
let merchantInvoicePage = require("../../PageObject/MerchantInvoicePage");
let merchantTransactionPage = require("../../PageObject/MerchantTransactionPage");
let userPlanPage = require("../../PageObject/UserPlanPage");
const urlencoded = require('urlencode');

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const driver = require('../../../CommonStep/Web/seleniumWebDriver');
const baseStep = require('../../../CommonStep/Web/Web_Common_Step');

const API_Object = require("../../../CommonStep/API/API_Object");
const API_Env = require("../../../CommonStep/API/API_Env");
const ApiReq = new API_Object("http://localhost:8088");

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
const {wait} = require("../../../CommonStep/Web/Web_Common_Step");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/03_one_time_payment/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");
let testData = [];
let testUser = "joshua.yu@wowow.io";

describe('Purchase one time addon with credit card=> Success', function() {
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
            addContext(this, {
                title: 'EndTime',
                value: {
                    EndTime: timeStamp = new Date()
                }
            });
        }
    });


    it('TC001 - user purchase a plan => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver, );
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email,20000);
                await loginPage.loginUserPortal(Driver,testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userPlanPage.menu_plan);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign,20000);
                await baseStep.click(Driver, userPlanPage.one_time_addons_tab)
                // no content
                await userPlanPage.selectPlan(Driver, 'one time payment');
                await baseStep.click(Driver, userPlanPage.one_time_OK_btn);
                await baseStep.wait(Driver,1000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn,20000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver,userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver,userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver,1000);
                await baseStep.input(Driver,userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver,3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver,userPlanPage.payment_success_sign,20000);
                let actual_success_text = await  baseStep.getText(Driver,userPlanPage.payment_success_sign)
                await expect("Payment succeeded!").to.equal(actual_success_text)
                await baseStep.wait(Driver,30000);
                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

});









