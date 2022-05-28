const conn=require('./../db/config')

const getAllRows = (takeawayTypeId, columnNames, tableName, next)=> {
  let queryStr = `select ${columnNames.join(',')}`
  queryStr += " from " + tableName
  queryStr += takeawayTypeId ? ` where takeawayType='${takeawayTypeId}'`: ""
  conn.query(queryStr, next)
}

const getMapping = (tableName,toMapColumnName,mapToColumnName, mapToColumnValue, next)=> {
  conn.query(`select ${toMapColumnName} from ${tableName} where ${mapToColumnName}=${mapToColumnValue}`, next)
}

const insertMultipleRowMaps = (tableName,columnName,  itemIds,  takeawayId, next) => {
  
  let strQuery = `insert into ${tableName} (${columnName}, takeaway_id) values `
  
  for(const id of itemIds.values()){
      strQuery += `('${id}', '${takeawayId}'),`
  }
  strQuery = strQuery.slice(0, strQuery.length - 1)   // to delete comma at the end

  conn.query(strQuery, next)
}


const insertNewRows = (tableName, items, next) => {
  
  let strQuery = `insert into ${tableName} (`
  for (const key in items[0]){
      strQuery += `${key},`
  }
  strQuery = strQuery.slice(0, strQuery.length - 1)
  strQuery += ") values "
  for (const item of items.values()){
      strQuery += `(`
      for (const key in items[0]){
          strQuery += `'${item[key]}',`
      }
      strQuery = strQuery.slice(0, strQuery.length - 1)
      strQuery += `),`
  }
  strQuery = strQuery.slice(0, strQuery.length - 1)
  conn.query(strQuery, next)
}


const getAllActiveMenuItems=(next)=>{
  conn.query("Select name,id from menu_items where status=1",next)
}

module.exports={
  insertMultipleRowMaps,
  insertNewRows,
  getAllRows, 
  getMapping,
  getAllActiveMenuItems
}