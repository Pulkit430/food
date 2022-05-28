const appliancesModel=require('../model/AppliancesModel')

const getAllAppliances=(req,res)=>{
    appliancesModel.getAllAppliances((err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("something went wrong")
        }
        else{
            res.status(200).send(result)
        }
    })
}

const createAppliances=(req,res)=>{
    appliancesModel.createAppliances(req.body,(err,result)=>{
        if(err){
            res.status(500).send("Something went wrong")
        }else{
            res.status(200).send("Success")
        }
    })
    // console.log(req.body)
}

const changeAppliancesStatus=(req,res)=>{
    console.log(req.body) 
    appliancesModel.changeAppliancesStatus(req.body,(err,result)=>{
        if(err) res.status(500).send(err)
        res.status(200).send("Success")
    })
}
const deleteAppliancesById=(req,res)=>{
    console.log(req.body)
    appliancesModel.deleteAppliancesById(req.body,(err,result)=>{
        if(err) {
        console.log(err)
            res.status(500).send(err)
        }
        res.status(200).send("Success")
    })
}
const getAppliancesById=(req,res)=>{
    console.log(req.query.id)

    appliancesModel.getAppliancesById(req.query.id,(err,result)=>{
        if(err) res.status(500).send('Something went wrong'+err)
        res.status(200).send(result)
    })
}
const updateAppliancesById=(req,res)=>{
    console.log(req.body)
    appliancesModel.updateAppliancesById(req.body.data,req.body.id,(err,result)=>{
        if(err) res.status(500).send('Something went wrong'+err)
        res.status(200).send('Success')
    })
}

module.exports={
    getAllAppliances,
    createAppliances,
    changeAppliancesStatus,
    deleteAppliancesById,
    getAppliancesById,
    updateAppliancesById
    
}