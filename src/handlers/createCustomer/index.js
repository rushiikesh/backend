let { HTTP_CODE,getResponseObject } = require('common-layer/utils/helper.js');
let service = require("./service")
let Schema = require("./schema")


exports.handler = async (event, context) => {

    let parameter = JSON.parse(event.body);
    
    let validationSchema = await Schema.validate(parameter);
    
    if(validationSchema.error){
        console.log('Please send complete data ' +validationSchema.error);
         getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], validationSchema.error);
    }
    let mobile = parameter.mobile;
    let checkUser = await service.checkExist(mobile);
    console.log('Param #####'+parameter);
 
    if(checkUser.length == 0){
    try {
        const response = await service.createCustomer(parameter);
        console.log(JSON.stringify({ message: response}));
        return getResponseObject(true, HTTP_CODE.SUCCESS, { isValid: true }, response);
       
    } catch (error) {
        console.log('Error in create entry handler: ', error);
        return getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], error);
    }
} else {
         console.log('Customer with phone number already exists: ');
         getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], 'Customer already exists');
}


};