const ErrorNames = require('../utils/ErrorNames')
const recordTableModel=require('./../model/recordTableModel')

const getAllRecordTypes = (res) => {
  recordTableModel.getAllRecordTypes((err, result)=>{
    if(err) return res.status(500).send(ErrorNames.somethingWentWrong)
    return res.send(result)
  })
}

const mapRecordTypesToTakeaways = (req, res)=> {
  if(!Array.isArray(req.selected))
    return res.status(400).send(ErrorNames.arrayRequired)
  if(req.selected.length == 0)
    return res.sendStatus(204)
  recordTableModel.mapRecordTypesToTakeaways(req.selected, req.takeawayId, (err, result)=>{
    if (err) return res.status(500).send(err)
    return res.send("Done")
  })
}

const createRecordEntry = (req, res) => {
  recordTableModel.createRecordEntry(req, (err, result)=> {
    if(err) return res.status(500).send(err)
    res.send(`${result.insertId}`)
  })
}

const editRecordEntry = (req, res)=> {
  recordTableModel.editRecordEntry(req, (err, result)=> {
    if(err) return res.status(500).send(err)
    res.send("done")
  })
}

module.exports = {
  editRecordEntry,
  getAllRecordTypes,
  mapRecordTypesToTakeaways,
  createRecordEntry
}
