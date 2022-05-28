import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";
// import { get } from '../../../../server/admin/routes/adminRoute';
// const BaseURl='http://192.168.1.9:4000/admin/'
const BaseURl='http://localhost:4000/admin/'


// export const CheckLogIn=(path)=>{
//   let navigate = useNavigate(); 
//   console.log(path)
//   navigate(path);
// }

export const login=(email,password)=>{
    var data = JSON.stringify({
        "email": email,
        "password": password
      });
      
      var config = {
        method: 'post',
        url: BaseURl+'login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
     return axios(config)
      
}
export const countOfAllTakeaways=()=>{
  var config = {
    method: 'get',
    url: BaseURl+'countOfAllTakeaways',
    headers: { }
  };
  
  return axios(config)
  
}
export const getAllTakeway=()=>{
    var config = {
        method: 'get',
        url: BaseURl+'takeawayList',
        headers: { }
      };
      
      return axios(config)
}
export const getEntityList=()=>{
    var config = {
        method: 'get',
        url: BaseURl+'entityList',
        headers: { }
      };
      
      return axios(config)
}

export const updateTakeaway=(id,data)=>{
  var data = JSON.stringify({
    "id": id,
    "data": data
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'updateTakeaway',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
   
}

export const addEntityToTable=(entityname,description,type)=>{
     var data = JSON.stringify({
        "name": entityname,
        "description": description,
        "type":type 
      });
      
      var config = {
        method: 'post',
        url: BaseURl+'createEntity',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
     return  axios(config)
}
export const sdeleteEntityById=(id)=>{
  var data = JSON.stringify({
    "id": id
  });
  
  var config = {
    method: 'delete',
    url: BaseURl+'deleteEntity',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}
export const changeEntityStatus=(id,status)=>{
  var data = JSON.stringify({
    "id": id,
    "status": status
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'changeEntityStatus',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
}
export const getEntitiesById=(id)=>{
  var config = {
    method: 'get',
    url: BaseURl+'getEntityById?id='+id,
    headers: { }
  };
  
  return axios(config)
  
}
export const updateEntity=(id,name,desc)=>{
  var data = JSON.stringify({
    "id": id,
    "name": name,
    "desc": desc
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'updateEntity',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}

export const getSurveyorList=()=>{
    var config = {
        method: 'get',
        url: BaseURl+'surveyorList',
        headers: { }
      };
      
      return axios(config)
}
export const addSurveyor=(datafromUser)=>{
     console.log(datafromUser)
    var data = JSON.stringify({
        "name": datafromUser.name,
        "email": datafromUser.email,
        "password": datafromUser.password
      });
      
      var config = {
        method: 'post',
        url: BaseURl+'registerSurveyor',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
}
export const deleteSurveyor=(id)=>{
  var data = JSON.stringify({
    "id": id
  });
  
  var config = {
    method: 'delete',
    url: BaseURl+'deleteSurveyor',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  
}

export const changeSurveyorStatus=(id,status)=>{
  var data = JSON.stringify({
    "id": id,
    "status": status
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'changeSurveyorStatus',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}
export const getAllRecordType=()=>{
  var config = {
    method: 'get',
    url: BaseURl+'recordTypeList',
    headers: { }
  };
  
  return axios(config)
  
}
export const createRecordType=(name,entities)=>{
  // console.log(name,entities)
  var data = JSON.stringify({
    "name": name,
    "entityIds": entities
  });
  
  var config = {
    method: 'post',
    url: BaseURl+'createRecordType',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}
export const changeRecordTypeStatus=(id,status)=>{
  var data = JSON.stringify({
    "id": id,
    "status": status
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'changeRecordTypeStatus',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}
export const deleteRecordTable=(id)=>{
  var data = JSON.stringify({
    "tableId": id
  });
  
  var config = {
    method: 'delete',
    url: BaseURl+'deleteRecordType',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const getTakeawayById=(id)=>{
  console.log(id)
  var config = {
    method: 'get',
    url: BaseURl+'getTakeawayById?id='+id,
    headers: { }
  };
  
  return axios(config)
  
}

 export const changeTakeawayStatus=(id,status)=>{
  var data = JSON.stringify({
    "id": id,
    "status": status
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'changeTakeawayStatus',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const getSurveyorById=(id)=>{
  
var config = {
  method: 'get',
  url: BaseURl+'getSurveyorById?id='+id,
  headers: { 
    'Content-Type': 'application/json'
  },
  // data : data
};

return axios(config)

}

export const editSurveyor=(id,data)=>{
  var data = JSON.stringify({
    "id": id,
    "data": {
      "name": data.name,
      "email": data.email,
      "password": data.password
    }
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'editSurveyor',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const editEntity=(id,data)=>{
  var data = JSON.stringify({
    "id": id,
    "name": data.name,
    "desc": data.desc
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'editEntity',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}
export const  getAllTakewayTypes=()=>{
  var config = {
    method: 'get',
    url: BaseURl+'getAllTakeawayTypes',
    headers: { 
      'Content-Type': 'application/json'
    },
  };
  
  return axios(config)
  
}

export const getAllMenuItems=()=>{
  var config = {
    method: 'get',
    url: BaseURl+'allMenuItems',
    headers: { 
      'Content-Type': 'application/json'
    },
  };
  
  return axios(config)
  
}

export const changeMenuStatus=(id,status)=>{
  var data = JSON.stringify({
    "id": id,
    "status": status
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'changeMenuItemStatus',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const getMenuItemById=(id)=>{
  var config = {
    method: 'get',
    url: BaseURl+'getMenuItemById?id='+id,
    headers: { }
  };
  
  return axios(config)
 

}

export const  deleteTakeawayById=(id)=>{
  var data = JSON.stringify({
    "id": id
  });
  
  var config = {
    method: 'delete',
    url: BaseURl+'deleteTakeaway',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const getAllAppliances=()=>{
  var config = {
    method: 'get',
    url: BaseURl+'getAppliances',
    headers: { }
  };
  
  return axios(config)
  
  
}

export const createAppliances=(data)=>{
  var data = JSON.stringify({
    "name":     data.name,
    "desc":     data.description,
    "category": data.category,
    "scale":    data.scale,
    "min":      data.min,
    "max":      data.max
  });
  
  var config = {
    method: 'post',
    url: BaseURl+'createAppliances',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
   return axios(config)
  
}
export const createMenuItems=(data)=>{
  var data = JSON.stringify({
    "name": data.name,
    "type": data.type
  });
  
  var config = {
    method: 'post',
    url: BaseURl+'createMenuItems',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  }

export const createTakeaway=(data)=>{
  var data = JSON.stringify({
    "name": data.takeaway_name,
    "email": data.email,
    "password": data.password,
    "mobile": data.mobile,
    "owner": data.owner,
    "type": data.type
  });
  
  var config = {
    method: 'post',
    url: BaseURl+'registerTakeaway',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const updateMenuItems=(id,data)=>{
  var data = JSON.stringify({
    "id": id,
    "data": {
      "name": data.name,
      "type": data.type
    }
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'updateMenuItems',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
 

}

export const deleteMenuItemById=(data)=>{
  var data = JSON.stringify({
    "id": data.id
  });
  
  var config = {
    method: 'delete',
    url: BaseURl+'deleteMenuItemById',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}



export const changeAppliancesStatus=(data)=>{
  var data = JSON.stringify({
    "id": data.id,
    "status": data.status
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'changeAppliancesStatus',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
 
  
}

export const deleteAppliancesById =(data)=>{
  var data = JSON.stringify({
    "id": 9
  });
  
  var config = {
    method: 'delete',
    url: BaseURl+'deleteAppliancesById',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const getAppliancesById=(id)=>{
  var config = {
    method: 'get',
    url: BaseURl+'getAppliancesById?id='+id,
    headers: { }
  };
  
  return axios(config)
  
}

export const updateAppliancesByIdApi=(id,data)=>{
  var data = JSON.stringify({
    "id": id,
    "data":data
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'updateAppliancesById',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const getAllRecordTypeById=(id)=>{
  var config = {
    method: 'get',
    url: BaseURl+'getRecordTableDetails?id='+id,
    headers: { }
  };
  
  return axios(config)
  
}

export const  updateRecordTable=(data,ids)=>{
  var data1=JSON.stringify({
    "id": data.id,
    "name": data.name,
    "table_name": data.table_name,
    "entities": ids
  });
  
  var config = {
    method: 'patch',
    url: BaseURl+'updateRecordtype',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data1
  };
  
  return axios(config)
  
  
}

export const getTableByIdForRecordCreation=(id)=>{
  var config = {
    method: 'get',
    url: BaseURl+'getTableByIdForRecordCreation?id='+id,
    headers: { }
  };
  
  return axios(config)
  
}

export const createRecordInTable=(data)=>{
  
  var config = {
    method: 'post',
    url: BaseURl+'createRecord',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  return axios(config)
  
  
}
export const getAllDataInsideAReacordTable=(id)=>{
  var config = {
    method: 'get',
    url: BaseURl+'getAllDataInsideAReacordTable?id='+id,
    headers: { }
  };
  
  return axios(config)
  
  
}


export const getNameOfColumn=(value)=>{
  
}



