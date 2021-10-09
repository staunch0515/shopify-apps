require('isomorphic-fetch');
require('log-timestamp');

const path = require('path');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
dotenv.config();
const session = require('koa-session');
const bodyParser = require('koa-body');
const Router = require('koa-router');

const Utility = require('./server/common/utility');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const {
    SHOPIFY_API_SECRET_KEY,
    SHOPIFY_API_KEY,
    APP_HOST: appHost,
    APP_NAME: appName,
    APP_TITLE: appTitle,
} = process.env;

const appWorkPath = path.join(__dirname, './webapps/' + appName);
console.log('appWorkPath=' + appWorkPath);

const scope = require(appWorkPath + '/common/scope');

const startReceive = require('./server/middleware/startReceive');
const authorizeOfAdmin = require('./server/middleware/authorizeOfAdmin');
const authorizeOfShop = require('./server/middleware/authorizeOfShop');
const authorizeOfWebhook = require('./server/middleware/authorizeOfWebhook');

const route = require('./server/middleware/route');
const checkUser = require('./server/middleware/checkUser');

var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 1;

var j = schedule.scheduleJob(rule, function () {
    console.log('The answer to life, the universe, and everything!');
});


app.prepare().then(() => {
    const server = new Koa();

    // multipart: true,
    server.use(bodyParser({
        includeUnparsed: true,
    }));


    const shop2api = new Router({ prefix: '/shop2app' });
    shop2api.use(startReceive());
    shop2api.use(authorizeOfShop());
    shop2api.get('/:a', route);
    shop2api.get('/:a/:b', route);
    shop2api.get('/:a/:b/:c', route);
    shop2api.post('/:a', route);
    shop2api.post('/:a/:b', route);
    shop2api.post('/:a/:b/:c', route);
    server.use(shop2api.routes());
    server.use(shop2api.allowedMethods());

    const adminApi = new Router({ prefix: '/admin' });
    adminApi.use(startReceive());
    adminApi.use(authorizeOfAdmin());
    adminApi.get('/:a', route);
    adminApi.get('/:a/:b', route);
    adminApi.get('/:a/:b/:c', route);
    adminApi.post('/:a', route);
    adminApi.post('/:a/:b', route);
    adminApi.post('/:a/:b/:c', route);
    server.use(adminApi.routes());
    server.use(adminApi.allowedMethods());

    const webhookApi = new Router({ prefix: '/shop2event' });
    webhookApi.use(authorizeOfWebhook());
    webhookApi.post('/', route);
    server.use(webhookApi.routes());
    server.use(webhookApi.allowedMethods());

    server.use(session({ sameSite: 'none', secure: true }, server));

    server.keys = [SHOPIFY_API_SECRET_KEY];
    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: scope,
            async afterAuth(ctx) {
                const { shop, accessToken } = ctx.session;

                ctx.cookies.set('shopOrigin', shop, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                });

                ctx.cookies.set('accessToken', accessToken, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                });

                ctx.cookies.set('curUserId', null);
                const url = 'https://' + shop + '/admin/apps/' + SHOPIFY_API_KEY;
                ctx.redirect(url);
            },
        }),
    );

    server.use(graphQLProxy({ version: ApiVersion.April20 }))
    server.use(verifyRequest());
    server.use(checkUser());
    server.use(async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
        return
    });

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});