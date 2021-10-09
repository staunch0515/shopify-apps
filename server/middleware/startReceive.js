module.exports = function (opts) {

    const {
        SHOPIFY_API_SECRET_KEY,
        SHOPIFY_API_KEY,
    } = process.env;

    return async function startReceive(ctx, next) {
        console.log("---------------------------------------------------------")
        console.log("Start Recieve", ctx.href)
        console.log("ctx.params", ctx.params)
        console.log("ctx.query", ctx.query)
        console.log("ctx.request.body", ctx.request.body)

        await next();
    };
}