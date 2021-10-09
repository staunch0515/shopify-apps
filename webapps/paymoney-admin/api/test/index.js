var path = require('path');

const Index = async (input) => {
    try {
        console.log("test.index....");
        return {};
    } catch (err) {
        console.log("ERROR:", err.message);
        throw (err);
    }
};

module.exports = Index;