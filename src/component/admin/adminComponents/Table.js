import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash} from '@fortawesome/free-solid-svg-icons'
import { AiFillDelete } from 'react-icons/fa';
import Switch from "react-switch";
import AddDiv from './AddDiv'



export default function TableShow(props) {
    console.log(props.inputdata)

    const [dataToshow, setdataToshow] = React.useState([props.entityDetails])
    const [columns, setcolumns] = React.useState(props.columns)
    const [toggleSwitch, setSoggleSwitch] = React.useState(false)
    const [arrayOfStatus, setArrayOfStatus] = React.useState([...props.arrayOfStatus])
    const [editMode, setEditMode] = React.useState(false)
    const onSwitchValueChange=(id,status,index)=>{
      let setstatus
      if(status){
        setstatus=0
      }else{
        setstatus=1
      }
      props.changeStatus(id,setstatus,index)
     
    }
    
    // console.log(props.columns)
    React.useEffect(()=>{
      // console.log(columns)
    //  console.log(props.dataToShow)

    },[])

  return (
    <table className='maintable'>
          <thead>
            {/* <tr>
                {columns?columns.map((item,index)=>{
                    return <td key={index}>{item}</td>
                })
            
                :""}
                <td>Status</td>
                <td>Action</td>
            </tr> */}
          </thead>
          <tbody>
          
              {props.dataToShow?props.dataToShow.map((item,index)=>{
                return<tr key={index}
                
                    > 
                    {/* <div className='customColumns'> */}
                   {columns&&columns.map((item1,index1)=>{
                    //  console.log(item1)
                     if(item1==="type"){
                       return <td>
                         {typeof (item.type)==="string"?
                         <>
                         <span className='values'>{item.type}</span>
                         <p className='fields'>{item1.replaceAll('_', ' ')}</p>
                         
                         </>:
                         <>
                         <span className='values'> {item[item1]&&item[item1].map((typename,indexOfType)=>{
                            return typename.name + " "
                          })} </span><p className='fields'>{item1.replaceAll('_', ' ')}</p>
                         </>
                         }
                          
                      </td>
                     }
                     else{
                       return  <td key={index1} id={item1}><span className='values'>{item[item1]??' '}</span><p className='fields'>{item1.replaceAll('_', ' ')}</p></td>
                      }
                      
                })
                }
                <td>
                  <span><Switch onChange={()=>{ 
                    onSwitchValueChange(item.id,props.arrayOfStatus[index],index) 
                  }} 
                    checked={props.arrayOfStatus[index]} onColor='#5CB85C' height={20} width={40} offColor='#D9534F' /></span>
                  
      
                </td>
                <td className='lastColumn'>
                {/* <span className='icon'><NavLink to={`/admin/${props.EditRoute}/id:${item.id}`}><FontAwesomeIcon icon={faEdit} size="lg" /></NavLink></span> */}
                <span className='icon'
                onClick={()=>{
                  // props.EditRoute(item.id)
                  setEditMode(!editMode)
                }}
                ><FontAwesomeIcon icon={faEdit} size="lg" /></span>
                 
                  <span className='lastIcon'><FontAwesomeIcon icon={faTrash} size="lg"
                   onClick={()=>{
                    props.delete(item.id,index)
                  }}
                  
                  /></span>
                   </td>
                   {/* </div>
                  <div className='edit'>jhvcsdcsj</div> */}
                </tr>
              })
              :""}
              
            
          </tbody>
        </table>
    
  )
}
