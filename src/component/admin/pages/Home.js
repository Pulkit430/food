import React from 'react'
import axios from 'axios'
import Header from '../adminComponents/Header'
import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import {countOfAllTakeaways,getAllAppliances } from '../../../Shared/Services'
import TopHeader from '../adminComponents/TopHeader';
import Cards from '../adminComponents/Cards';
import UserHome from '../../user/UserHome';




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
    }
    countOfAllTakeaways()
    .then(function (response) {
      // console.log(response.data);
      takeawaycount=getvalue(response.data[0])
      // console.log(takeawaycount)
      setcount((old)=>{
        old[0]=takeawaycount
        return [...old]
      }) 
    })
    .catch(function (error) {
      console.log(error);
    });
    getAllAppliances()
    .then((response)=>{
      setcount((old)=>{
        old[1]=response.data.length
        return[...old]
      })

    })
    .catch((e)=>{
      console.log(e)
    })

  },[])

  return (
    
    <div className='masterDiv'>
      <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
        <TopHeader isAdmin={isAdmin} title={"Home"}/>
        <div className='pageHeading'>Home</div>
          {/* <Switch onChange={onSwitchValueChange} checked={toggleSwitch} onColor='#5CB85C' offColor='#D9534F' /> */}
          <div className='homePageDiv'>
            {isAdmin?
          <>
            <div className='cardSection'>
            <NavLink to={`/admin/Takeaway`}><Cards title={"Takeaway"} count={count[0]} color={"#F2EAED"} /></NavLink>
            <NavLink to={`/admin/Appliances`}><Cards title={"Kitchen"} count={count[1]} color={"#EAFCFC"}/></NavLink>
            {/* <NavLink to={`/admin/Takeaway`}><Cards title={"Complaints"}/></NavLink>
            <NavLink to={`/admin/Takeaway`}><Cards title={"Feedback"}/></NavLink>
            <NavLink to={`/admin/Takeaway`}><Cards title={"Subscription"}/></NavLink>
            <NavLink to={`/admin/Takeaway`}><Cards title={"Restaurants"}/></NavLink> */}
            </div>
          </>  
          :<UserHome />
            
          
          }
          
          </div>
      </div>
    </div>
  )
}
