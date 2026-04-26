let loginPage = require("../../PageObject/LoginPage");

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const driver = require('../../../CommonStep/Web/seleniumWebDriver');
const baseStep = require('../../../CommonStep/Web/Web_Common_Step');

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
const searchBarPage = require("../../PageObject/MerchantSearchBarPage");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/10_logout/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");


describe('case01: Logout in User portal=> Success', function() {
    this.timeout(100000);

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
            }); }
            addContext(this, {
                title: 'EndTime',
                value: {
                    EndTime: timeStamp = new Date()
                }
            });
        
    });

    it('TC001 - Login => Success  ', (done) => {
        (async () => {
            try {
                // login 
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                // await loginPage.openUserUrl(Driver,"http://unibee:123456@testing.unibee.top/");
                await loginPage.openUserUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email,20000);
                await baseStep.input(Driver,  loginPage.user_email, "joshua.yu@wowow.io");
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver,loginPage.user_password, 'Aa@666666');
                await baseStep.wait(Driver, 2000);
                await baseStep.screenShot(Driver,savaPath + '/01_login.jpeg');
                await baseStep.click(Driver, loginPage.submitBtn);
                await baseStep.wait(Driver, 2000);
                await baseStep.screenShot(Driver,savaPath + '/02_Menu.jpeg');
                await baseStep.wait(Driver, 2000);

                await baseStep.click(Driver, loginPage.logout_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + '/02_Logout.jpeg');
                expect(await loginPage.user_email).to.be.exist
                done();
            }
            catch (e) {
                done(e);
            }finally {
                Driver.quit();
            }
        })();
    });

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

});









