import React from 'react'
import $ from 'jquery'
import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import Header from '../adminComponents/Header';
import AddDiv from '../adminComponents/AddDiv'
import ShowDiv from '../adminComponents/ShowDiv';
import TopHeader from '../adminComponents/TopHeader';
import {getSurveyorList,addSurveyor,deleteSurveyor,changeSurveyorStatus,getSurveyorById,editSurveyor} from '../../../Shared/Services'

export default function Surveyor() {
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false) 
  const userInfo=React.useContext(UserContext).userInfo
  const [surveyorDetails, setsurveyorDetails] = React.useState([])
  const [surveyorName, setsurveyorName] = React.useState('')
  const [surveyorEmail, setSurveyorEmail] = React.useState('')
  const [idForUpdate, setIdForUpdate] = React.useState('')
  const [surveyorPassword, setSurveyorPassword] = React.useState('')
  const [arrayOfStatus, setArrayOfStatus] = React.useState([])
  const [pageStatus, setPageStatus] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)

  const [stateObject, setStateObject] = React.useState({
    name:'',
    email:'',
    password:'',
  })
 
  const [updateObject, setUpdateObject] = React.useState({
    name:'',
    email:'',
    password:'',
  })
  
  const changeCreateStateFunc=(key,value)=>{
    setStateObject((old)=>{
      return {...old,[key]:value}
    })
  }
  const changeUpdateStateFunc=(key,value)=>{
    setUpdateObject((old)=>{
      return {...old,[key]:value}
    })
  }

  
const deleteById=(id,index)=>{
    if (window.confirm("Are you sure?")) {
      deleteSurveyor(id)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setsurveyorDetails((old)=>{
          old.splice(index,1)
          return [...old]
        })
      })
      .catch(function (error) {
        console.log(error);
        return 
      });
    }else{
      return
    }
    
  }
 const insertIntoDB=(e)=>{
  console.log(surveyorEmail,surveyorEmail,surveyorPassword)
  addSurveyor(stateObject).then(function (response) {
    alert(response.data)
    setPageStatus(!pageStatus) 
    setRefresh(!refresh)
  })
  .catch(function (error) {
    console.log(error);
  });
 }

 const changeStatus=(id,status,index)=>{
   console.log(index)
  changeSurveyorStatus(id,status)
  .then(function (response) {
    setArrayOfStatus((old)=>{
      old[index]=!old[index]
      return [...old]
    })
    // console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    // console.log(error);
  });
 }

 
 const inputdata=[
   {
    name:"Surveyor Name",
    type:"text",
    placeholder:"Name",
    key:"name",
    value:stateObject.name,
    valueForUpdate:updateObject.name,
    clickevent:changeCreateStateFunc,
    updateClickEvent:changeUpdateStateFunc
   },
   {
    name:"Surveyor Email",
    type:"text",
    placeholder:"Email",
    key:"email",
    value:stateObject.email,
    valueForUpdate:updateObject.email,
    clickevent:changeCreateStateFunc,
    updateClickEvent:changeUpdateStateFunc
   },
   {
    name:"Password",
    type:"text",
    placeholder:"Password",
    key:"password",
    value:stateObject.password,
    valueForUpdate:updateObject.password,
    clickevent:changeCreateStateFunc,
    updateClickEvent:changeUpdateStateFunc
   },
   
   
 ]

 const updateSurveyor=()=>{
  editSurveyor(idForUpdate,updateObject)
  .then((response)=>{
    console.log(response)
    alert("Updated")
    setRefresh(!refresh)
  })
  .catch((err)=>{
    console.log(err)
  })
 }

 const getSurveyorByIdfront=(id)=>{
  getSurveyorById(id)
  .then((response)=>{
    console.log(response.data)
    setIdForUpdate(response.data.id)
    setUpdateObject({...response.data})
  })
  .catch((err)=>{
    console.log(err)
  })
 }
 
  React.useEffect(()=>{
    console.log(userInfo)
    if(userInfo.role==='Admin'){
      setIsAdmin(true)
    }
    if(userInfo.role!='Admin'){
      navigate('/')
    }
    getSurveyorList().then(function (response) {
      console.log(response.data)
      const tempArray = new Array(response.data.length).fill(false)
      let data=response.data
      for(let x in data){
        // console.log(data[x].status)
        if(data[x].status===1){ 
          tempArray[x]=true
        }
      }
      console.log("hello", tempArray)
      setArrayOfStatus([...tempArray])
      setsurveyorDetails(response.data)

    })
    .catch(function (error) {
      setSurveyorPassword([])
    });
  },[refresh])


  return (
    <div className='masterDiv'>
        <Header isAdmin={isAdmin}/>
      <div className='mainPage'>

        <TopHeader isAdmin={isAdmin} title={"Surveyor"}/>
        <div className={pageStatus?'':'secondTop'}>
          <div className='pageHeading'>Register Surveyor</div>
        {pageStatus?
          <AddDiv inputdata={inputdata} save={insertIntoDB}/>
          :
          <button className='createbtn'
            onClick={()=>{
              setPageStatus(!pageStatus)
              }}
          >Create</button>  
        }
          {/* <NavLink to={`/admin/Surveyor/Details/id`}><button className='addNewBtn btn btn-primary btn-lg'>Add New <span className='addIcon'><i className='fa fa-plus'></i></span></button></NavLink> */}

          {/* <AddDiv title={"Add Surveyor"} inputdata={inputdata} save={insertIntoDB}/> */}
          {/* <div className='pageHeading'>Surveyors</div> */}
        </div>

          {/* <Table 
            columns={["name","email",]}
            arrayOfStatus={arrayOfStatus} 
            changeStatus={changeStatus} 
            dataToShow={surveyorDetails}
            delete={deleteById}
            EditRoute={'Surveyor/Details'}
          /> */}

          <ShowDiv 
          columns={["name","email",]}
          arrayOfStatus={arrayOfStatus} 
          changeStatus={changeStatus} 
          dataToShow={surveyorDetails}
          delete={deleteById}
          EditRoute={getSurveyorByIdfront}
          inputdata={inputdata} 
          save={insertIntoDB}
          update={updateSurveyor}
          
          />
      </div>
    </div>
  )
}
