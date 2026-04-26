const axios = require('axios');
const { expect } = require('chai');
const stripe = require('stripe')('xxxxxx');

// 工具函数：跟踪重定向获取最终URL
async function getFinalRedirectUrl(initialUrl) {
    try {
        const response = await axios.get(initialUrl, {
            maxRedirects: 5,  // 最多跟踪5次重定向
            validateStatus: (status) => status >= 200 && status < 400 // 允许重定向状态码
        });
        return response.request.res.responseUrl; // 获取最终URL
    } catch (err) {
        throw new Error(`重定向跟踪失败: ${err.message}`);
    }
}

// 从URL提取Stripe Session ID
function extractStripeSessionId(finalUrl) {
    // 示例最终URL格式：
    // https://checkout.stripe.com/c/pay/cs_test_abc123#...
    const matches = finalUrl.match(/\/pay\/(cs_test_[a-zA-Z0-9_\-]+)/);
    if (!matches || matches.length < 2) {
        throw new Error('未找到有效的Stripe Session ID');
    }
    return matches[1];
}

// 完整的自动化支付测试
describe('端到端支付测试', function()  {
    this.timeout(100000);
    let paymentLink = 'https://api.unibee.top/pay/pay20250401dWgbRe7HwR5xRUj';
    let stripeSessionId;
    let paymentIntentId;

    before(async () => {
        // 步骤1：跟踪重定向获取真实Session ID
        const finalUrl = await getFinalRedirectUrl(paymentLink);
        console.log('最终支付URL:', finalUrl);

        // 步骤2：解析Session ID
        stripeSessionId = extractStripeSessionId(finalUrl);
        console.log('解析的Session ID:', stripeSessionId);

        // 步骤3：获取关联的Payment Intent
        const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
        paymentIntentId = session.payment_intent;
    });

    it('应成功完成信用卡支付', async (done) => {
        // 步骤4：创建测试支付方式
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: '4242424242424242',
                exp_month: 12,
                exp_year: new Date().getFullYear() + 1,
                cvc: '123',
            },
        });

        // 步骤5：确认支付意图
        const confirmedIntent = await stripe.paymentIntents.confirm(
            paymentIntentId,
            {
                payment_method: paymentMethod.id,
                return_url: 'https://autotest.unibee.top/my-subscription' // 必须与创建时一致
            }
        );

        // 验证支付状态
        expect(confirmedIntent.status).to.equal('succeeded');
        console.log('支付验证通过，交易ID:', confirmedIntent.id);
        done()
    });

});