import React from 'react'
import axios from 'axios'
import Header from '../admin/adminComponents/Header';
import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
// import {countOfAllTakeaways,getAllAppliances } from '../../../Shared/Services'
import TopHeader from '../admin/adminComponents/TopHeader';
// import Cards from '../adminComponents/Cards';




export default function Home() {
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
  

  },[])

  return (
    
    <div className='masterDiv'>
      <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
        <TopHeader isAdmin={isAdmin} title={"Records"}/>
        <div className='pageHeading'>Records</div>
         
      </div>
     
    </div>
  )
}
