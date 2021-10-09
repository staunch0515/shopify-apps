const Utility = require('../common/utility');

const event = async ctx => {
    try {
        ctx.set("Content-Type", "application/liquid");
        const input = Utility.decodeToken(ctx);
        ctx.body = Utility.showMessage(input.formId);
    } catch (err) {
        console.log("ERROR:", err.message);
        //
        ctx.set("Content-Type", "application/liquid");
        ctx.body = Utility.showMessage(err.message);
    }
};

module.exports = event;