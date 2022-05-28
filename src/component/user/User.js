import { BrowserRouter as Router, Link } from "react-router-dom";
import React  from 'react'
import UserHome from "./UserHome"
import UserSettings from "./UserSettings"
import { useState } from "react"

export default function User() {
  const [page, setpage] = useState('')
  const changePage=(page)=>{
    switch(page){
      case "userHome":
        return <UserHome />
      case "userSetting":
        return <UserSettings />
        default:
          return <UserHome />
        }
      }
  
  return (
    <>
      <nav><span className="navLink"
        onClick={()=>{setpage("UserHome")}}
          >Home</span>|<span className="navLink"
              onClick={()=>{setpage("userSetting")}}
          >Settings</span>
      </nav>
          {changePage(page)}
      <div>

      
      <Link to='/'onClick={()=>{
        localStorage.clear()

      }}>logout</Link>
    </div>
    </>
    )
}
