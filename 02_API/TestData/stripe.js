// src/stripe-service.js
require('dotenv').config();
const fs = require('fs');

// 同步读取JSON文件
const data = fs.readFileSync(__dirname + '/StripeInfo.json', 'utf8');
const env = JSON.parse(data);


const stripe = require('stripe')(env.STRIPE_SECRET_KEY);

class StripeService {
    // 创建支付意图
    async createPaymentIntent(amount, paymentMethodId) {
        try {
            return await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
                payment_method: paymentMethodId,
                confirm: true,
                metadata: { test: "mocha_test" }
            });
        } catch (error) {
            throw new Error(`支付失败: ${error.message}`);
        }
    }

    // 创建测试客户
    async createTestCustomer(email = "joshua.yu@wowow.io") {
        return stripe.customers.create({
            email,
            description: 'Mocha测试客户'
        });
    }
}

module.exports = new StripeService();