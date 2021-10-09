var path = require('path');
const sequelize = require(path.join(__dirname, '../models/')).sequelize;

const handleAction = async ctx => {

    let t = null;

    try {
        const shop = ctx.cookies.get('shopOrigin');
        const accessToken = ctx.cookies.get('accessToken');

        let action = ctx.params.action;
        action = action.replace("_", "/");
        let input = ctx.request.body;
        if (ctx.method == "GET") {
            input = ctx.query;
        }

        console.log(action, input);

        let result = null;

        const requireReload = function (modulePath) {
            console.log("resolve:", require.resolve(modulePath));
            delete require.cache[require.resolve(modulePath)];
            return require(modulePath);
        };

        const handle = requireReload(path.join(__dirname, "./" + action + ".js"));

        if (handle) {
            input.shop = shop;
            input.accessToken = accessToken;

            if (ctx.method == "POST") {
                t = await sequelize.transaction();
            }

            result = await handle(input);

            if (t) {
                await t.commit();
            }

            ctx.body = result;
        } else {
            ctx.body = {
                message: `The action of ${action} doesn't exist.`
            }
        }
        return;
    } catch (err) {
        if (t) {
            await t.rollback();
        }
        console.log("ERROR:", err.message);
        console.log("ERROR:", err.stack);
        ctx.body = {
            error: err.message
        }
        ctx.status = 400;
    }
};



module.exports = handleAction;
