import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faPen,faEye,faClipboardList} from '@fortawesome/free-solid-svg-icons'
import { AiFillDelete } from 'react-icons/fa';
import Switch from "react-switch";
import AddDiv from './AddDiv'

export default function ShowDiv(props) {
    
    const [dataToshow, setdataToshow] = React.useState([props.entityDetails])
    const [columns, setcolumns] = React.useState(props.columns)
    const [toggleSwitch, setSoggleSwitch] = React.useState(false)
    const [arrayOfStatus, setArrayOfStatus] = React.useState([...props.arrayOfStatus])
    const [editMode, setEditMode] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState()
    const onSwitchValueChange=(id,status,index)=>{
      let setstatus
      if(status){
        setstatus=0
      }else{
        setstatus=1
      }
      console.log(id,setstatus,index)
      props.changeStatus(id,setstatus,index)
     
    }
return (
  <div className='showDiv'>
        {/* ShowDiv */}
    <div className='custom'>
      {props.dataToShow?props.dataToShow.map((item,index)=>{
        return <>
          <div  key ={index} className='singleRow'>
            {columns&&columns.map((item1,index1)=>{
              //  console.log(item1)
                if(item1==="type"){
                  return <div key={index1} className='column'>
                    {typeof (item.type)==="string"?
                    <>
                    <span className='values'>{item.type}</span>
                    <p className='fields'>{item1.replaceAll('_', ' ')}</p>
                    
                    </>:
                    <>
                    <span className='values'> {item[item1]&&item[item1].map((typename,indexOfType)=>{
                      return  typename.name + " "
                    })} </span><p className='fields'>{item1.replaceAll('_', ' ')}</p>
                    </>
                    }
                    
                </div>
                }
                else{
                  return  <div className='column' key={index1} id={item1}><span className='values'>{item[item1]??' '}</span><p className='fields'>{item1.replaceAll('_', ' ')}</p></div>
                }
                
              })
            }
            <div className='column'>
              <span><Switch onChange={()=>{ 
                onSwitchValueChange(item.id,props.arrayOfStatus[index],index) 
                }} 
                checked={props.arrayOfStatus[index]} onColor='#5CB85C' height={20} width={40} offColor='#D9534F' /></span>
            </div>
            <div className='lastcolumn'>
              
              {props.flagForTable&&
              <NavLink to={`/ViewRecords/id:${item.id}`}> <span className='ViewRecordBtn' ><span className='btnicon'><FontAwesomeIcon icon={faEye} size="sm" /></span>
                <span className='btnText'>View</span></span></NavLink>
              }
              {props.flagForTable&&
              <NavLink to={`/CreateRecord/id:${item.id}`}> <span className='CreateRecordBtn' ><span className='btnicon'><FontAwesomeIcon icon={faClipboardList} size="sm" /></span>
                <span className='btnText'>Create</span></span></NavLink>
              }




              <span className='customEditBtn'
                  onClick={()=>{
                    setEditMode(!editMode)
                    
                    setSelectedIndex((old)=>{
                      if(old==index){
                        return -1
                      }
                      return index
                    })
                    props.EditRoute(item.id)
                  }}
                > <span className='btnicon'><FontAwesomeIcon icon={faPen} size="sm" /></span>
                <span className='btnText'>Edit</span></span>

                {/* <span className='lastIcon'><FontAwesomeIcon icon={faTrash} size="lg"
                  onClick={()=>{
                  props.delete(item.id,index)
                }}
                
                /></span> */}
                
              <span className='customDeleteBtn'
                onClick={()=>{
                  // props.EditRoute(item.id)
                  props.delete(item.id,index)
                }}
              ><span className='btnicon'><FontAwesomeIcon icon={faTrash} size="sm" /></span><span className='btnText'>Delete</span></span>
            </div>
          </div>
          {selectedIndex == index && 
            <AddDiv  
              inputdata={props.inputdata}
              save={props.save} 
              entitiesdata={props.entitiesdata??false}  
              update={props.update}  
              pageType={true} 
              updateMode={true}  
              selectedEntitiesForUpdate={props.selectedEntitiesForUpdate}
              setSelectedEntitiesForUpdate={props.setSelectedEntitiesForUpdate}
            />          
          }
        </>
        })  
        :''
      }
    </div>
  </div>
)}
