const Utility = require('../../common/utility');
var StateMachine = require('javascript-state-machine');

var fsm = new StateMachine({
    init: 'solid',
    transitions: [
        { name: 'melt', from: 'solid', to: 'liquid' },
        { name: 'freeze', from: 'liquid', to: 'solid' },
        { name: 'vaporize', from: 'liquid', to: 'gas' },
        { name: 'condense', from: 'gas', to: 'liquid' }
    ],
    methods: {
        onMelt: function () {
            console.log('I melted')
        },
        onFreeze: function () {
            console.log('I froze')
        },
        onVaporize: function () {
            console.log('I vaporized')
        },
        onCondense: function () {
            console.log('I condensed')
        }
    }
});

const create = async ctx => {

    try {

        console.log("/admin/account/new", ctx.request.body);

        ctx.body = {}

    } catch (err) {
        console.log("ERROR:", err.message);
        //
    }
};

module.exports = create;