import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate,Link } from "react-router-dom";
import { faCoffee ,faVideo,faHome,faTable,faBell,faUserAlt} from '@fortawesome/free-solid-svg-icons'


export default function TopHeader(props) {
  let navigate = useNavigate(); 
  const routeChange = (path) =>{  
    navigate(path);
  }
  return (
    <div className='topHeader'>
        <div className='topLinks'>
        <span className='pageTitle'>{props.title?props.title:"Page Title"}</span>
        <span className='customBreadcrumb'><FontAwesomeIcon icon={faHome} size="sm" /> / {props.title?props.title:"Page Title"}</span>
        </div>
        <div className='profile '>
          <div className='notification'><FontAwesomeIcon icon={faBell} size="lg" /></div>
          <div className='userName'>
            {/* <span className='userNameLogo'>1</span> */}
            <span className='profileLink'
            onClick={()=>{
              if(props.isAdmin){
                localStorage.clear();
                routeChange('/')
              }
              else{
                routeChange('/profile')
              }
            }}
            ><FontAwesomeIcon icon={faUserAlt} size="lg" /></span>
          </div>
        </div>
        
    </div>
  )
}
