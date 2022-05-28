const  conn=require('./../../db/config')

const createEntity=(data,next)=>{
  conn.query(`INSERT INTO entities (name,description,type) VALUES ('${data.name}', '${data.description}','${data.type}')`,next)
}

const deleteEntityById=(id,next)=>{
    conn.query(`Delete from entities where id=${id}`,next)
}

const getEntityById=(idStr,next)=>{
  console.log(idStr)
    conn.query(`select name from entities where id in(${idStr}) and status=1`,next)
}
const getEntityByIdforUpdate=(id,next)=>{
  if(!id){
    return
  }
    conn.query(`select id, name,description from entities where id =${id} `,next)
}

const getEntitiesByIds = (ids, next)=> {
  let queryStr = `select name from entities where id in (${ids.join(',')})`
  conn.query(queryStr, next)
}

const addColumnToRecordTable=(tablename,columnsStr,next)=>{
  conn.query(`ALTER TABLE ${tablename} ${columnsStr}`,next)
}
const changeEntityStatus=(id,status,next)=>{
  conn.query(`UPDATE entities  SET status =${status} WHERE id=${id} ;`,next)
}

const updateEntity=(req,next)=>{
  conn.query(`UPDATE entities  SET ${req.name ? `name ='${req.name}'${req.desc ? ',':''}`:""} ${req.desc ? `description='${req.desc}'`:""} WHERE id=${req.id} ;`,next)
}
const getEntitiesById=(id)=>{
  return new Promise((resolve,reject)=>{
      conn.query(`select name from entities where id='${id}'`,(err,result)=>{
          if(err)resolve(id)
          else{
              resolve(result)
          }
      })
  })
  
}

module.exports={
  getEntitiesByIds,
  changeEntityStatus,
  createEntity,
  deleteEntityById,
  getEntityById,
  addColumnToRecordTable,
  updateEntity,
  getEntityByIdforUpdate,
  getEntitiesById
}
