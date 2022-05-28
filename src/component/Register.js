import React from 'react'
import MultiSelect from "react-multi-select-component";
import {signup} from './../Shared/UserServices'
import { UserContext} from './../App'

import { useNavigate,Link } from "react-router-dom";

export default function Register() {

  const setUserInfo=React.useContext(UserContext).setUserInfo
  let navigate = useNavigate(); 
  const routeChange = (path) =>{  
    navigate(path);
  }

  const [data, setData] = React.useState({
    email:'',
    password:'',
    mobileNo:'',
    takeawayName:'',
    takeawayTypeId:[],
  })
  const submit=(e)=>{
    e.preventDefault()
    // console.log(data)
    signup(data)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      alert("Login SuccessFully")
      setUserInfo({
        id:response.data.id,
        role:'Takeaway'
      })
      localStorage.setItem("id",response.data)
      localStorage.setItem("role","Takeaway")
      routeChange('/Home')
    })
    .catch(function (error) {
      console.log(error.response.data);
      alert(error.response.data)
    });
  }


  return (
    <div className='register'>
      <center><h3>Takeaway Register</h3></center>
      <form
      onSubmit={(e)=>submit(e)}
      >
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input type="email" className="form-control" value={data.email}  placeholder="Enter email"
            onChange={(e)=>{
              setData((old)=>{
                old.email=e.target.value
                return  {...old}
              })
            }}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Mobile No.</label>
            <input type="mobile" className="form-control" value={data.mobileNo} aria-describedby="emailHelp" placeholder="Mobile No"
            onChange={(e)=>{
              setData((old)=>{
                old.mobileNo=e.target.value
                return  {...old}
              })
            }}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" value={data.password} className="form-control" placeholder="Password"
            onChange={(e)=>{
              setData((old)=>{
                old.password=e.target.value
                return  {...old}
              })
            }}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Takeaway Name</label>
            <input type="password" value={data.takeawayName} className="form-control"  placeholder="Takeaway Name"
            onChange={(e)=>{
              setData((old)=>{
                old.takeawayName=e.target.value
                return  {...old}
              })
            }}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1" >Takeaway Type</label>
            {/* <input type="password" className="form-control" placeholder="Takeaway Type"/> */}
            <select className="form-select" multiple={true}
            onChange={(e)=>{
              let v=e.target.value
              console.log(v)
              let check=data.takeawayTypeId.indexOf(v)
              console.log(check)
              if(check<0){
                setData((old)=>{
                  old.takeawayTypeId.push(v)
                  return {...old} 
                })
              }else{
                setData((old)=>{
                  old.takeawayTypeId.splice(check,1)
                  return {...old} 
                })
              }

            }}
            >
              <option value={1}>Indian</option>
              <option value={2}>Chinese</option>
            </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
