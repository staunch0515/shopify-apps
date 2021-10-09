const Utility = require('../../common/utility');
const Crypt = require('../../common/crypt');

const token = async ctx => {
    try {
        const timestamp = ctx.query.timestamp;
        let data = ctx.request.body[Symbol.for('unparsedBody')];
        data = data + "&timestamp=" + timestamp;
        const token = Crypt.cipherivEncrypt(data);
        ctx.body = { token: token };
    } catch (err) {
        console.log("ERROR:", err.message);
        ctx.body = {
            error: err.message
        }
        ctx.status = 400;
    }
};

module.exports = token;