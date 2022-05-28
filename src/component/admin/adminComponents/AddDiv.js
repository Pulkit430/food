import React from 'react'
import SelectEntities from './SelectEntities'

export default function AddDiv(props) {
  let inputdata=[{
    name:"TakeAway Name",
    type:"text",
    placeholder:"Name",
    key:"takeaway_name",
    // value:stateObject.takeaway_name,
    // valueForUpdate:updateObject.takeaway_name,
    // clickevent:changeCreateStateFunc,
    // updateClickEvent:changeUpdateStateFunc
    }, {
      name:"email",
      type:"text",
      placeholder:"Email",
      key:"email",
      // value:stateObject.email,
      // valueForUpdate:updateObject.email,
      // clickevent:changeCreateStateFunc,
      // updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"mobile",
      type:"text",
      placeholder:"Mobile",
      key:"mobile",
      // value:stateObject.mobile,
      // valueForUpdate:updateObject.mobile,
      // clickevent:changeCreateStateFunc,
      // updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"owner",
      type:"text",
      placeholder:"Owner",
      key:"owner",
      // value:stateObject.owner,
      // valueForUpdate:updateObject.owner,
      // clickevent:changeCreateStateFunc,
      // updateClickEvent:changeUpdateStateFunc
    }

    ]
  
  return (
    <div>
       {props.inputdata?
         <div className='addDiv '>
            {/* <label>{props.title??'Create Page'}</label> */}
            <div className={props.inputdata.length>1?'addDivInputs':''}>
              {props.inputdata.map((item,index)=>{
                return <div key={index} className="form-group">
                {item.type==="text"?
                <>
                <input type="text"  value={props.updateMode?item.valueForUpdate:item.value??''} className="customInput" placeholder={item.placeholder}
                onChange={(e)=>{
                  if(props.updateMode){
                    item.updateClickEvent(item.key,e.target.value)
                  }else{
                    item.clickevent(item.key,e.target.value)
                  }
                }}
                />
                </>
                :
                <>
                    <select className='form-select' 
                    //  multiple={item.multiselect?true:false} 
                    
                      onChange={(e)=>{
                        if(props.updateMode){
                          item.updateClickEvent(item.key,e.target.value)
                        }else{
                          item.clickevent(item.key,e.target.value)
                        }
                      }}
                    >  
                    { props.updateMode?item.value?
                    <option disabled >{item.value}</option>
                    :
                    <option disabled>{item.placeholder}</option>

                    :''}
                    {item.option.map((option,optionIndex)=>{
                        return <option key={optionIndex} value={option.value} > {option.name}</option>
                  
                      })}
                  
                  </select>
                  </>
                }
                
              </div>

              })
              ??" "}
            </div>
            {props.entitiesdata &&<SelectEntities
                                       updateMode={props.updateMode} allEntities={props.entitiesdata} selectedEntities={props.selectedEntities} setselectedEntities={props.setselectedEntities}
                                      selectedEntitiesForUpdate={props.selectedEntitiesForUpdate}
                                      setSelectedEntitiesForUpdate={props.setSelectedEntitiesForUpdate}
            />
            }
            {props.updateMode?
              
              
              <>
                <span className=''>
                  <button type="submit" className="createbtn"
                  onClick={()=>{
                    props.update()}}
                  >Update</button>
                </span>
              </> 
                  :
              <>
              {props.addPersons?
              <>
              {}
              <span className='addPersonsBtn'>
                  <button type="submit" className="createbtn"
                  onClick={()=>{
                    props.setShowAddPersonsDiv(true)}}
                    >Add Persons
                  </button>
                </span> 
              <br/>
              {props.showAddPersonsDiv&&
              <AddDiv inputdata={inputdata}/>
              }
              </>
              :''}
              {props.takeaway?'':
              <span className=''>
                  <button type="submit" className="createbtn"
                    onClick={props.save}
                    >Create
                  </button>
                </span> }
              </>
            }
        </div>:""}
       
    </div>
  )
}
