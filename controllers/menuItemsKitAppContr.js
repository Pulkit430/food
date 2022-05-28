const ErrorNames = require('../utils/ErrorNames')
const menuItemsKitAppModel = require('../model/menuItemsKitAppModel')

const getAllMenuItems = (takeawayTypeId, res) => {
    menuItemsKitAppModel.getAllRows(takeawayTypeId, ["id", "name"], "menu_items", (err, result)=> {
      if(err) return res.status(500).send(ErrorNames.somethingWentWrong + " "+ err)
      return res.send(result)
  })
} 

const createNmapRows = (createTableName, mappingTableName, columnNameToMap,  req, res)=> {
  let oneTaskDone = !req.selected || !req.new ? true: false
  let error = ""
  if(req.selected){
      if(!Array.isArray(req.selected)){
          res.status(400).send(ErrorNames.arrayRequired)
          return
      }
      if(req.selected.length == 0) {res.send({error: (error ? error: null)}); return;}
      menuItemsKitAppModel.getMapping(mappingTableName,columnNameToMap, "takeaway_id", req.takeawayId, (err, result)=> {
          if(err) {console.log(err)}
          else{
              for (const item of result.values()){
                  const ind = req.selected.findIndex((itemId)=> itemId === item[columnNameToMap])
                  if (ind > -1) req.selected.splice(ind, 1)
              }
          }

          menuItemsKitAppModel.insertMultipleRowMaps(mappingTableName,columnNameToMap, req.selected, req.takeawayId, (err, result)=>{
              if (err){ error += ErrorNames.somethingWentWrong; console.log(err)}
              if(oneTaskDone) {res.send({error: (error ? error: null)}); return;}
              else oneTaskDone = true
          })
      })
  }
  if(req.new){
      if(!Array.isArray(req.new)){
          res.status(400).send(ErrorNames.arrayRequired)
          return
      }
      
      menuItemsKitAppModel.insertNewRows(createTableName, req.new, (err, result)=> {
          if (err) {
              error += ErrorNames.somethingWentWrong
              if(oneTaskDone) {res.send({error: (error ? error: null)}); return;}
              else oneTaskDone = true
          }
          else{
              let i = result.insertId
              const itemIds = []
              while(itemIds.length < req.new.length){
                  itemIds.push(i)
                  i += 1
              }
              menuItemsKitAppModel.insertMultipleRowMaps(mappingTableName,columnNameToMap, itemIds, req.takeawayId, (err, result)=> {
                  if(err) error += ErrorNames.somethingWentWrong
                  if(oneTaskDone) {res.send({error: (error ? error: null)}); return;}
                  else oneTaskDone = true
              })
          }
          
      })
  }
}

const mapMenuItems = (req, res)=>{
  createNmapRows("menu_items", "menu_items_mapping", "menu_item_id", req, res)
}

const getKitchenAppliances = (res)=> {
  menuItemsKitAppModel.getAllRows(null,["id", "name"], "kitchen_appliances", (err, result)=> {
      if(err) return res.status(500).send(ErrorNames.somethingWentWrong)
      return res.send(result)
  })
}

const mapKitchenAppliances = (req, res)=> {
  createNmapRows("kitchen_appliances", "kitchen_appliances_mapping","kitchen_appliance_id", req, res)
}

const getAllActiveMenuItems=(req,res)=>{
    menuItemsKitAppModel.getAllActiveMenuItems((err,result)=>{
        if(err) res.status(500).send(ErrorNames.somethingWentWrong)
        else if(result.length>0){
            res.status(200).send(result)
        }else{
            res.status(404).send("No Result")
        }
    })
}

module.exports = {
  mapMenuItems,
  getAllMenuItems,
  getKitchenAppliances,
  mapKitchenAppliances,
  getAllActiveMenuItems
}