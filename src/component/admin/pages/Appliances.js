import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import Header from '../adminComponents/Header'
import TopHeader from '../adminComponents/TopHeader';
import AddDiv from '../adminComponents/AddDiv';
import Table from '../adminComponents/Table';
import { getAllAppliances ,createAppliances,changeAppliancesStatus,deleteAppliancesById,getAppliancesById,updateAppliancesByIdApi} from '../../../Shared/Services';
import ShowDiv from '../adminComponents/ShowDiv';



export default function Appliances() {
  let navigate = useNavigate();
  const userInfo=React.useContext(UserContext).userInfo
  const [isAdmin, setIsAdmin] = React.useState(false) 
  const [appDetails, setAppliDetails] = React.useState([])
  const [arrayOfStatus, setArrayOfStatus] = React.useState([])
  const [pageStatus, setPageStatus] = React.useState(false)
  const [idForUpdate, setIdForUpdate] = React.useState('')
  const [refresh, setRefresh] = useState(true)

  const [stateObject, setStateObject] = React.useState({
    name:'',
    description:'',
    category:'',
    scale:'',
    min:'',
    max:''
  })

  const [updateObject, setUpdateObject] = React.useState({
    name:'',
    description:'',
    category:'',
    scale:'',
    min:'',
    max:''
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

  const inputdata=[
    {
      name:"name",
      type:"text",
      placeholder:"Name",
      value:stateObject.name,
      valueForUpdate:updateObject.name,
      key:"name",
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
      
    },
    {
      name:"description",
      type:"text",
      placeholder:"Description",
      key:"description",
      value:stateObject.description,
      valueForUpdate:updateObject.description,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"category",
      type:"select",
      option:[
        {
          name:"Heating",value:1},
          {name:"Colling",value:2}
      ],
      key:'category',
      value:stateObject.category,
      valueForUpdate:updateObject.category,
      placeholder:"Category",
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"scale",
      option:[
        {
          name:"Temprature",value:1},
          {name:"Weight",value:2}
      ],
      key:"scale",
      value:stateObject.scale,
      valueForUpdate:updateObject.scale,
      placeholder:"Scale",
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"min",
      type:"text",
      placeholder:"Min",
      key:"min",
      value:stateObject.min,
      valueForUpdate:updateObject.min,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"Max",
      type:"text",
      placeholder:"Max",
      key:"max",
      value:stateObject.max,
      valueForUpdate:updateObject.max,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
  ]
  const insertIntoDb=()=>{
    if(stateObject.name && stateObject.description){
        createAppliances(stateObject)
        .then(function (response) {
          alert("Added Successfully")
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }
    else{
      alert("All fields are mandetory")
    }
    
  }
  const changeStatus=(id,status,index)=>{
    changeAppliancesStatus({id:id,status:status})
    .then(function (response) {
      setArrayOfStatus((old)=>{
        old[index]=!old[index]
        return [...old]
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const deleteAppliances=(id,index)=>{
    deleteAppliancesById({id:id})
    .then(function (response) {
      setAppliDetails((old)=>{
        old.splice(index,1)
        return [...old]
      })
      alert("Deleted")

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const getAppliancesByIdfront=(id)=>{
    getAppliancesById(id)
    .then(function (response) {
      console.log(response.data);
      setIdForUpdate(response.data[0].id)
      setUpdateObject(response.data[0])
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const updateAppliancesById=()=>{
    console.log(updateObject,idForUpdate)
    updateAppliancesByIdApi(idForUpdate,updateObject)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Updated")
      setRefresh(!refresh)
    })
    .catch(function (error) {
      console.log(error);
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

    getAllAppliances()
    .then(function (response) {
      console.log(response.data);
      setAppliDetails(response.data)
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
    })
    .catch(function (error) {
      console.log(error);
    });
    
  },[refresh])
  return (
    <div className='masterDiv'>
      <Header  isAdmin={isAdmin}/>
      <div className='mainPage'>
        <TopHeader isAdmin={isAdmin} title={"Appliances"}  />
        <div className={pageStatus?'':'secondTop'}>
        <div className='pageHeading'>Appliances</div>
       {pageStatus?
       <AddDiv inputdata={inputdata} save={insertIntoDb}/>
        :
         <button className='createbtn'
         onClick={()=>{
           setPageStatus(!pageStatus)
         }}
         >Create</button> 
        }
        </div>
        {/* <div className='pageHeading'>Appliances</div> */}

        {/* <Table 
            arrayOfStatus={arrayOfStatus} 
            changeStatus={changeStatus} 
            dataToShow={appDetails}
            columns={["name","category",]}
            delete={deleteEntityById}
            EditRoute={'Entity/Details'} 
        
        /> */}
        <ShowDiv
        arrayOfStatus={arrayOfStatus} 
        changeStatus={changeStatus} 
        dataToShow={appDetails}
        columns={["name","category",]}
        delete={deleteAppliances}
        EditRoute={getAppliancesByIdfront} 
        inputdata={inputdata}
        save={insertIntoDb}
        update={updateAppliancesById}
        
        />
      </div>
    </div>
  )
}
