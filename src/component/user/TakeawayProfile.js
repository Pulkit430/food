import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import TopHeader from '../admin/adminComponents/TopHeader';
import Header from '../admin/adminComponents/Header';
import AddDiv from '../admin/adminComponents/AddDiv';
import AddDetails from './TakeawayComponent/AddDetails';
import SelectMenuItems from './TakeawayComponent/SelectMenuItems'; 
import UserListView from './TakeawayComponent/UserListView'
import {getAllMenuItems,getAllActiveKitchenApp,getAllRecords,profileSetup} from './../../Shared/UserServices'




export default function Profile() {
  let navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(1)
  const userInfo=React.useContext(UserContext).userInfo
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [allMenuItems, setAllMenuItems] = React.useState([])
  const [allAppliances, setAllAppliances] = React.useState([])
  const [allRecords, setAllRecords] = React.useState([])
  const [arrayOfSelectedRecord, setArrayOfSelectedRecord] = React.useState([])
  const [arrayOfSelectedMenuItems, setArrayOfSelectedMenuItems] = React.useState([])
  const [arrayOfSelectedAppliances, setarrayOfSelectedAppliances] = React.useState([])

  const [staffDetailsObject, setStaffDetailsObject] = React.useState({
    name:'',
    address:'',
    email:'',
    mobile:'',
    role:'staff'
  })





  const [ownerDetailsObject, setOwnerDetailsObject] = React.useState({
    name:'',
    address:'',
    email:'',
    mobile:'',
    role:"owner"
  })

  const [managerDetailsObject, setManagerDetailsObject] = React.useState({
    name:'',
    address:'',
    email:'',
    mobile:'',
    role:"manager"
  })


  const changeStaffFunc=(key,value)=>{
    console.log(key,value) 
    setStaffDetailsObject((old)=>{
      return {...old,[key]:value}
    })
  }
  const changeOwnerfunc=(key,value)=>{
    setOwnerDetailsObject((old)=>{
      return {...old,[key]:value}
    })
  }
  const changeManagerfunc=(key,value)=>{
    setManagerDetailsObject((old)=>{
      return {...old,[key]:value}
    })
  }
  

  const staffDetails=[
    {
      name:"Name",
      type:"text",
      placeholder:"Staff Person Name",
      value:staffDetailsObject.name,
      key:"name",
      clickevent:changeStaffFunc,
      },
    {
    name:"Address",
    type:"text",
    placeholder:"Address",
    value:staffDetailsObject.address,
    key:"address",
    clickevent:changeStaffFunc,
    },
    {
    name:"Contact",
    type:"text",
    placeholder:"Contact No.",
    value:staffDetailsObject.mobile,
    key:"mobile",
    clickevent:changeStaffFunc,
    },
    {
    name:"Email",
    type:"text",
    placeholder:"Email ID",
    value:staffDetailsObject.email,
    key:"email",
    clickevent:changeStaffFunc,
    },
    
  ]

  const ownerDetails=[
    {
      name:"Name",
      type:"text",
      placeholder:"Owner Name",
      value:ownerDetailsObject.name,
      key:"name",
      clickevent:changeOwnerfunc,
      },
    {
    name:"Address",
    type:"text",
    placeholder:"Address",
    value:ownerDetailsObject.address,
    key:"address",
    clickevent:changeOwnerfunc,
    },
    {
    name:"Contact",
    type:"text",
    placeholder:"Contact No.",
    value:ownerDetailsObject.mobile,
    key:"mobile",
    clickevent:changeOwnerfunc,
    },
    {
    name:"Email",
    type:"text",
    placeholder:"Email ID",
    value:ownerDetailsObject.email,
    key:"email",
    clickevent:changeOwnerfunc,
    
    },
    
  ]
  const managerDetails=[
    {
      name:"Name",
      type:"text",
      placeholder:"Manager Name",
      value:managerDetailsObject.name,
      key:"name",
      clickevent:changeManagerfunc,
      
      },
    {
    name:"Address",
    type:"text",
    placeholder:"Address",
    value:managerDetailsObject.address,
    key:"address",
    clickevent:changeManagerfunc,
    },
    {
    name:"Contact",
    type:"text",
    placeholder:"Contact No.",
    value:managerDetailsObject.mobile,
    key:"mobile",
    clickevent:changeManagerfunc,
    },
    {
    name:"Email",
    type:"text",
    placeholder:"Email ID",
    value:managerDetailsObject.email,
    key:"email",
    clickevent:changeManagerfunc,
    },
    
  ]


  const saveStaffDetails=()=>{
    console.log(staffDetailsObject)
  }
  const saveOwnerDetails=()=>{
    console.log(ownerDetailsObject)
  }

  const saveManagerDetails=()=>{
    console.log(managerDetailsObject)
  }


  const saveProfile=()=>{
    let id=localStorage.getItem('id')
    if(id){
      console.log(staffDetailsObject,ownerDetailsObject,managerDetailsObject,arrayOfSelectedRecord,arrayOfSelectedMenuItems,arrayOfSelectedAppliances)
      profileSetup(ownerDetailsObject,managerDetailsObject,staffDetailsObject,id,arrayOfSelectedRecord,arrayOfSelectedMenuItems,arrayOfSelectedAppliances)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Submitted")
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      alert("Please Login again")
    }
    
  }




  const changeTab=(value)=>{
    switch (value){
      case 1:
        
        return <> <h4 className='addpersonsHeadings'>Owner Details</h4>
         <AddDiv inputdata={ownerDetails} save={saveOwnerDetails} title={"Add Owner"} takeaway={true}/>
        </>
      case 2:
        return <> <h4 className='addpersonsHeadings'>Manager Details</h4>
        <AddDiv inputdata={managerDetails} save={saveManagerDetails} takeaway={true}/> 
        </>
      case 3:
        return <> <h4 className='addpersonsHeadings'>Staff Person Details</h4>
         <AddDiv inputdata={staffDetails} save={saveStaffDetails} takeaway={true}/>
        </>
    
      case 4:
        return <> <h4 className='addpersonsHeadings'>Add Menu Items</h4>
        <SelectMenuItems allMenuItems={allMenuItems} array={arrayOfSelectedMenuItems} setfunction={setArrayOfSelectedMenuItems}/>
        </>
      case 5:
        return <><h4 className='addpersonsHeadings'> Records</h4>
         <UserListView inputdata={allRecords} arrayOfSelectedRecord={arrayOfSelectedRecord} setArrayOfSelectedRecord={setArrayOfSelectedRecord}/>
        </>
      case 6:
        return <> <h4 className='addpersonsHeadings'> Add Appliances</h4>
        <SelectMenuItems allMenuItems={allAppliances} array={arrayOfSelectedAppliances} setfunction={setarrayOfSelectedAppliances} />
        </>
    }
  }
  React.useEffect(()=>{
    if(userInfo.role==='Admin'){
      setIsAdmin(true)
    }
    if(!userInfo){
      if(localStorage.getItem('role')){
        if(userInfo.role==='Admin'){
          setIsAdmin(true)
        }   
      }else{
        navigate('/')
      }
    }
    
    getAllMenuItems()
    .then(function (response) {
        setAllMenuItems(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });
    getAllActiveKitchenApp()
    .then(function (response) {
      setAllAppliances(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });

    getAllRecords()
    .then(function (response) {
      console.log(response.data);
      setAllRecords(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });



  },[])

  return (
    
    <div className='masterDiv'>
      <Header isAdmin={isAdmin}/>
      <div className='mainPage'>
        <TopHeader isAdmin={isAdmin} title={"profile"}/>
        <div className='pageHeading'>Profile Setup</div>
        <div className='profileSetup'>
          {changeTab(tabValue)}
        </div>
        <div className='profilesBtn'>
          {tabValue>1&&
          <button className='previousBtn'
          onClick={()=>{
            setTabValue((old)=>{
              if(old==1){
                return 1
              }
              return old-1
            })
          }}
          >Previous</button>}
          
          {tabValue===6?
           <>
           <button className='nextBtn'
             onClick={()=>{
               saveProfile()
             }}
             >Finish</button>
           </> 
            :
            <>
             <button className='nextBtn'
               onClick={()=>{
                 setTabValue((old)=>{
                   if(old===6){
                     return 6
                   }
                   return old+1
                 })
               }}
               >Next</button>
             </>
          }
         
      </div>
      </div>
    </div>
  )
}
