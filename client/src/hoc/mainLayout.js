import React, {useEffect} from 'react'
import {ToastContainer} from 'react-toastify';
import {showToast} from '../utils/tools';
import {clearNotification} from 'store/actions/index';
import 'react-toastify/dist/ReactToastify.css'

import { useSelector, useDispatch } from 'react-redux';
const MainLayout = (props) => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications)
    useEffect (()=> {
        if(notifications && notifications.error){
            const msg = notifications.msg ? notifications.msg: 'Error'
            showToast('ERROR', msg);
            dispatch(clearNotification());
        }
        
        if (notifications && notifications.success) {
          const msg = notifications.msg ? notifications.msg : "NICE";
          showToast("SUCCESS", msg);
          dispatch(clearNotification());
        }
        
        
        
        // showToast('SUCCESS', props.msg)
    }, [notifications, dispatch])
    return (
        <>
            {props.children}
            <ToastContainer />
        </>
    )
}

export default MainLayout
