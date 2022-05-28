const conn=require('../../db/config')
// const md5=require('md5')

const login=(data,next)=>{
    let email=data.email
    let password=data.password
    // console.log(password)
    conn.query("select name,email from admin where email='"+email+"' and password ='"+password+"'",next)
}

module.exports={login}        