import React  from 'react';
import {useState,} from 'react';
import './App.css';
import './css/user.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/Login';
import Home from './component/Home'
import Register from './component/Register'
import AdminLogin from './component/admin/AdminLogin'
import AdminHome from './component/admin/pages/Home'
import AdminEnitity from './component/admin/pages/Entity'
import EditPage from './component/admin/pages/EditPage'
import MenuItems from './component/admin/pages/MenuItems'
import Records from './component/admin/pages/Records'
import RecordTables from './component/admin/pages/RecordTables'
import Surveyor from './component/admin/pages/Surveyor'
import Takeaway from './component/admin/pages/Takeaway'
import Appliances from './component/admin/pages/Appliances'

import TakeawayModification from './component/admin/Edit/TakeawayDetails';
import CreateRecord from './component/admin/Edit/CreateRecord';
import SurveyorDetails from './component/admin/Edit/SurveyorDetails';
import MenuItemsDetails from './component/admin/Edit/MenuItemsDetails';
import ViewRecords from './component/admin/Edit/ViewRecords';
import TakeawayProfile from './component/user/TakeawayProfile'
import TakeawayRecords from './component/user/TakeawayRecords'
import Session from './component/user/Session'
import Settings from './component/user/Settings';

export const UserContext= React.createContext()

function App() {

  const [userInfo, setUserInfo] = useState('')
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const checkLogIn=localStorage.getItem('id')
  const role=localStorage.getItem('role')
  // console.log(checkLogIn,role)
  
  React.useEffect(()=>{
    if(role ){
      setUserInfo({
        id:checkLogIn,
        role:role
      })
    }
  },[])

  return (
    <>  
        <UserContext.Provider value={{userInfo:userInfo,setUserInfo:setUserInfo}}>
        <Routes>
          <Route  index  exact path="/" element={<Login setisLoggedIn={setisLoggedIn}/>} />  
          <Route  index  exact path="/register" element={<Register/>} />  
          <Route path="/admin" element={<AdminLogin/>} />  
          <Route path="/Home" element={<AdminHome/>} />  
          <Route path="/Entity" element={<AdminEnitity/>} />  
          <Route path="/edit" element={<EditPage/>} />  
          <Route path="/MenuItems" element={<MenuItems/>} />  
          <Route path="/Appliances" element={<Appliances/>} />  
          <Route path="/Record" element={<RecordTables/>} />  
          <Route path="/Surveyor" element={<Surveyor/>} />  
          <Route path="/TakeAway" element={<Takeaway/>} />  
          <Route path="/TakeAway/Details" element={<TakeawayModification/>} />  
          <Route path="/CreateRecord/:id" element={<CreateRecord/>} />  
          <Route path="/Surveyor/Details/:id" element={<SurveyorDetails/>} />  
          <Route path="/MenuItems/Details/:id" element={<MenuItemsDetails/>} />  
          <Route path="/ViewRecords/:id" element={<ViewRecords/>} />  
          <Route path="/Records" element={<TakeawayRecords/>} />  
          <Route path="/Session" element={<Session/>} />  
          <Route path="/profile" element={<TakeawayProfile/>} />  
          <Route path="/Settings" element={<Settings/>} />  
        </Routes>
        </UserContext.Provider>
    
    </>
  );
}

export default App;
