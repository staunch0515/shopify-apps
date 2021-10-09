var path = require('path');
const Utility = require('../common/utility');

const route = async (ctx, next) => {
    const params = ctx.params;
    let request_path = ctx.request.path;

    const topic = ctx.request.get('X-Shopify-Topic');
    if (topic) {
        request_path = request_path + "/" + topic;
    }

    console.log("Start route... ", request_path)
    const handle = Utility.load(path.join(__dirname, '../' + request_path));

    if (handle) {
        handle(ctx);
    } else {
        ctx.body = "Your rquest is not matched.";
    }

    console.log("End route... ", request_path)
};

module.exports = route;

