const mysql=require('mysql')
var config={
    host:"mymotorman.ch1wotth681d.ap-south-1.rds.amazonaws.com",
    user:"root",
    password:"amsdb1234",
    database:"foodsenso",
    dbdriver:"mysqli"
}

var conn=mysql.createConnection(config)
conn.connect(function(err){
    if(err)throw err
})
module.exports=conn