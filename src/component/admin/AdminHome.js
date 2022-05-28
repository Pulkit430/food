import React from 'react'
import { useNavigate } from "react-router-dom";
import Header from './adminComponents/Header';
import Footer from './adminComponents/Footer';
import Home from './pages/Home'
import Entity from './pages/Entity'
import Records from './pages/Records'
import Surveyor from './pages/Surveyor'
import Takeaway from './pages/Takeaway'
import RecordTables from './pages/RecordTables'
import Appliances from './pages/Appliances'
import MenuItems from './pages/MenuItems'

export default function AdminHome() {
  let check=window.location.href.split('=')
  let initalpage=''
  if(check[1]){
    initalpage=check[1]
    // console.log(initalpage)
  }else{
    initalpage="Home"
  }
  const [page, setpage] = React.useState(initalpage)
  let navigate = useNavigate();
  const  isLoggedIn=localStorage.getItem("name")
    const change=(page)=>{
      // console.log(page)
        switch(page){
        case "Home":{
          return <Home/>
        }
        case "Entity":{
          return <Entity/>
        }
        case "Records":{
          return <Records/>
        }
        case "Takeaway":{
          return <Takeaway/>
        }
        case "Surveyor":{
          return <Surveyor/>
        }
        case "CreateRecord":{
          return <RecordTables/>
        }
        case "Appliances":{
          return <Appliances/>
        }
        case "MenuItems":{
          return <MenuItems/>
        }
        default:{
          return <Home/>

        }
      }
    }
    
    React.useEffect(()=>{
         if(!isLoggedIn){
             navigate('/admin')
         }
    },[page])
      if(!isLoggedIn)
      {
      return <></>   
      }
      return (
        <div className='container'>
        <Header setpage={setpage}/>
        
        <div className='innerSection'>
          {change(page)}
        </div>

        <Footer/>
        </div>
      )
}
