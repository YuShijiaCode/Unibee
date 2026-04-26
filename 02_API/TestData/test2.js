const axios = require('axios');
const stripe = require('stripe')('xxxx');

// Step 1 - 从你的支付系统获取支付链接
// async function createOrder(amount) {
//     const res = await axios.post('https://api.unibee.top/orders', {
//         amount: 1000,
//         currency: 'USD'
//     });
//     return res.data.payment_link; // 获取类似 https://api.unibee.top/pay/pay20250401C0W7fQETJgSsTFg
// }

// Step 2 - 解析链接中的支付会话ID
function extractSessionId(link) {
    // 假设链接格式为 https://api.unibee.top/pay/{session_id}
    const parts = link.split('/');
    return parts[parts.length - 1]; // 提取 pay20250401C0W7fQETJgSsTFg
}

// Step 3 - 通过Stripe API完成支付
async function completePayment(sessionId) {
    // 获取支付会话详情
    const session = await stripe.checkout.sessions.retrieve("xxxx");

    // 创建测试支付方式
    const paymentMethod = await stripe.paymentMethods.create({
        // type: 'card',
        // card: {
        //     number: '4242424242424242',
        //     exp_month: 12,
        //     exp_year: new Date().getFullYear() + 1,
        //     cvc: '123',
        // },
        // amount: 1000,
        // currency: 'usd',
        // payment_method_types: ['card'],
        // payment_method: paymentMethod.id,
        // confirm: true,
        // automatic_payment_methods: {
        //     enabled: true,
        //     allow_redirects: 'never'
        // }

        type: 'card',
        card: { token: 'tok_visa' } //
    });

    // 确认支付意图
    // const paymentIntent = await stripe.paymentIntents.confirm(
    //     session.payment_intent, // 从会话中提取支付意图ID
    //     {
    //         payment_method: paymentMethod.id,
    //         return_url: 'https://https://autotest.unibee.top/' // 必须匹配初始配置
    //     }
    // );

    return await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
        payment_method_types: ['card'],
        payment_method: paymentMethod.id,
        confirm: true,
        // automatic_payment_methods: {
        //     enabled: true,
        //     allow_redirects: 'never'
        // }
    });
}

// 执行完整流程

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


axios.get('https://api.unibee.top/pay/pay20250401tud900XF2R6fJ6S')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        if (error.response) {
            // 请求已发出，服务器以状态码非2xx响应
            console.log(error.response.headers._options.path);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.log(error.request);
        } else {
            // 在设置请求时发生了某些错误
            console.log('Error', error.message);
        }
    });

async function fullFlow() {
    try {
        // 创建订单
        // const paymentLink = await createOrder(1000);
        // console.log('获得支付链接:', paymentLink);
        // let paymentLink = "https://api.unibee.top/pay/pay20250401tud900XF2R6fJ6S"
        //
        // // 提取会话ID
        // const sessionId = extractSessionId("cs_test_a1bGvbwbh5OdVN2rAgXeCfzIO8teNXsHKslNna8BoghayeQNTw0OcuEvng");
        // console.log('解析会话ID:', sessionId);

        // 完成支付
        const result = await completePayment("xxxxss");
        console.log('支付结果:', result.status);
        console.log('Stripe仪表板链接:', `https://dashboard.stripe.com/test/payments/${result.id}`);
    } catch (err) {
        console.error('支付失败:', err.message);
    }
}

fullFlow();