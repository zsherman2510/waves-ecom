import {
  GET_PROD_BY_SOLD,
  GET_PROD_BY_DATE,
  GET_PROD_PAGINATE,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  AUTH_USER,
  SIGN_OUT,
  UPDATE_USER_PROFILE,
  UPDATE_USER_EMAIL,
  REMOVE_PRODUCT,
  GET_ALL_BRANDS,
  ADD_PRODUCT,
  GET_PROD_BY_ID,
  CLEAR_CURRENT_PRODUCT,
} from "../types";

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const userUpdateEmail = (data) => ({
  type: UPDATE_USER_EMAIL,
  payload: data
}) 

export const userAuthenticate = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const userSignOut = () => ({
  type: SIGN_OUT,
});

export const userUpdateProfile = (userdata) => ({
  type: UPDATE_USER_PROFILE,
  payload: userdata,
});

export const productsBySold = (data) => ({
  type: GET_PROD_BY_SOLD,
  payload: data,
});
export const productsByDate = (data) => ({
  type: GET_PROD_BY_DATE,
  payload: data,
});

export const productsByPaginate = (data) => ({
  type: GET_PROD_PAGINATE,
  payload: data,
});

export const productRemove = () => ({
  type: REMOVE_PRODUCT,
});

export const productsById = (product) => ({
  type: GET_PROD_BY_ID,
  payload: product,
});

export const clearCurrentProduct = () => ({
  type: CLEAR_CURRENT_PRODUCT,
});

/// Notifications

export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload:msg
})

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg
})

export const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION
    })
  }
}

export const getAllBrands = (brands) => ({
  type: GET_ALL_BRANDS,
  payload: brands,
});