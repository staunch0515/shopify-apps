/**
 * @file 
 * Provides some utility function in server side.
 *
 * The extra line between the end of the @file docblock
 * and the file-closure is important.
 */
'use strict';
const crypto = require('crypto');

const key = "\x0b\x57\x18\x1a\x4a\x66\x21\x6b\x62\x66\x54\x69\x57\x56\x73\x1c\x0a\x29\x2c\x0c\x5f\x0e\x77\x15";

const cipherivEncrypt = (text) => {
    const iv = process.env.SHOPIFY_API_SECRET_KEY.slice(-8);
    let pad = 8 - text.length % 8;

    for (var i = 0; i < pad; i++) {
        text += String.fromCharCode(pad);
    }

    const cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
    let content = cipher.update(text, 'utf8', 'base64');
    content += cipher.final('base64');

    console.log("cipherivEncrypt", content);
    return content;
}

const cipherivDecrypt = (text) => {
    const iv = process.env.SHOPIFY_API_SECRET_KEY.slice(-8);

    const decipher = crypto.createDecipheriv('des-ede3-cbc', key, iv);
    var content = decipher.update(text, 'base64', 'utf8');
    content += decipher.final('utf8');
    content = content.replace(/[^\x20-\x7E]/g, '');

    console.log("cipherivDecrypt", content);
    return content;
}

const createHmac = (secret_key) => {
    const content = crypto.createHmac('sha256', secret_key)
    //    .update(body, 'utf8', 'hex')
    //   .digest('base64');
    return content;
}

module.exports = {
    cipherivEncrypt: cipherivEncrypt,
    cipherivDecrypt: cipherivDecrypt,
    createHmac: createHmac,
};