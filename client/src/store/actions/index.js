import {
  GET_PROD_BY_SOLD,
  GET_PROD_BY_DATE,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  AUTH_USER,
  SIGN_OUT,
  UPDATE_USER_PROFILE,
  UPDATE_USER_EMAIL
} from "../types";

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