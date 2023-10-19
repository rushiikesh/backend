const { sequelize, Sequelize, QueryTypes  } = require('common-layer/utils/SequelizeWriteConnection');
const currentDate = new Date();
const formattedDate  = currentDate.toISOString().slice(0, 19).replace('T', ' ');

exports.createCustomer = async(parameter)=>{
    let t = await sequelize.transaction();
    const sysdate = [formattedDate ];
    console.log('Date ####'+sysdate)
    try{
        let query = 'insert into UserTable (f_name, l_name, u_email, u_contact, u_session, u_dt, u_type) values (?,?,?,?,?,?,?)';
        let result = await sequelize.query(query, {
            replacements: [parameter.firstName, parameter.lastName, parameter.email, 
                parameter.mobile,parameter.session, sysdate, parameter.type],
            type: QueryTypes.INSERT,
            
        });
        
         return result;
    }catch(error){
        
        throw error;
    }

}

exports.checkExist = async(mobile)=>{
    let t = await sequelize.transaction();
    try{
        let query = 'select * FROM UserTable where u_contact = ?';
        let result = await sequelize.query(query, {
            replacements: [mobile],
            type: QueryTypes.SELECT,
            // transaction: t
        });
        // await t.commit();
        console.log("result#########");
        console.log(JSON.stringify(result));
        
         return result;
    }catch(error){
        // await t.rollback();
        throw error;
    }

}