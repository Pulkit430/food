const conn=require('../../db/config')

const getAllAppliances=(next)=>{
    conn.query(`select kitchen_appliances.id , kitchen_appliances.name,appliances_types.name as category , kitchen_appliances.status from kitchen_appliances left join appliances_types on appliances_types.id=kitchen_appliances.category order by kitchen_appliances.modified_at DESC`,next)
}
     
const createAppliances=(data,next)=>{ 
    conn.query(`insert into kitchen_appliances(name,description,category,scale,min,max) values('${data.name}','${data.desc}','${data.category}','${data.scale}','${data.min}','${data.max}')`,next)
}
const changeAppliancesStatus=(data,next)=>{
    conn.query(`update kitchen_appliances set status='${data.status}' where id='${data.id}'`,next)
}
const deleteAppliancesById=(data,next)=>{
    console.log(data.id)
    conn.query(`delete from kitchen_appliances where id='${data.id}'`,next)
}

const getAppliancesById=(id,next)=>{
    conn.query(`select * from kitchen_appliances where id='${id}'`,next)
}

const updateAppliancesById=(data,id,next)=>{
    conn.query(`update kitchen_appliances set name='${data.name}',description='${data.description}',category='${data.category}',scale='${data.scale}',min='${data.min}',max='${data.max}' where id='${id}'`,next)
}
module.exports={
    getAllAppliances,
    createAppliances,
    changeAppliancesStatus,
    deleteAppliancesById,
    getAppliancesById,
    updateAppliancesById
}         