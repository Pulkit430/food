import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'

export default function UserListView(props) {

  const checkItem=(id)=>{
    console.log(id)
    // let item=props.arrayOfSelectedRecord.indexOf(id)
    
    if(props.arrayOfSelectedRecord.indexOf(id)>-1){
      // console.log(id)
      return true
    }else{
      return false
    }

  }


  React.useEffect(()=>{
console.log(props.arrayOfSelectedRecord)
  },[props.arrayOfSelectedRecord])

  return (
    <div className='padding20'>
      {props.inputdata&&(props.inputdata.length>0?
            <>
            {
              props.inputdata.map((item,index)=>{
                return <div className='userCustomRow' style={{
                  "border":checkItem(item.id)?'2px solid Green':'1px solid grey'
                }}
                onClick={()=>{
                  let checkItem=props.arrayOfSelectedRecord.indexOf(item.id)
                  if(checkItem>-1){
                    props.setArrayOfSelectedRecord((old)=>{
                      old.splice(checkItem,1)
                      return [...old]
                    })
                  }else{
                    props.setArrayOfSelectedRecord((old)=>{
                      old.push(item.id)
                      return [...old]
                    })
                  }
                }}
                >
                 <span className='value'> {item.name}</span>
                 <span>{checkItem(item.id)?<FontAwesomeIcon style={{color:'#009868'}}icon={faCheckCircle} size="lg" />:''}</span>
                </div>
              })
            }
            
            </>
            :
            <>
              <center>
                <h3>No Record</h3>
              </center>
            </>
        
      )}
    </div>
  )
}
