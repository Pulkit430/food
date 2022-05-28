import React from 'react'
import Header from '../adminComponents/Header'
import Footer from '../adminComponents/Footer'
import TopHeader from '../adminComponents/TopHeader'
import { NavLink,useNavigate } from 'react-router-dom';
import {addSurveyor,deleteSurveyor,changeSurveyorStatus,getSurveyorById,editSurveyor} from '../../../Shared/Services'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function SurveyorDetails() {
  let {id}=useParams()
  console.log(id)
  let intId=id.split(':')
   intId=intId[1]
  const [pageStatus, setpageStatus] = React.useState(false)
  const [surveyorData, setSurveyorData] = React.useState({
    name:'',
    email:'',
    password:'',
  })
  const insertIntoDb=()=>{
    console.log(surveyorData)
    if(surveyorData.name){

      addSurveyor(surveyorData)
      .then((response)=>{
        console.log(response.data)
        alert("Added")
      })
      .catch((e)=>{
        console.log(e)
        
      })
    }else{
      alert("enter name")
    }
  }
  
  const updateSurveyor=()=>{
    editSurveyor(intId,surveyorData)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      alert("Updated")
    })
    .catch(function (error) {
      // console.log(error);
      alert("Internal error")
    });
  }

  React.useEffect(()=>{
    
    if(intId){
      getSurveyorById(intId)
      .then(function (response) {
        console.log(response.data);
        setpageStatus(true)
        let data=response.data
        // console.log(data)
        setSurveyorData((old)=>{
          return {...data}
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    console.log(surveyorData)
    console.log("chvs",surveyorData)
  },[])
  
  return (
    
    <div className='masterDiv'>
        <Header/>
        <div className='mainPage'>
          <TopHeader  title={`${pageStatus?"Update Surveyor":"Add Surveyor"}`}/>
          <div className="addDiv">
            <label className="addDivHeading">Surveyor Details</label>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Surveyor Name</label>
              <input type="text" value={surveyorData.name??""} className="form-control" placeholder="Enter Name"
              onChange={(e)=>{
                setSurveyorData((old)=>{
                  return {...old,name:e.target.value}
                })
              }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Surveyor Email</label>
              <input type="text" value={surveyorData.email??""}className="form-control" placeholder="Enter Email"
               onChange={(e)=>{
                setSurveyorData((old)=>{
                  return {...old,email:e.target.value}
                })
              }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input type="text" value={surveyorData.password??""}className="form-control" placeholder="Enter Password"
               onChange={(e)=>{
                setSurveyorData((old)=>{
                  return {...old,password:e.target.value}
                })
              }}
              />
            </div>
            <span className="floatRight">
              {pageStatus?<button type="submit" className="btn btn-primary"
              onClick={()=>{
                updateSurveyor()
              }}
              >update</button>:
              <button type="submit" className="btn btn-primary"
               onClick={()=>{
                 insertIntoDb()
               }}
              >Add</button>}
            </span>
          </div>
          <Footer/>
        </div>
      </div>
  )
}
