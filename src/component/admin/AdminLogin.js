import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import '../../css/admin/adminLogin.css';
import axios from 'axios'
import { login }from '../../Shared/Services'
import { UserContext } from "../../App";

export default function AdminLogin() {
  let navigate = useNavigate(); 
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [wrongPassword, setwrongPassword] = useState(false)
  // var isLoggedIn=localStorage.getItem("name")
  
  const userInfo=React.useContext(UserContext).userInfo
  const setUserInfo=React.useContext(UserContext).setUserInfo

  const submit=(e)=>{
    e.preventDefault()
    login(email,password).then(function (response) {
      console.log(response.data);
      localStorage.setItem("name",response.data[0].name)
      localStorage.setItem("role",'Admin')
      // routeChange('/admin/home')
      setUserInfo({
        name:response.data[0].name,
        role:'Admin'
      })
    })
    .catch(function (error) {
      // console.log(error);
      setwrongPassword(true)
      setTimeout(()=>{
      setwrongPassword(false)
      },2000)
    });
   
    
  }
  React.useEffect(()=>{
    if(userInfo.role==="Admin"){
      console.log(userInfo)
      navigate('/Home')
    }
  },[userInfo])
  return (
    <div className="Login">
      <center><h3>Admin Login</h3></center>
      <form 
      onSubmit={(e)=>submit(e)}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
          onChange={(e)=>{
            setemail(e.target.value)
          }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
          onChange={(e)=>{
            setpassword(e.target.value)
          }}
          />
        </div>
        {wrongPassword&&<span className='passwordWarning'> Wrong email name or password</span>}
        <div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}
