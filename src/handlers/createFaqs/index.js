let { HTTP_CODE,getResponseObject } = require('common-layer/utils/helper.js');
let service = require("./service")
let Schema = require("./schema")


exports.handler = async (event, context) => {

    let parameter = JSON.parse(event.body);
    
    let validationSchema = await Schema.validate(parameter);
    console.log(validationSchema)
    if(validationSchema.error){
        console.log('Please send complete data ' +validationSchema.error);
         getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], validationSchema.error);
    }
    
    try {
        const response = await service.createFaqs(parameter);
        console.log(JSON.stringify({ message: response}));
        return getResponseObject(true, HTTP_CODE.SUCCESS, { isValid: true }, response);
       
    } catch (error) {
        console.log('Error in create entry handler: ', error);
        return getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], error);
    }
} ;