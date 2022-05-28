const  updateRecordtype=(req,res)=>{
    console.log(req.body)
    let tableName=req.body.table_name
    let tableId=req.body.id
    let ids=req.body.entities
    let entitiesAlredyPresentInTable=[]
    let entitiesToAddInTable=[]
    let entitiesToRemoveFromTable=[]
    recordTableModel.getAllEntityAttachedWithTable(req.body.id)
    .then((response)=>{
        if(response.length>0){
            for(let x in response){
                entitiesAlredyPresentInTable.push(response[x].entity_id)
            }
            console.log(entitiesAlredyPresentInTable)
            for(let x in ids){
                let index=entitiesAlredyPresentInTable.indexOf(ids[x])
                if(index>-1){
                    entitiesAlredyPresentInTable.splice(index,1)
                }else{
                    entitiesToAddInTable.push(ids[x])
                }
            }
            entitiesToRemoveFromTable=entitiesAlredyPresentInTable
            // console.log(entitiesToAddInTable)



            let strId=''
            if(entitiesToRemoveFromTable.length>1){
                for (let x of entitiesToRemoveFromTable){
                    strId+=x+','
                }
                strId=strId.slice(0,-1)
            }
            else{
                strId=entitiesToRemoveFromTable[0]
            }
            console.log(strId)
            if(strid){

            }
           






           
           


        }else{
            console.log("no entity")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    // recordTableModel.updateTableNameinMappingTable(req.body.id,req.body.name)
    // .then((response)=>{
    // }).catch((err)=>{
        
    // })
}

const removeEntitiesFromMappingTable=(strId,tableId)=>{



recordTableModel.removeEntitiesFromMappingTable(strId,tableId)
.then((response1)=>{
    
    let multipleIdstr=''
    if(entitiesToAddInTable.length>1){
        for(let x of entitiesToAddInTable){
            multipleIdstr+=`(${x},${tableId}),`
        }

    }else{
        multipleIdstr+=`(${entitiesToAddInTable[0]},${tableId})`
    }
    multipleIdstr=multipleIdstr.slice(0,-1)
    console.log(multipleIdstr)
    recordTableModel.addEntityToMapTable(multipleIdstr)
    .then((response4)=>{
        console.log(response4)
        let strToGetEntityName=''
        if(entitiesToAddInTable.length>1){
            for(let x of entitiesToAddInTable){
                strToGetEntityName+=x+','
            }
            strToGetEntityName=strToGetEntityName.slice(0,-1)
        }
        else{
            strToGetEntityName+=entitiesToAddInTable[0]
        }

        recordTableModel.getEnitityNames(strToGetEntityName)
            .then((response2)=>{
                let entitiesNameForCreateColumn=[]
                if(response2.length>0){
                    for(let x of response2){
                        entitiesNameForCreateColumn.push(x.name.replaceAll(' ','_') +" VARCHAR(50)")
                    }
                }else{
                    console.log("error")
                }
                console.log(entitiesNameForCreateColumn)
                recordTableModel.addColumnToRecordTable(entitiesNameForCreateColumn,tableName)
                .then((response5)=>{
                    console.log("success")
                }).catch((err5)=>{
                    console.log(err5)
                })

            })
            .catch((err2)=>{
                console.log(err2)
            })
    })
    .catch((err4)=>{
        consolele.log(err4)
    })



})
.catch((e)=>{
    console.log("error in delete map entity"+e)
}) 

}

