const conn=require('../../db/config')


const getColumnReferences = (tableName, columnName, next) => {
  conn.query(`SELECT 
      TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME
  FROM
      INFORMATION_SCHEMA.KEY_COLUMN_USAGE
  WHERE
      REFERENCED_TABLE_SCHEMA = 'foodsenso' AND
      REFERENCED_TABLE_NAME = '${tableName}' AND
      REFERENCED_COLUMN_NAME = '${columnName}'
  `, next)
}
const deleteEntryFromTable = (tableName, columnName, columnVal,next)=> {
  conn.query(`delete from ${tableName} where ${columnName}='${columnVal}'`, next)
}

const countOfAllTakeaways=()=>{
  return new Promise((resolve,reject)=>{
    conn.query(`select count(id) from takeaway`,(err,result)=>{
      if(err) reject(err)
      else{
        resolve(result)
      }
    })
  })
}



module.exports = {
  getColumnReferences, deleteEntryFromTable,countOfAllTakeaways
}