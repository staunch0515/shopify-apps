/*

{
  "id": 706405506930370084,
  "accepts_marketing_updated_at": null,
  "marketing_opt_in_level": null,
  "admin_graphql_api_id": "gid:\/\/shopify\/Customer\/706405506930370084"
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