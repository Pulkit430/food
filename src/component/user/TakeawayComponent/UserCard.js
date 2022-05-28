import React from 'react'
import logo from './../../../img/cardlogo.png'
import { NavLink,useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export default function UserCard(props) {
  let color=props.color
  return (
    <div className='card' style=
      {{backgroundColor: props.color}}
      >
        <div className='innerCard'>
            <div className='cardLogo'><img src={logo} /></div>
        </div>
        <div className='parentSecondRow'>
          <div className='secondRow'>
            <span className='name'>{props.title}<span className='count'>({props.count})</span></span>
            <span className='date'>22 may 2022</span>
          </div>
          <NavLink to={`/CreateRecord/id:${props.id}`}><div className='addRecordBtn'>
             <FontAwesomeIcon icon={faPlusCircle} size="1x" /> <span>Add Record</span>
          </div></NavLink>
        </div>
       
    </div>
  )
}
