import axios from 'axios';
import api from '../services/api-variable'

export const call = async ({config, isAuthenticated = true, isJSON = true}) => {
 
  
  try { 
    const options = {
      headers: generateHeader(isAuthenticated, isJSON),
      method: config.method,
      data: config.data,
      url: `${api.APP_EXPENSE.APP_EXPENSE_URL}${config.url}`,
  
    };
    
    let response = await axios(options);

    return response;
  } catch (error) {
 
    return error.response;
  }
}
export const generateHeader = (isAuthenticated, isJSON) => {
  let initialHeader = {};
  if(isAuthenticated) { 
    const token = localStorage.getItem('access_token');
   
    initialHeader = {
      ...initialHeader,
      'Authorization': 'Bearer ' + token
    }
  }
  if(!isJSON) {
    initialHeader["Content-Type"] = "multipart/form-data";
  } else {
    initialHeader["Accept"] = "application/json";
  }

  return initialHeader;
}