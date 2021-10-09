const Utility = require('../common/utility');

const Models = require(path.join(__dirname, '../../models/'));

const create = async ctx => {

    try {

        const { Model, name, title, custom } = ctx.request.body;

        let particular = null;
        if (custom) {
            particular = Utility.loadApp(ctx, custom);
        }

        if (particular && particular.beforeValid) {
            particular.beforeValid(ctx);
        }
        // 调取 app 的相同的对象

        let oldEntity = null;
        let newEntity = null;

        // 保存前的验证工作


        // 思路2
        if (Model.title) {
            //  找到 title 的这种关系，再 此刻的行为是 create 　发生的 时间 beforeParentCreate

            // 这种哦到  对这种给予处理
            titleRelation.create.beforeParentCreate();


            // 继续延伸，循环所有的 field 来调用它们的相应的内容来处理系统。 
        }

        // 默认验证，可以通过 参数设置来调用。
        if (avoidTitleRept) {
            oldEntity = await Model.findOne({
                where: {
                    domain: shop,
                    [Op.not]: {
                        delFlg: true,
                    },
                    [Op.or]: [
                        { name: name },
                        { title: title }
                    ],
                }
            })
        }

        if (particular && particular.afterValid) {
            particular.beforeValid(ctx);
        }

        if (oldEntity) {
            throw {
                message: "同じ名前のレコードが存在します。別の名前で登録ください。",
            };
        }

        // 保存的后的处理工作
        if (particular && particular.beforeCreate) {
            particular.afterCreate(ctx);
        }

        // 保存的处理

        if (particular && particular.create) {
            particular.beforeValid(ctx);
        } else {
            newEntity = await Model.create({});
        }


        // 保存的后的处理工作
        if (particular && particular.afterCreate) {
            particular.afterCreate(ctx);
        }

        ctx.body = {
            newEntity
        };

        if (particular && particular.beforeLeave) {
            particular.beforeLeave(ctx);
        }

    } catch (err) {
        console.log("ERROR:", err.message);
        //
    }
};

module.exports = create;