import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import Cards from '../admin/adminComponents/Cards';
import UserCard from './TakeawayComponent/UserCard';
import { UserContext } from './../../App';
import {getTakeawayDetails} from './../../Shared/UserServices'

export default function UserHome() {
  const userInfo=React.useContext(UserContext).userInfo
  const [recordsData, setRecordsData] = React.useState([])
  const id=localStorage.getItem('id')
  React.useEffect(()=>{
    if(id){
        getTakeawayDetails(id)
        .then(function (response) {
          console.log(response.data);
          setRecordsData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },[])
  return (
    <div className='userCardSection'>
      {/* <NavLink to={`/admin/Takeaway`}><Cards title={"Demo Count"} count={45} color={"#F2EAED"} /></NavLink>
      <NavLink to={`/admin/Appliances`}><Cards title={"Demo Count"} count={78} color={"#EAFCFC"}/></NavLink> */}
        {recordsData&&recordsData.length>0?
        recordsData.map((item,index)=>{
          return <NavLink to={`/ViewRecords/id:${item.id}`}><UserCard title={item.name} count={item.count} id={item.id} color={"#dfe5f8"}/></NavLink>
        })
        :"No data"}
        {/* <UserCard title={"Demo Count"} count={45} color={"#dfe5f8"}/>
        <UserCard title={"Demo Count"} count={45} color={"#F2EAED"}/>
        <UserCard title={"Demo Count"} count={45} color={"#F2EAED"}/> */}
      </div>
  )
}
