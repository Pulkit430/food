const conn=require('./../db/config')
// const md5=require('md5')


const takeawayLogin = (data,next)=>{
    conn.query(`select id, takeaway_name,email, mobile from takeaway where email='${data.email}' and password='${data.password}'`,next)
}

const checkEmail = (email, next) =>{
    conn.query(`select email from takeaway where email = '${email}'`, next)
}

const checkName = (name, next)=>{
    conn.query(`select id from takeaway where takeaway_name = '${name}'`, next)
}

const createTakeaway = (takeawayObj, next) => {
    conn.query(`INSERT INTO takeaway (takeaway_name, email, password, mobile) VALUES (
    '${takeawayObj.takeawayName}', 
    '${takeawayObj.email}',
    '${takeawayObj.password}',
    '${takeawayObj.mobileNo}'
    )`, next)
}

const mapTakeawayTypes = (takeawayId, takeawayTypeIds, next)=> {
    let queryStr = "insert into takeaway_type_mapping (takeaway_type,takeaway_id) values "
    for(const typeId of takeawayTypeIds){
        queryStr += `('${typeId}', '${takeawayId}'),`
    }
    queryStr = queryStr.slice(0, -1)
    conn.query(queryStr, next)
}

const addTakeawayStaff = (req, next)=> {
    conn.query(`INSERT INTO takeaway_persons (name, email, role, mobile, takeaway_id,address, id_proof ) VALUES (
    '${req.name}', 
    '${req.email??''}',
    '${req.role}',
    '${req.mobileNo??''}',
    '${req.takeawayId}',
    '${req.address??''}',
    '${req.idProof??''}'
    )`, next)
}

const getTakeawayTypes = (next)=> {
    conn.query(`select id as typeId, name from takeaway_types`, next)
}

// const getTakeawayTypeName = (id, next) => {
//     conn.query(`select name from takeaway_types where id='${id}'`, next)
// }

const getStaff = (takeawayId, next)=> {
    conn.query(`select * from takeaway_persons where takeaway_id = '${takeawayId}'`, next)
}
const getTypeOfTakeaways = (takeawayIds, shouldTakeawayIdAdd, next)=>{
    conn.query(`select ${shouldTakeawayIdAdd?`t1.takeaway_id,`:""} t1.takeaway_type as typeId, t2.name from takeaway_type_mapping t1 left join takeaway_types t2 on t1.takeaway_type = t2.id where t1.takeaway_id in (${takeawayIds.join(',')})`, next)
}

const getRecordTypesOfTakeaway = (takeawayId, next) => {
    conn.query(`select t2.* from record_type_takeaway_mapping t1 left join record_type t2 on t1.record_type_id = t2.id where t1.takeaway_id = ${takeawayId}`, next)   
}

const getRecordTableName = (recordTypeId, next)=> {
    conn.query(`select tablename from record_type where id=${recordTypeId}`, next)
}

const getRecordData = (tablename, takeawayId, date, next)=> {
    conn.query(`select * from ${tablename} where takeaway_id = '${takeawayId}' ${date ? `AND (created_at between "${date} 00:00:00" and "${date} 23:59:59")`:""}`, next)
}

const getEntitiesOfRecordType = (recordTypeId, next) => {
    conn.query(`select t2.name, t2.column_name, t2.type from record_type_entity_mapping t1 left join entities t2 on t1.entity_id= t2.id where t1.record_type_id = '${recordTypeId}'`, next)
}
const profileSetup=(owner,manager,staff,takeaway_id)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`insert into takeaway_persons (name, email, role, mobile, takeaway_id,address) values
        ('${owner.name}','${owner.email}','${owner.role}','${owner.mobile}','${takeaway_id}','${owner.address}'),
        ('${manager.name}','${manager.email}','${manager.role}','${manager.mobile}','${takeaway_id}','${manager.address}'),
        ('${staff.name}','${staff.email}','${staff.role}','${staff.mobile}','${takeaway_id}','${staff.address}')
        `,(err,result)=>{
            if(err) reject(err)
            else{
                resolve(result)
            }
        })
    })
}

const mapItemstoTakeaways = (selected,tablename,takeawayId,column_name) => {
  return new Promise((resolve,reject)=>{
      if(selected.length<1){
        resolve("No data")
      }else{
        let queryStr = `insert into ${tablename} (${column_name}, takeaway_id) values `
        for(const id of selected.values()){
          queryStr += `('${id}','${takeawayId}'),`
        }
        queryStr = queryStr.slice(0,-1)  // to delete comma at last
        
        conn.query(queryStr,(err,result)=>{
            if(err) reject(err)
            else{
                resolve(result)
            }
        } )
      }
  })
  
  }

  const getCountPerRecordInsertedByTakeaway=(tablename,takeawayId)=>{
      return new Promise((resolve,reject)=>{
          conn.query(`select id from ${tablename} where takeaway_id='${takeawayId}'`,(err,result)=>{
              if(err)reject (err)
              else{
                  resolve(result)
              }
          })

      })
  }

  const checkRecordMappingWithTakeaway=(recordTypeId,takeawayId)=>{
      return new Promise((resolve,reject)=>{
          conn.query(`select * from record_type_takeaway_mapping where record_type_id='${recordTypeId}' and takeaway_id='${takeawayId}'`,(err,result)=>{
           if(err) reject(err)
           else{
               resolve(result)
           }   
          })
      })
  }
  const getTakeawayDataInsideAReacordTable=()=>{
      
  }

module.exports={
    getEntitiesOfRecordType,
    getRecordData,
    getCountPerRecordInsertedByTakeaway,
    getRecordTableName,
    getRecordTypesOfTakeaway,
    mapTakeawayTypes,
    getTypeOfTakeaways,
    getStaff,
    getTakeawayTypes,
    addTakeawayStaff, takeawayLogin, checkEmail, createTakeaway, checkName,profileSetup,
    mapItemstoTakeaways,
    getTakeawayDataInsideAReacordTable,
    checkRecordMappingWithTakeaway
}