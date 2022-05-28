import axios from 'axios'
const BaseURl='http://localhost:4000/takeaway/'


export const userLogin=(data)=>{
    var data = JSON.stringify({
        "email": data.email,
        "password": data.password
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

export const signup=(data)=>{
  var data = JSON.stringify(data);
  
  var config = {
    method: 'post',
    url: BaseURl+'signup',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  
}

export const getAllMenuItems=()=>{

  
  var config = {
    method: 'get',
    url: BaseURl+'getAllMenuItems',
    headers: { 
      'Content-Type': 'application/json'
    },

  };
  
  return axios(config)
  
}

export const getAllActiveKitchenApp=()=>{
  var axios = require('axios');

  var config = {
    method: 'get',
    url: BaseURl+'kitchenAppliances',
    headers: { 
      'Content-Type': 'application/json'
    },
  };

 return axios(config)
  

}
export const getAllRecords=()=>{
  var config = {
    method: 'get',
    url: BaseURl+'recordTypes',
    headers: { 
      'Content-Type': 'application/json'
    },
  };

  return axios(config)
  

}

export const profileSetup=(owner,manager,staff,id,records,menuItmes,applicance)=>{
  console.log(owner,manager,staff,id,records,menuItmes,applicance) 
  var data = JSON.stringify({
    "id": id,
    "owner": owner,
    "manager":manager,
    "staff": staff,
    "records": records,
    "menuItmes": menuItmes,
    "applicance": applicance
  });
  
  var config = {
    method: 'Post',
    url: BaseURl+'profileSetup',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)

}

export const getTakeawayDetails=(id)=>{
  var config = {
    method: 'get',
    url: BaseURl+'recordTypesOfTakeaway?takeawayId='+id,
    headers: { }
  };
  
  return axios(config)
  
}

export const getTakeawayDataInsideAReacordTable=(id)=>{
  var config = {
    method: 'get',
    url: BaseURl+'getTakeawayDataInsideAReacordTable?takeawayId=2&recordId='+id,
    headers: { }
  };
  
   return axios(config)
  
}