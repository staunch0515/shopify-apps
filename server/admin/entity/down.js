const Utility = require('../common/utility');

const create = async ctx => {
    try {

        ctx.body = "";
    } catch (err) {
        console.log("ERROR:", err.message);
        //
    }
};

module.exports = create;