const ErrorNames = require('../utils/ErrorNames')
const takeawayModel=require('./../model/takeawayModel')
const recordModel=require('./../model/recordTableModel')
const { somethingWentWrong } = require('../utils/ErrorNames')

const takeawayLogin=(req,res)=>{
    takeawayModel.takeawayLogin(req.body,(err,result)=>{
        if(err){
            res.status(500).send("Something went wrong " + err)
        }else if(result.length>0){
            const takeawayId = result[0].id
            takeawayModel.getTypeOfTakeaways([takeawayId], false, (err2, result2)=> {
                if(err2) return res.status(500).send(ErrorNames.somethingWentWrong + " "+ err2)
                if(result2.length > 0)
                    result[0].type = result2
                res.send(result[0])
            })
        }else{
            res.status(404).send("No Record found")
        }
    })
}

const signup = (req, res) => {
    if(!req.email || !req.mobileNo || !req.password || !req.takeawayName || !req.takeawayTypeId)
        return res.status(400).send(ErrorNames.requiredNotFound)
    
    takeawayModel.checkEmail(req.email, (err, result) => {
        if(err)
            return res.status(500).send(ErrorNames.somethingWentWrong)
        if(result.length > 0)
            return res.status(400).send("Email " + ErrorNames.alreadyExist)
        
        takeawayModel.checkName(req.takeawayName, (err, result)=>{
            if(err)
                return res.status(500).send(ErrorNames.somethingWentWrong)
            if(result.length > 0)
                return res.status(400).send("Takeaway Name " + ErrorNames.alreadyExist)

            takeawayModel.createTakeaway(req, (err, result) => {
                if(err)
                    return res.status(500).send(ErrorNames.somethingWentWrong)
                const takeawayId = `${result.insertId}`
                takeawayModel.mapTakeawayTypes(takeawayId, req.takeawayTypeId, (err2, result2)=> {
                    if(err2) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err2)
                    return res.send(takeawayId)
                        
                })
            })
        })
    })
} 

const addTakeawayStaff = (req, res) => {
    if(!req.name || !req.role || !req.takeawayId){
        return res.status(400).send(ErrorNames.requiredNotFound)
    }
    takeawayModel.addTakeawayStaff(req, (err, result)=> {
        if(err) {
            console.log(err)
            return res.status(500).send(ErrorNames.somethingWentWrong)
        }
        res.send(`${result.insertId}`)
    })
}

const getTakeawayTypes = (res)=> {
    takeawayModel.getTakeawayTypes((err, result)=> {
        if(err) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err)
        return res.send(result)
    })
}

const getStaff =(takeawayId, res)=> {
    takeawayModel.getStaff(takeawayId,(err,result)=> {
        if(err) return res.send(ErrorNames.somethingWentWrong + " " + err)
        return res.send(result)
    })
}

const getRecordTypesOfTakeaway = (takeawayId, res) => {
    takeawayModel.getRecordTypesOfTakeaway(takeawayId, async(err, result)=> {
        if(err) return res.send(ErrorNames.somethingWentWrong + " " + err)
        if(result.length>0){
            let response=await getCountOfRecord(result,takeawayId)
            try{
                res.status(200).send(response)
            }
            catch(e){
                res.status(200).send(result)
            }

        }else{
            res.status(400).send("No record")
        }
    })
}

const getCountOfRecord=(data,id)=>{
    return new Promise((resolve,reject)=>{
        for(let x in data){
            takeawayModel.getCountPerRecordInsertedByTakeaway(data[x].tablename,id)
            .then((result)=>{
                data[x].count=result.length
                if(x==data.length-1)
                {
                    // console.log(data)
                    resolve(data)
                }
            })
            .catch((e)=>{
                data[x].count=0
            })
        }

        
    })
}

const getRecordTableName = (recordTypeId)=> {
    return new Promise((resolve, reject)=> {
        takeawayModel.getRecordTableName(recordTypeId, (err, result)=> {
            if(err) reject(err)
            else {
                if(result.length > 0)
                    resolve(result[0].tablename)
                else
                    reject()
            }
        }) 

    })
}

const getRecordData = (req, res)=> {
    if(!req.recordTypeId || !req.takeawayId){
        res.status(400).send(ErrorNames.requiredNotFound)
        return
    }

    getRecordTableName(req.recordTypeId)
    .then((tablename)=> {
        takeawayModel.getRecordData(tablename, req.takeawayId,req.date, (err, result)=> {
            if(err) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err)
            res.send(result)
        })
    })
    .catch((err)=> res.status(500).send(ErrorNames.somethingWentWrong + " "+ err))
}

const getEntitiesOfRecordType = (recordTypeId, res) => {
    takeawayModel.getEntitiesOfRecordType(recordTypeId, (err, result)=> {
        if(err) return res.status(500).send(ErrorNames.somethingWentWrong + " " + err)
        // const arr = []
        // for(const item of result)
        //     arr.push(item.name)
        return res.send(result)
    })
}

const profileSetup=(req,res)=>{
    // console.log(req.body)
    let takeaway_id=req.body.id
    let appliancesArray=req.body.applicance
    let menuItems=req.body.menuItmes
    let records=req.body.records

        console.log(req.body)
        takeawayModel.profileSetup(req.body.owner,req.body.manager,req.body.staff,takeaway_id)
        .then((result)=>{
            console.log(result)
            takeawayModel.mapItemstoTakeaways(records,'record_type_takeaway_mapping',takeaway_id,'record_type_id')
            .then((result1)=>{
                takeawayModel.mapItemstoTakeaways(menuItems,'menu_items_mapping',takeaway_id,'menu_item_id')
                .then((result2)=>{
                    takeawayModel.mapItemstoTakeaways(appliancesArray,'kitchen_appliances_mapping',takeaway_id,'kitchen_appliance_id')
                    .then((result3)=>{
                        res.status(200).send("created")
                    })
                    .catch((e3)=>{
                        res.status(500).send(e3)
                    })
                })
                .catch((e2)=>{
                res.status(500).send(e2)
                })
            })
            .catch((e1)=>{
                res.status(500).send(e1)
            })

        })
        .catch((e)=>{
            res.status(500).send(e)
 
        })

    
}

const getTakeawayDataInsideAReacordTable=(req,res)=>{
    let takeaway_id=req.query.takeawayId
    let record_id=req.query.recordId
    console.log(takeaway_id,record_id)
    takeawayModel.checkRecordMappingWithTakeaway(record_id,takeaway_id)
    .then((result)=>{
        if(result && result.length>0){
            recordModel.getRecordTableName(record_id)
            .then((result1)=>{
                console.log(result1)
                recordModel.getDataFromRecordTableForTakeaway(result1[0].tablename,takeaway_id)
                .then((result2)=>{
                    console.log(result2)       
                    if(result2&&result2.length>0){
                        res.status(200).send(result2)
                    }else{
                        res.status(404).send("No data")
                    }
                })
                .catch((e2)=>[
                    res.status(500).send('somethingWentWrong' + e2)
                ])
            })
            .catch((e1)=>{
                res.status(500).send("Something went wrong")
            })
        }
    })
    .catch((e)=>{
        res.status(500).send("Something went Wrong")
    })


}

module.exports={
    getEntitiesOfRecordType,
    getRecordData,
    getRecordTypesOfTakeaway,
    getStaff,getTakeawayDataInsideAReacordTable,
    signup, takeawayLogin, addTakeawayStaff, getTakeawayTypes,profileSetup
}