import React from 'react'
import Header from '../adminComponents/Header'
import Footer from '../adminComponents/Footer'
import TopHeader from '../adminComponents/TopHeader'
import {getMenuItemById}from '../../../Shared/Services'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  
export default function MenuItemsDetails() {
    let {id}=useParams()
    let intId=id.split(':')
    intId=intId[1]
    const [pageStatus, setpageStatus] = React.useState(false)
    const [menuItemData, setMenuItemData] = React.useState({
      name:"",
      takeawayType:''
    })

    React.useEffect(()=>{
      getMenuItemById(intId)
      .then(function (response) {
        console.log(response.data);
        let data=response.data
        setpageStatus(true)
        setMenuItemData(...data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },[])

  return (
    <div className='masterDiv'>
          <Header/>
      <div className='mainPage'>
      <TopHeader title={`${pageStatus?"Update Menu Item":"Add Menu Item"}`}/>
        <div className='addDiv'>
              <label className='addDivHeading' >Menu Item Details </label>
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name</label>
                  <input type="text" value={menuItemData.name??''} className="form-control" placeholder='Enter name'  
                  onChange={(e)=>{
                    // setName(e.target.value)
                  }}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Type</label>
                  <input type="text"  value={menuItemData.type??''}  className="form-control" placeholder='Enter name'  
                  onChange={(e)=>{
                    // setDescription(e.target.value)
                  }}
                  />
              </div>
              <span className='floatRight'>
              {pageStatus?
                <button type="submit" className="btn btn-primary"
                onClick={()=>{
                //   updateEntity()
                }}
                >Update</button>  
                :<button type="submit" className="btn btn-primary"
                onClick={()=>{
                    // insertIntoDB()
                }}
                
                >Add</button>} 
              </span> 
        </div>
 

        <Footer/>
      </div>
    </div>
  )
}
