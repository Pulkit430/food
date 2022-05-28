import React from 'react'
import logo from './../../../img/cardlogo.png'

export default function Cards(props) {
  let color=props.color
  return (
    <div className='card' style=
      {{backgroundColor: props.color}}
      >
        <div className='innerCard'>
            <div className='cardLogo'><img src={logo} /></div>
            <div className='cardTitle'><span >{props.title}</span><span>{props.count}</span></div>
        </div>
    </div>
  )
}
