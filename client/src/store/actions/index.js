import { GET_PROD_BY_SOLD, GET_PROD_BY_DATE, ERROR_GLOBAL, SUCCESS_GLOBAL, CLEAR_NOTIFICATION, AUTH_USER
} from '../types';

export const userAuthenticate = (user) => ({
  type: AUTH_USER,
  payload: user,
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