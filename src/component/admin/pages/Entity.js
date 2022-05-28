import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import AddDiv from '../adminComponents/AddDiv';
import { NavLink,useNavigate } from 'react-router-dom';
import Header from '../adminComponents/Header';
import {getEntityList,addEntityToTable,sdeleteEntityById,changeEntityStatus,updateEntity,editEntity,getEntitiesById,CheckLogIn} from '../../../Shared/Services'
import { UserContext } from '../../../App';
import TopHeader from '../adminComponents/TopHeader';
import ShowDiv from '../adminComponents/ShowDiv';


export default function Entity() {
  const [isAdmin, setIsAdmin] = React.useState(false)
  const userInfo=React.useContext(UserContext).userInfo
  let navigate = useNavigate();
  const [entityDetails, setentityDetails] = React.useState([])
  const [idForUpdate, setIdForUpdate] = React.useState('')
  const [arrayOfStatus, setArrayOfStatus] = React.useState([])
  const [test, setTest] = React.useState(true)
  const [pageStatus, setPageStatus] = React.useState(false)
  const [stateObject, setStateObject] = React.useState({
    name:'',
    description:'',
    type:''
  })
  const [updateObject, setUpdateObject] = React.useState({
    name:'',
    description:'',
    type:''
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

  const inputdata=[{
    name:"Entity Name",
    type:"text",
    placeholder:"Name",
    value:stateObject.name,
    key:"name",
    valueForUpdate:updateObject.name,
    clickevent:changeCreateStateFunc,
    updateClickEvent:changeUpdateStateFunc
   },
   {
     name:"Description",
     type:"text",
     placeholder:"Description",
     value:stateObject.description,
     key:"description",
     valueForUpdate:updateObject.description,
     clickevent:changeCreateStateFunc,
     updateClickEvent:changeUpdateStateFunc
   },
   {
    name:"Type",
    // type:"select",
    option:[
      {name:"Date",value:1},
      {name:"String",value:2},
      { name:"Dropdown",value:3 }
    ],
    placeholder:"Type",
    value:stateObject.type,
    key:"type",
    valueForUpdate:updateObject.type,
    clickevent:changeCreateStateFunc,
    updateClickEvent:changeUpdateStateFunc
  }
  ]

  const insertIntoDB=()=>{
    let name=stateObject.name
    let des=stateObject.description
    let type=stateObject.type
    console.log(name,des) 
    if(!name||!des){
      alert("Fields should not empty")
      return
    }
    else{
      addEntityToTable(name,des,type).then(function (response) {
        alert("Added Successfully")
        window.location.reload()
      })
      .catch(function (error) {
        alert("Something went wrong")
      });
    }

    
  }
  const deleteEntityById=(id,index)=>{
    if (window.confirm("Are you sure?")) {
      sdeleteEntityById(id)
      .then(function (response) {
        setentityDetails((old)=>{
          old.splice(index,1)
          return [...old]
        })

      })
      .catch(function (error) {
      });
    } else {
      return
    }
  }

  const changeStatus=(id,status,index)=>{
    console.log(index)
    changeEntityStatus(id,status)
    .then(function (response) {
        setArrayOfStatus((old)=>{
          old[index] = !old[index]
          return[...old]
        })

    })
    .catch(function (error) {
    });
  }

  const editById=(id)=>{
    getEntitiesById(id)
    .then((response)=>{
      console.log(response.data[0].name)
      setIdForUpdate(response.data[0].id)
      setUpdateObject((old)=>{
        console.log(old)
        return {...old , name:response.data[0].name,description:response.data[0].description,type:response.data[0].type}
      })
    })
    .catch(()=>{
      console.log("Something went wrong")
    })
  }

  
  const updateEntity=()=>{
    editEntity(idForUpdate,updateObject)
    .then(function (response) {
      alert("updated")
      setTest(!test)
    })
    .catch(function (error) {
      console.log(error);
      alert("Internal Error")
    });
  }

  React.useEffect(()=>{
    console.log(userInfo)
    if(userInfo.role==='Admin'){
      setIsAdmin(true)
    }
    if(userInfo.role!='Admin'){
      navigate('/')
    }
    console.log(userInfo)
    getEntityList().then(function (response) {
      setentityDetails(response.data)
      const tempArray = new Array(response.data.length).fill(false)
      let data=response.data
      for(let x in data){
        if(data[x].status===1){
          tempArray[x]=true
        }
      }
      setArrayOfStatus([...tempArray])
    })
    .catch(function (error) {
      console.log(error);
    });
  },[test])
  
  return (
    <div className='masterDiv'>
      <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
          <TopHeader title={"Entity"} isAdmin={isAdmin}/>
          <div className={pageStatus?'':'secondTop'}>
          <div className='pageHeading'>Entity</div>
            {pageStatus?
              <AddDiv inputdata={inputdata} save={insertIntoDB} update={updateEntity} title={"Entity"} pageStatus={pageStatus}/>
              :
              <button className='createbtn'
                onClick={()=>{
                  setPageStatus(!pageStatus)
                  }}
              >Create</button>
            }
          </div>
          <ShowDiv 
          entityDetails={entityDetails} 
          arrayOfStatus={arrayOfStatus} 
          changeStatus={changeStatus} 
          dataToShow={entityDetails}
          columns={["name","description",]}
          delete={deleteEntityById}
          EditRoute={editById}
          inputdata={inputdata}
          save={insertIntoDB}
          update={updateEntity} 
          />
      </div>
    </div>
  )
}
 