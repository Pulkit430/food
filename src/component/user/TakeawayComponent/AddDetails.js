import React from 'react'
import AddDiv from '../../admin/adminComponents/AddDiv'
import SelectMenuItems from './SelectMenuItems'
import {getAllMenuItems,getAllActiveKitchenApp} from './../../../Shared/UserServices'



export default function AddDetails(props) {
    const [allMenuItems, setAllMenuItems] = React.useState([])
    const [allAppliances, setAllAppliances] = React.useState([])

    React.useEffect(()=>{
      
            console.log("menu")
            getAllMenuItems()
            .then(function (response) {
                console.log(response.data);
                setAllMenuItems(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        
            // getAllActiveKitchenApp()
            // .then(function (response) {
            //     console.log(response.data);
            //     setAllMenuItems(response.data)
            //     setAllAppliances(response.data)
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });

        
    },[])

  return (
    <div>
        <div className='sectionHeading'>{props.title}</div>
         {props.menuItems&& <SelectMenuItems allMenuItems={allMenuItems} />}
         {props.inputBoxes && <AddDiv inputdata={props.inputdata} save={props.save}/>}
         {/* {props.app&& <SelectMenuItems allMenuItems={allAppliances} />} */}
        
    </div>
  )
}
