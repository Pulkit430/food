// const md5=require('md5')
const conn=require('../../db/config')

const createTakeawayByAdmin=(data,next)=>{
    // console.log("createdByadmin",data)
    conn.query(`INSERT INTO takeaway (takeaway_name, email, password,mobile,created_by)VALUES ('${data.name}', '${data.email}', '${data.password}','${data.mobile}',0)`,next)
}
const getAllTakeawayByEmail=(email,next)=>{
    conn.query(`select * from takeaway where email='${email}'`,next)
}


const deleteTakeawayById=(id,next)=>{
    conn.query(`delete from takeaway where id=${id}`,next)
}

const getAllTakeawayTypes = (next) => {
    conn.query("Select name from takeaway_types", next)
}

const createTakeawayType = (name, next) => {
    conn.query(`INSERT INTO takeaway_types (name) VALUES ('${name}')`,next)
}
const getTakeawayList = (next)=>{
    return new Promise((resolve, reject)=> {
        conn.query("select takeaway_name, email, id, status, created_by,modified_at from takeaway order by modified_at DESC", (err, result)=> {
            if(err) reject(err)
            else resolve(result)
        })
    })
}

const getEntityList = (next)=>{
    conn.query("select name, description, id, status, modified_at from entities order By modified_at DESC", next)
}

const getTakeawayById = (takeawayId)=> {
    // conn.query(`select t3.*, takeaway_types.name from takeaway_types right join 
    // (select takeaway.*, t2.takeaway_type from takeaway left join takeaway_type_mapping t2 on takeaway.id = t2.takeaway_id where takeaway.id = ${takeawayId}) t3 
    // on takeaway_types.id = t3.takeaway_type`, next)
    return new Promise((resolve, reject)=> {
        conn.query(`select * from takeaway where id=${takeawayId}`, (err, result)=> {
            if(err) reject(err)
            else resolve(result)
        }) 
    }) 
}
const getTypeOfTakeaways = (takeawayIds, shouldTakeawayIdAdd, next)=>{
    conn.query(`select ${shouldTakeawayIdAdd?`t1.takeaway_id,`:""} t1.takeaway_type as typeId, t2.name from takeaway_type_mapping t1 left join takeaway_types t2 on t1.takeaway_type = t2.id where t1.takeaway_id in (${takeawayIds.join(',')})`, next)
}
const changeTakeawayStatus=(id,status,next)=>{
    conn.query(`UPDATE takeaway  SET status =${status} WHERE id=${id} ;`,next)
}

const createTakeawayperson=(data,next)=>{
    conn.query(`insert into takeaway_persons(name,takeaway_id,role) values('${data.name}','${data.id}','Owner')`,next)
}

const mapTakeawayType=(data,next)=>{
    conn.query(`insert into takeaway_type_mapping(takeaway_id,takeaway_type)values('${data.takeawayId}','${data.type}')`,next)
}

const updateTakeaway=(id,data,next)=>{
    conn.query(`update takeaway set takeaway_name='${data.takeaway_name}',email='${data.email}',mobile='${data.mobile}' where id='${id}'`,next)
}



module.exports={
    getTakeawayById,changeTakeawayStatus,createTakeawayperson,mapTakeawayType,updateTakeaway,
    getTypeOfTakeaways, getEntityList, getTakeawayList, createTakeawayByAdmin,getAllTakeawayByEmail,deleteTakeawayById, createTakeawayType, getAllTakeawayTypes}
