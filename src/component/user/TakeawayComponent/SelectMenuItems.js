import React from 'react'

export default function SelectMenuItems(props) {
  const checkItem=(id)=>{
    if(props.array.indexOf(id)>-1){
      return true
    }else{
      return false
    }
  }

  React.useEffect(()=>{
    console.log(props.array)
  },[props.array])
  return (
    <div className='selectManuItems'>
        {props.allMenuItems&&props.allMenuItems.map((item,index)=>{
            return <div className='grid-item'><input type={"checkbox"} checked={checkItem(item.id)}
            onChange={()=>{
              let checkItem=props.array.indexOf(item.id)
              if(checkItem>-1){
                props.setfunction((old)=>{
                  old.splice(checkItem,1)
                  return [...old]
                })
              }else{
                props.setfunction((old)=>{
                  old.push(item.id)
                  return [...old]
                })
              }
            }}
            
            /><span><i>{item.name}</i></span></div>
        })}
    </div>
  )
}
