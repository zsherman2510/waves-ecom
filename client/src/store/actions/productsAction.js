import * as action from './index';
import axios from 'axios';
import {
  getAuthHeader,
  removeTokenCookie,
  getTokenCookie,
} from "../../utils/tools";
axios.defaults.headers.post["Content-Type"] = "application/json";


export const productsBySort = ({limit, sortBy, order, where}) => {
    
    return async(dispatch)=>{
        try {
            const products = await axios.get(
              `/api/products/all`,
              {
                params:{
                  limit,
                  sortBy,
                  order,
                  where
                  
                }
              }
            );
            
            switch(where){
              case 'getSold':
                  dispatch(action.productsBySold(products.data));
              
                break;
              case 'getDate':
                  dispatch(action.productsByDate(products.data));
              
                break;
              default:
                  return false;
                
                
            }
            
            dispatch(action.productsBySold(products.data))
            
            return products
            
        } catch(err){
            dispatch(action.errorGlobal(err.response.data.message))
        }
        
    }
}

export const productsByPaginate = ({params}) => {
  return async (dispatch) => {
    try {
      const products = await axios.post("/api/products/paginate/all", params);
      dispatch(action.productsByPaginate(products.data));
      
    } catch (error) {
      dispatch(action.errorGlobal(error.response.data.message));
    }
  }
}

export const productRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/product/${id}`, getAuthHeader());
      dispatch(action.productRemove());
      dispatch(action.successGlobal());
    } catch (error) {
      dispatch(action.errorGlobal(error.response.data.message));
    }
  };
};
