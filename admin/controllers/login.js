const loginModel=require('./../model/loginModel')
const login=(req,res)=>{
    // res.send(req.body) 
    loginModel.login(req.body,(err,result)=>{
        if(err){
            console.log(err)
            res.sendStatus(500)
        }
        else if(result.length>0){
            console.log()
            res.send(result) 
        }
        else{
            console.log("no match1")
            res.sendStatus(400)
        }

    })
}
module.exports={login}