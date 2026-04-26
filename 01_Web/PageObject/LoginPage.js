const baseStep = require("../../CommonStep/Web/Web_Common_Step");

class Login_Page {
    email=  '//input[@id="login-password_email"]'
    password= '//input[@id="login-password_password"]'
    submitBtn= '//*[text()="Submit"]'
    email_empty_error = '//*[@id="login-password_email_help"]/div[1]'
    email_invalid_error = '//*[@id="login-password_email_help"]/div[2]'
    password_empty_error = '//*[@id="login-password_password_help"]/div[1]'
    user_email=  '//input[@id="login-with-password_email"]'
    user_password= '//input[@id="login-with-password_password"]'
    user_email_empty_error = '//*[@id="login-with-password_email_help"]/div[1]'
    user_email_invalid_error = '//*[@id="login-with-password_email_help"]/div[2]'
    user_password_empty_error = '//*[@id="login-with-password_password_help"]/div[1]'
    error_message = '//input[@id="login-password_password"]/../../../../../../following-sibling::div[2]'
    user_error_message = '//input[@id="login-with-password_password"]/../../../../../../following-sibling::div[2]'
    // http://unibee:123456@merchant.unibee.top/
    openMerchantUrl = async function (driver, url = 'http://localhost/'){
        console.log("Open URL: " + url);
        await baseStep.access_url(driver,url);
        await baseStep.wait(driver, 3000);
        let currentUrl = await driver.getCurrentUrl();
        console.log("currentUrl: " + currentUrl);
    }
    // http://unibee:123456@testing.unibee.top/
    openUserUrl = async function (driver, url = 'http://localhost:8086/plans'){
        console.log("Open URL: " + url);
        await baseStep.access_url(driver,url);
        await baseStep.wait(driver, 3000);
        let currentUrl = await driver.getCurrentUrl();
        console.log("currentUrl: " + currentUrl);
    }


    loginMerchant = async function (driver, email='accounts.unibee@unibee.dev', password ='changeme' ){
        console.log("Login with email: " + email);
        await baseStep.waitUntilElement(driver, this.email,20000);
        await baseStep.input(driver,  this.email, email);
        await baseStep.wait(driver, 1000);
        await baseStep.input(driver, this.password, password);
        await baseStep.wait(driver, 1000);
        await baseStep.click(driver, this.submitBtn);
        await baseStep.wait(driver, 1000);

    }

    loginUserPortal = async function (driver, email='joshua.yu@wowow.io', password ='Aa@666666' ){
        console.log("Login with email: " + email);
        await baseStep.waitUntilElement(driver, this.user_email,20000);
        await baseStep.input(driver,  this.user_email, email);
        await baseStep.wait(driver, 2000);
        await baseStep.input(driver, this.user_password, password);
        await baseStep.wait(driver, 1000);
        await baseStep.click(driver, this.submitBtn);
    }

}

module.exports = new Login_Page();
