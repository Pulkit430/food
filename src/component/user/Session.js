import React from 'react'
import axios from 'axios'
import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from './../../App';
import TopHeader from '../admin/adminComponents/TopHeader';
import Header from '../admin/adminComponents/Header';




export default function Session() {
  let navigate = useNavigate();
  const userInfo=React.useContext(UserContext).userInfo
  const [count, setcount] = React.useState([0,0])
  const [isAdmin, setIsAdmin] = React.useState(false)
  let takeawaycount=''
  const getvalue=(data)=>{
  let key=Object.keys(data)
  return data[key]
  }

  React.useEffect(()=>{
    console.log(userInfo)
    if(userInfo.role==='Admin'){
      setIsAdmin(true)
    }
    if(!userInfo){
      if(localStorage.getItem('role')){
        if(userInfo.role==='Admin'){
          setIsAdmin(true)
        }   
      }else{
        navigate('/')
      }
      console.log("navigate")
    }


  },[])

  return (
    
    <div className='masterDiv'>
      <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
        <TopHeader isAdmin={isAdmin} title={"Training Session"}/>
        <div className='pageHeading'>Training Session</div>
          {/* <Switch onChange={onSwitchValueChange} checked={toggleSwitch} onColor='#5CB85C' offColor='#D9534F' /> */}
          
      </div>
    </div>
  )
}
