const ErrorNames = require('../../utils/ErrorNames')
const adminSurveyorModel = require('../model/adminSurveyorModel')
const getSurveyorList = (res)=> {
  adminSurveyorModel.getSurveyorList((err, result)=> {
    if(err) return res.status(500).send(ErrorNames.somethingWentWrong)
    res.send(result)
  })
} 
const registerSurveyorByAdmin=(req,res)=>{
    console.log(req.body)
  adminSurveyorModel.getAllSurveyorByEmail(req.body.email,(err,result)=>{
      if(err){
          console.log(err)
          res.status(500).send("Something went wrong")
      }else if(result.length>0){
        //   console.log(result)
          console.log("email already exist")
          res.status(400).send("Email already exist")
      }else{
          adminSurveyorModel.createSurveyorByAdmin(req.body,(err,result)=>{
              if(err){
                  console.log(err)
                  res.status(500).send("Something went wrong")
              }else{
                  console.log("created")
                  res.status(201).send("Surveyor Created Successfully")
              }
          })
      }
  })
}

const deleteSurveyor=(req,res)=>{
  adminSurveyorModel.deleteSurveyorById(req.body.id,(err,result)=>{
      if(err){
          console.log(err)
          res.status(500).send("Something went wrong")
      }else{
          res.status(200).send("Surveyor Deleted Successfully")
          
      }
  })
}
const changeSurveyorStatus=(req,res)=>{
    // console.log(req.body)
    adminSurveyorModel.changeSurveyorStatus(req.body.id,req.body.status,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Something went wrong")
        }else{
            res.status(200).send("Change satus Successfully")
            
        }
    })
}
const getSurveyorById=(id,res)=>{
    // console.log(id)
    adminSurveyorModel.getSurveyorById(id,(err,result)=>{
         if(err){
            res.status(500).send("Something went wrong")
         }else{
            res.status(200).send(result[0])
         }
    })
}

const editSurveyor=(req,res)=>{
    adminSurveyorModel.editSurveyor(req.body.id,req.body.data,(err,result)=>{
        if(err){
            res.status(500).send("Something went wrong"+err)
        }
        else{
            res.status(200).send("Success")
        }
    })
}

module.exports = {editSurveyor,getSurveyorById,registerSurveyorByAdmin,deleteSurveyor, getSurveyorList,changeSurveyorStatus}