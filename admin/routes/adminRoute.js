const express=require('express')
const loginController=require('../controllers/login.js')
const adminTakeawayController=require('../controllers/adminTakeawayContr')
const adminSurveyorController=require('../controllers/adminSurveyorContr')
const entitiesController=require('../controllers/entities')
const recordTableController=require('../controllers/recordTableController')
const AppliancesContr=require('../controllers/AppliancesContr')
const router=express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/login',function (req,res) {
  loginController.login(req,res)
})
router.post('/registerTakeaway',function (req,res) {
  adminTakeawayController.registerTakewayByAdmin(req,res)
})
router.delete('/deleteTakeaway',function (req,res) {
  // const id = req.body.id
  adminTakeawayController.deleteTakeaway(req,res)
})
router.patch('/changeTakeawayStatus', (req, res)=> {
  // adminSurveyorController.changeSurveyorStatus(req,res)
  adminTakeawayController.changeTakeawayStatus(req,res)
})
router.patch('/updateTakeaway', (req, res)=> {
  // adminSurveyorController.changeSurveyorStatus(req,res)
  adminTakeawayController.updateTakeaway(req,res)
})
router.get('/countOfAllTakeaways',(req,res)=>{
  adminTakeawayController.countOfAllTakeaways(req,res)
})

router.post('/registerSurveyor',function (req,res) {
  adminSurveyorController.registerSurveyorByAdmin(req,res)
})
router.delete('/deleteSurveyor',function (req,res) {
  adminSurveyorController.deleteSurveyor(req,res)
})
router.post('/createEntity',function (req,res) {
  entitiesController.createEntity(req,res)
})

router.delete('/deleteEntity',function (req,res) {
  entitiesController.deleteEntity(req,res)
})
router.get('/getEntityById',function (req,res) {
  entitiesController.getEntitiesByIds(req,res)
})
router.patch('/updateEntity',function (req,res) {
  entitiesController.updateEntity(req,res)
})

router.post('/createRecordType',function (req,res) {
  const reqObj = {
    name: req.body.name,
    entityIds:req.body.entityIds    // array of id of entities
  }
  // console.log(reqObj.entityIds)
  recordTableController.createRecordType(reqObj,res)
})

router.get('/recordTypeList', (req, res)=> {
  recordTableController.getAllRecordTypes(res)
})

router.delete('/deleteRecordType',function (req,res) {
  recordTableController.deleteRecordTable(req,res)
})
router.post('/addEntityToTable',function (req,res) {
  const reqObj = {
    recordTypeId: req.body.recordTypeId,
    tableName: req.body.tableName,
    entityIds : req.body.entityIds
  }
  recordTableController.addEntityToTable(reqObj,res)
})

router.post('/createTakeawayType', (req, res)=> {
  const name = req.body.name
  adminTakeawayController.createTakeawayType(name, res)
})

router.get('/takeawayList', (req, res)=>{
  adminTakeawayController.getTakeawayList(res)
})

router.get('/entityList', (req, res)=>{
  adminTakeawayController.getEntityList(res)
})

router.get('/surveyorList', (req, res)=> {
  adminSurveyorController.getSurveyorList(res)
})
router.patch('/changeSurveyorStatus', (req, res)=> {
  adminSurveyorController.changeSurveyorStatus(req,res)
})
router.patch('/changeEntityStatus', (req, res)=> {
  entitiesController.changeStatus(req,res)
})
router.patch('/changeRecordTypeStatus', (req, res)=> {
  recordTableController.changeRecordTypeStatus(req,res)
})

router.get('/getTakeawayById', (req, res)=> {
  const id = req.query.id
  adminTakeawayController.getTakeawayById(id, res)
})
router.get('/getSurveyorById', (req, res)=> {
  const id = req.query.id 
  // adminTakeawayController.getTakeawayById(id, res)
  adminSurveyorController.getSurveyorById(id,res)
})

router.patch('/editSurveyor', (req, res)=> {
  adminSurveyorController.editSurveyor(req,res)
})


router.patch('/editEntity',(req,res)=>{
  const reqObj = {
    id: req.body.id,
    name: req.body.name,       // one of them is optional 
    desc: req.body.desc        
  }
  entitiesController.editEntity(reqObj,res)
})

router.get('/getAllTakeawayTypes',(req,res)=>{
  recordTableController.getAllTakeawayTypes(req,res)
})
router.get("/allMenuItems",(req,res)=>{
  recordTableController.getAllMenuItems(req,res)
})
router.patch("/changeMenuItemStatus",(req,res)=>{
  recordTableController.changeMenuItemStatus(req,res)
})
router.get('/getMenuItemById',(req,res)=>{
  recordTableController.getMenuItemsById(req,res)
})
router.post('/createMenuItems',(req,res)=>{
  recordTableController.createMenuItems(req,res)
})
router.patch('/updateMenuItems',(req,res)=>{
  recordTableController.updateMenuItems(req,res)
})

router.delete('/deleteMenuItemById',(req,res)=>{
  recordTableController.deleteMenuItemById(req,res)
})

router.get('/getAppliances',(req,res)=>{
  AppliancesContr.getAllAppliances(req,res)
})
router.post('/createAppliances',(req,res)=>{
  AppliancesContr.createAppliances(req,res)
})
router.patch('/changeAppliancesStatus',(req,res)=>{
  AppliancesContr.changeAppliancesStatus(req,res)
})
router.patch('/updateAppliancesById',(req,res)=>{
  AppliancesContr.updateAppliancesById(req,res)
})
router.delete('/deleteAppliancesById',(req,res)=>{
  AppliancesContr.deleteAppliancesById(req,res)
})

router.get('/getAppliancesById',(req,res)=>{
  AppliancesContr.getAppliancesById(req,res)
})

router.get('/getRecordTableDetails',(req,res)=>{
  recordTableController.getRecordTableById(req,res)
})

router.patch('/updateRecordtype',(req,res)=>{
  recordTableController.updateRecordtype(req,res)
})






router.get('/getTableByIdForRecordCreation',(req,res)=>{
  recordTableController.getTableByIdForRecordCreation(req,res)
})

router.post('/createRecord',(req,res)=>{
  recordTableController.createRecord(req,res)
  
})

router.get('/getAllDataInsideAReacordTable',(req,res)=>{
  recordTableController.getAllDataInsideAReacordTable(req,res)
})
router.get('/getAllDataInsideAReacordTable1',(req,res)=>{
  recordTableController.getAllDataInsideAReacordTable1(req,res)
})

module.exports=router