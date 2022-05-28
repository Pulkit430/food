import React from 'react'
import Header from '../adminComponents/Header';
import Footer from '../adminComponents/Footer';
import TopHeader from '../adminComponents/TopHeader';
import { UserContext } from '../../../App';
import {getAllDataInsideAReacordTable} from '../../../Shared/Services';
import {getTakeawayDataInsideAReacordTable} from './../../../Shared/UserServices'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useNavigate
  } from "react-router-dom";


export default function ViewRecords() {
    const userInfo=React.useContext(UserContext).userInfo
    const [columns, setColumns] = React.useState([])
    const [dataToShow, setDataToShow] = React.useState([])
    const [columnsToShow, setColumnsToShow] = React.useState([])
    let navigate = useNavigate();
    let {id}=useParams()
    let intId=id.split(':')
    intId=intId[1]


    React.useEffect(()=>{
        if(!userInfo){
            navigate('/admin')
          }
          if(intId){
            if(localStorage.getItem("role")==='Admin'){
                console.log("admin")
            getAllDataInsideAReacordTable(intId)
            .then(function (response) {
                console.log(response.data);
                setColumnsToShow(response.data.column)
                setColumns(Object.keys(response.data.data[0]))
                setDataToShow(response.data.data)
                
              })
              .catch(function (error) {
                console.log(error);
              });
            }else{
                let id=localStorage.getItem('id')
                getTakeawayDataInsideAReacordTable(id)
                .then(function (response) {
                  console.log(response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                });

            }

  
          }else{
              return
          }

    },[])
    React.useEffect(()=>{
        console.log(columnsToShow)
    },[columnsToShow])


    return (
    <div className='masterDiv'>
        <Header isAdmin={localStorage.getItem('role')==='Admin'?true:false}/>
        <div className='mainPage'>
            <TopHeader title={`View Record`} isAdmin={localStorage.getItem('role')==='Admin'?true:false}/>
            <div className='recordDataShow'>
                {dataToShow&&<table className='recordTable'>
                    {
                        columnsToShow.map((item,index)=>{
                            if(!item.startsWith("modified_at")&& !item.startsWith("created_at")){
                                return <th>{item.replaceAll('_',' ')}</th>
                            }else{
                                return
                            }
                        })
                    }
                    {dataToShow.map((dataObject,index1)=>{
                        return <tr>
                            {columns.map((objectKey,index2)=>{
                                if(objectKey)
                                if(!objectKey.startsWith("modified_at")&& !objectKey.startsWith("created_at")){
                                    return <td> {dataObject[objectKey]}</td>
                                }else{
                                    return
                                }
                               
                            })} 
                        </tr>
                    })

                    }
                </table>}
            </div>

        <   Footer/>
        </div>
    </div>
    )
}
