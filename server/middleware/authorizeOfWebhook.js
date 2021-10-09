const Shopify = require('shopify-api-node');
const crypto = require('crypto');


module.exports = function (opts) {

    let last_body = "";

    return async function authorizeOfApi(ctx, next) {

        const secretKey = process.env.SHOPIFY_WEBHOOK_SECRET_KEY;

        console.log("last_body", last_body);

        const topic = ctx.request.get('X-Shopify-Topic');
        const hmac = ctx.request.get('X-Shopify-Hmac-Sha256');
        const shop = ctx.request.get('X-Shopify-Shop-Domain');
        const version = ctx.request.get('X-Shopify-API-Version');

        const body = ctx.request.body[Symbol.for('unparsedBody')];

        const hash = crypto.createHmac('sha256', secretKey)
            .update(body)
            .digest('base64');

        console.log("hash", hash);

        if (hash != hmac) {
            console.log('Danger! Not from Shopify!')
            throw ({ message: "This is not a valid request from shopify." });
        }

        if (last_body == body) {
            console.log('Same! ')
            throw ({ message: "This is not a valid request from shopify." });
        }
        last_body = body;

        await next();
    };
}