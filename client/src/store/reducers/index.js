import { combineReducers } from "redux";
import users from "./usersReducer";
import products from "./productsReducer";
import notifications from "./notificationsReducer";
const appReducers = combineReducers({
  users,
  products,
  notifications,
});

export default appReducers;
