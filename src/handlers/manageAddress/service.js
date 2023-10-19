const { sequelize, Sequelize, QueryTypes  } = require('common-layer/utils/SequelizeWriteConnection');
const currentDate = new Date();
const formattedDate  = currentDate.toISOString().slice(0, 19).replace('T', ' ');

exports.insertAddress = async(parameter)=>{
    let t = await sequelize.transaction();
    const sysdate = [formattedDate ];
   
    try{
        let query = 
        'insert into Address (userID, line1, city, state, pincode, u_dt, isDefault) values (?,?,?,?,?,?,?)';
        let result = await sequelize.query(query, {
            replacements: [parameter.userID, parameter.line1, parameter.city, 
                parameter.state,parameter.pincode, sysdate, parameter.isDefault],
            type: QueryTypes.INSERT,
            
        });
        
         return result;
    }catch(error){
        
        throw error;
    }

}

exports.updateAddress = async(parameter)=>{
    let t = await sequelize.transaction();
    const sysdate = [formattedDate ];
   
    try{
        let query = 
        'update Address set userID = ?, line1  = ?, city = ?, state = ?, pincode = ?, u_dt = ?, isDefault = ?';
        let result = await sequelize.query(query, {
            replacements: [parameter.userID, parameter.line1, parameter.city, 
                parameter.state,parameter.pincode, sysdate, parameter.isDefault],
            type: QueryTypes.UPDATE,
            
        });
        
         return result;
    }catch(error){
        
        throw error;
    }

}