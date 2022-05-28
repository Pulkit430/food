const { response } = require('express')
const ErrorNames = require('../../utils/ErrorNames')
const adminTakeawayModel=require('../model/adminTakeawayModel')
const common = require('../model/common')

const registerTakewayByAdmin=(req,res)=>{
    adminTakeawayModel.getAllTakeawayByEmail(req.body.email,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong")
        }else if(result.length>0){
            console.log("email alredy exist")
            res.status(400).send("Email Already Exist")
        }
        else{
            // console.log(req.body)
            let owner=req.body.owner
            let type=req.body.type
            adminTakeawayModel.createTakeawayByAdmin(req.body,(err,result)=>{
                if(err){
                    console.log(err)
                    res.status(500).send("Something went wrong")
                }else{
                   let  id=result.insertId
                    console.log("success",id)
                    let data={
                        id:id,
                        name:owner

                    }
                    adminTakeawayModel.createTakeawayperson(data,(err,result)=>{
                        if(err){
                            res.status(500).send(err,"Something went wrong")
                        }else{
                            // res.status(200).send("success")
                            let dataToMapType={
                                takeawayId:id,
                                type:type
                            }
                            adminTakeawayModel.mapTakeawayType(dataToMapType,(err,result)=>{
                                if(err){
                                    res.status(500).send(err,"Something went wrong")
                                }else{
                                    res.status(200).send("success")
                            }})
                        }
                    })

                    // res.status(201).send("TakeAway Created Successfully")
                }
            })
        }
    })
    // console.log("reached")
    
}

const deleteTakeawayById = (id)=> {
    return new Promise((resolve, reject)=> {
        adminTakeawayModel.deleteTakeawayById(id,(err,result)=>{
            if(err) reject(err)
            else resolve(result)
            
        })  
    })
}

const deleteTakeaway=(req,res)=>{

    deleteTakeawayById(req.body.id)
    .then(()=> {
        res.status(200).send("TakeAway Deleted Successfully")        
    })
    .catch((error)=> {
        if(error.errno == 1451){  // foreign key reference error
            common.getColumnReferences('takeaway','id', (err, result)=> {
                if(err) return res.status(500).send(err)
                if(result.length == 0){
                    deleteTakeawayById(req.body.id)
                    .then(()=> res.status(200).send("TakeAway Deleted Successfully"))
                    .catch((err12)=> res.status(500).send("Something went wrong " + err12))
                    return
                }
                let i = 0
                for(const obj of result.values()){
                    common.deleteEntryFromTable(obj.TABLE_NAME, obj.COLUMN_NAME, req.body.id, (err2, result2)=> {
                        if(err2) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err2)
                        i += 1
                        if(i === result.length){
                            deleteTakeawayById(req.body.id)
                            .then(()=> res.status(200).send("TakeAway Deleted Successfully"))
                            .catch((err12)=> res.status(500).send("Something went wrong " + err12))       
                        }
                    })
                }
            })
        }
    })

    
    
}
//1451


const createTakeawayType = (nameArg, res) =>{
    const name = nameArg.toLowerCase()

    adminTakeawayModel.getAllTakeawayTypes((err, result)=>{
        if(err){
            res.sendStatus(500)
            return console.log(err)
        }
        // console.log(result)
        if(result.findIndex((item)=> item.name == name) != -1 ){
            res.status(400).send(ErrorNames.alreadyExist)
            return
        }


        adminTakeawayModel.createTakeawayType(name, (err2, result2) => {
            if(err2){
                // console.log(result2)
                res.status(500).send(ErrorNames.somethingWentWrong)
            }
            else
                res.send(ErrorNames.takeawayTypeCreated)
        })
    })

}


const getTakeawayList = (res)=>{
    adminTakeawayModel.getTakeawayList()
    .then((modelRes)=> {
        // recursiveFun(modelRes,0)
        // res.send(modelRes)
        const arrIds = []
        for(const val of modelRes)
            arrIds.push(val.id)
        adminTakeawayModel.getTypeOfTakeaways(arrIds,true, (err, result)=> {
            if(err) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err)

            for(let i = 0; i< modelRes.length; i++){
                const arr = []
                for(const item of result.values()){
                    if(item.takeaway_id === modelRes[i].id){
                        delete item.takeaway_id
                        arr.push(item)
                    }
                }
                if(arr.length > 0){
                    modelRes[i].type = arr
                }
            }
            res.send(modelRes)
        })
        
    })
    .catch((err)=> res.send(ErrorNames.somethingWentWrong + " " + err))
}


const getTakeawayById = (takeawayId, res) => {
    adminTakeawayModel.getTakeawayById(takeawayId)
    .then(response=> {
        adminTakeawayModel.getTypeOfTakeaways([takeawayId], false,(err, result)=> {
            if (err) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err)
            response[0].type = result
            res.send(response[0])
        })
    })
    .catch(err=> res.status(500).send(ErrorNames.somethingWentWrong + " " + err))
}

const getEntityList = (res)=>{
    adminTakeawayModel.getEntityList((err, result)=>{
        if(err) res.status(500).send(ErrorNames.somethingWentWrong)
        else res.send(result)
    })
}
const changeTakeawayStatus=(req,res)=>{
    adminTakeawayModel.changeTakeawayStatus(req.body.id,req.body.status,(err,result)=>{
        if(err)  res.status(500).send(ErrorNames.somethingWentWrong)
        else{    
            res.status(200).send("Ok") 
            console.log(result)
        } 
    })
    console.log(req.body)
}

const updateTakeaway=(req,res)=>{
    console.log(req.body)
    adminTakeawayModel.updateTakeaway(req.body.id,req.body.data,(err,result)=>{
        if(err) res.status(500).send(ErrorNames.somethingWentWrong)
        res.status(200).send("Success")
    })
}

const countOfAllTakeaways=(req,res)=>{
    common.countOfAllTakeaways()
    .then((response)=>{
        res.status(200).send(response)

        
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
}


module.exports={
    getTakeawayById,
    getEntityList, getTakeawayList, registerTakewayByAdmin,deleteTakeaway, createTakeawayType,
    changeTakeawayStatus,updateTakeaway,countOfAllTakeaways
}