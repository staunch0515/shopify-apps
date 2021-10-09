var path = require('path');
const Utility = require('../common/utility');

module.exports = function (opts) {

    return async function matchPath(ctx, next) {
        const request_path = ctx.request.path;
        console.log("Start matchPath... ", request_path)
        const handle = Utility.load(path.join(__dirname, '../' + request_path));

        if (handle) {
            handle(ctx);
        } else {
            ctx.body = "Your rquest is not matched.";
        }

        console.log("End matchPath... ", request_path)
    };
}