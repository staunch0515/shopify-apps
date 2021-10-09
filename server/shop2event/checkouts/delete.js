/*

{
  "id": 981820079255243537,
  "presentment_currency": "USD",
  "total_discounts": "0.00",
  "total_line_items_price": "398.00",
  "total_price": "398.00",
  "total_tax": "0.00",
  "subtotal_price": "398.00",
  "total_duties": null
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