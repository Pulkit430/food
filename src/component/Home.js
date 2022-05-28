import React, {useState} from 'react'
import Login from './Login'
import { NavLink } from 'react-router-dom';

import User from './user/User'
import { useNavigate,Link } from "react-router-dom";



export default function Home(props) {
  let navigate = useNavigate(); 
 const [isloggedIn, setisloggedIn] = useState(false)
 let temp = localStorage.getItem('react-main-app')
 React.useEffect(()=>{
   if(!temp){
       navigate('/')
     }
 },[])
    if(!temp){
      return <></>
    }
      return (
        <>
        <User />
        <span>VKDJVBK</span>
       
      
        </>
      )
  
}
