const Utility = require('../../common/utility');

const event = async ctx => {
    try {
        console.log("oK:", ctx.request.body);

        ctx.body = "";
    } catch (err) {
        console.log("ERROR:", err.message);
        //
        ctx.set("Content-Type", "application/liquid");
        ctx.body = Utility.showMessage(err.message);
    }
};

module.exports = event;