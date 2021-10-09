const Shopify = require('shopify-api-node');


module.exports = function (opts) {

    return async function authorizeOfApi(ctx, next) {

        console.log("ctx.param", ctx.param)
        console.log("ctx.query", ctx.query)
        console.log("ctx.request.body", ctx.request.body)

        await next();
    };
}