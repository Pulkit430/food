import React from 'react'
import $ from 'jquery'
import Header from '../adminComponents/Header';
import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import AddDiv from './../adminComponents/AddDiv'
import TopHeader from '../adminComponents/TopHeader';
import Table from '../adminComponents/Table';
import ShowDiv from '../adminComponents/ShowDiv';
import {updateRecordTable,getEntityList,getAllRecordType,createRecordType,changeRecordTypeStatus,deleteRecordTable,getAllRecordTypeById} from '../../../Shared/Services'


export default function RecordTables() {
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false) 
  const userInfo=React.useContext(UserContext).userInfo
  const [allEntities, setallEntities] = React.useState([])
  const [arrayOfStatus, setArrayOfStatus] = React.useState([])
  const [recordTypeDetail, setrecordTypeDetail] = React.useState([])
  const [selectedEntities, setselectedEntities] = React.useState([])
  const [selectedEntitiesForUpdate, setSelectedEntitiesForUpdate] = React.useState([])
  const [recordname, setrecordname] = React.useState('')
  const [pageStatus, setPageStatus] = React.useState(false)
  const [stateObject, setStateObject] = React.useState({
    name:'',
    entityIds:[]
  })
  const [updateObject, setUpdateObject] = React.useState({
    name:'',
    entityIds:[]
  })

  const changeUpdateStateFunc=(key,value)=>{
    setUpdateObject((old)=>{
      return {...old,[key]:value}
    })
  }

  const changeCreateStateFunc=(key,value)=>{
    setStateObject((old)=>{
      return {...old,[key]:value}
    })
  }



  const insertIntoDB=()=>{
    console.log(stateObject.name,selectedEntities)


    createRecordType(stateObject.name,selectedEntities)
    .then(function (response){
      alert(response.data);
      setPageStatus(!pageStatus)
    })
    .catch(function (error) {
      alert("Name Already Exist");
    });
  }
 
  const changeStatus=(id,status,index)=>{
    console.log(id,status)
    changeRecordTypeStatus(id,status)
    .then(function (response) {
      setArrayOfStatus((old)=>{
        old[index]=!old[index]
        return [...old]
      })
      // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const updateRecordtype=()=>{
    // console.log(updateObject,selectedEntitiesForUpdate)
    updateRecordTable(updateObject,selectedEntitiesForUpdate)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Success")
    })
    .catch(function (error) {
      alert("Something went wrong")
      console.log(error);

    });
  }
  

  const deleteTable=(id)=>{
    if (window.confirm("Are you sure?")) {
      deleteRecordTable(id)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        alert("Deleted")
      })
      .catch(function (error) {
        console.log(error);
        alert("Error")
    });
    }else{
      return
    }
    
  }

  const editRecordType=(id)=>{
    //  console.log(id)
     getAllRecordTypeById(id)
     .then(function (response) {
      console.log(response.data[0]);
      setUpdateObject((old)=>{
        return {...old,name:response.data[0].name,entityIds:response.data[0].entityIds,table_name:response.data[0].tablename,id:response.data[0].id}
      })
      setSelectedEntitiesForUpdate([...response.data[0].entityIds])
    })
    .catch(function (error) {
      console.log(error);
    });
     
  }
  const inputdata=[
    {
      name:"Record Name",
      type:"text",
      placeholder:"Enter Record Name",
      value:stateObject.name,
      key:"name",
      valueForUpdate:updateObject.name,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    }
  ]

  React.useEffect(()=>{
    console.log(userInfo)
    if(userInfo.role==='Admin'){
      setIsAdmin(true)
    }
    if(userInfo.role!='Admin'){
      navigate('/')
    }
    getAllRecordType().then(function (response) {
      // console.log(response.data)
      setrecordTypeDetail(response.data)
      const tempArray = new Array(response.data.length).fill(false)
      let data=response.data
      for(let x in data){
        // console.log(data[x].status)
        if(data[x].status===1){
          tempArray[x]=true
        }
      }
      // console.log("hello", tempArray)
      setArrayOfStatus([...tempArray])
    })
    .catch(function (error) {
      setrecordTypeDetail([])
    });
  
    getEntityList().then((response)=>{
      setallEntities(response.data)
    })
    .catch((e)=>{
      alert(e)
      setallEntities([])
    })
   
    // console.log(allEntities)
  },[pageStatus])



  return (
    <div className='masterDiv'>
        <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
        <TopHeader isAdmin={isAdmin} title={"Records"}/>
        <div className={pageStatus?'':'secondTop'}>
          <div className='pageHeading'>Records</div>
          {pageStatus?
            <AddDiv inputdata={inputdata} title={"Create Record"} save={insertIntoDB} entitiesdata={allEntities} selectedEntities={selectedEntities} setselectedEntities={setselectedEntities} />
            :
            <button className='createbtn'
              onClick={()=>{
                setPageStatus(!pageStatus)
                }}
            >Create</button>  
          }
        </div>
      {/* <div className='pageHeading'>Record List</div> */}
            {/* <Table 
             arrayOfStatus={arrayOfStatus} 
             changeStatus={changeStatus} 
             dataToShow={recordTypeDetail}
             columns={["name",]}
             delete={deleteTable}
             EditRoute={'Entity/Details'}
            /> */}
            <ShowDiv 
            arrayOfStatus={arrayOfStatus} 
            changeStatus={changeStatus} 
            dataToShow={recordTypeDetail}
            columns={["name",]}
            delete={deleteTable}
            EditRoute={editRecordType}
            inputdata={inputdata} 
            save={insertIntoDB}
            entitiesdata={allEntities}
            update={updateRecordtype}
            selectedEntitiesForUpdate={selectedEntitiesForUpdate}
            setSelectedEntitiesForUpdate={setSelectedEntitiesForUpdate}
            flagForTable={true}
            />

      </div>
    </div>
  )
}
