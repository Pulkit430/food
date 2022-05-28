import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from './../../../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee ,faVideo,faHome,faTable,FaBell,faDumpster,faGear} from '@fortawesome/free-solid-svg-icons'
export default function Header(props) {
  return (
   <div className='customNavbar'>
     <div className='logo'>
       <img  src={logo} alt={"logo"}/>
     </div>
     {props.isAdmin?
      <>
        <nav>
        <span className='navLink'><NavLink to='/home'>       <span className='navIcon'><FontAwesomeIcon icon={faHome} size="1x" /></span>Home</NavLink></span>
            <span className='navLink'><NavLink to='/MenuItems'> <span className='navIcon'>   <i className='fa fa-home'></i></span>Menu Items</NavLink> </span>
            <span className='navLink'><NavLink to='/Appliances'><span className='navIcon'> <i className='fa fa-home'></i></span>Kitchen Appliances</NavLink> </span>
            <span className='navLink'><NavLink to='/Surveyor'>  <span className='navIcon'> <i className="fa fa-home"></i></span>Surveyor</NavLink></span>
            <span className='navLink'><NavLink to='/Entity'>    <span className='navIcon'><i className='fa fa-home'></i></span>Entity</NavLink></span>
            <span className='navLink'><NavLink to='/TakeAway'>  <span className='navIcon'> <FontAwesomeIcon icon={faDumpster} size="1x" /></span>TakeAway</NavLink> </span>
            <span className='navLink'><NavLink to='/Record'>    <span className='navIcon'> <FontAwesomeIcon icon={faTable} size="1x" /></span>Record Tables</NavLink></span>
            {/* <span className='navLink'><NavLink to='/admin/Record'>    <span className='navIcon'> <FontAwesomeIcon icon={faTable} size="1x" /></span>Record Tables</NavLink></span> */}
            <span className='navLink'><NavLink to=''
            onClick={()=>{
              alert("pending")
            }}
            > <span className='navIcon'> <FontAwesomeIcon icon={faVideo} size="1x" /></span>Training Sessions</NavLink> </span>
            <span className='navLink'><NavLink to=''
            onClick={()=>{
              alert("pending")
            }}
            > <span className='navIcon'>  </span>Settings</NavLink> </span>
            
        </nav>
      </> 
      :
      <>
        <nav>
        <span className='navLink'><NavLink to='/home'>       <span className='navIcon'><FontAwesomeIcon icon={faHome} size="1x" /></span>Home</NavLink></span>
            {/* <span className='navLink'><NavLink to=''> <span className='navIcon'>   <i className='fa fa-home'></i></span>Settings</NavLink> </span> */}
            {/* <span className='navLink'><NavLink to='/Records'><span className='navIcon'> <i className='fa fa-home'></i></span>Records</NavLink> </span> */}
            {/* <span className='navLink'><NavLink to=''>  <span className='navIcon'> <i className="fa fa-home"></i></span>Surveyor</NavLink></span>
            <span className='navLink'><NavLink to=''>    <span className='navIcon'><i className='fa fa-home'></i></span>Entity</NavLink></span>
            <span className='navLink'><NavLink to=''>  <span className='navIcon'> <FontAwesomeIcon icon={faDumpster} size="1x" /></span>TakeAway</NavLink> </span>
            <span className='navLink'><NavLink to=''>    <span className='navIcon'> <FontAwesomeIcon icon={faTable} size="1x" /></span>Record Tables</NavLink></span> */}
            {/* <span className='navLink'><NavLink to='/admin/Record'>    <span className='navIcon'> <FontAwesomeIcon icon={faTable} size="1x" /></span>Record Tables</NavLink></span> */}
            <span className='navLink'><NavLink to='/Session'> <span className='navIcon'> <FontAwesomeIcon icon={faVideo} size="1x" /></span>Training Sessions</NavLink> </span>
            <span className='navLink'><NavLink to='/Settings'> <span className='navIcon'><FontAwesomeIcon icon={faGear} size="1x" />  </span>Settings</NavLink> </span>
            
        </nav>
      </>
    }
      
   
   </div>
  )
}









