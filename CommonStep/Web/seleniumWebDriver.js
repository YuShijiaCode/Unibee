let log4js = require('log4js');
const chrome = require("selenium-webdriver/chrome");
const {By} = require("selenium-webdriver");
const chromedriver = require("./Driver/chromeDiver_1");

let log = log4js.getLogger('jppSeleniumWebdriver');

log.level = 'debug';

//For browser : chrome ,
exports.getDriver = function (webdriver, browser) {
    let driver;
    switch (browser) {
        case 'chrome':
            let chrome = require('selenium-webdriver/chrome');
            let chromedriver = require('./Driver/chromedriver');
            // let chromedriver = require('chromedriver');
            // if(chrome.getDefaultService().isRunning()){
            //     chrome.getDefaultService().kill();
            // }
            // chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
            // capabilities.setPageLoadStrategy('eager');
            let service = new chrome.ServiceBuilder(chromedriver.path);

            var chromeCapabilities = webdriver.Capabilities.chrome();
            chromeCapabilities.set('acceptInsecureCerts', false);
            driver = new webdriver.Builder()
                .forBrowser('chrome')
                // .withCapabilities(webdriver.Capabilities.chrome())
                .withCapabilities(chromeCapabilities)
                .setChromeService(service)
                // Not use headless
                .setChromeOptions(new chrome.Options().addArguments('--no-sandbox',"excludeSwitches=['enable-automation']"))
                // Use headless
                // .setChromeOptions(new chrome.Options().addArguments("--headless",'--ignore-certificate-errors','window-size=1920,1080','--no-sandbox'))
                .build();
            break;
        case 'firefox':
            ''
            let firefox = require('selenium-webdriver/firefox');
            let firefoxdriver = require('geckodriver');
            console.log(firefoxdriver.path);
            driver = new webdriver.Builder()
                .forBrowser('firefox')
                .withCapabilities(webdriver.Capabilities.firefox())
                .build()
            break;
        case 'ie':
            let ie = require('selenium-webdriver/ie');
            let iedriver = require('iedriver');
            driver = new webdriver.Builder()
                .forBrowser('internet explorer')
                .withCapabilities(webdriver.Capabilities.ie())
                .build()
            break;
        case 'edge':
            let edge = require('selenium-webdriver/edge');
            let edgedriver = require('edgedriver');
            driver = new webdriver.Builder()
                .forBrowser('edge')
                .withCapabilities(webdriver.Capabilities.edge())
                .build()
            break;
        default :
    }
    return driver;
};

exports.getBy = function () {
    return By;
};
