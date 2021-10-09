const Utility = require('../common/utility');
const crypto = require('crypto');

module.exports = function (opts) {

    const {
        SHOPIFY_API_SECRET_KEY,
        SHOPIFY_API_KEY,
    } = process.env;

    return async function authorizeOfShop(ctx, next) {

        console.log("start authorizeOfShop ...")
        const signature = ctx.query.signature;
        console.log("signature", signature);
        let querystring = "";
        let query = ctx.query;
        delete query['signature'];
        Object.keys(query).sort().forEach(function (key) {
            var value = query[key];
            if (value.indexOf(",") > 0) {
                value = [value].join(',');
            }
            querystring = querystring + `${key}=${value}`;
        });

        const hash = crypto.createHmac('sha256', SHOPIFY_API_SECRET_KEY)
            .update(querystring)
            .digest('hex')

        if (hash != signature) {
            console.log('Danger! Not from Shopify!')
            throw ({ message: "This is not a valid request from shopify." });
        }

        await next();
    };
}