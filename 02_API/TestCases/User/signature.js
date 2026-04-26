const crypto = require("crypto");

const gatewayKey = crypto.randomBytes(32).toString("hex");
console.log(gatewayKey);
// 5d714dc9e6b87b0cd2a1915efdf7ac90023e8cbc45933de31749b7473d90c648
//
//
/**
 * payload = invoiceId + "|" + externalTransactionId + "|" + timestamp
 * signature = hex(HMAC_SHA256(GatewayKey, payload))
 */
function signExternalGateway({ invoiceId, externalTransactionId, timestampSeconds, gatewayKey }) {
    const payload = `${invoiceId}|${externalTransactionId}|${timestampSeconds}`;
    const signature = crypto.createHmac("sha256", gatewayKey).update(payload, "utf8").digest("hex");
    return { payload, signature };
}
let timestampSecond =  Math.floor(Date.now() / 1000);

// Example
const { payload, signature } = signExternalGateway({
    invoiceId: "pay202603182ziapiAqTuNmrVL",
    externalTransactionId: "0318002",
    timestampSeconds: timestampSecond, // UniBee 要秒
    gatewayKey: "testkey0317"
    , // 建议用环境变量
});

console.log({ payload, signature });
console.log(timestampSecond)

