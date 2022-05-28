import React from 'react'
import Header from '../adminComponents/Header';
import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
export default function Records() {
  let navigate = useNavigate();
  const userInfo=React.useContext(UserContext).userInfo
  React.useEffect(()=>{
    
  })
  return (
    <div className='container'>
      <Header/>

    <center><h2>Records</h2></center>

    </div>
  )
}
