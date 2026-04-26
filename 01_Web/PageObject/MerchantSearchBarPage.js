const baseStep = require("../../CommonStep/Web/Web_Common_Step");

class MerchantSearchBarPage {
    logout_btn = '//*[@aria-label="logout"]'
    search_bar = '//*[@placeholder="Search invoice Id, customer email"]'
    search_btn = '//*[@aria-label="search"]'
    first_record_under_invoice = '//*[text()="End"]/../following-sibling::div[1]'
    first_record_under_customer = '//*[text()="Name"]/../following-sibling::div[1]'




}

module.exports = new MerchantSearchBarPage();
