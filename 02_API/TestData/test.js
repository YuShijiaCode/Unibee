const axios = require('axios');
async function getFinalRedirectUrl(initialUrl) {
    try {
        const response = await axios.get(initialUrl, {
            maxRedirects: 5,  // 最多跟踪5次重定向
            validateStatus: (status) => status >= 200 && status < 400 // 允许重定向状态码
        });
        console.log(response.request.res.responseUrl)
        return response.request.res.responseUrl; // 获取最终URL
    } catch (err) {
        throw new Error(`重定向跟踪失败: ${err.message}`);
    }
}
getFinalRedirectUrl("https://api.unibee.top/pay/pay20250401dWgbRe7HwR5xRUj")