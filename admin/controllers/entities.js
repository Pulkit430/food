const entityModel=require('./../model/entitiesModel')
const common = require('../model/common')
const ErrorNames = require('../../utils/ErrorNames')
const conn = require('../../db/config')
const createEntity=(req,res)=>{
    console.log(req.body)
    entityModel.createEntity(req.body,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("something went wrong")
        }else{
            res.status(201).send("created Successfully")
        }
    })
}

const deleteEntityById = (id)=> {
    return new Promise((resolve, reject)=> {
        entityModel.deleteEntityById(id,(err,result)=>{
            if(err) reject(err)
            else resolve(result)
        })
    }) 
}

const deleteEntity=(req,res)=>{
    deleteEntityById(req.body.id)
    .then(()=> {
        res.status(200).send("Entity Deleted Successfully")        
    })
    .catch((error)=> {
        if(error.errno == 1451){  // foreign key reference error
            common.getColumnReferences('entities','id', (err, result)=> {
                if(err) return res.status(500).send(err)
                if(result.length == 0){
                    deleteEntityById(req.body.id)
                    .then(()=> res.status(200).send("Entity Deleted Successfully"))
                    .catch((err12)=> res.status(500).send("Something went wrong dasd dd" + err12))
                    return
                }
                let i = 0
                for(const obj of result.values()){
                    common.deleteEntryFromTable(obj.TABLE_NAME, obj.COLUMN_NAME, req.body.id, (err2, result2)=> {
                        if(err2) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err2)
                        i += 1
                        if(i === result.length){
                            deleteEntityById(req.body.id)
                            .then(()=> res.status(200).send("Entity Deleted Successfully"))
                            .catch((err12)=> res.status(500).send("Something went wrong " + err12))       
                        }
                    })
                }
            })
        }
        else
            res.send(error)
    })
} 

const changeStatus=(req,res)=>{
 console.log(req.body)
 entityModel.changeEntityStatus(req.body.id,req.body.status,(err,result)=>{
     if(err){
         console.log(err)
         res.status(500).send("Something Went wrong")

     }else{
        res.status(200).send("Change  Successfully")
     }
 })
}

const getEntitiesByIds=(req,res)=>{
    // console.log(req.query.id)
    entityModel.getEntityByIdforUpdate(req.query.id,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something Went wrong")
        }else{
           res.status(200).send(result)

        }
    })
}

const editEntity=(req,res)=>{
    // console.log(req.body)
    // console.log(req.body)
    if(!req.id || (!req.name && !req.desc)){
        return res.status(400).send(ErrorNames.requiredNotFound)
    }
    entityModel.updateEntity(req,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something Went wrong")
        }else{
           res.status(200).send("success")
        }
    })
}




module.exports={editEntity,createEntity,deleteEntity,changeStatus,getEntitiesByIds}