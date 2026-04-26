let loginPage = require("../../PageObject/LoginPage");
let userPlanPage = require("../../PageObject/UserPlanPage");
let subPage = require("../../PageObject/MerchantSubscriptionPage");
let userListPage = require("../../PageObject/MerchantUserListPage")
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
const discountCodePage = require("../../PageObject/MerchantDiscountCodePage");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/09_user_list/" + baseStep.getDateFormat(new Date(), "YYYY-MM-DD_HH:mm:ss");
let testData = [];
let testUser = "joshua.yu@wowow.io";
describe('case01: add user in user list and suspend=> Success', function () {
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


    it('case 01 - add a new user => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.add_new_btn);
                await baseStep.wait(Driver, 2000);
                let time = new Date().getTime();
                await baseStep.input(Driver, userListPage.new_email, "Auto" + time + "@test.com");
                await baseStep.input(Driver, userListPage.new_ex_user_id, time);
                await baseStep.input(Driver, userListPage.new_first_name, "Testing");
                await baseStep.input(Driver, userListPage.new_last_name, "QA" + time);
                await baseStep.input(Driver, userListPage.new_phone, "15642543250");
                await baseStep.input(Driver, userListPage.new_address, "Test Address");
                await baseStep.screenShot(Driver, savaPath + "/01_add_user.png");
                await baseStep.click(Driver, userListPage.new_OK_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + "/02_user_list.png");
                await userListPage.checkRecordUserList(Driver, "Testing QA" + time, "Auto" + time + "@test.com", "Active");
                await baseStep.scrollIntoView(Driver, userListPage.suspend_btn);
                await baseStep.click(Driver, userListPage.suspend_btn);
                await baseStep.screenShot(Driver, savaPath + "/03_suspend_user.png");
                await baseStep.click(Driver, userListPage.suspend_confirm_btn);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.screenShot(Driver, savaPath + "/04_suspend_result.png");
                await userListPage.checkRecordUserList(Driver, "Testing QA" + time, "Auto" + time + "@test.com", "Suspended");
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case02: Assign subscription in user list=> Success', function () {
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


    it('case 01 - Assign a sub => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.add_new_btn);
                await baseStep.wait(Driver, 2000);
                let time = new Date().getTime();
                await baseStep.input(Driver, userListPage.new_email, "Auto" + time + "@test.com");
                await baseStep.input(Driver, userListPage.new_ex_user_id, time);
                await baseStep.input(Driver, userListPage.new_first_name, "Testing");
                await baseStep.input(Driver, userListPage.new_last_name, "QA" + time);
                await baseStep.input(Driver, userListPage.new_phone, "15642543250");
                await baseStep.input(Driver, userListPage.new_address, "Test Address");
                await baseStep.screenShot(Driver, savaPath + "/05_add_user.png");
                await baseStep.click(Driver, userListPage.new_OK_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + "/06_user_list.png");
                await userListPage.checkRecordUserList(Driver, "Testing QA" + time, "Auto" + time + "@test.com", "Active");
                await baseStep.click(Driver, userListPage.subscription_tab);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.assign_sub_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.selectTargetPlan(Driver, "Month Plan");
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + "/07_assign_sub.png");
                await baseStep.click(Driver, userListPage.assign_OK_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.screenShot(Driver, savaPath + "/08_assign_result.png");
                await baseStep.compareText(Driver, userListPage.current_plan, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_plan_des, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_status, "Incomplete");
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case03: filter an user in user list=> Success', function () {
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


    it('case 01 - filter an user => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver, userListPage.filter_first_name, "Joshua");
                await baseStep.input(Driver, userListPage.filter_last_name, "Yu");
                await baseStep.input(Driver, userListPage.filter_email, testUser);
                await baseStep.click(Driver, userListPage.search_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + "/05_filter_result.png");
                await userListPage.checkRecordUserList(Driver, "Joshua Yu", testUser, "Active");
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case04: click sub id in user list=> Success', function () {
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


    it('case 01 - click sub id => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver, userListPage.filter_first_name, "Joshua");
                await baseStep.input(Driver, userListPage.filter_last_name, "Yu");
                await baseStep.input(Driver, userListPage.filter_email, testUser);
                await baseStep.click(Driver, userListPage.search_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.sub_id_link);
                await baseStep.screenShot(Driver, savaPath + "/06_link_page.png");
                await expect(await baseStep.getText(Driver, subPage.sub_plan)).to.not.null;


                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case05: Edit user in user list=> Success', function () {
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


    it('case 01 - edit an user => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver, userListPage.filter_first_name, "Joshua");
                await baseStep.input(Driver, userListPage.filter_last_name, "Yu");
                await baseStep.input(Driver, userListPage.filter_email, testUser);
                await baseStep.click(Driver, userListPage.search_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "Joshua Yu", testUser, "Active");
                await baseStep.inputWithClear(Driver, userListPage.account_billing_address, "update address" + new Date().getTime());
                await baseStep.screenShot(Driver, savaPath + "/07_Edit_result.png");
                await baseStep.scrollIntoView(Driver, userListPage.save_btn);
                await baseStep.click(Driver, userListPage.save_btn);
                await baseStep.wait(Driver, 1000);
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case06: change payment method in user list=> Success', function () {
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


    it('case 01 - change payment method => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver, userListPage.filter_first_name, "Joshua");
                await baseStep.input(Driver, userListPage.filter_last_name, "Yu");
                await baseStep.input(Driver, userListPage.filter_email, testUser);
                await baseStep.click(Driver, userListPage.search_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "Joshua Yu", testUser, "Active");
                await baseStep.scrollIntoView(Driver, userListPage.account_payment_wire_transfer);
                await baseStep.click(Driver,userListPage.account_payment_wire_transfer);
                await baseStep.screenShot(Driver, savaPath + "/08_payment_wire_transfer.png");
                await baseStep.scrollIntoView(Driver, userListPage.save_btn);
                await baseStep.click(Driver, userListPage.save_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.scrollUp(Driver, userListPage.account_payment_changelly);
                await baseStep.click(Driver, userListPage.account_payment_changelly);
                await baseStep.screenShot(Driver, savaPath + "/09_payment_crypto.png");
                await baseStep.scrollIntoView(Driver, userListPage.save_btn);
                await baseStep.click(Driver, userListPage.save_btn);

                await baseStep.wait(Driver, 3000);

                await baseStep.scrollUp(Driver, userListPage.account_payment_stripe);
                await baseStep.click(Driver, userListPage.account_payment_stripe);
                await baseStep.screenShot(Driver, savaPath + "/10_payment_stripe.png");
                await baseStep.scrollIntoView(Driver, userListPage.save_btn);
                await baseStep.click(Driver, userListPage.save_btn);

                await baseStep.wait(Driver, 3000);
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case07: Wrong vat number in user list=> Success', function () {
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


    it('case 01 - wrong vat number => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver, userListPage.filter_first_name, "Joshua");
                await baseStep.input(Driver, userListPage.filter_last_name, "Yu");
                await baseStep.input(Driver, userListPage.filter_email, testUser);
                await baseStep.click(Driver, userListPage.search_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "Joshua Yu", testUser, "Active");


                await baseStep.scrollIntoView(Driver, userListPage.account_vat_number);
                await baseStep.input(Driver, userListPage.account_vat_number, "123456789")

                await baseStep.screenShot(Driver, savaPath + "/11_wrong_vat_number.png");
                await baseStep.scrollIntoView(Driver, userListPage.save_btn);
                await baseStep.click(Driver, userListPage.save_btn);

                expect(await baseStep.getText(Driver, userListPage.vat_error_message)).not.null
                await baseStep.wait(Driver, 3000);
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case08:Set country and vat number in user list=> Success', function () {
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


    it('case 01 -  vat number and country=> Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver, userListPage.filter_first_name, "Joshua");
                await baseStep.input(Driver, userListPage.filter_last_name, "Yu");
                await baseStep.input(Driver, userListPage.filter_email, testUser);
                await baseStep.click(Driver, userListPage.search_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "Joshua Yu", testUser, "Active");


                await baseStep.scrollIntoView(Driver, userListPage.account_vat_number);
                await userListPage.setCountry(Driver,"United Kingdom");
                await baseStep.input(Driver, userListPage.account_vat_number, "GB288305674")

                await baseStep.screenShot(Driver, savaPath + "/12_vat_number_country.png");
                await baseStep.scrollIntoView(Driver, userListPage.save_btn);
                await baseStep.click(Driver, userListPage.save_btn);
                await baseStep.wait(Driver, 1000);
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case09: set wrong country in user list=> Success', function () {
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


    it('case 01 - wrong country => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver, userListPage.filter_first_name, "Joshua");
                await baseStep.input(Driver, userListPage.filter_last_name, "Yu");
                await baseStep.input(Driver, userListPage.filter_email, testUser);
                await baseStep.click(Driver, userListPage.search_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "Joshua Yu", testUser, "Active");


                await baseStep.scrollIntoView(Driver, userListPage.account_vat_number);
                await userListPage.setCountry(Driver,"China");
                // await baseStep.input(Driver, userListPage.account_vat_number, "GB288305674")

                await baseStep.screenShot(Driver, savaPath + "/14_wrong_country.png");
                await baseStep.scrollIntoView(Driver, userListPage.save_btn);
                await baseStep.click(Driver, userListPage.save_btn);
                expect(await baseStep.getText(Driver, userListPage.country_error_message)).not.null;
                await baseStep.wait(Driver, 3000);
                await baseStep.scrollUp(Driver, userListPage.account_country);
                await userListPage.setCountry(Driver,"United Kingdom");
                await baseStep.inputWithClear(Driver, userListPage.account_vat_number, "")
                // await baseStep.input(Driver, userListPage.account_vat_number, "GB288305674")
                await baseStep.scrollIntoView(Driver, userListPage.save_btn);
                await baseStep.click(Driver, userListPage.save_btn);
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case10: Assign an unpublished subscription in user list=> Success', function () {
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


    it('case 01 - Assign a sub => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.add_new_btn);
                await baseStep.wait(Driver, 2000);
                let time = new Date().getTime();
                await baseStep.input(Driver, userListPage.new_email, "Auto" + time + "@test.com");
                await baseStep.input(Driver, userListPage.new_ex_user_id, time);
                await baseStep.input(Driver, userListPage.new_first_name, "Testing");
                await baseStep.input(Driver, userListPage.new_last_name, "QA" + time);
                await baseStep.input(Driver, userListPage.new_phone, "15642543250");
                await baseStep.input(Driver, userListPage.new_address, "Test Address");
                await baseStep.click(Driver, userListPage.new_OK_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "Testing QA" + time, "Auto" + time + "@test.com", "Active");
                await baseStep.click(Driver, userListPage.subscription_tab);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.assign_sub_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.include_unpublished_plan);
                await baseStep.wait(Driver, 1000);
                await userListPage.selectTargetPlan(Driver, "UnPublish Plan");
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.assign_wire_transfer);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + "/15_assign_sub.png");
                await baseStep.click(Driver, userListPage.assign_OK_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.screenShot(Driver, savaPath + "/16_assign_result.png");
                await baseStep.compareText(Driver, userListPage.current_plan, "UnPublish Plan");
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case11: Assign subscription with require payment is false=> Success', function () {
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


    it('case 01 - Assign a sub => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.add_new_btn);
                await baseStep.wait(Driver, 2000);
                let time = new Date().getTime();
                await baseStep.input(Driver, userListPage.new_email, "Auto" + time + "@test.com");
                await baseStep.input(Driver, userListPage.new_ex_user_id, time);
                await baseStep.input(Driver, userListPage.new_first_name, "Testing");
                await baseStep.input(Driver, userListPage.new_last_name, "QA" + time);
                await baseStep.input(Driver, userListPage.new_phone, "15642543250");
                await baseStep.input(Driver, userListPage.new_address, "Test Address");
                await baseStep.click(Driver, userListPage.new_OK_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "Testing QA" + time, "Auto" + time + "@test.com", "Active");
                await baseStep.click(Driver, userListPage.subscription_tab);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.assign_sub_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.selectTargetPlan(Driver, "Month Plan");
                await baseStep.click(Driver, userListPage.require_payment);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + "/18_assign_sub.png");
                await baseStep.click(Driver, userListPage.assign_OK_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.screenShot(Driver, savaPath + "/19_assign_result.png");
                await baseStep.compareText(Driver, userListPage.current_plan, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_plan_des, "Month Plan");
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case12: Assign subscription to new user in user list=> Success', function () {
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


    it('case 01 - Assign a sub => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.add_new_btn);
                await baseStep.wait(Driver, 2000);
                let time = new Date().getTime();
                await baseStep.input(Driver, userListPage.new_email, "Auto" + time + "@test.com");
                await baseStep.input(Driver, userListPage.new_ex_user_id, time);
                await baseStep.input(Driver, userListPage.new_first_name, "Testing");
                await baseStep.input(Driver, userListPage.new_last_name, "QA" + time);
                await baseStep.input(Driver, userListPage.new_phone, "15642543250");
                await baseStep.input(Driver, userListPage.new_address, "Test Address");
                await baseStep.click(Driver, userListPage.new_OK_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "Testing QA" + time, "Auto" + time + "@test.com", "Active");
                await baseStep.click(Driver, userListPage.subscription_tab);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.assign_sub_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.setCountry(Driver, "United States", userListPage.assign_country);
                await baseStep.wait(Driver, 1000);
                await userListPage.selectTargetPlan(Driver, "Month Plan");
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + "/20_assign_sub.png");
                await baseStep.click(Driver, userListPage.assign_OK_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.compareText(Driver, userListPage.current_plan, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_plan_des, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_status, "Incomplete");
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.account_tab);
                await baseStep.refreshPage(Driver)
                await baseStep.wait(Driver, 3000);
                expect("United States").to.equal(await baseStep.getText(Driver, userListPage.info_country));
                await baseStep.wait(Driver, 1000);
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case13: Assign subscription to new business user in user list=> Success', function () {
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


    it('case 01 - Assign a sub => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.add_new_btn);
                await baseStep.wait(Driver, 2000);
                let time = new Date().getTime();
                await baseStep.input(Driver, userListPage.new_email, "Auto" + time + "@test.com");
                await baseStep.input(Driver, userListPage.new_ex_user_id, time);
                // await baseStep.input(Driver, userListPage.new_first_name, "Testing");
                // await baseStep.input(Driver, userListPage.new_last_name, "QA" + time);
                // await baseStep.input(Driver, userListPage.new_phone, "15642543250");
                // await baseStep.input(Driver, userListPage.new_address, "Test Address");
                await baseStep.click(Driver, userListPage.new_OK_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "", "Auto" + time + "@test.com", "Active");
                await baseStep.click(Driver, userListPage.subscription_tab);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.assign_sub_btn);
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, userListPage.radio_business);
                await baseStep.wait(Driver, 1000);

                await baseStep.input(Driver, userListPage.bus_company_name, "CN" + time);
                await userListPage.setCountry(Driver, "United States", userListPage.bus_country);
                await baseStep.input(Driver, userListPage.bus_city, "City" + time);
                await baseStep.input(Driver, userListPage.bus_postal_code, "12345")
                await baseStep.input(Driver, userListPage.bus_address, "Address" + time);
                await baseStep.wait(Driver, 1000);
                await userListPage.selectTargetPlan(Driver, "Month Plan");
                await baseStep.wait(Driver, 5000);
                await baseStep.screenShot(Driver, savaPath + "/21_assign_sub.png");
                await baseStep.click(Driver, userListPage.assign_OK_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.compareText(Driver, userListPage.current_plan, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_plan_des, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_status, "Incomplete");
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.account_tab);
                await baseStep.refreshPage(Driver)
                await baseStep.wait(Driver, 3000);
                expect("United States").to.equal(await baseStep.getText(Driver, userListPage.info_country));
                expect("Address" + time).to.equal(await baseStep.getText(Driver, userListPage.info_address));
                expect("City" + time).to.equal(await baseStep.getValue(Driver, userListPage.info_city));
                expect("CN" + time).to.equal(await baseStep.getValue(Driver, userListPage.info_companyName));
                expect("12345").to.equal(await baseStep.getValue(Driver, userListPage.info_zip_code));
                await baseStep.wait(Driver, 1000);
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case14: Assign subscription to new business user in user list(include vat)=> Success', function () {
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


    it('case 01 - Assign a sub => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.add_new_btn);
                await baseStep.wait(Driver, 2000);
                let time = new Date().getTime();
                await baseStep.input(Driver, userListPage.new_email, "Auto" + time + "@test.com");
                await baseStep.input(Driver, userListPage.new_ex_user_id, time);
                // await baseStep.input(Driver, userListPage.new_first_name, "Testing");
                // await baseStep.input(Driver, userListPage.new_last_name, "QA" + time);
                // await baseStep.input(Driver, userListPage.new_phone, "15642543250");
                // await baseStep.input(Driver, userListPage.new_address, "Test Address");
                await baseStep.click(Driver, userListPage.new_OK_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "", "Auto" + time + "@test.com", "Active");
                await baseStep.click(Driver, userListPage.subscription_tab);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.assign_sub_btn);
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, userListPage.radio_business);
                await baseStep.wait(Driver, 1000);

                await baseStep.input(Driver, userListPage.bus_company_name, "CN" + time);
                await userListPage.setCountry(Driver, "United Kingdom", userListPage.bus_country);
                await baseStep.input(Driver, userListPage.bus_city, "City" + time);
                await baseStep.input(Driver, userListPage.bus_postal_code, "12345")
                await baseStep.input(Driver, userListPage.bus_address, "Address" + time);
                await baseStep.input(Driver, userListPage.bus_registration_number, "12345");
                await baseStep.input(Driver, userListPage.bus_vat_number, "GB288305674");
                await baseStep.wait(Driver, 1000);
                await userListPage.selectTargetPlan(Driver, "Month Plan");
                await baseStep.wait(Driver, 5000);
                await baseStep.screenShot(Driver, savaPath + "/22_assign_sub.png");
                await baseStep.click(Driver, userListPage.assign_OK_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.compareText(Driver, userListPage.current_plan, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_plan_des, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_status, "Incomplete");
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.account_tab);
                await baseStep.refreshPage(Driver)
                await baseStep.wait(Driver, 3000);
                expect("United Kingdom").to.equal(await baseStep.getText(Driver, userListPage.info_country));
                expect("Address" + time).to.equal(await baseStep.getText(Driver, userListPage.info_address));
                expect("City" + time).to.equal(await baseStep.getValue(Driver, userListPage.info_city));
                expect("CN" + time).to.equal(await baseStep.getValue(Driver, userListPage.info_companyName));
                expect("12345").to.equal(await baseStep.getValue(Driver, userListPage.info_zip_code));
                expect("12345").to.equal(await baseStep.getValue(Driver, userListPage.info_registrationNumber));
                expect("GB28830567").to.equal(await baseStep.getValue(Driver, userListPage.info_vATNumber));
                await baseStep.wait(Driver, 1000);
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case15: Assign subscription to new business user in user list(include discount code)=> Success', function () {
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


    it('case 01 - Assign a sub => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.add_new_btn);
                await baseStep.wait(Driver, 2000);
                let time = new Date().getTime();
                await baseStep.input(Driver, userListPage.new_email, "Auto" + time + "@test.com");
                await baseStep.input(Driver, userListPage.new_ex_user_id, time);
                // await baseStep.input(Driver, userListPage.new_first_name, "Testing");
                // await baseStep.input(Driver, userListPage.new_last_name, "QA" + time);
                // await baseStep.input(Driver, userListPage.new_phone, "15642543250");
                // await baseStep.input(Driver, userListPage.new_address, "Test Address");
                await baseStep.click(Driver, userListPage.new_OK_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "", "Auto" + time + "@test.com", "Active");
                await baseStep.click(Driver, userListPage.subscription_tab);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.assign_sub_btn);
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, userListPage.radio_business);
                await baseStep.wait(Driver, 1000);

                await baseStep.input(Driver, userListPage.bus_company_name, "CN" + time);
                await userListPage.setCountry(Driver, "United States", userListPage.bus_country);
                await baseStep.input(Driver, userListPage.bus_city, "City" + time);
                await baseStep.input(Driver, userListPage.bus_postal_code, "12345")
                await baseStep.input(Driver, userListPage.bus_address, "Address" + time);
                await baseStep.input(Driver, userListPage.discount_code, "auto-50");


                await baseStep.wait(Driver, 1000);
                await userListPage.selectTargetPlan(Driver, "Month Plan");
                await baseStep.wait(Driver, 5000);
                expect("50%").to.equal(await baseStep.getText(Driver, userListPage.discounted_percentage));
                await baseStep.screenShot(Driver, savaPath + "/23_assign_sub.png");
                await baseStep.click(Driver, userListPage.assign_OK_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.compareText(Driver, userListPage.current_plan, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_plan_des, "Month Plan");
                await baseStep.compareText(Driver, userListPage.current_status, "Incomplete");
                await baseStep.wait(Driver, 2000);
                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case16: Assign subscription to new business user in user list(include invalid vat and invalid discount code )=> Success', function () {
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


    it('case 01 - Assign a sub => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userListPage.menu_user_list);
                await baseStep.click(Driver, userListPage.menu_user_list);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userListPage.add_new_btn);
                await baseStep.wait(Driver, 2000);
                let time = new Date().getTime();
                await baseStep.input(Driver, userListPage.new_email, "Auto" + time + "@test.com");
                await baseStep.input(Driver, userListPage.new_ex_user_id, time);
                // await baseStep.input(Driver, userListPage.new_first_name, "Testing");
                // await baseStep.input(Driver, userListPage.new_last_name, "QA" + time);
                // await baseStep.input(Driver, userListPage.new_phone, "15642543250");
                // await baseStep.input(Driver, userListPage.new_address, "Test Address");
                await baseStep.click(Driver, userListPage.new_OK_btn);
                await baseStep.wait(Driver, 1000);
                await userListPage.checkRecordUserList(Driver, "", "Auto" + time + "@test.com", "Active");
                await baseStep.click(Driver, userListPage.subscription_tab);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userListPage.assign_sub_btn);
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, userListPage.radio_business);
                await baseStep.wait(Driver, 1000);

                await baseStep.input(Driver, userListPage.bus_company_name, "CN" + time);
                await userListPage.setCountry(Driver, "United Kingdom", userListPage.bus_country);
                await baseStep.input(Driver, userListPage.bus_city, "City" + time);
                await baseStep.input(Driver, userListPage.bus_postal_code, "12345")
                await baseStep.input(Driver, userListPage.bus_address, "Address" + time);
                await baseStep.input(Driver, userListPage.bus_registration_number, "12345");
                await baseStep.input(Driver, userListPage.bus_vat_number, "GB0000000");
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, userListPage.discount_code, "00000");
                await baseStep.wait(Driver, 5000);
                await userListPage.selectTargetPlan(Driver, "Month Plan");
                await baseStep.wait(Driver, 5000);
                expect(await baseStep.getText(Driver, userListPage.vat_error_message)).not.null;
                expect(await baseStep.getText(Driver, userListPage.discount_error_message)).not.null
                await baseStep.screenShot(Driver, savaPath + "/24_error_message.png");
                await baseStep.wait(Driver, 3000);
                done();
            } catch (e) {
                done(e);
            } finally {
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













