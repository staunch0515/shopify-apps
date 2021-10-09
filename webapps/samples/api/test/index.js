var path = require('path');
var uniqid = require("uniqid");

const Index = async (input) => {
    try {
        console.log("test.index....");
        return { message: "welcome..." + uniqid.process() };
    } catch (err) {
        console.log("ERROR:", err.message);
        throw (err);
    }
};

module.exports = Index;