import React from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../adminComponents/Header';
import Footer from '../adminComponents/Footer';
import AddDiv from '../adminComponents/AddDiv';
// import {checkLogIn} from '../../../Shared/Services'


export default function EditPage() {
  const inputdata=[{
    name:"Entity Name",
    type:"text",
    placeholder:"Enter Name",
    // clickevent:setentityname
   },
   {
     name:"Description",
     type:"text",
     placeholder:"Enter Description",
    //  clickevent:setdescription
   }]
 

  return (
    <div className='container'>
      <Header/>
      <center><h2>Edit</h2></center>
        <AddDiv title={"Add Entity"} inputdata={inputdata}/>
      <Footer/>
    </div>
  )
}
