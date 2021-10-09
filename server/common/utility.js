const Crypt = require('../common/crypt');

const Load = function (modulePath) {
    try {
        console.log("resolve:", require.resolve(modulePath));
        delete require.cache[require.resolve(modulePath)];
        return require(modulePath);
    } catch (err) {
        console.log("Load Error:", err.message);
    }
    return false;
};

const ShowMessage = (message) => {
    const div = "<center>" + message + "</center>";
    return div;
}

function Cookies(ctx) {
    let cookieInfo = ctx.request.header.cookie;
    let match = cookieInfo.split([';', '=']);
    let cookies = {};
    let name = "";
    match.map(item => {
        if (name == "") {
            name = item.trim();
        } else {
            cookies[name] = item;
            name = "";
        }
    });
    return cookies;
}

function decodeToken(ctx) {
    const token = ctx.query.token;
    const tokenInfo = Crypt.cipherivDecrypt(token);
    let match = tokenInfo.split(['&', '=']);
    let tokens = {};
    let name = "";
    match.map(item => {
        if (name == "") {
            name = item.trim();
        } else {
            tokens[name] = item;
            name = "";
        }
    });
    return tokens;
}

const Utility = {
    load: Load,
    showMessage: ShowMessage,
    Cookies: Cookies,
    decodeToken: decodeToken,
}

module.exports = Utility;