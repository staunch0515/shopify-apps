/*

{
  "id": 239443597569284757
}

*/
const Utility = require('../../common/utility');

const event = async ctx => {
    try {
        const topic = ctx.request.get('X-Shopify-Topic');
        console.log("topic handle:", topic);

        ctx.body = "";
    } catch (err) {
        console.log("ERROR:", err.message);
        //
        ctx.set("Content-Type", "application/liquid");
        ctx.body = Utility.showMessage(err.message);
    }
};

module.exports = event;