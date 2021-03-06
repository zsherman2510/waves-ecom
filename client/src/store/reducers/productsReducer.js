import {
  GET_PROD_BY_SOLD,
  GET_PROD_BY_DATE,
  GET_PROD_PAGINATE,
  ADD_PRODUCT,
  GET_PROD_BY_ID,
  CLEAR_CURRENT_PRODUCT,
} from "../types";
//reducer is the last step. return original state, then add the next action to the state and return the payload.
export default function productsReducer(state = {}, action) {
  switch (action.type) {
    case GET_PROD_BY_SOLD:
      return { ...state, bySold: action.payload };
    case GET_PROD_BY_DATE:
      return { ...state, byDate: action.payload };
    case GET_PROD_PAGINATE:
      return { ...state, byPaginate: action.payload };
    case ADD_PRODUCT:
      return { ...state, lastAdded: action.payload };
    case GET_PROD_BY_ID:
      return { ...state, byId: action.payload };
    case CLEAR_CURRENT_PRODUCT:
      return { ...state, byId: "" };
    default:
      return state;
  }
}
