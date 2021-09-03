import React, {useEffect, useReducer} from 'react'
import DashboardLayout from '../../../../hoc/dashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import { productsByPaginate } from 'store/actions/productsAction';
const AdminProducts = () => {
    
    const notifications = useSelector(state => state.notifications);
    const products = useSelector(state => state.products);
    
    const dispatch = useDispatch();
    
    const defaultValues = {
        keywords: '', 
        brands: [],
        min: 1,
        max: 10000,
        page: 1
    }
    
    const [searchValues, setSearchValues] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      defaultValues
    );
    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues])
    return (
        <DashboardLayout>
            products
        </DashboardLayout>
    )
}

export default AdminProducts
