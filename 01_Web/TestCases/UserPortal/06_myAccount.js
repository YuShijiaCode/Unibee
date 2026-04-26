let loginPage = require("../../PageObject/LoginPage");
let userMyAccount = require("../../PageObject/UserMyAccountPage");
let userPlanPage = require("../../PageObject/UserPlanPage");
let userMySubPage = require("../../PageObject/UserMySubPage");
let userInvoicePage = require("../../PageObject/UserInvoicePage")
let userTransactionPage = require("../../PageObject/UserTransactionPage")
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
const merchantInvoicePage = require("../../PageObject/MerchantInvoicePage");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/06_User_my_account/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");
let testData = [];
let testUser = "joshua.yu@wowow.io";
describe('TS001: Update account info=> Success', function() {
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


    it('case 01 -update account info => Success  ', (done) => {
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

                await baseStep.click(Driver, userMyAccount.menu_my_account);
                await baseStep.inputWithClear(Driver, userMyAccount.billing_address, "billing address" + new Date().getTime());
                await baseStep.inputWithClear(Driver, userMyAccount.company_name, "test company");
                await baseStep.scrollIntoView(Driver, userMyAccount.Save_btn);
                await baseStep.click(Driver,userMyAccount.Save_btn);
                await baseStep.wait(Driver, 10000);
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











