const {Joi} = require('common-layer/utils/packageExports.js');

let schema = Joi.object().keys({
    scrbId: Joi.string().required(),
    userID: Joi.string().required(),
    messId: Joi.string().required(),
    st_date: Joi.date().required(),
    end_date: Joi.date().required(),
    isActive:Joi.boolean().required(),
    sub_type: Joi.string().required(),
    reqtype: Joi.string().required()
    })

module.exports = schema;