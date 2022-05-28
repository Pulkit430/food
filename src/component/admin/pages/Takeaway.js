import React from 'react'
import { NavLink,useNavigate,Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import Header from '../adminComponents/Header';
import Table from '../adminComponents/Table';
import {getAllTakeway,changeTakeawayStatus,deleteTakeawayById,createTakeaway,getTakeawayById,updateTakeaway} from '../../../Shared/Services'
import TopHeader from '../adminComponents/TopHeader';
import AddDiv from '../adminComponents/AddDiv';
import ShowDiv from '../adminComponents/ShowDiv';

export default function Takeaway() {
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false) 
  const userInfo=React.useContext(UserContext).userInfo
  const [takeawayDetail, settakeawayDetail] = React.useState([])
  const [pageStatus, setPageStatus] = React.useState(false)
  const [arrayOfStatus, setArrayOfStatus] = React.useState([])
  const [idForUpdate, setIdForUpdate] = React.useState('')
  const [showAddPersonsDiv, setShowAddPersonsDiv] = React.useState(false)

  
  const [test, setTest] = React.useState(true)

  const [stateObject, setStateObject] = React.useState({
    takeaway_name:'',
    email:'',
    mobile:'',
    owner:'',
    password:'',
    type:'',
    ownerInfo:{
      name:'',
      address:'',
      mobile:'',
      email:'',
      role:''
    }
  })

  const [updateObject, setUpdateObject] = React.useState({
    takeaway_name:'',
    email:'',
    mobile:'',
    owner:'',
    password:'',
    type:'',
    ownerInfo:{
      name:'',
      address:'',
      mobile:'',
      email:'',
      role:''
    }
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
  const personsInfo=[
    {
      name:"Name",
      type:"text",
      placeholder:"Name",
      key:"ownerInfo.name",
      value:stateObject.ownerInfo.name,
      valueForUpdate:updateObject.ownerInfo.name,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"Email",
      type:"text",
      placeholder:"Email",
      key:"ownerInfo.email",
      value:stateObject.ownerInfo.email,
      valueForUpdate:updateObject.ownerInfo.email,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"mobile",
      type:"text",
      placeholder:"mobile",
      key:"ownerInfo.mobile",
      value:stateObject.ownerInfo.mobile,
      valueForUpdate:updateObject.ownerInfo.mobile,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"address",
      type:"text",
      placeholder:"address",
      key:"ownerInfo.address",
      value:stateObject.ownerInfo.address,
      valueForUpdate:updateObject.ownerInfo.address,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"Role",
      type:"text",
      placeholder:"Role",
      key:"ownerInfo.role",
      value:stateObject.ownerInfo.role,
      valueForUpdate:updateObject.ownerInfo.role,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },

  ]


  const inputdata=[
    {
      name:"TakeAway Name",
      type:"text",
      placeholder:"Name",
      key:"takeaway_name",
      value:stateObject.takeaway_name,
      valueForUpdate:updateObject.takeaway_name,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"email",
      type:"text",
      placeholder:"Email",
      key:"email",
      value:stateObject.email,
      valueForUpdate:updateObject.email,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"mobile",
      type:"text",
      placeholder:"Mobile",
      key:"mobile",
      value:stateObject.mobile,
      valueForUpdate:updateObject.mobile,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"password",
      type:"text",
      placeholder:"Password",
      key:"password",
      value:stateObject.password,
      valueForUpdate:updateObject.password,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"type",
      type:"select",
      multiselect:true,
      option:[
        {
          name:"Indian",value:1},
          {name:"Chinese",value:2}
      ],
      placeholder:"Type",
      key:"type",
      value:stateObject.type,
      valueForUpdate:updateObject.type,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    
  ]

  const changeStatus=(id,status,index)=>{
    console.log(id,status,index)
    changeTakeawayStatus(id,status)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      setArrayOfStatus((old)=>{
        old[index]=!old[index]
        return [...old]
      })
    })
    .catch(function (error) {
      // console.log(error);
    });
  } 
  const deleteEntityById=(id,index)=>{
    console.log(id,index)
    deleteTakeawayById(id)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      setIdForUpdate(response.data.id)
      settakeawayDetail((old)=>{
        old.splice(index,1)
        return [...old]
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const updateTakeawayfront=()=>{
    console.log(idForUpdate,updateObject)
    updateTakeaway(idForUpdate,updateObject)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      setTest(!test)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  const insertIntoDB=()=>{
    console.log(stateObject)
    if(!stateObject.name&&!stateObject.email){
      alert("Name And Email mandatory")
    }else{
        createTakeaway(stateObject)
        .then(function (response) {
          alert("Added Successfully")
          setPageStatus(!pageStatus)
        })
        .catch(function (error) {
          console.log(error);
          alert("Somthing Went Wrong")
        });
    }
  }

  const getTakeawayByIdfront=(id)=>{
    getTakeawayById(id)
    .then((response)=>{
      // console.log(response.data)
      setUpdateObject(response.data)
      
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
    getAllTakeway()    
    .then(function (response) {
      // console.log(response.data);
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
      settakeawayDetail((old)=>{
        return [...response.data]
      }
        )
    })
    .catch(function (error) {
      // console.log(error);
      settakeawayDetail([])
    });
  },[pageStatus,test])

  return (
    <div className='masterDiv'>
        <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
        <TopHeader isAdmin={isAdmin} title={"TakeAway"}/>
        <div className={pageStatus?'':'secondTop'}>
          <div className='pageHeading'>Register TakeAway</div>
          {pageStatus?
            <AddDiv  inputdata={inputdata} save={insertIntoDB} addPersons={true} showAddPersonsDiv={showAddPersonsDiv} setShowAddPersonsDiv={setShowAddPersonsDiv}/>
            :
            <button className='createbtn'
              onClick={()=>{
                setPageStatus(!pageStatus)
                }}
            >Create</button>
          }
        </div>
        {/* <Link to={`/admin/takeaway/Details/id:`}><button className='addNewBtn btn btn-primary btn-lg'>Add New<span className='addIcon'><i className='fa fa-plus'></i></span></button></Link> */}
        {/* <div className='pageHeading'>TakeAways</div> */}



          
          {/* <Table
          arrayOfStatus={arrayOfStatus} 
          changeStatus={changeStatus} 
          dataToShow={takeawayDetail}
          columns={["takeaway_name","type","email","owner"]}
          delete={deleteEntityById}
          EditRoute={'Entity/Details'}
          
          /> */}

          <ShowDiv 
          arrayOfStatus={arrayOfStatus} 
          changeStatus={changeStatus} 
          dataToShow={takeawayDetail}
          columns={["takeaway_name","type","email"]}
          delete={deleteEntityById}
          EditRoute={getTakeawayByIdfront}
          inputdata={inputdata} 
          save={insertIntoDB}
          update={updateTakeawayfront}
          
          
          /> 
      </div>
    </div>
  )
}
