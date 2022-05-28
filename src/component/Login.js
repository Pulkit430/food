import React, { useEffect, useState } from "react";
import '../css/style.css'
import { useNavigate,Link } from "react-router-dom";
import { UserContext} from './../App'
import { userLogin } from '../Shared/UserServices';

export default function Login(props) {

  const userInfo=React.useContext(UserContext).userInfo
  const setUserInfo=React.useContext(UserContext).setUserInfo

  let navigate = useNavigate(); 
  const routeChange = (path) =>{  
    navigate(path);
  }

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const submit=(e)=>{
  
    e.preventDefault()
    userLogin({email:email,password:password})
    .then(function (response) {
      // console.log(response.data);
      setUserInfo({
        id:response.data.id,
        role:'Takeaway'
      })
      localStorage.setItem("id",response.data.id)
      localStorage.setItem("role",'Takeaway')
      routeChange('/Home')
    })
    .catch(function (error) {
      console.log(error);
      alert("error")
    });
    
  }
  React.useEffect(()=>{
    console.log(userInfo)
    if(userInfo.role){
      routeChange('/Home')
    }
    console.log("login")
  },[])
  
  
  return (
    <div className="Login">
      <center><h3>Takeaway Login</h3></center>
      <form 
      onSubmit={(e)=>submit(e)}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1"  placeholder="Enter email"
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <Link className="registerLink" to="/register">Register</Link>
      <div>
      {/* <Link to="/admin/Home">cHEKC</Link> */}
      </div>
    </div>

  );
}
