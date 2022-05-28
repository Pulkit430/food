const { query } = require('express')
const conn=require('./../../db/config')

const getRecordTableByName = (tableName, next) => {
    conn.query(`select id from record_type where tablename = '${tableName}'`, next)
}

const createRecordType=(displayName,table_name,next)=>{
    conn.query(`Insert Into record_type (name,tablename) Values('${displayName}','${table_name}')`,next)
}

const createRecordTable= (tableName, entities, next) => {
    let queryStr = `create table ${tableName} (
        id int NOT NULL AUTO_INCREMENT,
        takeaway_id int DEFAULT NULL,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,`
    // console.log(entities)
    for (const entity of entities.values()){
        queryStr += ` col${entity}   varchar(20),` 
    }
    console.log(queryStr)
    queryStr += "PRIMARY KEY (`id`) )"
    conn.query(queryStr, next)
}

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

const insertEntitiesMap = (recordTypeId, entityIds, next)=> {
    let queryStr = `insert into record_type_entity_mapping (entity_id, record_type_id) values `
    for(const id of entityIds.values()){
        queryStr += `('${id}', '${recordTypeId}'),`
    }
    queryStr = queryStr.slice(0, -1)
    conn.query(queryStr, next)
}

const getRecordTableById=(id,next)=>{
    conn.query(`select * from record_type   where id='${id}'`,next) 
}


const getAllTable=(next)=>{
    conn.query(`select * from record_type`,next) 
}

const getEntityMap = (recordTypeId) => {
    return new Promise((resolve, reject)=> {
        conn.query(`select record_type_entity_mapping.entity_id , entities.* from record_type_entity_mapping  left join entities on record_type_entity_mapping.entity_id = entities.id where record_type_id = '${recordTypeId}'`, (err, result)=> {
            if(err) reject(err)
            else resolve(result)
        })
    })
}

const getAllRecordTypes = (next)=> {
    conn.query("select * from record_type  order by modified_at  DESC", next)
}
const changeRecordTypeStatus=(id,status,next)=>{
    conn.query(`UPDATE record_type  SET status =${status} WHERE id=${id};`,next)
}
const deleteRecordTableRowById=(id,next)=>{
    conn.query(`DELETE FROM record_type WHERE id=${id};`,next)
}
const deleteRecordTableByName=(table_name,next)=>{
 conn.query(`DROP TABLE ${table_name};`,next)
}
const getAllTakeawayTypes=(next)=>{
    conn.query("select * from takeaway_types",next)
}
const getAllMenuItems=(next)=>{
    conn.query(`select menu_items.*,takeaway_types.name as type from menu_items left join takeaway_types on menu_items.takeawayType=takeaway_types.id order by modified_at DESC`,next)
}
const changeMenuItemStatus=(id,status,next)=>{
    conn.query(`update menu_items set status='${status}' where id='${id}'`,next)
}
const getMenuItemById=(id,next)=>{
    conn.query(`select menu_items.*,takeaway_types.name as type from menu_items left join takeaway_types on menu_items.takeawayType=takeaway_types.id  where menu_items.id='${id}'`,next)
}
const createMenuItems=(data,next)=>{
    conn.query(`insert into menu_items (name,takeawayType) values('${data.name}','${data.type}')`,next)

}

const updateMenuItems=(id,data,next)=>{
    conn.query(`update  menu_items  set name='${data.name}',takeawayType='${data.type}' where id='${id}'`,next)
}

const deleteMenuItemById=(data,next)=>{
    conn.query(`delete from menu_items where id='${data.id}'`,next)
}

const getRecordTableAndEntitiesAttachedById=(id,next)=>{
    conn.query(`select * from record_type left join record_type_entity_mapping on record_type_entity_mapping.record_type_id =record_type.id  where record_type.id='${id}'`,next) 
}

const updateTableNameinMappingTable=(id,name)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`update record_type set name='${name}' where id=''${id}`,(err,result)=>{
            if(err) reject(err)
            else{
                resolve(result)
            }
        })
    })
}

const addEntityToMapTable=(entityId,entitiesToAddInTable)=>{
    return new Promise((resolve,reject)=>{
        if(entitiesToAddInTable.length>0){
            conn.query(`insert into record_type_entity_mapping (entity_id,record_type_id) value ${entityId}`,(err,result)=>{
                if(err) reject(err)
                else{
                    resolve(result)
                }
            })
        } 
        else{
            resolve("Nothing to Add")
        }
        })
}

const getAllEntityAttachedWithTable=(tableId)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`select entity_id from record_type_entity_mapping where record_type_id='${tableId}'`,(err,result)=>{
            if(err) reject(err)
            else{
                resolve(result)
            }
        })
    })
}

const removeEntitiesFromMappingTable=(ids,tableId)=>{
    return new Promise((resolve,reject)=>{
        if(ids){

            conn.query(`delete from record_type_entity_mapping where entity_id in(${ids}) and record_type_id=${tableId}`,(err,result)=>{
                if(err) reject(err)
                else{
                    resolve(result)
                }
            })
        }else{
            resolve("Nothing To Delete")
        }
    })
}

const getEnitityNames=(ids,entitiesToAddInTable)=>{
    return new Promise((resolve,reject)=>{
        if(entitiesToAddInTable.length>0){

            conn.query(`select name from entities where id in(${ids})`,(err,result)=>{
                if(err) reject(err)
                else{
                    resolve(result)
                }
            }) 
        }else{
            resolve("Nothing to get")
        }
    })

}



const addColumnToRecordTable=(entitiesNames,tableName)=>{
    let columnsStr=''
    return new Promise((resolve,reject)=>{
        for(let x of entitiesNames){
            columnsStr+=x+','
        }
        columnsStr=columnsStr.slice(0,-1)
        console.log(columnsStr)
        conn.query(`ALTER table ${tableName}  ${columnsStr}`,(err,result)=>{
            if(err) reject(err)
            else{
                resolve(result)
            }
        })
    })
}

const addMultipleEntityToTable=(strID,tableId)=>{

}

const insertDataIntoRecordTable=(tableName,columnStr,valueStr)=>{
    return new Promise((resolve,reject)=>{
        let mainStr=`insert into ${tableName} (${columnStr}) value(${valueStr})`
        // console.log(mainStr)
        conn.query(mainStr,(err,result)=>{
            if(err) reject(err)
            else{
                resolve(result)
            }
        })
    })
}

const getAllDataInsideAReacordTable=(tableName)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`select * from ${tableName} order by modified_at DESC`,(err,result)=>{
            if(err) reject(err)
            else{
                resolve(result)
            }
        })
    })
}

const testing=async(next)=>{
    // conn.query(`select col48 as  ${map('col48')} , col48 as  ${map('col49')} ,col48 as  ${map('col54')} from New_For_Testing,`,next)
    let str=`select col48 as  ${map('col48')} , col48 as  ${map('col49')} ,col48 as  ${map('col54')} from New_For_Testing`
    console.log(str)
}


const map=(name)=>{

    return new Promise((resolve,reject)=>{
        // let value=name.substring(3)
        conn.query(`select name from entities where id=${name}`,(err,result)=>{
            if(err) reject(err)
            else{
                resolve(result)
            }
        }) 
    })
}





module.exports={
    getAllRecordTypes,
    getMenuItemById,
    map,
    testing,
    getEntityMap,
    insertEntitiesMap,
    getRecordTableByName,
    createRecordType,
    createRecordTable,getAllTable,getRecordTableById,changeRecordTypeStatus,
    deleteRecordTableByName,
    deleteRecordTableRowById,
    getAllTakeawayTypes,
    getAllMenuItems,
    changeMenuItemStatus,
    createMenuItems,
    updateMenuItems,
    getColumnReferences,
    deleteMenuItemById,
    getRecordTableAndEntitiesAttachedById,
    addMultipleEntityToTable,
    updateTableNameinMappingTable,
    addEntityToMapTable,
    getAllEntityAttachedWithTable,
    removeEntitiesFromMappingTable,
    getEnitityNames,
    addColumnToRecordTable,
    insertDataIntoRecordTable,
    getAllDataInsideAReacordTable
    
}