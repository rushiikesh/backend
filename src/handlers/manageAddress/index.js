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
   
       try {
        console.log('reqtype ###'+parameter.reqtype) 
        if (parameter.reqtype == 'save'){
            const response = await service.insertAddress(parameter);
            console.error(JSON.stringify({ message: response}));
            return getResponseObject(true, HTTP_CODE.SUCCESS, { isValid: true }, response);
        } else {
        const response = await service.updateAddress(parameter);
        console.log(JSON.stringify({ message: response}));
        return getResponseObject(true, HTTP_CODE.SUCCESS, { isValid: true }, response);
    }
    } catch (error) {
        console.error('Error in create entry handler: ', error);
        return getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], error);
    }

};