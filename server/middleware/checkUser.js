var path = require('path');
const axios = require('axios');

const Utility = require('../common/utility');

module.exports = function (opts) {

    const {
        SHOPIFY_API_SECRET_KEY,
        SHOPIFY_API_KEY,
    } = process.env;

    return async function checkUser(ctx, next) {
        const cookies = Utility.Cookies(ctx);
        if (!cookies.shopOrigin) {
            await next();
            return;
        }

        if (!cookies.accessToken) {
            await next();
            return;
        }

        if (cookies.curUserId) {
            await next();
            return;
        }

        const shop = cookies.shopOrigin;
        const accessToken = cookies.accessToken;

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken,
            }
        }

        const path = shop + "/admin/api/2020-04/users.json";
        const url = 'https://' + path;

        try {
            const res = await axios.get(url, config)
                .then(res => {
                    console.log("RECEIVE", res);
                });
        } catch (err) {
            let userid = err.response.headers['x-stats-userid'];
            ctx.cookies.set('curUserId', userid, {
                httpOnly: false,
                secure: true,
                sameSite: 'none'
            });
        }
        await next();
    };
}