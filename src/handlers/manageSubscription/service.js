const { sequelize, Sequelize, QueryTypes  } = require('common-layer/utils/SequelizeWriteConnection');
const currentDate = new Date();
const formattedDate  = currentDate.toISOString().slice(0, 19).replace('T', ' ');

exports.insertSubscription = async(parameter)=>{
    let t = await sequelize.transaction();
    const sysdate = [formattedDate ];
   
    try{
        let query = 
        'insert into tb_subscription (scrb_id, user_id, msp_id, st_date, end_date, is_active, scrb_type,reqtype) values (?,?,?,?,?,?,?,?)';
        let result = await sequelize.query(query, {
            replacements: [parameter.scrbId, parameter.userID, parameter.messId, 
                sysdate,sysdate, parameter.isActive, parameter.sub_type,parameter.reqtype],
            type: QueryTypes.INSERT,
            
        });
        
         return result;
    }catch(error){
        
        throw error;
    }

}


exports.modifySubscription = async(parameter)=>{
    let t = await sequelize.transaction();
    const sysdate = [formattedDate ];
   
    try{
        let query = 
        'update tb_subscription set scrb_id =?, user_id = ?, msp_id = ?, st_date = ?, end_date = ?, is_active = ?, scrb_type = ?,reqtype = ? where scrb_id = ?';
        let result = await sequelize.query(query, {
            replacements: [parameter.scrbId, parameter.userID, parameter.messId, 
                sysdate,sysdate, parameter.isActive, parameter.sub_type,parameter.reqtype, parameter.scrbId],
            type: QueryTypes.UPDATE,
            
        });
        
         return result;
    }catch(error){
        
        throw error;
    }

}

// exports.pauseSubscription = async(parameter)=>{
//     let t = await sequelize.transaction();
//     const sysdate = [formattedDate];

//     try{
//         let query = 
//         'update tb_subscription set scrb_id =?, user_id = ?, msp_id = ?, st_date = ?, end_date = ?, is_active = ?, scrb_type = ?,reqtype = ? where scrb_id = ?';
//         let result = await sequelize.query(query, {
//             replacements: [parameter.scrbId, parameter.userID, parameter.messId, 
//                 sysdate,sysdate, parameter.isActive, parameter.sub_type,parameter.reqtype, parameter.scrbId],
//             type: QueryTypes.UPDATE,
            
//         });
        
//          return result;
//     }catch(error){
        
//         throw error;
//     }

// }


exports.deleteSubscription = async(parameter)=>{
    let t = await sequelize.transaction();
    const sysdate = [formattedDate ];
   
    try{
        let query = 
        'delete from tb_subscription where scrb_id = ?';
        let result = await sequelize.query(query, {
            replacements: [parameter.scrbId],
            type: QueryTypes.DELETE,
            
        });
        
         return result;
    }catch(error){
        
        throw error;
    }

}
