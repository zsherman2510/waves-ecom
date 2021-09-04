import { combineReducers } from "redux";
import users from "./usersReducer";
import products from "./productsReducer";
import notifications from "./notificationsReducer";
import brands from "./brandsReducer";
const appReducers = combineReducers({
  users,
  products,
  notifications,
  brands
});

export default appReducers;
