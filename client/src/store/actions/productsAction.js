import * as action from './index';
import axios from 'axios';


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
