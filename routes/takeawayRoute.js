const express=require('express')
const router=express.Router()
const takeawayController=require('../controllers/takeawayController')
const recordTableController = require('../controllers/recordTableController')
const menuItemsKitAppContr = require('../controllers/menuItemsKitAppContr')
const  bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/login',function (req,res) {
  const email = req.body.email
  const password = req.body.password
  takeawayController.takeawayLogin(req,res)
})

router.post('/signup', (req, res)=>{
  const reqObj = {
    email: req.body.email,
    mobileNo: req.body.mobileNo,
    password: req.body.password,
    takeawayName:req.body.takeawayName,
    takeawayTypeId: req.body.takeawayTypeId   // array
  }
  takeawayController.signup(reqObj, res)
})

router.post('/addStaff', (req, res)=>{
  const reqObj = {
    takeawayId: req.body.takeawayId,
    role: req.body.role,
    name: req.body.name,
    mobileNo: req.body.mobileNo,
    address: req.body.address,
    idProof: req.body.idProof,
    email: req.body.email
  }
  takeawayController.addTakeawayStaff(reqObj, res)
})

router.get('/getStaff', (req, res)=> {
  // could not use req.body because it was coming empty
  const takeawayId = req.query.takeawayId
  takeawayController.getStaff(takeawayId,res)
})


router.get('/menuItems', (req, res)=> {
  const takeawayTypeId = req.query.takeawayTypeId
  menuItemsKitAppContr.getAllMenuItems(takeawayTypeId,res)
})

router.post('/mapMenuItems', (req, res)=>{
  const reqObj = {
    selected: req.body.selected,
    new: req.body.new,
    takeawayId : req.body.takeawayId
  }
  menuItemsKitAppContr.mapMenuItems(reqObj, res)
})

router.get('/recordTypes', (req, res)=>{
  recordTableController.getAllRecordTypes(res)
})

router.post('/mapRecordTypes', (req, res)=> {
  const reqObj = {
    selected: req.body.selected,
    takeawayId: req.body.takeawayId
  }
  recordTableController.mapRecordTypesToTakeaways(reqObj, res)
})

router.get('/kitchenAppliances', (req, res)=> {
  menuItemsKitAppContr.getKitchenAppliances(res)
})

router.post('/mapKitchenAppliances', (req, res)=> {
  
  const reqObj = {
    selected: req.body.selected,
    new: req.body.new,
    takeawayId : req.body.takeawayId
  }
  menuItemsKitAppContr.mapKitchenAppliances(reqObj, res)
})

router.post('/createRecordEntry', (req, res)=> {
  const reqObj = {
    recordTableName: req.body.recordTableName,
    takeawayId: req.body.takeawayId,
    data: req.body.data    // data = {columnName: DATA, columnName: DATA}
  }
  recordTableController.createRecordEntry(reqObj, res)
})

router.patch('/editRecordEntry', (req, res)=> {
  const reqObj = {
    recordTableName: req.body.recordTableName,
    recordId: req.body.recordId,
    data: req.body.data  // data = {columnName: DATA, columnName: DATA}
  }
  recordTableController.editRecordEntry(reqObj, res)
})

router.get('/takeawayTypes', (req, res)=> {
  takeawayController.getTakeawayTypes(res)
})

router.get('/recordTypesOfTakeaway', (req, res)=> {
  const takeawayId = req.query.takeawayId
  takeawayController.getRecordTypesOfTakeaway(takeawayId, res)
})

router.get('/recordData', (req, res)=> {
  const reqObj = {
    takeawayId: req.query.takeawayId,
    recordTypeId: req.query.recordTypeId,
    date: req.query.date       // date = YYYY-MM-DD    // optional
  }
  takeawayController.getRecordData(reqObj, res)
})

router.get('/entitiesOfRecordType', (req, res)=> {
  const recordTypeId = req.query.recordTypeId
  takeawayController.getEntitiesOfRecordType(recordTypeId, res)
})


router.get('/getAllMenuItems',(req,res)=>{
  menuItemsKitAppContr.getAllActiveMenuItems(req,res)
})

router.post('/profileSetup',(req,res)=>{
  takeawayController.profileSetup(req,res)
}) 
router.get('/getTakeawayDataInsideAReacordTable',(req,res)=>{
  takeawayController.getTakeawayDataInsideAReacordTable(req,res)
})

module.exports=router