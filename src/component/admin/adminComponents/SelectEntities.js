import React from 'react'

export default function SelectEntities(props) {

  console.log("update",props.selectedEntitiesForUpdate)
  const checkedOrNotinUpdate=(id)=>{
    if(props.selectedEntitiesForUpdate){

      if(props.selectedEntitiesForUpdate.find(Element=>Element===id)){
        return true
      }else{
        return false
      }
    }else{
      return
    }
    
    }

  const checkedOrNotinCreate=(id)=>{
    if(props.selectedEntities){

      if(props.selectedEntities.find(Element=>Element===id)){
        return true
      }else{
        return false
      }
    }else{
      return
    }
  }
  return (
    <div className='selectEntities'>
    {
       props.allEntities.map((item,index)=>{
        return <div key={index} className="grid-item" ><input checked={props.updateMode?checkedOrNotinUpdate(item.id):checkedOrNotinCreate(item.id)}  type="checkbox"
        onChange={()=>{
          if(props.updateMode){
            let  checkPresent = props.selectedEntitiesForUpdate.indexOf(item.id);
            if (checkPresent > -1) {
                props.selectedEntitiesForUpdate.splice(checkPresent, 1); // 2nd parameter means remove one item only
                props.setSelectedEntitiesForUpdate((selectedEntitiesForUpdate)=>{
                return [...selectedEntitiesForUpdate]
              })
              }else{
                props.setSelectedEntitiesForUpdate((selectedEntitiesForUpdate)=>{
                return  [...selectedEntitiesForUpdate,item.id]
              })

            }
          }else{
            let  checkPresent = props.selectedEntities.indexOf(item.id);
            if (checkPresent > -1) {
              props.selectedEntities.splice(checkPresent, 1); // 2nd parameter means remove one item only
              props.setselectedEntities((selectedEntities)=>{
                return [...selectedEntities]
              })
            }else{
              props.setselectedEntities((selectedEntities)=>{
               return  [...selectedEntities,item.id]
              })
  
            }
          }
         
        }}
        /><span
        > <i>{item.name}</i></span></div>
      })
    }
  </div>
  )
}
