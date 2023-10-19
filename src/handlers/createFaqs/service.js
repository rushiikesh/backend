const { sequelize, Sequelize, QueryTypes  } = require('common-layer/utils/SequelizeWriteConnection');

exports.createFaqs = async(parameter)=>{
    let t = await sequelize.transaction();
    
    try{
        let query = 
        'select * from tb_faqs where status=?';
        let result = await sequelize.query(query, {
            replacements: [parameter.status],
            type: QueryTypes.SELECT,
            
        });
        
         return result;
    }catch(error){
        
        throw error;
    }

}

