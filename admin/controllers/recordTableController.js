const recordTableModel=require('./../model/recordTableModel')
const entitiesModel=require('./../model/entitiesModel')
const ErrorNames = require('../../utils/ErrorNames')
const common=require('../model/common')
const { response } = require('express')

const getAllRecordTypes = (res)=> {
    recordTableModel.getAllRecordTypes((err, result)=> {
        if(err) return res.status(500).send(err)
        return res.send(result)
    })
} 

const createRecordTable = (table_name, entityNames, res)=> {
    recordTableModel.createRecordTable(table_name, entityNames, (err, result)=> {
        if(err) {
            console.log(err)
            // return res.status(500).send("Record Type created but " + err)
        } 
        console.log(result)
        return res.status(201).send("Created Successfully")
    })
}

const createRecordType=(req,res)=>{

    let displayName=req.name
    let table_name=(displayName).trim()
    table_name=table_name.split(' ').join('_')
    // console.log(table_name)
    recordTableModel.getRecordTableByName(table_name,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong1")
        }else if(result.length>0){
            console.log()
            res.status(400).send("Name already Exist")
            
        }else{
            recordTableModel.createRecordType(displayName,table_name,(err,result)=>{
                if(err){
                    console.log(err)
                    res.status(500).send("Something went wrong")
                }
                else{
                    const recordTypeId = result.insertId
                    if(req.entityIds && Array.isArray(req.entityIds) && req.entityIds.length > 0){
                        
                        recordTableModel.insertEntitiesMap(recordTypeId, req.entityIds, (err, result)=> {
                            if (err) return res.status(500).send("Record Type created but " + err)

                            // entitiesModel.getEntitiesByIds(req.entityIds, (err, result)=> {
                            //     if (err) return res.status(500).send("Record Type created but " + err)
                            //     const entityNames = []
                            //     for(const val of result.values()){
                            //         entityNames.push(val.name.replaceAll(" ", "_"))
                            //     }
                            //     // console.log(entityNames)
                            // })
                            createRecordTable(table_name, req.entityIds, res)
                        })

                    }else{
                        createRecordTable(table_name, [], res)
                    }
                    
                }
            })
        }
    })
   
}

const deleteRecordTable=(req,res)=>{
    recordTableModel.getRecordTableById(req.body.tableId,(err,result)=>{
        if(err) res.status(500).send("something went wrong",err) 
        else if(result.length>0){
            let tableNameForDelete=result[0].tablename
            recordTableModel.deleteRecordTableRowById(req.body.tableId,(err,result)=>{
                if(err){
                    if(err.errno==1451){
                        common.getColumnReferences('record_type','id', (err2, result2)=> {
                        if(err2) res.status(500).send("something went wrong",err) 
                        else{
                            let i=0
                            for(let x of result2){
                                common.deleteEntryFromTable(x.TABLE_NAME,x.COLUMN_NAME,req.body.tableId,(err3,result3)=>{
                                if(err3) res.status(500).send("something went wrong",err) 
                                   i+=1
                                   if(i==result2.length){
                                       common.deleteEntryFromTable('record_type',"id",req.body.id,(err4,result4)=>{
                                           if(err4) res.status(500).send("Error",err4) 
                                           recordTableModel.deleteRecordTableByName(tableNameForDelete,(err5,result5)=>{
                                               if(err5)res.status(500).send("Error"+err5) 
                                               else{
                                                recordTableModel.deleteRecordTableRowById(req.body.tableId,(err7,result)=>{
                                                    if(err7) res.status(500).send("Error",err4)
                                                    else{
                                                        res.status(200).send("Success")
                                                    }
                                                })
                                               }
                                           })
                                       })
                                   }
                                })
                            }
                        }  
                        
                        })
                    }else{
                        console.log("test7")
                        res.status(500).send("something went wrong",err)
                    }
                    
                }
                else{
                    // res.status(200).send("Record Table Deleted Successfully")
                    console.log("test8")
                    recordTableModel.deleteRecordTableByName(tableNameForDelete,(err,result)=>{
                        if(err){
                            console.log("test9")
                            console.log(err)
                            res.status(500).send("something went wrong")
                        }else{
                            console.log("test10")
                            res.status(200).send("Deleted Successfully")

                        }
                    })
                }
            })           

        }else{
            res.status(404).send("No Record Found")
        }

    })
}

const addEntityToTable=(req,res)=>{
    let table_name=req.tableName
    let ids=req.entityIds
    
    if(ids.length>0 && table_name){
        recordTableModel.getEntityMap(req.recordTypeId)
        .then(storedEntityIdsObj => {
            let ind
            console.log(storedEntityIdsObj,ids)
            for (const obj of Object.values(storedEntityIdsObj)){
                ind = ids.findIndex((item)=> item == obj.entity_id)
                if(ind > -1)
                    ids.splice(ind, 1)
            }
            recordTableModel.insertEntitiesMap(req.recordTypeId, ids, (err, result)=> {
                if(err) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err)
    
                let idStr=''
                for(let x of ids){
                    idStr+=x+","
                }
                idStr=idStr.slice(0, -1)
                entitiesModel.getEntityById(idStr,(err,result)=>{
                    if(err){
                        console.log(err)
                        res.status(500).send("Something went wrong")
                    }else{
                        let columnsStr=''
                        for(let x of result){
                            columnsStr+="ADD "+x.name+" VARCHAR(20),"
                        }
                        columnsStr=columnsStr.slice(0,-1)
                        // res.send(columnsStr)
                        // console.log(columnsStr)
                        entitiesModel.addColumnToRecordTable(table_name,columnsStr,(err,result)=>{
                            if(err)
                            {
                                console.log(err)
                            }else{
                                res.status(201).send("Columns Added Successfully")
                            }
                        })
                    }
                }) 
            })
        })
        .catch(err=> res.status(500).send(ErrorNames.somethingWentWrong + " " + err))
    }
    else{
        res.status(400).send("Provide Columns or Table name") 
    }
}



const getRecordTableById=(req,res)=>{
// console.log(req.query.id)
recordTableModel.getRecordTableById (req.query.id,(err,result)=>{
    if(err) res.status(500).send("Something went wrong "+err)
    else if(result.length<1){
        res.status(404).send('No record Found')
    }
    else{
        recordTableModel.getEntityMap(req.query.id)
        .then((response)=>{
            let entitiesIds=[]
            for(let x in response){
                console.log(response[x].entity_id)
                entitiesIds.push(response[x].entity_id)
            }
            result[0].entityIds=entitiesIds
             res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send("Something went wrong")
        })
    }
})
}

const changeRecordTypeStatus=(req,res)=>{
    recordTableModel.changeRecordTypeStatus(req.body.id,req.body.status,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong") 
        }else{
            res.status(200).send("Change Successfully") 
        }
    })
    console.log(req.body)
}

const getAllTakeawayTypes=(req,res)=>{
    recordTableModel.getAllTakeawayTypes((err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong") 
        }else{
            res.status(200).send(result) 
        }
    })
}

const getAllMenuItems=(req,res)=>{
    recordTableModel.getAllMenuItems((err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong") 
        }else{
            res.status(200).send(result) 
        }
    })
}
const changeMenuItemStatus=(req,res)=>{
    console.log(req.body)
    recordTableModel.changeMenuItemStatus(req.body.id,req.body.status,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong") 
        }else{
            res.status(200).send("success") 
        }
    })
}                             

const getMenuItemsById=(req,res)=>{
    recordTableModel.getMenuItemById(req.query.id,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong") 
        }
        else if(result.length>0){
            res.status(200).send(result) 

        }
        else{
            res.status(404).send("No record found") 
        }
    })
}

const createMenuItems=(req,res)=>{
    recordTableModel.createMenuItems(req.body,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong") 

        }else{
            // console.log("success")
            res.status(200).send("success") 

        }
    })

}

const updateMenuItems=(req,res)=>{
    recordTableModel.updateMenuItems(req.body.id,req.body.data,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong") 
        }else{
            res.status(200).send("success") 
        }
    })
}

const deleteMenuItemById=(req,res)=>{
    // console.log(req.body)
    recordTableModel.deleteMenuItemById(req.body,(err,result)=>{
        if(err) res.status(500).send("Something went wrong") 
        res.status(200).send("Success")
    })
}

const updateRecordtype=(req,res)=>{
    let addFlag=false
    let removeFlag=false
    let tableName=req.body.table_name
    let tableId=req.body.id
    let ids=req.body.entities
    console.log(ids)
    let entitiesAlredyPresentInTable=[]
    let entitiesToAddInTable=[]
    let entitiesToRemoveFromTable=[]
    recordTableModel.getAllEntityAttachedWithTable(req.body.id)
    .then((response)=>{
            for(let x in response){
                entitiesAlredyPresentInTable.push(response[x].entity_id)
            }
            for(let x in ids){
                let index=entitiesAlredyPresentInTable.indexOf(ids[x])
                if(index>-1){
                    entitiesAlredyPresentInTable.splice(index,1)
                }else{
                    entitiesToAddInTable.push(ids[x])
                }
            }
            entitiesToRemoveFromTable=entitiesAlredyPresentInTable
            console.log("for add"+entitiesToAddInTable)
            let strId=''
            if(entitiesToRemoveFromTable.length>0){
                for (let x of entitiesToRemoveFromTable){
                    strId+=x+','
                }
                strId=strId.slice(0,-1)
            }
            
            console.log(strId)
            recordTableModel.removeEntitiesFromMappingTable(strId,tableId)
            .then((response1)=>{
                console.log("deleted")
                let multipleIdstr=''
                if(entitiesToAddInTable.length>0){
                    for(let x of entitiesToAddInTable){
                        multipleIdstr+=`(${x},${tableId}),`
                    }

                    multipleIdstr=multipleIdstr.slice(0,-1)
                }
                console.log(multipleIdstr)
                console.log("for add"+entitiesToAddInTable)
                recordTableModel.addEntityToMapTable(multipleIdstr,entitiesToAddInTable)
                .then((response4)=>{
                    console.log(response4)
                    if(entitiesToAddInTable.length>0){
                        let entitiesNameForCreateColumn=[]
                        for(let x of entitiesToAddInTable){
                            entitiesNameForCreateColumn.push("ADD col"+x+" VARCHAR(50)")
                        }
                        recordTableModel.addColumnToRecordTable(entitiesNameForCreateColumn,tableName)
                        .then((response5)=>{
                            console.log("success")
                            addFlag=true
                            res.status(200).send("Success")
                        }).catch((err5)=>{
                            console.log(err5)
                        })
                    }
                    else{
                        console.log("Nothing to Add")
                        res.status(200).send("NOTHING TO ADD")
                    }
                })
                .catch((err4)=>{
                    console.log(err4)
                })
            })
            .catch((e)=>{
                console.log("error in delete map entity"+e)
            }) 
       
    })
    .catch((err)=>{
        console.log(err)
    })
}



const getTableByIdForRecordCreation=(req,res)=>{
    // console.log(req.query.id)
recordTableModel.getRecordTableById (req.query.id,(err,result)=>{
    if(err) res.status(500).send("Something went wrong "+err)
    else if(result.length<1){
        res.status(404).send('No record Found')
    }
    else{
        recordTableModel.getEntityMap(req.query.id)
        .then((response)=>{
            let entitiesIds=[]
            // console.group(response)
            for(let x in response){
                console.log(response[x].entity_id)
                entitiesIds.push({id:response[x].entity_id,name:response[x].name,type:response[x].type})
            }
            result[0].entityIds=entitiesIds
             res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send("Something went wrong")
        })
    }
})
}


const createRecord=(req,res)=>{
    let tableName=req.body.tableName
    let data=req.body.dataforInsert
    // console.log(data)
    let columnStr=''
    let valueStr=''
    for(let x of data){
        columnStr+=x.columnName+","
        valueStr+=" '"+x.columnValue+"',"
    }
    columnStr = columnStr.slice(0, -1)
    valueStr = valueStr.slice(0, -1)
    // console.log(columnStr,valueStr)
    recordTableModel.insertDataIntoRecordTable(tableName,columnStr,valueStr)
    .then((response)=>{
        res.status(200).send("Success")

    }).catch((e)=>{
        res.status(200).send(e)
        
    })

    // res.send(columnStr)

}

const getAllDataInsideAReacordTable=async(req,res)=>{
    let tableName=''
    recordTableModel.getRecordTableById(req.query.id,(err,result)=>{
        if(err) res.status(500).send("Something went wrong")
        else{
            tableName=result[0].tablename
            recordTableModel.getAllDataInsideAReacordTable(tableName)
            .then(async(response)=>{
                // console.log(response)
                if(response.length>0){

                    let keys=Object.keys(response[0])
                    // console.log(keys)
                    let columnNames= await getAllcolumnNameInATable(keys)
                    try{
                        //  console.log(columnNames)
                         let mainResponse={
                             "column":columnNames,
                             "data":response
                         }
                        //  console.log(mainResponse)
                         res.status(200).send(mainResponse)
                    }
                    catch{

                    }

                }else{
                    res.status(404).send(response)

                }
                
                
            })
            .catch((e)=>{
                console.log(e)
                res.status(500).send(e)
            })
        }
    })
}

const getAllcolumnNameInATable=async(data)=>{
    return new Promise((resolve,reject)=>{

        let names=[]
        // console.log(data)
        for(let x in data){
            let id=data[x].substring(3)
            entitiesModel.getEntitiesById(id)
            .then((result)=>{
                if(result[0]){
                    names.push(result[0].name)
                }else{
                    names.push(data[x])
                }
                if(names.length===data.length){
                    // console.log(names)
                    resolve(names)
                }
            })
            .catch((e)=>{
                console.log(e)
                names.push(data[x])
            })
            
        }
    })
}







module.exports={createRecord,updateRecordtype,getTableByIdForRecordCreation,deleteMenuItemById,updateMenuItems,getMenuItemsById,createMenuItems,changeMenuItemStatus,getAllMenuItems,getAllTakeawayTypes,createRecordType,deleteRecordTable,addEntityToTable, getAllRecordTypes,changeRecordTypeStatus,getRecordTableById,getAllDataInsideAReacordTable}